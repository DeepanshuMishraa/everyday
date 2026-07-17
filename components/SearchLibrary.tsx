"use client";

import { track } from "@vercel/analytics";
import MiniSearch from "minisearch";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import type { CatalogSkill, Category } from "@/lib/types";

type Props = { skills: CatalogSkill[]; categories: Category[] };

export function SearchLibrary({ skills, categories }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKeydown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const typing = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      if (event.key === "/" && !typing) {
        event.preventDefault();
        inputRef.current?.focus();
      }
      if (event.key === "Escape" && target === inputRef.current) {
        setQuery("");
        inputRef.current?.blur();
      }
    }
    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, []);

  const search = useMemo(() => {
    const index = new MiniSearch<CatalogSkill>({
      fields: ["title", "description", "outcome", "examples", "tags"],
      storeFields: ["slug"],
      searchOptions: { boost: { title: 3, tags: 2, examples: 1.5 }, fuzzy: 0.22, prefix: true },
    });
    index.addAll(skills.map((skill) => ({ ...skill, id: skill.slug })));
    return index;
  }, [skills]);

  const results = useMemo(() => {
    const matching = query.trim()
      ? search.search(query).map((result) => skills.find((skill) => skill.slug === result.slug)!).filter(Boolean)
      : skills;
    return category === "all" ? matching : matching.filter((skill) => skill.category === category);
  }, [category, query, search, skills]);

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
          <input ref={inputRef} id="skill-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Describe the situation…" autoComplete="off" />
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
      <div className="ledger" aria-live="polite">
        <div className="ledger-head" aria-hidden="true">
          <span>#</span><span>Skill</span><span className="ledger-count">{results.length} {results.length === 1 ? "skill" : "skills"}</span>
        </div>
        {results.length ? (
          <div className="skill-list">
            {results.map((skill, index) => {
              const itemCategory = categories.find((item) => item.slug === skill.category)!;
              return (
                <Link
                  className={`skill-row accent-${itemCategory.color}`}
                  href={`/skills/${skill.slug}`}
                  key={skill.slug}
                  style={{ animationDelay: `${Math.min(index, 10) * 20}ms` }}
                  onClick={() => track("skill_open", { skill: skill.slug, source: "library" })}
                >
                  <span className="skill-number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="skill-main"><strong>{skill.title}</strong><span>{skill.outcome}</span></span>
                  <span className="skill-cat"><span className="cat-dot" aria-hidden="true" />{itemCategory.shortName}</span>
                  <span className="skill-arrow" aria-hidden="true">↗</span>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="empty-state"><p className="eyebrow">No exact skill</p><h3>Try the underlying situation.</h3><p>Use words such as “refund,” “packing,” “brain dump,” “doctor appointment,” or “what can I cook.” The launch library stays intentionally focused.</p><button className="button secondary" type="button" onClick={() => { setQuery(""); setCategory("all"); }}>Show all skills</button></div>
        )}
      </div>
    </section>
  );
}
