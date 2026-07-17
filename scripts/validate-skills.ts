import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import yaml from "js-yaml";
import { getAllSkills } from "../lib/skills";
import { validateSkill } from "../lib/skills/validate";
import type { EvaluationReport } from "../lib/types";

const root = process.cwd();
let failed = 0;
const skills = getAllSkills();

if (skills.length !== 30) throw new Error(`Catalog must contain exactly 30 skills; found ${skills.length}.`);

for (const catalog of skills) {
  const skillPath = path.join(root, "skills", catalog.slug, "SKILL.md");
  const catalogPath = path.join(root, "catalog", `${catalog.slug}.yaml`);
  const suitePath = path.join(root, "evals", catalog.slug, "suite.yaml");
  if (!fs.existsSync(skillPath) || !fs.existsSync(catalogPath) || !fs.existsSync(suitePath)) {
    console.error(`✗ ${catalog.slug}: missing skill, catalog, or suite file`);
    failed += 1;
    continue;
  }
  const markdown = catalog.markdown;
  const parsedCatalog = yaml.load(fs.readFileSync(catalogPath, "utf8")) as typeof catalog;
  const suite = yaml.load(fs.readFileSync(suitePath, "utf8")) as { skill: string; scenarios: unknown[] };
  const result = validateSkill(catalog.files, parsedCatalog);
  if (suite.scenarios.length !== 10) result.errors.push(`Evaluation suite must contain 10 scenarios; found ${suite.scenarios.length}.`);
  if (suite.skill !== catalog.slug) result.errors.push("Evaluation suite skill must match the catalog slug.");
  if (matter(markdown).data.description !== parsedCatalog.description) result.errors.push("Catalog and frontmatter descriptions differ.");
  result.passed = result.errors.length === 0;
  const directory = path.join(root, "evals", catalog.slug);
  const reportPath = path.join(directory, "report.json");
  let existing: Partial<EvaluationReport> = {};
  if (fs.existsSync(reportPath)) existing = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  const hash = catalog.hash;
  const preserveFullPass = existing.status === "passed" && existing.skillHash === hash;
  const report: EvaluationReport = preserveFullPass ? existing as EvaluationReport : {
    skill: catalog.slug,
    skillHash: hash,
    status: result.passed ? "structural-pass" : "failed",
    generatedAt: new Date().toISOString(),
    structural: { passed: result.passed, errors: result.errors },
    note: result.passed ? "Package structure passed. Codex scenario review, routing, quality, and critical safety judgments remain pending." : "Structural validation failed.",
  };
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  if (result.passed) console.log(`✓ ${catalog.slug} (${catalog.fileCount} files, ${result.bodyLines} body lines)`);
  else { console.error(`✗ ${catalog.slug}: ${result.errors.join(" ")}`); failed += 1; }
}

const skillDirectories = fs.readdirSync(path.join(root, "skills"), { withFileTypes: true }).filter((entry) => entry.isDirectory());
if (skillDirectories.length !== 30) { console.error(`✗ skills/ must contain exactly 30 directories; found ${skillDirectories.length}.`); failed += 1; }

if (failed) process.exit(1);
console.log("Validated exactly 30 skills and refreshed hash-bound structural reports.");
