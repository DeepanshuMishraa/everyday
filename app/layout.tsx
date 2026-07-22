import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ProductAnalytics } from "@/components/ProductAnalytics";
import { clientBootScript } from "@/lib/client-boot";
import { absoluteUrl, site } from "@/lib/site";
import { container } from "@/lib/tailwind";
import "./globals.css";

const zodiak = localFont({
  src: [
    {
      path: "../fonts/Zodiak-Variable.ttf",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../fonts/Zodiak-VariableItalic.ttf",
      weight: "100 900",
      style: "italic",
    },
  ],
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
  variable: "--font-zodiak",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Everyday — Practical Workflows for Daily Life",
    template: "%s | Everyday",
  },
  description: site.description,
  applicationName: site.name,
  generator: "Next.js",
  creator: site.name,
  publisher: site.name,
  category: "Practical workflows",
  keywords: [
    "practical workflows",
    "everyday checklists",
    "AI workflows",
    "life admin",
    "agent skills",
    "SKILL.md",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: site.name,
    title: "Everyday — Practical Workflows for Daily Life",
    description: site.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Everyday — practical skills for everyday agents",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Everyday — Practical Workflows for Daily Life",
    description: site.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  manifest: "/manifest.webmanifest",
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${zodiak.variable} ${jetBrainsMono.variable} scroll-smooth scheme-light dark:scheme-dark motion-reduce:scroll-auto [--header-h:69px] [scroll-padding-top:calc(var(--header-h)+16px)] max-[480px]:[--header-h:65px]`}
      data-theme="light"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="m-0 bg-bg font-ui text-base leading-[1.55] text-ink antialiased transition-colors duration-[220ms] selection:bg-ink selection:text-bg">
        <script dangerouslySetInnerHTML={{ __html: clientBootScript }} />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": `${site.url}/#website`,
                name: site.name,
                alternateName: site.legalName,
                url: site.url,
                description: site.description,
                inLanguage: site.language,
              },
              {
                "@type": "Organization",
                "@id": `${site.url}/#organization`,
                name: site.name,
                url: site.url,
                logo: absoluteUrl("/icon.svg"),
                sameAs: [site.repositoryUrl],
              },
            ],
          }}
        />
        <a
          className="fixed -top-20 left-4 z-[100] rounded-sm bg-ink px-[0.9rem] py-[0.6rem] text-[0.85rem] text-bg focus:top-4"
          href="#main"
        >
          Skip to content
        </a>
        <header className="sticky top-0 z-50 h-[var(--header-h)] bg-[color-mix(in_srgb,var(--color-bg)_97%,transparent)] font-ui">
          <div
            className={`${container} flex h-full items-center justify-between max-[480px]:px-3`}
          >
            <Link
              className="flex items-center text-[1.08rem] font-bold tracking-[-0.04em] no-underline max-[480px]:text-base"
              href="/"
              aria-label="Everyday home"
            >
              <span aria-hidden="true">
                every<span className="mx-px font-bold text-green">/</span>day
              </span>
            </Link>
            <nav
              className="flex items-center gap-[3px] rounded-lg border border-line bg-surface p-1 max-[720px]:gap-0 max-[480px]:border-0 max-[480px]:bg-transparent max-[480px]:p-0"
              aria-label="Primary navigation"
            >
              <div className="flex items-center gap-0.5 max-[720px]:hidden">
                <Link
                  className="inline-flex min-h-11 items-center rounded-md px-[11px] text-[0.8rem] font-medium text-ink-2 no-underline transition-colors duration-[140ms] hover:bg-surface-2 hover:text-ink"
                  href="/skills"
                >
                  Workflows
                </Link>
                <Link
                  className="inline-flex min-h-11 items-center rounded-md px-[11px] text-[0.8rem] font-medium text-ink-2 no-underline transition-colors duration-[140ms] hover:bg-surface-2 hover:text-ink"
                  href="/methodology"
                >
                  Method
                </Link>
              </div>
              <div className="ml-1 flex items-center gap-[3px] border-l border-line pl-[7px] max-[720px]:ml-0 max-[720px]:border-l-0 max-[720px]:pl-0">
                <a
                  className="grid size-11 place-items-center rounded-full text-ink-2 transition-colors duration-[140ms] hover:bg-surface-2 hover:text-ink max-[720px]:hidden [&_svg]:size-[17px]"
                  href={site.repositoryUrl}
                  rel="noreferrer"
                  aria-label="Everyday on GitHub"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.16 1.18a11 11 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.67.8.55A11.52 11.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                  </svg>
                </a>
                <ThemeToggle />
                <Link
                  className="inline-flex min-h-11 items-center rounded-md bg-ink px-3 text-[0.78rem] font-medium tracking-[-0.005em] text-bg no-underline shadow-button transition-[background-color,box-shadow] duration-[180ms] hover:bg-button-primary-hover hover:shadow-button-hover active:shadow-button-active max-[480px]:px-2.5"
                  href="/skills"
                >
                  Browse
                </Link>
              </div>
            </nav>
          </div>
        </header>
        <main id="main">{children}</main>
        <footer className="border-t border-line">
          <div
            className={`${container} flex min-h-[88px] items-center justify-between gap-6 max-[720px]:flex-col max-[720px]:items-start max-[720px]:pb-8 max-[720px]:pt-7`}
          >
            <span className="text-[0.78rem] text-ink-3">
              Everyday — useful knowledge at the moment of action.
            </span>
            <nav
              className="flex flex-wrap justify-end gap-x-5 gap-y-2 max-[720px]:justify-start [&_a]:text-[0.78rem] [&_a]:text-ink-2 [&_a]:underline-offset-3"
              aria-label="Footer"
            >
              <Link href="/skills">Workflows</Link>
              <Link href="/methodology">Method</Link>
              <Link href="/install">Agent setup</Link>
              <a
                href={`${site.repositoryUrl}/issues/new?template=workflow-request.yml`}
                rel="noreferrer"
              >
                Request a workflow
              </a>
              <Link href="/privacy">Privacy</Link>
            </nav>
          </div>
        </footer>
        <ProductAnalytics />
        <Analytics />
      </body>
    </html>
  );
}
