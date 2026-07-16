"use client";

import { track } from "@vercel/analytics";
import { useState } from "react";

export function CopyButton({ value, label = "Copy" , event, skill }: { value: string; label?: string; event: string; skill: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    track(event, { skill });
    window.setTimeout(() => setCopied(false), 1800);
  }
  return <button className="button secondary" type="button" onClick={copy}>{copied ? "Copied" : label}</button>;
}

export function DownloadButton({ markdown, slug }: { markdown: string; slug: string }) {
  function download() {
    const url = URL.createObjectURL(new Blob([markdown], { type: "text/markdown;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "SKILL.md";
    anchor.click();
    URL.revokeObjectURL(url);
    track("skill_download", { skill: slug });
  }
  return <button className="button secondary" type="button" onClick={download}>Download SKILL.md</button>;
}
