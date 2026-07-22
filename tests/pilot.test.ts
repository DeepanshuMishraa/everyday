import { describe, expect, it } from "vitest";
import { getPilotForSkill, weeknightMealsPilot } from "../lib/pilot";

describe("getPilotForSkill", () => {
  it("returns the pilot when its package fingerprint is current", () => {
    expect(
      getPilotForSkill(
        weeknightMealsPilot.slug,
        weeknightMealsPilot.packageFingerprint,
      ),
    ).toBe(weeknightMealsPilot);
  });

  it("suppresses a pilot whose package fingerprint is stale", () => {
    expect(getPilotForSkill(weeknightMealsPilot.slug, "stale")).toBeNull();
  });
});
