import { describe, expect, it } from "vitest";
import { LibraryMemory } from "../lib/library-memory";

function memoryStorage(initial: string | null = null) {
  let value = initial;
  return {
    getItem: () => value,
    setItem: (_key: string, next: string) => { value = next; },
    value: () => value,
  };
}

describe("library memory", () => {
  it("saves and restores a validated state", () => {
    const storage = memoryStorage();
    const state = LibraryMemory.recordRecent(LibraryMemory.toggleSaved(LibraryMemory.empty(), "plan-your-week"), "plan-your-week");
    expect(LibraryMemory.write(storage, state)).toEqual({ ok: true, value: state });
    expect(LibraryMemory.read(storage)).toEqual({ ok: true, value: state });
  });

  it("rejects malformed browser data", () => {
    const result = LibraryMemory.read(memoryStorage('{"saved":[42],"recent":[]}'));
    expect(result).toEqual({ ok: false, error: { code: "invalid-state" } });
  });

  it("keeps recent workflows unique and bounded", () => {
    const slugs = ["one", "two", "three", "four", "five", "six", "seven", "three"];
    const state = slugs.reduce((memory, slug) => LibraryMemory.recordRecent(memory, slug), LibraryMemory.empty());
    expect(state.recent).toEqual(["three", "seven", "six", "five", "four", "two"]);
  });
});
