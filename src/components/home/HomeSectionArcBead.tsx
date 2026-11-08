"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const ARC_COUNT = 12
const ENTER_STAGGER_MS = 85
const LOOP_STAGGER_MS = 70
const LOOP_HOLD_FULL_MS = 520
const LOOP_HOLD_EMPTY_MS = 180

type Phase = "idle" | "entering" | "looping"

/**
 * Concentric-arc bead under Trusted & Reviewed.
 * 12 lines: max arc / thin at top -> flat / thick at bottom.
 * Scrolls in top-to-bottom, then loops fade-out top-to-bottom and reveal bottom-to-top.
 */
export function HomeSectionArcBead() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState<Phase>("idle")
  const [lit, setLit] = useState<boolean[]>(() => Array.from({ length: ARC_COUNT }, () => false))
  const timersRef = useRef<number[]>([])
  const loopGenRef = useRef(0)

  const clearTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id))
    timersRef.current = []
  }

  const schedule = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms)
    timersRef.current.push(id)
    return id
  }

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLit(Array.from({ length: ARC_COUNT }, () => true))
      setPhase("looping")
      return
    }

    let started = false
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || started) return
        started = true
        io.disconnect()
        setPhase("entering")
        for (let i = 0; i < ARC_COUNT; i++) {
          schedule(() => {
            setLit((prev) => {
              const next = [...prev]
              next[i] = true
              return next
            })
            if (i === ARC_COUNT - 1) {
              schedule(() => setPhase("looping"), 220)
            }
          }, i * ENTER_STAGGER_MS)
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -8% 0px" }
    )
    io.observe(el)

    return () => {
      io.disconnect()
      clearTimers()
      loopGenRef.current += 1
    }
  }, [])

  useEffect(() => {
    if (phase !== "looping") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const gen = ++loopGenRef.current
    let cancelled = false

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        schedule(() => resolve(), ms)
      })

    const run = async () => {
      while (!cancelled && loopGenRef.current === gen) {
        await wait(LOOP_HOLD_FULL_MS)
        if (cancelled || loopGenRef.current !== gen) return

        // Fade out: top -> bottom
        for (let i = 0; i < ARC_COUNT; i++) {
          if (cancelled || loopGenRef.current !== gen) return
          setLit((prev) => {
            const next = [...prev]
            next[i] = false
            return next
          })
          await wait(LOOP_STAGGER_MS)
        }

        await wait(LOOP_HOLD_EMPTY_MS)
        if (cancelled || loopGenRef.current !== gen) return

        // Reveal: bottom -> top
        for (let i = ARC_COUNT - 1; i >= 0; i--) {
          if (cancelled || loopGenRef.current !== gen) return
          setLit((prev) => {
            const next = [...prev]
            next[i] = true
            return next
          })
          await wait(LOOP_STAGGER_MS)
        }
      }
    }

    void run()

    return () => {
      cancelled = true
      loopGenRef.current += 1
      clearTimers()
    }
  }, [phase])

  return (
    <div
      ref={rootRef}
      className={cn(
        "home-section-bead home-section-bead--arcs",
        phase !== "idle" && "home-section-bead--arcs-active"
      )}
      aria-hidden
    >
      <svg
        className="home-section-bead__svg"
        viewBox="0 0 1440 360"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {Array.from({ length: ARC_COUNT }, (_, i) => {
          const t = i / (ARC_COUNT - 1) // 0 top -> 1 bottom
          const arc = 1 - t // 100% arc at top -> 0% (flat 180deg) at bottom
          const swMin = 0.5
          const swMax = 6.4
          const sw = swMin + t * (swMax - swMin)
          const gap = 32
          const maxDip = 268
          const topY = 4
          const edgeY = topY + i * gap
          const midY = edgeY + arc * maxDip
          const d = `M0 ${edgeY.toFixed(2)} Q 720 ${midY.toFixed(2)} 1440 ${edgeY.toFixed(2)}`
          return (
            <path
              key={i}
              d={d}
              fill="none"
              stroke="#000"
              strokeWidth={sw}
              strokeLinecap="butt"
              className={cn(
                "home-section-bead__arc",
                lit[i] ? "home-section-bead__arc--on" : "home-section-bead__arc--off"
              )}
            />
          )
        })}
      </svg>
    </div>
  )
}
