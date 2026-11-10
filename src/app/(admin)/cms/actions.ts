"use server";

import { revalidatePath } from "next/cache";
import { db, properties, pressReleases, propertyImages, type Property } from "@/db";
import { eq, desc } from "drizzle-orm";
import { z } from "zod";
import { uploadMediaStream } from "@/lib/storage";

const propertyInputSchema = z.object({
  id: z.string().optional(),
  brandId: z.string().min(1, "Brand identifier required"),
  name: z.string().min(2, "Property name must have at least 2 characters"),
  slug: z.string().min(2, "URL Slug required"),
  description: z.string().min(10, "Description required"),
  region: z.string().min(2),
  country: z.string().min(2),
  city: z.string().min(2),
  address: z.string().min(5),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  starRating: z.coerce.number().min(1).max(5).default(5),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
  featuredImageUrl: z.string().optional(),
  translationsJson: z.string().optional(),
});

export async function getPropertiesAction() {
  try {
    const all = await db.query.properties.findMany({
      orderBy: [desc(properties.updatedAt)],
    });
    return { data: all || [] };
  } catch {
    return { data: [] };
  }
}

export async function upsertPropertyAction(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = propertyInputSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: parsed.error.errors.map((e) => e.message).join(", ") };
  }

  const { id, ...data } = parsed.data;
  const propertyId = id || `prop_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  try {
    const existing = id ? await db.query.properties.findFirst({ where: eq(properties.id, id) }) : null;

    if (existing) {
      await db.update(properties)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(properties.id, id!));
    } else {
      await db.insert(properties).values({
        id: propertyId,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Instant Edge Cache purge (E in S.C.A.L.E.)
    revalidatePath("/cms/properties");
    revalidatePath("/destinations", "layout");
    revalidatePath("/");

    return { success: true, id: propertyId };
  } catch (err: any) {
    return { error: err.message || "Failed to save property." };
  }
}

export async function togglePropertyStatusAction(id: string, currentStatus: "DRAFT" | "PUBLISHED") {
  const newStatus = currentStatus === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
  try {
    await db.update(properties)
      .set({ status: newStatus, updatedAt: new Date() })
      .where(eq(properties.id, id));

    revalidatePath("/cms/properties");
    revalidatePath("/destinations", "layout");
    revalidatePath("/");

    return { success: true, status: newStatus };
  } catch (err: any) {
    return { error: err.message || "Status update failed" };
  }
}

export async function deletePropertyAction(id: string) {
  try {
    await db.delete(properties).where(eq(properties.id, id));
    revalidatePath("/cms/properties");
    revalidatePath("/destinations", "layout");
    revalidatePath("/");
    return { success: true };
  } catch (err: any) {
    return { error: err.message || "Deletion failed" };
  }
}

export async function uploadMediaAction(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file) {
    return { error: "No file provided" };
  }

  try {
    const result = await uploadMediaStream(file, file.name);
    return { success: true, url: result.url };
  } catch (err: any) {
    return { error: err.message || "Media upload failed" };
  }
}

// Press Releases
export async function upsertPressReleaseAction(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const summary = formData.get("summary") as string;
  const content = formData.get("content") as string;
  const status = (formData.get("status") as "DRAFT" | "PUBLISHED") || "DRAFT";
  const id = (formData.get("id") as string) || `pr_${Date.now()}`;

  try {
    const existing = await db.query.pressReleases.findFirst({ where: eq(pressReleases.id, id) });
    if (existing) {
      await db.update(pressReleases)
        .set({ title, slug, summary, content, status, updatedAt: new Date() })
        .where(eq(pressReleases.id, id));
    } else {
      await db.insert(pressReleases).values({
        id,
        title,
        slug,
        summary,
        content,
        status,
        publishDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    revalidatePath("/newsroom");
    revalidatePath("/cms/content");
    return { success: true };
  } catch (err: any) {
    return { error: err.message || "Failed to save press release" };
  }
}

