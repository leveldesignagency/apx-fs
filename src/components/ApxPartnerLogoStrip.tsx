"use client"

import type { PartnerLogoEntry } from "@/lib/apx-partner-logos"
import { ServiceItemReveal } from "@/components/ServiceItemReveal"
import { cn } from "@/lib/utils"

export function ApxPartnerLogoStrip({
  partners,
  variant = "dark",
  size = "default",
}: {
  partners: readonly PartnerLogoEntry[]
  variant?: "dark" | "light"
  size?: "default" | "lg" | "row"
}) {
  const isLight = variant === "light"
  const isLarge = size === "lg"
  const isRow = size === "row"
  return (
    <ul
      role="list"
      className={cn(
        "m-0 grid w-full list-none items-center justify-items-center p-0",
        isRow
          ? "grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-4 lg:grid-cols-6 lg:gap-x-2 xl:gap-x-3 lg:gap-y-0"
          : isLarge
            ? "grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 sm:gap-x-10 lg:grid-cols-3 lg:gap-x-12"
            : "grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 sm:gap-x-8 lg:grid-cols-6 lg:gap-x-6"
      )}
    >
      {partners.map(({ name, href, logoSrc, logoScaleClass, logoLightClassName }, index) => (
        <ServiceItemReveal key={name} index={index} stepMs={50} className="contents">
        <li
          className={cn(
            "flex w-full items-center justify-center justify-self-center",
            isRow ? "min-w-0 max-w-none" : isLarge ? "max-w-[16rem] sm:max-w-[18rem]" : "max-w-[11rem] sm:max-w-[12rem]"
          )}
        >
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={`${name}, visit website`}
            aria-label={`${name} (opens in new tab)`}
            className={cn(
              "flex w-full min-w-0 cursor-pointer items-center justify-center transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              isRow ? "h-20 overflow-visible px-0.5 py-1 sm:h-24 lg:h-28" : isLarge ? "h-[5.5rem] px-2 py-2 sm:h-[6.5rem]" : "h-[4.25rem] px-2 py-2 sm:h-[4.5rem]",
              isLight
                ? "focus-visible:ring-black/35 focus-visible:ring-offset-white"
                : "focus-visible:ring-white/45 focus-visible:ring-offset-black"
            )}
          >
            {logoSrc ? (
              <span
                className={cn(
                  "relative flex h-full w-full min-w-0 origin-center items-center justify-center",
                  isRow ? "h-full w-full" : isLarge
                      ? "max-h-[4.75rem] max-w-[15rem] sm:max-h-[5.75rem] sm:max-w-[17rem]"
                      : "max-h-[3.25rem] max-w-[10.5rem] sm:max-h-[3.5rem] sm:max-w-[11.5rem]",
                  logoScaleClass
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- mixed SVG/PNG partner marks from /public */}
                <img
                  src={logoSrc}
                  alt=""
                  className={cn(
                    "max-h-full max-w-full object-contain object-center opacity-90",
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
