import { categories } from "@/catalog/categories";
import { getAllSkills } from "@/lib/skills";
import { absoluteUrl, site } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const skills = getAllSkills();
  const lines = [
    "# Everyday",
    "",
    "> Everyday is a free library of practical, installable AI agent skills for recurring situations in daily life.",
    "",
    "Each package exposes its complete SKILL.md and supporting files. Reports are instruction-coverage reviews, not execution grades or real-world guarantees.",
    "",
    "## Primary pages",
    `- [Skill library](${absoluteUrl("/")})`,
    `- [Installation guide](${absoluteUrl("/install/")})`,
    `- [Review methodology](${absoluteUrl("/methodology/")})`,
    `- [Source repository](${site.repositoryUrl})`,
    "",
    "## Categories",
    ...categories.map((category) => `- [${category.name}](${absoluteUrl(`/categories/${category.slug}/`)}): ${category.description}`),
    "",
    "## Skills",
    ...skills.map((skill) => `- [${skill.title}](${absoluteUrl(`/skills/${skill.slug}/`)}): ${skill.outcome}`),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
