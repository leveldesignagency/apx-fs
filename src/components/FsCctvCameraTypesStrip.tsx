"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Reveal } from "@/components/Reveal"
import { CCTV_CAMERA_TYPE_PAGES } from "@/data/cctvCameraTypePages"

const CCTV_TYPES_FOLDER = "/cctv%20camera%20types"

/** Matches domestic / commercial hub cards, diagonal corners only. */
const CCTV_TILE_CORNERS = "rounded-tl-2xl rounded-br-2xl"

/** Wait for hero copy/buttons (~160ms + transition) before this strip fades in. */
const STRIP_AFTER_HERO_MS = 780
const STRIP_TITLE_DELAY_MS = 0
const STRIP_INTRO_DELAY_MS = 90
const STRIP_CARD_BASE_DELAY_MS = 180
const STRIP_CARD_STAGGER_MS = 65

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "CCTV camera types",
  description:
    "Dome, bullet, pan-tilt, wireless, infra-red and thermal imaging CCTV cameras supplied and installed by APX Fire & Security in Greater London and the Home Counties.",
  numberOfItems: CCTV_CAMERA_TYPE_PAGES.length,
  itemListElement: CCTV_CAMERA_TYPE_PAGES.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: `${item.label} CCTV camera`,
  })),
}

/**
 * Click a camera tile to open its dedicated guide. Sits below the service hero.
 */
export function FsCctvCameraTypesStrip() {
  const [stripShow, setStripShow] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStripShow(true)
      return
    }
    const timer = window.setTimeout(() => setStripShow(true), STRIP_AFTER_HERO_MS)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section aria-labelledby="cctv-camera-types-heading" className="relative z-30 bg-black">
        <div className="container relative z-[1] mx-auto px-6 py-10 sm:py-12 lg:py-12">
          <Reveal show={stripShow} delayMs={STRIP_TITLE_DELAY_MS}>
            <h2
              id="cctv-camera-types-heading"
              className="mb-6 max-w-3xl text-left font-title text-3xl font-bold text-white sm:mb-8 sm:text-4xl"
            >
              CCTV camera types
            </h2>
          </Reveal>
          <Reveal show={stripShow} delayMs={STRIP_INTRO_DELAY_MS}>
            <p className="mb-8 max-w-3xl text-left text-base leading-relaxed text-gray-300 sm:mb-10">
              Dome, bullet, pan-tilt, wireless, infra-red and thermal options for properties across Greater London, Surrey,
              Kent, Essex and the wider South East. Select a type for a detailed guide.
            </p>
          </Reveal>

          <ul className="grid list-none grid-cols-2 gap-5 overflow-visible py-1 sm:grid-cols-3 lg:grid-cols-6 lg:gap-6">
            {CCTV_CAMERA_TYPE_PAGES.map(({ slug, file, label, imageAlt }, index) => (
              <li key={slug} className="flex flex-col items-center text-center">
                <Reveal
                  show={stripShow}
                  delayMs={STRIP_CARD_BASE_DELAY_MS + index * STRIP_CARD_STAGGER_MS}
                  className="w-full"
                >
                <Link
                  href={`/services/cctv/camera-types/${slug}`}
                  className="group block w-full max-w-[11rem] sm:max-w-none"
                  aria-label={`${label} CCTV - full guide`}
                >
                  <div
                    className={`relative aspect-square w-full overflow-hidden border border-white/25 ${CCTV_TILE_CORNERS} shadow-[0_14px_36px_rgba(0,0,0,0.65),0_2px_0_rgba(255,255,255,0.06)_inset] transition-transform duration-300 ease-out will-change-transform group-hover:scale-[1.06] group-focus-visible:scale-[1.04] group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-white/40`}
                    style={{
                      background:
                        "radial-gradient(circle at 50% 52%, rgba(255,255,255,0.14) 0%, rgba(40,40,40,0.55) 42%, rgba(0,0,0,0.98) 78%)",
                    }}
                  >
                    <div
                      className={`pointer-events-none absolute inset-0 ${CCTV_TILE_CORNERS} opacity-90`}
                      style={{
                        background:
                          "radial-gradient(circle at 50% 48%, rgba(255,255,255,0.06) 0%, transparent 55%, rgba(0,0,0,0.45) 100%)",
                      }}
                      aria-hidden
                    />
                    <span
                      className={`absolute left-2.5 top-2.5 z-[2] max-w-[calc(100%-1.25rem)] truncate border border-white/25 bg-black/75 px-2.5 py-1 text-[10px] font-bold tracking-tight text-white backdrop-blur-sm sm:left-3 sm:top-3 sm:px-3 sm:text-xs ${CCTV_TILE_CORNERS}`}
                    >
                      {label}
                    </span>
                    <Image
                      src={`${CCTV_TYPES_FOLDER}/${file}`}
                      alt={imageAlt}
                      fill
                      sizes="(min-width: 1024px) 16vw, (min-width: 640px) 28vw, 45vw"
                      className={`relative z-[1] object-contain p-3 pt-9 drop-shadow-[0_6px_16px_rgba(0,0,0,0.75)] sm:pt-10 ${CCTV_TILE_CORNERS}`}
                    />
                  </div>
                </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
