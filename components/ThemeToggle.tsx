"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";
const THEME_EVENT = "everyday-theme-change";

function currentTheme(): Theme | null {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function serverTheme(): Theme | null {
  return null;
}

function subscribeTheme(onStoreChange: () => void): () => void {
  window.addEventListener(THEME_EVENT, onStoreChange);
  return () => window.removeEventListener(THEME_EVENT, onStoreChange);
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeTheme, currentTheme, serverTheme);

  function toggleTheme() {
    const nextTheme = (theme ?? currentTheme()) === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    try {
      localStorage.setItem("everyday-theme", nextTheme);
    } catch {
      // The selected theme still applies when storage is unavailable.
    }
    window.dispatchEvent(new Event(THEME_EVENT));
  }

  return (
    <button
      type="button"
      className="grid size-11 cursor-pointer place-items-center rounded-full border-0 bg-surface text-ink-2 shadow-button transition-[color,background-color,box-shadow] duration-[180ms] ease-spring hover:bg-surface-2 hover:text-ink hover:shadow-button-hover active:shadow-button-active motion-reduce:transition-none"
      data-theme-toggle
      aria-label={
        theme === null
          ? "Toggle color theme"
          : `Switch to ${theme === "dark" ? "light" : "dark"} mode`
      }
      aria-pressed={theme === null ? undefined : theme === "dark"}
      onClick={toggleTheme}
    >
      <span className="relative size-[15px]" aria-hidden="true">
        <svg
          className="absolute inset-0 size-[15px] rotate-0 scale-100 opacity-100 transition-[opacity,transform] duration-[360ms] ease-spring dark:rotate-[60deg] dark:scale-50 dark:opacity-0 motion-reduce:transition-none"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.2 5.2l1.5 1.5M17.3 17.3l1.5 1.5M18.8 5.2l-1.5 1.5M6.7 17.3l-1.5 1.5" />
        </svg>
        <svg
          className="absolute inset-0 size-[15px] -rotate-[60deg] scale-50 opacity-0 transition-[opacity,transform] duration-[360ms] ease-spring dark:rotate-0 dark:scale-100 dark:opacity-100 motion-reduce:transition-none"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />
        </svg>
      </span>
    </button>
  );
}
