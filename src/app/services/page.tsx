"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { useState } from "react"

const HERO_ACCREDITATIONS = [
  { src: "/accreditations%20mono/White/NSI-02.svg", alt: "NSI Gold", width: 150, height: 64 },
  { src: "/accreditations%20mono/White/BAFE-02.svg", alt: "BAFE", width: 150, height: 64 },
  { src: "/accreditations%20mono/White/ConstructionOnline-02.svg", alt: "Constructionline", width: 150, height: 64 },
  { src: "/accreditations%20mono/White/FIA-02.svg", alt: "FIA", width: 150, height: 64 },
] as const

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
    <main className="min-h-screen bg-black text-white pt-28 pb-20">
      <section className="container mx-auto px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <div className="min-w-0 max-w-3xl">
            <span className="section-label text-white/75">Services</span>
            <h1 className="mt-3 text-4xl font-title font-bold tracking-tight text-white normal-case sm:text-5xl lg:text-6xl [line-height:0.9]">
              APX Fire &amp; Security Services
            </h1>
          </div>
          <div
            className="flex flex-shrink-0 flex-wrap items-center justify-start gap-6 sm:gap-8 lg:justify-end lg:gap-10"
            aria-label="Accreditations"
          >
            {HERO_ACCREDITATIONS.map((acc) => (
              <div
                key={acc.alt}
                className="flex h-12 w-auto max-w-[120px] items-center justify-center sm:h-14 sm:max-w-[140px] lg:h-16 lg:max-w-[160px]"
              >
                <Image
                  src={acc.src}
                  alt={acc.alt}
                  width={acc.width}
                  height={acc.height}
                  className="h-full w-auto object-contain opacity-90"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="border-y border-white/25">
          {SERVICE_ROWS.map((service, index) => {
            const expanded = hoveredIndex === index
            return (
              <article
                key={service.title}
                className="border-b border-white/20 last:border-b-0"
                onMouseEnter={() => setHoveredIndex(index)}
                onFocusCapture={() => setHoveredIndex(index)}
              >
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
                  <p className="pr-4 text-sm leading-relaxed text-white/75 sm:text-base">
                    {service.description}
                  </p>
                  <Link
                    href={service.href}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-tl-xl rounded-br-xl border border-white px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors hover:bg-white hover:text-black sm:text-sm"
                  >
                    {service.cta}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}
