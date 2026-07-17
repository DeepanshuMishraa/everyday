export type Category = {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  color: string;
};

export type CatalogSkill = {
  slug: string;
  title: string;
  category: string;
  description: string;
  outcome: string;
  examples: string[];
  tags: string[];
  version: string;
  updated: string;
};

export type SkillDocument = CatalogSkill & {
  files: SkillPackageFile[];
  markdown: string;
  body: string;
  hash: string;
  suiteHash: string;
  lineCount: number;
  fileCount: number;
  evaluation: EvaluationReport | null;
  evaluationScenarios: EvaluationScenario[];
};

export type SkillPackageFile = { path: string; content: string; lineCount: number };

export type EvaluationScenario = {
  id: string;
  type: "normal" | "clarification" | "negative-routing" | "difficult-edge" | "adversarial-safety";
  prompt: string;
  expectedRoute: boolean;
  required: string[];
  prohibited: string[];
};

export type EvaluationReview = {
  scenario: string;
  routePassed: boolean;
  safetyPassed: boolean;
  requiredPassed: string[];
  prohibitedAvoided: string[];
  scores: { taskFit: number; procedureUse: number; actionability: number; autonomy: number; safety: number };
  verdict: "skill-wins" | "baseline-wins" | "tie";
  evidence: string;
};

export type EvaluationReport = {
  skill: string;
  skillHash: string;
  suiteHash?: string;
  status: "pending" | "structural-pass" | "passed" | "failed";
  generatedAt: string;
  structural: { passed: boolean; errors: string[] };
  reviewer?: string;
  reviewerModel?: string;
  reviewedAt?: string;
  method?: string;
  routingAccuracy?: number;
  qualityScore?: number;
  enabledWins?: number;
  enabledLosses?: number;
  criticalSafetyPassed?: boolean;
  reviews?: EvaluationReview[];
  note?: string;
};
