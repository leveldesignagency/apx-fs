"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/Reveal"
import { FS_ACCREDITATION_TAB_ORDER, FS_ACCREDITATIONS } from "@/data/fsAccreditations"

export function AccreditationsHubClient() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <main className="accreditations-hub min-h-screen bg-white text-black">
      {/* Extra top padding so titles clear the site header */}
      <section className="bg-black text-white about-section-px page-title-top pb-12 md:pb-16 lg:pb-16">
        <div className="about-section-inner max-w-4xl">
          <Reveal show={mounted} delayMs={0}>
            <header>
              <span className="section-label mb-4 block text-white/60">Accreditations</span>
              <h1
                className="text-4xl font-bold leading-[1.08] text-white md:text-5xl lg:text-[3.25rem]"
                style={{ fontFamily: "var(--font-menu)" }}
              >
                Standards we work to
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
                Independent certification and procurement credentials that underpin how we deliver — open a mark for the full story.
              </p>
            </header>
          </Reveal>
        </div>
      </section>

      <section className="bg-white about-section-px mt-10 pb-20 pt-20 md:mt-12 md:pb-28 md:pt-28 lg:mt-14 lg:pt-36">
        <div className="about-section-inner">
          <ul className="grid list-none grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
            {FS_ACCREDITATION_TAB_ORDER.map((slug, i) => {
              const item = FS_ACCREDITATIONS[slug]
              const logoTight = slug === "bafe" || slug === "fia"
              return (
                <li key={slug} className="h-full">
                  <Reveal show={mounted} delayMs={80 + i * 70} className="h-full">
                    <Link
                      href={`/accreditations/${slug}`}
                      className="group flex h-full flex-col rounded-3xl border border-black/10 bg-white p-8 shadow-[0_4px_40px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-black/20 hover:shadow-[0_12px_48px_rgba(0,0,0,0.1)] md:p-9"
                    >
                      <div className="mb-6 flex min-h-[5.5rem] items-center justify-center border-b border-black/[0.06] pb-6">
                        <Image
                          src={item.icon}
                          alt={item.name}
                          width={400}
                          height={180}
                          className={`h-auto w-auto max-w-[168px] object-contain transition-transform duration-300 group-hover:scale-[1.02] sm:max-w-[188px] ${
                            logoTight ? "max-h-[5.25rem] sm:max-h-[5.75rem]" : "max-h-[6rem] sm:max-h-[6.5rem]"
                          }`}
                        />
                      </div>
                      <h2
                        className="text-center text-2xl font-bold leading-tight text-black sm:text-left md:text-3xl"
                        style={{ fontFamily: "var(--font-menu)" }}
                      >
                        {item.name}
                      </h2>
                      <p className="mt-2 text-center text-xs font-semibold uppercase tracking-[0.14em] text-black/45 sm:text-left md:text-sm">
                        {item.shortLabel}
                      </p>
                      <p className="mt-4 flex-1 text-center text-base leading-relaxed text-black/78 sm:text-left md:text-lg">
                        {item.intro}
                      </p>
                      <span className="mt-6 inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-black sm:justify-start">
                        <span className="transition-colors group-hover:text-black">Read more</span>
                        <ArrowUpRight
                          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden
                        />
                      </span>
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
