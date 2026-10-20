"use client"

import { useEffect, useState, type ReactNode } from "react"
import Image from "next/image"
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

export type ServicePageHeroProps = {
  title: string
  intro: ReactNode
  /**
   * Short two-line service statement shown at the bottom of the hero on mobile.
   * Falls back to a clamped version of `intro` when omitted.
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
  /** Optional row under the intro paragraph (e.g. domestic / commercial pills on CCTV hub) */
  afterIntro?: ReactNode
}

function HeroIntro({ children }: { children: ReactNode }) {
  return (
    <div className="service-page-hero__intro w-full text-base font-normal tracking-tight text-left text-white sm:text-lg md:text-xl mb-0 [&_p+p]:mt-4">
      {typeof children === "string" ? <p>{children}</p> : children}
    </div>
  )
}

/**
 * Same text block as homepage #hero. Band is 70vh unless `compact` (no photo, no bottom nav).
 * With `imageSrc`: photo + gradients. Without: solid black (capability pillars).
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
}: ServicePageHeroProps) {
  const showImage = Boolean(imageSrc)
  const compactLayout = Boolean(compact && !showImage && heroNav === false)
  const showBottomNav = heroNav === "quick-links" || heroNav === "cctv-tabs"
  /** CCTV pages stack subpage pills + service quick-nav — need room to grow on mobile */
  const hasStackedHeroNav = Boolean(afterIntro && showBottomNav)
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

  const mobileSummary = heroSummary ? (
    <p className="max-w-xl text-left text-sm font-normal leading-snug tracking-tight text-white/95 sm:text-base">
      {heroSummary}
    </p>
  ) : (
    <div className="service-page-hero__mobile-summary line-clamp-3 max-w-xl text-left text-sm font-normal leading-snug tracking-tight text-white/95 [&_p]:m-0 [&_p+p]:hidden [&_strong]:font-semibold [&_strong]:text-white">
      <HeroIntro>{intro}</HeroIntro>
    </div>
  )

  const heroBandClass = compactLayout
    ? "service-page-hero service-page-hero--compact-pillar relative flex min-h-0 flex-col overflow-hidden bg-transparent"
    : hasStackedHeroNav
      ? // Mobile: height follows content so dual pill rows are never cropped
        "service-page-hero service-page-hero--stacked-nav relative flex flex-col overflow-hidden bg-transparent sm:h-[70vh] sm:min-h-0"
      : "service-page-hero relative flex h-[min(78vh,36rem)] min-h-[26rem] flex-col overflow-hidden bg-transparent sm:h-[70vh] sm:min-h-0"

  const heroInnerClass = compactLayout
    ? "service-page-hero__compact-container site-container relative z-20 flex flex-col pb-5 sm:pb-6"
    : hasStackedHeroNav
      ? "site-container relative z-20 flex flex-col pt-36 pb-6 sm:h-full sm:min-h-0 sm:flex-1 sm:pt-44 sm:pb-10"
      : "site-container relative z-20 flex h-full min-h-0 flex-1 flex-col pt-36 pb-5 sm:pt-44 sm:pb-10"

  const heroStackClass = showBottomNav
    ? hasStackedHeroNav
      ? "relative flex w-full min-w-0 flex-col gap-5 sm:min-h-0 sm:flex-1 sm:gap-0"
      : "relative flex min-h-0 w-full min-w-0 flex-1 flex-col"
    : compactLayout
      ? "service-page-hero__pillar-stack relative w-full"
      : "relative w-full space-y-4"

  return (
    <section className={heroBandClass} style={{ background: "transparent" }} aria-label="Introduction">
      <div className="absolute inset-0 z-0">
        {showImage ? (
          <>
            <Image
              src={imageSrc!}
              alt={imageAlt}
              fill
              priority
              sizes="100vw"
              className={`${imageClassName ?? "object-cover object-center"} ${SERVICE_HERO_IMAGE_FILTERS}`}
            />
            <div className="pointer-events-none absolute inset-0" style={{ background: SERVICE_HERO_BG_GRADIENT_LEFT }} />
            <div className="pointer-events-none absolute inset-0" style={{ background: SERVICE_HERO_BG_GRADIENT_BOTTOM }} />
            <div
              className="pointer-events-none absolute inset-0"
              style={{ backgroundColor: SERVICE_HERO_WASH }}
              aria-hidden
            />
          </>
        ) : (
          <div className="absolute inset-0 bg-[var(--page-bg)]" aria-hidden />
        )}
      </div>

      <div className={heroInnerClass}>
        <div className={heroStackClass}>
          {compactLayout ? (
            <>
              <div className="service-page-hero__copy-block w-full min-w-0 max-w-full md:max-w-[min(52rem,68vw)] lg:max-w-[min(60rem,72vw)]">
                <Reveal show={heroReveal} delayMs={0}>
                  <h1 className="service-page-hero__title mb-0 font-title text-3xl font-bold text-left text-white sm:text-4xl md:text-5xl lg:text-6xl">
                    {toTitleCase(title)}
                  </h1>
                </Reveal>
                <div className="service-page-hero__intro-slot w-full min-w-0">
                  <Reveal show={heroReveal} delayMs={90}>
                    <HeroIntro>{intro}</HeroIntro>
                  </Reveal>
                  {afterIntro ? <Reveal show={heroReveal} delayMs={160}>{afterIntro}</Reveal> : null}
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
            </>
          ) : (
            <div className="w-full min-w-0 max-w-full space-y-3 sm:space-y-4 md:max-w-[min(52rem,68vw)] lg:max-w-[min(60rem,72vw)]">
              <Reveal show={heroReveal} delayMs={0}>
                <h1 className="mb-1 font-title text-3xl font-bold text-left text-white sm:mb-3 sm:text-4xl md:text-5xl lg:text-6xl">
                  {toTitleCase(title)}
                </h1>
              </Reveal>
              {/* Mobile: standards under the title */}
              {heroCompliance?.length && showImage ? (
                <Reveal show={heroReveal} delayMs={60} className="sm:hidden">
                  <p className="max-w-[20rem] text-left text-[0.7rem] font-medium uppercase leading-snug tracking-[0.12em] text-white">
                    {heroCompliance.join(" · ")}
                  </p>
                </Reveal>
              ) : null}
              {/* Full intro from sm up */}
              <Reveal show={heroReveal} delayMs={90} className="hidden sm:block">
                <HeroIntro>{intro}</HeroIntro>
              </Reveal>
              {afterIntro ? <Reveal show={heroReveal} delayMs={160}>{afterIntro}</Reveal> : null}
            </div>
          )}
          {heroCompliance?.length && !compactLayout && showImage ? (
            <div
              className="pointer-events-none absolute bottom-[5.25rem] right-0 z-30 hidden max-w-[min(100%,22rem)] pl-4 text-right sm:bottom-[6rem] sm:block md:max-w-[26rem]"
              aria-hidden
            >
              <p className="text-xs font-medium uppercase leading-snug tracking-[0.1em] text-white sm:text-sm sm:tracking-[0.12em] md:text-[0.9375rem] md:leading-relaxed">
                {heroCompliance.join(" · ")}
              </p>
            </div>
          ) : null}

          {/* Mobile: short service statement + quick nav at the bottom of the hero */}
          {!compactLayout && showBottomNav ? (
            <div
              className={
                hasStackedHeroNav
                  ? "flex shrink-0 flex-col gap-4 border-t border-white/15 pt-4 sm:hidden"
                  : "mt-auto flex shrink-0 flex-col gap-4 border-t border-white/15 pt-4 sm:hidden"
              }
            >
              <Reveal show={heroReveal} delayMs={180}>
                {mobileSummary}
              </Reveal>
              <Reveal show={heroReveal} delayMs={240}>
                {heroNav === "quick-links" ? <FsServiceHeroQuickNav /> : <FsCctvHeroNav />}
              </Reveal>
            </div>
          ) : null}

          {/* Desktop / tablet: quick nav only (full intro already above) */}
          {heroNav === "quick-links" ? (
            <Reveal
              show={heroReveal}
              delayMs={240}
              className="mt-auto hidden shrink-0 border-t border-white/15 pt-6 sm:block sm:pt-8"
            >
              <FsServiceHeroQuickNav />
            </Reveal>
          ) : heroNav === "cctv-tabs" ? (
            <Reveal
              show={heroReveal}
              delayMs={240}
              className="mt-auto hidden shrink-0 border-t border-white/15 pt-6 sm:block sm:pt-8"
            >
              <FsCctvHeroNav />
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  )
}
