import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories } from "@/catalog/categories";
import { JsonLd } from "@/components/JsonLd";
import { getSkillsForCategory } from "@/lib/skills";
import { absoluteUrl, breadcrumbSchema, metaDescription, site } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() { return categories.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  if (!category) return {};
  const title = `${category.name} Practical Workflows`;
  const description = metaDescription(`Browse five free, step-by-step workflows for ${category.name.toLowerCase()}. ${category.description}`);
  const path = `/categories/${category.slug}/`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", url: path, title: `${title} | Everyday`, description, images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Everyday practical AI agent skills" }] },
    twitter: { card: "summary_large_image", title: `${title} | Everyday`, description, images: ["/opengraph-image"] },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();
  const skills = getSkillsForCategory(slug);
  const path = `/categories/${category.slug}/`;
  return <><JsonLd data={{ "@context": "https://schema.org", "@graph": [
    { "@type": "CollectionPage", "@id": `${absoluteUrl(path)}#collection`, name: `${category.name} practical workflows`, description: category.description, url: absoluteUrl(path), isPartOf: { "@id": `${site.url}/#website` }, inLanguage: site.language, mainEntity: { "@id": `${absoluteUrl(path)}#skills` } },
    breadcrumbSchema([{ name: "Everyday", path: "/" }, { name: "Workflows", path: "/skills/" }, { name: category.name, path }]),
    { "@type": "ItemList", "@id": `${absoluteUrl(path)}#skills`, numberOfItems: skills.length, itemListElement: skills.map((skill, index) => ({ "@type": "ListItem", position: index + 1, name: skill.title, url: absoluteUrl(`/skills/${skill.slug}/`) })) },
  ] }} /><section className="category-page"><div className="wrap"><nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/skills">Workflows</Link><span aria-hidden="true">/</span><span>{category.name}</span></nav></div><header className={`category-header accent-${category.color}`}><div className="wrap"><p className="eyebrow">Everyday category — 5 workflows</p><h1>{category.name}</h1><p>{category.description}</p></div></header><div className="wrap category-skill-list"><div className="ledger">{skills.map((skill, index) => <Link className="skill-row" href={`/skills/${skill.slug}`} key={skill.slug} style={{ animationDelay: `${index * 30}ms` }}><span className="skill-number">{String(index + 1).padStart(2, "0")}</span><span className="skill-main"><strong>{skill.title}</strong><span>{skill.outcome}</span><small>“{skill.examples[0]}”</small></span><span className="skill-tags">{skill.tags.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}</span><span className="skill-arrow" aria-hidden="true">View</span></Link>)}</div></div></section></>;
}
