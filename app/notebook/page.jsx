import { ContentCard } from "@/components/ContentCard";
import { Reveal } from "@/components/Reveal";
import { getContent } from "@/lib/content-source";

export const metadata = { title: "Notebook" };

export default async function NotebookPage() {
  const notes = await getContent("note");
  return (
    <div className="page shell">
      <div className="page-hero">
        <div className="eyebrow">Notebook</div>
        <h1>Thinking in public, selectively.</h1>
        <p>Notes can be small. Their job is to preserve a trail of questions, connections, failed approaches, and changing ideas.</p>
      </div>
      <div className="note-grid">
        {notes.map((item, index) => (
          <Reveal key={item.slug} delay={index * 60}>
            <ContentCard item={item} number={`N${String(index + 1).padStart(2, "0")}`} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
