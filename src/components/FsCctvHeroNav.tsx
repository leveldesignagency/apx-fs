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

/** Bottom-of-hero CCTV pills — same layout and style as FsServiceHeroQuickNav */
export function FsCctvHeroNav({
  links = FS_CCTV_TAB_LINKS,
  eyebrow = "Quick navigation",
  ariaLabel = "CCTV section",
}: FsCctvHeroNavProps) {
  const path = normalizeFsPath(usePathname())

  return (
    <nav aria-label={ariaLabel} className="w-full min-w-0">
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">{eyebrow}</p>
      <ul className="flex flex-wrap items-center gap-2 sm:gap-2.5">
        {links.map(({ href, label }) => {
          const active = path === href
          return (
            <li key={href}>
              <Link
                href={href}
                className={`${fsServiceHeroPillLinkClass} ${active ? activePillClass : ""}`}
                aria-current={active ? "page" : undefined}
              >
                <span className="relative z-10">{label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
