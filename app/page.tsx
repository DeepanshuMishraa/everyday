import Link from "next/link";
import { categories } from "@/catalog/categories";
import { SearchLibrary } from "@/components/SearchLibrary";
import { JsonLd } from "@/components/JsonLd";
import { getAllSkills } from "@/lib/skills";
import { absoluteUrl, site } from "@/lib/site";

export default function Home() {
  const skills = getAllSkills();
  const metadata = skills.map(({ markdown: _markdown, body: _body, hash: _hash, lineCount: _lineCount, evaluation: _evaluation, ...skill }) => skill);
  return <>
    <JsonLd data={{ "@context": "https://schema.org", "@graph": [
      { "@type": "CollectionPage", "@id": `${site.url}/#collection`, name: "Everyday AI Agent Skills Library", description: site.description, url: site.url, isPartOf: { "@id": `${site.url}/#website` }, inLanguage: site.language, mainEntity: { "@id": `${site.url}/#skill-list` } },
      { "@type": "ItemList", "@id": `${site.url}/#skill-list`, name: "30 practical AI agent skills for everyday life", numberOfItems: skills.length, itemListElement: skills.map((skill, index) => ({ "@type": "ListItem", position: index + 1, name: skill.title, url: absoluteUrl(`/skills/${skill.slug}/`) })) },
    ] }} />
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">Everyday · Practical agent skills</p>
        <h1>Give your agent skills for real life.</h1>
        <p className="hero-deck">Thirty open, installable procedures for cooking, workouts, paperwork, shared care, money routines, travel, and the difficult middle of an ordinary week.</p>
        <div className="hero-actions"><Link className="button primary" href="#library">Find a skill</Link><Link className="text-link" href="/methodology">See how each package is reviewed <span aria-hidden="true">→</span></Link></div>
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
      <div className="section-heading"><div><p className="eyebrow">Six parts of everyday life</p><h2>Designed around situations, not personas.</h2></div><p>Every category contains five practical skills. The constraint keeps the launch useful, legible, and reviewable.</p></div>
      <div className="category-grid">{categories.map((category, index) => <Link key={category.slug} href={`/categories/${category.slug}`} className={`category-block accent-${category.color}`}><span>0{index + 1}</span><h3>{category.name}</h3><p>{category.description}</p><strong>Browse 5 skills →</strong></Link>)}</div>
    </section>
    <section className="method-callout"><p className="eyebrow">The current-package rule</p><h2>If any included file changes, its reviewed status disappears.</h2><p>Every report is bound to the exact SHA-256 hash of the complete skill folder. Structural checks are automatic; Codex&apos;s instruction-coverage evidence is published separately.</p><Link className="button light" href="/methodology">Read the methodology</Link></section>
  </>;
}
