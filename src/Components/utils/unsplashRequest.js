import axios from "axios";

const API_ROOT = "https://api.unsplash.com";
const CACHE_PREFIX = "gallery:unsplash:v1:";
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;
const MAX_CACHE_ENTRIES = 18;
const MAX_CACHE_ENTRY_SIZE = 300_000;
const MAX_CACHE_TOTAL_SIZE = 2_000_000;
const pendingRequests = new Map();

function createCacheKey(path, params = {}) {
  const query = new URLSearchParams();
  Object.keys(params)
    .sort()
    .forEach((key) => query.set(key, String(params[key])));
  return `${CACHE_PREFIX}${path}?${query.toString()}`;
}

function readCachedData(key) {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const entry = JSON.parse(cached);
    if (Date.now() - entry.savedAt > CACHE_TTL_MS) {
      localStorage.removeItem(key);
      return null;
    }
    return entry.data;
  } catch {
    return null;
  }
}

function writeCachedData(key, data) {
  try {
    const value = JSON.stringify({ savedAt: Date.now(), data });
    if (value.length > MAX_CACHE_ENTRY_SIZE) return;

    const existingEntries = Object.keys(localStorage)
      .filter((storageKey) => storageKey.startsWith(CACHE_PREFIX))
      .map((storageKey) => {
        const raw = localStorage.getItem(storageKey);
        let savedAt = 0;
        try {
          savedAt = JSON.parse(raw)?.savedAt || 0;
        } catch {
          // Treat malformed cache entries as oldest.
        }
        return { key: storageKey, size: raw?.length || 0, savedAt };
      })
      .filter((entry) => entry.key !== key)
      .sort((first, second) => first.savedAt - second.savedAt);

    let totalSize = existingEntries.reduce((total, entry) => total + entry.size, value.length);
    while (
      existingEntries.length >= MAX_CACHE_ENTRIES ||
      totalSize > MAX_CACHE_TOTAL_SIZE
    ) {
      const oldest = existingEntries.shift();
      if (!oldest) break;
      localStorage.removeItem(oldest.key);
      totalSize -= oldest.size;
    }

    localStorage.setItem(key, value);
  } catch {
    // Storage may be unavailable or full; the API response still works.
  }
}

export default async function unsplashRequest(path, apiKey, params = {}) {
  const key = createCacheKey(path, params);
  const cachedData = readCachedData(key);
  if (cachedData !== null) return cachedData;

  if (pendingRequests.has(key)) return pendingRequests.get(key);

  const request = axios
    .get(`${API_ROOT}${path}`, {
      headers: { Authorization: `Client-ID ${apiKey}` },
      params,
    })
    .then(({ data }) => {
      writeCachedData(key, data);
      return data;
    })
    .finally(() => pendingRequests.delete(key));

  pendingRequests.set(key, request);
  return request;
}
