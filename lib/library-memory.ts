export type LibraryMemoryState = {
  saved: string[];
  recent: string[];
};

export type LibraryMemoryError = {
  code: "storage-unavailable" | "invalid-state";
};

export type LibraryMemoryResult<T> =
  | { ok: true; value: T }
  | { ok: false; error: LibraryMemoryError };

export const LIBRARY_MEMORY_EVENT = "everyday-library-memory-change";
const STORAGE_KEY = "everyday-library-memory-v1";
const MAX_RECENT = 6;

function isSlug(value: unknown): value is string {
  return typeof value === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

function uniqueSlugs(value: unknown): string[] | null {
  if (!Array.isArray(value) || !value.every(isSlug)) return null;
  return [...new Set(value)];
}

function parse(raw: string): LibraryMemoryResult<LibraryMemoryState> {
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return { ok: false, error: { code: "invalid-state" } };
  }
  if (typeof value !== "object" || value === null || !("saved" in value) || !("recent" in value)) {
    return { ok: false, error: { code: "invalid-state" } };
  }
  const saved = uniqueSlugs(value.saved);
  const recent = uniqueSlugs(value.recent);
  if (!saved || !recent) return { ok: false, error: { code: "invalid-state" } };
  return { ok: true, value: { saved, recent: recent.slice(0, MAX_RECENT) } };
}

export const LibraryMemory = {
  empty(): LibraryMemoryState {
    return { saved: [], recent: [] };
  },

  storage(): LibraryMemoryResult<Storage> {
    try {
      return { ok: true, value: window.localStorage };
    } catch {
      return { ok: false, error: { code: "storage-unavailable" } };
    }
  },

  read(storage: Pick<Storage, "getItem">): LibraryMemoryResult<LibraryMemoryState> {
    try {
      const raw = storage.getItem(STORAGE_KEY);
      return raw === null ? { ok: true, value: LibraryMemory.empty() } : parse(raw);
    } catch {
      return { ok: false, error: { code: "storage-unavailable" } };
    }
  },

  write(storage: Pick<Storage, "setItem">, state: LibraryMemoryState): LibraryMemoryResult<LibraryMemoryState> {
    try {
      storage.setItem(STORAGE_KEY, JSON.stringify(state));
      return { ok: true, value: state };
    } catch {
      return { ok: false, error: { code: "storage-unavailable" } };
    }
  },

  toggleSaved(state: LibraryMemoryState, slug: string): LibraryMemoryState {
    const saved = state.saved.includes(slug)
      ? state.saved.filter((item) => item !== slug)
      : [slug, ...state.saved];
    return { ...state, saved };
  },

  recordRecent(state: LibraryMemoryState, slug: string): LibraryMemoryState {
    return { ...state, recent: [slug, ...state.recent.filter((item) => item !== slug)].slice(0, MAX_RECENT) };
  },
} as const;
