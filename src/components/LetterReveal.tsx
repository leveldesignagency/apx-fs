"use client"

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react"
import { cn } from "@/lib/utils"

type LetterRevealProps = {
  text: string
  as?: ElementType
  className?: string
  /** Stagger between letters (ms). */
  staggerMs?: number
  /** Extra delay before the first letter (ms). */
  delayMs?: number
  /** Controlled active state; defaults to scroll-into-view. */
  active?: boolean
  /** Desktop-only letter split; below md shows plain text. Default true. */
  desktopOnly?: boolean
  children?: ReactNode
}

/**
 * Letter-by-letter fade-in for titles. Keeps full text for a11y via aria-label.
 * On reduced motion / mobile (when desktopOnly), renders plain text.
 */
export function LetterReveal({
  text,
  as: Tag = "span",
  className,
  staggerMs = 22,
  delayMs = 0,
  active: activeProp,
  desktopOnly = true,
  children,
}: LetterRevealProps) {
  const ref = useRef<HTMLElement>(null)
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

  useEffect(() => {
    if (controlled || reduceMotion) {
      if (reduceMotion) setInView(true)
      return
    }
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [controlled, reduceMotion])

  const useLetters = !reduceMotion && (!desktopOnly || desktop)
  const lines = text.split("\n")

  return (
    <Tag
      ref={ref as never}
      className={cn("letter-reveal", useLetters && "letter-reveal--split", className)}
      aria-label={text.replace(/\n/g, " ")}
    >
      {useLetters
        ? lines.map((line, lineIndex) => {
            const charsBefore = lines.slice(0, lineIndex).reduce((n, l) => n + l.length + 1, 0)
            return (
              <span key={`line-${lineIndex}`} className="letter-reveal__line block">
                {Array.from(line).map((ch, i) => (
                  <span
                    key={`${lineIndex}-${i}-${ch}`}
                    className={cn("letter-reveal__char", active && "letter-reveal__char--in")}
                    style={
                      {
                        "--letter-delay": `${delayMs + (charsBefore + i) * staggerMs}ms`,
                      } as CSSProperties
                    }
                    aria-hidden
                  >
                    {ch === " " ? "\u00A0" : ch}
                  </span>
                ))}
              </span>
            )
          })
        : children ??
          text.split("\n").map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
    </Tag>
  )
}
