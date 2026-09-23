"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { DELIVERY_METHODOLOGY_STEPS } from "@/data/deliveryMethodology"

type Step = (typeof DELIVERY_METHODOLOGY_STEPS)[number]

type Props = {
  steps: readonly Step[]
}

type Phase = "idle" | "exiting" | "entering"

/** Short labels for mobile arrow nav (same pattern as homepage services). */
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
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-black text-white transition-colors hover:bg-white hover:text-black md:h-12 md:w-12"
          aria-label="Previous step"
        >
          <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2} />
        </button>
        <button
          type="button"
          onClick={() => onDelta(1)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-black text-white transition-colors hover:bg-white hover:text-black md:h-12 md:w-12"
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
      <h2
        className="font-title text-[1.5rem] font-semibold leading-[1.1] tracking-tight text-white !normal-case sm:text-[1.75rem] md:text-[clamp(2rem,3.6vw,3.5rem)]"
        style={{ textTransform: "none" }}
      >
        {step.title}
      </h2>
      <div className="mt-4 space-y-3.5 text-[0.95rem] leading-relaxed text-white/78 sm:mt-5 sm:space-y-4 sm:text-base md:mt-6 md:text-[clamp(1rem,1.9vw,1.125rem)] md:leading-[1.65]">
        {step.paragraphs.map((paragraph) => (
          <p key={paragraph} className="dm-journey-copy">
            {paragraph}
          </p>
        ))}
      </div>
      <p className="dm-journey-key-label mt-6 text-sm font-medium tracking-wide text-white/55 md:mt-8">
        Key activities
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

export function DeliveryMethodologyJourney({ steps }: Props) {
  const n = steps.length
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>("idle")
  const [tickPulse, setTickPulse] = useState(0)
  const [reduceMotion, setReduceMotion] = useState(false)
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

  const step = steps[index]!
  const shortLabel = STEP_SHORT_LABELS[index] ?? step.title

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
              <h1
                className="text-left text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
                style={{ fontFamily: "var(--font-menu)" }}
              >
                Clear stages from
                <br />
                survey to support
              </h1>
              <p className="mt-3 max-w-4xl text-left text-base font-normal leading-snug text-white/75 sm:mt-4 sm:text-lg md:text-xl">
                Six stages we follow on fire and security projects, so you can see how survey, design, installation,
                commissioning and handover fit together.
              </p>
            </div>

            <JourneyNav steps={steps} index={index} onJump={runNavigate} onDelta={goDelta} />
          </div>
        </div>
      </section>

      <div className="relative mx-auto w-full max-w-[min(100%,92rem)] px-4 sm:px-6 lg:px-8">
        <div
          className="mx-auto mb-5 hidden h-px max-w-md bg-gradient-to-r from-transparent via-white/30 to-transparent md:mb-8 md:block md:max-w-lg"
          aria-hidden
        />

        {/* Mobile: same pattern as homepage services, arrows flanking stage label */}
        <div className="mb-4 flex items-center justify-between gap-3 md:hidden">
          <button
            type="button"
            onClick={() => goDelta(-1)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-white/70 text-white transition-colors hover:border-white hover:bg-white/10"
            aria-label="Previous stage"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2} />
          </button>
          <p
            className="min-w-0 flex-1 text-center text-sm font-semibold uppercase tracking-[0.14em] text-white"
            aria-live="polite"
          >
            {String(index + 1).padStart(2, "0")} · {shortLabel}
          </p>
          <button
            type="button"
            onClick={() => goDelta(1)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-white/70 text-white transition-colors hover:border-white hover:bg-white/10"
            aria-label="Next stage"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>

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

        {/* Mobile pill indicators */}
        <div className="mt-6 flex justify-center gap-2 md:hidden" role="tablist" aria-label="Stage progress">
          {steps.map((s, i) => (
            <button
              key={`pill-${s.title}`}
              type="button"
              role="tab"
              aria-selected={i === index}
              onClick={() => runNavigate(i)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index ? "w-6 bg-white" : "w-1.5 bg-white/35"
              )}
              aria-label={`Go to ${s.title}`}
            />
          ))}
        </div>

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
