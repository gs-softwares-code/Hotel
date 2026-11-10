import { NextRequest, NextResponse } from "next/server";
import { lucia } from "@/lib/auth";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const sessionId = request.cookies.get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const { session, user } = await lucia.validateSession(sessionId);
  if (!session) {
    const blankCookie = lucia.createBlankSessionCookie();
    const response = NextResponse.json({ user: null }, { status: 401 });
    response.cookies.set(blankCookie.name, blankCookie.value, blankCookie.attributes);
    return response;
  }

  return NextResponse.json({ user, session });
}

