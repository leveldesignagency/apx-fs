"use client"

import type { ReactNode } from "react"
import Image from "next/image"
import { Reveal } from "@/components/Reveal"

export type FsInsetCtaCardProps = {
  /** Service pages: dark card with faint hero image. Light: white section with gradient card. */
  variant?: "service" | "light"
  /** Faint background photo (service pages use hero image). */
  backgroundImageSrc?: string
  eyebrow?: string
  headline: string
  headlineAccent: string
  description: string
  children: ReactNode
  className?: string
  /** Show top border on section wrapper (default true). */
  showBorderTop?: boolean
}

/**
 * Contained editorial CTA card: headline left, proof + actions right.
 */
export function FsInsetCtaCard({
  variant = "service",
  backgroundImageSrc,
  eyebrow,
  headline,
  headlineAccent,
  description,
  children,
  className = "",
  showBorderTop = true,
}: FsInsetCtaCardProps) {
  const isService = variant === "service"

  return (
    <section
      className={
        isService
          ? `fs-inset-cta-card bg-black ${showBorderTop ? "border-t border-white/10" : ""} ${className}`.trim()
          : `fs-inset-cta-card fs-inset-cta-card--light bg-white ${showBorderTop ? "border-t border-black/8" : ""} ${className}`.trim()
      }
      aria-labelledby="fs-inset-cta-heading"
    >
      <div className="container mx-auto px-6 py-14 sm:py-16 lg:px-8 lg:py-20">
        <Reveal>
          <div
            className={
              isService
                ? "fs-inset-cta-card__panel group relative isolate min-h-[17rem] overflow-hidden rounded-[1.75rem] border border-white/20 p-8 shadow-[0_24px_64px_rgba(0,0,0,0.45)] sm:min-h-[18rem] sm:p-10 lg:p-12 xl:p-14"
                : "fs-inset-cta-card__panel fs-inset-cta-card__panel--light relative isolate overflow-hidden rounded-[1.75rem] border border-black/10 p-8 shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:p-10 lg:p-12 xl:p-14"
            }
          >
            {isService && backgroundImageSrc ? (
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
            ) : isService ? (
              <div
                className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(148deg,rgba(255,255,255,0.09)_0%,rgba(18,18,18,0.97)_42%,rgba(0,0,0,1)_100%)]"
                aria-hidden
              />
            ) : null}

            {!isService ? (
              <div
                className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(135deg,rgba(248,250,252,1)_0%,rgba(241,245,249,0.95)_38%,rgba(226,232,240,0.85)_72%,rgba(248,250,252,1)_100%)]"
                aria-hidden
              />
            ) : null}

            <div className="relative z-[2] grid grid-cols-1 items-end gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12 xl:gap-16">
              <div className="min-w-0">
                {eyebrow ? (
                  <p
                    className={
                      isService
                        ? "section-label mb-4 text-white/60"
                        : "section-label mb-4 text-neutral-500"
                    }
                    style={{ fontFamily: "var(--font-menu), sans-serif" }}
                  >
                    {eyebrow}
                  </p>
                ) : null}
                <h2
                  id="fs-inset-cta-heading"
                  className={
                    isService
                      ? "font-title text-[clamp(1.75rem,4.5vw,3.25rem)] font-bold leading-[1.08] tracking-tight text-white"
                      : "font-title text-[clamp(1.75rem,4.5vw,3.25rem)] font-bold leading-[1.08] tracking-tight text-black"
                  }
                >
                  <span className={isService ? "block text-white/88" : "block text-neutral-600"}>
                    {headline}
                  </span>
                  <span className={isService ? "mt-1 block text-white" : "mt-1 block text-black"}>
                    {headlineAccent}
                  </span>
                </h2>
              </div>

              <div className="min-w-0 lg:pb-1">
                <p
                  className={
                    isService
                      ? "text-base leading-relaxed text-white/72 sm:text-lg"
                      : "text-base leading-relaxed text-neutral-600 sm:text-lg"
                  }
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
