"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { forceDocumentScrollTop } from "@/lib/lenisBridge"

/**
 * Keep `/` pinned to the hero on load / logo return.
 * Browser + Next scroll restoration otherwise often restores mid-page (#services).
 * Stops fighting once the user scrolls or touches.
 */
export function FsHomeHeroScrollGuard() {
  const pathname = usePathname()

  useEffect(() => {
    const path = pathname.replace(/\/$/, "") || "/"
    if (path !== "/") return

    // Intentional in-page anchors (quote form, etc.) - leave alone
    const hash = window.location.hash.replace(/^#/, "")
    if (hash && hash !== "hero" && hash !== "services") return

    // Strip leftover #services so native hash scroll / SearchAnchorFlash cannot jump
    if (hash === "services" || hash === "hero") {
      try {
        window.history.replaceState(
          null,
          "",
          `${window.location.pathname}${window.location.search}`
        )
      } catch {
        /* ignore */
      }
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

    const onPageShow = (e: PageTransitionEvent) => {
      if (userMoved) return
      // bfcache restore often re-applies old scrollY
      if (e.persisted || path === "/") pin()
    }

    window.addEventListener("pageshow", onPageShow)
    window.addEventListener("wheel", markUser, { passive: true, once: true })
    window.addEventListener("touchmove", markUser, { passive: true, once: true })
    window.addEventListener("keydown", markUser, { once: true })

    const timers = [0, 16, 50, 100, 200, 400, 700, 1200, 2000].map((ms) =>
      window.setTimeout(() => {
        if (!userMoved) pin()
      }, ms)
    )

    let frames = 0
    let raf = 0
    const tick = () => {
      frames += 1
      if (!userMoved) pin()
      if (frames < 90 && !userMoved) {
        raf = requestAnimationFrame(tick)
      }
    }
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("pageshow", onPageShow)
      window.removeEventListener("wheel", markUser)
      window.removeEventListener("touchmove", markUser)
      window.removeEventListener("keydown", markUser)
      timers.forEach((id) => window.clearTimeout(id))
      cancelAnimationFrame(raf)
    }
  }, [pathname])

  return null
}
