import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/**
 * Corners come only from `HomeQuoteFormDrawShell` (overflow + radii + SVG). Inner layers stay
 * square and get clipped by the shell so the fill matches the border/stroke.
 * Flat near-black fill — no inner gradient. Use `bare` on white bands (no outer panel).
 */
export function GlassFormPanel({
  children,
  className,
  contentClassName,
  bare = false,
}: {
  children: ReactNode
  className?: string
  contentClassName?: string
  /** No filled outer panel — fields sit directly on the page background. */
  bare?: boolean
}) {
  return (
    <div className={cn("relative w-full min-w-0", className)}>
      {!bare ? (
        <div className="pointer-events-none absolute inset-0 bg-[var(--page-bg)]" aria-hidden />
      ) : null}
      <div className={cn("relative z-[1]", bare ? "p-0" : "p-6 md:p-8", contentClassName)}>
        {children}
      </div>
    </div>
  )
}
