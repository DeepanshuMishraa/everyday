import vm from "node:vm";
import { describe, expect, it } from "vitest";
import { clientBootScript } from "../lib/client-boot";

function runBootScript() {
  const listeners = new Map<string, (event: Record<string, unknown>) => void>();
  const root = { dataset: { theme: "light" } };
  let stored = "dark";
  let focused = false;
  let scrolled = false;
  const input = {
    focus: () => {
      focused = true;
    },
    scrollIntoView: () => {
      scrolled = true;
    },
  };
  const document = {
    documentElement: root,
    getElementById: (id: string) => (id === "skill-search" ? input : null),
    addEventListener: (
      name: string,
      handler: (event: Record<string, unknown>) => void,
    ) => listeners.set(name, handler),
  };
  const localStorage = {
    getItem: () => stored,
    setItem: (_key: string, value: string) => {
      stored = value;
    },
  };
  const window = {
    matchMedia: (query: string) => ({
      matches: query.includes("color-scheme"),
    }),
  };
  vm.runInNewContext(clientBootScript, { document, localStorage, window });
  return {
    input,
    listeners,
    root,
    state: () => ({ focused, scrolled, stored }),
  };
}

describe("pre-hydration interactions", () => {
  it("loads the saved color theme before React hydrates", () => {
    const harness = runBootScript();
    expect(harness.root.dataset.theme).toBe("dark");
    expect(harness.state().stored).toBe("dark");
  });

  it("focuses search when slash is pressed outside a text field", () => {
    const harness = runBootScript();
    let prevented = false;
    harness.listeners.get("keydown")?.({
      key: "/",
      target: { tagName: "BODY", isContentEditable: false },
      preventDefault: () => {
        prevented = true;
      },
    });
    expect(harness.state()).toMatchObject({ focused: true, scrolled: true });
    expect(prevented).toBe(true);
  });
});
