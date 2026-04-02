"use client"

import { useEffect, useRef, useState } from "react"
import { CustomPillButton } from "@/components/ui/CustomPillButton"

function clamp01(x: number) {
  return Math.max(0, Math.min(1, x))
}

function smoothstep(t: number) {
  const x = clamp01(t)
  return x * x * (3 - 2 * x)
}

function segment(p: number, a: number, b: number) {
  if (b <= a) return 0
  return clamp01((p - a) / (b - a))
}

export type AboutIntroShutterProps = {
  /**
   * Viewport heights of scroll distance used for the shutter open → split → body reveal.
   * After this portion, animation stays at “complete” while the user keeps scrolling.
   */
  effectScrollVh?: number
  /**
   * Extra viewport height after the sequence finishes — scroll continues smoothly into the next section
   * without the animation feeling “stuck”.
   */
  scrollContinueAfterVh?: number
}

/**
 * FS homepage “Our story”: vertical shutters reveal “WHERE IT BEGAN”, then the line splits, then body copy
 * fades in — scroll-scrubbed inside a sticky stage. Adjacent sections keep normal layout; only this block
 * uses extended min-height for scroll runway.
 */
export function AboutIntroShutter({
  effectScrollVh = 2.0,
  scrollContinueAfterVh = 0.45,
}: AboutIntroShutterProps) {
  const rootRef = useRef<HTMLElement>(null)
  const [anim, setAnim] = useState(0)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setReduceMotion(mq.matches)
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [])

  useEffect(() => {
    const tick = () => {
      const el = rootRef.current
      if (!el) return
      if (reduceMotion) {
        setAnim(1)
        return
      }
      const rect = el.getBoundingClientRect()
      const scrollable = el.offsetHeight - window.innerHeight
      if (scrollable <= 0) {
        setAnim(1)
        return
      }
      const scrolled = Math.max(0, -rect.top)
      const totalVh = effectScrollVh + scrollContinueAfterVh
      const effectPx = scrollable * (effectScrollVh / totalVh)
      const p = effectPx > 0 ? Math.min(1, scrolled / effectPx) : 1
      setAnim(p)
    }

    tick()
    window.addEventListener("scroll", tick, { passive: true })
    window.addEventListener("resize", tick, { passive: true })
    return () => {
      window.removeEventListener("scroll", tick)
      window.removeEventListener("resize", tick)
    }
  }, [reduceMotion, effectScrollVh, scrollContinueAfterVh])

  const p = reduceMotion ? 1 : anim

  const open = smoothstep(segment(p, 0.04, 0.36))
  const labelIn = smoothstep(segment(p, 0.1, 0.3))
  const split = smoothstep(segment(p, 0.38, 0.64))
  const bodyT = smoothstep(segment(p, 0.58, 0.94))

  const leftShutterX = -open * 100
  const rightShutterX = open * 100

  const splitRem = split * 2.75

  const minH = `${(effectScrollVh + scrollContinueAfterVh) * 100}vh`

  return (
    <section
      ref={rootRef}
      id="about-intro"
      className="relative w-full bg-black"
      style={{ minHeight: minH }}
      aria-label="Our story"
    >
      <div className="sticky top-0 z-10 flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 py-16">
        {/* Shutters — meet at centre when closed, slide off L/R when open */}
        <div
          className="pointer-events-none absolute inset-0 z-30 flex"
          aria-hidden
          style={{
            opacity: open < 0.995 ? 1 : 0,
            transition: reduceMotion ? "opacity 0.3s" : undefined,
          }}
        >
          <div
            className="h-full w-1/2 bg-black"
            style={{
              transform: `translate3d(${leftShutterX}%, 0, 0)`,
              willChange: "transform",
            }}
          />
          <div
            className="h-full w-1/2 bg-black"
            style={{
              transform: `translate3d(${rightShutterX}%, 0, 0)`,
              willChange: "transform",
            }}
          />
        </div>

        <div className="relative z-20 flex w-full max-w-3xl flex-col items-center text-center">
          <span
            className="section-label mb-4 block tracking-[0.14em] text-white/80"
            style={{
              opacity: labelIn * 0.85 + 0.15,
              transform: `translateY(${(1 - labelIn) * 12}px)`,
              fontFamily: "var(--font-menu), sans-serif",
            }}
          >
            OUR STORY
          </span>

          <div
            className="mb-10 flex w-full max-w-4xl flex-nowrap items-center justify-center gap-0 font-title font-bold uppercase tracking-tight text-white sm:mb-12"
            style={{ fontFamily: "var(--font-title, inherit)" }}
          >
            <span
              className="inline-block whitespace-nowrap text-[clamp(1.65rem,6vw,3.75rem)] leading-[1.05]"
              style={{ transform: `translate3d(${-splitRem}rem, 0, 0)` }}
            >
              WHERE IT{" "}
            </span>
            <span
              className="inline-block whitespace-nowrap text-[clamp(1.65rem,6vw,3.75rem)] leading-[1.05]"
              style={{ transform: `translate3d(${splitRem}rem, 0, 0)` }}
            >
              BEGAN
            </span>
          </div>

          <div
            className="w-full max-w-2xl space-y-6"
            style={{
              opacity: bodyT,
              transform: `translate3d(0, ${(1 - bodyT) * 32}px, 0) scale(${0.96 + 0.04 * bodyT})`,
              filter: `blur(${(1 - bodyT) * 6}px)`,
              pointerEvents: bodyT > 0.35 ? "auto" : "none",
            }}
          >
            <p className="text-lg leading-relaxed text-white/90 sm:text-xl">
              APX Fire and Security is a specialist provider of fire and security system installation, commissioning, and maintenance. We support M&amp;E contractors,
              facility management teams, architects, consultants, and main contractors across commercial, industrial, and public-sector environments. Our engineers are
              fully trained across all disciplines, ensuring every project is delivered with precision, professionalism, and full compliance with relevant British
              Standards.
            </p>
            <div className="flex justify-center">
              <CustomPillButton href="/about" size="md">
                Our story
              </CustomPillButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
