"use client";

import { track } from "@vercel/analytics";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { createSkillSearch, searchSkills } from "@/lib/skills/search";
import type { CatalogSkill, Category } from "@/lib/types";

type Props = { skills: CatalogSkill[]; categories: Category[] };
const PAGE_SIZE = 10;

export function SearchLibrary({ skills, categories }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const ledgerRef = useRef<HTMLDivElement>(null);

  const search = useMemo(() => createSkillSearch(skills), [skills]);

  const results = useMemo(() => {
    const matching = searchSkills(search, skills, query);
    return category === "all" ? matching : matching.filter((skill) => skill.category === category);
  }, [category, query, search, skills]);

  useEffect(() => { setPage(1); }, [query, category]);

  const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const pageEnd = Math.min(pageStart + PAGE_SIZE, results.length);
  const visibleResults = results.slice(pageStart, pageEnd);

  function goToPage(nextPage: number) {
    if (nextPage < 1 || nextPage > pageCount || nextPage === currentPage) return;
    setPage(nextPage);
    track("library_page_change", { page: nextPage, query: query || "none", category });
    requestAnimationFrame(() => ledgerRef.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" }));
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    track(results.length ? "search" : "zero_result_search", { query, category, results: results.length });
  }

  return (
    <section className="library-section wrap" id="library" aria-labelledby="library-title">
      <div className="section-heading">
        <div><p className="eyebrow">The library — 30 packages</p><h2 id="library-title">Find the moment you are in.</h2></div>
        <p>Search in plain language. Every package is fully inspectable before you install anything.</p>
      </div>
      <form className="search-panel" role="search" onSubmit={submit}>
        <label className="visually-hidden" htmlFor="skill-search">What are you trying to handle?</label>
        <div className={`search-box${query ? " has-query" : ""}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
          <input
            ref={inputRef}
            id="skill-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setQuery("");
                event.currentTarget.blur();
              }
            }}
            placeholder="Describe the situation…"
            autoComplete="off"
          />
          <kbd className="kbd" aria-hidden="true">/</kbd>
        </div>
        <div className="search-examples">
          <span>Try</span>
          {["I feel overwhelmed", "suspicious text", "what can I cook"].map((example) => (
            <button key={example} type="button" onClick={() => { setQuery(example); inputRef.current?.focus(); track("example_query", { query: example }); }}>“{example}”</button>
          ))}
        </div>
        <div className="filter-row" aria-label="Filter by category">
          <button type="button" className={category === "all" ? "filter active" : "filter"} onClick={() => setCategory("all")}>All 30</button>
          {categories.map((item) => <button type="button" key={item.slug} className={category === item.slug ? "filter active" : "filter"} onClick={() => setCategory(item.slug)}>{item.shortName}</button>)}
        </div>
      </form>
      <div className="ledger" ref={ledgerRef}>
        <div className="ledger-head">
          <span aria-hidden="true">#</span><span aria-hidden="true">Skill</span><span className="ledger-count" aria-live="polite">{results.length ? `${pageStart + 1}–${pageEnd} of ${results.length}` : "0 skills"}</span>
        </div>
        {results.length ? (
          <>
            <div className="skill-list">
            {visibleResults.map((skill, index) => {
              const itemCategory = categories.find((item) => item.slug === skill.category)!;
              return (
                <Link
                  className={`skill-row accent-${itemCategory.color}`}
                  href={`/skills/${skill.slug}`}
                  key={skill.slug}
                  style={{ animationDelay: `${Math.min(index, 10) * 20}ms` }}
                  onClick={() => track("skill_open", { skill: skill.slug, source: "library" })}
                >
                  <span className="skill-number">{String(pageStart + index + 1).padStart(2, "0")}</span>
                  <span className="skill-main"><strong>{skill.title}</strong><span>{skill.outcome}</span></span>
                  <span className="skill-cat"><span className="cat-dot" aria-hidden="true" />{itemCategory.shortName}</span>
                  <span className="skill-arrow" aria-hidden="true">↗</span>
                </Link>
              );
            })}
            </div>
            {pageCount > 1 && <nav className="pagination" aria-label="Library pages">
              <button type="button" className="pagination-button" disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)}><span aria-hidden="true">←</span> Previous</button>
              <span className="pagination-status" aria-live="polite">Page {currentPage} of {pageCount}</span>
              <button type="button" className="pagination-button" disabled={currentPage === pageCount} onClick={() => goToPage(currentPage + 1)}>Next <span aria-hidden="true">→</span></button>
            </nav>}
          </>
        ) : (
          <div className="empty-state"><p className="eyebrow">No exact skill</p><h3>Try the underlying situation.</h3><p>Use words such as “refund,” “packing,” “brain dump,” “doctor appointment,” or “what can I cook.” The launch library stays intentionally focused.</p><button className="button secondary" type="button" onClick={() => { setQuery(""); setCategory("all"); }}>Show all skills</button></div>
        )}
      </div>
    </section>
  );
}
