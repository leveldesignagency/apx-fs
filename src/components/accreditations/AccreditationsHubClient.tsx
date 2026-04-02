"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Reveal } from "@/components/Reveal"
import { FS_ACCREDITATION_TAB_ORDER, FS_ACCREDITATIONS } from "@/data/fsAccreditations"

export function AccreditationsHubClient() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="about-block about-block--white about-section-px pt-24 pb-20 md:pt-28 md:pb-28 lg:pb-36">
        <div className="about-section-inner">
          <Reveal show={mounted} delayMs={0}>
            <header className="mb-12 md:mb-16 lg:mb-20 max-w-3xl">
              <span className="section-label section-label--black mb-4 block leading-none tracking-[0.12em]">Accreditations</span>
              <h1
                className="text-4xl font-bold leading-tight text-black lg:text-5xl"
                style={{ fontFamily: "var(--font-menu)" }}
              >
                Standards we work to
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-black/80 md:text-xl">
                Independent certification and procurement credentials — open a mark for the full story.
              </p>
            </header>
          </Reveal>

          <ul className="list-none divide-y divide-black/[0.08]">
            {FS_ACCREDITATION_TAB_ORDER.map((slug, i) => {
              const item = FS_ACCREDITATIONS[slug]
              const logoTight = slug === "bafe" || slug === "fia"
              return (
                <li key={slug} className="py-10 md:py-12 lg:py-14">
                  <Reveal show={mounted} delayMs={80 + i * 70} className="block">
                    <Link
                      href={`/accreditations/${slug}`}
                      className="group flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-12 lg:gap-16 xl:gap-20"
                    >
                      <div className="flex shrink-0 justify-center sm:w-48 md:w-52 lg:w-60 sm:justify-start sm:pt-1">
                        <Image
                          src={item.icon}
                          alt={item.name}
                          width={400}
                          height={180}
                          className={`h-auto w-full max-w-[220px] object-contain transition-transform duration-300 group-hover:scale-[1.02] sm:max-w-[240px] md:max-w-none ${
                            logoTight ? "max-h-24 sm:max-h-28 md:max-h-32" : "max-h-28 sm:max-h-32 md:max-h-36"
                          }`}
                        />
                      </div>
                      <div className="min-w-0 flex-1 text-center sm:text-left">
                        <h2
                          className="text-2xl font-bold leading-tight text-black sm:text-3xl md:text-4xl"
                          style={{ fontFamily: "var(--font-menu)" }}
                        >
                          {item.name}
                        </h2>
                        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-black/45 md:text-sm">
                          {item.shortLabel}
                        </p>
                        <p className="mt-5 text-base leading-relaxed text-black/80 sm:text-lg md:text-xl">{item.intro}</p>
                        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-black/70 transition-colors group-hover:text-black">
                          Read more
                          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                            →
                          </span>
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    </main>
  )
}
