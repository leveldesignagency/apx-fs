"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FS_CCTV_TAB_LINKS, normalizeFsPath } from "@/lib/fs-service-navigation"
import { fsServiceHeroPillLinkClassLg } from "@/components/FsServiceHeroQuickNav"

const activePillClass = "border-white/85 bg-black/65 ring-1 ring-white/40"

/** Domestic / commercial / useful advice pills under the hero intro on CCTV subpages */
export function FsCctvSubpageHeroButtons() {
  const path = normalizeFsPath(usePathname())

  return (
    <nav aria-label="CCTV section" className="mt-6 sm:mt-7">
      <ul className="flex flex-wrap gap-2.5 sm:gap-3">
        {FS_CCTV_TAB_LINKS.map(({ href, label }) => {
          const active = path === href
          return (
            <li key={href}>
              <Link
                href={href}
                className={`${fsServiceHeroPillLinkClassLg} ${active ? activePillClass : ""}`}
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
