import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, breadcrumbSchema, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Install AI Agent Skills",
  description: "Optionally install an Everyday workflow in a compatible AI agent, or download its source files as a ZIP folder.",
  alternates: { canonical: "/install/" },
  openGraph: { url: "/install/", title: "Install AI Agent Skills | Everyday", description: "Choose, inspect, and install practical AI agent skill packages from Everyday.", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Everyday practical AI agent skills" }] },
  twitter: { card: "summary_large_image", title: "Install AI Agent Skills | Everyday", description: "Choose, inspect, and install practical AI agent skill packages from Everyday.", images: ["/opengraph-image"] },
};

export default function InstallPage() {
  const repository = site.repository;
  return <><JsonLd data={{ "@context": "https://schema.org", "@graph": [
    { "@type": "WebPage", "@id": absoluteUrl("/install/"), name: "Install AI Agent Skills", description: "How to inspect and install Everyday AI agent skill packages.", url: absoluteUrl("/install/"), isPartOf: { "@id": `${site.url}/#website` }, inLanguage: site.language },
    breadcrumbSchema([{ name: "Everyday", path: "/" }, { name: "Install", path: "/install/" }]),
  ] }} /><div className="install-page"><header className="wrap"><p className="eyebrow">Optional agent setup</p><h1>Reuse a workflow with your agent.</h1><p>You can read every workflow on the site. Installation is optional and intended for compatible AI agents that support SKILL.md folders.</p></header><section className="wrap install-steps"><article><span>01</span><div><h2>Choose a workflow</h2><p>Search by the real-life situation and read the guidance before deciding whether to install it.</p><Link className="text-link" href="/skills">Open the library →</Link></div></article><article><span>02</span><div><h2>Install it globally</h2><p>Copy the command shown under “Optional agent setup” on a workflow page and run it in your terminal.</p><pre><code>{`npx skills add ${repository}@cook-with-what-you-have -g -y`}</code></pre></div></article><article><span>03</span><div><h2>Or download the folder</h2><p>Download the ZIP and preserve its structure in the skills directory supported by your agent.</p><pre><code>{`skills/\n  cook-with-what-you-have/\n    SKILL.md\n    MEAL-PATTERNS.md\n    FOOD-SAFETY.md\n    agents/openai.yaml`}</code></pre></div></article><article><span>04</span><div><h2>Use it in a real situation</h2><p>Start with one of the example requests on its page, then adapt the result to your circumstances.</p></div></article></section><div className="wrap"><aside className="install-note"><p className="eyebrow">Compatibility note</p><h2>Agent runtimes differ.</h2><p>The packages use the portable SKILL.md convention with optional supporting files. Check your agent&apos;s documentation for its discovery directory and precedence rules.</p></aside></div></div></>;
}
