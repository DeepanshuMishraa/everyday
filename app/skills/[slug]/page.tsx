import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories } from "@/catalog/categories";
import { CopyButton, DownloadButton } from "@/components/SkillActions";
import { SkillDocumentView } from "@/components/SkillDocumentView";
import { getAllSkills, getSkill } from "@/lib/skills";

export const dynamicParams = false;
export function generateStaticParams() { return getAllSkills().map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const skill = getSkill(slug); return skill ? { title: skill.title, description: skill.description } : {}; }

export default async function SkillPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const skill = getSkill(slug);
  if (!skill) notFound();
  const category = categories.find((item) => item.slug === skill.category)!;
  const repo = process.env.NEXT_PUBLIC_SKILLS_REPOSITORY ?? "DeepanshuMishraa/everyday-agent-skills";
  const install = `npx skills add ${repo}@${skill.slug} -g -y`;
  const reportMatches = skill.evaluation?.skillHash === skill.hash;
  const passed = reportMatches && skill.evaluation?.status === "passed";

  return <>
    <div className="breadcrumb"><Link href="/">Library</Link><span>/</span><Link href={`/categories/${category.slug}`}>{category.name}</Link><span>/</span><span>{skill.title}</span></div>
    <header className={`skill-hero accent-${category.color}`}>
      <div><p className="eyebrow">{category.name} · v{skill.version}</p><h1>{skill.title}</h1><p className="skill-description">{skill.description}</p></div>
      <aside className="skill-fact"><span>Observable outcome</span><p>{skill.outcome}</p></aside>
    </header>
    <div className="skill-layout">
      <aside className="skill-sidebar">
        <section><h2>Install</h2><div className="command"><code>{install}</code><CopyButton value={install} label="Copy command" event="install_command_copy" skill={skill.slug} /></div><DownloadButton files={skill.files} slug={skill.slug} /><CopyButton value={skill.markdown} label="Copy SKILL.md" event="skill_copy" skill={skill.slug} /></section>
        <section><h2>Try asking</h2><ul>{skill.examples.map((example) => <li key={example}>“{example}”</li>)}</ul></section>
        <section className="file-facts"><h2>Package record</h2><dl><div><dt>Status</dt><dd><span className={passed ? "status passed" : "status pending"}>{passed ? "Tested" : "Evaluation pending"}</span></dd></div><div><dt>Version</dt><dd>{skill.version}</dd></div><div><dt>Files</dt><dd>{skill.fileCount}</dd></div><div><dt>SKILL.md lines</dt><dd>{skill.lineCount}</dd></div><div><dt>Package SHA-256</dt><dd title={skill.hash}>{skill.hash.slice(0, 12)}…</dd></div><div><dt>Updated</dt><dd>{skill.updated}</dd></div></dl><Link className="text-link" href="/methodology">What status means →</Link></section>
      </aside>
      <div className="skill-content">
        <SkillDocumentView body={skill.body} files={skill.files} />
        <section className="eval-panel"><div><p className="eyebrow">Evaluation report</p><h2>{passed ? "Passed against the published package" : "Codex scenario review pending"}</h2><p>{passed ? "The report hash matches every file in this package and all launch thresholds passed." : "The local validator confirms package structure and references. Codex must still work through the ten routing, quality, and safety scenarios and record evidence; the site does not invent scores."}</p></div><dl><div><dt>Structural</dt><dd>{skill.evaluation?.structural.passed ? "Pass" : "Pending"}</dd></div><div><dt>Package hash match</dt><dd>{reportMatches ? "Yes" : "Not tested"}</dd></div><div><dt>Codex review</dt><dd>{skill.evaluation?.qualityScore ? `${skill.evaluation.qualityScore}/100` : "Pending"}</dd></div><div><dt>Evidence</dt><dd>{passed ? "Complete" : "Pending"}</dd></div></dl></section>
      </div>
    </div>
  </>;
}
