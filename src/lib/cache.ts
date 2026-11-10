/**
 * Native Edge KV Cache Wrapper
 * Interacts directly with Cloudflare KV or Vercel KV REST.
 */

export async function kvGet<T>(key: string, env?: { KV?: any }): Promise<T | null> {
  try {
    const kv = env?.KV || (typeof process !== "undefined" && (process.env as any)?.KV);
    if (kv && typeof kv.get === "function") {
      const val = await kv.get(key);
      return val ? JSON.parse(val) : null;
    }
  } catch {}
  return null;
}

export async function kvSet(
  key: string,
  value: any,
  ttlSeconds: number = 3600,
  env?: { KV?: any }
): Promise<void> {
  try {
    const kv = env?.KV || (typeof process !== "undefined" && (process.env as any)?.KV);
    if (kv && typeof kv.put === "function") {
      await kv.put(key, JSON.stringify(value), { expirationTtl: ttlSeconds });
    }
  } catch {}
}

export async function kvDelete(key: string, env?: { KV?: any }): Promise<void> {
  try {
    const kv = env?.KV || (typeof process !== "undefined" && (process.env as any)?.KV);
    if (kv && typeof kv.delete === "function") {
      await kv.delete(key);
    }
  } catch {}
}

