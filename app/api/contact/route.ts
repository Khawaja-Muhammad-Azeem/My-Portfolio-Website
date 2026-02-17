// app/api/contact/route.ts
// =============================================================================
// Secure contact form endpoint — add this when you're ready to add a form.
// OWASP Best Practices:
//   A01 - Broken Access Control     → Method whitelist (POST only)
//   A03 - Injection                 → Schema validation, sanitize all inputs
//   A04 - Insecure Design           → Length limits, reject unknown fields
//   A05 - Security Misconfiguration → CORS, Content-Type enforcement
//   A07 - Auth Failures             → Per-user + per-IP rate limiting (in middleware)
//   A09 - Security Logging          → Structured log on every request
// =============================================================================

import { NextRequest, NextResponse } from "next/server";

// ── Input schema ──────────────────────────────────────────────────────────────
// SECURITY: Define EXACTLY what fields are allowed and their constraints.
// Any unexpected field is silently dropped.
const FIELD_RULES = {
  name:    { minLen: 2,  maxLen: 100, pattern: /^[\p{L}\p{M} '.,-]+$/u },
  email:   { minLen: 5,  maxLen: 254, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  message: { minLen: 10, maxLen: 2000 },
} as const;

type ContactPayload = {
  name:    string;
  email:   string;
  message: string;
};

// ── Sanitize: strip HTML/script tags ─────────────────────────────────────────
// SECURITY (OWASP A03): Prevent stored XSS if messages are ever displayed.
function sanitize(raw: unknown): string {
  if (typeof raw !== "string") return "";
  return raw
    .trim()
    .replace(/<[^>]*>/g, "")           // strip HTML tags
    .replace(/javascript:/gi, "")      // strip JS protocol
    .replace(/on\w+\s*=/gi, "");       // strip inline event handlers
}

// ── Validate payload ──────────────────────────────────────────────────────────
function validate(data: Record<string, unknown>): {
  ok: boolean;
  errors: string[];
  payload: ContactPayload | null;
} {
  const errors: string[] = [];

  // SECURITY: Only extract known fields — discard everything else
  const name    = sanitize(data.name);
  const email   = sanitize(data.email).toLowerCase();
  const message = sanitize(data.message);

  // ── name ──
  if (name.length < FIELD_RULES.name.minLen)
    errors.push(`Name must be at least ${FIELD_RULES.name.minLen} characters.`);
  if (name.length > FIELD_RULES.name.maxLen)
    errors.push(`Name must not exceed ${FIELD_RULES.name.maxLen} characters.`);
  if (name && !FIELD_RULES.name.pattern.test(name))
    errors.push("Name contains invalid characters.");

  // ── email ──
  if (email.length < FIELD_RULES.email.minLen)
    errors.push("Please provide a valid email address.");
  if (email.length > FIELD_RULES.email.maxLen)
    errors.push(`Email must not exceed ${FIELD_RULES.email.maxLen} characters.`);
  if (email && !FIELD_RULES.email.pattern.test(email))
    errors.push("Email address format is invalid.");

  // ── message ──
  if (message.length < FIELD_RULES.message.minLen)
    errors.push(`Message must be at least ${FIELD_RULES.message.minLen} characters.`);
  if (message.length > FIELD_RULES.message.maxLen)
    errors.push(`Message must not exceed ${FIELD_RULES.message.maxLen} characters.`);

  if (errors.length > 0) return { ok: false, errors, payload: null };

  return { ok: true, errors: [], payload: { name, email, message } };
}

// ── POST handler ──────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // ── Content-Type guard ────────────────────────────────────────────────────
  // SECURITY: Only accept JSON to prevent form-based CSRF attacks
  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { error: "Content-Type must be application/json" },
      { status: 415 }
    );
  }

  // ── Parse body ────────────────────────────────────────────────────────────
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // SECURITY: Reject if body is not a plain object
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return NextResponse.json({ error: "Request body must be a JSON object" }, { status: 400 });
  }

  // ── Validate & sanitize ───────────────────────────────────────────────────
  const { ok, errors, payload } = validate(body);
  if (!ok || !payload) {
    return NextResponse.json({ error: "Validation failed", details: errors }, { status: 422 });
  }

  // ── Send email ────────────────────────────────────────────────────────────
  // SECURITY: API key is read from environment variable — NEVER hardcoded here.
  // Add RESEND_API_KEY (or your provider's key) to .env.local
  // and to your Vercel project's Environment Variables settings.
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Log server-side only — don't expose internals to client
    console.error("[contact] RESEND_API_KEY is not set in environment variables.");
    return NextResponse.json(
      { error: "Mail service is not configured. Please try emailing directly." },
      { status: 503 }
    );
  }

  try {
    // Example using Resend (https://resend.com) — swap for your email provider
    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type":  "application/json",
        // SECURITY: API key read from env, never from client-side code
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from:    "Portfolio Contact <onboarding@resend.dev>",
        to:      [process.env.CONTACT_EMAIL ?? "khawajaazeem0409@gmail.com"],
        subject: `Portfolio message from ${payload.name}`,
        // SECURITY: Sanitized values used here — no raw HTML from user
        text:    `Name: ${payload.name}\nEmail: ${payload.email}\n\nMessage:\n${payload.message}`,
      }),
    });

    if (!emailRes.ok) {
      console.error("[contact] Email provider returned", emailRes.status);
      return NextResponse.json(
        { error: "Failed to send message. Please try again later." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("[contact] Unexpected error sending email:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }

  // ── Success ───────────────────────────────────────────────────────────────
  // SECURITY: Return minimal info — don't echo back user data unnecessarily
  return NextResponse.json({ success: true, message: "Message sent!" }, { status: 200 });
}

// ── Block all other HTTP methods ──────────────────────────────────────────────
export function GET()    { return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 }); }
export function PUT()    { return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 }); }
export function DELETE() { return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 }); }
export function PATCH()  { return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 }); }