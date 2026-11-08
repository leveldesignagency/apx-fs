"use client"

import Link from "next/link"
import { Reveal } from "@/components/Reveal"
import { ServiceItemReveal } from "@/components/ServiceItemReveal"
import { useState } from "react"
import { FS_SERVICE_NAV_LINKS } from "@/lib/fs-service-navigation"

const SERVICE_BLURBS: Record<string, string> = {
  "/services/intruder-alarm-systems":
    "Grade 2 and Grade 3 intruder systems with detection, monitoring integration, and clear handover documentation.",
  "/services/fire-alarm-systems":
    "Addressable and conventional fire alarm systems with full cause-and-effect testing, certification, and compliant delivery.",
  "/services/cctv-systems":
    "Commercial-first CCTV: IP systems, HD analogue upgrades, remote viewing, recording and retention, camera health monitoring, ANPR and analytics where offered, network segregation, maintenance and repairs.",
  "/services/access-control-systems":
    "Fob/card and keypad access, single-door and networked systems, multi-tenant control, fire-release interfaces where designed, video entry and gate integration, plus maintenance and takeovers.",
  "/services/video-door-entry-systems":
    "Audio and video entry for single residences and multi-occupancy buildings: IP/networked systems, concierge and mobile answering where available, access control and gate integration, maintenance and upgrades.",
  "/services/gate-automation-systems":
    "Automated swing and sliding gates, vehicle barriers and perimeter control, with safety devices and integration to access control and CCTV.",
  "/services/pava":
    "PAVA (public address and voice alarm) systems to BS 5839-8: zoned and phased messaging, fire alarm integration, amplifiers and loudspeakers, cause-and-effect testing, commissioning and maintenance.",
  "/services/evac":
    "EVAC evacuation alert systems to BS 8629 for buildings containing flats: design, installation, commissioning and maintenance, separate from PAVA voice alarm.",
  "/services/refuge-disabled-communication":
    "Disabled refuge systems, fire telephone systems, disabled toilet alarms and central control panels with two-way communication, BS 5839-9 design, commissioning, testing and maintenance.",
  "/services/monitoring":
    "Alarm receiving centre (ARC) signalling, dual-path options and remote monitoring pathways for intruder, fire and CCTV systems.",
  "/services/maintenance-support":
    "Planned preventative maintenance, repairs and upgrades covering fire alarms, CCTV, access control, intruder alarms and video entry.",
  "/services/emergency-call-out":
    "24/7 emergency engineer call-out for contracted customers, with ad-hoc attendance discussed case by case for non-contracted sites.",
}

const SERVICE_ROWS = FS_SERVICE_NAV_LINKS.map((link) => ({
  title: link.label,
  href: link.href,
  description:
    SERVICE_BLURBS[link.href] ??
    `Design, installation and support for ${link.label.toLowerCase()}.`,
}))

export function ServicesHubClient() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0)

  return (
    <div className="services-hub-page min-h-screen overflow-x-hidden bg-black text-white">
      <div className="h-[0.75px] w-full bg-white/30" aria-hidden />

      <main className="pb-20">
        <section className="site-container page-title-top">
          <Reveal>
            <h1 className="font-title text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-6xl lg:text-7xl">
              APX Fire & Security Services
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-300 md:text-lg">
              Design, installation, commissioning and maintenance of Fire and Security systems across London and the Home Counties, listed in the same order as our site menu.
            </p>
          </Reveal>

          <p className="section-label mt-12 text-white/75">Browse</p>

          <div className="mt-8 border-y border-white/20">
            {SERVICE_ROWS.map((service, index) => {
              const expanded = hoveredIndex === index
              return (
                <ServiceItemReveal key={service.title} index={index} className="h-full min-h-0">
                  <Link
                    href={service.href}
                    className="services-hub-row group relative block overflow-visible border-b border-white/20 last:border-b-0 bg-transparent text-inherit no-underline outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onFocus={() => setHoveredIndex(index)}
                  >
                    <span className="services-hub-row__wash" aria-hidden />
                    <article className="relative z-[1]">
                      <div className="py-5">
                        <h2 className="font-title text-2xl font-semibold tracking-tight text-white normal-case sm:text-3xl lg:text-4xl [line-height:1]">
                          {service.title}
                        </h2>
                      </div>
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          expanded ? "max-h-40 pb-6 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className="max-w-3xl text-left text-sm leading-relaxed text-gray-300 sm:text-base">
                          {service.description}
                        </p>
                      </div>
                    </article>
                  </Link>
                </ServiceItemReveal>
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}
