// middleware.ts  (project root — runs on the Edge runtime before every request)
// =============================================================================
// SECURITY: Rate limiting + secure HTTP headers on all routes.
// OWASP References:
//   A05 - Security Misconfiguration  → CSP, X-Frame-Options, etc.
//   A07 - Identification & Auth Fail → Rate limiting
// =============================================================================

import { NextRequest, NextResponse } from "next/server";

// ── Types ─────────────────────────────────────────────────────────────────────
interface RateLimitEntry {
  count:     number;
  resetTime: number;
}

// ── In-memory rate limit store (Edge-compatible) ──────────────────────────────
// NOTE: For production at scale, replace with an external store like
// Upstash Redis so limits are shared across Edge nodes.
const rateLimitStore = new Map<string, RateLimitEntry>();

// ── Rate limit config ─────────────────────────────────────────────────────────
const RATE_LIMITS = {
  // General pages: generous — 120 req / 60 s per IP
  default: { maxRequests: 120, windowMs: 60_000 },
  // API routes: tighter — 20 req / 60 s per IP
  api:     { maxRequests: 20,  windowMs: 60_000 },
} as const;

// ── Extract a safe client identifier (IP or fallback) ────────────────────────
// SECURITY: Never trust X-Forwarded-For blindly; take only the first (leftmost)
// IP which is the client IP when Vercel/Cloudflare rewrites it.
function getClientId(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const firstIp = forwarded.split(",")[0].trim();
    // Validate basic IP format to prevent header injection
    if (/^[\d.:\[\]a-fA-F]+$/.test(firstIp)) return firstIp;
  }
  // Vercel sets this header
  const realIp = req.headers.get("x-real-ip");
  if (realIp && /^[\d.:\[\]a-fA-F]+$/.test(realIp.trim())) return realIp.trim();
  return "unknown";
}

// ── Rate limit check ──────────────────────────────────────────────────────────
function checkRateLimit(
  clientId: string,
  config: { maxRequests: number; windowMs: number }
): { allowed: boolean; remaining: number; resetIn: number } {
  const now  = Date.now();
  const key  = clientId;
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetTime) {
    // New window
    rateLimitStore.set(key, { count: 1, resetTime: now + config.windowMs });
    return { allowed: true, remaining: config.maxRequests - 1, resetIn: config.windowMs };
  }

  if (entry.count >= config.maxRequests) {
    return { allowed: false, remaining: 0, resetIn: entry.resetTime - now };
  }

  entry.count++;
  return { allowed: true, remaining: config.maxRequests - entry.count, resetIn: entry.resetTime - now };
}

// ── Periodic cleanup (prevent memory leak) ────────────────────────────────────
// Runs on every request but only actually cleans up every ~5 minutes
let lastCleanup = 0;
function maybeCleanup() {
  const now = Date.now();
  if (now - lastCleanup < 300_000) return;
  lastCleanup = now;
  for (const [key, entry] of rateLimitStore) {
    if (now > entry.resetTime) rateLimitStore.delete(key);
  }
}

// ── Security response headers ─────────────────────────────────────────────────
// OWASP A05 — Security Misconfiguration
function addSecurityHeaders(res: NextResponse): NextResponse {
  const h = res.headers;

  // Prevent clickjacking
  h.set("X-Frame-Options", "DENY");

  // Prevent MIME-type sniffing
  h.set("X-Content-Type-Options", "nosniff");

  // Force HTTPS (Strict-Transport-Security)
  h.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");

  // Referrer policy — don't leak URL to third-party sites
  h.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Permissions policy — disable unneeded browser features
  h.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=(), usb=()"
  );

  // Content-Security-Policy
  // SECURITY: Adjust 'script-src' and 'style-src' if you add third-party scripts.
  // SECURITY: Remove 'unsafe-inline' from script-src once you add a nonce solution.
  h.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      // Next.js requires 'unsafe-inline' and 'unsafe-eval' in dev;
      // in production these can be tightened with nonces.
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; ")
  );

  // Remove server fingerprinting header (Vercel strips this automatically, but belt-and-braces)
  h.delete("X-Powered-By");

  return res;
}

// ── Middleware entry point ────────────────────────────────────────────────────
export function middleware(req: NextRequest) {
  maybeCleanup();

  const { pathname } = req.nextUrl;
  const isApi        = pathname.startsWith("/api/");
  const config       = isApi ? RATE_LIMITS.api : RATE_LIMITS.default;
  const clientId     = getClientId(req);
  const rl           = checkRateLimit(clientId, config);

  // ── 429 Too Many Requests ──────────────────────────────────────────────────
  if (!rl.allowed) {
    const body = JSON.stringify({
      error:   "Too Many Requests",
      message: "You have exceeded the request limit. Please slow down and try again.",
      retryAfterMs: rl.resetIn,
    });

    const res = new NextResponse(body, {
      status: 429,
      headers: {
        "Content-Type":  "application/json",
        "Retry-After":   String(Math.ceil(rl.resetIn / 1000)),
        // SECURITY: Expose rate-limit headers so clients can back off gracefully
        "X-RateLimit-Limit":     String(config.maxRequests),
        "X-RateLimit-Remaining": "0",
        "X-RateLimit-Reset":     String(Math.ceil((Date.now() + rl.resetIn) / 1000)),
      },
    });
    return addSecurityHeaders(res);
  }

  // ── Allow through — attach security headers ────────────────────────────────
  const res = NextResponse.next();
  res.headers.set("X-RateLimit-Limit",     String(config.maxRequests));
  res.headers.set("X-RateLimit-Remaining", String(rl.remaining));
  res.headers.set("X-RateLimit-Reset",     String(Math.ceil((Date.now() + rl.resetIn) / 1000)));
  return addSecurityHeaders(res);
}

// ── Matcher: apply to all routes except static assets ────────────────────────
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};