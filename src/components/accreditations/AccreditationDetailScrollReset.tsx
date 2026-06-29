"use client"

import { useLayoutEffect } from "react"
import { usePathname } from "next/navigation"

/** Instant jump to top when switching between /accreditations/[slug] routes. */
export function AccreditationDetailScrollReset() {
  const pathname = usePathname()

  useLayoutEffect(() => {
    const html = document.documentElement
    const previous = html.style.scrollBehavior
    html.style.scrollBehavior = "auto"
    window.scrollTo(0, 0)
    html.scrollTop = 0
    document.body.scrollTop = 0
    html.style.scrollBehavior = previous
  }, [pathname])

  return null
}
