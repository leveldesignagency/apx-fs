"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FS_SERVICE_QUICK_LINKS, normalizeFsPath } from "@/lib/fs-service-navigation"

export const fsServiceHeroPillLinkClass =
  "quick-nav-pill-shimmer inline-flex min-h-[44px] w-full max-w-full items-center justify-center rounded-full border border-white/40 bg-black/45 px-3 py-2 text-center text-sm font-semibold leading-snug tracking-tight text-white/95 backdrop-blur-sm transition-[border-color,color] duration-300 hover:border-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:min-h-0 sm:min-w-0 sm:px-4 sm:py-2"

/** Same pill look as quick nav, slightly larger for in-hero CTAs */
export const fsServiceHeroPillLinkClassLg =
  "quick-nav-pill-shimmer inline-flex min-h-[44px] min-w-[8.5rem] items-center justify-center rounded-full border border-white/40 bg-black/45 px-3.5 py-2 text-center text-sm font-semibold leading-snug tracking-tight text-white/95 backdrop-blur-sm transition-[border-color,color] duration-300 hover:border-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:min-h-[46px] sm:min-w-[9rem]"

const pillClass = fsServiceHeroPillLinkClass

/** Same as MEP: scroll strip on small screens only; `sm+` wraps, no scroll container. */
export function FsServiceHeroQuickNav() {
  const path = normalizeFsPath(usePathname())
  const items = FS_SERVICE_QUICK_LINKS.filter((l) => l.href !== path)

  return (
    <nav aria-label="Other services" className="w-full min-w-0 max-w-full overflow-hidden">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
        Quick navigation — scroll for more
      </p>
      <div className="w-full min-w-0 max-w-full">
        <ul
          data-lenis-prevent=""
          className="flex max-w-full min-w-0 flex-nowrap items-stretch gap-2 touch-pan-x overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-smooth pb-0.5 scrollbar-hide sm:flex-wrap sm:overflow-visible sm:overscroll-auto sm:scroll-auto sm:touch-auto sm:gap-2.5"
        >
          {items.map(({ href, label }) => (
            <li
              key={href}
              className="inline-flex w-[9.25rem] min-w-[9.25rem] max-w-[9.25rem] shrink-0 sm:w-auto sm:min-w-0 sm:max-w-none"
            >
              <Link href={href} className={pillClass}>
                <span className="relative z-10 line-clamp-2 text-balance sm:line-clamp-none">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
