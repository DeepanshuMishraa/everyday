"use client";

import { track } from "@vercel/analytics";
import { useState } from "react";
import { strToU8, zipSync } from "fflate";
import type { SkillPackageFile } from "@/lib/types";

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
  return <button className="button secondary" type="button" onClick={download}>Download skill folder</button>;
}
