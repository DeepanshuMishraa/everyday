"use client";

import { track } from "@vercel/analytics";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { LibraryMemoryPanel } from "@/components/LibraryMemoryPanel";
import { getNewSkills } from "@/lib/skills/new";
import { createSkillSearch, searchSkills } from "@/lib/skills/search";
import {
  accentClass,
  button,
  container,
  eyebrow,
  heading,
  sectionHeading,
  skillArrow,
  skillMain,
  skillNumber,
  skillRow,
  skillTags,
  tag,
} from "@/lib/tailwind";
import type { CatalogSkill, Category } from "@/lib/types";

type Props = { skills: CatalogSkill[]; categories: Category[] };
type LibraryFilter = "all" | "new";
const pageSize = 10;

export function SearchLibrary({ skills, categories }: Props) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<LibraryFilter>("all");
  const [page, setPage] = useState(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const ledgerRef = useRef<HTMLDivElement>(null);
  const trackedSearchRef = useRef("");

  const search = useMemo(() => createSkillSearch(skills), [skills]);
  const categoriesBySlug = useMemo(
    () => new Map(categories.map((item) => [item.slug, item])),
    [categories],
  );
  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();
    skills.forEach((skill) =>
      counts.set(skill.category, (counts.get(skill.category) ?? 0) + 1),
    );
    return counts;
  }, [skills]);

  const newSkillSlugs = useMemo(
    () => new Set(getNewSkills(skills).map(({ slug }) => slug)),
    [skills],
  );
  const results = useMemo(
    () =>
      searchSkills(search, skills, query).filter(
        (skill) => filter === "all" || newSkillSlugs.has(skill.slug),
      ),
    [filter, newSkillSlugs, query, search, skills],
  );
  const pageCount = Math.max(1, Math.ceil(results.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pageStart = (currentPage - 1) * pageSize;
  const visibleResults = results.slice(pageStart, pageStart + pageSize);

  function selectPage(nextPage: number) {
    const boundedPage = Math.min(Math.max(nextPage, 1), pageCount);
    setPage(boundedPage);
    track("catalog_page_change", {
      page: boundedPage,
      has_query: Boolean(query.trim()),
    });
    window.requestAnimationFrame(() =>
      ledgerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  }

  function selectFilter(nextFilter: LibraryFilter) {
    setFilter(nextFilter);
    setPage(1);
    track("catalog_filter_change", { filter: nextFilter });
  }

  useEffect(() => {
    const normalized = query.trim();
    if (!normalized) return;
    const signature = `${normalized.toLocaleLowerCase()}|${results.length}`;
    const timer = window.setTimeout(() => {
      if (trackedSearchRef.current === signature) return;
      trackedSearchRef.current = signature;
      track(results.length ? "search_performed" : "zero_result_search", {
        has_query: true,
        query_length: normalized.length,
        results: results.length,
      });
    }, 600);
    return () => window.clearTimeout(timer);
  }, [query, results.length]);

  function submit(event: FormEvent) {
    event.preventDefault();
    const normalized = query.trim();
    trackedSearchRef.current = `${normalized.toLocaleLowerCase()}|${results.length}`;
    track(results.length ? "search_performed" : "zero_result_search", {
      has_query: Boolean(normalized),
      query_length: normalized.length,
      results: results.length,
    });
  }

  return (
    <section
      className={`${container} py-24 max-[480px]:py-[72px]`}
      id="library"
      aria-labelledby="library-title"
    >
      <div className={sectionHeading}>
        <div>
          <p className={eyebrow}>{skills.length} practical workflows</p>
          <h1
            className={`${heading.h1} max-w-[15ch] text-[clamp(2.75rem,6vw,4.75rem)]`}
            id="library-title"
          >
            What are you trying to do?
          </h1>
        </div>
        <p>
          Describe the situation in plain language. Open a workflow and start
          with the first useful step.
        </p>
      </div>
      <LibraryMemoryPanel skills={skills} />
      <form className="relative" role="search" onSubmit={submit}>
        <label className="sr-only" htmlFor="skill-search">
          What are you trying to handle?
        </label>
        <div className="relative">
          <svg
            className="pointer-events-none absolute left-4 top-1/2 size-[15px] -translate-y-1/2 text-ink-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            ref={inputRef}
            id="skill-search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setQuery("");
                event.currentTarget.blur();
              }
            }}
            placeholder="Describe the situation…"
            autoComplete="off"
            aria-keyshortcuts="/"
            className="h-14 w-full rounded-md border border-line bg-surface py-0 pl-11 pr-14 text-base text-ink transition-[border-color,box-shadow] duration-150 placeholder:text-ink-3 focus:border-line-2 focus:outline-none focus:ring-[3px] focus:ring-ring max-[480px]:h-[52px] max-[480px]:pr-11"
          />
          <kbd
            className={`pointer-events-none absolute right-4 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded-[6px] border border-line-2 font-mono text-[0.72rem] text-ink-3 transition-opacity duration-100 max-[480px]:hidden${query ? " opacity-0" : ""}`}
            aria-hidden="true"
          >
            /
          </kbd>
        </div>
        <div className="mt-3 flex flex-wrap items-baseline gap-x-3.5 gap-y-1.5">
          <span className="text-xs font-bold text-ink-2">Try</span>
          {["I feel overwhelmed", "suspicious text", "what can I cook"].map(
            (example) => (
              <button
                className="inline-flex min-h-11 cursor-pointer items-center border-0 bg-transparent px-0.5 text-sm text-ink-2 underline decoration-line-2 decoration-dotted underline-offset-4 transition-colors duration-[140ms] hover:text-ink hover:decoration-current"
                key={example}
                type="button"
                onClick={() => {
                  setQuery(example);
                  setPage(1);
                  inputRef.current?.focus();
                  track("example_query", { query: example });
                }}
              >
                “{example}”
              </button>
            ),
          )}
        </div>
      </form>
      <nav className="mt-7" aria-label="Browse workflows by category">
        <div className="flex items-baseline justify-between gap-4 px-0.5 pb-2.5 font-ui text-ink-2">
          <span className="text-xs font-bold tracking-[0.03em]">
            Browse by category
          </span>
          <small className="text-xs text-ink-3">
            {categories.length} collections
          </small>
        </div>
        <div className="grid grid-cols-3 border-l border-t border-line max-[720px]:grid-cols-2 max-[480px]:grid-cols-1">
          {categories.map((item) => {
            const count = categoryCounts.get(item.slug) ?? 0;
            return (
              <Link
                className={`group/category relative grid min-h-[88px] gap-2 border-b border-r border-line bg-bg px-5 py-[18px] no-underline transition-colors duration-[140ms] before:absolute before:left-0 before:top-[18px] before:h-5 before:w-0.5 before:origin-top before:scale-y-0 before:bg-[var(--accent,var(--color-ink))] before:transition-transform before:duration-[180ms] before:ease-spring hover:bg-surface hover:before:scale-y-100 focus-visible:bg-surface focus-visible:before:scale-y-100 max-[480px]:min-h-[72px] max-[480px]:px-4 max-[480px]:py-[15px] ${accentClass[item.color]}`}
                href={`/categories/${item.slug}`}
                key={item.slug}
                onClick={() =>
                  track("category_open", {
                    category: item.slug,
                    source: "library",
                  })
                }
              >
                <span className="font-ui text-sm font-bold leading-[1.4]">
                  {item.name}
                </span>
                <small className="self-end text-xs text-ink-3">
                  {count} workflows
                </small>
              </Link>
            );
          })}
        </div>
      </nav>
      <div className="mt-10 flex items-center justify-between gap-4 border-b border-line pb-3 font-ui max-[720px]:mt-8">
        <span className="text-xs font-bold tracking-[0.03em] text-ink-2">
          Filter workflows
        </span>
        <div
          className="flex gap-1 rounded-md border border-line bg-surface p-1"
          role="group"
          aria-label="Filter workflows"
        >
          <button
            className="min-h-10 rounded-[4px] px-3 text-sm font-semibold text-ink-2 transition-colors hover:text-ink aria-pressed:bg-ink aria-pressed:text-bg"
            type="button"
            aria-pressed={filter === "all"}
            onClick={() => selectFilter("all")}
          >
            All
          </button>
          <button
            className="min-h-10 rounded-[4px] px-3 text-sm font-semibold text-ink-2 transition-colors hover:text-ink aria-pressed:bg-ink aria-pressed:text-bg"
            type="button"
            aria-pressed={filter === "new"}
            onClick={() => selectFilter("new")}
          >
            New
            {newSkillSlugs.size > 0 ? ` ${newSkillSlugs.size}` : ""}
          </button>
        </div>
      </div>
      <div className="scroll-mt-[calc(var(--header-h)+20px)]" ref={ledgerRef}>
        <div className="grid grid-cols-[40px_minmax(0,1fr)_minmax(220px,0.55fr)_auto] items-center gap-5 px-2 py-3 font-ui text-xs font-bold tracking-[0.03em] text-ink-2 max-[980px]:hidden">
          <span aria-hidden="true">#</span>
          <span aria-hidden="true">Workflow</span>
          <span className="col-start-3 col-end-5 text-right" aria-live="polite">
            {results.length ? `${results.length} workflows` : "0 workflows"}
          </span>
        </div>
        {results.length ? (
          <>
            <div>
              {visibleResults.map((skill, index) => {
                const itemCategory = categoriesBySlug.get(skill.category);
                if (!itemCategory) return null;
                return (
                  <Link
                    className={`${skillRow} ${accentClass[itemCategory.color]}`}
                    href={`/skills/${skill.slug}`}
                    key={skill.slug}
                    style={{ animationDelay: `${Math.min(index, 10) * 20}ms` }}
                    onClick={() =>
                      track("search_to_skill_open", {
                        skill: skill.slug,
                        source: "library",
                        has_query: Boolean(query.trim()),
                        category: skill.category,
                      })
                    }
                  >
                    <span className={skillNumber}>
                      {String(pageStart + index + 1).padStart(2, "0")}
                    </span>
                    <span className={skillMain}>
                      <strong>{skill.title}</strong>
                      <span>{skill.outcome}</span>
                    </span>
                    <span className={skillTags}>
                      <span
                        className={`${tag} border-[color-mix(in_srgb,var(--accent,var(--color-ink))_32%,var(--color-line))] font-bold text-ink`}
                      >
                        {itemCategory.shortName}
                      </span>
                      {skill.tags.slice(0, 2).map((itemTag) => (
                        <span className={tag} key={itemTag}>
                          {itemTag}
                        </span>
                      ))}
                    </span>
                    <span className={skillArrow} aria-hidden="true">
                      View
                    </span>
                  </Link>
                );
              })}
            </div>
            {pageCount > 1 ? (
              <nav
                className="grid grid-cols-[auto_auto_1fr_auto] items-center gap-2 px-1 pt-6 font-ui max-[480px]:grid-cols-2 max-[480px]:px-0 [&_button]:min-h-11 [&_button]:min-w-11 [&_button]:cursor-pointer [&_button]:border [&_button]:border-line [&_button]:bg-surface [&_button]:px-[13px] [&_button]:text-sm [&_button]:font-semibold [&_button]:text-ink-2 [&_button]:transition-colors [&_button]:duration-[140ms] [&_button:hover:not(:disabled)]:border-line-2 [&_button:hover:not(:disabled)]:text-ink [&_button:disabled]:cursor-not-allowed [&_button:disabled]:opacity-[0.38]"
                aria-label="Workflow result pages"
              >
                <button
                  className="max-[480px]:col-start-1 max-[480px]:row-start-1 max-[480px]:justify-self-start"
                  type="button"
                  onClick={() => selectPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <div className="flex gap-1.5 max-[480px]:col-start-1 max-[480px]:col-end-3 max-[480px]:row-start-2 max-[480px]:justify-self-center">
                  {Array.from(
                    { length: pageCount },
                    (_, index) => index + 1,
                  ).map((pageNumber) => (
                    <button
                      type="button"
                      key={pageNumber}
                      className="aria-[current=page]:border-ink aria-[current=page]:bg-ink aria-[current=page]:text-bg"
                      aria-current={
                        pageNumber === currentPage ? "page" : undefined
                      }
                      onClick={() => selectPage(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  ))}
                </div>
                <span className="justify-self-end text-xs tabular-nums text-ink-3 max-[480px]:col-start-1 max-[480px]:col-end-3 max-[480px]:row-start-3 max-[480px]:mt-1 max-[480px]:justify-self-center">
                  Page {currentPage} of {pageCount}
                </span>
                <button
                  className="max-[480px]:col-start-2 max-[480px]:row-start-1 max-[480px]:justify-self-end"
                  type="button"
                  onClick={() => selectPage(currentPage + 1)}
                  disabled={currentPage === pageCount}
                >
                  Next
                </button>
              </nav>
            ) : null}
          </>
        ) : (
          <div className="max-w-[620px] border-b border-line px-3 py-[72px]">
            <p className={eyebrow}>
              {filter === "new" ? "No new workflows" : "No exact workflow"}
            </p>
            <h3 className={`${heading.h3} text-[1.6rem]`}>
              {filter === "new"
                ? "Nothing was added in the last four days."
                : "Try the underlying situation."}
            </h3>
            <p className="text-[0.92rem] text-ink-2">
              {filter === "new"
                ? "Switch back to the complete library while the next workflows are being prepared."
                : "Use words such as “refund,” “packing,” “brain dump,” “doctor appointment,” or “what can I cook.” The library stays intentionally focused."}
            </p>
            <button
              className={`${button.secondary} mt-[0.8rem]`}
              type="button"
              onClick={() => {
                setQuery("");
                setFilter("all");
                setPage(1);
              }}
            >
              Show all workflows
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
