import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Good Work — Everyday agent skills", template: "%s — Good Work" },
  description: "Thirty tested procedures that help AI agents handle the practical work of everyday life.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <header className="site-header">
          <Link className="wordmark" href="/" aria-label="Good Work home">
            <span aria-hidden="true">G/W</span>
            <span>Good Work</span>
          </Link>
          <nav aria-label="Primary navigation">
            <Link href="/#library">Library</Link>
            <Link href="/methodology">How we test</Link>
            <Link className="nav-cta" href="/install">Install a skill</Link>
          </nav>
        </header>
        <main id="main">{children}</main>
        <footer className="site-footer">
          <div>
            <p className="footer-mark">Good work starts with a good procedure.</p>
            <p className="muted">Open skill files for ordinary life. English v1.</p>
          </div>
          <div className="footer-links">
            <Link href="/methodology">Methodology</Link>
            <Link href="/install">Installation</Link>
            <a href="https://github.com/DeepanshuMishraa/everyday-agent-skills" rel="noreferrer">GitHub</a>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
