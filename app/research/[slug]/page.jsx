import Link from "next/link";
import { notFound } from "next/navigation";
import { getContentItem } from "@/lib/content-source";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = await getContentItem("research", slug);
  return item
    ? { title: item.title, description: item.excerpt || "" }
    : { title: "Research" };
}

export default async function ResearchDetail({ params }) {
  const { slug } = await params;
  const item = await getContentItem("research", slug);
  if (!item) notFound();

  const meta = item.metadata || {};

  return (
    <main className="entry-page shell">
      <Link className="entry-back" href="/research">← Research</Link>
      <header className="entry-head">
        <div className="eyebrow">Research / {String(meta.statusLabel || "Open inquiry")}</div>
        <h1>{item.title}</h1>
        <p>{item.excerpt}</p>
      </header>
      <article className="entry-body">
        {(item.body || "Research notes in progress.")
          .split(/\n\n+/)
          .map((paragraph, index) => <p key={`${index}-${paragraph.slice(0, 24)}`}>{paragraph}</p>)}
      </article>
    </main>
  );
}
