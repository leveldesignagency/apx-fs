"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ServiceItemReveal } from "@/components/ServiceItemReveal"
import { FS_SERVICE_INSTALLATIONS_GRID, FS_SERVICE_SHIMMER_CARD } from "@/lib/fsServicePageCards"
import { cn } from "@/lib/utils"

export type ServiceInstallationsGridProps = {
  /** Number of project cards rendered as children (used for fill-CTA span). */
  count: number
  children: ReactNode
  /** Contact / quote URL for the fill card. */
  ctaHref: string
  ctaTitle?: string
  ctaBody?: string
  ctaLabel?: string
  className?: string
}

/**
 * Installation / completed-project grid.
 * When the last row would be short, appends a simple CTA that spans the missing columns
 * (1-col on md when odd; 1-2 cols on lg when count % 3 !== 0).
 */
export function ServiceInstallationsGrid({
  count,
  children,
  ctaHref,
  ctaTitle = "Planning a similar project?",
  ctaBody = "Tell us about your site - we will survey, design and quote.",
  ctaLabel = "Get a free quote",
  className,
}: ServiceInstallationsGridProps) {
  const rem2 = count % 2
  const rem3 = count % 3
  const showFill = rem2 !== 0 || rem3 !== 0

  return (
    <div
      className={cn(
        FS_SERVICE_INSTALLATIONS_GRID,
        showFill && "fs-service-installations-grid--fill",
        className
      )}
    >
      {children}
      {showFill ? (
        <ServiceItemReveal
          index={count}
          className={cn(
            "h-full min-h-0",
            rem2 === 0 && "md:hidden lg:block",
            rem3 === 0 && "lg:hidden",
            rem3 === 1 && "lg:col-span-2",
            rem3 === 2 && "lg:col-span-1"
          )}
        >
          <Link
            href={ctaHref}
            className={cn(
              FS_SERVICE_SHIMMER_CARD,
              "group relative flex h-full min-h-[16rem] flex-col justify-center overflow-hidden p-6 text-inherit no-underline sm:min-h-[18rem] md:p-8",
              "bg-[linear-gradient(145deg,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0)_42%,rgba(0,0,0,1)_100%)]"
            )}
          >
            <p
              className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45"
              style={{ fontFamily: "var(--font-menu), sans-serif" }}
            >
              Next project
            </p>
            <h3 className="max-w-[16rem] font-title text-xl font-bold leading-snug tracking-tight text-white sm:text-2xl">
              {ctaTitle}
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/65 sm:text-[0.9375rem]">
              {ctaBody}
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-0.5">
              {ctaLabel}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-1"
                strokeWidth={2}
                aria-hidden
              />
            </span>
          </Link>
        </ServiceItemReveal>
      ) : null}
    </div>
  )
}
