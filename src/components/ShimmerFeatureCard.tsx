"use client"

import type { ReactNode } from "react"
import { Reveal } from "@/components/Reveal"
import { FS_SERVICE_SHIMMER_CARD } from "@/lib/fsServicePageCards"

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
        {icon ? <div className="mb-4 text-white">{icon}</div> : null}
        {title ? <h3 className="mb-3 text-left text-xl font-semibold text-white">{title}</h3> : null}
        {description ? <p className="text-left text-gray-300">{description}</p> : null}
      </>
    )

  const card = (
    <div
      className={`${FS_SERVICE_SHIMMER_CARD} p-8 text-white transition-transform duration-300 hover:scale-[1.02] ${className}`.trim()}
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
