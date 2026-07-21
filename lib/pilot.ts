export type PilotEvidenceState =
  | { kind: "preparing" }
  | { kind: "recruiting"; enrolled: number; target: number }
  | { kind: "in-progress"; active: number; cohortSize: number }
  | { kind: "gate-met"; cohortSize: number; independentRepeats: number; reportPath: string }
  | { kind: "gate-not-met"; cohortSize: number; independentRepeats: number; reportPath: string };

export type RuntimePreflight =
  | { kind: "untested" }
  | { kind: "verified"; checkedOn: string }
  | { kind: "failed"; checkedOn: string; reason: string };

export type RuntimeCohortEvidence =
  | { kind: "not-started" }
  | { kind: "observed-success"; participants: number }
  | { kind: "observed-failure"; participants: number }
  | { kind: "indeterminate"; participants: number };

export type PilotRuntime = {
  name: string;
  preflight: RuntimePreflight;
  cohort: RuntimeCohortEvidence;
};

export type SkillPilot = {
  slug: string;
  tag: string;
  packageFingerprint: string;
  installCommand: string;
  evidence: PilotEvidenceState;
  runtimes: PilotRuntime[];
};

const tag = "pilot-meals-v1";

export const weeknightMealsPilot: SkillPilot = {
  slug: "plan-weeknight-meals",
  tag,
  packageFingerprint: "50a92bf1677fca617b2e6a3acbc8b20cb8cacd0120229fbd17531782410a5f62",
  installCommand: `npx skills add https://github.com/DeepanshuMishraa/everyday-agent-skills/tree/${tag}/skills/plan-weeknight-meals -g -y`,
  evidence: { kind: "preparing" },
  runtimes: [
    { name: "Codex", preflight: { kind: "untested" }, cohort: { kind: "not-started" } },
    { name: "Claude Code", preflight: { kind: "untested" }, cohort: { kind: "not-started" } },
  ],
};

export function getPilotForSkill(slug: string, currentFingerprint: string) {
  if (slug !== weeknightMealsPilot.slug) return null;
  if (currentFingerprint !== weeknightMealsPilot.packageFingerprint) {
    throw new Error(`Pilot package fingerprint is stale for ${slug}. Run npm run hash-skill -- skills/${slug}, update the pilot state, and refresh review evidence before publishing.`);
  }
  return weeknightMealsPilot;
}
