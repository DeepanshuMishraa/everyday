import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories } from "@/catalog/categories";
import { CopyButton, DownloadButton } from "@/components/SkillActions";
import { SkillDocumentView } from "@/components/SkillDocumentView";
import { SkillUseActions } from "@/components/SkillUseActions";
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
  const title = `${skill.title} Practical Workflow`;
  const description = metaDescription(`${skill.outcome} Free, step-by-step guidance you can read now or reuse with an AI agent.`);
  const path = `/skills/${skill.slug}/`;
  return {
    title,
    description,
    keywords: [...skill.tags, skill.title, "AI agent skill", "SKILL.md"],
    alternates: { canonical: path },
    openGraph: { type: "article", url: path, title: `${title} | Everyday`, description, modifiedTime: skill.updated, images: [{ url: `${path}opengraph-image`, width: 1200, height: 630, alt: `${skill.title} — an Everyday practical workflow` }] },
    twitter: { card: "summary_large_image", title: `${title} | Everyday`, description, images: [`${path}opengraph-image`] },
  };
}

export default async function SkillPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const skill = getSkill(slug);
  if (!skill) notFound();
  const category = categories.find((item) => item.slug === skill.category);
  if (!category) notFound();
  const repo = process.env.NEXT_PUBLIC_SKILLS_REPOSITORY ?? "DeepanshuMishraa/everyday-agent-skills";
  const install = `npx skills add ${repo}@${skill.slug} -g -y`;
  const reportMatches = skill.evaluation?.skillHash === skill.hash && skill.evaluation?.suiteHash === skill.suiteHash;
  const reviewed = reportMatches && skill.evaluation?.status === "instruction-review-pass";
  const path = `/skills/${skill.slug}/`;

  return <>
    <JsonLd data={{ "@context": "https://schema.org", "@graph": [
      { "@type": "DigitalDocument", "@id": `${absoluteUrl(path)}#workflow`, name: skill.title, description: skill.description, url: absoluteUrl(path), inLanguage: site.language, encodingFormat: "text/markdown", isAccessibleForFree: true, dateModified: skill.updated, isPartOf: { "@id": `${site.url}/#website` }, about: skill.tags, mainEntityOfPage: absoluteUrl(path) },
      breadcrumbSchema([{ name: "Everyday", path: "/" }, { name: "Workflows", path: "/skills/" }, { name: category.name, path: `/categories/${category.slug}/` }, { name: skill.title, path }]),
    ] }} />
    <div className="wrap"><nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/skills">Workflows</Link><span aria-hidden="true">/</span><Link href={`/categories/${category.slug}`}>{category.name}</Link><span aria-hidden="true">/</span><span>{skill.title}</span></nav></div>
    <header className={`skill-hero accent-${category.color}`}>
      <div className="wrap skill-hero-grid">
        <div><p className="eyebrow">{category.name}</p><h1>{skill.title}</h1><p className="skill-description">{skill.description}</p><div className="hero-tag-list" aria-label="Workflow topics">{skill.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div><SkillUseActions slug={skill.slug} /></div>
        <aside className="skill-fact"><span>What you will leave with</span><p>{skill.outcome}</p></aside>
      </div>
    </header>
    <div className="wrap skill-layout">
      <div className="skill-content">
        <SkillDocumentView body={skill.body} files={skill.files} />
        <EvaluationReportView report={skill.evaluation} scenarios={skill.evaluationScenarios} current={reportMatches} />
      </div>
      <aside className="skill-sidebar">
        <section><h2>Try asking your agent</h2><ul>{skill.examples.map((example) => <li key={example}>“{example}”</li>)}</ul></section>
        <section className="agent-setup"><h2>Optional agent setup</h2><p>Install this workflow if you want a compatible AI agent to reuse it.</p><details><summary>Show installation options</summary><div className="command"><code>{install}</code><CopyButton value={install} label="Copy command" event="install_command_copy" skill={skill.slug} /></div><DownloadButton files={skill.files} slug={skill.slug} /><CopyButton value={skill.markdown} label="Copy source file" event="skill_copy" skill={skill.slug} /></details></section>
        <section className="file-facts"><h2>About this workflow</h2><dl><div><dt>Review</dt><dd><span className={reviewed ? "status passed" : "status pending"}>{reviewed ? "Guidance reviewed" : "Review pending"}</span></dd></div><div><dt>Version</dt><dd>{skill.version}</dd></div><div><dt>References</dt><dd>{skill.fileCount}</dd></div><div><dt>Updated</dt><dd>{skill.updated}</dd></div></dl><Link className="text-link" href="/methodology">How reviews work →</Link></section>
      </aside>
    </div>
  </>;
}
