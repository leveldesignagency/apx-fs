"use client"

import { useEffect, useRef } from "react"

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: {
          sitekey: string
          callback: (token: string) => void
          "expired-callback"?: () => void
          "error-callback"?: () => void
          "unsupported-callback"?: () => void
          theme?: "light" | "dark" | "auto"
          appearance?: "always" | "execute" | "interaction-only"
          retry?: "auto" | "never"
          "refresh-expired"?: "auto" | "manual" | "never"
        }
      ) => string
      reset: (widgetId?: string) => void
      remove: (widgetId?: string) => void
    }
  }
}

const SCRIPT_ID = "cf-turnstile-script"
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"

export type TurnstileStatus = "idle" | "ready" | "solved" | "expired" | "error"

type Props = {
  onToken: (token: string | null) => void
  onStatus?: (status: TurnstileStatus) => void
  theme?: "light" | "dark" | "auto"
  /** Careers apply uses `always` so a challenge is visible. */
  appearance?: "always" | "execute" | "interaction-only"
  className?: string
}

export function TurnstileWidget({
  onToken,
  onStatus,
  theme = "dark",
  appearance = "interaction-only",
  className,
}: Props) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() || ""
  const hostRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const onTokenRef = useRef(onToken)
  const onStatusRef = useRef(onStatus)
  onTokenRef.current = onToken
  onStatusRef.current = onStatus

  useEffect(() => {
    if (!siteKey || !hostRef.current) return

    let cancelled = false

    const setStatus = (status: TurnstileStatus) => {
      onStatusRef.current?.(status)
    }

    const mount = () => {
      if (cancelled || !hostRef.current || !window.turnstile) return
      if (widgetIdRef.current) {
        try {
          window.turnstile.remove(widgetIdRef.current)
        } catch {
          /* ignore */
        }
        widgetIdRef.current = null
      }
      setStatus("ready")
      widgetIdRef.current = window.turnstile.render(hostRef.current, {
        sitekey: siteKey,
        theme,
        appearance,
        retry: "auto",
        "refresh-expired": "auto",
        callback: (token) => {
          onTokenRef.current(token)
          setStatus("solved")
        },
        "expired-callback": () => {
          onTokenRef.current(null)
          setStatus("expired")
        },
        "error-callback": () => {
          onTokenRef.current(null)
          setStatus("error")
        },
        "unsupported-callback": () => {
          onTokenRef.current(null)
          setStatus("error")
        },
      })
    }

    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null
    if (window.turnstile) {
      mount()
    } else if (existing) {
      existing.addEventListener("load", mount)
      existing.addEventListener("error", () => setStatus("error"))
    } else {
      const s = document.createElement("script")
      s.id = SCRIPT_ID
      s.src = SCRIPT_SRC
      s.async = true
      s.onload = mount
      s.onerror = () => setStatus("error")
      document.head.appendChild(s)
    }

    return () => {
      cancelled = true
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current)
        } catch {
          /* ignore */
        }
        widgetIdRef.current = null
      }
    }
  }, [siteKey, theme, appearance])

  if (!siteKey) return null

  return <div ref={hostRef} className={className} />
}

export function isTurnstileSiteKeyPresent(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim())
}
