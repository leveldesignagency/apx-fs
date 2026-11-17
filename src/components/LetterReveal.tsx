"use client"

import type { ElementType, ReactNode } from "react"
import BlurText from "@/components/BlurText"
import { toTitleCase } from "@/lib/titleCase"
import { cn } from "@/lib/utils"

type LetterRevealProps = {
  text: string
  as?: ElementType
  className?: string
  id?: string
  /** Kept for API compat; BlurText uses word delay (default 110ms). */
  staggerMs?: number
  /** Extra delay before the first word (ms) — applied as BlurText delay offset via active gate. */
  delayMs?: number
  /** Controlled active state; defaults to scroll-into-view. */
  active?: boolean
  /** Unused with BlurText (animates on all breakpoints unless reduced motion). */
  desktopOnly?: boolean
  children?: ReactNode
}

/**
 * Title reveal: React Bits BlurText (word blur-in) with per-word hover focus.
 */
export function LetterReveal({
  text,
  as: Tag = "span",
  className,
  id,
  staggerMs = 110,
  delayMs: _delayMs = 0,
  active: activeProp,
}: LetterRevealProps) {
  void _delayMs
  const displayText = text
    .split("\n")
    .map((line) => toTitleCase(line))
    .join("\n")

  // Prefer the BlurText word stagger; map legacy letter stagger into a sensible word delay.
  const delay = staggerMs <= 40 ? 110 : staggerMs

  return (
    <BlurText
      as={Tag}
      id={id}
      text={displayText}
      className={cn("letter-reveal blur-text-title", className)}
      effect="blur"
      animateBy="words"
      direction="top"
      staggerFrom="start"
      trigger="view"
      active={activeProp}
      delay={delay}
      stepDuration={0.25}
      blur={7}
      distance={50}
      focusOnHover
      loop={false}
      loopDelay={2}
      threshold={0.15}
      rootMargin="0px 0px -6% 0px"
    />
  )
}
