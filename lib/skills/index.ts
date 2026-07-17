import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { load as loadYaml } from "js-yaml";
import type { CatalogSkill, EvaluationReport, SkillDocument, SkillPackageFile } from "@/lib/types";

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

function walk(directory: string, prefix = ""): SkillPackageFile[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const relative = path.posix.join(prefix, entry.name);
    const absolute = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(absolute, relative) : [{ path: relative, content: fs.readFileSync(absolute, "utf8"), lineCount: fs.readFileSync(absolute, "utf8").split("\n").length }];
  }).sort((a, b) => a.path.localeCompare(b.path));
}

export function getSkillPackageFiles(slug: string) { return walk(path.join(root, "skills", slug)); }

export function hashSkillPackage(files: SkillPackageFile[]) {
  const hash = crypto.createHash("sha256");
  for (const file of [...files].sort((a, b) => a.path.localeCompare(b.path))) hash.update(file.path).update("\0").update(file.content).update("\0");
  return hash.digest("hex");
}

export function skillPackagePrompt(files: SkillPackageFile[]) {
  return files.map((file) => `--- ${file.path} ---\n${file.content}`).join("\n\n");
}

export function getAllSkills(): SkillDocument[] {
  return readCatalogFiles().map((metadata) => {
    const files = getSkillPackageFiles(metadata.slug);
    const markdown = files.find((file) => file.path === "SKILL.md")!.content;
    const parsed = matter(markdown);
    const suiteContent = fs.readFileSync(path.join(root, "evals", metadata.slug, "suite.yaml"), "utf8");
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
    };
  });
}

export function getSkill(slug: string) {
  return getAllSkills().find((skill) => skill.slug === slug);
}

export function getSkillsForCategory(category: string) {
  return getAllSkills().filter((skill) => skill.category === category);
}
