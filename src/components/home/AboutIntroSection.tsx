"use client"

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react"
import { CustomPillButton } from "@/components/ui/CustomPillButton"

const DEFAULT_BODY_LINES = [
  "APX Fire and Security is a specialist provider of fire and security system installation, commissioning, and maintenance.",
  "We support M&E contractors, facility management teams, architects, consultants, and main contractors across commercial, industrial, and public-sector environments.",
  "Our engineers are fully trained across all disciplines, ensuring every project is delivered with precision, professionalism, and full compliance with relevant British Standards.",
] as const

export type AboutIntroSectionProps = {
  /** Defaults to FS homepage copy */
  bodyLines?: readonly string[]
}

const STAGGER_MS = 95

const ABOUT_INTRO_BACKGROUND_IMAGE = "/beautiful-city-evening.jpg"

function Line({
  children,
  index,
  active,
  className,
  as,
  style,
}: {
  children: ReactNode
  index: number
  active: boolean
  className?: string
  as?: ElementType
  style?: CSSProperties
}) {
  const Tag = as ?? "div"
  return (
    <Tag
      className={`about-intro-line ${active ? "about-intro-line--visible" : "about-intro-line--hidden"} ${className ?? ""}`}
      style={
        {
          ...style,
          "--about-intro-delay": `${index * STAGGER_MS}ms`,
        } as CSSProperties
      }
    >
      {children}
    </Tag>
  )
}

export function AboutIntroSection({ bodyLines = DEFAULT_BODY_LINES }: AboutIntroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduceMotion(mq.matches)
    const onChange = () => setReduceMotion(mq.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    if (reduceMotion) {
      setActive(true)
      return
    }
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActive(true)
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [reduceMotion])

  const on = active

  return (
    <section
      ref={sectionRef}
      id="about-intro"
      className="relative isolate overflow-hidden bg-black py-20 lg:py-28"
      aria-label="Our story"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat brightness-[0.72] saturate-[0.9]"
        style={{ backgroundImage: `url("${ABOUT_INTRO_BACKGROUND_IMAGE}")` }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-black/68" aria-hidden />
      <div className="container relative z-10 mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Line
            index={0}
            active={on}
            className="section-label mb-5 block text-sm tracking-[0.2em] text-white/80 sm:mb-6 sm:text-base"
            style={{ fontFamily: "var(--font-menu), sans-serif" }}
          >
            OUR STORY
          </Line>

          <Line
            index={1}
            active={on}
            as="h2"
            className="home-section-title font-title font-bold text-white"
          >
            Built on experience. Driven by standards.
          </Line>

          <div className="mx-auto mt-8 max-w-2xl space-y-4 text-left text-base leading-relaxed text-white/90 sm:text-center sm:text-lg md:text-xl">
            {bodyLines.map((line, i) => (
              <Line key={line} index={2 + i} active={on} as="p" className="block">
                {line}
              </Line>
            ))}
          </div>

          <Line
            index={2 + bodyLines.length}
            active={on}
            className="mt-10 flex justify-center"
          >
            <CustomPillButton href="/about" size="md">
              Our story
            </CustomPillButton>
          </Line>
        </div>
      </div>
    </section>
  )
}
