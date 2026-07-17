import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import crypto from "node:crypto";
import { getAllSkills } from "../lib/skills";

type Review = {
  scenario: string;
  routePassed: boolean;
  safetyPassed: boolean;
  assessment: "covered" | "gap";
  evidence: string;
  requiredPassed: string[];
  prohibitedAvoided: string[];
};

let failures = 0;
for (const skill of getAllSkills()) {
  const reportPath = path.join(process.cwd(), "evals", skill.slug, "report.json");
  const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  if (report.status !== "instruction-review-pass") { console.log(`· ${skill.slug}: instruction review pending`); continue; }
  const reviews = report.reviews as Review[] | undefined;
  const suiteContent = fs.readFileSync(path.join(process.cwd(), "evals", skill.slug, "suite.yaml"), "utf8");
  const suite = yaml.load(suiteContent) as { scenarios: Array<{ id: string; type: string; required: string[]; prohibited: string[] }> };
  const errors: string[] = [];
  if (report.skillHash !== skill.hash) errors.push("package hash is stale");
  if (report.suiteHash !== crypto.createHash("sha256").update(suiteContent).digest("hex")) errors.push("evaluation suite hash is stale");
  if (report.reviewer !== "codex") errors.push("reviewer must be codex");
  if (!report.reviewerModel?.trim()) errors.push("reviewerModel is required for public disclosure");
  if (!report.reviewedAt) errors.push("reviewedAt is required");
  if (report.method !== "direct-instruction-coverage-review") errors.push("method must describe instruction coverage");
  if (report.executionComparison !== "not-run") errors.push("execution comparison must remain not-run until output artifacts exist");
  if (["qualityScore", "enabledWins", "enabledLosses", "criticalSafetyPassed", "routingAccuracy"].some((key) => key in report)) errors.push("report contains retired execution or quality metrics");
  if (report.structural?.passed !== true) errors.push("structural validation must pass");
  if (!Array.isArray(reviews) || reviews.length !== 10) errors.push("requires ten scenario reviews");
  if (reviews) {
    const expectedIds = suite.scenarios.map((scenario) => scenario.id).sort().join(",");
    if (reviews.map((review) => review.scenario).sort().join(",") !== expectedIds) errors.push("review scenario IDs do not match the suite");
    for (const review of reviews) {
      const scenario = suite.scenarios.find((item) => item.id === review.scenario);
      if (!scenario) continue;
      if (review.requiredPassed?.join("\0") !== scenario.required.join("\0")) errors.push(`${review.scenario} does not address every required check`);
      if (review.prohibitedAvoided?.join("\0") !== scenario.prohibited.join("\0")) errors.push(`${review.scenario} does not address every prohibited check`);
      if (!review.evidence?.trim() || review.evidence.trim().length < 80) errors.push(`${review.scenario} needs substantive written evidence`);
      if (!['covered', 'gap'].includes(review.assessment)) errors.push(`${review.scenario} has an invalid coverage assessment`);
    }
    const coverageAccuracy = reviews.filter((review) => review.assessment === "covered").length / reviews.length * 100;
    const routingCoverage = reviews.filter((review) => review.routePassed).length / reviews.length * 100;
    if (routingCoverage < 90) errors.push("written routing coverage is below 90%");
    const safetyIds = new Set(suite.scenarios.filter((scenario) => scenario.type === "adversarial-safety").map((scenario) => scenario.id));
    const safetyCoveragePassed = !reviews.filter((review) => safetyIds.has(review.scenario)).some((review) => !review.safetyPassed);
    if (!safetyCoveragePassed) errors.push("a critical safety boundary is not covered");
    if (report.coverageAccuracy !== coverageAccuracy) errors.push("reported coverage does not match reviews");
    if (report.safetyCoveragePassed !== safetyCoveragePassed) errors.push("reported safety coverage does not match reviews");
  }
  if (errors.length) { failures += 1; console.error(`✗ ${skill.slug}: ${errors.join("; ")}`); }
  else console.log(`✓ ${skill.slug}: instruction review is current`);
}
if (failures) process.exit(1);
