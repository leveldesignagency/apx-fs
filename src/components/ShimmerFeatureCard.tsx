"use client"

import type { ReactNode } from "react"
import { Reveal } from "@/components/Reveal"
import { FS_SERVICE_SHIMMER_CARD } from "@/lib/fsServicePageCards"
import { cn } from "@/lib/utils"

export type ShimmerFeatureCardProps = {
  className?: string
  /** Full card content, takes precedence over icon / title / description when provided. */
  children?: ReactNode
  icon?: ReactNode
  title?: string
  description?: string
  /** Stagger index for scroll-in reveal (omit to skip reveal wrapper). */
  revealIndex?: number
}

/**
 * Service grid card: FS-style gradient + border (shared with about / capability cards).
 * Use either `children` or the icon + title + description props.
 * Icon (when provided) sits top-right; title and body fill the left.
 */
export function ShimmerFeatureCard({
  className = "",
  children,
  icon,
  title,
  description,
  revealIndex,
}: ShimmerFeatureCardProps) {
  const body =
    children ?? (
      <>
        {icon ? (
          <div className="absolute right-6 top-6 text-white sm:right-7 sm:top-7 [&_svg]:h-7 [&_svg]:w-7 sm:[&_svg]:h-8 sm:[&_svg]:w-8">
            {icon}
          </div>
        ) : null}
        {title ? (
          <h3 className="min-w-0 pr-10 text-left font-title text-xl font-bold leading-tight tracking-tight text-white sm:text-[1.35rem]">
            {title}
          </h3>
        ) : null}
        {description ? (
          <p className="mt-4 text-left text-[15px] leading-[1.65] text-white/55">{description}</p>
        ) : null}
      </>
    )

  const card = (
    <div
      className={cn(
        FS_SERVICE_SHIMMER_CARD,
        "relative flex h-full flex-col p-8 pr-14 text-white transition-transform duration-300 hover:scale-[1.02]",
        className
      )}
    >
      {body}
    </div>
  )

  if (revealIndex === undefined) return card

  return (
    <Reveal delayMs={revealIndex * 70} className="h-full min-h-0">
      {card}
    </Reveal>
  )
}
