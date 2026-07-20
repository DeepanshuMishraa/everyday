"use client";

import { track } from "@vercel/analytics";
import { useEffect, useState } from "react";
import { LIBRARY_MEMORY_EVENT, LibraryMemory } from "@/lib/library-memory";

export function SkillUseActions({ slug }: { slug: string }) {
  const [saved, setSaved] = useState(false);
  const [storageAvailable, setStorageAvailable] = useState(true);

  useEffect(() => {
    const storage = LibraryMemory.storage();
    if (!storage.ok) {
      setStorageAvailable(false);
      return;
    }
    const result = LibraryMemory.read(storage.value);
    if (!result.ok) {
      setStorageAvailable(false);
      return;
    }
    setSaved(result.value.saved.includes(slug));
  }, [slug]);

  function startWorkflow() {
    track("workflow_start", { skill: slug });
    const storage = LibraryMemory.storage();
    if (storage.ok) {
      const current = LibraryMemory.read(storage.value);
      if (current.ok) {
        const written = LibraryMemory.write(storage.value, LibraryMemory.recordRecent(current.value, slug));
        if (written.ok) window.dispatchEvent(new Event(LIBRARY_MEMORY_EVENT));
        else setStorageAvailable(false);
      }
    } else setStorageAvailable(false);
    document.getElementById("workflow")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  }

  function toggleSaved() {
    const storage = LibraryMemory.storage();
    if (!storage.ok) {
      setStorageAvailable(false);
      return;
    }
    const current = LibraryMemory.read(storage.value);
    if (!current.ok) {
      setStorageAvailable(false);
      return;
    }
    const next = LibraryMemory.toggleSaved(current.value, slug);
    const written = LibraryMemory.write(storage.value, next);
    if (!written.ok) {
      setStorageAvailable(false);
      return;
    }
    const isSaved = next.saved.includes(slug);
    setSaved(isSaved);
    track(isSaved ? "workflow_saved" : "workflow_unsaved", { skill: slug });
    window.dispatchEvent(new Event(LIBRARY_MEMORY_EVENT));
  }

  return <div className="skill-use-actions">
    <button className="button primary" type="button" onClick={startWorkflow}>Start this workflow <span aria-hidden="true">↓</span></button>
    <button className="button secondary" type="button" aria-pressed={saved} disabled={!storageAvailable} onClick={toggleSaved}>{saved ? "Saved" : "Save for later"}</button>
    {!storageAvailable && <span className="storage-note" role="status">Saving is unavailable in this browser. The workflow is still readable.</span>}
  </div>;
}
