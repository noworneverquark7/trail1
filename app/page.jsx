import Link from "next/link";
import { HeroField } from "@/components/HeroField";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { KnowledgeOrbit } from "@/components/KnowledgeOrbit";
import { ContentCard } from "@/components/ContentCard";
import { fields, questions, site } from "@/lib/content";
import { getContent } from "@/lib/content-source";

export default async function Home() {
  const [projects, notes, timeline, current] = await Promise.all([
    getContent("project"), getContent("note"), getContent("timeline"), getContent("current")
  ]);

  return (
    <>
      <section className="hero shell">
        <HeroField />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <div className="hero-kicker"><span>01</span><span>{site.chapter.toUpperCase()}</span><span>2026 → ?</span></div>
          <h1><span>{site.name.split(" ")[0]}</span><span>{site.name.split(" ")[1]}</span></h1>
          <div className="hero-discipline">PHYSICS <i>×</i> MATHEMATICS</div>
          <p className="hero-statement">{site.statement}</p>
          <p className="hero-chapter">{site.chapterLine}</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/about">Explore the journey</Link>
            <Link className="button" href="/laboratory">Enter the laboratory ↗</Link>
          </div>
        </div>
        <div className="scroll-note">Scroll to transform <span>↓</span></div>
      </section>

      <section className="section shell" id="becoming">
        <Reveal><SectionHeading index="02" label="Who I am becoming" title="Not a finished profile. An evolving one." copy="This site is designed to preserve the process: what I study, what I question, what I build, what fails, and how the direction changes." /></Reveal>
        <div className="becoming-grid">
          <Reveal className="portrait-card" delay={80}>
            <div className="portrait-geometry"><span>AP</span></div>
            <div className="portrait-caption"><span>Current state</span><strong>Student / Explorer / Builder</strong></div>
          </Reveal>
          <Reveal className="manifesto" delay={160}>
            <p>I am studying <strong>physics and mathematics</strong> because I want to understand structure—not only memorize results.</p>
            <p>I want to connect rigorous ideas with computation, experimentation, and eventually work that has consequence beyond the classroom.</p>
            <div className="manifesto-rule" />
            <span className="microcopy">The direction is allowed to change. The standard is not.</span>
          </Reveal>
        </div>
      </section>

      <section className="section questions-section">
        <div className="shell">
          <Reveal><SectionHeading index="03" label="Questions that drive me" title="The questions matter before the answers do." /></Reveal>
          <div className="question-list">
            {questions.map((q, i) => <Reveal key={q} delay={i * 60}><div className="question"><span>0{i + 1}</span><h3>{q}</h3><i>↗</i></div></Reveal>)}
          </div>
        </div>
      </section>

      <section className="section shell">
        <Reveal><SectionHeading index="04" label="Field map" title="Learning across connected systems." copy="Mathematics gives structure. Physics tests structure against reality. Computation lets the structures move." /></Reveal>
        <div className="field-layout">
          <Reveal className="field-groups">
            {fields.map((field) => (
              <div className="field-group" key={field.group}>
                <div className="eyebrow">{field.group}</div>
                <div className="field-items">{field.items.map((x) => <span key={x}>{x}</span>)}</div>
              </div>
            ))}
          </Reveal>
          <Reveal className="orbit-wrap" delay={120}><KnowledgeOrbit /></Reveal>
        </div>
      </section>

      <section className="section shell">
        <Reveal><SectionHeading index="05" label="The laboratory" title="Questions become things I can test." copy="Projects are documented as investigations: question → approach → experiment → result → lesson." /></Reveal>
        <div className="card-grid">{projects.slice(0, 3).map((item, i) => <Reveal key={item.slug} delay={i * 70}><ContentCard item={item} number={`0${i + 1}`} /></Reveal>)}</div>
        <Reveal><div className="section-link"><Link href="/laboratory">View the laboratory <span>↗</span></Link></div></Reveal>
      </section>

      <section className="section pathway-section">
        <div className="shell">
          <Reveal><SectionHeading index="06" label="Possible trajectories" title="A direction, not a destination." /></Reveal>
          <div className="pathway">
            {["Physics", "Mathematics", "Research", "Computation", "Technology", "Creation"].map((x, i) => <Reveal key={x} delay={i * 50}><div className="path-node"><span>{String(i + 1).padStart(2,"0")}</span><strong>{x}</strong>{i < 5 ? <i>→</i> : <i>?</i>}</div></Reveal>)}
          </div>
        </div>
      </section>

      <section className="section shell">
        <Reveal><SectionHeading index="07" label="Intellectual timeline" title="A chronology that includes uncertainty." /></Reveal>
        <div className="timeline-preview">
          {timeline.map((item, i) => <Reveal key={item.slug} delay={i * 60}><div className="timeline-row"><span>{String(i + 1).padStart(2,"0")}</span><h3>{item.title}</h3><p>{item.excerpt}</p></div></Reveal>)}
        </div>
      </section>

      <section className="section currently-section">
        <div className="shell">
          <Reveal><SectionHeading index="08" label="Currently" title="A snapshot of the present version." /></Reveal>
          <div className="current-grid">{current.map((item, i) => <Reveal key={item.slug} delay={i * 50}><div className="current-card"><span>{item.title}</span><strong>{item.excerpt}</strong></div></Reveal>)}</div>
        </div>
      </section>

      <section className="section shell">
        <Reveal><SectionHeading index="09" label="Notebook" title="Ideas before they become polished." copy="Short notes, questions, mathematical observations, reading, and reflections from the process." /></Reveal>
        <div className="note-grid">{notes.slice(0, 3).map((item, i) => <Reveal key={item.slug} delay={i * 70}><ContentCard item={item} number={`N${String(i + 1).padStart(2,"0")}`} /></Reveal>)}</div>
        <Reveal><div className="section-link"><Link href="/notebook">Open the notebook <span>↗</span></Link></div></Reveal>
      </section>

      <section className="finale shell">
        <Reveal>
          <div className="finale-symbol">?</div>
          <div className="eyebrow">Chapter unresolved</div>
          <h2>The next version has not been written yet.</h2>
          <p>That is the point.</p>
          <Link className="button button-primary" href="/contact">Start a conversation</Link>
        </Reveal>
      </section>
    </>
  );
}
