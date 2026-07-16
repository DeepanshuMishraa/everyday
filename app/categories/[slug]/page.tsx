import Link from "next/link";
import { notFound } from "next/navigation";
import { categories } from "@/catalog/categories";
import { getSkillsForCategory } from "@/lib/skills";

export const dynamicParams = false;
export function generateStaticParams() { return categories.map(({ slug }) => ({ slug })); }

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();
  const skills = getSkillsForCategory(slug);
  return <section className="category-page"><div className="breadcrumb"><Link href="/">Library</Link><span>/</span><span>{category.name}</span></div><header className={`category-header accent-${category.color}`}><p className="eyebrow">Category · 5 procedures</p><h1>{category.name}</h1><p>{category.description}</p></header><div className="category-skill-list">{skills.map((skill, index) => <Link href={`/skills/${skill.slug}`} key={skill.slug}><span>{String(index + 1).padStart(2, "0")}</span><div><h2>{skill.title}</h2><p>{skill.outcome}</p><small>{skill.examples[0]}</small></div><b aria-hidden="true">↗</b></Link>)}</div></section>;
}
