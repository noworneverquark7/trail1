import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "metamorphosis_admin";

function secret() {
  return process.env.AUTH_SECRET || "";
}

export function adminAuthConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD && secret());
}

export function passwordMatches(candidate) {
  const expected = process.env.ADMIN_PASSWORD || "";
  if (!expected || !candidate) return false;

  const a = Buffer.from(candidate);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function adminToken() {
  if (!secret()) return "";
  return createHmac("sha256", secret()).update("metamorphosis-admin-v2").digest("hex");
}

export function verifyAdminToken(candidate) {
  const expected = adminToken();
  if (!expected || !candidate) return false;

  const a = Buffer.from(candidate);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function isAdmin() {
  const cookieStore = await cookies();
  return verifyAdminToken(cookieStore.get(ADMIN_COOKIE)?.value);
}
