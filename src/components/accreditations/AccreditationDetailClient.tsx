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
    <main className="min-h-screen bg-zinc-100 text-black">
      {/* Extra top padding so back link clears the site header — header component unchanged */}
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

      <section className="about-section-px pb-20 pt-10 md:pb-28 md:pt-14">
        <div className="about-section-inner">
          <div className="mx-auto max-w-3xl">
            <Reveal show={mounted} delayMs={80}>
              <div className="flex flex-col items-center gap-6 md:gap-7">
                {/* Rectangular mark — fully rounded corners (no sharp / cut corners) */}
                <div className="flex h-32 w-44 shrink-0 items-center justify-center overflow-hidden rounded-3xl border border-black/12 bg-zinc-50 px-4 py-3 shadow-sm sm:h-36 sm:w-52 md:h-40 md:w-56 md:px-5 md:py-4">
                  <Image
                    src={accred.icon}
                    alt={accred.name}
                    width={320}
                    height={180}
                    className="max-h-full max-w-full object-contain"
                    priority
                  />
                </div>
                <div className="w-full rounded-3xl border border-black/10 bg-white p-8 shadow-[0_8px_40px_rgba(0,0,0,0.06)] md:p-10 lg:p-12">
                  <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-black/45 md:text-left">
                    {accred.shortLabel}
                  </p>
                  <h1
                    className="mt-2 text-center text-3xl font-bold leading-tight text-black md:text-left md:text-4xl lg:text-[2.75rem]"
                    style={{ fontFamily: "var(--font-menu)" }}
                  >
                    {accred.title}
                  </h1>
                  <p className="mt-5 text-center text-lg leading-relaxed text-black/78 md:text-left md:text-xl">
                    {accred.intro}
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="mt-8 space-y-6 md:mt-10 md:space-y-8">
              {accred.sections.map((section, i) => (
                <Reveal key={section.heading} show={mounted} delayMs={120 + i * 50}>
                  <article className="relative overflow-visible rounded-xl border border-black/8 bg-white p-7 shadow-sm md:p-8 lg:p-9">
                    <span
                      className="absolute left-1/2 top-0 z-10 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg border-2 border-white bg-black text-sm font-bold text-white shadow-md md:h-10 md:w-10 md:text-base"
                      aria-hidden
                    >
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <h2
                        className="text-xl font-bold leading-snug text-black md:text-2xl"
                        style={{ fontFamily: "var(--font-menu)" }}
                      >
                        {section.heading}
                      </h2>
                      <p className="mt-4 text-base leading-relaxed text-black/75 md:text-lg">{section.body}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
