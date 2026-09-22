import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/content";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="page shell">
      <div className="page-hero">
        <div className="eyebrow">Contact</div>
        <h1>Start with a good question.</h1>
        <p>For research, academic collaboration, projects, or interesting ideas.</p>
      </div>
      <div className="contact-layout">
        <div className="contact-aside">
          <span className="eyebrow">Direct</span>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <p>Update the email in <code>lib/content.js</code> before public launch.</p>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
