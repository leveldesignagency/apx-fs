"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Reveal } from "@/components/Reveal"
import { CCTV_CAMERA_TYPE_PAGES } from "@/data/cctvCameraTypePages"

const CCTV_TYPES_FOLDER = "/cctv%20camera%20types"

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
    "Dome, bullet, PTZ (pan, tilt and zoom), wireless, infrared and thermal imaging CCTV camera guides from APX Fire & Security in Greater London and the Home Counties.",
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
      <section
        aria-labelledby="cctv-camera-types-heading"
        className="relative z-[1] bg-[var(--page-bg)]"
      >
        <div className="site-container relative z-[1] py-10 sm:py-12 lg:py-12">
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
              Dome, bullet, PTZ (pan, tilt and zoom), wireless, infrared and thermal options, specified on survey for
              commercial and residential sites across London and the Home Counties. Select a type for a short guide, then
              enquire via the main{" "}
              <Link href="/services/cctv-systems" className="underline decoration-white/45 underline-offset-[3px] hover:decoration-white">
                CCTV systems
              </Link>{" "}
              page. Thermal is a specialised option confirmed on survey.
            </p>
          </Reveal>

          <ul className="mx-auto grid w-full max-w-md list-none grid-cols-1 gap-6 overflow-visible py-1 sm:mx-0 sm:max-w-none sm:grid-cols-3 sm:gap-5 lg:grid-cols-6 lg:gap-6">
            {CCTV_CAMERA_TYPE_PAGES.map(({ slug, file, label, imageAlt }, index) => (
              <li key={slug} className="flex flex-col items-center text-center">
                <Reveal
                  show={stripShow}
                  delayMs={STRIP_CARD_BASE_DELAY_MS + index * STRIP_CARD_STAGGER_MS}
                  className="w-full"
                >
                <Link
                  href={`/services/cctv/camera-types/${slug}`}
                  className="group mx-auto block w-full sm:mx-0"
                  aria-label={`${label} CCTV - full guide`}
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-tl-2xl rounded-br-2xl border border-white/25 bg-[var(--page-bg)] shadow-[0_14px_36px_rgba(0,0,0,0.65)] transition-transform duration-300 ease-out will-change-transform group-hover:scale-[1.06] group-focus-visible:scale-[1.04] group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-white/40">
                    <span className="absolute left-3 top-3 z-[2] max-w-[calc(100%-1.5rem)] truncate rounded-full border border-white/25 bg-black/75 px-3 py-1.5 text-sm font-bold tracking-tight text-white backdrop-blur-sm">
                      {label}
                    </span>
                    <Image
                      src={`${CCTV_TYPES_FOLDER}/${file}`}
                      alt={imageAlt}
                      fill
                      sizes="(min-width: 1024px) 16vw, (min-width: 640px) 28vw, 88vw"
                      className="relative z-[1] object-contain p-4 pt-11 drop-shadow-[0_6px_16px_rgba(0,0,0,0.75)] sm:p-3 sm:pt-10"
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
