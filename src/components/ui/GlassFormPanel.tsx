import type { ReactNode } from "react"

/**
 * Corners come only from `HomeQuoteFormDrawShell` (overflow + radii + SVG). Inner layers stay
 * square and get clipped by the shell so the grey fill matches the border/stroke.
 */
export function GlassFormPanel({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full min-w-0">
      <div className="pointer-events-none absolute inset-0 bg-white/[0.03]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent"
        aria-hidden
      />
      <div className="relative z-[1] p-6 md:p-8">{children}</div>
    </div>
  )
}
