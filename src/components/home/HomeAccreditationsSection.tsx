"use client"

import Link from "next/link"
import { useEffect, useRef, useState, type CSSProperties } from "react"
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

const delayStyle = (ms: number): CSSProperties =>
  ({ "--acc-delay": `${ms}ms` }) as CSSProperties

/** Accreditations band: desktop uses clipped fixed photo; mobile uses static in-section bg (no scroll fight). */
export function HomeAccreditationsSection({ visible = true }: HomeAccreditationsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const fixedBgRef = useRef<HTMLDivElement>(null)
  const [useFixedParallax, setUseFixedParallax] = useState(false)

  useEffect(() => {
    const allow =
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      !window.matchMedia("(pointer: coarse)").matches &&
      window.matchMedia("(min-width: 768px)").matches
    setUseFixedParallax(allow)
  }, [])

  useEffect(() => {
    if (!useFixedParallax) return
    const section = sectionRef.current
    const fixedBg = fixedBgRef.current
    if (!section || !fixedBg) return

    let frame = 0
    const syncFixedBackground = () => {
      frame = 0
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

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(syncFixedBackground)
    }

    syncFixedBackground()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [useFixedParallax])

  return (
    <>
      {useFixedParallax ? (
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
          <div className="home-photo-swarm home-photo-swarm--page-bg absolute inset-0" aria-hidden />
        </div>
      ) : null}

      <section
        ref={sectionRef}
        id="accreditations"
        className={cn(
          "home-accreditations-section relative z-[16] bg-transparent",
          !useFixedParallax && "home-accreditations-section--static-bg",
          visible && "home-accreditations-section--in",
        )}
        aria-labelledby="home-accreditations-heading"
      >
        {!useFixedParallax ? (
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={HOME_ACCREDITATIONS_BG}
              alt=""
              className="home-accreditations-section__static-img h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/58" />
          </div>
        ) : (
          <div className="pointer-events-none absolute inset-0 bg-black/58" aria-hidden />
        )}

        <div className="site-container section-spacing relative z-10 text-center">
          <div className="home-acc-clip mx-auto" style={delayStyle(0)}>
            <span
              className="home-acc-clip__inner section-label text-white/70"
              style={{ fontFamily: "var(--font-menu), sans-serif" }}
            >
              Accreditations &amp; Memberships
            </span>
          </div>

          <div className="home-acc-clip mx-auto mt-3" style={delayStyle(70)}>
            <h3
              id="home-accreditations-heading"
              className="home-acc-clip__inner home-section-title font-title text-white"
            >
              Accredited &amp; Fully Qualified
            </h3>
          </div>

          <div className="home-acc-clip mx-auto mt-4 max-w-2xl" style={delayStyle(140)}>
            <p className="home-acc-clip__inner section-intro-gap text-base leading-relaxed text-white/82">
              Our public credentials match the Accreditations page: NSI Gold (Security and Fire), BAFE Registered,
              Constructionline Gold, FIA Full Member and BS EN ISO 9001:2015, so procurement and duty holders see the same
              claims site-wide.
            </p>
          </div>

          <div className="mx-auto mt-10 grid w-full max-w-5xl grid-cols-2 place-items-center gap-6 sm:gap-8 lg:max-w-6xl lg:grid-cols-4 lg:gap-8">
            {ACCREDITATIONS_LOGOS.map(({ slug, src, alt }, i) => (
              <Link
                key={slug}
                href={`/accreditations/${slug}`}
                className="home-acc-rise group flex h-24 w-full items-center justify-center sm:h-28"
                style={delayStyle(220 + i * 80)}
                aria-label={`${alt}, view dedicated accreditation page`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  className="home-acc-logo-img h-20 w-auto max-w-[85%] object-contain opacity-90 sm:h-24"
                  aria-hidden
                />
              </Link>
            ))}
          </div>

          <div className="home-acc-rise mt-10 flex justify-center" style={delayStyle(560)}>
            <CustomPillButton href="/accreditations" size="md">
              View accreditations
            </CustomPillButton>
          </div>
        </div>
      </section>
    </>
  )
}
