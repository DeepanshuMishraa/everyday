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
  return <section className="document-shell" id="workflow" aria-labelledby="document-heading">
    <div className="document-toolbar"><div><p className="eyebrow">The workflow — {files.length} useful references</p><h2 id="document-heading">{file.path === "SKILL.md" ? "Step-by-step guidance" : file.path}</h2></div><div className="segmented" role="group" aria-label="Workflow view"><button type="button" aria-pressed={view === "rendered"} className={view === "rendered" ? "active" : ""} onClick={() => setView("rendered")}>Read</button><button type="button" aria-pressed={view === "raw"} className={view === "raw" ? "active" : ""} onClick={() => setView("raw")}>Source</button></div></div>
    <nav className="package-files" aria-label="References in this workflow">{files.map((item) => <button type="button" aria-pressed={item.path === file.path} key={item.path} className={item.path === file.path ? "active" : ""} onClick={() => setSelected(item.path)}>{item.path === "SKILL.md" ? "Main workflow" : item.path}</button>)}</nav>
    {view === "rendered" && file.path.endsWith(".md") ? <article className="markdown"><ReactMarkdown remarkPlugins={[remarkGfm]}>{rendered}</ReactMarkdown></article> : <pre className="raw-markdown"><code>{file.content}</code></pre>}
  </section>;
}
