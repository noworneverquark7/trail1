import Link from "next/link";
import { site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="footer shell">
      <div>
        <div className="eyebrow">{site.chapter}</div>
        <div className="footer-name">{site.name}</div>
      </div>
      <div className="footer-center">Physics × Mathematics · Always becoming.</div>
      <div className="footer-links">
        <Link href="/contact">Contact</Link>
        <Link href="/admin">Admin</Link>
      </div>
    </footer>
  );
}
