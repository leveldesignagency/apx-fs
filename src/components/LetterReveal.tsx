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
  id?: string
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
  id,
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
      id={id}
      className={cn("letter-reveal", useLetters && "letter-reveal--split", className)}
      aria-label={text.replace(/\n/g, " ")}
    >
      {useLetters
        ? lines.map((line, lineIndex) => {
            const charsBefore = lines.slice(0, lineIndex).reduce((n, l) => n + l.length + 1, 0)
            // Group into words so inline-block letters wrap between words, not mid-word
            const words = line.split(/(\s+)/)
            let charOffset = 0
            return (
              <span key={`line-${lineIndex}`} className="letter-reveal__line">
                {words.map((word, wi) => {
                  const isSpace = /^\s+$/.test(word)
                  const start = charsBefore + charOffset
                  charOffset += word.length
                  if (isSpace) {
                    return (
                      <span
                        key={`${lineIndex}-sp-${wi}`}
                        className={cn(
                          "letter-reveal__char letter-reveal__char--space",
                          active && "letter-reveal__char--in"
                        )}
                        style={{ "--letter-delay": `${delayMs + start * staggerMs}ms` } as CSSProperties}
                        aria-hidden
                      >
                        {"\u00A0"}
                      </span>
                    )
                  }
                  return (
                    <span key={`${lineIndex}-w-${wi}`} className="letter-reveal__word">
                      {Array.from(word).map((ch, i) => (
                        <span
                          key={`${lineIndex}-${wi}-${i}-${ch}`}
                          className={cn("letter-reveal__char", active && "letter-reveal__char--in")}
                          style={
                            {
                              "--letter-delay": `${delayMs + (start + i) * staggerMs}ms`,
                            } as CSSProperties
                          }
                          aria-hidden
                        >
                          {ch}
                        </span>
                      ))}
                    </span>
                  )
                })}
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
