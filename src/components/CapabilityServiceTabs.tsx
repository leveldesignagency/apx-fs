"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const TABS = [
  { href: "/services/fire-life-safety", label: "Fire & life safety" },
  { href: "/services/security-systems", label: "Security systems" },
  { href: "/services/maintenance-support", label: "Maintenance & support" },
] as const

/** Tab links only — border lives on parent `.fs-capability-unified` / `.fs-capability-tabs-row` */
export function CapabilityServiceTabs() {
  const pathname = usePathname()

  return (
    <nav
      className="fs-capability-tabs-nav flex flex-wrap items-center justify-start gap-2 sm:gap-2.5"
      aria-label="Switch service area"
    >
      {TABS.map(({ href, label }) => {
        const active = pathname === href
        return (
          <Link
            key={href}
            href={href}
            className={
              active
                ? "fs-capability-tab-link fs-capability-tab-link--active"
                : "fs-capability-tab-link"
            }
            aria-current={active ? "page" : undefined}
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
