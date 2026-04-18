"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { useState } from "react"

const SERVICE_ROWS = [
  {
    title: "CCTV systems",
    description:
      "IP and analogue CCTV design, installation, and commissioning with remote monitoring, retention setup, and secure network integration.",
    href: "/services/electrical-systems",
    cta: "Go to CCTV systems",
  },
  {
    title: "Access control systems",
    description:
      "Door access, fob/card permissions, and networked control built for commercial and multi-tenant environments.",
    href: "/services/energy-efficiency",
    cta: "Go to access control",
  },
  {
    title: "Intruder alarm systems",
    description:
      "Grade 2 and Grade 3 intruder systems with detection, monitoring integration, and clear handover documentation.",
    href: "/services/sustainability",
    cta: "Go to intruder alarms",
  },
  {
    title: "Fire alarm systems",
    description:
      "Addressable and conventional fire alarm systems with full cause-and-effect testing, certification, and compliant delivery.",
    href: "/services/mechanical-engineering",
    cta: "Go to fire alarms",
  },
  {
    title: "Refuge & disabled communication systems",
    description:
      "Emergency voice communication (EVC) — disabled refuge points, fire telephones, toilet alarms and central panels to BS 5839-9.",
    href: "/services/refuge-disabled-communication",
    cta: "Go to refuge & EVC",
  },
  {
    title: "EVAC & voice evacuation systems",
    description:
      "Voice evacuation and PA integration with zoned messaging, amplifiers and speakers — aligned with BS 5839-8 and your fire strategy.",
    href: "/services/evac-voice-evacuation",
    cta: "Go to EVAC & voice",
  },
  {
    title: "Video door entry systems",
    description:
      "Video entry and door access systems from single-door installations through to integrated, multi-user deployments.",
    href: "/services/maintenance",
    cta: "Go to video door entry",
  },
  {
    title: "Fire & life safety systems",
    description:
      "Expanded fire and life safety scope covering fire alarms, EVAC and voice evacuation, and refuge and disabled communication.",
    href: "/services/fire-life-safety",
    cta: "Go to fire & life safety",
  },
  {
    title: "Maintenance & support",
    description:
      "Planned preventative maintenance, 24/7 call-out support, upgrades, and compliance checks for critical systems.",
    href: "/services/maintenance-support",
    cta: "Go to maintenance & support",
  },
]

export default function ServicesHubPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0)

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <div className="h-[0.75px] w-full bg-white/30" aria-hidden />

      <main className="pb-20">
        <section className="container mx-auto px-6 page-title-top lg:px-8">
          <h1 className="font-title text-4xl font-bold tracking-tight text-white md:text-5xl">
            APX Fire & Security Services
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-300 md:text-lg">
            Design, installation, commissioning and maintenance of fire and security systems across London and the Home Counties — from CCTV and access control to intruder alarms, fire alarms and ongoing support.
          </p>

          <p className="section-label mt-12 text-white/75">Browse</p>

          <div className="mt-8 border-y border-white/20">
            {SERVICE_ROWS.map((service, index) => {
              const expanded = hoveredIndex === index
              return (
                <Link
                  key={service.title}
                  href={service.href}
                  className="group relative block overflow-visible border-b border-white/20 last:border-b-0 bg-transparent text-inherit no-underline outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onFocus={() => setHoveredIndex(index)}
                >
                  <span
                    className="pointer-events-none absolute inset-y-0 left-1/2 z-0 w-screen -translate-x-1/2 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.02)_18%,rgba(255,255,255,0.035)_50%,rgba(255,255,255,0.02)_82%,transparent_100%)] opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
                    aria-hidden
                  />
                  <article className="relative z-[1]">
                    <div className="py-5">
                      <h2 className="font-title text-2xl font-semibold tracking-tight text-white normal-case sm:text-3xl lg:text-4xl [line-height:1]">
                        {service.title}
                      </h2>
                    </div>
                    <div
                      className={`grid grid-cols-1 items-center gap-5 overflow-hidden transition-all duration-300 md:grid-cols-[1fr_auto] ${
                        expanded ? "max-h-40 pb-6 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="pr-4 text-left text-sm leading-relaxed text-gray-300 sm:text-base">{service.description}</p>
                      <span className="inline-flex items-center justify-center gap-2 self-start whitespace-nowrap rounded-tl-xl rounded-br-xl border border-white/30 bg-transparent px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition-colors duration-300 group-hover:border-white group-hover:bg-white group-hover:text-black sm:text-sm md:self-center">
                        {service.cta}
                        <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
                      </span>
                    </div>
                  </article>
                </Link>
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}
