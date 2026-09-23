"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import { CustomPillButton } from "@/components/ui/CustomPillButton"
import { cn } from "@/lib/utils"

const HOME_ACCREDITATIONS_BG = "/accredited-apx-fs.jpg"

/** Same coloured marks as the original Trusted & Accredited block */
const ACCREDITATIONS_LOGOS: { slug: string; src: string; alt: string }[] = [
  { slug: "nsi", src: "/accreditations%20mono/Coloured/NSI-01.png", alt: "NSI Gold" },
  { slug: "bafe", src: "/accreditations%20mono/Coloured/BAFE-01.svg", alt: "BAFE" },
  { slug: "constructionline", src: "/accreditations%20mono/Coloured/ConstructionOnline-01.svg", alt: "Constructionline" },
  { slug: "fia", src: "/accreditations%20mono/Coloured/FIA-01.svg", alt: "FIA" },
]

type HomeAccreditationsSectionProps = {
  visible?: boolean
}

/** Accreditations band, viewport-fixed photo, content scrolls over it */
export function HomeAccreditationsSection({ visible = true }: HomeAccreditationsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const fixedBgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const fixedBg = fixedBgRef.current
    if (!section || !fixedBg) return

    const syncFixedBackground = () => {
      const rect = section.getBoundingClientRect()
      const viewportHeight = window.innerHeight

      if (rect.bottom <= 0 || rect.top >= viewportHeight) {
        fixedBg.style.visibility = "hidden"
        return
      }

      fixedBg.style.visibility = "visible"
      const insetTop = Math.max(0, Math.round(rect.top))
      const insetBottom = Math.max(0, Math.round(viewportHeight - rect.bottom))
      fixedBg.style.clipPath = `inset(${insetTop}px 0px ${insetBottom}px 0px)`
    }

    syncFixedBackground()
    window.addEventListener("scroll", syncFixedBackground, { passive: true })
    window.addEventListener("resize", syncFixedBackground)

    return () => {
      window.removeEventListener("scroll", syncFixedBackground)
      window.removeEventListener("resize", syncFixedBackground)
    }
  }, [])

  return (
    <>
      <div
        ref={fixedBgRef}
        className="home-accreditations-section__fixed-bg pointer-events-none fixed inset-0 z-[15]"
        style={{ visibility: "hidden" }}
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HOME_ACCREDITATIONS_BG}
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </div>

      <section
        ref={sectionRef}
        id="accreditations"
        className="home-accreditations-section relative z-[16] bg-transparent"
        aria-labelledby="home-accreditations-heading"
      >
        <div className="pointer-events-none absolute inset-0 bg-black/58" aria-hidden />

        <div
          className={cn(
            "site-container relative z-10 py-16 text-center home-scroll-rise sm:py-20 lg:py-24",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-14",
          )}
        >
          <span
            className="section-label mb-1 block text-white/70"
            style={{ fontFamily: "var(--font-menu), sans-serif" }}
          >
            Accreditations &amp; Memberships
          </span>
          <h3
            id="home-accreditations-heading"
            className="home-section-title font-title text-white"
          >
            Accredited &amp; fully qualified
          </h3>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/82">
            We maintain independent certification and industry alignment so your fire and security packages are
            delivered with clear governance, competent engineers and documentation that stands up to handover and
            audit.
          </p>

          <div className="mx-auto mt-10 grid w-full max-w-5xl grid-cols-2 place-items-center gap-6 sm:gap-8 lg:max-w-6xl lg:grid-cols-4 lg:gap-10">
            {ACCREDITATIONS_LOGOS.map(({ slug, src, alt }) => (
              <Link
                key={slug}
                href={`/accreditations/${slug}`}
                className="group flex h-24 w-full items-center justify-center sm:h-28"
                aria-label={`${alt}, view dedicated accreditation page`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  className="h-20 w-auto max-w-[85%] object-contain opacity-90 transition-[opacity,transform] duration-300 ease-out group-hover:scale-[1.06] group-hover:opacity-100 sm:h-24"
                  aria-hidden
                />
              </Link>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <CustomPillButton href="/accreditations" size="md">
              View accreditations
            </CustomPillButton>
          </div>
        </div>
      </section>
    </>
  )
}
