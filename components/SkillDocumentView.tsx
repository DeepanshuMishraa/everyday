"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { eyebrow, heading } from "@/lib/tailwind";
import type { SkillPackageFile } from "@/lib/types";

const segmentedButton =
  "min-h-10 cursor-pointer rounded-[7px] border border-transparent bg-transparent px-[13px] py-[5px] text-[0.76rem] font-bold text-ink-2 transition-colors duration-[140ms] hover:text-ink max-[720px]:min-h-11 max-[720px]:flex-1";
const selectedButton = "border-line bg-surface text-ink shadow-button";
const packageButton =
  "min-h-10 shrink-0 cursor-pointer rounded-[7px] border border-line bg-surface px-2.5 py-[5px] font-mono text-[0.66rem] text-ink-2 shadow-button transition-[border-color,color,background-color,box-shadow] duration-[180ms] hover:border-line-2 hover:text-ink hover:shadow-button-hover active:shadow-button-active max-[720px]:min-h-11";

export function SkillDocumentView({
  body,
  files,
}: {
  body: string;
  files: SkillPackageFile[];
}) {
  const [view, setView] = useState<"rendered" | "raw">("rendered");
  const [selected, setSelected] = useState("SKILL.md");
  const file = files.find((item) => item.path === selected) ?? files[0];
  const rendered = file.path === "SKILL.md" ? body : file.content;
  return (
    <section
      className="scroll-mt-[calc(var(--header-h)+24px)]"
      id="workflow"
      aria-labelledby="document-heading"
    >
      <div className="flex items-end justify-between gap-6 border-b border-line pb-5 max-[720px]:flex-col max-[720px]:items-start max-[720px]:gap-4">
        <div>
          <p className={`${eyebrow} mb-1.5`}>
            The workflow — {files.length} useful references
          </p>
          <h2
            className={`${heading.h2} font-bold text-[1.05rem] tracking-[-0.015em]`}
            id="document-heading"
          >
            {file.path === "SKILL.md" ? "Step-by-step guidance" : file.path}
          </h2>
        </div>
        <div
          className="inline-flex gap-0.5 rounded-[9px] bg-surface-2 p-[3px] max-[720px]:w-full"
          role="group"
          aria-label="Workflow view"
        >
          <button
            type="button"
            aria-pressed={view === "rendered"}
            className={`${segmentedButton}${view === "rendered" ? ` ${selectedButton}` : ""}`}
            onClick={() => setView("rendered")}
          >
            Read
          </button>
          <button
            type="button"
            aria-pressed={view === "raw"}
            className={`${segmentedButton}${view === "raw" ? ` ${selectedButton}` : ""}`}
            onClick={() => setView("raw")}
          >
            Source
          </button>
        </div>
      </div>
      <nav
        className="flex gap-1.5 overflow-x-auto border-b border-line py-3.5"
        aria-label="References in this workflow"
      >
        {files.map((item) => (
          <button
            type="button"
            aria-pressed={item.path === file.path}
            key={item.path}
            className={`${packageButton}${item.path === file.path ? " border-ink bg-ink text-bg" : ""}`}
            onClick={() => setSelected(item.path)}
          >
            {item.path === "SKILL.md" ? "Main workflow" : item.path}
          </button>
        ))}
      </nav>
      {view === "rendered" && file.path.endsWith(".md") ? (
        <article className="max-w-[68ch] pb-[88px] pt-10 [&>h1]:hidden [&_h2]:mb-[0.9rem] [&_h2]:mt-12 [&_h2]:border-t [&_h2]:border-line [&_h2]:pt-[1.8rem] [&_h2]:text-[1.7rem] [&_h2:first-child]:mt-0 [&_h2:first-child]:border-t-0 [&_h2:first-child]:pt-0 [&_h3]:mb-2 [&_h3]:mt-[1.8rem] [&_h3]:font-ui [&_h3]:text-[1.05rem] [&_h3]:font-bold [&_h3]:leading-[1.4] [&_h3]:tracking-[-0.01em] [&_p]:my-[0.9rem] [&_p]:text-base [&_p]:leading-[1.7] [&_p]:text-ink-body [&_li]:my-[0.35rem] [&_li]:text-base [&_li]:leading-[1.7] [&_li]:text-ink-body [&_ul]:my-[0.9rem] [&_ul]:pl-[1.3rem] [&_ol]:my-[0.9rem] [&_ol]:pl-[1.3rem] [&_strong]:font-bold [&_strong]:text-ink [&_a]:underline-offset-3 [&_code]:rounded-[5px] [&_code]:bg-surface-2 [&_code]:px-[5px] [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em] [&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:bg-dark [&_pre]:px-[18px] [&_pre]:py-4 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-[0.78rem] [&_pre_code]:text-zinc-200">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{rendered}</ReactMarkdown>
        </article>
      ) : (
        <pre className="my-8 mb-[88px] overflow-x-auto whitespace-pre-wrap wrap-anywhere rounded-lg bg-dark p-7 font-mono text-xs leading-[1.7] text-zinc-300 max-[480px]:mt-6 max-[480px]:rounded-md max-[480px]:px-4 max-[480px]:py-[18px]">
          <code>{file.content}</code>
        </pre>
      )}
    </section>
  );
}
