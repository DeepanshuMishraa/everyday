import matter from "gray-matter";
import type { CatalogSkill } from "@/lib/types";

export const requiredSections = [
  "Objective", "Intake", "Workflow", "Decision Rules", "Safety and Boundaries", "Output Contract", "Quality Checklist",
];

export function validateSkill(markdown: string, catalog: CatalogSkill) {
  const errors: string[] = [];
  const parsed = matter(markdown);
  const frontmatterKeys = Object.keys(parsed.data).sort();
  if (frontmatterKeys.join(",") !== "description,name") errors.push("Frontmatter must contain only name and description.");
  if (parsed.data.name !== catalog.slug) errors.push("Frontmatter name must match the catalog slug.");
  const wordCount = String(parsed.data.description ?? "").trim().split(/\s+/).filter(Boolean).length;
  if (wordCount < 30 || wordCount > 80) errors.push(`Description must contain 30–80 words; found ${wordCount}.`);
  for (const section of requiredSections) {
    if (!parsed.content.includes(`## ${section}`)) errors.push(`Missing section: ${section}.`);
  }
  const bodyLines = parsed.content.trim().split("\n").length;
  if (bodyLines > 300) errors.push(`Body exceeds 300 lines; found ${bodyLines}.`);
  if (/\b(curl|sudo|chmod|api[_ -]?key|password)\b/i.test(parsed.content)) errors.push("Skill body contains a prohibited command, secret, or permission term.");
  if (/think like|in the style of|act as (?:a |an )?(?:celebrity|guru)/i.test(parsed.content)) errors.push("Skill contains persona imitation language.");
  return { passed: errors.length === 0, errors, bodyLines, descriptionWords: wordCount };
}
