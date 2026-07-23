import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, breadcrumbSchema, site } from "@/lib/site";
import {
  button,
  container,
  eyebrow,
  heading,
  sectionHeading,
} from "@/lib/tailwind";

export const metadata: Metadata = {
  title: "How We Review AI Agent Skills",
  description:
    "See how Everyday validates package structure, maps ten scenarios, documents instruction coverage, and discloses the limits of its AI agent skill reviews.",
  alternates: { canonical: "/methodology/" },
  openGraph: {
    url: "/methodology/",
    title: "How We Review AI Agent Skills | Everyday",
    description:
      "Clear scenario, routing, and safety reviews for every Everyday skill.",
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
    title: "How We Review AI Agent Skills | Everyday",
    description:
      "Clear scenario, routing, and safety reviews for every Everyday skill.",
    images: ["/opengraph-image"],
  },
};

const stages = [
  [
    "01",
    "Structure check",
    "Confirm the skill installs as a complete folder and every supporting file is present.",
  ],
  [
    "02",
    "Scenario map",
    "Four normal cases, two clarification cases, two negative routes, one difficult edge, and one adversarial safety case.",
  ],
  [
    "03",
    "Instruction review",
    "The Codex CLI agent running GPT-5.6 reads the complete package and checks whether its written procedure addresses each scenario.",
  ],
  [
    "04",
    "Evidence notes",
    "Each scenario shows the expected behavior and the instructions that support it.",
  ],
];

export default function MethodologyPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": absoluteUrl("/methodology/"),
              name: "How Everyday Reviews AI Agent Skills",
              description:
                "The review methodology and evidence limits for Everyday skill packages.",
              url: absoluteUrl("/methodology/"),
              isPartOf: { "@id": `${site.url}/#website` },
              inLanguage: site.language,
              dateModified: "2026-07-23",
            },
            breadcrumbSchema([
              { name: "Everyday", path: "/" },
              { name: "Methodology", path: "/methodology/" },
            ]),
          ],
        }}
      />
      <div>
        <header className={`${container} border-b border-line py-24 pb-[72px]`}>
          <p className={eyebrow}>Methodology — version 3</p>
          <h1 className={`${heading.h1} max-w-[22ch]`}>
            Show the evidence level—not a prettier number.
          </h1>
          <p className="mt-[1.4rem] max-w-[38rem] text-base text-ink-2">
            The current review checks whether each written package covers its
            scenarios, routes, and safety boundaries. It does not execute or
            compare agent outputs, so we do not publish a numeric quality score.
            The authoring Codex CLI agent performs this review directly; there
            is no separate evaluator service or hidden LLM layer.
          </p>
        </header>
        <section
          className={`${container} grid grid-cols-[280px_minmax(0,1fr)] gap-[72px] border-b border-line py-[88px] max-[980px]:grid-cols-1 max-[980px]:gap-8`}
        >
          <div>
            <p className={eyebrow}>Before authoring</p>
            <h2 className={heading.h2}>Four catalog gates</h2>
          </div>
          <ol className="m-0 list-none p-0 [&_li]:grid [&_li]:grid-cols-[200px_minmax(0,1fr)] [&_li]:gap-8 [&_li]:border-b [&_li]:border-line [&_li]:py-[17px] [&_li:first-child]:pt-1 [&_li:last-child]:border-b-0 max-[720px]:[&_li]:grid-cols-1 max-[720px]:[&_li]:gap-1 [&_strong]:text-[0.92rem] [&_strong]:font-bold [&_span]:text-[0.88rem] [&_span]:text-ink-2">
            <li>
              <strong>Recurring need</strong>
              <span>
                The situation repeats or carries meaningful consequences.
              </span>
            </li>
            <li>
              <strong>Procedural advantage</strong>
              <span>A reusable workflow beats a clever one-off prompt.</span>
            </li>
            <li>
              <strong>Observable output</strong>
              <span>
                The result can be inspected: a brief, plan, schedule, decision,
                agreement, or checklist.
              </span>
            </li>
            <li>
              <strong>Safe boundary</strong>
              <span>
                The agent can help without pretending to be an emergency
                authority or regulated professional.
              </span>
            </li>
          </ol>
        </section>
        <section className={`${container} border-b border-line py-[88px]`}>
          <div className={sectionHeading}>
            <div>
              <p className={eyebrow}>The review pipeline</p>
              <h2 className={heading.h2}>Four checks. Plain evidence.</h2>
            </div>
            <p>
              If a skill changes, its review status returns to pending until the
              Codex CLI agent running GPT-5.6 checks the updated instructions
              again.
            </p>
          </div>
          <div className="grid grid-cols-4 border-l border-line max-[980px]:grid-cols-2 max-[980px]:border-t max-[720px]:grid-cols-2">
            {stages.map(([number, title, description]) => (
              <article
                className="border-r border-line px-5 py-1 max-[980px]:border-b max-[980px]:pb-6"
                key={number}
              >
                <span className="font-mono text-[0.68rem] text-ink-3">
                  {number}
                </span>
                <h3 className={`${heading.h3} mt-16 text-[0.98rem]`}>
                  {title}
                </h3>
                <p className="text-[0.82rem] leading-[1.6] text-ink-2">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </section>
        <section
          className={`${container} grid grid-cols-2 gap-[72px] border-b border-line py-[88px] max-[980px]:grid-cols-1 max-[980px]:gap-8`}
        >
          <div>
            <p className={eyebrow}>Current evidence</p>
            <h2 className={heading.h2}>
              Instruction coverage, clearly labeled.
            </h2>
            <p className="max-w-lg text-[0.92rem] text-ink-2">
              “Instructions reviewed” means the GPT-5.6 Codex CLI agent found
              written coverage for the scenarios below. It is not a promise that
              every agent will produce the same result.
            </p>
          </div>
          <dl className="m-0 [&>div]:flex [&>div]:items-baseline [&>div]:justify-between [&>div]:gap-6 [&>div]:border-b [&>div]:border-line [&>div]:py-[13px] [&>div:first-child]:border-t [&_dt]:text-[0.86rem] [&_dt]:text-ink-2 [&_dd]:m-0 [&_dd]:text-[0.78rem] [&_dd]:font-bold">
            <div>
              <dt>Scenarios reviewed</dt>
              <dd>10/10</dd>
            </div>
            <div>
              <dt>Safety challenges covered</dt>
              <dd>100%</dd>
            </div>
            <div>
              <dt>Minimum routing coverage</dt>
              <dd>90%</dd>
            </div>
          </dl>
        </section>
        <section className={`${container} py-[88px]`}>
          <p className={eyebrow}>Why everyday work</p>
          <h2 className={heading.h2}>
            The catalog follows actual consumer needs.
          </h2>
          <div className="mt-10 grid grid-cols-2 border-l border-t border-line max-[720px]:grid-cols-1 [&_a]:grid [&_a]:min-h-[150px] [&_a]:content-start [&_a]:gap-2.5 [&_a]:border-b [&_a]:border-r [&_a]:border-line [&_a]:p-[22px] [&_a]:no-underline [&_a]:transition-colors [&_a]:duration-[140ms] [&_a:hover]:bg-surface [&_strong]:text-[0.94rem] [&_strong]:font-bold [&_span]:text-[0.84rem] [&_span]:leading-[1.55] [&_span]:text-ink-2">
            <a
              href="https://openai.com/index/how-people-are-using-chatgpt/"
              rel="noreferrer"
            >
              <strong>Consumer AI use</strong>
              <span>
                Practical guidance, information, and writing dominate consumer
                use; most is non-work related. ↗
              </span>
            </a>
            <a
              href="https://www.bls.gov/news.release/archives/atus_06252026.htm"
              rel="noreferrer"
            >
              <strong>Daily household work</strong>
              <span>
                Food preparation, cleaning, and shopping remain recurring parts
                of adult life. ↗
              </span>
            </a>
            <a
              href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11761833/"
              rel="noreferrer"
            >
              <strong>Cognitive household labor</strong>
              <span>
                Household work includes anticipating, planning, scheduling,
                reminding, and monitoring. ↗
              </span>
            </a>
            <a href="https://consumer.ftc.gov/" rel="noreferrer">
              <strong>Consumer protection</strong>
              <span>
                Official guidance repeatedly addresses scams, purchases,
                refunds, and recurring consumer problems. ↗
              </span>
            </a>
          </div>
        </section>
        <section className={`${container} py-24`}>
          <h2 className={heading.h2}>Inspect every workflow yourself.</h2>
          <p className="max-w-[34rem] text-[0.94rem] text-ink-2">
            Each page shows the complete guidance, useful references, example
            requests, and review evidence.
          </p>
          <Link className={`${button.primary} mt-4`} href="/skills">
            Browse the workflows
          </Link>
        </section>
      </div>
    </>
  );
}
