"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

export type RevealProps = {
  children: ReactNode
  className?: string
  /** Delay after visibility triggers (stagger). */
  delayMs?: number
  /**
   * Controlled visibility (e.g. hero on mount). When omitted, fades in once when scrolled into view.
   */
  show?: boolean
}

export function Reveal({ children, className = "", delayMs = 0, show }: RevealProps) {
  const controlled = show !== undefined
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(() => (typeof show === "boolean" ? show : false))

  useEffect(() => {
    if (typeof window === "undefined") return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true)
      return
    }

    if (controlled) {
      setVisible(Boolean(show))
      return
    }

    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0]
        if (e?.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.07 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [controlled, show])

  return (
    <div
      ref={controlled ? undefined : ref}
      className={`about-reveal ${visible ? "about-reveal--visible" : ""} ${className}`.trim()}
      style={{ transitionDelay: visible ? `${delayMs}ms` : "0ms" }}
    >
      {children}
    </div>
  )
}
