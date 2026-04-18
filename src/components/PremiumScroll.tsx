"use client"

import { ReactLenis } from "lenis/react"
import { useEffect, useState } from "react"

/** Inertial smooth scroll (Lenis). Skipped when `prefers-reduced-motion: reduce`. */
const lenisOptions = {
  lerp: 0.088,
  wheelMultiplier: 0.86,
  touchMultiplier: 1.05,
  smoothWheel: true,
  autoRaf: true,
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
      {children}
    </ReactLenis>
  )
}
