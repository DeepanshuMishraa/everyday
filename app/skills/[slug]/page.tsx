import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories } from "@/catalog/categories";
import { CopyButton, DownloadButton } from "@/components/SkillActions";
import { SkillDocumentView } from "@/components/SkillDocumentView";
import { EvaluationReportView } from "@/components/EvaluationReportView";
import { JsonLd } from "@/components/JsonLd";
import { getAllSkills, getSkill } from "@/lib/skills";
import { absoluteUrl, breadcrumbSchema, metaDescription, site } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() { return getAllSkills().map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const skill = getSkill(slug);
  if (!skill) return {};
  const title = `${skill.title} AI Agent Skill`;
  const description = metaDescription(`${skill.outcome} Free, inspectable SKILL.md package for AI agents.`);
  const path = `/skills/${skill.slug}/`;
  return {
    title,
    description,
    keywords: [...skill.tags, skill.title, "AI agent skill", "SKILL.md"],
    alternates: { canonical: path },
    openGraph: { type: "article", url: path, title: `${title} | Everyday`, description, modifiedTime: skill.updated, images: [{ url: `${path}opengraph-image`, width: 1200, height: 630, alt: `${skill.title} — an Everyday AI agent skill` }] },
    twitter: { card: "summary_large_image", title: `${title} | Everyday`, description, images: [`${path}opengraph-image`] },
  };
}

export default async function SkillPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const skill = getSkill(slug);
  if (!skill) notFound();
  const category = categories.find((item) => item.slug === skill.category)!;
  const repo = process.env.NEXT_PUBLIC_SKILLS_REPOSITORY ?? "DeepanshuMishraa/everyday-agent-skills";
  const install = `npx skills add ${repo}@${skill.slug} -g -y`;
  const reportMatches = skill.evaluation?.skillHash === skill.hash && skill.evaluation?.suiteHash === skill.suiteHash;
  const reviewed = reportMatches && skill.evaluation?.status === "instruction-review-pass";
  const path = `/skills/${skill.slug}/`;

  return <>
    <JsonLd data={{ "@context": "https://schema.org", "@graph": [
      { "@type": "DigitalDocument", "@id": `${absoluteUrl(path)}#skill`, name: `${skill.title} AI Agent Skill`, headline: skill.title, description: skill.description, url: absoluteUrl(path), inLanguage: site.language, encodingFormat: "text/markdown", isAccessibleForFree: true, version: skill.version, dateModified: skill.updated, isPartOf: { "@id": `${site.url}/#website` }, about: skill.tags, mainEntityOfPage: absoluteUrl(path) },
      breadcrumbSchema([{ name: "Everyday", path: "/" }, { name: category.name, path: `/categories/${category.slug}/` }, { name: skill.title, path }]),
    ] }} />
    <div className="wrap"><nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Library</Link><span aria-hidden="true">/</span><Link href={`/categories/${category.slug}`}>{category.name}</Link><span aria-hidden="true">/</span><span>{skill.title}</span></nav></div>
    <header className={`skill-hero accent-${category.color}`}>
      <div className="wrap skill-hero-grid">
        <div><p className="eyebrow"><span className="cat-dot" aria-hidden="true" />{category.name} — v{skill.version}</p><h1>{skill.title}</h1><p className="skill-description">{skill.description}</p></div>
        <aside className="skill-fact"><span>Observable outcome</span><p>{skill.outcome}</p></aside>
      </div>
    </header>
    <div className="wrap skill-layout">
      <aside className="skill-sidebar">
        <section><h2>Install</h2><div className="command"><code>{install}</code><CopyButton value={install} label="Copy command" event="install_command_copy" skill={skill.slug} /></div><DownloadButton files={skill.files} slug={skill.slug} /><CopyButton value={skill.markdown} label="Copy SKILL.md" event="skill_copy" skill={skill.slug} /></section>
        <section><h2>Try asking</h2><ul>{skill.examples.map((example) => <li key={example}>“{example}”</li>)}</ul></section>
        <section className="file-facts"><h2>Package record</h2><dl><div><dt>Status</dt><dd><span className={reviewed ? "status passed" : "status pending"}>{reviewed ? "Instructions reviewed" : "Review pending"}</span></dd></div><div><dt>Version</dt><dd>{skill.version}</dd></div><div><dt>Files</dt><dd>{skill.fileCount}</dd></div><div><dt>SKILL.md lines</dt><dd>{skill.lineCount}</dd></div><div><dt>Package SHA-256</dt><dd title={skill.hash}>{skill.hash.slice(0, 12)}…</dd></div><div><dt>Updated</dt><dd>{skill.updated}</dd></div></dl><Link className="text-link" href="/methodology">What status means →</Link></section>
      </aside>
      <div className="skill-content">
        <SkillDocumentView body={skill.body} files={skill.files} />
        <EvaluationReportView report={skill.evaluation} scenarios={skill.evaluationScenarios} current={reportMatches} />
      </div>
    </div>
  </>;
}
