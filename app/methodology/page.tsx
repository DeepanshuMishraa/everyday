import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, breadcrumbSchema, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "How We Review AI Agent Skills",
  description: "See how Everyday validates package structure, maps ten scenarios, documents instruction coverage, and discloses the limits of its AI agent skill reviews.",
  alternates: { canonical: "/methodology/" },
  openGraph: { url: "/methodology/", title: "How We Review AI Agent Skills | Everyday", description: "Clear scenario, routing, and safety reviews for every Everyday skill.", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Everyday practical AI agent skills" }] },
  twitter: { card: "summary_large_image", title: "How We Review AI Agent Skills | Everyday", description: "Clear scenario, routing, and safety reviews for every Everyday skill.", images: ["/opengraph-image"] },
};

const stages = [
  ["01", "Structure check", "Confirm the skill installs as a complete folder and every supporting file is present."],
  ["02", "Scenario map", "Four normal cases, two clarification cases, two negative routes, one difficult edge, and one adversarial safety case."],
  ["03", "Instruction review", "GPT-5 (Codex) reads the complete package and checks whether its written procedure addresses each scenario."],
  ["04", "Evidence notes", "Each scenario shows the expected behavior and the instructions that support it."],
];

export default function MethodologyPage() {
  return <><JsonLd data={{ "@context": "https://schema.org", "@graph": [
    { "@type": "WebPage", "@id": absoluteUrl("/methodology/"), name: "How Everyday Reviews AI Agent Skills", description: "The review methodology and evidence limits for Everyday skill packages.", url: absoluteUrl("/methodology/"), isPartOf: { "@id": `${site.url}/#website` }, inLanguage: site.language, dateModified: "2026-07-17" },
    breadcrumbSchema([{ name: "Everyday", path: "/" }, { name: "Methodology", path: "/methodology/" }]),
  ] }} /><div className="method-page">
    <header className="wrap method-hero"><p className="eyebrow">Methodology — version 3</p><h1>Show the evidence level—not a prettier number.</h1><p>The current review checks whether each written package covers its scenarios, routes, and safety boundaries. It does not execute or compare agent outputs, so we do not publish a numeric quality score.</p></header>
    <section className="wrap selection-gates"><div><p className="eyebrow">Before authoring</p><h2>Four catalog gates</h2></div><ol><li><strong>Recurring need</strong><span>The situation repeats or carries meaningful consequences.</span></li><li><strong>Procedural advantage</strong><span>A reusable workflow beats a clever one-off prompt.</span></li><li><strong>Observable output</strong><span>The result can be inspected: a brief, plan, schedule, decision, agreement, or checklist.</span></li><li><strong>Safe boundary</strong><span>The agent can help without pretending to be an emergency authority or regulated professional.</span></li></ol></section>
    <section className="wrap evaluation-stages"><div className="section-heading"><div><p className="eyebrow">The review pipeline</p><h2>Four checks. Plain evidence.</h2></div><p>If a skill changes, its review status returns to pending until Codex checks the updated instructions again.</p></div><div className="stage-grid">{stages.map(([number, title, description]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div></section>
    <section className="wrap thresholds"><div><p className="eyebrow">Current evidence</p><h2>Instruction coverage, clearly labeled.</h2><p>“Instructions reviewed” means Codex found written coverage for the scenarios below. It is not a promise that every agent will produce the same result.</p></div><dl><div><dt>Scenarios reviewed</dt><dd>10/10</dd></div><div><dt>Safety challenges covered</dt><dd>100%</dd></div><div><dt>Minimum routing coverage</dt><dd>90%</dd></div></dl></section>
    <section className="wrap evidence-section"><p className="eyebrow">Why everyday work</p><h2>The catalog follows actual consumer needs.</h2><div className="evidence-grid"><a href="https://openai.com/index/how-people-are-using-chatgpt/" rel="noreferrer"><strong>Consumer AI use</strong><span>Practical guidance, information, and writing dominate consumer use; most is non-work related. ↗</span></a><a href="https://www.bls.gov/news.release/archives/atus_06252026.htm" rel="noreferrer"><strong>Daily household work</strong><span>Food preparation, cleaning, and shopping remain recurring parts of adult life. ↗</span></a><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11761833/" rel="noreferrer"><strong>Cognitive household labor</strong><span>Household work includes anticipating, planning, scheduling, reminding, and monitoring. ↗</span></a><a href="https://consumer.ftc.gov/" rel="noreferrer"><strong>Consumer protection</strong><span>Official guidance repeatedly addresses scams, purchases, refunds, and recurring consumer problems. ↗</span></a></div></section>
    <section className="wrap method-cta"><h2>Inspect every skill yourself.</h2><p>Each skill page shows its instructions, supporting files, example requests, and scenario review.</p><Link className="button primary" href="/#library">Browse the library</Link></section>
  </div></>;
}
