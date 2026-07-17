import matter from "gray-matter";
import path from "node:path";
import type { CatalogSkill } from "@/lib/types";
import type { SkillPackageFile } from "@/lib/types";

export function validateSkill(files: SkillPackageFile[], catalog: CatalogSkill) {
  const errors: string[] = [];
  const skillFile = files.find((file) => file.path === "SKILL.md");
  if (!skillFile) return { passed: false, errors: ["Missing SKILL.md."], bodyLines: 0, descriptionWords: 0 };
  const markdown = skillFile.content;
  const parsed = matter(markdown);
  const frontmatterKeys = Object.keys(parsed.data).sort();
  if (frontmatterKeys.join(",") !== "description,name") errors.push("Frontmatter must contain only name and description.");
  if (parsed.data.name !== catalog.slug) errors.push("Frontmatter name must match the catalog slug.");
  const wordCount = String(parsed.data.description ?? "").trim().split(/\s+/).filter(Boolean).length;
  if (wordCount < 15 || wordCount > 80) errors.push(`Description must contain 15–80 words; found ${wordCount}.`);
  if (!/^#\s+\S+/m.test(parsed.content)) errors.push("SKILL.md must have a human-readable H1 title.");
  const bodyLines = parsed.content.trim().split("\n").length;
  if (bodyLines > 500) errors.push(`Body exceeds 500 lines; found ${bodyLines}.`);
  if (/\b(TODO|TBD|PLACEHOLDER)\b/i.test(markdown)) errors.push("SKILL.md contains unfinished placeholder text.");
  if (/think like|in the style of|act as (?:a |an )?(?:celebrity|guru)/i.test(parsed.content)) errors.push("Skill contains persona imitation language.");
  const paths = new Set(files.map((file) => file.path));
  for (const match of parsed.content.matchAll(/\[[^\]]+\]\(([^)#]+)(?:#[^)]+)?\)/g)) {
    const target = path.posix.normalize(match[1]);
    if (!target.includes(":") && !paths.has(target)) errors.push(`Broken package link: ${match[1]}.`);
  }
  const metadata = files.find((file) => file.path === "agents/openai.yaml");
  if (!metadata) errors.push("Missing agents/openai.yaml.");
  else {
    const short = metadata.content.match(/short_description:\s*"([^"]+)"/)?.[1] ?? "";
    const prompt = metadata.content.match(/default_prompt:\s*"([^"]+)"/)?.[1] ?? "";
    if (short.length < 25 || short.length > 64) errors.push("Agent short_description must be 25–64 characters.");
    if (!prompt.includes(`$${catalog.slug}`)) errors.push("Agent default_prompt must mention the skill by $name.");
  }
  return { passed: errors.length === 0, errors, bodyLines, descriptionWords: wordCount };
}
