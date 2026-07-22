"use client";

import { track } from "@vercel/analytics";
import { useState, useSyncExternalStore } from "react";
import { LIBRARY_MEMORY_EVENT, LibraryMemory } from "@/lib/library-memory";
import { button } from "@/lib/tailwind";

export function SkillUseActions({ slug }: { slug: string }) {
  const snapshot = useSyncExternalStore(
    LibraryMemory.subscribe,
    LibraryMemory.snapshot,
    LibraryMemory.serverSnapshot,
  );
  const memory = LibraryMemory.fromSnapshot(snapshot);
  const [writesAvailable, setWritesAvailable] = useState(true);
  const storageAvailable = writesAvailable && memory.ok;
  const saved = memory.ok && memory.value.saved.includes(slug);

  function startWorkflow() {
    track("workflow_start", { skill: slug });
    const storage = LibraryMemory.storage();
    if (storage.ok) {
      const current = LibraryMemory.read(storage.value);
      if (current.ok) {
        const written = LibraryMemory.write(
          storage.value,
          LibraryMemory.recordRecent(current.value, slug),
        );
        if (written.ok) window.dispatchEvent(new Event(LIBRARY_MEMORY_EVENT));
        else setWritesAvailable(false);
      }
    } else setWritesAvailable(false);
    document.getElementById("workflow")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  }

  function toggleSaved() {
    const storage = LibraryMemory.storage();
    if (!storage.ok) {
      setWritesAvailable(false);
      return;
    }
    const current = LibraryMemory.read(storage.value);
    if (!current.ok) {
      setWritesAvailable(false);
      return;
    }
    const next = LibraryMemory.toggleSaved(current.value, slug);
    const written = LibraryMemory.write(storage.value, next);
    if (!written.ok) {
      setWritesAvailable(false);
      return;
    }
    const isSaved = next.saved.includes(slug);
    track(isSaved ? "workflow_saved" : "workflow_unsaved", { skill: slug });
    window.dispatchEvent(new Event(LIBRARY_MEMORY_EVENT));
  }

  return (
    <div className="mt-7 flex flex-wrap items-center gap-2.5 max-[480px]:flex-col max-[480px]:items-stretch">
      <button
        className={`${button.primary} max-[480px]:w-full`}
        type="button"
        onClick={startWorkflow}
      >
        Start this workflow <span aria-hidden="true">↓</span>
      </button>
      <button
        className={`${button.secondary} max-[480px]:w-full`}
        type="button"
        aria-pressed={saved}
        disabled={!storageAvailable}
        onClick={toggleSaved}
      >
        {saved ? "Saved" : "Save for later"}
      </button>
      {!storageAvailable && (
        <span
          className="basis-full text-[0.78rem] text-ink-2 max-[480px]:leading-[1.5]"
          role="status"
        >
          Saving is unavailable in this browser. The workflow is still readable.
        </span>
      )}
    </div>
  );
}
