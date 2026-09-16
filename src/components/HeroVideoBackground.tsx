"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Homepage hero background — scrolls with the page (inside #hero), not fixed to the viewport.
 * Fades out once scrolled past hero so it does not show through below.
 */
export default function HeroVideoBackground() {
  const [heroVisible, setHeroVisible] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

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

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const syncPlayback = () => {
      if (mq.matches || !heroVisible) {
        video.pause()
        return
      }
      void video.play().catch(() => {})
    }

    syncPlayback()
    mq.addEventListener("change", syncPlayback)
    return () => mq.removeEventListener("change", syncPlayback)
  }, [heroVisible])

  return (
    <div className="absolute inset-0 z-0 min-h-[100dvh] pointer-events-none overflow-hidden" aria-hidden>
      <div className="absolute inset-0 min-h-[100dvh] bg-black" />
      <div
        className="absolute inset-0 min-h-[100dvh] transition-opacity duration-300"
        style={{ opacity: heroVisible ? 1 : 0 }}
      >
        <div className="absolute inset-0 min-h-[100dvh] overflow-hidden">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full min-h-[100dvh] w-full object-cover object-center brightness-[0.88] contrast-[1.02] saturate-[0.98]"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/apx-fs-hero-image.jpg"
          >
            <source src="/londonbynight.mp4" type="video/mp4" />
          </video>
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
