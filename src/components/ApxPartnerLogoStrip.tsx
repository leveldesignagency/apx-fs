"use client"

import type { PartnerLogoEntry } from "@/lib/apx-partner-logos"

export function ApxPartnerLogoStrip({ partners }: { partners: readonly PartnerLogoEntry[] }) {
  return (
    <ul
      role="list"
      className="m-0 grid w-full list-none grid-cols-[repeat(auto-fit,minmax(9.5rem,1fr))] gap-x-8 gap-y-10 p-0 sm:gap-x-10 sm:gap-y-12"
    >
      {partners.map(({ name, href, logoSrc, size }) => {
        const isLg = size === "lg"
        return (
          <li key={name} className="min-w-0">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={`${name} — visit website`}
              aria-label={`${name} (opens in new tab)`}
              className="flex min-h-[5.5rem] w-full items-center justify-center px-3 py-2 transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/45 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:min-h-[6rem]"
            >
              {logoSrc ? (
                // eslint-disable-next-line @next/next/no-img-element -- mixed SVG/PNG partner marks from /public
                <img
                  src={logoSrc}
                  alt=""
                  className={`w-auto max-w-[min(100%,10.5rem)] object-contain object-center ${
                    isLg ? "max-h-[3.25rem] sm:max-h-14" : "max-h-11 sm:max-h-12"
                  }`}
                />
              ) : (
                <span className="max-w-[10.5rem] border-b border-white/35 pb-1 text-center text-[0.65rem] font-semibold uppercase leading-snug tracking-[0.12em] text-white sm:text-xs">
                  {name}
                </span>
              )}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
