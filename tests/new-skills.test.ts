import { describe, expect, it } from "vitest";
import { getNewSkills, wasAddedWithinDays } from "../lib/skills/new";
import type { CatalogSkill } from "../lib/types";

function skill(slug: string, added: string): CatalogSkill {
  return {
    slug,
    title: slug,
    category: "test",
    description: "Test workflow",
    outcome: "Test outcome",
    examples: [],
    tags: [],
    version: "1.0.0",
    added,
    updated: added,
  };
}

describe("new workflow window", () => {
  const now = new Date("2026-07-23T18:30:00.000Z");

  it("includes today and the previous three calendar days", () => {
    expect(wasAddedWithinDays("2026-07-23", 4, now)).toBe(true);
    expect(wasAddedWithinDays("2026-07-20", 4, now)).toBe(true);
    expect(wasAddedWithinDays("2026-07-19", 4, now)).toBe(false);
  });

  it("excludes invalid and future dates", () => {
    expect(wasAddedWithinDays("not-a-date", 4, now)).toBe(false);
    expect(wasAddedWithinDays("2026-07-24", 4, now)).toBe(false);
  });

  it("returns recent workflows newest first", () => {
    expect(
      getNewSkills(
        [
          skill("older", "2026-07-19"),
          skill("today", "2026-07-23"),
          skill("yesterday", "2026-07-22"),
        ],
        4,
        now,
      ).map(({ slug }) => slug),
    ).toEqual(["today", "yesterday"]);
  });
});
