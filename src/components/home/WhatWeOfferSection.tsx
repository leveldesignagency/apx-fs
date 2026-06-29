"use client"

import { useState } from "react"
import { CustomPillButton } from "@/components/ui/CustomPillButton"

export type WhatWeOfferItem = {
  tabLabel: string
  tagLabel: string
  headline: string
  description: string
  image: string
  href: string
  features: [string, string, string]
}

const OFFERS: WhatWeOfferItem[] = [
  {
    tabLabel: "CCTV",
    tagLabel: "CCTV systems",
    headline: "CCTV design, installation & commissioning",
    description:
      "IP and HD analogue systems specified for your site, camera placement, secure recording, network segregation and handover documentation aligned with NSI Gold expectations.",
    image: "/cctv%20systems.jpg",
    href: "/services/cctv-systems",
    features: [
      "Site survey & risk-based coverage",
      "Recording, retention & GDPR-aware setup",
      "Remote viewing & health monitoring",
    ],
  },
  {
    tabLabel: "Access",
    tagLabel: "Access control",
    headline: "Electronic access control & door security",
    description:
      "Cards, fobs and readers on single doors or fully networked estates, permissions, anti-passback and audit trails for commercial, retail and multi-tenant sites.",
    image: "/access%20control%20systems.jpg",
    href: "/services/access-control-systems",
    features: [
      "Door hardware & reader integration",
      "Networked permissions & events",
      "Visitor and contractor workflows",
    ],
  },
  {
    tabLabel: "Intruder",
    tagLabel: "Intruder alarms",
    headline: "Intruder detection to BS EN standards",
    description:
      "Grade 2 and Grade 3 systems from flats and houses to monitored commercial premises, detectors, signalling and documentation delivered to NSI Gold workmanship.",
    image: "/intruder%20alarm%20systems.jpg",
    href: "/services/intruder-alarm-systems",
    features: [
      "Detection design & zoning",
      "Signalling & ARC integration",
      "Commissioning & user handover",
    ],
  },
  {
    tabLabel: "Fire",
    tagLabel: "Fire detection",
    headline: "Fire alarm detection & life safety",
    description:
      "Conventional and addressable fire alarm systems for offices, schools, care and industrial sites, cause and effect, testing and certification to BS 5839.",
    image: "/home-fire-alarm-system-installer-800x533.jpg",
    href: "/services/fire-alarm-systems",
    features: [
      "Addressable & conventional systems",
      "Cause-and-effect & testing records",
      "Commissioning & certification support",
    ],
  },
  {
    tabLabel: "Video entry",
    tagLabel: "Video door entry",
    headline: "Video door entry & visitor identification",
    description:
      "Audio and video entry systems for single dwellings through to multi-user blocks, clear identification at the door, with options to tie into wider access control.",
    image: "/video%20door%20entry%20systems.jpg",
    href: "/services/video-door-entry-systems",
    features: [
      "Single-door and multi-tenant panels",
      "IP and legacy upgrades",
      "Integration with access & door locks",
    ],
  },
]

export function WhatWeOfferSection() {
  const [active, setActive] = useState(0)
  const item = OFFERS[active]!

  return (
    <div className="fs-what-we-offer w-full space-y-8 lg:space-y-10">
      <div className="space-y-0">
        <span className="section-label text-white">Services</span>
        <h2 className="home-section-title section-title-gap services-section-title text-left font-title text-white">
          Security designed around your site
        </h2>
        <p className="text-base leading-relaxed max-w-xl section-intro-gap hero-services-intro text-white">
          APX FS is your NSI Gold security system installer. We specialise in the design, installation and maintenance of bespoke integrated security systems within
          London and the Home Counties.
        </p>
      </div>

      {/* Full-width scroll on small screens, equal tab widths, same idea as MEP what-we-offer strip */}
      <div className="-mx-4 w-full min-w-0 max-w-full sm:-mx-6 lg:mx-0">
        <div
          data-lenis-prevent=""
          role="tablist"
          aria-label="Service categories"
          className="flex max-w-full min-w-0 touch-pan-x snap-x snap-mandatory flex-nowrap gap-2 overflow-x-auto overflow-y-hidden scroll-smooth overscroll-x-contain px-4 pb-2 scrollbar-hide sm:gap-2.5 sm:px-6 md:grid md:min-w-0 md:max-w-full md:grid-cols-5 md:gap-2 md:overflow-x-visible md:px-0 lg:gap-3"
        >
          {OFFERS.map((o, i) => {
            const isSelected = i === active
            return (
              <button
                key={o.tabLabel}
                type="button"
                role="tab"
                aria-selected={isSelected}
                id={`fs-offer-tab-${i}`}
                aria-controls={`fs-offer-panel-${i}`}
                onClick={() => setActive(i)}
                className={`fs-offer-tab flex h-12 min-h-[44px] w-[7.75rem] min-w-[7.75rem] max-w-[7.75rem] flex-none snap-start items-center justify-center rounded-full border-2 px-2.5 py-2 text-center text-xs font-semibold uppercase leading-snug tracking-wide transition-all duration-300 ease-out sm:min-w-[8.75rem] sm:max-w-[8.75rem] sm:w-[8.75rem] sm:text-sm md:col-span-1 md:h-12 md:min-h-[44px] md:w-full md:min-w-0 md:max-w-none md:px-3 md:text-sm ${
                  isSelected ? "fs-offer-tab--active" : "fs-offer-tab--inactive"
                }`}
              >
                <span className="fs-offer-tab__label line-clamp-2 text-balance sm:line-clamp-none sm:px-1 md:whitespace-normal">
                  {o.tabLabel}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div
        role="tabpanel"
        id={`fs-offer-panel-${active}`}
        aria-labelledby={`fs-offer-tab-${active}`}
        className="apx-home-card-light-edge overflow-hidden rounded-tl-[1.5rem] rounded-br-[1.5rem] border-2 border-white bg-black"
      >
        <div className="relative min-h-[min(520px,85vh)] lg:min-h-[440px]">
          <div
            className="absolute inset-0 bg-cover bg-center transition-[opacity,transform] duration-500 ease-out"
            style={{ backgroundImage: `url('${item.image}')` }}
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/75 to-black/85 lg:bg-gradient-to-r lg:from-black/[0.88] lg:via-black/45 lg:to-black/20"
            aria-hidden
          />

          <div className="relative grid gap-0 lg:min-h-[440px] lg:grid-cols-[1.1fr_0.9fr]">
            <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
              <div className="mb-5 inline-flex w-fit items-center justify-center rounded-full border-2 border-white/70 bg-black/50 py-1.5 pl-4 pr-[calc(1rem+0.12em)] text-center text-xs font-semibold uppercase tracking-[0.12em] text-white sm:pl-5 sm:pr-[calc(1.25rem+0.12em)] sm:text-sm">
                {item.tagLabel}
              </div>

              <h3 className="font-title text-2xl font-bold leading-[1.03] tracking-tight text-white sm:text-3xl md:text-[clamp(1.75rem,4vw,2.75rem)]">
                {item.headline}
              </h3>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white sm:text-lg">{item.description}</p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <CustomPillButton href={item.href} size="md">
                  Find out more
                </CustomPillButton>
                <CustomPillButton href="/contact" variant="outline" size="md">
                  Contact
                </CustomPillButton>
              </div>
            </div>

            <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-10 lg:py-14 lg:pl-6">
              <p data-offer-features="label" className="text-sm font-bold uppercase tracking-[0.2em] text-white">
                The features
              </p>
              <ul className="mt-5 space-y-3">
                {item.features.map((line) => (
                  <li
                    key={line}
                    data-offer-feature
                    className="rounded-xl border border-white/30 bg-black/45 px-4 py-3 text-base leading-snug text-white backdrop-blur-[6px]"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
