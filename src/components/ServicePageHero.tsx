"use client"

import { useEffect, useState, type ReactNode } from "react"
import { Reveal } from "@/components/Reveal"
import { ServiceHeroGridTilt } from "@/components/ServiceHeroGridTilt"
import { toTitleCase } from "@/lib/titleCase"

export type ServicePageHeroProps = {
  title: string
  intro: ReactNode
  /**
   * Short two-line service statement shown in the grid hero summary column.
   * Falls back to a plain-string `intro` when omitted.
   */
  heroSummary?: string
  /** Omit for capability pillars, solid black hero, no photo */
  imageSrc?: string
  imageAlt?: string
  imageClassName?: string
  /**
   * `quick-links`, pill links to other services at bottom of hero (default).
   * `cctv-tabs`, same bottom pill row for CCTV subpages.
   */
  heroNav?: "quick-links" | "cctv-tabs" | false
  /**
   * Pillar / text-only heroes: no 70vh band, keeps title+intro tight to the section below (e.g. capability tables).
   * Use with no `imageSrc` and `heroNav={false}`.
   */
  compact?: boolean
  /** Short standard references, subtle, bottom-right of hero (above quick nav when present) */
  heroCompliance?: readonly string[]
  /** Optional row under the summary (e.g. domestic / commercial pills on CCTV hub) */
  afterIntro?: ReactNode
  /** Small line directly under the H1 (scope, not a second heading) */
  titleDetail?: string
}

function HeroIntro({ children }: { children: ReactNode }) {
  return (
    <div className="service-page-hero__intro w-full text-base font-normal tracking-tight text-left text-white sm:text-lg md:text-xl mb-0 [&_p+p]:mt-4">
      {typeof children === "string" ? <p>{children}</p> : children}
    </div>
  )
}

function summaryFromIntro(intro: ReactNode): string {
  if (typeof intro === "string") return intro
  return ""
}

/**
 * Photo heroes use the shared grid-tilt band. Compact / text-only pillars keep the tight layout.
 */
export function ServicePageHero({
  title,
  intro,
  heroSummary,
  imageSrc,
  imageAlt = "",
  imageClassName,
  heroNav = "quick-links",
  compact = false,
  heroCompliance,
  afterIntro,
  titleDetail,
}: ServicePageHeroProps) {
  const showImage = Boolean(imageSrc)
  const compactLayout = Boolean(compact && !showImage && heroNav === false)
  const [heroReveal, setHeroReveal] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setHeroReveal(true)
      return
    }
    const id = requestAnimationFrame(() => setHeroReveal(true))
    return () => cancelAnimationFrame(id)
  }, [])

  if (showImage && imageSrc) {
    const summary = heroSummary?.trim() || summaryFromIntro(intro)
    return (
      <ServiceHeroGridTilt
        title={title}
        summary={summary}
        imageSrc={imageSrc}
        imageAlt={imageAlt}
        imageClassName={imageClassName}
        heroCompliance={heroCompliance}
        fillSeed={title}
        titleDetail={titleDetail}
        afterSummary={afterIntro}
        heroNav={heroNav}
      />
    )
  }

  return (
    <section
      className={
        compactLayout
          ? "service-page-hero service-page-hero--compact-pillar relative flex min-h-0 flex-col overflow-hidden bg-transparent"
          : "service-page-hero relative flex h-[min(78vh,36rem)] min-h-[26rem] flex-col overflow-hidden bg-transparent sm:h-[70vh] sm:min-h-0"
      }
      style={{ background: "transparent" }}
      aria-label="Introduction"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[var(--page-bg)]" aria-hidden />
      </div>

      <div
        className={
          compactLayout
            ? "service-page-hero__compact-container site-container relative z-20 flex flex-col pb-5 sm:pb-6"
            : "site-container relative z-20 flex h-full min-h-0 flex-1 flex-col pt-36 pb-5 sm:pt-44 sm:pb-10"
        }
      >
        <div
          className={
            compactLayout
              ? "service-page-hero__pillar-stack relative w-full"
              : "relative w-full space-y-4"
          }
        >
          <div className="service-page-hero__copy-block w-full min-w-0 max-w-full md:max-w-[min(52rem,68vw)] lg:max-w-[min(60rem,72vw)]">
            <Reveal show={heroReveal} delayMs={0}>
              <h1 className="service-page-hero__title mb-0 font-title text-3xl font-bold text-left text-white sm:text-4xl md:text-5xl lg:text-6xl">
                {toTitleCase(title)}
              </h1>
              {titleDetail ? (
                <p className="mt-2 text-[0.7rem] font-normal uppercase tracking-[0.16em] text-white/70 sm:mt-3 sm:text-xs md:text-sm">
                  {titleDetail}
                </p>
              ) : null}
            </Reveal>
            <div className="service-page-hero__intro-slot w-full min-w-0">
              <Reveal show={heroReveal} delayMs={90}>
                <HeroIntro>{intro}</HeroIntro>
              </Reveal>
              {afterIntro ? (
                <Reveal show={heroReveal} delayMs={160}>
                  {afterIntro}
                </Reveal>
              ) : null}
            </div>
          </div>
          {heroCompliance?.length ? (
            <Reveal show={heroReveal} delayMs={220}>
              <p className="service-page-hero__compliance ml-auto max-w-lg text-right text-xs font-medium uppercase leading-snug tracking-[0.1em] text-white sm:text-sm sm:tracking-[0.12em]">
                {heroCompliance.join(" · ")}
              </p>
            </Reveal>
          ) : (
            <span className="service-page-hero__compliance" aria-hidden />
          )}
        </div>
      </div>
    </section>
  )
}
