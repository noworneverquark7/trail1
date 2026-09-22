import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="page shell">
      <div className="page-hero">
        <div className="eyebrow">02 / About</div>
        <h1>Who I am becoming.</h1>
        <p>This page is intentionally written as a moving target. Replace this copy as your interests, work, and ambitions become more precise.</p>
      </div>

      <section className="section compact">
        <Reveal><SectionHeading index="01" label="Present" title="Physics. Mathematics. A serious beginning." /></Reveal>
        <div className="prose-grid">
          <Reveal>
            <p>I am studying physics and mathematics because both disciplines reward the same habit: looking beneath the surface until the structure becomes visible.</p>
            <p>I am especially interested in the transition from understanding an idea abstractly to making it computational, visual, experimental, or useful.</p>
          </Reveal>
          <Reveal delay={100}>
            <blockquote>“The portfolio should not hide the unfinished stage. It should document it.”</blockquote>
            <p className="muted">Edit this page freely. It is designed to evolve with you.</p>
          </Reveal>
        </div>
      </section>

      <section className="section compact">
        <Reveal><SectionHeading index="02" label="Principles" title="Standards for the process." /></Reveal>
        <div className="principles">
          {["Curiosity before certainty.", "Depth before appearance.", "Understand fundamentals.", "Build what you wish existed.", "Document the process.", "Keep evolving."].map((item, index) => (
            <Reveal key={item} delay={index * 40}>
              <div><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
