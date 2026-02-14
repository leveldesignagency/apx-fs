"use client"

import { useEffect, useRef, useState } from "react"

interface CountUpProps {
  /** Target number to count to (e.g. 500, 99, 20) */
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

  useEffect(() => {
    if (!startInView) {
      setHasStarted(true)
      return
    }

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setHasStarted(true)
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [startInView])

  useEffect(() => {
    if (!hasStarted) return

    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // easeOutQuart for a smooth slowdown at the end
      const eased = 1 - (1 - progress) ** 4
      const value = Math.round(eased * target)
      setCount(value)
      if (progress < 1) requestAnimationFrame(tick)
    }

    const id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [hasStarted, target, duration])

  return (
    <span ref={ref} className={className}>
      {count}
      {suffix}
    </span>
  )
}
