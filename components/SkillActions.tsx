"use client";

import { track } from "@vercel/analytics";
import { useEffect, useRef, useState } from "react";
import { strToU8, zipSync } from "fflate";
import type { SkillPackageFile } from "@/lib/types";
import { button } from "@/lib/tailwind";

function CopyIcon() {
  return (
    <svg
      className="size-[13px]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className="size-[13px]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function CopyButton({
  value,
  label = "Copy",
  event,
  skill,
}: {
  value: string;
  label?: string;
  event: string;
  skill: string;
}) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<number | null>(null);
  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );
  async function copy() {
    if (timer.current) window.clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(value);
      setState("copied");
      track(event, { skill });
      timer.current = window.setTimeout(() => setState("idle"), 1800);
    } catch {
      setState("failed");
    }
  }
  const copied = state === "copied";
  return (
    <div className="grid gap-2">
      <button
        className={`${button.secondary}${copied ? " border-[rgba(14,159,110,0.45)] text-green" : ""}`}
        type="button"
        onClick={copy}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
        <span>
          {copied ? "Copied" : state === "failed" ? "Try copy again" : label}
        </span>
      </button>
      {state === "failed" ? (
        <span
          className="max-w-xl text-xs leading-[1.45] text-red"
          role="status"
        >
          Copying was blocked. Select the command and copy it manually; nothing
          was changed.
        </span>
      ) : null}
    </div>
  );
}

export function DownloadButton({
  files,
  slug,
}: {
  files: SkillPackageFile[];
  slug: string;
}) {
  function download() {
    const archive = Object.fromEntries(
      files.map((file) => [file.path, strToU8(file.content)]),
    );
    const url = URL.createObjectURL(
      new Blob([zipSync(archive) as BlobPart], { type: "application/zip" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${slug}.zip`;
    anchor.click();
    URL.revokeObjectURL(url);
    track("skill_download", { skill: slug });
  }
  return (
    <button className={button.secondary} type="button" onClick={download}>
      <svg
        className="size-[13px]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <path d="m7 10 5 5 5-5" />
        <path d="M12 15V3" />
      </svg>
      <span>Download skill folder</span>
    </button>
  );
}
