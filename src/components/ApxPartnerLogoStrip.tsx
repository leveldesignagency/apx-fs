"use client"

import type { PartnerLogoEntry } from "@/lib/apx-partner-logos"
import { ServiceItemReveal } from "@/components/ServiceItemReveal"
import { cn } from "@/lib/utils"

export function ApxPartnerLogoStrip({
  partners,
  variant = "dark",
}: {
  partners: readonly PartnerLogoEntry[]
  variant?: "dark" | "light"
  /** @deprecated Ignored — all service product strips share one size/spacing. */
  size?: "default" | "lg" | "row"
}) {
  const isLight = variant === "light"
  return (
    <ul
      role="list"
      className="m-0 flex w-full list-none flex-wrap items-center justify-start gap-x-6 gap-y-8 p-0 sm:gap-x-7 sm:gap-y-9 lg:gap-x-8"
    >
      {partners.map(({ name, href, logoSrc, logoScaleClass, logoLightClassName }, index) => (
        <ServiceItemReveal key={name} index={index} stepMs={50} className="contents">
          <li className="flex shrink-0 items-center justify-start">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={`${name}, visit website`}
              aria-label={`${name} (opens in new tab)`}
              className={cn(
                "flex h-[4.75rem] w-[9.5rem] items-center justify-start transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:h-[5.25rem] sm:w-[10.75rem] lg:h-[5.75rem] lg:w-[11.5rem]",
                isLight
                  ? "focus-visible:ring-black/35 focus-visible:ring-offset-white"
                  : "focus-visible:ring-white/45 focus-visible:ring-offset-black"
              )}
            >
              {logoSrc ? (
                <span
                  className={cn(
                    "relative flex h-full w-full origin-left items-center justify-start",
                    logoScaleClass
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- mixed SVG/PNG partner marks from /public */}
                  <img
                    src={logoSrc}
                    alt=""
                    className={cn(
                      "max-h-full max-w-full object-contain object-left opacity-90",
                      isLight && logoLightClassName
                    )}
                  />
                </span>
              ) : (
                <span
                  className={cn(
                    "max-w-[10.5rem] border-b pb-1 text-left text-[0.65rem] font-semibold uppercase leading-snug tracking-[0.12em] sm:text-xs",
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
