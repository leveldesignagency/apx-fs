"use client"

import type { ReactNode } from "react"
import Image from "next/image"
import { Reveal } from "@/components/Reveal"
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
 * Contained editorial CTA card: headline left, proof + actions right.
 */
export function FsInsetCtaCard({
  variant = "service",
  backgroundImageSrc,
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
        isWhiteSection ? "bg-white" : "bg-black",
        showBorderTop && (isWhiteSection ? "border-t border-black/8" : "border-t border-white/10"),
        variant === "light" && "fs-inset-cta-card--light",
        variant === "dark-card" && "fs-inset-cta-card--dark-card",
        className
      )}
      aria-labelledby={headingId}
    >
      <div className="container mx-auto px-6 py-14 sm:py-16 lg:px-8 lg:py-20">
        <Reveal>
          <div
            className={cn(
              "fs-inset-cta-card__panel group relative isolate min-h-[17rem] overflow-hidden rounded-[1.75rem] p-8 sm:min-h-[18rem] sm:p-10 lg:p-12 xl:p-14",
              isDarkPanel
                ? "border border-white/20 shadow-[0_24px_64px_rgba(0,0,0,0.45)]"
                : "fs-inset-cta-card__panel--light border border-black/10 shadow-[0_20px_50px_rgba(15,23,42,0.08)]",
              variant === "dark-card" && "bg-black"
            )}
          >
            {isDarkPanel && backgroundImageSrc ? (
              <>
                <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
                  <div className="absolute inset-0 origin-center transition-transform duration-700 ease-out group-hover:scale-[1.04]">
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
                  className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(118deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.78)_42%,rgba(0,0,0,0.62)_100%)]"
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

            <div className="relative z-[2] grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12 xl:gap-16">
              <div className="min-w-0">
                <h2
                  id={headingId}
                  aria-label={`${headline.trimEnd()} ${headlineAccent.trimStart()}`}
                  className={cn(
                    "font-title text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl lg:text-[3.35rem] xl:text-6xl",
                    isDarkPanel ? "text-white" : "text-black"
                  )}
                >
                  <span className={cn("block", isDarkPanel ? "text-white/88" : "text-neutral-600")} aria-hidden>
                    {headline.trimEnd()}
                  </span>
                  <span className="sr-only"> </span>
                  <span className={cn("block", isDarkPanel ? "text-white" : "text-black")} aria-hidden>
                    {headlineAccent.trimStart()}
                  </span>
                </h2>
              </div>

              <div className="min-w-0">
                <p
                  className={cn(
                    "text-lg leading-relaxed sm:text-xl",
                    isDarkPanel ? "text-white/75" : "text-neutral-600"
                  )}
                >
                  {description}
                </p>
                <Reveal delayMs={80}>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
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
