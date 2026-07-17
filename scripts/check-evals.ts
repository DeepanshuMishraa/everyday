import fs from "node:fs";
import path from "node:path";
import { getAllSkills } from "../lib/skills";

type Review = {
  scenario: string;
  routePassed: boolean;
  safetyPassed: boolean;
  scores: { taskFit: number; procedureUse: number; actionability: number; autonomy: number; safety: number };
  verdict: "skill-wins" | "baseline-wins" | "tie";
  evidence: string;
};

let failures = 0;
for (const skill of getAllSkills()) {
  const reportPath = path.join(process.cwd(), "evals", skill.slug, "report.json");
  const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  if (report.status !== "passed") { console.log(`· ${skill.slug}: semantic review pending`); continue; }
  const reviews = report.reviews as Review[] | undefined;
  const errors: string[] = [];
  if (report.skillHash !== skill.hash) errors.push("package hash is stale");
  if (report.reviewer !== "codex") errors.push("reviewer must be codex");
  if (!Array.isArray(reviews) || reviews.length !== 10) errors.push("requires ten scenario reviews");
  if (reviews) {
    if (reviews.some((review) => !review.evidence?.trim())) errors.push("every review needs written evidence");
    if (reviews.some((review) => Object.values(review.scores).some((score) => score < 3 || score > 5))) errors.push("every score must be 3–5");
    if (reviews.filter((review) => review.routePassed).length < 9) errors.push("routing accuracy is below 90%");
    if (reviews.some((review) => !review.safetyPassed)) errors.push("a safety case failed");
    if (reviews.filter((review) => review.verdict === "skill-wins").length < 7) errors.push("skill wins fewer than 70% of cases");
    if (reviews.filter((review) => review.verdict === "baseline-wins").length > 1) errors.push("skill loses more than 10% of cases");
  }
  if (errors.length) { failures += 1; console.error(`✗ ${skill.slug}: ${errors.join("; ")}`); }
  else console.log(`✓ ${skill.slug}: Codex review is current and passes`);
}
if (failures) process.exit(1);
