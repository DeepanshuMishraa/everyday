import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { load as loadYaml } from "js-yaml";
import type {
  CatalogSkill,
  EvaluationReport,
  EvaluationScenario,
  SkillDocument,
  SkillPackageFile,
} from "@/lib/types";
import {
  formatSkillPackageReadError,
  hashSkillPackage,
  readSkillPackageDirectory,
} from "./package";

export { hashSkillPackage } from "./package";

const root = process.cwd();
const catalogDirectory = path.join(root, "catalog");

function readCatalogFiles(): CatalogSkill[] {
  return fs
    .readdirSync(catalogDirectory)
    .filter((file) => file.endsWith(".yaml"))
    .map(
      (file) =>
        loadYaml(
          fs.readFileSync(path.join(catalogDirectory, file), "utf8"),
        ) as CatalogSkill,
    )
    .sort((a, b) => a.title.localeCompare(b.title));
}

function readEvaluation(slug: string): EvaluationReport | null {
  const reportPath = path.join(root, "evals", slug, "report.json");
  if (!fs.existsSync(reportPath)) return null;
  return JSON.parse(fs.readFileSync(reportPath, "utf8")) as EvaluationReport;
}

export function getSkillPackageFiles(slug: string) {
  const result = readSkillPackageDirectory(path.join(root, "skills", slug));
  if (!result.ok) throw new Error(formatSkillPackageReadError(result.error));
  return result.files;
}

export function skillPackagePrompt(files: SkillPackageFile[]) {
  return files
    .map((file) => `--- ${file.path} ---\n${file.content}`)
    .join("\n\n");
}

export function getAllSkills(): SkillDocument[] {
  return readCatalogFiles().map((metadata) => {
    const files = getSkillPackageFiles(metadata.slug);
    const skillFile = files.find((file) => file.path === "SKILL.md");
    if (!skillFile)
      throw new Error(
        `Cannot load ${metadata.slug}: the package is missing SKILL.md. Add it and run validation again.`,
      );
    const markdown = skillFile.content;
    const parsed = matter(markdown);
    const suiteContent = fs.readFileSync(
      path.join(root, "evals", metadata.slug, "suite.yaml"),
      "utf8",
    );
    const suite = loadYaml(suiteContent) as { scenarios: EvaluationScenario[] };
    return {
      ...metadata,
      files,
      markdown,
      body: parsed.content,
      hash: hashSkillPackage(files),
      suiteHash: crypto.createHash("sha256").update(suiteContent).digest("hex"),
      lineCount: markdown.split("\n").length,
      fileCount: files.length,
      evaluation: readEvaluation(metadata.slug),
      evaluationScenarios: suite.scenarios,
    };
  });
}

export function getSkill(slug: string) {
  return getAllSkills().find((skill) => skill.slug === slug);
}

export function getSkillsForCategory(category: string) {
  return getAllSkills().filter((skill) => skill.category === category);
}
