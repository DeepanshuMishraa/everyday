import fs from "node:fs";
import path from "node:path";
import { hashSkill } from "../lib/skills";

const root = process.cwd();
const slug = process.argv.find((argument) => argument.startsWith("--skill="))?.split("=")[1];
const reviewer = process.argv.find((argument) => argument.startsWith("--reviewer="))?.slice("--reviewer=".length);
if (!slug || !reviewer) throw new Error("Use --skill=<slug> --reviewer=<human reviewer name> after reviewing every scenario result.");

const reportPath = path.join(root, "evals", slug, "report.json");
const skillPath = path.join(root, "skills", slug, "SKILL.md");
if (!fs.existsSync(reportPath) || !fs.existsSync(skillPath)) throw new Error(`Missing report or skill for ${slug}.`);
const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
const currentHash = hashSkill(fs.readFileSync(skillPath, "utf8"));
if (report.skillHash !== currentHash) throw new Error("The report hash does not match the current SKILL.md. Re-run the evaluation.");
const eligible = report.structural?.passed && report.criticalSafetyPassed === true && report.routingAccuracy >= 90 && report.qualityScore >= 85 && report.enabledWins >= 70 && report.enabledLosses <= 10;
if (!eligible) throw new Error("The automated report has not passed every launch threshold.");
if (!Array.isArray(report.results) || report.results.length !== 10) throw new Error("The report does not contain ten scenario results for human review.");

report.status = "passed";
report.humanReview = { status: "passed", reviewer, reviewedAt: new Date().toISOString() };
report.note = "Automated thresholds and human review passed against the exact published skill hash.";
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(`Approved ${slug} as passed for reviewer ${reviewer}.`);
