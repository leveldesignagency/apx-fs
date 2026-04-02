"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { usePathname } from "next/navigation"
import { HERO_BG_GRADIENT_BOTTOM, HERO_BG_GRADIENT_LEFT } from "@/lib/heroBackgroundGradients"

/**
 * Fixed hero background image (FS site). Image fades out once scrolled past hero so it never shows through below.
 * Rendered via portal into body. Portal only runs after mount to avoid hydration mismatch.
 */
export default function HeroVideoBackground() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [heroVisible, setHeroVisible] = useState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  /** Homepage only — service pages use per-route hero imagery in ServicePageHero */
  const showHeroBackdrop = pathname === "/"

  useEffect(() => {
    if (!showHeroBackdrop || typeof window === "undefined") return
    const heroHeight = window.innerHeight
    const threshold = heroHeight * 0.85

    const onScroll = () => {
      setHeroVisible(window.scrollY < threshold)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [pathname, showHeroBackdrop])

  if (!showHeroBackdrop) return null
  if (!mounted || typeof document === "undefined") return null

  const layer = (
    <>
      {/* Base: white only in hero viewport so image looks correct */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0, backgroundColor: "#ffffff" }}
        aria-hidden
      />
      {/* Black mask: from 100vh down, so rest of page has black behind content; not visible in hero */}
      <div
        className="fixed left-0 right-0 bottom-0 pointer-events-none"
        style={{ zIndex: 2, top: "100vh", backgroundColor: "#000000" }}
        aria-hidden
      />
      {/* Hero image: hidden once scrolled past hero so it never bleeds through */}
      <div
        className="fixed inset-0 pointer-events-none transition-opacity duration-300"
        style={{ zIndex: 1, opacity: heroVisible ? 1 : 0 }}
        aria-hidden
      >
        <div className="absolute inset-0">
          <div className="relative h-full w-full">
          <Image
            src="/male-electrician-overalls-focused-work-switchboard-with-fuses-using-tablet.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover origin-center"
            style={{ transform: "scaleX(-1)" }}
          />
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none" style={{ background: HERO_BG_GRADIENT_LEFT }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: HERO_BG_GRADIENT_BOTTOM }} />
      </div>
    </>
  )

  return createPortal(layer, document.body)
}
