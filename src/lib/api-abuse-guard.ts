// Form rate limits. In-memory only on serverless — Firewall does the heavy lifting.

type Bucket = { count: number; resetAt: number }

const buckets = new Map<string, Bucket>()

const MAX_BUCKETS = 5000

function pruneBuckets(now: number) {
  if (buckets.size < MAX_BUCKETS) return
  for (const [key, b] of buckets) {
    if (b.resetAt <= now) buckets.delete(key)
  }
  if (buckets.size >= MAX_BUCKETS) {
    // Still full — drop the oldest half
    const keys = [...buckets.keys()].slice(0, Math.floor(MAX_BUCKETS / 2))
    for (const k of keys) buckets.delete(k)
  }
}

export function allowRequest(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  pruneBuckets(now)
  const existing = buckets.get(key)
  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }
  if (existing.count >= limit) return false
  existing.count += 1
  return true
}

/** Check all limits first, only bump counts if every one would pass */
export function allowRequestAll(
  entries: { key: string; limit: number; windowMs: number }[]
): boolean {
  const now = Date.now()
  pruneBuckets(now)
  for (const e of entries) {
    const b = buckets.get(e.key)
    if (b && b.resetAt > now && b.count >= e.limit) return false
  }
  for (const e of entries) {
    const existing = buckets.get(e.key)
    if (!existing || existing.resetAt <= now) {
      buckets.set(e.key, { count: 1, resetAt: now + e.windowMs })
    } else {
      existing.count += 1
    }
  }
  return true
}

export function clientIpFromRequest(req: Request): string {
  const xf = req.headers.get("x-forwarded-for")
  if (xf) {
    const first = xf.split(",")[0]?.trim()
    if (first) return first.slice(0, 128)
  }
  const real = req.headers.get("x-real-ip")?.trim()
  if (real) return real.slice(0, 128)
  return "unknown"
}

export function contentLengthOk(req: Request, maxBytes: number): boolean {
  const raw = req.headers.get("content-length")
  if (!raw) return true
  const n = Number(raw)
  if (!Number.isFinite(n) || n < 0) return false
  return n <= maxBytes
}

export const CONTACT_RATE = { limit: 8, windowMs: 15 * 60 * 1000 } as const
export const CAREERS_RATE = { limit: 5, windowMs: 15 * 60 * 1000 } as const
export const CONTACT_EMAIL_DAILY = { limit: 1, windowMs: 24 * 60 * 60 * 1000 } as const
export const CONTACT_IP_DAILY = { limit: 1, windowMs: 24 * 60 * 60 * 1000 } as const
// Careers: 1 app/email/day; IP a bit looser for shared office wifi
export const CAREERS_EMAIL_DAILY = { limit: 1, windowMs: 24 * 60 * 60 * 1000 } as const
export const CAREERS_IP_DAILY = { limit: 3, windowMs: 24 * 60 * 60 * 1000 } as const
export const MAX_CONTACT_JSON_BYTES = 64 * 1024
export const MAX_CAREERS_BODY_BYTES = 6 * 1024 * 1024

export function normalizeEmailKey(email: string): string {
  return email.trim().toLowerCase().slice(0, 320)
}

/** Soft same-origin: missing Origin ok, clear cross-site Origins rejected */
export function originAllowed(req: Request, allowedHosts: string[]): boolean {
  const origin = req.headers.get("origin")
  if (!origin) return true
  try {
    const host = new URL(origin).host.toLowerCase()
    return allowedHosts.some((h) => h.toLowerCase() === host)
  } catch {
    return false
  }
}

export function defaultAllowedHosts(siteUrl?: string): string[] {
  const hosts = new Set<string>()
  if (siteUrl) {
    try {
      hosts.add(new URL(siteUrl).host)
    } catch {
      /* ignore */
    }
  }
  hosts.add("localhost:3003")
  hosts.add("localhost:3001")
  hosts.add("127.0.0.1:3003")
  hosts.add("127.0.0.1:3001")
  return [...hosts]
}
