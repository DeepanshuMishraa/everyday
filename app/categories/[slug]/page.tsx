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
  const title = `${category.name} AI Agent Skills`;
  const description = metaDescription(`Browse five free, installable AI agent skills for ${category.name.toLowerCase()}. ${category.description} Inspect every package before installing.`);
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
    { "@type": "CollectionPage", "@id": `${absoluteUrl(path)}#collection`, name: `${category.name} AI Agent Skills`, description: category.description, url: absoluteUrl(path), isPartOf: { "@id": `${site.url}/#website` }, inLanguage: site.language, mainEntity: { "@id": `${absoluteUrl(path)}#skills` } },
    breadcrumbSchema([{ name: "Everyday", path: "/" }, { name: category.name, path }]),
    { "@type": "ItemList", "@id": `${absoluteUrl(path)}#skills`, numberOfItems: skills.length, itemListElement: skills.map((skill, index) => ({ "@type": "ListItem", position: index + 1, name: skill.title, url: absoluteUrl(`/skills/${skill.slug}/`) })) },
  ] }} /><section className="category-page"><div className="breadcrumb"><Link href="/">Library</Link><span>/</span><span>{category.name}</span></div><header className={`category-header accent-${category.color}`}><p className="eyebrow">Everyday category · 5 skills</p><h1>{category.name}</h1><p>{category.description}</p></header><div className="category-skill-list">{skills.map((skill, index) => <Link href={`/skills/${skill.slug}`} key={skill.slug}><span>{String(index + 1).padStart(2, "0")}</span><div><h2>{skill.title}</h2><p>{skill.outcome}</p><small>{skill.examples[0]}</small></div><b aria-hidden="true">↗</b></Link>)}</div></section></>;
}
