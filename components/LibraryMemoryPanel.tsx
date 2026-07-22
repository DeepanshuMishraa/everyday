"use client";

import Link from "next/link";
import { useMemo, useSyncExternalStore } from "react";
import { LibraryMemory } from "@/lib/library-memory";
import type { CatalogSkill } from "@/lib/types";
import { eyebrow, heading } from "@/lib/tailwind";

export function LibraryMemoryPanel({ skills }: { skills: CatalogSkill[] }) {
  const snapshot = useSyncExternalStore(
    LibraryMemory.subscribe,
    LibraryMemory.snapshot,
    LibraryMemory.serverSnapshot,
  );
  const memoryResult = LibraryMemory.fromSnapshot(snapshot);
  const memory = memoryResult.ok ? memoryResult.value : LibraryMemory.empty();
  const skillsBySlug = useMemo(
    () => new Map(skills.map((skill) => [skill.slug, skill])),
    [skills],
  );

  const saved = memory.saved.flatMap((slug) => {
    const skill = skillsBySlug.get(slug);
    return skill ? [skill] : [];
  });
  const recent = memory.recent.flatMap((slug) => {
    const skill = skillsBySlug.get(slug);
    return skill ? [skill] : [];
  });
  if (!saved.length && !recent.length) return null;

  return (
    <section
      className="mb-[88px] border-b border-line pb-12 max-[480px]:mb-16"
      aria-labelledby="your-workflows-title"
    >
      <div className="mb-6 flex items-baseline justify-between gap-6 max-[720px]:block">
        <p className={`${eyebrow} m-0 max-[720px]:mb-2.5`}>Your library</p>
        <h2
          className={`${heading.h2} text-[1.45rem]`}
          id="your-workflows-title"
        >
          Pick up where you left off.
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-12 max-[720px]:grid-cols-1 max-[720px]:gap-7 [&_h3]:mb-2.5 [&_h3]:font-ui [&_h3]:text-xs [&_h3]:font-bold [&_h3]:tracking-[0.03em] [&_h3]:text-ink-2 [&_ul]:m-0 [&_ul]:list-none [&_ul]:border-t [&_ul]:border-line [&_ul]:p-0 [&_a]:flex [&_a]:min-h-12 [&_a]:items-center [&_a]:justify-between [&_a]:gap-4 [&_a]:border-b [&_a]:border-line [&_a]:px-1 [&_a]:py-2 [&_a]:text-[0.88rem] [&_a]:no-underline [&_a:hover]:text-ink-2">
        {saved.length > 0 && (
          <div>
            <h3>Saved</h3>
            <ul>
              {saved.map((skill) => (
                <li key={skill.slug}>
                  <Link href={`/skills/${skill.slug}`}>
                    {skill.title}
                    <span aria-hidden="true">Open</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {recent.length > 0 && (
          <div>
            <h3>Recent</h3>
            <ul>
              {recent.map((skill) => (
                <li key={skill.slug}>
                  <Link href={`/skills/${skill.slug}`}>
                    {skill.title}
                    <span aria-hidden="true">Open</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
