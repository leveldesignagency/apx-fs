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

/** Title fades first, then items (last item ends ≈0.84s — keep in sync with globals exit delays) */
const MS_OUT = 860
/** Enter overlaps digit tick: slide-from-top + stagger (≥ last delay + duration) */
const MS_IN = 720

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
          className="dm-journey-digit-inner font-title font-bold leading-none"
        >
          {a}
        </span>
      </span>
      <span className="dm-journey-digit relative inline-flex h-[1em] min-w-[0.55em] overflow-hidden align-top">
        <span
          key={`${b}-${tickPulse}`}
          className="dm-journey-digit-inner font-title font-bold leading-none"
        >
          {b}
        </span>
      </span>
    </span>
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

  useEffect(() => {
    return () => {
      busyRef.current = false
    }
  }, [])

  const runNavigate = useCallback(
    (nextIndex: number) => {
      if (busyRef.current || nextIndex === index) return
      if (reduceMotion) {
        setIndex(nextIndex)
        setTickPulse((p) => p + 1)
        return
      }

      busyRef.current = true
      clearTimers()

      const go = () => {
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
      }
      go()
    },
    [clearTimers, index, reduceMotion]
  )

  const goDelta = useCallback(
    (d: number) => {
      const next = (index + d + n) % n
      runNavigate(next)
    },
    [index, n, runNavigate]
  )

  return (
    <section
      className="dm-process-journey relative"
      aria-label="Delivery methodology steps"
    >
      <div
        className="mx-auto mb-4 h-px max-w-md bg-gradient-to-r from-transparent via-white/30 to-transparent md:mb-5 md:max-w-lg"
        aria-hidden
      />

      <div className="relative mx-auto flex w-full flex-col">
        {/* Number left · title + items right — no flex-1 / min-h so nav sits under copy */}
        <div className="flex w-full flex-row items-start gap-8 sm:gap-12 md:gap-16 lg:gap-20 xl:gap-24">
          <div className="relative z-10 flex w-[4.5rem] shrink-0 flex-col items-start sm:w-[5.5rem] md:w-[min(7rem,11vw)] lg:w-[min(8rem,9vw)]">
            <div
              className="font-title text-[clamp(2.75rem,11vw,9rem)] font-bold leading-[0.82] tracking-tight text-white/[0.14] transition-opacity duration-300 sm:text-[clamp(3.25rem,10vw,8rem)] md:text-[clamp(4.5rem,12vw,8.5rem)] lg:text-[clamp(5rem,10vw,9rem)]"
              style={{
                opacity: phase === "exiting" ? 0.55 : 1,
              }}
            >
              <RollingPair value={index + 1} tickPulse={tickPulse} />
            </div>
            <p className="mt-2 max-w-[10rem] text-left text-[0.58rem] font-medium uppercase leading-snug tracking-[0.26em] text-white/35 sm:mt-3 sm:text-[0.65rem] md:mt-4 md:text-xs">
              Step {String(index + 1).padStart(2, "0")} of {String(n).padStart(2, "0")}
            </p>
          </div>

          <div
            className={cn(
              "relative min-h-[min(24vh,18rem)] min-w-0 flex-1 border-l border-white/[0.08] pl-6 sm:min-h-[22rem] sm:pl-8 md:min-h-[24rem] md:pl-10 md:pt-0 lg:pl-12"
            )}
          >
            <div className="relative overflow-hidden">
              <div
                key={index}
                data-phase={phase}
                className="dm-journey-content w-full min-w-0 max-w-none"
              >
                <h2
                  className={cn(
                    "font-title text-[clamp(1.85rem,5vw,3.35rem)] font-semibold leading-[1.08] tracking-tight text-white normal-case md:text-[clamp(2rem,3.6vw,3.5rem)]"
                  )}
                >
                  {step.title}
                </h2>
                <ul className="mt-5 space-y-3.5 text-[clamp(1rem,2.2vw,1.15rem)] leading-relaxed text-white/82 md:mt-6 md:space-y-4 md:leading-[1.65]">
                  {step.items.map((line) => (
                    <li
                      key={line}
                      className="dm-journey-item relative border-b border-white/10 pb-4 pl-1 last:border-0 last:pb-0 md:pb-5"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Dots above arrows — shrink-0 + stable content min-h above keeps this from jumping */}
        <div className="-mt-5 flex shrink-0 flex-col items-center gap-3 sm:-mt-6 md:-mt-8">
          <div
            className="flex flex-wrap justify-center gap-2.5 md:gap-3"
            role="tablist"
            aria-label="Jump to step"
          >
            {steps.map((s, i) => (
              <button
                key={`${i}-${s.title}`}
                type="button"
                role="tab"
                aria-selected={i === index}
                disabled={phase !== "idle"}
                onClick={() => runNavigate(i)}
                className={cn(
                  "h-2.5 w-2.5 rounded-full border border-white/45 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 disabled:opacity-35",
                  i === index ? "bg-white" : "bg-white/15 hover:bg-white/35"
                )}
                aria-label={`Go to ${s.title}`}
              />
            ))}
          </div>

          <div className="flex items-center justify-center gap-6 md:gap-10">
            <button
              type="button"
              onClick={() => goDelta(-1)}
              disabled={phase !== "idle"}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-black text-white transition-colors hover:bg-white hover:text-black disabled:pointer-events-none disabled:opacity-35 md:h-12 md:w-12"
              aria-label="Previous step"
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => goDelta(1)}
              disabled={phase !== "idle"}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-black text-white transition-colors hover:bg-white hover:text-black disabled:pointer-events-none disabled:opacity-35 md:h-12 md:w-12"
              aria-label="Next step"
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      <div
        className="mx-auto mt-5 h-px max-w-md bg-gradient-to-r from-transparent via-white/22 to-transparent md:mt-6"
        aria-hidden
      />

      {/* Keyboard */}
      <KeyboardNav
        onLeft={() => goDelta(-1)}
        onRight={() => goDelta(1)}
        enabled={phase === "idle"}
      />
    </section>
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
