/**
 * Simple in-memory sliding-window rate limiter.
 * Works per-route on a single process — swap to Redis for multi-instance.
 */

const store = new Map<string, { count: number; resetAt: number }>();

export interface RateLimitConfig {
  /** Maximum number of requests allowed within the window. */
  limit: number;
  /** Window size in seconds. */
  windowSeconds: number;
}

const DEFAULT: RateLimitConfig = { limit: 10, windowSeconds: 60 };

/**
 * Returns `{ ok, remaining }`.
 * When `ok` is false the caller has exceeded the limit.
 */
export function rateLimit(
  key: string,
  config: RateLimitConfig = DEFAULT,
): { ok: boolean; remaining: number } {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + config.windowSeconds * 1000 });
    return { ok: true, remaining: config.limit - 1 };
  }

  entry.count += 1;

  if (entry.count > config.limit) {
    return { ok: false, remaining: 0 };
  }

  return { ok: true, remaining: config.limit - entry.count };
}

/** Helper: extract a stable key from the request (IP + route). */
export function rateLimitKey(request: Request, route: string): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";
  return `${route}:${ip}`;
}
