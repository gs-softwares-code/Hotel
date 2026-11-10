import { getDb } from "@/db";

export interface FeatureFlags {
  enableNewBookingEngine: boolean;
  enableDynamicPricing: boolean;
  enableMultiCurrency: boolean;
  maintenanceMode: boolean;
  enableVipConcierge: boolean;
}

const DEFAULT_FLAGS: FeatureFlags = {
  enableNewBookingEngine: true,
  enableDynamicPricing: true,
  enableMultiCurrency: true,
  maintenanceMode: false,
  enableVipConcierge: true,
};

/**
 * Strategy (S): Edge Config & Feature Flags
 * Resolves feature flags from native KV store first, then falls back to local configuration.
 */
export async function getFeatureFlag<K extends keyof FeatureFlags>(
  key: K,
  env?: { KV?: any }
): Promise<FeatureFlags[K]> {
  try {
    // 1. Cloudflare KV binding check
    if (env?.KV) {
      const kvVal = await env.KV.get(`flag:${String(key)}`);
      if (kvVal !== null && kvVal !== undefined) {
        return JSON.parse(kvVal) as FeatureFlags[K];
      }
    }

    // 2. Global process.env KV binding or Vercel KV REST
    if (typeof process !== "undefined" && (process.env as any)?.KV) {
      const kv = (process.env as any).KV;
      const kvVal = await kv.get(`flag:${String(key)}`);
      if (kvVal !== null && kvVal !== undefined) {
        return JSON.parse(kvVal) as FeatureFlags[K];
      }
    }
  } catch (error) {
    // Graceful fallback to default in edge failure scenarios
  }

  return DEFAULT_FLAGS[key];
}

export async function getAllFeatureFlags(env?: { KV?: any }): Promise<FeatureFlags> {
  const flags = { ...DEFAULT_FLAGS };
  for (const k of Object.keys(DEFAULT_FLAGS) as (keyof FeatureFlags)[]) {
    flags[k] = await getFeatureFlag(k, env);
  }
  return flags;
}

