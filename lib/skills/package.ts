import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import type { SkillPackageFile } from "@/lib/types";

export type SkillPackageReadError =
  | { kind: "directory-unreadable"; path: string; cause: string }
  | { kind: "file-unreadable"; path: string; cause: string }
  | { kind: "unsupported-entry"; path: string; entryType: "symbolic link" | "special file" }
  | { kind: "invalid-utf8"; path: string }
  | { kind: "nul-content"; path: string };

export type SkillPackageReadResult =
  | { ok: true; files: SkillPackageFile[] }
  | { ok: false; error: SkillPackageReadError };

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unknown filesystem error.";
}

function compareByCodePoint(left: string, right: string) {
  const leftPoints = Array.from(left, (character) => character.codePointAt(0) ?? 0);
  const rightPoints = Array.from(right, (character) => character.codePointAt(0) ?? 0);
  const length = Math.min(leftPoints.length, rightPoints.length);
  for (let index = 0; index < length; index += 1) {
    const difference = leftPoints[index] - rightPoints[index];
    if (difference !== 0) return difference;
  }
  return leftPoints.length - rightPoints.length;
}

function readDirectory(directory: string, prefix: string): SkillPackageReadResult {
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(directory, { withFileTypes: true });
  } catch (error) {
    return { ok: false, error: { kind: "directory-unreadable", path: directory, cause: errorMessage(error) } };
  }

  const files: SkillPackageFile[] = [];
  for (const entry of entries) {
    const relative = path.posix.join(prefix, entry.name);
    const absolute = path.join(directory, entry.name);
    if (entry.isSymbolicLink()) return { ok: false, error: { kind: "unsupported-entry", path: relative, entryType: "symbolic link" } };
    if (entry.isDirectory()) {
      const nested = readDirectory(absolute, relative);
      if (!nested.ok) return nested;
      files.push(...nested.files);
      continue;
    }
    if (!entry.isFile()) return { ok: false, error: { kind: "unsupported-entry", path: relative, entryType: "special file" } };

    let bytes: Buffer;
    try {
      bytes = fs.readFileSync(absolute);
    } catch (error) {
      return { ok: false, error: { kind: "file-unreadable", path: relative, cause: errorMessage(error) } };
    }

    let content: string;
    try {
      content = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    } catch {
      return { ok: false, error: { kind: "invalid-utf8", path: relative } };
    }
    if (content.includes("\0")) return { ok: false, error: { kind: "nul-content", path: relative } };
    files.push({ path: relative, content, lineCount: content.split("\n").length });
  }

  return { ok: true, files: files.sort((left, right) => compareByCodePoint(left.path, right.path)) };
}

export function readSkillPackageDirectory(directory: string): SkillPackageReadResult {
  return readDirectory(path.resolve(directory), "");
}

export function formatSkillPackageReadError(error: SkillPackageReadError) {
  switch (error.kind) {
    case "directory-unreadable":
      return `Could not read skill directory ${error.path}: ${error.cause} Check that the directory exists and is readable.`;
    case "file-unreadable":
      return `Could not read skill file ${error.path}: ${error.cause} Check its permissions and try again.`;
    case "unsupported-entry":
      return `Cannot hash ${error.path}: skill packages must contain regular UTF-8 files, but this is a ${error.entryType}. Remove it and try again.`;
    case "invalid-utf8":
      return `Cannot hash ${error.path}: the file is not valid UTF-8 text. Convert or remove it and try again.`;
    case "nul-content":
      return `Cannot hash ${error.path}: NUL characters are not supported. Remove them and try again.`;
  }
}

export function hashSkillPackage(files: SkillPackageFile[]) {
  const hash = crypto.createHash("sha256");
  for (const file of [...files].sort((left, right) => compareByCodePoint(left.path, right.path))) {
    hash.update(file.path, "utf8").update("\0").update(file.content, "utf8").update("\0");
  }
  return hash.digest("hex");
}
