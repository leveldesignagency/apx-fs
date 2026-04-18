"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState, type ReactNode } from "react"
import { ArrowLeft } from "lucide-react"
import { FsCctvHeroNav } from "@/components/FsCctvHeroNav"
import { CustomPillButton } from "@/components/ui/CustomPillButton"
import {
  CCTV_CAMERA_TYPES_FOLDER,
  CCTV_CAMERA_TYPE_QUICK_LINKS,
  type CctvCameraTypePage,
} from "@/data/cctvCameraTypePages"

function FadeInBlock({ children, delayMs = 0 }: { children: ReactNode; delayMs?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setVisible(true)
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delayMs}ms` : "0ms" }}
      className={`transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      {children}
    </div>
  )
}

export function CctvCameraTypeDetailClient({ page }: { page: CctvCameraTypePage }) {
  const src = `${CCTV_CAMERA_TYPES_FOLDER}/${page.file}`

  return (
    <div className="service-page-root min-h-screen overflow-x-hidden bg-black text-white">
      <section className="about-section-px page-title-top border-b border-white/10 pb-10 md:pb-14">
        <div className="about-section-inner w-full">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-white/45">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/services" className="underline-offset-4 hover:text-white/80 hover:underline">
                  Services
                </Link>
              </li>
              <li aria-hidden className="text-white/25">
                /
              </li>
              <li>
                <Link href="/services/cctv/domestic" className="underline-offset-4 hover:text-white/80 hover:underline">
                  CCTV
                </Link>
              </li>
              <li aria-hidden className="text-white/25">
                /
              </li>
              <li className="text-white/70">{page.label}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-12 xl:gap-16">
            <div className="min-w-0 lg:col-span-7">
              <h1 className="font-title text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-[2.75rem] lg:leading-[1.08]">
                {page.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-gray-300 sm:text-xl">{page.heroIntro}</p>
              <div className="mt-8">
                <Link
                  href="/services/cctv/domestic"
                  className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-white/55 transition-colors hover:text-white"
                >
                  <ArrowLeft
                    className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-x-0.5"
                    aria-hidden
                  />
                  All CCTV camera types
                </Link>
              </div>
            </div>

            {/* pointer-events-none: fill Image + transforms can win hit-testing over the header contact strip in the top-right overlap */}
            <div className="relative z-0 flex w-full justify-center pointer-events-none lg:col-span-5 lg:justify-end">
              <div className="relative aspect-square w-full max-w-[18rem] sm:max-w-[22rem] lg:ml-auto lg:max-w-md xl:max-w-lg">
                <div
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_70%_at_50%_45%,rgba(255,255,255,0.07),transparent_60%)]"
                  aria-hidden
                />
                <Image
                  src={src}
                  alt={page.imageAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 28vw, min(100vw, 22rem)"
                  className="pointer-events-none object-contain p-4 sm:p-5"
                  style={{ objectPosition: "center" }}
                />
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/15 pt-8 md:mt-14 md:pt-10">
            <FsCctvHeroNav
              links={CCTV_CAMERA_TYPE_QUICK_LINKS}
              eyebrow="Camera types"
              ariaLabel="CCTV camera types"
            />
          </div>
        </div>
      </section>

      <article className="about-section-px pb-20 pt-12 text-white md:pb-28 md:pt-16">
        <div className="about-section-inner w-full">
          <div className="w-full max-w-5xl lg:max-w-6xl">
            {page.sections.map((section, i) => (
              <FadeInBlock key={section.heading} delayMs={i * 90}>
                <section className={i > 0 ? "mt-14 border-t border-white/10 pt-14" : ""}>
                  <h2 className="font-title text-2xl font-bold text-white sm:text-3xl">{section.heading}</h2>
                  <p className="mt-5 text-base leading-relaxed text-gray-300 sm:text-lg">{section.body}</p>
                </section>
              </FadeInBlock>
            ))}

            <FadeInBlock delayMs={page.sections.length * 90}>
              <div className="mt-16 border-t border-white/10 pt-12">
                <p className="text-base leading-relaxed text-gray-400">
                  For a survey, specification or installation across{" "}
                  <span className="text-gray-300">Greater London and the Home Counties</span>, contact APX Fire &amp;
                  Security - we align camera choice with your risk assessment, network and compliance requirements.
                </p>
                <div className="mt-8">
                  <CustomPillButton href="/contact" size="md">
                    Get in touch
                  </CustomPillButton>
                </div>
              </div>
            </FadeInBlock>
          </div>
        </div>
      </article>
    </div>
  )
}
