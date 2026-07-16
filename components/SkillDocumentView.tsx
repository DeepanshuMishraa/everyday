"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function SkillDocumentView({ body, markdown }: { body: string; markdown: string }) {
  const [view, setView] = useState<"rendered" | "raw">("rendered");
  return <section className="document-shell" aria-labelledby="document-heading">
    <div className="document-toolbar"><h2 id="document-heading">The procedure</h2><div role="group" aria-label="Document view"><button className={view === "rendered" ? "active" : ""} onClick={() => setView("rendered")}>Read</button><button className={view === "raw" ? "active" : ""} onClick={() => setView("raw")}>Raw Markdown</button></div></div>
    {view === "rendered" ? <article className="markdown"><ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown></article> : <pre className="raw-markdown"><code>{markdown}</code></pre>}
  </section>;
}
