import Link from "next/link";
import { notFound } from "next/navigation";
import { getContentItem } from "@/lib/content-source";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = await getContentItem("note", slug);
  return item
    ? { title: item.title, description: item.excerpt || "" }
    : { title: "Notebook" };
}

export default async function NoteDetail({ params }) {
  const { slug } = await params;
  const item = await getContentItem("note", slug);
  if (!item) notFound();

  const meta = item.metadata || {};

  return (
    <main className="entry-page shell">
      <Link className="entry-back" href="/notebook">← Notebook</Link>
      <header className="entry-head">
        <div className="eyebrow">Notebook / {String(meta.dateLabel || "Working note")}</div>
        <h1>{item.title}</h1>
        <p>{item.excerpt}</p>
      </header>
      <article className="entry-body entry-body-literary">
        {(item.body || "Notes in progress.")
          .split(/\n\n+/)
          .map((paragraph, index) => <p key={`${index}-${paragraph.slice(0, 24)}`}>{paragraph}</p>)}
      </article>
    </main>
  );
}
