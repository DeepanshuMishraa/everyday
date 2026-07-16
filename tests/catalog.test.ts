import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import MiniSearch from "minisearch";
import { categories } from "../catalog/categories";
import { skills } from "../catalog/skills";
import { specs } from "../catalog/specs";
import { validateSkill } from "../lib/skills/validate";

describe("launch catalog", () => {
  it("contains exactly thirty unique, non-developer skills", () => {
    expect(skills).toHaveLength(30);
    expect(new Set(skills.map((skill) => skill.slug)).size).toBe(30);
    expect(skills.some((skill) => /\b(?:developer|react|database|persona)\b/i.test(`${skill.slug} ${skill.title}`))).toBe(false);
  });

  it("contains five skills in each of six categories", () => {
    expect(categories).toHaveLength(6);
    for (const category of categories) expect(skills.filter((skill) => skill.category === category.slug)).toHaveLength(5);
  });

  it("has a bespoke specification and valid SKILL.md for every entry", () => {
    for (const skill of skills) {
      expect(specs[skill.slug]).toBeDefined();
      const markdown = fs.readFileSync(path.join(process.cwd(), "skills", skill.slug, "SKILL.md"), "utf8");
      expect(validateSkill(markdown, skill)).toMatchObject({ passed: true });
    }
  });

  it("covers the required natural-language searches", () => {
    const index = new MiniSearch({ fields: ["title", "description", "outcome", "examples", "tags"], storeFields: ["slug"], searchOptions: { boost: { title: 3, tags: 2, examples: 1.5 }, fuzzy: 0.22, prefix: true } });
    index.addAll(skills.map((skill) => ({ ...skill, id: skill.slug })));
    const expected = new Map([
      ["I feel overwhelmed", "overwhelm-to-next-action"],
      ["what can I cook", "fridge-to-table-rescue"],
      ["suspicious text", "scam-message-check"],
      ["prepare for doctor", "appointment-prep-brief"],
      ["missed my workouts", "return-to-exercise"],
    ]);
    for (const [query, slug] of expected) expect(index.search(query)[0]?.slug).toBe(slug);
  });
});
