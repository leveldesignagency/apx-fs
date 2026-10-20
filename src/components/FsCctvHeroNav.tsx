"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FS_CCTV_TAB_LINKS, normalizeFsPath } from "@/lib/fs-service-navigation"
import { fsServiceHeroPillLinkClass } from "@/components/FsServiceHeroQuickNav"

const activePillClass = "border-white/85 bg-black/65 ring-1 ring-white/40"

type CctvNavLink = { href: string; label: string }

type FsCctvHeroNavProps = {
  /** Defaults to Domestic / Commercial / Useful advice; pass camera-type links from `cctvCameraTypePages` on guide pages. */
  links?: readonly CctvNavLink[]
  eyebrow?: string
  ariaLabel?: string
}

/** Bottom-of-hero CCTV pills, same layout and style as FsServiceHeroQuickNav */
export function FsCctvHeroNav({
  links = FS_CCTV_TAB_LINKS,
  eyebrow = "Quick navigation — scroll for more",
  ariaLabel = "CCTV section",
}: FsCctvHeroNavProps) {
  const path = normalizeFsPath(usePathname())

  return (
    <nav aria-label={ariaLabel} className="w-full min-w-0 max-w-full overflow-hidden">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/45">{eyebrow}</p>
      <div className="w-full min-w-0 max-w-full">
        <ul
          data-lenis-prevent=""
          className="flex max-w-full min-w-0 flex-nowrap items-stretch gap-2 touch-pan-x overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-smooth pb-0.5 scrollbar-hide sm:flex-wrap sm:overflow-visible sm:overscroll-auto sm:scroll-auto sm:touch-auto sm:gap-2.5"
        >
          {links.map(({ href, label }) => {
            const active = path === href
            return (
              <li
                key={href}
                className="inline-flex w-[9.25rem] min-w-[9.25rem] max-w-[9.25rem] shrink-0 sm:w-auto sm:min-w-0 sm:max-w-none"
              >
                <Link
                  href={href}
                  className={`${fsServiceHeroPillLinkClass} ${active ? activePillClass : ""} sm:min-w-0 sm:w-auto sm:shrink-0`}
                  aria-current={active ? "page" : undefined}
                >
                  <span className="relative z-10 line-clamp-2 text-balance sm:line-clamp-none">{label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
