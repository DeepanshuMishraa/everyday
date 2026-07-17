import Link from "next/link";
import { categories } from "@/catalog/categories";
import { SearchLibrary } from "@/components/SearchLibrary";
import { getAllSkills } from "@/lib/skills";

export default function Home() {
  const skills = getAllSkills();
  const metadata = skills.map(({ markdown: _markdown, body: _body, hash: _hash, lineCount: _lineCount, evaluation: _evaluation, ...skill }) => skill);
  return <>
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">Everyday agent skills · Edition 01</p>
        <h1>Better judgment for the work nobody teaches.</h1>
        <p className="hero-deck">Thirty open procedures that turn an AI agent into a more careful partner for meals, paperwork, shared care, money routines, travel, and the difficult middle of a week.</p>
        <div className="hero-actions"><Link className="button primary" href="#library">Find a skill</Link><Link className="text-link" href="/methodology">See how each skill is tested <span aria-hidden="true">→</span></Link></div>
      </div>
      <aside className="hero-note" aria-label="Library principles">
        <span className="note-label">A field note</span>
        <p>Not a life coach.<br />Not a celebrity persona.<br />Not another giant prompt.</p>
        <p className="note-small">Each file handles one recurring moment with an observable finish line and a boundary where the agent must stop.</p>
        <span className="edition-mark">30 / 30</span>
      </aside>
    </section>
    <section className="principles-strip" aria-label="Catalog principles"><span>Specific moment</span><span>Repeatable procedure</span><span>Verifiable output</span><span>Safe boundary</span></section>
    <SearchLibrary skills={metadata} categories={categories} />
    <section className="category-overview">
      <div className="section-heading"><div><p className="eyebrow">Six parts of ordinary life</p><h2>Designed around situations, not personas.</h2></div><p>Every category contains five procedures. The constraint keeps the launch useful, legible, and testable.</p></div>
      <div className="category-grid">{categories.map((category, index) => <Link key={category.slug} href={`/categories/${category.slug}`} className={`category-block accent-${category.color}`}><span>0{index + 1}</span><h3>{category.name}</h3><p>{category.description}</p><strong>Browse 5 skills →</strong></Link>)}</div>
    </section>
    <section className="method-callout"><p className="eyebrow">The tested-package rule</p><h2>If any included file changes, its tested status disappears.</h2><p>Every report is bound to the exact SHA-256 hash of the complete skill folder. Structural checks are automatic; Codex&apos;s scenario judgments and written evidence are published separately.</p><Link className="button light" href="/methodology">Read the methodology</Link></section>
  </>;
}
