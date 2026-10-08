const STORAGE_KEYS = {
  favorites: "gallery-favorites",
  deleted: "gallery-deleted",
  selectedFilter: "gallery-filter-selected",
};

function readJson(key, fallback) {
  try {
    const stored = globalThis.localStorage?.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

export function loadPersistedState() {
  let selected = "all";
  try {
    selected = globalThis.localStorage?.getItem(STORAGE_KEYS.selectedFilter) || "all";
  } catch {
    // Fall back to the default filter when storage is unavailable.
  }
  if (!["all", "portrait", "landscape"].includes(selected)) {
    selected = "all";
  }

  const favorites = readJson(STORAGE_KEYS.favorites, []);
  const deleted = readJson(STORAGE_KEYS.deleted, []);
  return {
    favorites: { items: Array.isArray(favorites) ? favorites : [] },
    deleted: { items: Array.isArray(deleted) ? deleted : [] },
    filters: { selected },
  };
}

export function persistState(state) {
  try {
    globalThis.localStorage?.setItem(STORAGE_KEYS.favorites, JSON.stringify(state.favorites.items));
    globalThis.localStorage?.setItem(STORAGE_KEYS.deleted, JSON.stringify(state.deleted.items));
    globalThis.localStorage?.setItem(STORAGE_KEYS.selectedFilter, state.filters.selected);
  } catch {
    // Storage can be unavailable or full; the in-memory Redux state still works.
  }
}
