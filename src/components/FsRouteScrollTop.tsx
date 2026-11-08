"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { forceDocumentScrollTop } from "@/lib/lenisBridge"

/**
 * Soft client navigations (footer / in-page links) must land at the top of the new route.
 * `history.scrollRestoration = "manual"` + mobile soft-nav otherwise often resumes mid-page
 * past the hero. Homepage hero pinning stays in FsHomeHeroScrollGuard.
 */
export function FsRouteScrollTop() {
  const pathname = usePathname()
  const prevPathRef = useRef<string | null>(null)

  useEffect(() => {
    const path = pathname.replace(/\/$/, "") || "/"
    const prev = prevPathRef.current
    prevPathRef.current = path

    // First mount: hard loads are handled by layout script + home guard
    if (prev === null) return
    if (prev === path) return

    // Intentional hash targets (e.g. /contact#quote) - leave alone
    const hash = window.location.hash.replace(/^#/, "").trim()
    if (hash) return

    // Search flash may own scroll for capability anchors
    try {
      if (sessionStorage.getItem("apx-fs-search-flash-id")) return
    } catch {
      /* ignore */
    }

    let userMoved = false
    const markUser = () => {
      userMoved = true
    }

    const pin = () => {
      if (userMoved) return
      forceDocumentScrollTop()
    }

    forceDocumentScrollTop()

    window.addEventListener("wheel", markUser, { passive: true, once: true })
    window.addEventListener("touchmove", markUser, { passive: true, once: true })
    window.addEventListener("keydown", markUser, { once: true })

    const timers = [0, 16, 50, 100, 200, 400, 700].map((ms) =>
      window.setTimeout(() => {
        if (!userMoved) pin()
      }, ms)
    )

    return () => {
      window.removeEventListener("wheel", markUser)
      window.removeEventListener("touchmove", markUser)
      window.removeEventListener("keydown", markUser)
      timers.forEach((id) => window.clearTimeout(id))
    }
  }, [pathname])

  return null
}
