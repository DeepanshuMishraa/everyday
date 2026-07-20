"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { LIBRARY_MEMORY_EVENT, LibraryMemory, type LibraryMemoryState } from "@/lib/library-memory";
import type { CatalogSkill } from "@/lib/types";

export function LibraryMemoryPanel({ skills }: { skills: CatalogSkill[] }) {
  const [memory, setMemory] = useState<LibraryMemoryState>(LibraryMemory.empty());
  const skillsBySlug = useMemo(() => new Map(skills.map((skill) => [skill.slug, skill])), [skills]);

  const refresh = useCallback(() => {
    const storage = LibraryMemory.storage();
    if (!storage.ok) return;
    const result = LibraryMemory.read(storage.value);
    if (result.ok) setMemory(result.value);
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener(LIBRARY_MEMORY_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(LIBRARY_MEMORY_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [refresh]);

  const saved = memory.saved.flatMap((slug) => {
    const skill = skillsBySlug.get(slug);
    return skill ? [skill] : [];
  });
  const recent = memory.recent.flatMap((slug) => {
    const skill = skillsBySlug.get(slug);
    return skill ? [skill] : [];
  });
  if (!saved.length && !recent.length) return null;

  return <section className="library-memory" aria-labelledby="your-workflows-title">
    <div className="memory-heading"><p className="eyebrow">Your library</p><h2 id="your-workflows-title">Pick up where you left off.</h2></div>
    <div className="memory-groups">
      {saved.length > 0 && <div><h3>Saved</h3><ul>{saved.map((skill) => <li key={skill.slug}><Link href={`/skills/${skill.slug}`}>{skill.title}<span aria-hidden="true">Open</span></Link></li>)}</ul></div>}
      {recent.length > 0 && <div><h3>Recent</h3><ul>{recent.map((skill) => <li key={skill.slug}><Link href={`/skills/${skill.slug}`}>{skill.title}<span aria-hidden="true">Open</span></Link></li>)}</ul></div>}
    </div>
  </section>;
}
