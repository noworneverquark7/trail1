import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { backendConfigured, dbCreateContent, dbListContent } from "@/lib/supabase-rest";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const allowedStatuses = new Set(["private", "draft", "public", "unlisted", "archived"]);

function normalizedSlug(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 120);
}

function sanitize(body) {
  const status = allowedStatuses.has(body.status) ? body.status : "draft";
  return {
    type: String(body.type || "note").trim().slice(0, 50),
    slug: normalizedSlug(body.slug),
    title: String(body.title || "").trim().slice(0, 200),
    excerpt: String(body.excerpt || "").trim().slice(0, 1000),
    body: String(body.body || "").slice(0, 50000),
    metadata: body.metadata && typeof body.metadata === "object" && !Array.isArray(body.metadata) ? body.metadata : {},
    status,
    sort_order: Number.isFinite(Number(body.sort_order)) ? Number(body.sort_order) : 100,
    published_at: status === "public" ? (body.published_at || new Date().toISOString()) : null
  };
}

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!backendConfigured()) return NextResponse.json({ error: "Backend is not configured" }, { status: 503 });

  try {
    return NextResponse.json(await dbListContent(undefined, true));
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Database error" }, { status: 500 });
  }
}

export async function POST(request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!backendConfigured()) return NextResponse.json({ error: "Backend is not configured" }, { status: 503 });

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });

  const input = sanitize(body);
  if (!input.slug || !input.title || !input.type) {
    return NextResponse.json({ error: "Type, title, and slug are required." }, { status: 400 });
  }

  try {
    return NextResponse.json(await dbCreateContent(input));
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Database error" }, { status: 500 });
  }
}
