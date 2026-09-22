import Link from "next/link";

function itemHref(item) {
  if (item.type === "project") return `/laboratory/${item.slug}`;
  if (item.type === "note") return `/notebook/${item.slug}`;
  if (item.type === "research") return `/research/${item.slug}`;
  return null;
}

export function ContentCard({ item, number }) {
  const meta = item.metadata || {};
  const disciplines = Array.isArray(meta.disciplines) ? meta.disciplines : [];
  const href = itemHref(item);

  const content = (
    <>
      <div className="content-card-top">
        <span>{number || item.type}</span>
        <span>{String(meta.statusLabel || meta.dateLabel || "")}</span>
      </div>
      <h3>{item.title}</h3>
      <p>{item.excerpt}</p>
      {disciplines.length ? (
        <div className="tags">
          {disciplines.map((tag) => <span key={String(tag)}>{String(tag)}</span>)}
        </div>
      ) : null}
      {href ? <div className="content-card-link">Open entry ↗</div> : null}
    </>
  );

  return href ? (
    <Link className="content-card" href={href}>{content}</Link>
  ) : (
    <article className="content-card">{content}</article>
  );
}
