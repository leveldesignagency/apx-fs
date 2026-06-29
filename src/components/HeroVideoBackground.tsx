"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

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
    <div className="absolute inset-0 z-0 min-h-[100dvh] pointer-events-none overflow-hidden" aria-hidden>
      <div className="absolute inset-0 min-h-[100dvh] bg-black" />
      <div
        className="absolute inset-0 min-h-[100dvh] transition-opacity duration-300"
        style={{ opacity: heroVisible ? 1 : 0 }}
      >
        {/* Side/bottom bleed for grow; extend below fold so image covers bottom of hero */}
        <div className="absolute inset-0 min-h-[100dvh] overflow-hidden">
          <div className="fs-hero-bg-motion-layer absolute top-0 bottom-[-10%] left-[-2%] right-[-2%] min-h-[110dvh]">
            <div className="relative h-full min-h-[110dvh] w-full">
              <Image
                src="/apx-fs-hero-image.jpg"
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover object-[center_22%] brightness-[0.88] contrast-[1.02] saturate-[0.98]"
              />
            </div>
          </div>
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.18) 16%, transparent 36%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 48%, rgba(0,0,0,0.12) 68%, rgba(0,0,0,0.38) 84%, rgba(0,0,0,0.72) 94%, #000000 100%)",
          }}
        />
      </div>
    </div>
  )
}
