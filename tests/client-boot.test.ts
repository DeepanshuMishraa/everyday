import vm from "node:vm";
import { describe, expect, it } from "vitest";
import { clientBootScript } from "../lib/client-boot";

function runBootScript() {
  const listeners = new Map<string, (event: Record<string, unknown>) => void>();
  const attributes = new Map<string, string>();
  const root = { dataset: { theme: "light" } };
  let stored = "dark";
  let focused = false;
  let scrolled = false;
  const button = {
    setAttribute: (name: string, value: string) => attributes.set(name, value),
  };
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
    querySelector: () => button,
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
    attributes,
    button,
    input,
    listeners,
    root,
    state: () => ({ focused, scrolled, stored }),
  };
}

describe("pre-hydration interactions", () => {
  it("loads and toggles the color theme without React", () => {
    const harness = runBootScript();
    expect(harness.root.dataset.theme).toBe("dark");
    harness.listeners.get("click")?.({
      target: { closest: () => harness.button },
    });
    expect(harness.root.dataset.theme).toBe("light");
    expect(harness.state().stored).toBe("light");
    expect(harness.attributes.get("aria-label")).toBe("Switch to dark mode");
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
