"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Reveal } from "@/components/Reveal"
import {
  FS_ACCREDITATIONS,
  FS_ACCREDITATION_TAB_ORDER,
  type FsAccreditationSlug,
} from "@/data/fsAccreditations"

type AccredBody = (typeof FS_ACCREDITATIONS)[FsAccreditationSlug]

const navPillBase =
  "inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200"
const navPillActive = "border-white bg-white text-black"
const navPillIdle = "border-white/25 text-white/85 hover:border-white/50 hover:bg-white/10"

export function AccreditationDetailClient({
  activeSlug,
  accred,
}: {
  activeSlug: FsAccreditationSlug
  accred: AccredBody
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="bg-black text-white about-section-px page-title-top pb-10 md:pb-12">
        <div className="about-section-inner">
          <Reveal show={mounted} delayMs={0}>
            <Link
              href="/accreditations"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden />
              All accreditations
            </Link>
            <nav aria-label="Accreditation pages" className="mt-8 flex flex-wrap gap-2 md:gap-3">
              {FS_ACCREDITATION_TAB_ORDER.map((k) => {
                const item = FS_ACCREDITATIONS[k]
                const active = k === activeSlug
                return (
                  <Link
                    key={k}
                    href={`/accreditations/${k}`}
                    className={`${navPillBase} ${active ? navPillActive : navPillIdle}`}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </Reveal>
        </div>
      </section>

      <section className="about-section-px mt-10 pb-20 pt-20 text-black md:mt-12 md:pb-28 md:pt-28 lg:mt-14 lg:pt-36">
        <div className="about-section-inner">
          <Reveal show={mounted} delayMs={60}>
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:items-start lg:gap-x-16 xl:gap-x-24">
              <div className="min-w-0 max-w-2xl lg:max-w-none">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/45">{accred.shortLabel}</p>
                <h1
                  className="mt-3 text-3xl font-bold leading-[1.1] text-black md:text-4xl lg:text-[2.65rem]"
                  style={{ fontFamily: "var(--font-menu)" }}
                >
                  {accred.title}
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-black/78 md:text-xl">{accred.intro}</p>
              </div>

              <div className="flex w-full justify-center px-2 lg:px-6">
                <Image
                  src={accred.icon}
                  alt={accred.name}
                  width={280}
                  height={120}
                  className="h-auto w-auto max-h-[104px] max-w-[240px] object-contain sm:max-h-[112px] sm:max-w-[260px] md:max-h-[120px] md:max-w-[280px] lg:max-h-[128px] lg:max-w-[300px]"
                  sizes="(min-width: 1024px) 300px, 260px"
                  priority
                />
              </div>
            </div>
          </Reveal>

          <Reveal show={mounted} delayMs={100}>
            <div className="mt-16 border-t border-black/10 pt-16 md:mt-20 md:pt-20">
              <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-x-14 md:gap-y-16 lg:gap-x-20">
                {accred.sections.map((section) => (
                  <article key={section.heading} className="min-w-0">
                    <h2
                      className="text-xl font-bold leading-snug text-black md:text-2xl"
                      style={{ fontFamily: "var(--font-menu)" }}
                    >
                      {section.heading}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-black/75 md:text-[1.05rem]">{section.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
