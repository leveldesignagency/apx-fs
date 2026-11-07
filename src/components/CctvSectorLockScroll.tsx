"use client"

import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { toTitleCase } from "@/lib/titleCase"

export type CctvSectorSlide = {
  label: string
  text: string
  imageSrc: string
  imageAlt: string
}

type CctvSectorLockScrollProps = {
  sectors: readonly CctvSectorSlide[]
  headingId?: string
}

/**
 * Same horizontal card strip as the homepage Industries / Sectors band.
 */
export function CctvSectorLockScroll({
  sectors,
  headingId = "commercial-cctv-businesses-heading",
}: CctvSectorLockScrollProps) {
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
    const card = el.querySelector<HTMLElement>("[data-cctv-sector-card]")
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.55
    el.scrollBy({ left: dir * step, behavior: "smooth" })
  }

  return (
    <section
      className="industries-section section-spacing relative overflow-x-hidden bg-[var(--page-bg)]"
      aria-labelledby={headingId}
    >
      <div className="site-container">
        <div className="max-w-3xl">
          <span
            className="section-label text-white/80 font-bold"
            style={{ fontFamily: "var(--font-menu), sans-serif" }}
          >
            Sectors
          </span>
          <h2 id={headingId} className="home-section-title text-white font-title">
            CCTV for Businesses
          </h2>
          <p className="section-intro-gap max-w-2xl text-pretty text-sm leading-relaxed text-white/65 sm:text-base">
            We design and install commercial CCTV across the sectors we work in every day.
          </p>
        </div>
      </div>

      <div className="industries-split mt-10 lg:mt-12">
        <div className="industries-carousel-col">
          <div
            ref={scrollerRef}
            className="industries-carousel flex snap-x snap-mandatory gap-5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {sectors.map((item) => (
              <article
                key={item.label}
                data-cctv-sector-card
                className="industries-carousel__card group relative aspect-[3/4] shrink-0 snap-start overflow-hidden rounded-2xl"
              >
                <div className="absolute inset-0 z-[1]">
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    fill
                    quality={80}
                    className="scale-105 object-cover object-center transition-transform duration-700 ease-out motion-reduce:transition-none motion-safe:group-hover:scale-100"
                    sizes="(min-width: 1024px) 24rem, (min-width: 640px) 55vw, 85vw"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/15"
                    aria-hidden
                  />
                  <h3 className="absolute bottom-5 left-5 right-5 origin-bottom-left font-title text-xl font-bold tracking-tight text-white transition-transform duration-500 ease-out motion-reduce:transition-none motion-safe:group-hover:scale-[1.04] sm:text-2xl">
                    {toTitleCase(item.label)}
                  </h3>
                </div>
              </article>
            ))}
          </div>

          <div className="projects-section__nav industries-carousel__nav">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={!canPrev}
              className="projects-nav-btn flex h-14 w-14 items-center justify-center rounded-full border border-white bg-transparent text-white transition-colors hover:bg-white hover:text-black focus:bg-white focus:text-black disabled:pointer-events-none disabled:opacity-35"
              aria-label="Previous sectors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={!canNext}
              className="projects-nav-btn flex h-14 w-14 items-center justify-center rounded-full border border-white bg-transparent text-white transition-colors hover:bg-white hover:text-black focus:bg-white focus:text-black disabled:pointer-events-none disabled:opacity-35"
              aria-label="Next sectors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        <ul className="industries-features m-0 flex list-none flex-col justify-center p-0">
          {sectors.map((sector, index) => (
            <li
              key={sector.label}
              className={`py-7 first:pt-0 last:pb-0${
                index < sectors.length - 1 ? " border-b border-white/15" : ""
              }`}
            >
              <h3 className="font-title text-lg font-bold tracking-tight text-white sm:text-xl">
                {toTitleCase(sector.label)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60 sm:text-[0.95rem]">
                {sector.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
