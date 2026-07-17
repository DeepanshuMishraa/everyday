import fs from "node:fs";
import { describe, expect, it } from "vitest";

const css = fs.readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");

describe("button surfaces", () => {
  it("never replaces the theme-aware primary hover with pure black", () => {
    expect(css).not.toMatch(/\.button\.primary:hover\s*{[^}]*background:\s*#000/i);
    expect(css).toMatch(/\.button\.primary:hover\s*{[^}]*var\(--button-primary-hover\)/i);
  });

  it("defines restrained button shadows for light and dark themes", () => {
    expect(css.match(/--button-shadow:/g)).toHaveLength(2);
    expect(css.match(/--button-shadow-hover:/g)).toHaveLength(2);
    expect(css).not.toMatch(/--button-shadow[^;]*(?:#[\da-f]{3,8}|(?:red|green|blue|purple|cyan|magenta))/i);
  });
});
