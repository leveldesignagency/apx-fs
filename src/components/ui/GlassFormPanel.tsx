import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/**
 * Corners come only from `HomeQuoteFormDrawShell` (overflow + radii + SVG). Inner layers stay
 * square and get clipped by the shell so the fill matches the border/stroke.
 * Flat near-black fill — no inner gradient.
 */
export function GlassFormPanel({
  children,
  className,
  contentClassName,
}: {
  children: ReactNode
  className?: string
  contentClassName?: string
}) {
  return (
    <div className={cn("relative w-full min-w-0", className)}>
      <div className="pointer-events-none absolute inset-0 bg-[var(--page-bg)]" aria-hidden />
      <div className={cn("relative z-[1] p-6 md:p-8", contentClassName)}>{children}</div>
    </div>
  )
}
