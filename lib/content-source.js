import { fallbackContent } from "./content";
import { backendConfigured, dbListContent } from "./supabase-rest";

export async function getContent(type) {
  const fallback = fallbackContent
    .filter((item) => (!type || item.type === type) && item.status === "public")
    .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

  if (!backendConfigured()) return fallback;

  try {
    const remote = await dbListContent(type, false);
    return remote.length ? remote : fallback;
  } catch (error) {
    console.error("Falling back to local portfolio content:", error);
    return fallback;
  }
}

export async function getContentItem(type, slug) {
  const items = await getContent(type);
  return items.find((item) => item.slug === slug) || null;
}
