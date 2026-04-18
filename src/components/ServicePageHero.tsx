"use client"

import type { ReactNode } from "react"
import Image from "next/image"
import { FsCctvHeroNav } from "@/components/FsCctvHeroNav"
import { FsServiceHeroQuickNav } from "@/components/FsServiceHeroQuickNav"
import { HERO_BG_GRADIENT_BOTTOM, HERO_BG_GRADIENT_LEFT } from "@/lib/heroBackgroundGradients"

export type ServicePageHeroProps = {
  title: string
  intro: ReactNode
  /** Omit for capability pillars — solid black hero, no photo */
  imageSrc?: string
  imageAlt?: string
  imageClassName?: string
  /**
   * `quick-links` — pill links to other services at bottom of hero (default).
   * `cctv-tabs` — same bottom pill row for CCTV subpages.
   */
  heroNav?: "quick-links" | "cctv-tabs" | false
  /**
   * Pillar / text-only heroes: no 70vh band — keeps title+intro tight to the section below (e.g. capability tables).
   * Use with no `imageSrc` and `heroNav={false}`.
   */
  compact?: boolean
  /** Short standard references — subtle, bottom-right of hero (above quick nav when present) */
  heroCompliance?: readonly string[]
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
  imageSrc,
  imageAlt = "",
  imageClassName,
  heroNav = "quick-links",
  compact = false,
  heroCompliance,
}: ServicePageHeroProps) {
  const showImage = Boolean(imageSrc)
  const compactLayout = Boolean(compact && !showImage && heroNav === false)

  return (
    <section
      className={
        compactLayout
          ? "service-page-hero relative flex min-h-0 flex-col overflow-hidden bg-transparent"
          : "service-page-hero relative flex h-[70vh] min-h-0 flex-col overflow-hidden bg-transparent"
      }
      style={{ background: "transparent" }}
      aria-label="Introduction"
    >
      <div className="absolute inset-0 z-0">
        {showImage ? (
          <>
            <Image
              src={imageSrc!}
              alt={imageAlt}
              fill
              priority
              sizes="100vw"
              className={imageClassName ?? "object-cover object-center"}
            />
            <div className="pointer-events-none absolute inset-0" style={{ background: HERO_BG_GRADIENT_LEFT }} />
            <div className="pointer-events-none absolute inset-0" style={{ background: HERO_BG_GRADIENT_BOTTOM }} />
            <div
              className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
              style={{
                backgroundImage: [
                  "radial-gradient(circle at 0 0, rgba(255,255,255,0.28) 0.8px, transparent 1px)",
                  "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.42) 0.9px, transparent 1.2px)",
                ].join(", "),
                backgroundSize: "3px 3px, 4px 4px",
                backgroundPosition: "0 0, 1px 1px",
              }}
              aria-hidden
            />
            <div className="pointer-events-none absolute inset-0 bg-black/45" aria-hidden />
          </>
        ) : (
          <div className="absolute inset-0 bg-black" aria-hidden />
        )}
      </div>

      <div
        className={
          compactLayout
            ? "container relative z-20 mx-auto flex flex-col px-6 pt-28 pb-5 sm:pt-32 sm:pb-6"
            : "container relative z-20 mx-auto flex h-full min-h-0 flex-1 flex-col px-6 pt-44 pb-8 sm:pb-10"
        }
      >
        <div
          className={
            heroNav === "quick-links" || heroNav === "cctv-tabs"
              ? "relative flex min-h-0 w-full min-w-0 flex-1 flex-col"
              : "relative w-full space-y-4"
          }
        >
          <div className="w-full min-w-0 max-w-full space-y-4 md:max-w-[min(52rem,68vw)] lg:max-w-[min(60rem,72vw)]">
            <h1 className="mb-2 font-title text-3xl font-bold text-left text-white sm:mb-3 sm:text-4xl md:text-5xl lg:text-6xl">
              {title}
            </h1>
            <HeroIntro>{intro}</HeroIntro>
          </div>
          {heroCompliance?.length && compactLayout ? (
            <p className="ml-auto mt-3 max-w-lg text-right text-xs font-medium uppercase leading-snug tracking-[0.1em] text-white/50 sm:mt-4 sm:text-sm sm:tracking-[0.12em]">
              {heroCompliance.join(" · ")}
            </p>
          ) : null}
          {heroCompliance?.length && !compactLayout && showImage ? (
            <div
              className="pointer-events-none absolute bottom-[5.25rem] right-0 z-30 max-w-[min(100%,22rem)] pl-4 text-right sm:bottom-[6rem] md:max-w-[26rem]"
              aria-hidden
            >
              <p className="text-xs font-medium uppercase leading-snug tracking-[0.1em] text-white/50 sm:text-sm sm:tracking-[0.12em] md:text-[0.9375rem] md:leading-relaxed">
                {heroCompliance.join(" · ")}
              </p>
            </div>
          ) : null}
          {heroNav === "quick-links" ? (
            <div className="mt-auto shrink-0 border-t border-white/15 pt-6 sm:pt-8">
              <FsServiceHeroQuickNav />
            </div>
          ) : heroNav === "cctv-tabs" ? (
            <div className="mt-auto shrink-0 border-t border-white/15 pt-6 sm:pt-8">
              <FsCctvHeroNav />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
