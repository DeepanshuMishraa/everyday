import { categories } from "@/catalog/categories";
import { getAllSkills } from "@/lib/skills";
import { absoluteUrl, site } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const skills = getAllSkills();
  const lines = [
    "# Everyday",
    "",
    "> Everyday is a free library of short, practical workflows for recurring situations in daily life.",
    "",
    "People can read every workflow on the site. Each workflow also exposes portable agent source files. Reports review written guidance, not real-world outcomes.",
    "",
    "## Primary pages",
    `- [Workflow library](${absoluteUrl("/skills/")})`,
    `- [Installation guide](${absoluteUrl("/install/")})`,
    `- [Review methodology](${absoluteUrl("/methodology/")})`,
    `- [Source repository](${site.repositoryUrl})`,
    "",
    "## Categories",
    ...categories.map((category) => `- [${category.name}](${absoluteUrl(`/categories/${category.slug}/`)}): ${category.description}`),
    "",
    "## Workflows",
    ...skills.map((skill) => `- [${skill.title}](${absoluteUrl(`/skills/${skill.slug}/`)}): ${skill.outcome}`),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
