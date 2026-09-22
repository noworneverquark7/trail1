import { ContentCard } from "@/components/ContentCard";
import { Reveal } from "@/components/Reveal";
import { getContent } from "@/lib/content-source";

export const metadata = { title: "Laboratory" };

export default async function LaboratoryPage() {
  const projects = await getContent("project");
  return (
    <div className="page shell">
      <div className="page-hero">
        <div className="eyebrow">05 / Laboratory</div>
        <h1>Build to understand.</h1>
        <p>Simulations, mathematical explorations, code, experiments, and research prototypes. Each project can grow from a question into a full technical case study.</p>
      </div>
      <div className="card-grid wide">
        {projects.map((item, index) => (
          <Reveal key={item.slug} delay={index * 60}>
            <ContentCard item={item} number={String(index + 1).padStart(2, "0")} />
          </Reveal>
        ))}
      </div>
      <div className="empty-slot"><span>+</span><p>Your next investigation belongs here.</p></div>
    </div>
  );
}
