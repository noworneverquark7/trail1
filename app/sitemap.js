export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://ashishpandey.com";
  const now = new Date();
  const routes = ["", "/about", "/laboratory", "/research", "/notebook", "/timeline", "/contact"];

  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7
  }));
}
