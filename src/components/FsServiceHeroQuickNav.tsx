"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FS_SERVICE_QUICK_LINKS, normalizeFsPath } from "@/lib/fs-service-navigation"

export const fsServiceHeroPillLinkClass =
  "quick-nav-pill-shimmer inline-flex min-h-[44px] w-full max-w-full items-center justify-center rounded-tl-xl rounded-br-xl border border-white/40 bg-black/45 px-2 py-1.5 text-center text-[10px] font-semibold leading-snug tracking-tight text-white/95 backdrop-blur-sm transition-[border-color,color] duration-300 hover:border-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:min-h-0 sm:min-w-0 sm:px-4 sm:py-2 sm:text-sm"

const pillClass = fsServiceHeroPillLinkClass

/** Same horizontal scroll + equal-width mobile pills as MEP service hero quick nav. */
export function FsServiceHeroQuickNav() {
  const path = normalizeFsPath(usePathname())
  const items = FS_SERVICE_QUICK_LINKS.filter((l) => l.href !== path)

  return (
    <nav aria-label="Other services" className="w-full min-w-0">
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">Quick navigation</p>
      <div className="-mx-4 w-full min-w-0 max-w-full sm:-mx-0">
        <ul
          data-lenis-prevent=""
          className="flex max-w-full min-w-0 touch-pan-x flex-nowrap items-stretch gap-2 overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-smooth px-4 pb-0.5 scrollbar-hide sm:gap-2.5 sm:px-0"
        >
          {items.map(({ href, label }) => (
            <li
              key={href}
              className="inline-flex w-[8.5rem] min-w-[8.5rem] max-w-[8.5rem] shrink-0 sm:w-auto sm:min-w-0 sm:max-w-none"
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
