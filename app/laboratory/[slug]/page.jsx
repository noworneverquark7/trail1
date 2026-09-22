import Link from "next/link";
import { notFound } from "next/navigation";
import { getContentItem } from "@/lib/content-source";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = await getContentItem("project", slug);
  return item
    ? { title: item.title, description: item.excerpt || "" }
    : { title: "Project" };
}

export default async function ProjectDetail({ params }) {
  const { slug } = await params;
  const item = await getContentItem("project", slug);
  if (!item) notFound();

  const meta = item.metadata || {};
  const disciplines = Array.isArray(meta.disciplines) ? meta.disciplines : [];

  return (
    <main className="entry-page shell">
      <Link className="entry-back" href="/laboratory">← Laboratory</Link>
      <header className="entry-head">
        <div className="eyebrow">Project / {String(meta.statusLabel || "Exploration")}</div>
        <h1>{item.title}</h1>
        <p>{item.excerpt}</p>
        {disciplines.length ? (
          <div className="tags">{disciplines.map((tag) => <span key={String(tag)}>{String(tag)}</span>)}</div>
        ) : null}
      </header>
      <article className="entry-body">
        {(item.body || "This project is still being documented.")
          .split(/\n\n+/)
          .map((paragraph, index) => <p key={`${index}-${paragraph.slice(0, 24)}`}>{paragraph}</p>)}
        <div className="entry-next">
          <span>Next step</span>
          <strong>Continue the experiment, record the result, and update this page.</strong>
        </div>
      </article>
    </main>
  );
}
