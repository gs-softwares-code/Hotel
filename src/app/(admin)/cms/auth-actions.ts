"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { lucia } from "@/lib/auth";
import { db, users } from "@/db";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { hashPassword, verifyPassword } from "@/lib/crypto";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type AuthState = {
  error?: string;
  success?: boolean;
};

export async function loginAction(_prevState: AuthState | null, formData: FormData): Promise<AuthState> {
  const email = formData.get("email");
  const password = formData.get("password");

  const validated = loginSchema.safeParse({ email, password });
  if (!validated.success) {
    return { error: "Invalid email or password format." };
  }

  try {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, validated.data.email),
    });

    if (!existingUser) {
      return { error: "Incorrect email or password" };
    }

    const isValidPassword = await verifyPassword(
      existingUser.passwordHash,
      validated.data.password
    );

    if (!isValidPassword) {
      return { error: "Incorrect email or password" };
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (e: any) {
    return { error: e.message || "An unexpected authentication error occurred." };
  }

  redirect("/cms/dashboard");
}

export async function logoutAction(): Promise<void> {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  if (sessionId) {
    await lucia.invalidateSession(sessionId);
    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  }
  redirect("/cms/login");
}

export async function getSessionUser() {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) return { user: null, session: null };

  const result = await lucia.validateSession(sessionId);
  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch {
    // Next.js Server Components safeguard
  }

  return result;
}

