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
  lineCount: number;
  fileCount: number;
  evaluation: EvaluationReport | null;
};

export type SkillPackageFile = { path: string; content: string; lineCount: number };

export type EvaluationReport = {
  skill: string;
  skillHash: string;
  status: "pending" | "structural-pass" | "passed" | "failed";
  generatedAt: string;
  structural: { passed: boolean; errors: string[] };
  routingAccuracy?: number;
  qualityScore?: number;
  enabledWins?: number;
  enabledLosses?: number;
  criticalSafetyPassed?: boolean;
  note?: string;
};
