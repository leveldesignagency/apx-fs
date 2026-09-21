"use client"

import { useEffect, useState, type CSSProperties } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { CustomPillButton } from "@/components/ui/CustomPillButton"
import { LetterReveal } from "@/components/LetterReveal"
import { LineReveal } from "@/components/LineReveal"
import { FS_SERVICE_NAV_LINKS } from "@/lib/fs-service-navigation"
import { cn } from "@/lib/utils"

export type WhatWeOfferItem = {
  tabLabel: string
  tagLabel: string
  headline: string
  description: string
  image: string
  href: string
  features: [string, string, string]
}

/** Popularity order: Intruder / Fire / CCTV / Access / Video entry / Gates */
const OFFERS: WhatWeOfferItem[] = [
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
    tabLabel: "Video entry",
    tagLabel: "Video door entry",
    headline: "Video door entry & visitor identification",
    description:
      "Audio and video entry systems for single dwellings through to multi-user blocks, clear identification at the door, with options to tie into wider access control.",
    image: "/projects/library/home-video-door-entry-system-installer.jpg",
    href: "/services/video-door-entry-systems",
    features: [
      "Single-door and multi-tenant panels",
      "IP and legacy upgrades",
      "Integration with access & door locks",
    ],
  },
  {
    tabLabel: "Gates",
    tagLabel: "Gate automation",
    headline: "Automated gates & vehicle barriers",
    description:
      "Swing and sliding gate operators, rising barriers and safety devices for commercial and residential entrances, integrated with access control and CCTV where required.",
    image: "/access%20control%20systems.jpg",
    href: "/services/gate-automation-systems",
    features: [
      "Swing, sliding & barrier control",
      "Safety devices to BS EN 12453",
      "Access control & CCTV integration",
    ],
  },
]

const INTRO_COPY =
  "APX Fire & Security is an NSI Gold-approved specialist in fire, life-safety and electronic security systems. We design, install and maintain integrated solutions across London and the Home Counties, including monitoring and 24/7 call-out support."

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n))
}

export function WhatWeOfferSection() {
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  const [desktopPlay, setDesktopPlay] = useState(false)
  const [isMobile, setIsMobile] = useState<boolean | null>(null)
  const [reduceMotion, setReduceMotion] = useState(false)
  const item = OFFERS[active]!
  const count = OFFERS.length
  const linkCount = FS_SERVICE_NAV_LINKS.length
  const mobile = isMobile === true
  const desktop = isMobile === false
  const viewportReady = isMobile !== null

  const goPrev = () => setActive((i) => (i - 1 + count) % count)
  const goNext = () => setActive((i) => (i + 1) % count)

  useEffect(() => {
    const mqMobile = window.matchMedia("(max-width: 767.98px)")
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => {
      setIsMobile(mqMobile.matches)
      setReduceMotion(mqReduce.matches)
    }
    sync()
    mqMobile.addEventListener("change", sync)
    mqReduce.addEventListener("change", sync)
    return () => {
      mqMobile.removeEventListener("change", sync)
      mqReduce.removeEventListener("change", sync)
    }
  }, [])

  // Mobile: scroll progress through first half of #services → sequence completes by mid-section
  useEffect(() => {
    if (!mobile || reduceMotion) {
      if (reduceMotion) setProgress(1)
      return
    }
    const section = document.getElementById("services")
    if (!section) return

    const update = () => {
      const r = section.getBoundingClientRect()
      const vh = window.innerHeight
      // 0 when section top approaches mid-viewport; 1 after scrolling half the section height
      const start = vh * 0.75
      const distance = Math.max(r.height * 0.5, vh * 0.45)
      const raw = (start - r.top) / distance
      setProgress(clamp01(raw))
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [mobile, reduceMotion])

  // Desktop: one-shot timed sequence on intersect
  useEffect(() => {
    if (!desktop || reduceMotion) {
      if (reduceMotion) setDesktopPlay(true)
      return
    }
    const section = document.getElementById("services")
    if (!section) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setDesktopPlay(true)
          io.disconnect()
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    )
    io.observe(section)
    return () => io.disconnect()
  }, [desktop, reduceMotion])

  // Scroll map (mobile): title → para → links → panel, complete by progress=1 (half section)
  const showTitle =
    reduceMotion || (viewportReady && (mobile ? progress >= 0.02 : desktopPlay))
  const showPara =
    reduceMotion || (viewportReady && (mobile ? progress >= 0.14 : desktopPlay))
  const showLink = (i: number) => {
    if (reduceMotion) return true
    if (!viewportReady) return false
    if (!mobile) return desktopPlay
    const start = 0.22
    const span = 0.42
    return progress >= start + (span * (i + 1)) / linkCount
  }
  const showTab = (i: number) => {
    if (reduceMotion) return true
    if (!viewportReady) return false
    if (!mobile) return desktopPlay
    return false
  }
  // Mobile has no tabs — panel rises after the list as the final beat
  const showPanel =
    reduceMotion || (viewportReady && (mobile ? progress >= 0.72 : true))

  const tabDelayStyle = (i: number): CSSProperties =>
    desktop && desktopPlay && !reduceMotion
      ? ({ "--tab-delay": `${520 + linkCount * 50 + i * 95}ms` } as CSSProperties)
      : ({ "--tab-delay": "0ms" } as CSSProperties)

  const desktopDelay = (base: number) =>
    desktop && desktopPlay && !reduceMotion ? { transitionDelay: `${base}ms` } : undefined

  return (
    <div className="fs-what-we-offer w-full space-y-8 lg:space-y-10">
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 xl:gap-16">
        <div className="min-w-0 space-y-0">
          <span className="section-label text-white">Services</span>
          <LetterReveal
            as="h2"
            text={"Security designed\naround your site"}
            className={cn(
              "home-section-title section-title-gap services-section-title text-left font-title text-white",
              mobile && "fs-offer-seq__title",
              mobile && showTitle && "is-in"
            )}
            active={showTitle}
            staggerMs={18}
          />
          <LineReveal
            as="p"
            text={INTRO_COPY}
            className={cn(
              "max-w-xl text-sm leading-relaxed section-intro-gap hero-services-intro text-white sm:text-base",
              mobile && "fs-offer-seq__para",
              mobile && showPara && "is-in"
            )}
            active={showPara}
            staggerMs={65}
            delayMs={mobile ? 0 : 160}
          />
        </div>

        <nav className="fs-offer-all-services-aside min-w-0 lg:pt-8" aria-label="All services">
          <ul className="fs-offer-all-services grid grid-cols-2 gap-x-6 gap-y-2.5 sm:gap-x-8 sm:gap-y-3">
            {FS_SERVICE_NAV_LINKS.map(({ href, shortLabel }, i) => (
              <li
                key={href}
                className={cn("min-w-0 fs-offer-seq__link", showLink(i) && "is-in")}
                style={desktopDelay(280 + i * 55)}
              >
                <Link href={href} className="fs-offer-all-services__link">
                  {shortLabel}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="fs-offer-folder w-full min-w-0">
        <div
          className={cn(
            "fs-offer-mobile-nav mb-3 flex items-center justify-start gap-3 md:hidden fs-offer-seq__panel",
            showPanel && "is-in"
          )}
        >
          <button
            type="button"
            onClick={goPrev}
            className="fs-offer-mobile-nav__btn flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white text-white transition-colors"
            aria-label="Previous service"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="fs-offer-mobile-nav__btn flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white text-white transition-colors"
            aria-label="Next service"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <span className="sr-only" aria-live="polite">
            {item.tabLabel}
          </span>
        </div>

        <div
          role="tablist"
          aria-label="Service categories"
          className="fs-offer-tablist relative z-[1] hidden md:flex md:flex-nowrap md:items-end md:gap-2 md:overflow-visible lg:gap-2.5"
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
                className={cn(
                  "fs-offer-tab fs-offer-seq__tab flex h-12 min-h-[44px] w-full flex-1 items-center justify-center rounded-t-xl rounded-b-none border-2 border-b-0 px-3 py-2 text-center text-sm font-semibold uppercase leading-snug tracking-wide",
                  isSelected ? "fs-offer-tab--active" : "fs-offer-tab--inactive",
                  showTab(i) && "is-in"
                )}
                style={tabDelayStyle(i)}
              >
                <span className="fs-offer-tab__label text-balance">{o.tabLabel}</span>
              </button>
            )
          })}
        </div>

        <div
          role="tabpanel"
          id={`fs-offer-panel-${active}`}
          aria-labelledby={`fs-offer-tab-${active}`}
          className={cn(
            "apx-home-card-light-edge fs-offer-panel relative z-0 overflow-hidden rounded-tl-none rounded-tr-none rounded-br-[1.5rem] rounded-bl-none border-2 border-white bg-black md:rounded-tl-none",
            mobile && "fs-offer-seq__panel",
            mobile && showPanel && "is-in"
          )}
        >
          <div className="relative md:min-h-[min(480px,75vh)] lg:min-h-[440px]">
            <div
              className="relative h-44 w-full bg-cover bg-center sm:h-52 md:absolute md:inset-0 md:h-auto"
              style={{ backgroundImage: `url('${item.image}')` }}
              aria-hidden
            >
              <div
                className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black md:bg-gradient-to-b md:from-black/90 md:via-black/75 md:to-black/85 lg:bg-gradient-to-r lg:from-black/[0.88] lg:via-black/45 lg:to-black/20"
                aria-hidden
              />
            </div>

            <div className="relative grid gap-0 bg-black md:bg-transparent lg:min-h-[440px] lg:grid-cols-[1.1fr_0.9fr]">
              <div className="flex flex-col justify-center px-5 py-7 sm:px-10 sm:py-10 lg:px-12 lg:py-14">
                <div className="mb-3 inline-flex w-fit items-center justify-center rounded-full border-2 border-white/70 bg-black/50 py-1.5 pl-3.5 pr-[calc(0.875rem+0.12em)] text-center text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-white sm:mb-5 sm:pl-5 sm:pr-[calc(1.25rem+0.12em)] sm:text-sm">
                  {item.tagLabel}
                </div>

                <h3 className="font-title text-[1.5rem] font-bold leading-[1.1] tracking-tight text-white sm:text-3xl md:text-[clamp(1.75rem,4vw,2.75rem)]">
                  {item.headline}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/85 sm:mt-4 sm:text-base sm:text-white lg:text-lg">
                  {item.description}
                </p>

                <div className="mt-6 flex w-full flex-col gap-2.5 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                  <CustomPillButton
                    href={item.href}
                    size="md"
                    className="w-full justify-center sm:w-auto"
                  >
                    Find out more
                  </CustomPillButton>
                  <CustomPillButton
                    href="/contact"
                    variant="outline"
                    size="md"
                    className="w-full justify-center sm:w-auto"
                  >
                    Contact
                  </CustomPillButton>
                </div>
              </div>

              <div className="flex flex-col justify-center border-t border-white/15 px-5 py-7 sm:px-10 sm:py-10 lg:border-t-0 lg:px-10 lg:py-14 lg:pl-6">
                <p data-offer-features="label" className="text-xs font-bold uppercase tracking-[0.2em] text-white sm:text-sm">
                  The features
                </p>
                <ul className="mt-3.5 space-y-2 sm:mt-5 sm:space-y-3">
                  {item.features.map((line) => (
                    <li
                      key={line}
                      data-offer-feature
                      className="rounded-xl border border-white/30 bg-black/45 px-3.5 py-2.5 text-sm leading-snug text-white backdrop-blur-[6px] sm:px-4 sm:py-3 sm:text-base"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-2 md:hidden" aria-hidden>
          {OFFERS.map((o, i) => (
            <button
              key={o.tabLabel}
              type="button"
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-6 bg-white" : "w-1.5 bg-white/35"
              }`}
              aria-label={`Show ${o.tabLabel}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
