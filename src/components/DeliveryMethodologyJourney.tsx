"use client"

import { LetterReveal } from "@/components/LetterReveal"
import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { DELIVERY_METHODOLOGY_STEPS } from "@/data/deliveryMethodology"

type Step = (typeof DELIVERY_METHODOLOGY_STEPS)[number]

type Props = {
  steps: readonly Step[]
}

type Phase = "idle" | "exiting" | "entering"

/** Short labels for nav (same pattern as homepage services). */
const STEP_SHORT_LABELS = [
  "Survey",
  "Design",
  "Planning",
  "Installation",
  "Commissioning",
  "Handover",
] as const

/** Title fades first, then copy + items, keep in sync with globals exit delays */
const MS_OUT = 140
/** Enter overlaps digit tick: slide-from-top + stagger (≥ last delay + duration) */
const MS_IN = 180

function stepAnchorId(index: number) {
  return `dm-step-${index + 1}`
}

function RollingPair({
  value,
  tickPulse,
}: {
  value: number
  tickPulse: number
}) {
  const s = String(value).padStart(2, "0")
  const a = s[0] ?? "0"
  const b = s[1] ?? "0"

  return (
    <span
      className="inline-flex items-baseline gap-[0.06em] tabular-nums"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="dm-journey-digit relative inline-flex h-[1em] min-w-[0.55em] overflow-hidden align-top">
        <span
          key={`${a}-${tickPulse}`}
          className="dm-journey-digit-inner font-title font-bold leading-none !normal-case"
          style={{ textTransform: "none" }}
        >
          {a}
        </span>
      </span>
      <span className="dm-journey-digit relative inline-flex h-[1em] min-w-[0.55em] overflow-hidden align-top">
        <span
          key={`${b}-${tickPulse}`}
          className="dm-journey-digit-inner font-title font-bold leading-none !normal-case"
          style={{ textTransform: "none" }}
        >
          {b}
        </span>
      </span>
    </span>
  )
}

function JourneyNav({
  steps,
  index,
  onJump,
  onDelta,
}: {
  steps: readonly Step[]
  index: number
  onJump: (i: number) => void
  onDelta: (d: number) => void
}) {
  return (
    <div className="hidden shrink-0 flex-col items-end gap-3 sm:gap-4 md:flex">
      <div
        className="flex flex-wrap items-center gap-2"
        role="tablist"
        aria-label="Jump to step"
      >
        {steps.map((s, i) => (
          <button
            key={`${i}-${s.title}`}
            type="button"
            role="tab"
            aria-selected={i === index}
            onClick={() => onJump(i)}
            className={cn(
              "h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
              i === index ? "w-8 bg-white" : "w-2 bg-white/25 hover:bg-white/40"
            )}
            aria-label={`Go to ${s.title}`}
          />
        ))}
      </div>

      <div className="flex items-center gap-4 md:gap-5">
        <button
          type="button"
          onClick={() => onDelta(-1)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white bg-black text-white transition-colors hover:bg-white hover:text-black md:h-12 md:w-12"
          aria-label="Previous step"
        >
          <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2} />
        </button>
        <button
          type="button"
          onClick={() => onDelta(1)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white bg-black text-white transition-colors hover:bg-white hover:text-black md:h-12 md:w-12"
          aria-label="Next step"
        >
          <ChevronRight className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2} />
        </button>
      </div>
    </div>
  )
}

function StageCopy({
  step,
  phase,
}: {
  step: Step
  phase: Phase
}) {
  return (
    <div data-phase={phase} className="dm-journey-content w-full min-w-0">
      <LetterReveal
        as="h2"
        text={step.title}
        desktopOnly={false}
        className="font-title text-[1.5rem] font-semibold leading-[1.1] tracking-tight text-white !normal-case sm:text-[1.75rem] md:text-[clamp(2rem,3.6vw,3.5rem)]"
      />
      <div className="mt-4 space-y-3.5 text-[0.95rem] leading-relaxed text-white/78 sm:mt-5 sm:space-y-4 sm:text-base md:mt-6 md:text-[clamp(1rem,1.9vw,1.125rem)] md:leading-[1.65]">
        {step.paragraphs.map((paragraph) => (
          <p key={paragraph} className="dm-journey-copy">
            {paragraph}
          </p>
        ))}
      </div>
      <p className="dm-journey-key-label mt-6 text-sm font-medium tracking-wide text-white/55 md:mt-8">
        Key Activities
      </p>
      <ul className="mt-3 space-y-2.5 text-[0.95rem] leading-relaxed text-white/82 sm:space-y-3 sm:text-base md:mt-4 md:space-y-3.5 md:text-[clamp(1rem,2vw,1.125rem)] md:leading-[1.6]">
        {step.items.map((line) => (
          <li
            key={line}
            className="dm-journey-item relative border-b border-white/10 pb-2.5 pl-1 last:border-0 last:pb-0 sm:pb-3 md:pb-3.5"
          >
            {line}
          </li>
        ))}
      </ul>
    </div>
  )
}

function scrollWindowToStep(index: number) {
  const el = document.getElementById(stepAnchorId(index))
  if (!el) return
  // scroll-mt on each stage handles header offset; IntoView follows the real scrollport
  el.scrollIntoView({ behavior: "smooth", block: "start" })
  try {
    window.history.replaceState(null, "", `#${stepAnchorId(index)}`)
  } catch {
    /* ignore */
  }
}

/** Mobile: fixed right rail of step anchors; click scrolls that stage into view. */
function MobileStepFab({
  steps,
  activeIndex,
  onJump,
}: {
  steps: readonly Step[]
  activeIndex: number
  onJump: (index: number) => void
}) {
  return (
    <nav
      className="dm-mobile-step-fab md:hidden"
      aria-label="Jump to methodology stage"
    >
      {steps.map((step, i) => {
        const active = i === activeIndex
        const short = STEP_SHORT_LABELS[i] ?? step.title
        return (
          <button
            key={step.title}
            type="button"
            onClick={() => onJump(i)}
            className={cn(
              "dm-mobile-step-fab__btn",
              active && "dm-mobile-step-fab__btn--active"
            )}
            aria-current={active ? "true" : undefined}
            aria-label={`Go to stage ${i + 1}: ${short}`}
          >
            <span className="dm-mobile-step-fab__num">{String(i + 1).padStart(2, "0")}</span>
          </button>
        )
      })}
    </nav>
  )
}

export function DeliveryMethodologyJourney({ steps }: Props) {
  const n = steps.length
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>("idle")
  const [tickPulse, setTickPulse] = useState(0)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [mobileActive, setMobileActive] = useState(0)
  const busyRef = useRef(false)
  const timersRef = useRef<number[]>([])
  const targetRef = useRef(0)

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => clearTimeout(id))
    timersRef.current = []
  }, [])

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setReduceMotion(mq.matches)
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [])

  useEffect(() => () => clearTimers(), [clearTimers])

  // Mobile scroll-spy: which stacked stage is in view
  useEffect(() => {
    const nodes = steps
      .map((_, i) => document.getElementById(stepAnchorId(i)))
      .filter((el): el is HTMLElement => Boolean(el))
    if (!nodes.length) return

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        const top = visible[0]
        if (!top?.target) return
        const id = top.target.id
        const match = /^dm-step-(\d+)$/.exec(id)
        if (!match) return
        setMobileActive(Number(match[1]) - 1)
      },
      { rootMargin: "-28% 0px -48% 0px", threshold: [0.15, 0.35, 0.55] }
    )
    nodes.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [steps])

  // Honour deep link on load (mobile stacked anchors)
  useEffect(() => {
    if (typeof window === "undefined") return
    const hash = window.location.hash.replace(/^#/, "")
    const match = /^dm-step-(\d+)$/.exec(hash)
    if (!match) return
    const idx = Number(match[1]) - 1
    if (idx < 0 || idx >= steps.length) return
    const t = window.setTimeout(() => {
      setMobileActive(idx)
      scrollWindowToStep(idx)
    }, 80)
    return () => window.clearTimeout(t)
  }, [steps.length])

  const jumpMobileStep = useCallback((i: number) => {
    setMobileActive(i)
    scrollWindowToStep(i)
  }, [])

  const step = steps[index]!

  useEffect(() => {
    return () => {
      busyRef.current = false
    }
  }, [])

  const runNavigate = useCallback(
    (nextIndex: number) => {
      if (nextIndex === targetRef.current && busyRef.current) return
      if (nextIndex === index && !busyRef.current) return

      targetRef.current = nextIndex

      if (reduceMotion) {
        clearTimers()
        busyRef.current = false
        setPhase("idle")
        setIndex(nextIndex)
        setTickPulse((p) => p + 1)
        return
      }

      clearTimers()
      busyRef.current = true
      setPhase("exiting")

      const t1 = window.setTimeout(() => {
        setIndex(nextIndex)
        setTickPulse((p) => p + 1)
        setPhase("entering")
        const t2 = window.setTimeout(() => {
          setPhase("idle")
          busyRef.current = false
        }, MS_IN)
        timersRef.current.push(t2)
      }, MS_OUT)
      timersRef.current.push(t1)
    },
    [clearTimers, index, reduceMotion]
  )

  const goDelta = useCallback(
    (d: number) => {
      const from = busyRef.current ? targetRef.current : index
      runNavigate((from + d + n) % n)
    },
    [index, n, runNavigate]
  )

  return (
    <div className="dm-process-journey relative">
      <section className="page-title-band px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[min(100%,92rem)]">
          <div className="flex flex-col gap-8 sm:gap-10 md:flex-row md:items-end md:justify-between md:gap-12">
            <div className="min-w-0 max-w-5xl">
              <span className="section-label mb-3 block text-white/75">Delivery methodology</span>
              <LetterReveal
                as="h1"
                text={"Clear Stages from\nSurvey to Support"}
                desktopOnly={false}
                className="text-left font-title text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
              />
              <p className="mt-3 max-w-4xl text-left text-base font-normal leading-snug text-white/75 sm:mt-4 sm:text-lg md:text-xl">
                Six stages we follow on Fire and Security projects, so you can see how survey, design, installation,
                commissioning and handover fit together.
              </p>
            </div>

            <JourneyNav steps={steps} index={index} onJump={runNavigate} onDelta={goDelta} />
          </div>
        </div>
      </section>

      {/* Mobile: full stacked stages + right FAB */}
      <div className="relative mx-auto w-full max-w-[min(100%,92rem)] px-4 pr-[calc(var(--site-gutter)+2.75rem+0.75rem)] sm:px-6 md:hidden">
        <ol className="dm-mobile-stack m-0 list-none space-y-0 p-0">
          {steps.map((s, i) => {
            const short = STEP_SHORT_LABELS[i] ?? s.title
            return (
              <li
                key={s.title}
                id={stepAnchorId(i)}
                className="dm-mobile-stack__step scroll-mt-3 border-t border-white/12 py-10 first:border-t-0 first:pt-2"
              >
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
                  Stage {String(i + 1).padStart(2, "0")} · {short}
                </p>
                <StageCopy step={s} phase="idle" />
              </li>
            )
          })}
        </ol>
      </div>

      <MobileStepFab steps={steps} activeIndex={mobileActive} onJump={jumpMobileStep} />

      {/* Desktop: single-step journey with transitions */}
      <div className="relative mx-auto hidden w-full max-w-[min(100%,92rem)] px-4 sm:px-6 md:block lg:px-8">
        <div
          className="mx-auto mb-5 hidden h-px max-w-md bg-gradient-to-r from-transparent via-white/30 to-transparent md:mb-8 md:block md:max-w-lg"
          aria-hidden
        />

        <section aria-label="Delivery methodology steps">
          <div className="flex w-full flex-row items-start gap-0 md:gap-14 lg:gap-16 xl:gap-20">
            <div className="relative z-10 hidden w-[4.5rem] shrink-0 flex-col items-start sm:w-[5.5rem] md:flex md:w-[min(7rem,11vw)] lg:w-[min(8rem,9vw)]">
              <div
                className="font-title text-[clamp(4.5rem,12vw,8.5rem)] font-bold leading-[0.82] tracking-tight text-white/[0.14] transition-opacity duration-300 !normal-case lg:text-[clamp(5rem,10vw,9rem)]"
                style={{
                  opacity: phase === "exiting" ? 0.55 : 1,
                  textTransform: "none",
                }}
              >
                <RollingPair value={index + 1} tickPulse={tickPulse} />
              </div>
              <span className="sr-only">
                Stage {index + 1} of {n}
              </span>
            </div>

            <div className="relative min-w-0 flex-1 md:border-l md:border-white/[0.08] md:pl-10 lg:pl-12">
              <div key={index} className="max-w-5xl xl:max-w-6xl">
                <StageCopy step={step} phase={phase} />
              </div>
            </div>
          </div>
        </section>

        <div
          className="mx-auto mt-8 hidden h-px max-w-md bg-gradient-to-r from-transparent via-white/22 to-transparent md:mt-12 md:block"
          aria-hidden
        />
      </div>

      <KeyboardNav
        onLeft={() => goDelta(-1)}
        onRight={() => goDelta(1)}
        enabled={phase === "idle"}
      />
    </div>
  )
}

function KeyboardNav({
  onLeft,
  onRight,
  enabled,
}: {
  onLeft: () => void
  onRight: () => void
  enabled: boolean
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!enabled) return
      // Only drive desktop carousel with keys when the md journey is in use
      if (window.matchMedia("(max-width: 767px)").matches) return
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        onLeft()
      }
      if (e.key === "ArrowRight") {
        e.preventDefault()
        onRight()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [enabled, onLeft, onRight])
  return null
}
