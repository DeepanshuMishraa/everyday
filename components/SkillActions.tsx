"use client";

import { track } from "@vercel/analytics";
import { useEffect, useRef, useState } from "react";
import { strToU8, zipSync } from "fflate";
import type { SkillPackageFile } from "@/lib/types";

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function CopyButton({ value, label = "Copy", event, skill }: { value: string; label?: string; event: string; skill: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);
  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);
  async function copy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    track(event, { skill });
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1800);
  }
  return (
    <button className={`button secondary copy-button${copied ? " copied" : ""}`} type="button" onClick={copy}>
      {copied ? <CheckIcon /> : <CopyIcon />}
      <span>{copied ? "Copied" : label}</span>
    </button>
  );
}

export function DownloadButton({ files, slug }: { files: SkillPackageFile[]; slug: string }) {
  function download() {
    const archive = Object.fromEntries(files.map((file) => [file.path, strToU8(file.content)]));
    const url = URL.createObjectURL(new Blob([zipSync(archive) as BlobPart], { type: "application/zip" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${slug}.zip`;
    anchor.click();
    URL.revokeObjectURL(url);
    track("skill_download", { skill: slug });
  }
  return (
    <button className="button secondary" type="button" onClick={download}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: 13, height: 13 }}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5" /><path d="M12 15V3" />
      </svg>
      <span>Download skill folder</span>
    </button>
  );
}
