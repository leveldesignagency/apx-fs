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
}

function HeroIntro({ children }: { children: ReactNode }) {
  return (
    <div className="service-page-hero__intro w-full text-base font-normal tracking-tight text-left text-white sm:text-lg md:text-xl mb-0 [&_p+p]:mt-4">
      {typeof children === "string" ? <p>{children}</p> : children}
    </div>
  )
}

/**
 * Same text block as homepage #hero. Band is 70vh. No CTAs, no accreditations.
 * With `imageSrc`: photo + gradients. Without: solid black (capability pillars).
 */
export function ServicePageHero({
  title,
  intro,
  imageSrc,
  imageAlt = "",
  imageClassName,
  heroNav = "quick-links",
}: ServicePageHeroProps) {
  const showImage = Boolean(imageSrc)

  return (
    <section
      className="service-page-hero relative flex h-[70vh] min-h-0 flex-col overflow-hidden bg-transparent"
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
            <div className="pointer-events-none absolute inset-0 bg-black/45" aria-hidden />
          </>
        ) : (
          <div className="absolute inset-0 bg-black" aria-hidden />
        )}
      </div>

      <div className="container relative z-20 mx-auto flex h-full min-h-0 flex-1 flex-col px-6 pt-44 pb-8 sm:pb-10">
        <div
          className={
            heroNav === "quick-links" || heroNav === "cctv-tabs"
              ? "flex min-h-0 w-full min-w-0 flex-1 flex-col"
              : "space-y-4"
          }
        >
          <div className="w-full min-w-0 max-w-full space-y-4 md:max-w-[min(52rem,68vw)] lg:max-w-[min(60rem,72vw)]">
            <h1 className="mb-2 font-title text-3xl font-bold text-left text-white sm:mb-3 sm:text-4xl md:text-5xl lg:text-6xl">
              {title}
            </h1>
            <HeroIntro>{intro}</HeroIntro>
          </div>
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
