import Link from "next/link";
import { categories } from "@/catalog/categories";
import { SearchLibrary } from "@/components/SearchLibrary";
import { Reveal } from "@/components/Reveal";
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
    <section className="hero wrap">
      <p className="eyebrow rise">Everyday — practical agent skills<span className="cursor" aria-hidden="true" /></p>
      <h1 className="rise rise-1">Give your agent skills for real life.</h1>
      <p className="hero-deck rise rise-2">Thirty open, installable procedures for cooking, workouts, paperwork, shared care, money routines, travel, and the difficult middle of an ordinary week.</p>
      <div className="hero-actions rise rise-3">
        <Link className="button primary" href="#library">Browse the library</Link>
        <Link className="button secondary" href="/methodology">How we review</Link>
      </div>
    </section>
    <div className="stats-strip">
      <div className="wrap stats-grid">
        <div><strong>30</strong><span>installable skills</span></div>
        <div><strong>06</strong><span>parts of everyday life</span></div>
        <div><strong>10</strong><span>scenarios per skill</span></div>
        <div><strong>sha-256</strong><span>hash-bound reviews</span></div>
      </div>
    </div>
    <SearchLibrary skills={metadata} categories={categories} />
    <section className="category-overview">
      <div className="wrap">
        <Reveal className="section-heading">
          <div><p className="eyebrow">Six parts of everyday life</p><h2>Designed around situations, not personas.</h2></div>
          <p>Every category contains five practical skills. The constraint keeps the launch useful, legible, and reviewable.</p>
        </Reveal>
        <div className="category-grid">
          {categories.map((category, index) => (
            <Reveal key={category.slug} delay={index * 60}>
              <Link href={`/categories/${category.slug}`} className={`category-block accent-${category.color}`}>
                <span className="cat-index"><span className="cat-dot" aria-hidden="true" />{String(index + 1).padStart(2, "0")}</span>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                <strong>Browse 5 skills <i aria-hidden="true">→</i></strong>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  </>;
}
