"use client"

import type { ReactNode } from "react"
import { Reveal } from "@/components/Reveal"

type ServiceItemRevealProps = {
  index: number
  children: ReactNode
  className?: string
  /** Stagger step between items (default 70ms). */
  stepMs?: number
  baseDelayMs?: number
}

/** Scroll-in reveal with index-based stagger for service page grids and lists. */
export function ServiceItemReveal({
  index,
  children,
  className,
  stepMs = 70,
  baseDelayMs = 0,
}: ServiceItemRevealProps) {
  return (
    <Reveal delayMs={baseDelayMs + index * stepMs} className={className}>
      {children}
    </Reveal>
  )
}
