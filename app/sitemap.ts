import type { MetadataRoute } from "next";
import { categories } from "@/catalog/categories";
import { getAllSkills } from "@/lib/skills";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const skills = getAllSkills();
  const latest = skills.reduce(
    (date, skill) => (skill.updated > date ? skill.updated : date),
    "2026-01-01",
  );
  return [
    {
      url: absoluteUrl("/"),
      lastModified: latest,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/skills/"),
      lastModified: latest,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/install/"),
      lastModified: latest,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/methodology/"),
      lastModified: latest,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/privacy/"),
      lastModified: latest,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...categories.map((category) => ({
      url: absoluteUrl(`/categories/${category.slug}/`),
      lastModified: latest,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...skills.map((skill) => ({
      url: absoluteUrl(`/skills/${skill.slug}/`),
      lastModified: skill.updated,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
