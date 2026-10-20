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
          theme?: "light" | "dark" | "auto"
        }
      ) => string
      reset: (widgetId?: string) => void
      remove: (widgetId?: string) => void
    }
  }
}

const SCRIPT_ID = "cf-turnstile-script"
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"

type Props = {
  onToken: (token: string | null) => void
  theme?: "light" | "dark" | "auto"
  className?: string
}

export function TurnstileWidget({ onToken, theme = "dark", className }: Props) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() || ""
  const hostRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const onTokenRef = useRef(onToken)
  onTokenRef.current = onToken

  useEffect(() => {
    if (!siteKey || !hostRef.current) return

    let cancelled = false

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
      widgetIdRef.current = window.turnstile.render(hostRef.current, {
        sitekey: siteKey,
        theme,
        callback: (token) => onTokenRef.current(token),
        "expired-callback": () => onTokenRef.current(null),
        "error-callback": () => onTokenRef.current(null),
      })
    }

    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null
    if (window.turnstile) {
      mount()
    } else if (existing) {
      existing.addEventListener("load", mount)
    } else {
      const s = document.createElement("script")
      s.id = SCRIPT_ID
      s.src = SCRIPT_SRC
      s.async = true
      s.onload = mount
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
  }, [siteKey, theme])

  if (!siteKey) return null

  return <div ref={hostRef} className={className} />
}

export function isTurnstileSiteKeyPresent(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim())
}
