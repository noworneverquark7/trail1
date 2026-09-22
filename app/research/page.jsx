import { ContentCard } from "@/components/ContentCard";
import { Reveal } from "@/components/Reveal";
import { getContent } from "@/lib/content-source";

export const metadata = { title: "Research" };

export default async function ResearchPage() {
  const items = await getContent("research");
  return (
    <div className="page shell">
      <div className="page-hero">
        <div className="eyebrow">Research</div>
        <h1>Questions worth staying with.</h1>
        <p>A home for research interests, literature notes, independent studies, future papers, and questions that remain open.</p>
      </div>
      <div className="card-grid wide">
        {items.map((item, index) => (
          <Reveal key={item.slug} delay={index * 70}>
            <ContentCard item={item} number={`R${String(index + 1).padStart(2, "0")}`} />
          </Reveal>
        ))}
      </div>
      <section className="section compact">
        <div className="research-callout">
          <span>Research system</span>
          <p>The backend supports <strong>research</strong> entries now. Add abstracts, links, methodology, and structured metadata through the admin editor as your work develops.</p>
        </div>
      </section>
    </div>
  );
}
