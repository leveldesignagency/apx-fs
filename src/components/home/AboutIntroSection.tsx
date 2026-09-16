"use client"

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react"
import { CustomPillButton } from "@/components/ui/CustomPillButton"

const DEFAULT_INTRO =
  "Since 1986 we have designed, installed and maintained bespoke fire and security systems for London and the Home Counties — NSI Gold standards, specialist engineers, and clear documentation from survey through to ongoing care."

/** Draft pillars — refine with the client as needed */
const ABOUT_STEPS = [
  {
    number: "01",
    title: "Survey & design",
    body: "Risk-led surveys and NSI Gold system design shaped around how the building is used.",
  },
  {
    number: "02",
    title: "Expert installation",
    body: "Trained fire and security engineers delivering neat, compliant work on commercial and domestic sites.",
  },
  {
    number: "03",
    title: "Standards & handover",
    body: "British Standards commissioning, certification and documentation ready for audit.",
  },
  {
    number: "04",
    title: "Maintain & support",
    body: "Planned maintenance and responsive support long after the first handover.",
  },
] as const

export type AboutIntroSectionProps = {
  intro?: string
  steps?: readonly { number: string; title: string; body: string }[]
}

const STAGGER_MS = 90

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

export function AboutIntroSection({ intro = DEFAULT_INTRO, steps = ABOUT_STEPS }: AboutIntroSectionProps) {
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
      { threshold: 0.16, rootMargin: "0px 0px -6% 0px" }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [reduceMotion])

  const on = active
  const stepsStart = 3
  const ctaIndex = stepsStart + steps.length

  return (
    <section
      ref={sectionRef}
      id="about-intro"
      className="about-intro-section relative isolate overflow-hidden border-t-[3px] border-white bg-black"
      aria-label="Our story"
    >
      {/* Photo — slow downward drift */}
      <div
        className="about-intro-bg pointer-events-none absolute inset-x-0 -top-[8%] h-[116%] bg-cover bg-center bg-no-repeat brightness-[1.12] saturate-[1.02] contrast-[1.04]"
        style={{ backgroundImage: `url("${ABOUT_INTRO_BACKGROUND_IMAGE}")` }}
        aria-hidden
      />
      {/* Readability washes — not card chrome */}
      <div className="pointer-events-none absolute inset-0 bg-black/35" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/25"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/80 via-black/35 to-transparent"
        aria-hidden
      />

      <div className="site-container relative z-10 flex min-h-[min(92vh,52rem)] flex-col justify-between gap-16 py-24 sm:gap-20 sm:py-28 lg:min-h-[min(88vh,56rem)] lg:gap-24 lg:py-32">
        {/* Head: title left, intro right */}
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
          <div className="lg:col-span-7 xl:col-span-7">
            <Line
              index={0}
              active={on}
              className="section-label mb-5 block text-sm tracking-[0.2em] text-white/75 sm:mb-6 sm:text-base"
              style={{ fontFamily: "var(--font-menu), sans-serif" }}
            >
              OUR STORY
            </Line>
            <Line index={1} active={on} as="h2" className="about-intro-heading font-title font-bold uppercase text-white">
              <span className="block text-white/50">Built on experience</span>
              <span className="block text-white">Driven by standards.</span>
            </Line>
          </div>

          <div className="flex flex-col items-start lg:col-span-5 xl:col-span-5 lg:pb-1">
            <Line
              index={2}
              active={on}
              as="p"
              className="max-w-md text-base leading-relaxed text-white/88 sm:text-lg lg:max-w-none"
            >
              {intro}
            </Line>
          </div>
        </div>

        {/* Process strip + CTA bottom-right */}
        <div className="flex flex-col gap-10 lg:gap-12">
          <ol className="about-intro-steps m-0 grid list-none grid-cols-1 gap-10 border-t border-white/35 p-0 pt-20 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 sm:pt-24 lg:grid-cols-4 lg:gap-x-6 xl:gap-x-8 lg:pt-28">
            {steps.map((step, i) => (
              <Line key={step.number} index={stepsStart + i} active={on} as="li" className="min-w-0 list-none">
                <article className="about-intro-step flex flex-col">
                  <span
                    className="about-intro-step__num font-title text-2xl font-bold tracking-tight text-white sm:text-[1.75rem]"
                    aria-hidden
                  >
                    {step.number}
                  </span>
                  <span className="mt-3 block h-px w-full bg-white/70" aria-hidden />
                  <h3 className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-white sm:text-[0.8125rem]">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 max-w-[18rem] text-sm leading-relaxed text-white/78 sm:text-[0.9375rem] sm:leading-relaxed lg:max-w-none">
                    {step.body}
                  </p>
                </article>
              </Line>
            ))}
          </ol>

          <Line index={ctaIndex} active={on} className="flex justify-end">
            <CustomPillButton href="/about" size="md">
              Our story
            </CustomPillButton>
          </Line>
        </div>
      </div>
    </section>
  )
}
