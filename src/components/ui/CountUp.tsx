"use client"

import { useEffect, useRef, useState } from "react"

interface CountUpProps {
  /** Target number to count to (e.g. 500, 40) */
  target: number
  /** Suffix after the number (e.g. "+", "%") */
  suffix?: string
  /** Duration in ms */
  duration?: number
  /** Start counting when this element is in view */
  startInView?: boolean
  className?: string
}

export function CountUp({
  target,
  suffix = "",
  duration = 2000,
  startInView = true,
  className = "",
}: CountUpProps) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(!startInView)
  const ref = useRef<HTMLSpanElement>(null)
  const fullLabel = `${target}${suffix}`

  useEffect(() => {
    if (!startInView) {
      setHasStarted(true)
      return
    }

    const el = ref.current
    if (!el) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      setCount(target)
      setHasStarted(true)
      return
    }

    let started = false
    const start = () => {
      if (started) return
      started = true
      setHasStarted(true)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) start()
      },
      { threshold: 0.05, rootMargin: "0px 0px -10% 0px" }
    )
    observer.observe(el)

    // Fallback if IO never fires (layout / canted sections)
    const fallback = window.setTimeout(start, 1800)

    return () => {
      observer.disconnect()
      window.clearTimeout(fallback)
    }
  }, [startInView, target])

  useEffect(() => {
    if (!hasStarted) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      setCount(target)
      return
    }

    const startTime = performance.now()
    let raf = 0

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - (1 - progress) ** 4
      setCount(Math.round(eased * target))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [hasStarted, target, duration])

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{fullLabel}</span>
      <span aria-hidden="true">
        {count}
        {suffix}
      </span>
    </span>
  )
}
