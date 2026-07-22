import type { Metadata } from "next";
import { categories } from "@/catalog/categories";
import { SearchLibrary } from "@/components/SearchLibrary";
import { JsonLd } from "@/components/JsonLd";
import { getAllSkills } from "@/lib/skills";
import { absoluteUrl, site } from "@/lib/site";
import type { CatalogSkill } from "@/lib/types";

const skillCount = getAllSkills().length;

export const metadata: Metadata = {
  title: "Browse Practical Workflows",
  description: `Search ${skillCount} free workflows for everyday tasks, decisions, routines, relationships, food, travel, money, and home life.`,
  alternates: { canonical: "/skills/" },
  openGraph: {
    url: "/skills/",
    title: "Browse Practical Workflows | Everyday",
    description:
      "Find a short, reusable workflow for the situation you are handling now.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Everyday practical workflows for real life",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Browse Practical Workflows | Everyday",
    description:
      "Find a short, reusable workflow for the situation you are handling now.",
    images: ["/opengraph-image"],
  },
};

export default function SkillsPage() {
  const skills = getAllSkills();
  const catalogSkills: CatalogSkill[] = skills.map((skill) => ({
    slug: skill.slug,
    title: skill.title,
    category: skill.category,
    description: skill.description,
    outcome: skill.outcome,
    examples: skill.examples,
    tags: skill.tags,
    version: skill.version,
    updated: skill.updated,
  }));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollectionPage",
              "@id": `${absoluteUrl("/skills/")}#collection`,
              name: "Everyday practical workflows",
              description: site.description,
              url: absoluteUrl("/skills/"),
              isPartOf: { "@id": `${site.url}/#website` },
              inLanguage: site.language,
              mainEntity: { "@id": `${absoluteUrl("/skills/")}#skill-list` },
            },
            {
              "@type": "ItemList",
              "@id": `${absoluteUrl("/skills/")}#skill-list`,
              name: `${skills.length} practical workflows for everyday life`,
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
      <SearchLibrary skills={catalogSkills} categories={categories} />
    </>
  );
}
