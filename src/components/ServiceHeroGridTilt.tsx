"use client"

import Image from "next/image"
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react"
import { Reveal } from "@/components/Reveal"
import { FsCctvHeroNav } from "@/components/FsCctvHeroNav"
import { FsServiceHeroQuickNav } from "@/components/FsServiceHeroQuickNav"
import {
  SERVICE_HERO_BG_GRADIENT_BOTTOM,
  SERVICE_HERO_BG_GRADIENT_LEFT,
  SERVICE_HERO_IMAGE_FILTERS,
  SERVICE_HERO_WASH,
} from "@/lib/heroBackgroundGradients"
import { toTitleCase } from "@/lib/titleCase"
import { cn } from "@/lib/utils"

type GridFill = {
  id: number
  row: number
  col: number
  cols: number
  /** Resting opacity - always below 1 */
  opacity: number
  /** Drawn opacity (blink / fade may differ) */
  drawOpacity: number
  hideOnMobile?: boolean
}

const FILL_COUNT = 10
const OPACITY_MIN = 0.035
const OPACITY_MAX = 0.15
const GRID_ROWS = 10
const GRID_COLS = 12

type ServiceHeroGridTiltProps = {
  title: string
  summary?: string
  imageSrc: string
  imageAlt?: string
  imageClassName?: string
  heroCompliance?: readonly string[]
  /** Deterministic seed for light-square positions (defaults to title). */
  fillSeed?: string
  /** Small line under the H1 */
  titleDetail?: string
  /** Optional row under the title (e.g. fire / CCTV subpage pills) */
  afterSummary?: ReactNode
  /** Extra block under the title/summary row (e.g. About heritage copy) */
  body?: ReactNode
  /** Extra class on the section (e.g. about layout) */
  className?: string
  /**
   * `quick-links` - other services at bottom (default).
   * `cctv-tabs` - CCTV subpage pills.
   * `false` - no bottom nav (About, etc).
   */
  heroNav?: "quick-links" | "cctv-tabs" | false
  /**
   * Skip tilt inset/scale so object-cover framing stays sharp (About hero).
   */
  lockMedia?: boolean
}

/** Subtle parallax / tilt - keep small so it feels premium, not gimmicky */
const MAX_TILT_DEG = 2.25
const MAX_SHIFT_PX = 10
const BASE_SCALE = 1.06

function hashSeed(input: string): number {
  let h = 2166136261
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function randomOpacity(rand: () => number) {
  return OPACITY_MIN + rand() * (OPACITY_MAX - OPACITY_MIN)
}

function occupiedKeys(fills: GridFill[]) {
  const set = new Set<string>()
  for (const f of fills) {
    for (let c = 0; c < f.cols; c++) set.add(`${f.row}:${f.col + c}`)
  }
  return set
}

function pickFreeCell(
  rand: () => number,
  fills: GridFill[],
  excludeId?: number
): { row: number; col: number; cols: number } | null {
  const others = excludeId == null ? fills : fills.filter((f) => f.id !== excludeId)
  const taken = occupiedKeys(others)
  const wantWide = rand() > 0.72
  const span = wantWide ? 2 : 1
  for (let attempt = 0; attempt < 40; attempt++) {
    const row = Math.floor(rand() * GRID_ROWS)
    const col = Math.floor(rand() * (GRID_COLS - span + 1))
    let ok = true
    for (let c = 0; c < span; c++) {
      if (taken.has(`${row}:${col + c}`)) {
        ok = false
        break
      }
    }
    if (ok) return { row, col, cols: span }
  }
  return null
}

/** Seeded starting squares - then live loop randomizes blink / fade / relocate. */
function buildGridFills(seed: string): GridFill[] {
  const rand = mulberry32(hashSeed(seed))
  const fills: GridFill[] = []
  for (let i = 0; i < FILL_COUNT; i++) {
    const spot = pickFreeCell(rand, fills)
    if (!spot) break
    const opacity = randomOpacity(rand)
    fills.push({
      id: i + 1,
      row: spot.row,
      col: spot.col,
      cols: spot.cols,
      opacity,
      drawOpacity: opacity,
      hideOnMobile: spot.cols > 1 || i >= 6,
    })
  }
  return fills
}

/**
 * Full-bleed ~80vh service / about hero: large grid overlay, title left / summary right,
 * subtle mouse-tracked image motion, seeded light squares per page.
 */
export function ServiceHeroGridTilt({
  title,
  summary,
  imageSrc,
  imageAlt = "",
  imageClassName,
  heroCompliance,
  fillSeed,
  titleDetail,
  afterSummary,
  body,
  className,
  heroNav = "quick-links",
  lockMedia = false,
}: ServiceHeroGridTiltProps) {
  const stageRef = useRef<HTMLElement>(null)
  const frameRef = useRef(0)
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const mediaScale = lockMedia ? 1 : BASE_SCALE
  const [heroReveal, setHeroReveal] = useState(false)
  const [tiltStyle, setTiltStyle] = useState<CSSProperties>(() =>
    lockMedia
      ? { transform: "none" }
      : {
          transform: `perspective(1600px) rotateX(0deg) rotateY(0deg) scale(${BASE_SCALE}) translate3d(0,0,0)`,
        }
  )

  const seedKey = fillSeed ?? title
  const [fills, setFills] = useState<GridFill[]>(() => buildGridFills(seedKey))
  const fillsRef = useRef(fills)
  fillsRef.current = fills
  const nextIdRef = useRef(FILL_COUNT + 1)

  useEffect(() => {
    setFills(buildGridFills(seedKey))
    nextIdRef.current = FILL_COUNT + 1
  }, [seedKey])

  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setHeroReveal(true)
      return
    }
    const id = requestAnimationFrame(() => setHeroReveal(true))
    return () => cancelAnimationFrame(id)
  }, [])

  // Nuanced randomize: blink, opacity drift, fade-out + relocate
  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let cancelled = false
    let timer = 0
    const timers: number[] = []
    const rand = () => Math.random()

    const schedule = () => {
      if (cancelled) return
      // Snappier cadence - often fire two actions close together
      const wait = 280 + rand() * 520
      timer = window.setTimeout(tickEvent, wait)
    }

    const applyAction = () => {
      const current = fillsRef.current
      if (!current.length) return

      const roll = rand()
      const idx = Math.floor(rand() * current.length)
      const target = current[idx]!

      if (roll < 0.4) {
        // Quick blink / flash - never reaches full white
        const peak = Math.min(OPACITY_MAX + 0.04, target.opacity * (1.6 + rand() * 0.9))
        setFills((prev) =>
          prev.map((f) => (f.id === target.id ? { ...f, drawOpacity: peak } : f))
        )
        const back = window.setTimeout(() => {
          if (cancelled) return
          setFills((prev) =>
            prev.map((f) =>
              f.id === target.id ? { ...f, drawOpacity: f.opacity } : f
            )
          )
        }, 70 + rand() * 140)
        timers.push(back)
      } else if (roll < 0.62) {
        // Soft opacity retarget while staying put
        const nextOp = randomOpacity(rand)
        setFills((prev) =>
          prev.map((f) =>
            f.id === target.id
              ? { ...f, opacity: nextOp, drawOpacity: nextOp }
              : f
          )
        )
      } else {
        // Fade out, then reappear elsewhere
        setFills((prev) =>
          prev.map((f) => (f.id === target.id ? { ...f, drawOpacity: 0 } : f))
        )
        const relocate = window.setTimeout(() => {
          if (cancelled) return
          setFills((prev) => {
            const spot = pickFreeCell(rand, prev, target.id)
            if (!spot) {
              return prev.map((f) =>
                f.id === target.id ? { ...f, drawOpacity: f.opacity } : f
              )
            }
            const opacity = randomOpacity(rand)
            const newId = nextIdRef.current++
            return prev.map((f) =>
              f.id === target.id
                ? {
                    id: newId,
                    row: spot.row,
                    col: spot.col,
                    cols: spot.cols,
                    opacity,
                    drawOpacity: opacity,
                    hideOnMobile: spot.cols > 1 || rand() > 0.55,
                  }
                : f
            )
          })
        }, 220 + rand() * 260)
        timers.push(relocate)
      }
    }

    const tickEvent = () => {
      if (cancelled) return
      applyAction()
      // Often nudge a second square in the same beat
      if (rand() > 0.35) applyAction()
      schedule()
    }

    schedule()
    return () => {
      cancelled = true
      window.clearTimeout(timer)
      timers.forEach((t) => window.clearTimeout(t))
    }
  }, [seedKey])

  const tick = useCallback(() => {
    const cur = currentRef.current
    const tgt = targetRef.current
    cur.x += (tgt.x - cur.x) * 0.08
    cur.y += (tgt.y - cur.y) * 0.08

    const rotateY = cur.x * MAX_TILT_DEG
    const rotateX = -cur.y * MAX_TILT_DEG
    const tx = cur.x * MAX_SHIFT_PX
    const ty = cur.y * MAX_SHIFT_PX

    setTiltStyle({
      transform: `perspective(1600px) rotateX(${rotateX.toFixed(3)}deg) rotateY(${rotateY.toFixed(3)}deg) scale(${mediaScale}) translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`,
    })

    if (Math.abs(tgt.x - cur.x) > 0.0008 || Math.abs(tgt.y - cur.y) > 0.0008) {
      frameRef.current = requestAnimationFrame(tick)
    } else {
      frameRef.current = 0
    }
  }, [mediaScale])

  const queueTick = useCallback(() => {
    if (frameRef.current) return
    frameRef.current = requestAnimationFrame(tick)
  }, [tick])

  useEffect(() => {
    if (lockMedia) {
      setTiltStyle({ transform: "none" })
      return
    }
    const el = stageRef.current
    if (!el || typeof window === "undefined") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      if (rect.width < 1 || rect.height < 1) return
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1
      targetRef.current = {
        x: Math.max(-1, Math.min(1, nx)),
        y: Math.max(-1, Math.min(1, ny)),
      }
      queueTick()
    }

    const onLeave = () => {
      targetRef.current = { x: 0, y: 0 }
      queueTick()
    }

    el.addEventListener("pointermove", onMove, { passive: true })
    el.addEventListener("pointerleave", onLeave)
    return () => {
      el.removeEventListener("pointermove", onMove)
      el.removeEventListener("pointerleave", onLeave)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [lockMedia, queueTick])

  const showNav = heroNav === "quick-links" || heroNav === "cctv-tabs"

  return (
    <section
      ref={stageRef}
      className={cn("service-hero-grid", className)}
      aria-label="Introduction"
    >
      <div className="service-hero-grid__media-layer" aria-hidden={!imageAlt}>
        <div className="service-hero-grid__tilt" style={tiltStyle}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            quality={lockMedia ? 95 : 90}
            sizes="100vw"
            className={cn(
              "object-cover object-center",
              SERVICE_HERO_IMAGE_FILTERS,
              imageClassName
            )}
          />
        </div>
        <div className="pointer-events-none absolute inset-0" style={{ background: SERVICE_HERO_BG_GRADIENT_LEFT }} />
        <div className="pointer-events-none absolute inset-0" style={{ background: SERVICE_HERO_BG_GRADIENT_BOTTOM }} />
        <div className="pointer-events-none absolute inset-0" style={{ backgroundColor: SERVICE_HERO_WASH }} />
      </div>

      <div className="service-hero-grid__canvas" aria-hidden>
        <div className="service-hero-grid__lines" />
        {fills.map((fill) => (
          <div
            key={fill.id}
            className={cn(
              "service-hero-grid__fill",
              fill.hideOnMobile && "service-hero-grid__fill--wide"
            )}
            style={{
              top: `calc(var(--grid-cell) * ${fill.row})`,
              left: `calc(var(--grid-cell) * ${fill.col})`,
              width: `calc(var(--grid-cell) * ${fill.cols})`,
              background: `rgba(255, 255, 255, ${fill.drawOpacity})`,
            }}
          />
        ))}
      </div>

      <div className="service-hero-grid__inner site-container">
        <div className="service-hero-grid__content">
          <div className="service-hero-grid__copy">
            <Reveal show={heroReveal} delayMs={0}>
              <h1 className="service-hero-grid__title font-title font-bold text-white">
                {toTitleCase(title)}
              </h1>
              {titleDetail ? (
                <p className="service-hero-grid__title-detail">{titleDetail}</p>
              ) : null}
            </Reveal>
            {afterSummary ? (
              <Reveal show={heroReveal} delayMs={90} className="service-hero-grid__after-summary">
                {afterSummary}
              </Reveal>
            ) : null}
          </div>

          {summary?.trim() ? (
            <div className="service-hero-grid__aside">
              <Reveal show={heroReveal} delayMs={110}>
                <p className="service-hero-grid__summary">{summary}</p>
              </Reveal>
            </div>
          ) : null}
        </div>

        {body ? <div className="service-hero-grid__body">{body}</div> : null}

        {(heroCompliance?.length || showNav) ? (
          <div className="service-hero-grid__footer">
            {heroCompliance?.length ? (
              <Reveal show={heroReveal} delayMs={200} className="service-hero-grid__compliance-wrap">
                <p className="service-hero-grid__compliance">{heroCompliance.join(" | ")}</p>
              </Reveal>
            ) : null}
            {showNav ? (
              <Reveal show={heroReveal} delayMs={240} className="service-hero-grid__nav">
                {heroNav === "cctv-tabs" ? <FsCctvHeroNav /> : <FsServiceHeroQuickNav />}
              </Reveal>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  )
}
