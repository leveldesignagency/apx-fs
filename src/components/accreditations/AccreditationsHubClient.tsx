"use client"

import Link from "next/link"
import { Reveal } from "@/components/Reveal"
import { AccreditationLogo } from "@/components/accreditations/AccreditationLogo"
import { FsInsetCtaCard } from "@/components/FsInsetCtaCard"
import { CustomPillButton } from "@/components/ui/CustomPillButton"
import {
  FS_ACCREDITATIONS,
  FS_HUB_CREDENTIAL_SUMMARY,
  fsAccreditationCtaLabel,
  type FsAccreditationSlug,
} from "@/data/fsAccreditations"
import {
  FS_ACCREDITATION_COLOURED_ICONS,
  FS_ACCREDITATIONS_CONTENT_MAX,
  FS_ACCREDITATIONS_GRID_CTA_CLASS,
  FS_ACCREDITATIONS_HERO_IMAGE,
  FS_ACCREDITATIONS_SECTION_PX,
} from "@/lib/fsAccreditationsLayout"

/** Independent certification / registration / pre-qualification */
const ACCREDITATIONS: FsAccreditationSlug[] = ["nsi", "bafe", "constructionline"]

/** Trade association membership, not a third-party install accreditation */
const MEMBERSHIPS: FsAccreditationSlug[] = ["fia"]

function CredentialCards({ slugs, baseDelay }: { slugs: FsAccreditationSlug[]; baseDelay: number }) {
  return (
    <div className="space-y-8 md:space-y-10">
      {slugs.map((slug, i) => {
        const item = FS_ACCREDITATIONS[slug]
        const logoWide = slug === "constructionline"
        const logoBafe = slug === "bafe"
        const logoTight = slug === "fia"
        return (
          <Reveal key={slug} delayMs={baseDelay + i * 70}>
            <article className="grid grid-cols-1 border-2 border-white/70 bg-black lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
              <div className="flex min-h-[18rem] flex-col justify-between p-6 sm:p-8 md:min-h-[20rem] lg:p-10">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">
                    {item.shortLabel}
                  </p>
                  <h3
                    className="mt-3 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-[2.65rem]"
                    style={{ fontFamily: "var(--font-menu)" }}
                  >
                    {item.name}
                  </h3>
                  <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/72 md:mt-6 md:text-[1.0625rem] lg:text-lg">
                    {item.intro}
                  </p>
                  <p className="mt-4 max-w-2xl text-sm font-medium leading-relaxed text-white/85 md:text-base">
                    {item.apxStatus}
                  </p>
                </div>
                <div className="mt-8 lg:mt-10">
                  <Link href={`/accreditations/${slug}`} className={FS_ACCREDITATIONS_GRID_CTA_CLASS}>
                    <span className="pill-btn-inner" aria-hidden />
                    <span className="pill-btn-border" aria-hidden />
                    <span className="pill-text font-bold">{fsAccreditationCtaLabel(item.kind)}</span>
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
  )
}

export function AccreditationsHubClient() {
  return (
    <div className="fs-accreditations-page min-h-screen overflow-x-hidden bg-black text-white">
      <section className={`page-title-band border-b border-white/10 pb-24 md:pb-28 lg:pb-32 ${FS_ACCREDITATIONS_SECTION_PX}`}>
        <div className={FS_ACCREDITATIONS_CONTENT_MAX}>
          <Reveal delayMs={0}>
            <span className="section-label mb-3 block text-white/75">Credentials</span>
            <h1
              className="max-w-4xl text-3xl font-bold leading-[1.08] sm:text-4xl md:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-menu)" }}
            >
              Accreditations &amp; Memberships
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/72 sm:text-lg md:mt-5 md:pb-2">
              Independent certifications and registration first; industry memberships listed separately so it is clear
              what each credential means.
            </p>
          </Reveal>
        </div>
      </section>

      <section className={`border-b border-white/10 py-14 md:py-16 ${FS_ACCREDITATIONS_SECTION_PX}`}>
        <div className={FS_ACCREDITATIONS_CONTENT_MAX}>
          <Reveal delayMs={40}>
            <h2
              className="text-2xl font-bold text-white md:text-3xl"
              style={{ fontFamily: "var(--font-menu)" }}
            >
              At a glance
            </h2>
          </Reveal>
          <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FS_HUB_CREDENTIAL_SUMMARY.map((item, i) => (
              <Reveal key={item.label} delayMs={60 + i * 40}>
                <li className="border-t border-white/15 pt-4">
                  <p className="font-title text-lg font-semibold text-white md:text-xl">{item.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/65 md:text-[0.9375rem]">{item.detail}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className={`border-b border-white/10 py-16 md:py-20 lg:py-24 ${FS_ACCREDITATIONS_SECTION_PX}`}>
        <div className={FS_ACCREDITATIONS_CONTENT_MAX}>
          <Reveal delayMs={40}>
            <h2
              className="mb-3 text-2xl font-bold text-white md:text-3xl"
              style={{ fontFamily: "var(--font-menu)" }}
            >
              Accreditations &amp; certifications
            </h2>
            <p className="mb-10 max-w-2xl text-sm leading-relaxed text-white/60 md:mb-12 md:text-base">
              Third-party approval, registration and pre-qualification that relate to how we design, install and maintain
              systems.
            </p>
          </Reveal>
          <CredentialCards slugs={ACCREDITATIONS} baseDelay={60} />
        </div>
      </section>

      <section className={`py-16 md:py-20 lg:py-24 ${FS_ACCREDITATIONS_SECTION_PX}`}>
        <div className={FS_ACCREDITATIONS_CONTENT_MAX}>
          <Reveal delayMs={40}>
            <h2
              className="mb-3 text-2xl font-bold text-white md:text-3xl"
              style={{ fontFamily: "var(--font-menu)" }}
            >
              Memberships
            </h2>
            <p className="mb-10 max-w-2xl text-sm leading-relaxed text-white/60 md:mb-12 md:text-base">
              Industry association membership supports training and guidance. It is not a substitute for NSI or BAFE
              certification.
            </p>
          </Reveal>
          <CredentialCards slugs={MEMBERSHIPS} baseDelay={60} />
        </div>
      </section>

      <div className="h-[2px] w-full bg-white/45" aria-hidden />

      <FsInsetCtaCard
        variant="service"
        backgroundImageSrc={FS_ACCREDITATIONS_HERO_IMAGE}
        showBorderTop={false}
        headline="Discuss your"
        headlineAccent="requirements."
        description="Need assurance on standards, certification or procurement for an upcoming project? Our team can talk through how these credentials apply to your scope."
      >
        <CustomPillButton href="/contact" size="lg">
          Get in touch
        </CustomPillButton>
        <CustomPillButton href="tel:02083032280" size="lg" variant="outline">
          Call 020 8303 2280
        </CustomPillButton>
      </FsInsetCtaCard>
    </div>
  )
}
