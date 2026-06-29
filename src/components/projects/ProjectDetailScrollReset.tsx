"use client"

import { useLayoutEffect } from "react"
import { usePathname } from "next/navigation"

/** Jump to top instantly when switching between /projects/[slug] routes (no smooth scroll). */
export function ProjectDetailScrollReset() {
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
