import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Everyday — Practical AI Agent Skills for Daily Life", template: "%s | Everyday" },
  description: site.description,
  applicationName: site.name,
  generator: "Next.js",
  creator: site.name,
  publisher: site.name,
  category: "AI agent skills",
  keywords: ["AI agent skills", "agent skills library", "SKILL.md", "everyday AI", "life admin", "practical AI skills"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: site.name,
    title: "Everyday — Practical AI Agent Skills",
    description: site.description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Everyday — practical skills for everyday agents" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Everyday — Practical AI Agent Skills",
    description: site.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  manifest: "/manifest.webmanifest",
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <JsonLd data={{
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "WebSite", "@id": `${site.url}/#website`, name: site.name, alternateName: site.legalName, url: site.url, description: site.description, inLanguage: site.language },
            { "@type": "Organization", "@id": `${site.url}/#organization`, name: site.name, url: site.url, logo: absoluteUrl("/icon.svg"), sameAs: [site.repositoryUrl] },
          ],
        }} />
        <a className="skip-link" href="#main">Skip to content</a>
        <header className="site-header">
          <Link className="wordmark" href="/" aria-label="Everyday home">
            <span aria-hidden="true">E/D</span>
            <span>Everyday</span>
          </Link>
          <nav aria-label="Primary navigation">
            <Link href="/#library">Library</Link>
            <Link href="/methodology">How we review</Link>
            <Link className="nav-cta" href="/install">Install a skill</Link>
          </nav>
        </header>
        <main id="main">{children}</main>
        <footer className="site-footer">
          <div>
            <p className="footer-mark">Practical skills for everyday agents.</p>
            <p className="muted">Open skill packages for daily life. English v1.</p>
          </div>
          <div className="footer-links">
            <Link href="/methodology">Methodology</Link>
            <Link href="/install">Installation</Link>
            <a href={site.repositoryUrl} rel="noreferrer">GitHub</a>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
