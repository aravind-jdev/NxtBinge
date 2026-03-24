const cache = new Map();

// ⏱ Set cache with expiry (TTL)
export const setCache = (key, data, ttl = 600000) => {
  const expiry = Date.now() + ttl;

  cache.set(key, { data, expiry });
};

// 📦 Get cache
export const getCache = (key) => {
  const cached = cache.get(key);

  if (!cached) return null;

  // ❌ expired
  if (Date.now() > cached.expiry) {
    cache.delete(key);
    return null;
  }

  return cached.data;
};