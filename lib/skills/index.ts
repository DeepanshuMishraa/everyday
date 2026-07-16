import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { load as loadYaml } from "js-yaml";
import type { CatalogSkill, EvaluationReport, SkillDocument } from "@/lib/types";

const root = process.cwd();
const catalogDirectory = path.join(root, "catalog");

function readCatalogFiles(): CatalogSkill[] {
  return fs.readdirSync(catalogDirectory)
    .filter((file) => file.endsWith(".yaml"))
    .map((file) => loadYaml(fs.readFileSync(path.join(catalogDirectory, file), "utf8")) as CatalogSkill)
    .sort((a, b) => a.title.localeCompare(b.title));
}

function readEvaluation(slug: string): EvaluationReport | null {
  const reportPath = path.join(root, "evals", slug, "report.json");
  if (!fs.existsSync(reportPath)) return null;
  return JSON.parse(fs.readFileSync(reportPath, "utf8")) as EvaluationReport;
}

export function hashSkill(markdown: string) {
  return crypto.createHash("sha256").update(markdown).digest("hex");
}

export function getAllSkills(): SkillDocument[] {
  return readCatalogFiles().map((metadata) => {
    const markdown = fs.readFileSync(path.join(root, "skills", metadata.slug, "SKILL.md"), "utf8");
    const parsed = matter(markdown);
    return {
      ...metadata,
      markdown,
      body: parsed.content,
      hash: hashSkill(markdown),
      lineCount: markdown.split("\n").length,
      evaluation: readEvaluation(metadata.slug),
    };
  });
}

export function getSkill(slug: string) {
  return getAllSkills().find((skill) => skill.slug === slug);
}

export function getSkillsForCategory(category: string) {
  return getAllSkills().filter((skill) => skill.category === category);
}
