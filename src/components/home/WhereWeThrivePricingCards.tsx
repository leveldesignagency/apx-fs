"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"
import type { LucideIcon } from "lucide-react"
import { CustomPillButton } from "@/components/ui/CustomPillButton"

export type ThriveCard = {
  title: string
  href: string
  Icon: LucideIcon
  bullets: string[]
}

function parseBullet(line: string): { main: string; qualifier?: string } {
  const match = line.match(/^(.+?)\s+\(([^)]+)\)\s*$/)
  if (!match) return { main: line }
  return { main: match[1]!.trim(), qualifier: match[2]!.trim() }
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

/** Soft 0..1 fade for item at index within a staggered sequence driven by progress. */
function staggerOpacity(progress: number, index: number, count: number, soft = 0.35) {
  if (count <= 0) return 1
  const start = index / count
  const span = Math.max(soft / count, 0.08)
  return clamp((progress - start) / span, 0, 1)
}

type Props = {
  cards: readonly ThriveCard[]
}

/**
 * Three equal cards start stacked, then pull apart on scroll (desktop).
 * Mobile: simple stacked cards, full content, no letter scrub.
 * Hover blur is desktop-only (pointer: fine).
 */
export function WhereWeThrivePricingCards({ cards }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [spread, setSpread] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)
  const [canHover, setCanHover] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const hoverMq = window.matchMedia("(hover: hover) and (pointer: fine)")
    const mobileMq = window.matchMedia("(max-width: 899.98px)")
    const syncHover = () => setCanHover(hoverMq.matches)
    const syncMobile = () => setIsMobile(mobileMq.matches)
    syncHover()
    syncMobile()
    hoverMq.addEventListener("change", syncHover)
    mobileMq.addEventListener("change", syncMobile)
    return () => {
      hoverMq.removeEventListener("change", syncHover)
      mobileMq.removeEventListener("change", syncMobile)
    }
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      setSpread(1)
      return
    }

    let raf = 0
    const update = () => {
      raf = 0
      if (window.matchMedia("(max-width: 899.98px)").matches) {
        // Mobile: no scrubbed letter animation - always fully shown
        setSpread(1)
        return
      }
      const rect = track.getBoundingClientRect()
      const vh = window.innerHeight || 1
      const start = vh * 0.95
      const end = vh * 0.28
      const raw = (start - rect.top) / (start - end)
      setSpread(clamp(raw, 0, 1))
    }

    const onScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    return () => {
      if (raf) window.cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  const ordered =
    cards.length === 3 ? ([cards[0], cards[1], cards[2]] as const) : cards

  // Content choreography after cards begin to separate (desktop)
  const contentProgress = isMobile ? 1 : clamp((spread - 0.12) / 0.55, 0, 1)
  const titleProgress = isMobile ? 1 : clamp(contentProgress / 0.42, 0, 1)
  const listProgress = isMobile ? 1 : clamp((contentProgress - 0.38) / 0.48, 0, 1)
  const ctaProgress = isMobile ? 1 : clamp((contentProgress - 0.82) / 0.18, 0, 1)

  return (
    <div ref={trackRef} className="where-we-thrive-pricing">
      <div className="where-we-thrive-pricing__sticky">
        <div
          className="where-we-thrive-pricing__deck"
          style={
            {
              ["--spread" as string]: String(isMobile ? 1 : spread),
            } as CSSProperties
          }
          onMouseLeave={() => {
            if (canHover) setHovered(null)
          }}
        >
          {ordered.map((card, index) => {
            const CapIcon = card.Icon
            const role = index === 1 ? "center" : index === 0 ? "left" : "right"
            const isHovered = canHover && hovered === index
            const somethingHovered = canHover && hovered !== null
            const titleChars = Array.from(card.title)

            return (
              <article
                key={card.title}
                className={`where-we-thrive-pricing__card where-we-thrive-pricing__card--${role}${
                  isHovered ? " is-hovered" : ""
                }${somethingHovered && !isHovered ? " is-dimmed" : ""}`}
                onMouseEnter={() => {
                  if (canHover) setHovered(index)
                }}
              >
                <span className="where-we-thrive-pricing__icon" aria-hidden>
                  <CapIcon className="h-10 w-10 text-white sm:h-11 sm:w-11" strokeWidth={1.35} />
                </span>

                <div className="where-we-thrive-pricing__body">
                  <h3
                    className="where-we-thrive-pricing__title"
                    style={{ fontFamily: "var(--font-menu), sans-serif" }}
                    aria-label={card.title}
                  >
                    {isMobile
                      ? card.title
                      : titleChars.map((ch, i) => (
                          <span
                            key={`${card.title}-${i}`}
                            className="where-we-thrive-pricing__letter"
                            style={{
                              opacity: staggerOpacity(titleProgress, i, titleChars.length, 0.55),
                            }}
                            aria-hidden
                          >
                            {ch === " " ? "\u00A0" : ch}
                          </span>
                        ))}
                  </h3>
                  <ul className="apx-site-table apx-capability-list apx-capability-list--two-line-rows where-we-thrive-pricing__list">
                    {card.bullets.map((line, bi) => {
                      const { main, qualifier } = parseBullet(line)
                      const opacity = isMobile
                        ? 1
                        : staggerOpacity(listProgress, bi, card.bullets.length, 0.7)
                      return (
                        <li
                          key={line}
                          className="apx-capability-list__item where-we-thrive-pricing__item"
                          style={
                            isMobile
                              ? undefined
                              : {
                                  opacity,
                                  transform: `translate3d(0, ${((1 - opacity) * 0.55).toFixed(3)}rem, 0)`,
                                }
                          }
                        >
                          <span className="where-we-thrive-bullet">
                            <span className="where-we-thrive-bullet__main">{main}</span>
                            {qualifier ? (
                              <span className="where-we-thrive-bullet__qualifier">({qualifier})</span>
                            ) : null}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                  <div
                    className="where-we-thrive-pricing__cta"
                    style={
                      isMobile
                        ? undefined
                        : {
                            opacity: ctaProgress,
                            transform: `translate3d(0, ${((1 - ctaProgress) * 0.4).toFixed(3)}rem, 0)`,
                          }
                    }
                  >
                    <CustomPillButton
                      href={card.href}
                      size="sm"
                      className="pill-btn--corners-sm text-xs font-semibold uppercase tracking-normal [&_span.pill-text]:!font-semibold"
                    >
                      Learn more
                    </CustomPillButton>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}
