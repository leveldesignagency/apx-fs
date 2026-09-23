"use client"

import Link from "next/link"
import { Reveal } from "@/components/Reveal"
import { ServiceItemReveal } from "@/components/ServiceItemReveal"
import { ArrowUpRight } from "lucide-react"
import { useState } from "react"
import { FS_SERVICE_NAV_LINKS } from "@/lib/fs-service-navigation"

const SERVICE_BLURBS: Record<string, { description: string; cta: string }> = {
  "/services/intruder-alarm-systems": {
    description:
      "Grade 2 and Grade 3 intruder systems with detection, monitoring integration, and clear handover documentation.",
    cta: "Go to intruder alarms",
  },
  "/services/fire-alarm-systems": {
    description:
      "Addressable and conventional fire alarm systems with full cause-and-effect testing, certification, and compliant delivery.",
    cta: "Go to fire alarms",
  },
  "/services/cctv-systems": {
    description:
      "Commercial-first CCTV: IP systems, HD analogue upgrades, remote viewing, recording and retention, camera health monitoring, ANPR and analytics where offered, network segregation, maintenance and repairs.",
    cta: "Go to CCTV systems",
  },
  "/services/access-control-systems": {
    description:
      "Fob/card and keypad access, single-door and networked systems, multi-tenant control, fire-release interfaces where designed, video entry and gate integration, plus maintenance and takeovers.",
    cta: "Go to access control",
  },
  "/services/video-door-entry-systems": {
    description:
      "Audio and video entry for single residences and multi-occupancy buildings: IP/networked systems, concierge and mobile answering where available, access control and gate integration, maintenance and upgrades.",
    cta: "Go to video door entry",
  },
  "/services/gate-automation-systems": {
    description:
      "Automated swing and sliding gates, vehicle barriers and perimeter control, with safety devices and integration to access control and CCTV.",
    cta: "Go to gate automation",
  },
  "/services/evac-voice-evacuation": {
    description:
      "EVAC / voice alarm systems to BS 5839-8: zoned and phased messaging, fire alarm integration, amplifiers and loudspeakers, cause-and-effect testing, commissioning and maintenance, including PA/VA where applicable.",
    cta: "Go to EVAC & Voice",
  },
  "/services/refuge-disabled-communication": {
    description:
      "Disabled refuge systems, fire telephone systems, disabled toilet alarms and central control panels with two-way communication, BS 5839-9 design, commissioning, testing and maintenance.",
    cta: "Go to refuge, fire telephone & toilet alarms",
  },
  "/services/monitoring": {
    description:
      "Alarm receiving centre (ARC) signalling, dual-path options and remote monitoring pathways for intruder, fire and CCTV systems.",
    cta: "Go to monitoring",
  },
  "/services/maintenance-support": {
    description:
      "Planned preventative maintenance, repairs and upgrades covering fire alarms, CCTV, access control, intruder alarms and video entry.",
    cta: "Go to maintenance & repairs",
  },
  "/services/emergency-call-out": {
    description:
      "24/7 emergency engineer call-out for contracted customers, with ad-hoc attendance discussed case by case for non-contracted sites.",
    cta: "Go to 24/7 call-out",
  },
}

const SERVICE_ROWS = FS_SERVICE_NAV_LINKS.map((link) => {
  const blurb = SERVICE_BLURBS[link.href] ?? {
    description: `Design, installation and support for ${link.label.toLowerCase()}.`,
    cta: `Go to ${link.shortLabel.toLowerCase()}`,
  }
  return {
    title: link.label,
    href: link.href,
    description: blurb.description,
    cta: blurb.cta,
  }
})

export default function ServicesHubPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0)

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <div className="h-[0.75px] w-full bg-white/30" aria-hidden />

      <main className="pb-20">
        <section className="container mx-auto px-6 page-title-top lg:px-8">
          <Reveal>
            <h1 className="font-title text-4xl font-bold tracking-tight text-white md:text-5xl">
              APX Fire & Security Services
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-300 md:text-lg">
              Design, installation, commissioning and maintenance of fire and security systems across London and the Home Counties, ordered by the systems we install most often.
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
                        className={`grid grid-cols-1 items-center gap-5 overflow-hidden transition-all duration-300 md:grid-cols-[1fr_auto] ${
                          expanded ? "max-h-40 pb-6 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className="pr-4 text-left text-sm leading-relaxed text-gray-300 sm:text-base">
                          {service.description}
                        </p>
                        <span className="services-hub-row__cta pill-btn pill-btn--corners-sm relative inline-flex items-center justify-center gap-2 self-start overflow-hidden whitespace-nowrap bg-black px-4 py-2 text-xs font-semibold uppercase tracking-wide sm:text-sm md:self-center">
                          <span className="pill-btn-inner" aria-hidden />
                          <span className="pill-btn-border" aria-hidden />
                          <span className="pill-text relative z-[1] inline-flex items-center gap-2 font-semibold">
                            {service.cta}
                            <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
                          </span>
                        </span>
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
