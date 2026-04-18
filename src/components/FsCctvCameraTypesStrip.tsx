"use client"

import Image from "next/image"
import Link from "next/link"
import { CCTV_CAMERA_TYPE_PAGES } from "@/data/cctvCameraTypePages"

const CCTV_TYPES_FOLDER = "/cctv%20camera%20types"

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
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section aria-labelledby="cctv-camera-types-heading" className="relative z-30 bg-black">
        <div className="container relative z-[1] mx-auto px-6 py-10 sm:py-12 lg:py-12">
          <h2
            id="cctv-camera-types-heading"
            className="mb-6 max-w-3xl text-left font-title text-3xl font-bold text-white sm:mb-8 sm:text-4xl"
          >
            CCTV camera types
          </h2>
          <p className="mb-8 max-w-3xl text-left text-base leading-relaxed text-gray-300 sm:mb-10">
            Dome, bullet, pan-tilt, wireless, infra-red and thermal options for properties across Greater London, Surrey,
            Kent, Essex and the wider South East. Select a type for a detailed guide.
          </p>

          <ul className="grid list-none grid-cols-2 gap-5 overflow-visible py-1 sm:grid-cols-3 lg:grid-cols-6 lg:gap-6">
            {CCTV_CAMERA_TYPE_PAGES.map(({ slug, file, label, imageAlt }) => (
              <li key={slug} className="flex flex-col items-center text-center">
                <Link
                  href={`/services/cctv/camera-types/${slug}`}
                  className="group flex w-full max-w-[11rem] flex-col items-center sm:max-w-none"
                  aria-label={`${label} CCTV - full guide`}
                >
                  <div
                    className="relative aspect-square w-full overflow-hidden rounded-none border border-white/25 shadow-[0_14px_36px_rgba(0,0,0,0.65),0_2px_0_rgba(255,255,255,0.06)_inset] transition-transform duration-300 ease-out will-change-transform group-hover:scale-[1.06] group-focus-visible:scale-[1.04] group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-white/40"
                    style={{
                      background:
                        "linear-gradient(165deg, rgba(255,255,255,0.12) 0%, rgba(15,15,15,0.95) 38%, rgba(0,0,0,0.98) 100%)",
                    }}
                  >
                    <div
                      className="pointer-events-none absolute inset-0 rounded-none opacity-90"
                      style={{
                        background:
                          "linear-gradient(to bottom, rgba(255,255,255,0.06) 0%, transparent 45%, rgba(0,0,0,0.35) 100%)",
                      }}
                      aria-hidden
                    />
                    <Image
                      src={`${CCTV_TYPES_FOLDER}/${file}`}
                      alt={imageAlt}
                      fill
                      sizes="(min-width: 1024px) 16vw, (min-width: 640px) 28vw, 45vw"
                      className="relative z-[1] object-contain p-3 drop-shadow-[0_6px_16px_rgba(0,0,0,0.75)]"
                    />
                  </div>
                  <span className="mt-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/85 underline-offset-4 group-hover:text-white group-hover:underline sm:text-xs">
                    {label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
