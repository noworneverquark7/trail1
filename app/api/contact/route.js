import { NextResponse } from "next/server";
import { backendConfigured, dbSaveContact } from "@/lib/supabase-rest";

export const runtime = "nodejs";

function clean(value, max) {
  return String(value || "").trim().slice(0, max);
}

export async function POST(request) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  // Honeypot: bots get a success-shaped response without storing anything.
  if (clean(body.company, 200)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 100);
  const email = clean(body.email, 200);
  const subject = clean(body.subject, 160);
  const message = clean(body.message, 5000);

  if (!name || !email.includes("@") || !subject || message.length < 10) {
    return NextResponse.json({ error: "Please complete every field." }, { status: 400 });
  }

  if (!backendConfigured()) {
    return NextResponse.json({ ok: false, fallback: "email" }, { status: 200 });
  }

  try {
    await dbSaveContact({ name, email, subject, message });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact save failed:", error);
    return NextResponse.json({ error: "Message could not be stored." }, { status: 500 });
  }
}
