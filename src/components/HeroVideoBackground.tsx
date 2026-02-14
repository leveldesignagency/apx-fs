"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { usePathname } from "next/navigation"

/**
 * Fixed hero background image (FS site). No fade on scroll – image stays fixed.
 * Image is flipped horizontally and fills edge to edge. Rendered via portal into body.
 * Portal only runs after mount to avoid hydration mismatch (server has no document.body).
 */
export default function HeroVideoBackground() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (pathname !== "/") return null
  if (!mounted || typeof document === "undefined") return null

  const layer = (
    <>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0, backgroundColor: "#ffffff" }}
        aria-hidden
      />
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
        aria-hidden
      >
        {/* Flipped horizontally */}
        <img
          src="/male-electrician-overalls-focused-work-switchboard-with-fuses-using-tablet.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover origin-center"
          style={{ transform: "scaleX(-1)" }}
          fetchPriority="high"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to right, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.5) 25%, rgba(255,255,255,0.15) 50%, transparent 72%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent 0%, transparent 50%, rgba(0,0,0,0.35) 75%, rgba(0,0,0,0.92) 100%)",
          }}
        />
      </div>
    </>
  )

  return createPortal(layer, document.body)
}
