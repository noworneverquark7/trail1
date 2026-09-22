const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function backendConfigured() {
  return Boolean(url && key);
}

function requestHeaders(extra = {}) {
  if (!key) return extra;
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    ...extra
  };
}

export async function dbListContent(type, includePrivate = false) {
  if (!url || !key) return [];

  const params = new URLSearchParams();
  params.set("select", "*");
  params.set("order", "sort_order.asc,created_at.desc");
  if (type) params.set("type", `eq.${type}`);
  if (!includePrivate) params.set("status", "eq.public");

  const response = await fetch(`${url}/rest/v1/content_items?${params.toString()}`, {
    headers: requestHeaders(),
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Supabase content request failed: ${response.status}`);
  }

  return response.json();
}

export async function dbCreateContent(input) {
  if (!url || !key) throw new Error("Backend is not configured");

  const response = await fetch(`${url}/rest/v1/content_items`, {
    method: "POST",
    headers: requestHeaders({ Prefer: "return=representation" }),
    body: JSON.stringify(input),
    cache: "no-store"
  });

  if (!response.ok) throw new Error(await response.text());
  const rows = await response.json();
  return rows[0];
}

export async function dbUpdateContent(id, input) {
  if (!url || !key) throw new Error("Backend is not configured");

  const response = await fetch(`${url}/rest/v1/content_items?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: requestHeaders({ Prefer: "return=representation" }),
    body: JSON.stringify(input),
    cache: "no-store"
  });

  if (!response.ok) throw new Error(await response.text());
  const rows = await response.json();
  return rows[0];
}

export async function dbDeleteContent(id) {
  if (!url || !key) throw new Error("Backend is not configured");

  const response = await fetch(`${url}/rest/v1/content_items?id=eq.${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: requestHeaders(),
    cache: "no-store"
  });

  if (!response.ok) throw new Error(await response.text());
}

export async function dbSaveContact(input) {
  if (!url || !key) throw new Error("Backend is not configured");

  const response = await fetch(`${url}/rest/v1/contact_messages`, {
    method: "POST",
    headers: requestHeaders({ Prefer: "return=minimal" }),
    body: JSON.stringify(input),
    cache: "no-store"
  });

  if (!response.ok) throw new Error(await response.text());
}
