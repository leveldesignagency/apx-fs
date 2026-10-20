// Turnstile for contact + careers.
// No keys locally = skip. Prod without keys = form rejects.

export function isTurnstileConfigured(): boolean {
  return Boolean(process.env.TURNSTILE_SECRET_KEY?.trim() && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim())
}

function isProductionRuntime(): boolean {
  return process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production"
}

export async function verifyTurnstileToken(
  token: string | undefined | null,
  remoteip?: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!isTurnstileConfigured()) {
    if (isProductionRuntime()) {
      return {
        ok: false,
        error: "Security check is not configured. Please try again later.",
      }
    }
    return { ok: true }
  }

  const secret = process.env.TURNSTILE_SECRET_KEY!.trim()
  const t = String(token ?? "").trim()
  if (!t) {
    return { ok: false, error: "Please complete the security check." }
  }

  const body = new URLSearchParams()
  body.set("secret", secret)
  body.set("response", t)
  if (remoteip && remoteip !== "unknown") body.set("remoteip", remoteip)

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    })
    const data = (await res.json()) as { success?: boolean }
    if (!data.success) {
      return { ok: false, error: "Security check failed. Please try again." }
    }
    return { ok: true }
  } catch {
    return { ok: false, error: "Security check unavailable. Please try again shortly." }
  }
}
