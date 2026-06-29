"use client"

import { ReactLenis } from "lenis/react"
import { useEffect, useState } from "react"
import { LenisBridge } from "@/components/LenisBridge"

/** Inertial smooth scroll (Lenis). Skipped when `prefers-reduced-motion: reduce`. */
const lenisOptions = {
  lerp: 0.15,
  wheelMultiplier: 1.08,
  touchMultiplier: 1.15,
  smoothWheel: true,
  autoRaf: true,
  allowNestedScroll: true,
  prevent: (node: Element) => {
    if (!(node instanceof HTMLElement)) return false
    if (node.hasAttribute("data-lenis-prevent")) return true
    if (node.classList.contains("quote-form-dropdown-menu")) return true
    return false
  },
} as const

export function PremiumScroll({ children }: { children: React.ReactNode }) {
  const [useSmooth, setUseSmooth] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    setUseSmooth(true)
  }, [])

  if (!useSmooth) return <>{children}</>

  return (
    <ReactLenis root options={lenisOptions}>
      <LenisBridge />
      {children}
    </ReactLenis>
  )
}
