"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FS_SERVICE_QUICK_LINKS, normalizeFsPath } from "@/lib/fs-service-navigation"
export const fsServiceHeroPillLinkClass =
  "fs-service-quick-nav__pill quick-nav-pill-shimmer inline-flex min-h-[44px] w-full max-w-full items-center justify-center rounded-full border border-white/40 bg-black/45 px-3 py-2 text-center text-base font-semibold uppercase leading-snug tracking-normal text-white/95 backdrop-blur-sm transition-[background-color,border-color,color] duration-300 hover:border-white hover:bg-white hover:text-black focus-visible:outline-none focus-visible:border-white focus-visible:bg-white focus-visible:text-black focus-visible:ring-2 focus-visible:ring-white/50 sm:min-h-0 sm:min-w-0 sm:px-4 sm:py-2 sm:text-[1.0625rem]"

/** Same pill look as quick nav, slightly larger for in-hero CTAs */
export const fsServiceHeroPillLinkClassLg =
  "fs-service-quick-nav__pill quick-nav-pill-shimmer inline-flex min-h-[44px] min-w-[8.5rem] items-center justify-center rounded-full border border-white/40 bg-black/45 px-3.5 py-2 text-center text-base font-semibold uppercase leading-snug tracking-normal text-white/95 backdrop-blur-sm transition-[background-color,border-color,color] duration-300 hover:border-white hover:bg-white hover:text-black focus-visible:outline-none focus-visible:border-white focus-visible:bg-white focus-visible:text-black focus-visible:ring-2 focus-visible:ring-white/50 sm:min-h-[46px] sm:min-w-[9rem] sm:text-[1.0625rem]"

const pillClass = fsServiceHeroPillLinkClass

/** Same as MEP: scroll strip on small screens only; `sm+` wraps, no scroll container. */
export function FsServiceHeroQuickNav() {
  const path = normalizeFsPath(usePathname())
  const items = FS_SERVICE_QUICK_LINKS.filter((l) => l.href !== path)

  return (
    <nav aria-label="Other services" className="w-full min-w-0 max-w-full overflow-hidden">
      <p className="fs-service-quick-nav__hint mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-white/45 sm:text-base">
        Quick navigation: scroll for more
      </p>
      <div className="w-full min-w-0 max-w-full">
        <ul
          data-lenis-prevent=""
          className="flex max-w-full min-w-0 flex-nowrap items-stretch gap-2 touch-pan-x overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-smooth pb-0.5 scrollbar-hide sm:flex-wrap sm:overflow-visible sm:overscroll-auto sm:scroll-auto sm:touch-auto sm:gap-2.5"
        >
          {items.map(({ href, label }) => (
            <li
              key={href}
              className="inline-flex w-[10.75rem] min-w-[10.75rem] max-w-[10.75rem] shrink-0 sm:w-auto sm:min-w-0 sm:max-w-none"
            >
              <Link href={href} className={pillClass}>
                <span className="relative z-10 line-clamp-2 text-balance uppercase sm:line-clamp-none">
                  {label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
