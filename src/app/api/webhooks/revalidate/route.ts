import { type NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { secret, path, tag } = body;

    const webhookSecret = process.env.REVALIDATION_SECRET || "aura-edge-revalidation-key";
    if (secret !== webhookSecret) {
      return NextResponse.json({ message: "Invalid secret token" }, { status: 401 });
    }

    if (path) {
      revalidatePath(path);
      return NextResponse.json({ revalidated: true, path, now: Date.now() });
    }

    if (tag) {
      revalidateTag(tag);
      return NextResponse.json({ revalidated: true, tag, now: Date.now() });
    }

    return NextResponse.json({ message: "Missing path or tag parameter" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || "Error revalidating" }, { status: 500 });
  }
}

