import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, breadcrumbSchema, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Install AI Agent Skills",
  description: "Install a complete Everyday AI agent skill with the Skills CLI, or download its inspectable SKILL.md package as a ZIP folder.",
  alternates: { canonical: "/install/" },
  openGraph: { url: "/install/", title: "Install AI Agent Skills | Everyday", description: "Choose, inspect, and install practical AI agent skill packages from Everyday.", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Everyday practical AI agent skills" }] },
  twitter: { card: "summary_large_image", title: "Install AI Agent Skills | Everyday", description: "Choose, inspect, and install practical AI agent skill packages from Everyday.", images: ["/opengraph-image"] },
};

export default function InstallPage() {
  const repository = site.repository;
  return <><JsonLd data={{ "@context": "https://schema.org", "@graph": [
    { "@type": "WebPage", "@id": absoluteUrl("/install/"), name: "Install AI Agent Skills", description: "How to inspect and install Everyday AI agent skill packages.", url: absoluteUrl("/install/"), isPartOf: { "@id": `${site.url}/#website` }, inLanguage: site.language },
    breadcrumbSchema([{ name: "Everyday", path: "/" }, { name: "Install", path: "/install/" }]),
  ] }} /><div className="install-page"><header className="wrap"><p className="eyebrow">Everyday installation</p><h1>One skill. One complete folder.</h1><p>Every skill installs independently with its instructions and only the supporting references it actually needs.</p></header><section className="wrap install-steps"><article><span>01</span><div><h2>Choose a skill</h2><p>Search by the real-life task, inspect every file in the package, and check its current review status.</p><Link className="text-link" href="/#library">Open the library →</Link></div></article><article><span>02</span><div><h2>Install it globally</h2><p>Copy the command from its skill page. The repository can be configured at build time with <code>NEXT_PUBLIC_SKILLS_REPOSITORY</code>.</p><pre><code>{`npx skills add ${repository}@cook-with-what-you-have -g -y`}</code></pre></div></article><article><span>03</span><div><h2>Or download the folder</h2><p>Download the ZIP and preserve its structure in the skills directory supported by your agent.</p><pre><code>{`skills/\n  cook-with-what-you-have/\n    SKILL.md\n    MEAL-PATTERNS.md\n    FOOD-SAFETY.md\n    agents/openai.yaml`}</code></pre></div></article><article><span>04</span><div><h2>Verify what you installed</h2><p>Compare the package hash with the report shown on the skill page. Changing any included file requires a new review.</p></div></article></section><div className="wrap"><aside className="install-note"><p className="eyebrow">Compatibility note</p><h2>Agent runtimes differ.</h2><p>The packages use the portable SKILL.md convention with optional supporting files. Check your agent&apos;s documentation for its discovery directory and precedence rules.</p></aside></div></div></>;
}
