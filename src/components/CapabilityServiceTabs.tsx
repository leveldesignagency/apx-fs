"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Fragment } from "react"

const TABS = [
  { href: "/services/fire-life-safety", label: "Fire & life safety" },
  { href: "/services/security-systems", label: "Security systems" },
  { href: "/services/monitoring", label: "Monitoring" },
  { href: "/services/maintenance-support", label: "Maintenance" },
  { href: "/services/emergency-call-out", label: "24/7 Call-Out" },
] as const

/** Tab links only, border lives on parent `.fs-capability-unified` / `.fs-capability-tabs-row` */
export function CapabilityServiceTabs() {
  const pathname = usePathname()

  return (
    <nav
      className="fs-capability-tabs-nav flex flex-wrap items-center justify-start gap-x-2 gap-y-2 sm:gap-x-3"
      aria-label="Switch service area"
    >
      {TABS.map(({ href, label }, index) => {
        const active = pathname === href
        return (
          <Fragment key={href}>
            {index > 0 ? (
              <span className="fs-capability-tab-sep select-none text-white/35" aria-hidden>
                |
              </span>
            ) : null}
            <Link
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
          </Fragment>
        )
      })}
    </nav>
  )
}
