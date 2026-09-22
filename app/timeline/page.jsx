import { Reveal } from "@/components/Reveal";
import { getContent } from "@/lib/content-source";

export const metadata = { title: "Timeline" };

export default async function TimelinePage() {
  const timeline = await getContent("timeline");
  return (
    <div className="page shell">
      <div className="page-hero">
        <div className="eyebrow">Timeline</div>
        <h1>Past, present, possible.</h1>
        <p>A timeline should not pretend the future is certain. It should show direction, experiments, and points where the path changed.</p>
      </div>
      <div className="timeline-full">
        {timeline.map((item, index) => (
          <Reveal key={item.slug} delay={index * 60}>
            <article>
              <div className="timeline-marker"><span>{String(index + 1).padStart(2, "0")}</span></div>
              <div><h2>{item.title}</h2><p>{item.excerpt}</p></div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
