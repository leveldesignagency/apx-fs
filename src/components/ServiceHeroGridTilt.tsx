"use client"

import Image from "next/image"
import {
  useCallback,
  useEffect,
  useMemo,
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
  row: number
  col: number
  cols: number
  opacity: number
  hideOnMobile?: boolean
}

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

/** Build 3 light squares snapped to the grid; layout stable per seed. */
function buildGridFills(seed: string): GridFill[] {
  const rand = mulberry32(hashSeed(seed))
  const pick = (min: number, max: number) => Math.floor(rand() * (max - min + 1)) + min
  const occupied = new Set<string>()
  const mark = (row: number, col: number, cols: number) => {
    for (let c = 0; c < cols; c++) occupied.add(`${row}:${col + c}`)
  }
  const free = (row: number, col: number, cols: number) => {
    for (let c = 0; c < cols; c++) {
      if (occupied.has(`${row}:${col + c}`)) return false
    }
    return true
  }

  const fills: GridFill[] = []
  const opacities = [0.06, 0.1, 0.04]

  // Pair of adjacent 1x1 cells
  const pairRow = pick(1, 4)
  const pairCol = pick(0, 8)
  fills.push({ row: pairRow, col: pairCol, cols: 1, opacity: opacities[0] })
  mark(pairRow, pairCol, 1)
  const pairDir = rand() > 0.5 ? 1 : -1
  const pairCol2 = Math.max(0, Math.min(11, pairCol + pairDir))
  if (free(pairRow, pairCol2, 1) && pairCol2 !== pairCol) {
    fills.push({ row: pairRow, col: pairCol2, cols: 1, opacity: opacities[1] })
    mark(pairRow, pairCol2, 1)
  } else if (free(pairRow, pairCol + 1, 1)) {
    fills.push({ row: pairRow, col: pairCol + 1, cols: 1, opacity: opacities[1] })
    mark(pairRow, pairCol + 1, 1)
  } else {
    fills.push({ row: pairRow + 1, col: pairCol, cols: 1, opacity: opacities[1] })
    mark(pairRow + 1, pairCol, 1)
  }

  // Wider accent square elsewhere
  for (let attempt = 0; attempt < 24; attempt++) {
    const row = pick(4, 8)
    const col = pick(4, 10)
    if (!free(row, col, 2)) continue
    fills.push({ row, col, cols: 2, opacity: opacities[2], hideOnMobile: true })
    mark(row, col, 2)
    break
  }

  if (fills.length < 3) {
    fills.push({ row: 6, col: 9, cols: 2, opacity: opacities[2], hideOnMobile: true })
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
}: ServiceHeroGridTiltProps) {
  const stageRef = useRef<HTMLElement>(null)
  const frameRef = useRef(0)
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const [heroReveal, setHeroReveal] = useState(false)
  const [tiltStyle, setTiltStyle] = useState<CSSProperties>({
    transform: `perspective(1600px) rotateX(0deg) rotateY(0deg) scale(${BASE_SCALE}) translate3d(0,0,0)`,
  })

  const fills = useMemo(() => buildGridFills(fillSeed ?? title), [fillSeed, title])

  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setHeroReveal(true)
      return
    }
    const id = requestAnimationFrame(() => setHeroReveal(true))
    return () => cancelAnimationFrame(id)
  }, [])

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
      transform: `perspective(1600px) rotateX(${rotateX.toFixed(3)}deg) rotateY(${rotateY.toFixed(3)}deg) scale(${BASE_SCALE}) translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`,
    })

    if (Math.abs(tgt.x - cur.x) > 0.0008 || Math.abs(tgt.y - cur.y) > 0.0008) {
      frameRef.current = requestAnimationFrame(tick)
    } else {
      frameRef.current = 0
    }
  }, [])

  const queueTick = useCallback(() => {
    if (frameRef.current) return
    frameRef.current = requestAnimationFrame(tick)
  }, [tick])

  useEffect(() => {
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
  }, [queueTick])

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
        {fills.map((fill, i) => (
          <div
            key={`${fill.row}-${fill.col}-${i}`}
            className={cn(
              "service-hero-grid__fill",
              fill.hideOnMobile && "service-hero-grid__fill--wide"
            )}
            style={{
              top: `calc(var(--grid-cell) * ${fill.row})`,
              left: `calc(var(--grid-cell) * ${fill.col})`,
              width: `calc(var(--grid-cell) * ${fill.cols})`,
              background: `rgba(255, 255, 255, ${fill.opacity})`,
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
