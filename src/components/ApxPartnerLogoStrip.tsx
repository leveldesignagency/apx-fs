"use client"

import type { PartnerLogoEntry } from "@/lib/apx-partner-logos"

export function ApxPartnerLogoStrip({ partners }: { partners: readonly PartnerLogoEntry[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-8 sm:gap-x-10 sm:gap-y-10">
      {partners.map(({ name, href, logoSrc, size }) => {
        const isLg = size === "lg"
        return (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={`${name} — visit website`}
            aria-label={`${name} (opens in new tab)`}
            className={`flex shrink-0 items-center justify-center transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/45 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
              isLg
                ? "h-16 w-[11rem] sm:h-[4.5rem] sm:w-[12.5rem]"
                : "h-14 w-[9.25rem] sm:h-16 sm:w-[10.5rem]"
            }`}
          >
            {logoSrc ? (
              // eslint-disable-next-line @next/next/no-img-element -- mixed SVG/PNG partner marks from /public
              <img
                src={logoSrc}
                alt=""
                className={`w-auto max-w-full object-contain object-center ${
                  isLg ? "h-14 sm:h-[4.5rem]" : "h-12 sm:h-14"
                }`}
              />
            ) : (
              <span className="border-b border-white/35 pb-1 text-center text-xs font-semibold uppercase tracking-[0.14em] text-white sm:text-sm">
                {name}
              </span>
            )}
          </a>
        )
      })}
    </div>
  )
}
