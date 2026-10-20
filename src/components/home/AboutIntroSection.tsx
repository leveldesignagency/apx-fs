"use client"

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react"
import { CustomPillButton } from "@/components/ui/CustomPillButton"
import { LetterReveal } from "@/components/LetterReveal"

const DEFAULT_INTRO =
  "Building on a heritage dating back to 1986, APX Fire & Security (formerly Smiths Technical Systems Ltd) designs, installs and maintains bespoke Fire and Security systems for London and the Home Counties. We deliver to NSI Gold standards for both security and fire, with specialist engineers and clear documentation from survey through to ongoing care."

/** Draft pillars, refine with the client as needed */
const ABOUT_STEPS = [
  {
    number: "01",
    title: "Survey & Design",
    body: "Risk-led surveys and NSI Gold system design shaped around how the building is used.",
  },
  {
    number: "02",
    title: "Expert Installation",
    body: "Trained Fire and Security engineers delivering neat, compliant work on commercial and domestic sites.",
  },
  {
    number: "03",
    title: "Standards & Handover",
    body: "British Standards commissioning, certification and documentation ready for audit.",
  },
  {
    number: "04",
    title: "Maintain & Support",
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
      className="about-intro-section relative overflow-visible border-t border-white/40 bg-[var(--page-bg)]"
      aria-label="Our story"
    >
      {/* 1) mask  2) shift down  3) sit above Projects */}
      <div className="about-intro-media relative mx-auto mt-[clamp(1.25rem,3.5vw,2.25rem)] mb-0 w-[90%] overflow-hidden rounded-[1.5rem] sm:rounded-[1.75rem] lg:rounded-[2rem]">
        <div
          className="about-intro-bg pointer-events-none absolute inset-x-0 -top-[8%] h-[116%] bg-cover bg-center bg-no-repeat brightness-[1.12] saturate-[1.02] contrast-[1.04]"
          style={{ backgroundImage: `url("${ABOUT_INTRO_BACKGROUND_IMAGE}")` }}
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 bg-[rgb(10_10_10/0.35)]" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[rgb(10_10_10/0.75)] via-[rgb(10_10_10/0.45)] to-[rgb(10_10_10/0.25)]"
          aria-hidden
        />

        <div className="relative z-10 flex flex-col gap-[clamp(2.25rem,5vw,3.5rem)] px-[clamp(1.75rem,5vw,3.75rem)] py-[clamp(2.25rem,5.5vw,3.75rem)] sm:px-[clamp(2.25rem,5.5vw,4.25rem)] sm:py-[clamp(2.5rem,6vw,4rem)] lg:px-[clamp(2.75rem,5.5vw,4.75rem)] lg:py-[clamp(2.75rem,5.5vw,4.25rem)]">
          {/* Top: title left (two lines), intro right (left-aligned in its box) */}
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
            <div className="min-w-0 lg:col-span-7 xl:col-span-8">
              <Line
                index={0}
                active={on}
                className="section-label mb-4 block text-sm tracking-[0.2em] text-white/75 sm:mb-5 sm:text-base"
                style={{ fontFamily: "var(--font-menu), sans-serif" }}
              >
                OUR STORY
              </Line>
              <h2 className="about-intro-heading font-title font-bold uppercase text-white">
                <LetterReveal
                  as="span"
                  text="Built on Experience."
                  className="about-intro-heading__line block lg:whitespace-nowrap text-white/50"
                  active={on}
                  delayMs={STAGGER_MS}
                  staggerMs={18}
                />
                <LetterReveal
                  as="span"
                  text="Driven by Standards."
                  className="about-intro-heading__line block lg:whitespace-nowrap text-white"
                  active={on}
                  delayMs={STAGGER_MS + 420}
                  staggerMs={18}
                />
              </h2>
            </div>

            <Line
              index={2}
              active={on}
              as="p"
              className="max-w-md text-left text-base leading-relaxed text-white/88 sm:text-lg lg:col-span-5 xl:col-span-4 lg:max-w-[22rem] lg:justify-self-end lg:pt-1 xl:max-w-md"
            >
              {intro}
            </Line>
          </div>

          {/* Bottom: steps, then CTA bottom-right */}
          <div className="flex flex-col gap-8 border-t border-white/35 pt-8 sm:gap-10 sm:pt-9 lg:pt-10">
            <ol className="about-intro-steps m-0 grid list-none grid-cols-1 gap-8 p-0 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-6 xl:gap-x-8">
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
      </div>
    </section>
  )
}
