"use client"

import type { ReactNode } from "react"
import Image from "next/image"
import { Reveal } from "@/components/Reveal"
import { LetterReveal } from "@/components/LetterReveal"
import { toTitleCase } from "@/lib/titleCase"
import { cn } from "@/lib/utils"

export type FsInsetCtaCardProps = {
  /**
   * service: black section + dark photo card
   * light: white section + light gradient card
   * dark-card: white section + solid black card (About Meet the Team, etc.)
   */
  variant?: "service" | "light" | "dark-card"
  /** Faint background photo (service / dark-card). */
  backgroundImageSrc?: string
  /** Small label above the headline */
  eyebrow?: string
  headline: string
  headlineAccent: string
  description: string
  children: ReactNode
  className?: string
  /** Show top border on section wrapper (default true). */
  showBorderTop?: boolean
  /** Unique heading id when multiple CTAs share a page. */
  headingId?: string
}

/**
 * Contained editorial CTA: headline left, copy + actions right.
 */
export function FsInsetCtaCard({
  variant = "service",
  backgroundImageSrc,
  eyebrow = "Talk to us",
  headline,
  headlineAccent,
  description,
  children,
  className = "",
  showBorderTop = true,
  headingId = "fs-inset-cta-heading",
}: FsInsetCtaCardProps) {
  const isDarkPanel = variant === "service" || variant === "dark-card"
  const isWhiteSection = variant === "light" || variant === "dark-card"

  return (
    <section
      className={cn(
        "fs-inset-cta-card",
        isWhiteSection ? "bg-white" : "bg-[var(--page-bg)]",
        showBorderTop && (isWhiteSection ? "border-t border-black/8" : "border-t border-white/10"),
        variant === "light" && "fs-inset-cta-card--light",
        variant === "dark-card" && "fs-inset-cta-card--dark-card",
        className
      )}
      aria-labelledby={headingId}
    >
      <div className="site-container py-12 sm:py-14 lg:py-16">
        <Reveal>
          <div
            className={cn(
              "fs-inset-cta-card__panel group relative isolate overflow-hidden rounded-[1.75rem] border",
              "min-h-[17rem] p-8 sm:min-h-[18rem] sm:p-10 lg:p-12 xl:p-14",
              isDarkPanel
                ? "border-white/20 shadow-[0_24px_64px_rgba(0,0,0,0.45)]"
                : "fs-inset-cta-card__panel--light border-black/10 shadow-[0_20px_50px_rgba(15,23,42,0.08)]",
              variant === "dark-card" && "bg-[var(--page-bg)]"
            )}
          >
            {isDarkPanel && backgroundImageSrc ? (
              <>
                <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
                  <div className="absolute inset-0 origin-center transition-transform duration-700 ease-out motion-reduce:transition-none motion-safe:group-hover:scale-[1.035]">
                    <Image
                      src={backgroundImageSrc}
                      alt=""
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1280px) 100vw, 72rem"
                      priority={false}
                    />
                  </div>
                </div>
                <div
                  className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(105deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.82)_38%,rgba(0,0,0,0.55)_72%,rgba(0,0,0,0.7)_100%)]"
                  aria-hidden
                />
              </>
            ) : variant === "service" || variant === "dark-card" ? (
              <div
                className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(148deg,rgba(255,255,255,0.09)_0%,rgba(18,18,18,0.97)_42%,rgba(0,0,0,1)_100%)]"
                aria-hidden
              />
            ) : null}

            {variant === "light" ? (
              <div
                className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(135deg,rgba(248,250,252,1)_0%,rgba(241,245,249,0.95)_38%,rgba(226,232,240,0.85)_72%,rgba(248,250,252,1)_100%)]"
                aria-hidden
              />
            ) : null}

            <div className="relative z-[2] grid grid-cols-1 items-end gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 xl:gap-16">
              <div className="min-w-0 text-left">
                {eyebrow ? (
                  <p
                    className={cn(
                      "mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] sm:mb-4",
                      isDarkPanel ? "text-white/55" : "text-neutral-500"
                    )}
                  >
                    {eyebrow}
                  </p>
                ) : null}
                <LetterReveal
                  as="h2"
                  id={headingId}
                  text={`${headline.trimEnd()}\n${headlineAccent.trimStart()}`}
                  desktopOnly={false}
                  className={cn(
                    "fs-inset-cta-card__title font-title text-[3.35rem] font-bold leading-[0.88] tracking-tight sm:text-5xl lg:text-6xl xl:text-[4.25rem]",
                    isDarkPanel ? "text-white" : "text-black"
                  )}
                />
              </div>

              <div className="mx-auto min-w-0 w-full max-w-xl text-left lg:mx-0 lg:max-w-none">
                <p
                  className={cn(
                    "text-base leading-relaxed sm:text-lg lg:text-xl",
                    isDarkPanel ? "text-white/72" : "text-neutral-600"
                  )}
                >
                  {description}
                </p>
                <Reveal delayMs={80}>
                  <div className="fs-inset-cta-card__actions mt-7 flex w-full flex-row flex-wrap items-center justify-between gap-3 sm:justify-start sm:gap-3">
                    {children}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
