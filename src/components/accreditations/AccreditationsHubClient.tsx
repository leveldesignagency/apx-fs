"use client"

import Link from "next/link"
import { Reveal } from "@/components/Reveal"
import { AccreditationLogo } from "@/components/accreditations/AccreditationLogo"
import { FsInsetCtaCard } from "@/components/FsInsetCtaCard"
import { CustomPillButton } from "@/components/ui/CustomPillButton"
import { FS_ACCREDITATION_TAB_ORDER, FS_ACCREDITATIONS } from "@/data/fsAccreditations"
import {
  FS_ACCREDITATION_COLOURED_ICONS,
  FS_ACCREDITATIONS_CONTENT_MAX,
  FS_ACCREDITATIONS_GRID_CTA_CLASS,
  FS_ACCREDITATIONS_SECTION_PX,
} from "@/lib/fsAccreditationsLayout"

export function AccreditationsHubClient() {
  return (
    <div className="fs-accreditations-page min-h-screen overflow-x-hidden bg-black text-white">
      <section className={`page-title-band border-b border-white/10 pb-24 md:pb-28 lg:pb-32 ${FS_ACCREDITATIONS_SECTION_PX}`}>
        <div className={FS_ACCREDITATIONS_CONTENT_MAX}>
          <Reveal delayMs={0}>
            <span className="section-label mb-3 block text-white/75">Accreditations</span>
            <h1
              className="max-w-4xl text-3xl font-bold leading-[1.08] sm:text-4xl md:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-menu)" }}
            >
              Accredited &amp; fully qualified
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/72 sm:text-lg md:mt-5 md:pb-2">
              Independent certification and industry alignment so your fire and security packages are delivered with
              clear governance, competent engineers and documentation that stands up to handover and audit.
            </p>
          </Reveal>
        </div>
      </section>

      <section className={`py-16 md:py-20 lg:py-24 ${FS_ACCREDITATIONS_SECTION_PX}`}>
        <div className={FS_ACCREDITATIONS_CONTENT_MAX}>
          <div className="space-y-8 md:space-y-10">
            {FS_ACCREDITATION_TAB_ORDER.map((slug, i) => {
              const item = FS_ACCREDITATIONS[slug]
              const logoWide = slug === "constructionline"
              const logoBafe = slug === "bafe"
              const logoTight = slug === "fia"
              return (
                <Reveal key={slug} delayMs={60 + i * 70}>
                  <article className="grid grid-cols-1 border-2 border-white/70 bg-black lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
                    <div className="flex min-h-[18rem] flex-col justify-between p-6 sm:p-8 md:min-h-[20rem] lg:p-10">
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">{item.shortLabel}</p>
                        <h2
                          className="mt-3 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-[2.65rem]"
                          style={{ fontFamily: "var(--font-menu)" }}
                        >
                          {item.name}
                        </h2>
                        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/72 md:mt-6 md:text-[1.0625rem] lg:text-lg">
                          {item.intro}
                        </p>
                      </div>
                      <div className="mt-8 lg:mt-10">
                        <Link href={`/accreditations/${slug}`} className={FS_ACCREDITATIONS_GRID_CTA_CLASS}>
                          <span className="pill-btn-inner" aria-hidden />
                          <span className="pill-btn-border" aria-hidden />
                          <span className="pill-text font-bold">View accreditation</span>
                        </Link>
                      </div>
                    </div>

                    <div className="flex min-h-[14rem] items-center justify-center border-t-2 border-white/70 px-8 py-10 sm:min-h-[16rem] sm:px-10 lg:min-h-[20rem] lg:border-l-2 lg:border-t-0 lg:px-12 lg:py-12">
                      <AccreditationLogo
                        src={FS_ACCREDITATION_COLOURED_ICONS[slug]}
                        alt={item.name}
                        width={400}
                        height={200}
                        className={
                          logoWide
                            ? "max-h-[7.5rem] max-w-[18rem] sm:max-h-[8.5rem] sm:max-w-[20rem] lg:max-h-[9.5rem] lg:max-w-[22rem]"
                            : logoBafe
                              ? "max-h-[8.75rem] max-w-[15.5rem] -translate-x-2 sm:max-h-[9.75rem] sm:max-w-[17rem] sm:-translate-x-2.5 lg:max-h-[11.25rem] lg:max-w-[19rem] lg:-translate-x-3"
                            : logoTight
                              ? "max-h-[8rem] max-w-[14rem] sm:max-h-[9rem] sm:max-w-[15.5rem] lg:max-h-[10.5rem] lg:max-w-[17rem]"
                              : "max-h-[7.5rem] max-w-[16rem] sm:max-h-[8.5rem] sm:max-w-[18rem] lg:max-h-[9.5rem] lg:max-w-[20rem]"
                        }
                      />
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <div className="h-[2px] w-full bg-white/45" aria-hidden />

      <FsInsetCtaCard
        variant="light"
        showBorderTop={false}
        eyebrow="NSI Gold installer"
        headline="Discuss your"
        headlineAccent="requirements."
        description="Need assurance on standards, certification or procurement for an upcoming project? Our team can talk through how these credentials apply to your scope."
      >
        <CustomPillButton href="/contact" size="lg" variant="onLight">
          Get in touch
        </CustomPillButton>
        <CustomPillButton href="tel:02083032280" size="lg" variant="outline">
          Call 020 8303 2280
        </CustomPillButton>
      </FsInsetCtaCard>
    </div>
  )
}
