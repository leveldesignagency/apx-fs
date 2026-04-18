"use client"

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"

const BORDER_PATH =
  "M 8 0 H 100 V 92 A 8 8 0 0 1 92 100 H 0 V 8 A 8 8 0 0 1 8 0 Z"

const DRAW_MS = 1150
export const HOME_QUOTE_FORM_INNER_DELAY_MS = Math.round(DRAW_MS * 0.78)

const FALLBACK_DASH_LEN = 380

type HomeQuoteFormDrawShellProps = {
  active: boolean
  children: ReactNode
}

/** SVG stroke “drawn” border + delayed inner fade — measured dash length for cross-browser animation. */
export function HomeQuoteFormDrawShell({ active, children }: HomeQuoteFormDrawShellProps) {
  const pathRef = useRef<SVGPathElement | null>(null)
  const [dashLen, setDashLen] = useState(FALLBACK_DASH_LEN)
  const [reduceMotion, setReduceMotion] = useState(false)

  useLayoutEffect(() => {
    const el = pathRef.current
    if (!el) return
    try {
      const L = el.getTotalLength()
      if (Number.isFinite(L) && L > 0) {
        setDashLen(L)
      }
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduceMotion(mq.matches)
    const onChange = () => setReduceMotion(mq.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  const shellStyle = {
    ["--quote-path-len"]: String(dashLen),
  } as CSSProperties

  const strokeClass = reduceMotion
    ? "home-quote-form-stroke home-quote-form-stroke--done"
    : active
      ? "home-quote-form-stroke home-quote-form-stroke--run"
      : "home-quote-form-stroke"

  return (
    <div className="quote-form-draw-shell relative" style={shellStyle}>
      <svg
        className="pointer-events-none absolute inset-0 z-[2] h-full w-full overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        {/* Stroke in user units (~hairline). Avoid vectorEffect + non-uniform scale — breaks dashed stroke. */}
        <path
          ref={pathRef}
          d={BORDER_PATH}
          fill="none"
          stroke="#ffffff"
          strokeWidth={0.14}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={strokeClass}
        />
      </svg>
      <div
        className={`quote-form-draw-shell__inner relative z-[1] ${
          reduceMotion ? (active ? "opacity-100" : "opacity-0") : active ? "quote-form-draw-shell__inner--fade" : "quote-form-draw-shell__inner--off opacity-0"
        }`}
        style={
          reduceMotion
            ? undefined
            : ({ ["--quote-inner-delay"]: `${HOME_QUOTE_FORM_INNER_DELAY_MS}ms` } as CSSProperties)
        }
      >
        {children}
      </div>
    </div>
  )
}
