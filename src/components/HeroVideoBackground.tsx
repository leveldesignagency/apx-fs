"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { HERO_BG_GRADIENT_BOTTOM, HERO_BG_GRADIENT_LEFT } from "@/lib/heroBackgroundGradients"

/**
 * Homepage hero background — scrolls with the page (inside #hero), not fixed to the viewport.
 * Image fades out once scrolled past hero so it does not show through below.
 */
export default function HeroVideoBackground() {
  const [heroVisible, setHeroVisible] = useState(true)

  useEffect(() => {
    const heroHeight = window.innerHeight
    const threshold = heroHeight * 0.85

    const onScroll = () => {
      setHeroVisible(window.scrollY < threshold)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-white" />
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{ opacity: heroVisible ? 1 : 0 }}
      >
        {/* Side/bottom bleed for grow; top flush so photo aligns to screen top */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="fs-hero-bg-motion-layer absolute top-0 bottom-[-2%] left-[-2%] right-[-2%]">
            <div className="relative h-full w-full">
              <Image
                src="/hero-image.jpg"
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none" style={{ background: HERO_BG_GRADIENT_LEFT }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: HERO_BG_GRADIENT_BOTTOM }} />
        <div
          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
          style={{
            backgroundImage: [
              "radial-gradient(circle at 0 0, rgba(255,255,255,0.28) 0.8px, transparent 1px)",
              "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.42) 0.9px, transparent 1.2px)",
            ].join(", "),
            backgroundSize: "3px 3px, 4px 4px",
            backgroundPosition: "0 0, 1px 1px",
          }}
        />
      </div>
    </div>
  )
}
