import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminAuthConfigured, adminToken, passwordMatches } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request) {
  if (!adminAuthConfigured()) {
    return NextResponse.json(
      { error: "Admin authentication is not configured. Add ADMIN_PASSWORD and AUTH_SECRET in Vercel." },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => ({}));
  if (!passwordMatches(String(body.password || ""))) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, adminToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8
  });
  return response;
}
