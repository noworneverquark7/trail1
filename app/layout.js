import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/content";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://ashishpandey.com";

export const metadata = {
  metadataBase: new URL(base),
  title: {
    default: `${site.name} — Physics × Mathematics`,
    template: `%s — ${site.name}`
  },
  description: "The evolving portfolio, laboratory, notebook, and intellectual journey of Ashish Pandey — Physics × Mathematics.",
  openGraph: {
    title: `${site.name} — ${site.chapter}`,
    description: site.statement,
    url: base,
    siteName: site.name,
    type: "website"
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="noise" aria-hidden="true" />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
