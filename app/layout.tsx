import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { ThemeToggle } from "@/components/ThemeToggle";
import { absoluteUrl, site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

const themeScript = `try{var t=localStorage.getItem("everyday-theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="light"}`;

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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} data-theme="light" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <JsonLd data={{
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "WebSite", "@id": `${site.url}/#website`, name: site.name, alternateName: site.legalName, url: site.url, description: site.description, inLanguage: site.language },
            { "@type": "Organization", "@id": `${site.url}/#organization`, name: site.name, url: site.url, logo: absoluteUrl("/icon.svg"), sameAs: [site.repositoryUrl] },
          ],
        }} />
        <a className="skip-link" href="#main">Skip to content</a>
        <header className="site-header">
          <div className="wrap">
            <Link className="wordmark" href="/" aria-label="Everyday home">
              <span aria-hidden="true">every<span>/</span>day</span>
            </Link>
            <nav aria-label="Primary navigation">
              <div className="nav-primary">
                <Link className="nav-link" href="/#library">Library</Link>
                <Link className="nav-link" href="/methodology">Method</Link>
              </div>
              <div className="nav-utilities">
                <a className="nav-icon" href={site.repositoryUrl} rel="noreferrer" aria-label="Everyday on GitHub">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.16 1.18a11 11 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.67.8.55A11.52 11.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/></svg>
                </a>
                <ThemeToggle />
                <Link className="nav-cta" href="/install">Install <span aria-hidden="true">↗</span></Link>
              </div>
            </nav>
          </div>
        </header>
        <main id="main">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
