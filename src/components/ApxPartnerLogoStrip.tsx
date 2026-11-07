"use client"

import type { PartnerLogoEntry } from "@/lib/apx-partner-logos"
import { ServiceItemReveal } from "@/components/ServiceItemReveal"
import { cn } from "@/lib/utils"

export function ApxPartnerLogoStrip({
  partners,
  variant = "dark",
  density = "default",
}: {
  partners: readonly PartnerLogoEntry[]
  variant?: "dark" | "light"
  /** `dense` = equal grid cells, logo fills each cell with padding. */
  density?: "default" | "dense"
  /** @deprecated Ignored — all service product strips share one size/spacing. */
  size?: "default" | "lg" | "row"
}) {
  const isLight = variant === "light"
  const isDense = density === "dense"

  if (isDense) {
    return (
      <ul
        role="list"
        className="m-0 grid w-full list-none grid-cols-2 gap-4 p-0 sm:grid-cols-4 lg:grid-cols-8"
      >
        {partners.map(({ name, href, logoSrc, logoLightClassName }) => (
          <li key={name} className="min-w-0">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={`${name}, visit website`}
              aria-label={`${name} (opens in new tab)`}
              className={cn(
                "flex h-16 w-full items-center justify-center p-3 transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:h-[4.5rem]",
                isLight
                  ? "focus-visible:ring-black/35 focus-visible:ring-offset-white"
                  : "focus-visible:ring-white/45 focus-visible:ring-offset-black"
              )}
            >
              {logoSrc ? (
                // eslint-disable-next-line @next/next/no-img-element -- mixed SVG/PNG partner marks from /public
                <img
                  src={logoSrc}
                  alt=""
                  className={cn("h-full w-full object-contain opacity-90", isLight && logoLightClassName)}
                />
              ) : (
                <span
                  className={cn(
                    "text-center text-[0.65rem] font-semibold uppercase tracking-[0.12em]",
                    isLight ? "text-black" : "text-white"
                  )}
                >
                  {name}
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <ul
      role="list"
      className="m-0 flex w-full list-none flex-wrap items-center justify-between gap-x-5 gap-y-8 p-0 sm:gap-x-6 sm:gap-y-9 lg:gap-x-8"
    >
      {partners.map(({ name, href, logoSrc, logoScaleClass, logoLightClassName }, index) => (
        <ServiceItemReveal key={name} index={index} stepMs={50} className="contents">
          <li className="flex min-w-0 flex-1 basis-[9rem] items-center justify-center sm:basis-[10rem]">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={`${name}, visit website`}
              aria-label={`${name} (opens in new tab)`}
              className={cn(
                "flex h-[4.75rem] w-full max-w-[11.5rem] items-center justify-center transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:h-[5.25rem] lg:h-[5.75rem]",
                isLight
                  ? "focus-visible:ring-black/35 focus-visible:ring-offset-white"
                  : "focus-visible:ring-white/45 focus-visible:ring-offset-black"
              )}
            >
              {logoSrc ? (
                <span className={cn("relative flex h-full w-full items-center justify-center", logoScaleClass)}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- mixed SVG/PNG partner marks from /public */}
                  <img
                    src={logoSrc}
                    alt=""
                    className={cn(
                      "max-h-full max-w-full object-contain object-center opacity-90",
                      logoScaleClass && "origin-center",
                      isLight && logoLightClassName
                    )}
                  />
                </span>
              ) : (
                <span
                  className={cn(
                    "max-w-[10.5rem] border-b pb-1 text-center text-[0.65rem] font-semibold uppercase leading-snug tracking-[0.12em] sm:text-xs",
                    isLight ? "border-black/25 text-black" : "border-white/35 text-white"
                  )}
                >
                  {name}
                </span>
              )}
            </a>
          </li>
        </ServiceItemReveal>
      ))}
    </ul>
  )
}
