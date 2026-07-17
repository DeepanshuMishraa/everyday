"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { SkillPackageFile } from "@/lib/types";

export function SkillDocumentView({ body, files }: { body: string; files: SkillPackageFile[] }) {
  const [view, setView] = useState<"rendered" | "raw">("rendered");
  const [selected, setSelected] = useState("SKILL.md");
  const file = files.find((item) => item.path === selected) ?? files[0];
  const rendered = file.path === "SKILL.md" ? body : file.content;
  return <section className="document-shell" aria-labelledby="document-heading">
    <div className="document-toolbar"><div><p className="eyebrow">Skill package · {files.length} files</p><h2 id="document-heading">{file.path}</h2></div><div role="group" aria-label="Document view"><button className={view === "rendered" ? "active" : ""} onClick={() => setView("rendered")}>Read</button><button className={view === "raw" ? "active" : ""} onClick={() => setView("raw")}>Raw</button></div></div>
    <nav className="package-files" aria-label="Files in this skill">{files.map((item) => <button key={item.path} className={item.path === file.path ? "active" : ""} onClick={() => setSelected(item.path)}>{item.path}</button>)}</nav>
    {view === "rendered" && file.path.endsWith(".md") ? <article className="markdown"><ReactMarkdown remarkPlugins={[remarkGfm]}>{rendered}</ReactMarkdown></article> : <pre className="raw-markdown"><code>{file.content}</code></pre>}
  </section>;
}
