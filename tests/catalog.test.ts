import { describe, expect, it } from "vitest";
import { categories } from "../catalog/categories";
import { getAllSkills } from "../lib/skills";
import { createSkillSearch, searchSkills } from "../lib/skills/search";
import { validateSkill } from "../lib/skills/validate";

const skills = getAllSkills();

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

  it("has a valid, self-contained package for every entry", () => {
    for (const skill of skills) {
      expect(validateSkill(skill.files, skill)).toMatchObject({ passed: true });
      expect(skill.files.some((file) => file.path === "agents/openai.yaml")).toBe(true);
    }
    expect(skills.filter((skill) => skill.fileCount > 2).length).toBeGreaterThanOrEqual(20);
  });

  it("covers the required natural-language searches", () => {
    const index = createSkillSearch(skills);
    const expected = new Map([
      ["I feel overwhelmed", "get-unstuck"],
      ["I don't know where to start", "get-unstuck"],
      ["what can I cook", "cook-with-what-you-have"],
      ["suspicious text", "check-a-suspicious-message"],
      ["prepare for doctor", "prepare-for-an-appointment"],
      ["missed my workouts", "restart-working-out"],
      ["cancel netflix", "audit-subscriptions"],
      ["moving house", "plan-a-home-move"],
      ["fight with my partner", "cool-down-an-angry-message"],
      ["refund denied", "get-a-return-or-refund"],
      ["pack for a holiday", "pack-for-a-trip"],
      ["pay my bills", "organize-monthly-bills"],
      ["I don't know what to choose", "make-a-hard-decision"],
    ]);
    for (const [query, slug] of expected) expect(searchSkills(index, skills, query)[0]?.slug).toBe(slug);
  });
});
