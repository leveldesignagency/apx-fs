"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ChevronLeft,
  ChevronRight,
  Flame,
  Headphones,
  Shield,
  Wrench,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

type IndustrySlide = {
  label: string
  imageSrc: string
  imageAlt: string
  href: string
  /** object-position when the focal point is not centre (e.g. building emblem) */
  objectPosition?: string
}

type IndustryFeature = {
  Icon: LucideIcon
  title: string
  text: string
  href: string
}

const INDUSTRIES: readonly IndustrySlide[] = [
  {
    label: "Education",
    imageSrc: "/university.webp",
    imageAlt: "Fire alarm systems for education campuses",
    href: "/projects/university-of-west-london",
    // Wide banner crop: pin on the UWL emblem (left of frame centre)
    objectPosition: "32% 48%",
  },
  {
    label: "Schools",
    imageSrc:
      "/projects/case-studies/john-keats-primary-school/fire-alarm-installation-john-keats-primary-school-playground.jpg",
    imageAlt: "Fire and security installation at a primary school",
    href: "/projects",
  },
  {
    label: "Commercial",
    imageSrc:
      "/projects/case-studies/sancroft-building/case-study-sancroft-building-fire-alarm-installation-exterior.jpg",
    imageAlt: "Fire and security systems for commercial offices",
    href: "/projects/sancroft-building",
  },
  {
    label: "Hospitals",
    imageSrc:
      "/projects/case-studies/kings-college-hospital/case-study-kings-college-hospital-nhs-foundation-trust.jpg",
    imageAlt: "Security systems at King's College Hospital",
    href: "/projects/kings-college-hospital",
  },
  {
    label: "Housing",
    imageSrc: "/housing.jpg",
    imageAlt: "Fire and security systems for residential housing",
    href: "/projects/mayfair-townhouse",
  },
  {
    label: "Hotels",
    imageSrc: "/hotel.jpg",
    imageAlt: "Fire and security systems for hotels",
    href: "/projects",
  },
]

const FEATURES: readonly IndustryFeature[] = [
  {
    Icon: Flame,
    title: "Fire & life safety",
    text: "Addressable and conventional fire alarms, cause-and-effect programming, and BS 5839 handover documentation for live sites.",
    href: "/services/fire-life-safety",
  },
  {
    Icon: Shield,
    title: "Integrated security",
    text: "Intruder, CCTV, video entry, access control and gate automation designed to work together across the estate.",
    href: "/services/security-systems",
  },
  {
    Icon: Wrench,
    title: "Maintenance & repairs",
    text: "Planned preventative maintenance, system upgrades and 24/7 call-out so systems stay reliable after handover.",
    href: "/services/maintenance-support",
  },
]

/**
 * Homepage industries band: full-bleed left photo strip + capability list.
 */
export function IndustriesWeWorkInSection() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const syncArrows = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setCanPrev(el.scrollLeft > 8)
    setCanNext(el.scrollLeft < max - 8)
  }, [])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    // Open on the first card (Education); snap/layout can leave a mid-track offset
    el.scrollLeft = 0
    const raf = window.requestAnimationFrame(() => {
      el.scrollLeft = 0
      syncArrows()
    })
    el.addEventListener("scroll", syncArrows, { passive: true })
    const ro = new ResizeObserver(syncArrows)
    ro.observe(el)
    return () => {
      window.cancelAnimationFrame(raf)
      el.removeEventListener("scroll", syncArrows)
      ro.disconnect()
    }
  }, [syncArrows])

  const scrollByCard = (dir: -1 | 1) => {
    const el = scrollerRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>("[data-industry-card]")
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.55
    el.scrollBy({ left: dir * step, behavior: "smooth" })
  }

  return (
    <section
      id="industries"
      className="industries-section relative overflow-x-hidden bg-[var(--page-bg)] pt-10 pb-20 md:pt-12 md:pb-24 lg:pt-14 lg:pb-28"
      aria-labelledby="industries-heading"
    >
      <div className="site-container">
        <div className="max-w-3xl">
          <span
            className="section-label text-white/80 font-bold"
            style={{ fontFamily: "var(--font-menu), sans-serif" }}
          >
            Sectors
          </span>
          <h2
            id="industries-heading"
            className="home-section-title mt-3 text-white font-title"
          >
            Industries We Work In
          </h2>
          <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-white/65 sm:text-base">
            From schools and hospitals to commercial offices, housing and hotels, we design and install
            fire and security systems that fit how each site actually operates.
          </p>
        </div>
      </div>

      <div className="industries-split mt-12 lg:mt-16">
        <div className="industries-carousel-col">
          <div
            ref={scrollerRef}
            className="industries-carousel flex snap-x snap-mandatory gap-5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {INDUSTRIES.map((item) => (
              <article
                key={item.label}
                data-industry-card
                className="industries-carousel__card group relative aspect-[3/4] shrink-0 snap-start overflow-hidden rounded-2xl"
              >
                <Link
                  href={item.href}
                  className="absolute inset-0 z-[1] block text-inherit no-underline"
                  aria-label={`${item.label}, view projects`}
                >
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    fill
                    className={cn(
                      "scale-110 object-cover transition-transform duration-700 ease-out motion-reduce:transition-none motion-safe:group-hover:scale-100",
                      !item.objectPosition && "object-center"
                    )}
                    style={
                      item.objectPosition
                        ? { objectPosition: item.objectPosition }
                        : undefined
                    }
                    sizes="(min-width: 1024px) 20rem, (min-width: 640px) 48vw, 72vw"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/15"
                    aria-hidden
                  />
                  <h3 className="absolute bottom-5 left-5 right-5 origin-bottom-left font-title text-xl font-bold tracking-tight text-white transition-transform duration-500 ease-out motion-reduce:transition-none motion-safe:group-hover:scale-[1.04] sm:text-2xl">
                    {item.label}
                  </h3>
                </Link>
              </article>
            ))}
          </div>

          <div className="projects-section__nav industries-carousel__nav">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={!canPrev}
              className="projects-nav-btn flex h-14 w-14 items-center justify-center rounded-full border border-black bg-transparent text-black transition-colors hover:bg-black hover:text-white focus:bg-black focus:text-white disabled:pointer-events-none disabled:opacity-35"
              aria-label="Previous industries"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={!canNext}
              className="projects-nav-btn flex h-14 w-14 items-center justify-center rounded-full border border-black bg-transparent text-black transition-colors hover:bg-black hover:text-white focus:bg-black focus:text-white disabled:pointer-events-none disabled:opacity-35"
              aria-label="Next industries"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        <ul className="industries-features m-0 flex list-none flex-col justify-center p-0">
          {FEATURES.map(({ Icon, title, text, href }, index) => (
            <li
              key={title}
              className={cn(
                "py-7 first:pt-0 last:pb-0",
                index < FEATURES.length - 1 && "border-b border-white/15"
              )}
            >
              <Link
                href={href}
                className="group grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 gap-y-2 text-inherit no-underline"
              >
                <Icon
                  className="mt-0.5 h-10 w-10 shrink-0 text-white transition-opacity group-hover:opacity-80 sm:h-11 sm:w-11"
                  strokeWidth={1.35}
                  aria-hidden
                />
                <div className="min-w-0">
                  <h3 className="font-title text-lg font-bold tracking-tight text-white sm:text-xl">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60 sm:text-[0.95rem]">
                    {text}
                  </p>
                </div>
              </Link>
            </li>
          ))}
          <li className="pt-8">
            <p className="flex items-start gap-3 text-sm text-white/55">
              <Headphones className="mt-0.5 h-5 w-5 shrink-0 text-white/70" strokeWidth={1.5} aria-hidden />
              <span>
                Not sure which systems fit your site?{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-white underline decoration-white/35 underline-offset-2 hover:decoration-white"
                >
                  Talk to us
                </Link>
                .
              </span>
            </p>
          </li>
        </ul>
      </div>
    </section>
  )
}
