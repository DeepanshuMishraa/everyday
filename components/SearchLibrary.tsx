"use client";

import { track } from "@vercel/analytics";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { LibraryMemoryPanel } from "@/components/LibraryMemoryPanel";
import { createSkillSearch, searchSkills } from "@/lib/skills/search";
import type { CatalogSkill, Category } from "@/lib/types";

type Props = { skills: CatalogSkill[]; categories: Category[] };
export function SearchLibrary({ skills, categories }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const inputRef = useRef<HTMLInputElement>(null);
  const trackedSearchRef = useRef("");

  const search = useMemo(() => createSkillSearch(skills), [skills]);
  const categoriesBySlug = useMemo(() => new Map(categories.map((item) => [item.slug, item])), [categories]);

  const results = useMemo(() => {
    const matching = searchSkills(search, skills, query);
    return category === "all" ? matching : matching.filter((skill) => skill.category === category);
  }, [category, query, search, skills]);

  useEffect(() => {
    const normalized = query.trim();
    if (!normalized && category === "all") return;
    const signature = `${normalized.toLocaleLowerCase()}|${category}|${results.length}`;
    const timer = window.setTimeout(() => {
      if (trackedSearchRef.current === signature) return;
      trackedSearchRef.current = signature;
      track(results.length ? "search_performed" : "zero_result_search", { has_query: Boolean(normalized), query_length: normalized.length, category, results: results.length });
    }, 600);
    return () => window.clearTimeout(timer);
  }, [category, query, results.length]);

  function submit(event: FormEvent) {
    event.preventDefault();
    const normalized = query.trim();
    trackedSearchRef.current = `${normalized.toLocaleLowerCase()}|${category}|${results.length}`;
    track(results.length ? "search_performed" : "zero_result_search", { has_query: Boolean(normalized), query_length: normalized.length, category, results: results.length });
  }

  return (
    <section className="library-section wrap" id="library" aria-labelledby="library-title">
      <div className="section-heading">
        <div><p className="eyebrow">30 practical workflows</p><h1 id="library-title">What are you trying to do?</h1></div>
        <p>Describe the situation in plain language. Open a workflow and start with the first useful step.</p>
      </div>
      <LibraryMemoryPanel skills={skills} />
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
            aria-keyshortcuts="/"
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
          <button type="button" aria-pressed={category === "all"} className={category === "all" ? "filter active" : "filter"} onClick={() => setCategory("all")}>All 30</button>
          {categories.map((item) => <button type="button" aria-pressed={category === item.slug} key={item.slug} className={category === item.slug ? "filter active" : "filter"} onClick={() => setCategory(item.slug)}>{item.shortName}</button>)}
        </div>
      </form>
      <div className="ledger">
        <div className="ledger-head">
          <span aria-hidden="true">#</span><span aria-hidden="true">Workflow</span><span className="ledger-count" aria-live="polite">{results.length ? `${results.length} workflows` : "0 workflows"}</span>
        </div>
        {results.length ? (
          <>
            <div className="skill-list">
            {results.map((skill, index) => {
              const itemCategory = categoriesBySlug.get(skill.category);
              if (!itemCategory) return null;
              return (
                <Link
                  className={`skill-row accent-${itemCategory.color}`}
                  href={`/skills/${skill.slug}`}
                  key={skill.slug}
                  style={{ animationDelay: `${Math.min(index, 10) * 20}ms` }}
                  onClick={() => track("search_to_skill_open", { skill: skill.slug, source: "library", has_query: Boolean(query.trim()), category })}
                >
                  <span className="skill-number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="skill-main"><strong>{skill.title}</strong><span>{skill.outcome}</span></span>
                  <span className="skill-tags"><span className="skill-category">{itemCategory.shortName}</span>{skill.tags.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}</span>
                  <span className="skill-arrow" aria-hidden="true">View</span>
                </Link>
              );
            })}
            </div>
          </>
        ) : (
          <div className="empty-state"><p className="eyebrow">No exact workflow</p><h3>Try the underlying situation.</h3><p>Use words such as “refund,” “packing,” “brain dump,” “doctor appointment,” or “what can I cook.” The library stays intentionally focused.</p><button className="button secondary" type="button" onClick={() => { setQuery(""); setCategory("all"); }}>Show all workflows</button></div>
        )}
      </div>
    </section>
  );
}
