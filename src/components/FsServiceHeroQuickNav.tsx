"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FS_SERVICE_QUICK_LINKS, normalizeFsPath } from "@/lib/fs-service-navigation"

/** Shared by service quick nav + CCTV hero pills */
export const fsServiceHeroPillLinkClass =
  "inline-flex items-center rounded-tl-xl rounded-br-xl border border-white/40 bg-black/45 px-3 py-1.5 text-xs font-semibold tracking-tight text-white/95 backdrop-blur-sm transition-colors hover:border-white/70 hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:px-4 sm:py-2 sm:text-sm"

const pillClass = fsServiceHeroPillLinkClass

/** Horizontal pill links at the bottom of the service hero — other services only (no capability pillars) */
export function FsServiceHeroQuickNav() {
  const path = normalizeFsPath(usePathname())
  const items = FS_SERVICE_QUICK_LINKS.filter((l) => l.href !== path)

  return (
    <nav aria-label="Other services" className="w-full min-w-0">
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">Quick navigation</p>
      <ul className="flex flex-wrap items-center gap-2 sm:gap-2.5">
        {items.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className={pillClass}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
