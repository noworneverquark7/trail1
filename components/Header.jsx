"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  ["/about", "About"],
  ["/laboratory", "Laboratory"],
  ["/research", "Research"],
  ["/notebook", "Notebook"],
  ["/timeline", "Timeline"],
  ["/contact", "Contact"]
];

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" onClick={() => setOpen(false)} aria-label="Ashish Pandey home">
          <span className="brand-mark">AP</span>
          <span className="brand-word">ASHISH PANDEY</span>
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Toggle navigation"
          type="button"
        >
          <span />
          <span />
        </button>

        <nav className={`nav ${open ? "nav--open" : ""}`} aria-label="Primary navigation">
          {links.map(([href, label]) => (
            <Link
              key={href}
              className={path === href || path.startsWith(`${href}/`) ? "active" : ""}
              href={href}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
