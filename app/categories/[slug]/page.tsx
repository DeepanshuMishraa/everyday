import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories } from "@/catalog/categories";
import { JsonLd } from "@/components/JsonLd";
import { getSkillsForCategory } from "@/lib/skills";
import {
  absoluteUrl,
  breadcrumbSchema,
  metaDescription,
  site,
} from "@/lib/site";
import {
  accentClass,
  breadcrumb,
  container,
  eyebrow,
  heading,
  skillArrow,
  skillMain,
  skillNumber,
  skillRow,
  skillTags,
  tag,
} from "@/lib/tailwind";

export const dynamicParams = false;
export function generateStaticParams() {
  return categories.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  if (!category) return {};
  const title = `${category.name} Practical Workflows`;
  const description = metaDescription(
    `Browse five free, step-by-step workflows for ${category.name.toLowerCase()}. ${category.description}`,
  );
  const path = `/categories/${category.slug}/`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      title: `${title} | Everyday`,
      description,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Everyday practical AI agent skills",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Everyday`,
      description,
      images: ["/opengraph-image"],
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();
  const skills = getSkillsForCategory(slug);
  const path = `/categories/${category.slug}/`;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollectionPage",
              "@id": `${absoluteUrl(path)}#collection`,
              name: `${category.name} practical workflows`,
              description: category.description,
              url: absoluteUrl(path),
              isPartOf: { "@id": `${site.url}/#website` },
              inLanguage: site.language,
              mainEntity: { "@id": `${absoluteUrl(path)}#skills` },
            },
            breadcrumbSchema([
              { name: "Everyday", path: "/" },
              { name: "Workflows", path: "/skills/" },
              { name: category.name, path },
            ]),
            {
              "@type": "ItemList",
              "@id": `${absoluteUrl(path)}#skills`,
              numberOfItems: skills.length,
              itemListElement: skills.map((skill, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: skill.title,
                url: absoluteUrl(`/skills/${skill.slug}/`),
              })),
            },
          ],
        }}
      />
      <section>
        <div className={container}>
          <nav className={breadcrumb} aria-label="Breadcrumb">
            <Link href="/skills">Workflows</Link>
            <span aria-hidden="true">/</span>
            <span>{category.name}</span>
          </nav>
        </div>
        <header
          className={`border-b border-line py-16 pb-14 ${accentClass[category.color]}`}
        >
          <div className={container}>
            <p className={eyebrow}>Everyday category — 5 workflows</p>
            <h1 className={`${heading.h1} max-w-[20ch]`}>{category.name}</h1>
            <p className="mt-[1.3rem] max-w-xl text-base text-ink-2">
              {category.description}
            </p>
          </div>
        </header>
        <div className={`${container} pb-24 pt-10`}>
          <div className="mt-10 scroll-mt-[calc(var(--header-h)+20px)] border-t border-line max-[980px]:mt-8 max-[720px]:mt-7">
            {skills.map((skill, index) => (
              <Link
                className={`${skillRow} grid-cols-[44px_minmax(0,1fr)_minmax(220px,0.55fr)_auto]`}
                href={`/skills/${skill.slug}`}
                key={skill.slug}
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <span className={skillNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={`${skillMain} [&>small]:text-[0.78rem] [&>small]:text-ink-3`}
                >
                  <strong>{skill.title}</strong>
                  <span>{skill.outcome}</span>
                  <small>“{skill.examples[0]}”</small>
                </span>
                <span className={skillTags}>
                  {skill.tags.slice(0, 2).map((itemTag) => (
                    <span className={tag} key={itemTag}>
                      {itemTag}
                    </span>
                  ))}
                </span>
                <span className={skillArrow} aria-hidden="true">
                  View
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
