import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const required = [
  "package.json",
  "next.config.mjs",
  "jsconfig.json",
  "app/layout.js",
  "app/page.jsx",
  "app/globals.css",
  "app/about/page.jsx",
  "app/laboratory/page.jsx",
  "app/laboratory/[slug]/page.jsx",
  "app/research/page.jsx",
  "app/research/[slug]/page.jsx",
  "app/notebook/page.jsx",
  "app/notebook/[slug]/page.jsx",
  "app/timeline/page.jsx",
  "app/contact/page.jsx",
  "app/admin/page.jsx",
  "app/admin/dashboard/page.jsx",
  "app/api/contact/route.js",
  "app/api/admin/login/route.js",
  "app/api/admin/logout/route.js",
  "app/api/admin/content/route.js",
  "app/api/admin/content/[id]/route.js",
  "components/Header.jsx",
  "components/Footer.jsx",
  "components/HeroField.jsx",
  "components/Reveal.jsx",
  "components/ContentCard.jsx",
  "components/AdminApp.jsx",
  "lib/content.js",
  "lib/content-source.js",
  "lib/supabase-rest.js",
  "lib/auth.js",
  "public/favicon.svg",
  "supabase/schema.sql"
];

const missing = required.filter((file) => !fs.existsSync(path.join(root, file)));
if (missing.length) {
  console.error("Missing required files:\n" + missing.map((file) => ` - ${file}`).join("\n"));
  process.exit(1);
}

const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
for (const dependency of ["next", "react", "react-dom"]) {
  if (!packageJson.dependencies?.[dependency]) {
    console.error(`Missing dependency: ${dependency}`);
    process.exit(1);
  }
}

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(directory, entry.name);
    if (entry.name === "node_modules" || entry.name === ".next" || entry.name === ".git") return [];
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const sourceFiles = walk(root).filter((file) => /\.(?:js|jsx|mjs)$/.test(file));
const importPattern = /from\s+["'](@\/[^"']+|\.{1,2}\/[^"']+)["']/g;
const extensions = ["", ".js", ".jsx", ".mjs", ".json"];

for (const file of sourceFiles) {
  const source = fs.readFileSync(file, "utf8");
  for (const match of source.matchAll(importPattern)) {
    const specifier = match[1];
    const base = specifier.startsWith("@/")
      ? path.join(root, specifier.slice(2))
      : path.resolve(path.dirname(file), specifier);

    const exists = extensions.some((extension) => fs.existsSync(base + extension)) || fs.existsSync(path.join(base, "index.js")) || fs.existsSync(path.join(base, "index.jsx"));
    if (!exists) {
      console.error(`Unresolved local import in ${path.relative(root, file)}: ${specifier}`);
      process.exit(1);
    }
  }
}

const forbidden = walk(root).filter((file) => /\.(tsx?|d\.ts)$/.test(file));
if (forbidden.length) {
  console.error("Unexpected TypeScript files in the deployment-safe JavaScript build:\n" + forbidden.map((file) => ` - ${path.relative(root, file)}`).join("\n"));
  process.exit(1);
}

console.log(`Project structure check passed (${sourceFiles.length} JavaScript source files, ${required.length} required files).`);
