"use client"

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
} from "react"
import { cn } from "@/lib/utils"

type LineRevealProps = {
  text: string
  as?: ElementType
  className?: string
  staggerMs?: number
  delayMs?: number
  active?: boolean
  /** Desktop-only line split; below md shows plain text. Default true. */
  desktopOnly?: boolean
}

type LineBox = { top: number; text: string }

/**
 * Visual line-by-line fade-up for paragraphs (measures wrapped lines).
 * Falls back to plain text on mobile (when desktopOnly) / reduced motion.
 */
export function LineReveal({
  text,
  as: Tag = "p",
  className,
  staggerMs = 70,
  delayMs = 0,
  active: activeProp,
  desktopOnly = true,
}: LineRevealProps) {
  const wrapRef = useRef<HTMLElement>(null)
  const measureRef = useRef<HTMLSpanElement>(null)
  const [lines, setLines] = useState<string[] | null>(null)
  const [inView, setInView] = useState(false)
  const [desktop, setDesktop] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const controlled = activeProp !== undefined
  const active = controlled ? Boolean(activeProp) : inView

  useEffect(() => {
    const mqDesktop = window.matchMedia("(min-width: 768px)")
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => {
      setDesktop(mqDesktop.matches)
      setReduceMotion(mqReduce.matches)
    }
    sync()
    mqDesktop.addEventListener("change", sync)
    mqReduce.addEventListener("change", sync)
    return () => {
      mqDesktop.removeEventListener("change", sync)
      mqReduce.removeEventListener("change", sync)
    }
  }, [])

  const measure = useCallback(() => {
    const measureEl = measureRef.current
    if (!measureEl) return
    const words = text.trim().split(/\s+/).filter(Boolean)
    if (!words.length) {
      setLines([text])
      return
    }
    measureEl.replaceChildren()
    const wordSpans: HTMLSpanElement[] = []
    words.forEach((word, i) => {
      if (i > 0) measureEl.appendChild(document.createTextNode(" "))
      const span = document.createElement("span")
      span.textContent = word
      measureEl.appendChild(span)
      wordSpans.push(span)
    })

    const buckets = new Map<number, string[]>()
    wordSpans.forEach((span) => {
      const top = Math.round(span.offsetTop)
      const list = buckets.get(top) ?? []
      list.push(span.textContent ?? "")
      buckets.set(top, list)
    })
    const ordered: LineBox[] = [...buckets.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([top, ws]) => ({ top, text: ws.join(" ") }))
    setLines(ordered.map((l) => l.text))
  }, [text])

  useLayoutEffect(() => {
    if (reduceMotion || (desktopOnly && !desktop)) {
      setLines(null)
      return
    }
    measure()
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver(() => measure())
    ro.observe(el)
    return () => ro.disconnect()
  }, [measure, reduceMotion, desktopOnly, desktop])

  useEffect(() => {
    if (controlled || reduceMotion) {
      if (reduceMotion) setInView(true)
      return
    }
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [controlled, reduceMotion])

  const useLines = !reduceMotion && (!desktopOnly || desktop) && lines && lines.length > 0

  return (
    <Tag ref={wrapRef as never} className={cn("line-reveal", className)} aria-label={text}>
      {/* Hidden measurer mirrors typography via inheritance */}
      <span
        ref={measureRef}
        className="line-reveal__measure pointer-events-none absolute left-0 top-0 w-full opacity-0"
        aria-hidden
      />
      {useLines ? (
        lines.map((line, i) => (
          <span key={`${i}-${line.slice(0, 12)}`} className="line-reveal__line-wrap block overflow-hidden">
            <span
              className={cn("line-reveal__line block", active && "line-reveal__line--in")}
              style={{ "--line-delay": `${delayMs + i * staggerMs}ms` } as CSSProperties}
              aria-hidden
            >
              {line}
            </span>
          </span>
        ))
      ) : (
        <span aria-hidden={false}>{text}</span>
      )}
    </Tag>
  )
}
