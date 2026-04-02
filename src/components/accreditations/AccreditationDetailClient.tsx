"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Reveal } from "@/components/Reveal"
import {
  FS_ACCREDITATIONS,
  FS_ACCREDITATION_TAB_ORDER,
  type FsAccreditationSlug,
} from "@/data/fsAccreditations"

type AccredBody = (typeof FS_ACCREDITATIONS)[FsAccreditationSlug]

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

  const logoTight = activeSlug === "bafe" || activeSlug === "fia"

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="about-block about-block--white about-section-px pt-24 pb-16 md:pt-28 md:pb-24 lg:pb-32">
        <div className="about-section-inner">
          <Reveal show={mounted} delayMs={0}>
            <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-y-4">
              <Link
                href="/accreditations"
                className="group inline-flex w-fit items-center gap-2 text-sm font-semibold text-black/55 transition-colors hover:text-black"
              >
                <span className="transition-transform group-hover:-translate-x-0.5" aria-hidden>
                  ←
                </span>
                All accreditations
              </Link>
              <nav aria-label="Accreditation pages" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                {FS_ACCREDITATION_TAB_ORDER.map((k) => {
                  const item = FS_ACCREDITATIONS[k]
                  const active = k === activeSlug
                  return (
                    <Link
                      key={k}
                      href={`/accreditations/${k}`}
                      className={
                        active
                          ? "font-semibold text-black underline underline-offset-[6px] decoration-black/40"
                          : "text-black/45 transition-colors hover:text-black/75"
                      }
                    >
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
            </div>
          </Reveal>

          <div className="mt-12 md:mt-16" dir="ltr">
            {/* Single column: logo → title → intro keeps reading order stable (avoids grid/RTL split issues) */}
            <div className="flex max-w-3xl flex-col gap-6 md:gap-8">
              <Reveal show={mounted} delayMs={100} className="w-full">
                <div className="relative w-full max-w-[min(100%,22rem)] sm:max-w-[26rem]">
                  <Image
                    src={accred.icon}
                    alt={accred.name}
                    width={420}
                    height={200}
                    className={`h-auto max-h-32 w-full object-contain object-left sm:max-h-36 md:max-h-40 ${
                      logoTight ? "object-center sm:object-left" : ""
                    }`}
                    priority
                  />
                </div>
              </Reveal>
              <Reveal show={mounted} delayMs={140}>
                <h1
                  className="text-4xl font-bold leading-tight text-black md:text-5xl"
                  style={{ fontFamily: "var(--font-menu)" }}
                >
                  {accred.title}
                </h1>
              </Reveal>
              <Reveal show={mounted} delayMs={160}>
                <p className="text-lg leading-relaxed text-black/80 md:text-xl">{accred.intro}</p>
              </Reveal>
            </div>

            <div className="mt-12 max-w-3xl space-y-10 md:mt-16 md:space-y-12 lg:space-y-14">
              {accred.sections.map((section, i) => (
                <Reveal key={section.heading} show={mounted} delayMs={200 + i * 60}>
                  <article>
                    <h2
                      className="text-2xl font-bold leading-tight text-black md:text-3xl"
                      style={{ fontFamily: "var(--font-menu)" }}
                    >
                      {section.heading}
                    </h2>
                    <p className="mt-5 text-base leading-relaxed text-black/75 md:text-lg">{section.body}</p>
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
