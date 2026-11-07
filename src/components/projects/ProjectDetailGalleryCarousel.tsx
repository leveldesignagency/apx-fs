"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Reveal } from "@/components/Reveal"
import { cn } from "@/lib/utils"

type ProjectDetailGalleryCarouselProps = {
  title: string
  images: string[]
}

/**
 * Horizontal project image strip: wheel/trackpad scrolls the strip while hovering,
 * with custom circular nav arrows bottom-right (same pattern as industries / home projects).
 */
export function ProjectDetailGalleryCarousel({ title, images }: ProjectDetailGalleryCarouselProps) {
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
    syncArrows()
    el.addEventListener("scroll", syncArrows, { passive: true })
    const ro = new ResizeObserver(syncArrows)
    ro.observe(el)
    return () => {
      el.removeEventListener("scroll", syncArrows)
      ro.disconnect()
    }
  }, [syncArrows, images.length])

  const scrollByCard = useCallback((dir: -1 | 1) => {
    const el = scrollerRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>("[data-project-gallery-card]")
    const step = card ? card.offsetWidth + 20 : Math.min(el.clientWidth * 0.75, 520)
    el.scrollBy({ left: dir * step, behavior: "smooth" })
  }, [])

  /** Vertical wheel/trackpad advances the strip while the pointer is over it. */
  useEffect(() => {
    const el = scrollerRef.current
    if (!el || images.length < 2) return

    const onWheel = (e: WheelEvent) => {
      const max = el.scrollWidth - el.clientWidth
      if (max <= 0) return
      const primarilyVertical = Math.abs(e.deltaY) >= Math.abs(e.deltaX)
      if (!primarilyVertical) return

      const atStart = el.scrollLeft <= 0
      const atEnd = el.scrollLeft >= max - 1
      if ((e.deltaY < 0 && atStart) || (e.deltaY > 0 && atEnd)) return

      e.preventDefault()
      el.scrollLeft += e.deltaY
      syncArrows()
    }

    el.addEventListener("wheel", onWheel, { passive: false })
    return () => el.removeEventListener("wheel", onWheel)
  }, [images.length, syncArrows])

  if (!images.length) return null

  return (
    <div className="project-gallery-carousel">
      <Reveal>
        <span
          className="section-label mb-3 block text-white/55"
          style={{ fontFamily: "var(--font-menu), sans-serif" }}
        >
          Gallery
        </span>
        <h2 className="font-title text-2xl font-bold text-white md:text-3xl lg:text-4xl">
          Project Images
        </h2>
        <p className="mt-3 max-w-xl text-sm text-white/60 md:text-base">
          Scroll or use the arrows to browse installation photos from this project.
        </p>
      </Reveal>

      <div
        ref={scrollerRef}
        className={cn(
          "mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-1",
          "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "md:mt-10"
        )}
        aria-label={`${title} project images`}
      >
        {images.map((img, idx) => (
          <figure
            key={`${img}-${idx}`}
            data-project-gallery-card
            className="relative aspect-[4/3] w-[min(85vw,28rem)] shrink-0 snap-start overflow-hidden sm:w-[min(70vw,32rem)] lg:w-[min(42vw,36rem)]"
          >
            <Image
              src={img}
              alt={`${title}, image ${idx + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 85vw, (max-width: 1024px) 70vw, 36rem"
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" aria-hidden />
          </figure>
        ))}
      </div>

      {images.length > 1 ? (
        <div className="mt-6 flex justify-end sm:mt-8">
          <div className="projects-section__nav flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={!canPrev}
              className="projects-nav-btn flex h-12 w-12 items-center justify-center rounded-full border border-white bg-transparent text-white transition-colors hover:bg-white hover:text-black focus:bg-white focus:text-black disabled:pointer-events-none disabled:opacity-35 sm:h-14 sm:w-14"
              aria-label="Previous project image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={!canNext}
              className="projects-nav-btn flex h-12 w-12 items-center justify-center rounded-full border border-white bg-transparent text-white transition-colors hover:bg-white hover:text-black focus:bg-white focus:text-black disabled:pointer-events-none disabled:opacity-35 sm:h-14 sm:w-14"
              aria-label="Next project image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
