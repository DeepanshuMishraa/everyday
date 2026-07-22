import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, breadcrumbSchema, site } from "@/lib/site";
import { container, eyebrow, heading, textLink } from "@/lib/tailwind";

const installStep =
  "grid grid-cols-[56px_minmax(0,1fr)] gap-6 border-b border-line py-10 max-[720px]:grid-cols-1 max-[720px]:gap-2 [&>span]:pt-1 [&>span]:font-mono [&>span]:text-[0.72rem] [&>span]:text-ink-3 [&>div]:min-w-0 [&>div]:max-w-[46rem] [&_p]:text-[0.92rem] [&_p]:text-ink-2 [&_pre]:mt-4 [&_pre]:max-w-full [&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:bg-dark [&_pre]:px-[18px] [&_pre]:py-4 [&_pre]:text-zinc-200 [&_code]:font-mono [&_code]:text-xs [&_code]:leading-[1.7]";

export const metadata: Metadata = {
  title: "Install AI Agent Skills",
  description:
    "Optionally install an Everyday workflow in a compatible AI agent, or download its source files as a ZIP folder.",
  alternates: { canonical: "/install/" },
  openGraph: {
    url: "/install/",
    title: "Install AI Agent Skills | Everyday",
    description:
      "Choose, inspect, and install practical AI agent skill packages from Everyday.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Everyday practical AI agent skills",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Install AI Agent Skills | Everyday",
    description:
      "Choose, inspect, and install practical AI agent skill packages from Everyday.",
    images: ["/opengraph-image"],
  },
};

export default function InstallPage() {
  const repository = site.repository;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": absoluteUrl("/install/"),
              name: "Install AI Agent Skills",
              description:
                "How to inspect and install Everyday AI agent skill packages.",
              url: absoluteUrl("/install/"),
              isPartOf: { "@id": `${site.url}/#website` },
              inLanguage: site.language,
            },
            breadcrumbSchema([
              { name: "Everyday", path: "/" },
              { name: "Install", path: "/install/" },
            ]),
          ],
        }}
      />
      <div>
        <header className={`${container} border-b border-line py-24 pb-[72px]`}>
          <p className={eyebrow}>Optional agent setup</p>
          <h1 className={`${heading.h1} max-w-[22ch]`}>
            Reuse a workflow with your agent.
          </h1>
          <p className="mt-[1.4rem] max-w-[38rem] text-base text-ink-2">
            You can read every workflow on the site. Installation is optional
            and intended for compatible AI agents that support SKILL.md folders.
          </p>
        </header>
        <section className={`${container} pb-[72px] pt-6`}>
          <article className={installStep}>
            <span>01</span>
            <div>
              <h2 className={`${heading.h2} text-[1.55rem]`}>
                Choose a workflow
              </h2>
              <p>
                Search by the real-life situation and read the guidance before
                deciding whether to install it.
              </p>
              <Link className={textLink} href="/skills">
                Open the library →
              </Link>
            </div>
          </article>
          <article className={installStep}>
            <span>02</span>
            <div>
              <h2 className={`${heading.h2} text-[1.55rem]`}>
                Install it globally
              </h2>
              <p>
                Copy the command shown under “Optional agent setup” on a
                workflow page and run it in your terminal.
              </p>
              <pre>
                <code>{`npx skills add ${repository}@cook-with-what-you-have -g -y`}</code>
              </pre>
            </div>
          </article>
          <article className={installStep}>
            <span>03</span>
            <div>
              <h2 className={`${heading.h2} text-[1.55rem]`}>
                Or download the folder
              </h2>
              <p>
                Download the ZIP and preserve its structure in the skills
                directory supported by your agent.
              </p>
              <pre>
                <code>{`skills/\n  cook-with-what-you-have/\n    SKILL.md\n    MEAL-PATTERNS.md\n    FOOD-SAFETY.md\n    agents/openai.yaml`}</code>
              </pre>
            </div>
          </article>
          <article className={installStep}>
            <span>04</span>
            <div>
              <h2 className={`${heading.h2} text-[1.55rem]`}>
                Use it in a real situation
              </h2>
              <p>
                Start with one of the example requests on its page, then adapt
                the result to your circumstances.
              </p>
            </div>
          </article>
        </section>
        <div className={container}>
          <aside className="mb-24 max-w-[46rem] rounded-lg border border-line bg-surface p-7 [&>p:last-child]:text-[0.9rem] [&>p:last-child]:text-ink-2">
            <p className={eyebrow}>Compatibility note</p>
            <h2 className={`${heading.h2} text-[1.3rem]`}>
              Agent runtimes differ.
            </h2>
            <p>
              The packages use the portable SKILL.md convention with optional
              supporting files. Check your agent&apos;s documentation for its
              discovery directory and precedence rules.
            </p>
          </aside>
        </div>
      </div>
    </>
  );
}
