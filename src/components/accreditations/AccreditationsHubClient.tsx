"use client"

import Link from "next/link"
import { Reveal } from "@/components/Reveal"
import { LetterReveal } from "@/components/LetterReveal"
import { ServiceItemReveal } from "@/components/ServiceItemReveal"
import { AccreditationLogo } from "@/components/accreditations/AccreditationLogo"
import { FsInsetCtaCard } from "@/components/FsInsetCtaCard"
import { CustomPillButton } from "@/components/ui/CustomPillButton"
import { CallPhoneCta } from "@/components/ui/CallPhoneCta"
import {
  FS_ACCREDITATIONS,
  FS_HUB_CREDENTIAL_SUMMARY,
  fsAccreditationCtaLabel,
  type FsAccreditationKind,
  type FsAccreditationSlug,
} from "@/data/fsAccreditations"
import {
  FS_ACCREDITATION_COLOURED_ICONS,
  FS_ACCREDITATIONS_CONTENT_MAX,
  FS_ACCREDITATIONS_HERO_IMAGE,
  FS_ACCREDITATIONS_SECTION_PX,
} from "@/lib/fsAccreditationsLayout"
import { toTitleCase } from "@/lib/titleCase"

/** Independent certification / registration / pre-qualification */
const ACCREDITATIONS: FsAccreditationSlug[] = ["nsi", "bafe", "constructionline"]

/** Trade association membership, not a third-party install accreditation */
const MEMBERSHIPS: FsAccreditationSlug[] = ["fia"]

function kindLabel(kind: FsAccreditationKind): string {
  switch (kind) {
    case "membership":
      return "Membership"
    case "prequalification":
      return "Pre-qualification"
    case "registration":
      return "Registration"
    default:
      return "Certification"
  }
}

function CredentialCards({
  slugs,
  baseIndex = 0,
  columns = 2,
}: {
  slugs: FsAccreditationSlug[]
  baseIndex?: number
  /** Desktop column count — use 3 for the main accreditation row */
  columns?: 1 | 2 | 3
}) {
  const gridCols =
    columns === 3
      ? "grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
      : columns === 1
        ? "grid-cols-1 gap-8 md:max-w-xl"
        : "grid-cols-1 gap-8 md:grid-cols-2 md:gap-10"

  return (
    <ul className={`m-0 grid list-none p-0 ${gridCols}`}>
      {slugs.map((slug, i) => {
        const item = FS_ACCREDITATIONS[slug]
        const logoWide = slug === "constructionline" || slug === "fia"
        const compact = columns === 3
        return (
          <li key={slug} className="m-0 min-w-0 p-0">
            <ServiceItemReveal index={baseIndex + i} stepMs={90} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden border border-white/12 bg-black/40 transition-[border-color] duration-300 hover:border-white/35">
                <Link
                  href={`/accreditations/${slug}`}
                  className="absolute inset-0 z-10"
                  aria-label={`${fsAccreditationCtaLabel(item.kind)}: ${item.name}`}
                >
                  <span className="sr-only">{fsAccreditationCtaLabel(item.kind)}</span>
                </Link>

                <div
                  className={
                    compact
                      ? "relative flex min-h-[11rem] items-center justify-center bg-white px-6 py-9 sm:min-h-[12rem] sm:px-8 lg:min-h-[12.5rem]"
                      : "relative flex min-h-[10.5rem] items-center justify-center bg-white px-8 py-10 sm:min-h-[11.5rem] sm:px-10"
                  }
                >
                  <AccreditationLogo
                    src={FS_ACCREDITATION_COLOURED_ICONS[slug]}
                    alt={item.name}
                    width={slug === "fia" ? 480 : 400}
                    height={slug === "fia" ? 280 : 200}
                    className={
                      compact
                        ? logoWide
                          ? "max-h-[5.75rem] max-w-[15rem] sm:max-h-[6.5rem] sm:max-w-[17rem]"
                          : slug === "bafe"
                            ? "max-h-[6.5rem] max-w-[13.5rem] sm:max-h-[7.25rem] sm:max-w-[15rem]"
                            : "max-h-[5.75rem] max-w-[14.5rem] sm:max-h-[6.5rem] sm:max-w-[16rem]"
                        : logoWide
                          ? "max-h-[5.75rem] max-w-[17rem] sm:max-h-[6.5rem] sm:max-w-[19rem]"
                          : slug === "bafe"
                            ? "max-h-[6.25rem] max-w-[14rem] sm:max-h-[7rem] sm:max-w-[15.5rem]"
                            : "max-h-[5.5rem] max-w-[15rem] sm:max-h-[6.25rem] sm:max-w-[16.5rem]"
                    }
                  />
                </div>

                <div className="relative z-0 flex flex-1 flex-col p-5 sm:p-6 md:p-7">
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-white/45">
                    {kindLabel(item.kind)}
                    <span aria-hidden> · </span>
                    {item.shortLabel}
                  </p>
                  <h3 className="mt-2 font-title text-xl font-bold leading-snug tracking-tight text-white sm:text-2xl md:text-[1.65rem]">
                    {toTitleCase(item.name)}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-white/65 sm:text-base">{item.intro}</p>
                  <p className="mt-4 text-sm font-medium leading-relaxed text-white/85 sm:text-[0.9375rem]">
                    {item.apxStatus}
                  </p>
                  <div className="pointer-events-none mt-6" aria-hidden>
                    <CustomPillButton href={`/accreditations/${slug}`} size="sm" tabIndex={-1}>
                      {fsAccreditationCtaLabel(item.kind)}
                    </CustomPillButton>
                  </div>
                </div>
              </article>
            </ServiceItemReveal>
          </li>
        )
      })}
    </ul>
  )
}

export function AccreditationsHubClient() {
  return (
    <div className="fs-accreditations-page min-h-screen overflow-x-hidden bg-[var(--page-bg)] text-white">
      <section className={`page-title-band border-b border-white/10 ${FS_ACCREDITATIONS_SECTION_PX}`}>
        <div className={FS_ACCREDITATIONS_CONTENT_MAX}>
          <div className="max-w-3xl">
            <Reveal>
              <span className="section-label mb-3 block text-white/75">Credentials</span>
              <LetterReveal
                as="h1"
                text={"Accreditations\n& Memberships"}
                desktopOnly={false}
                className="accreditations-hub-title text-left font-title text-[2.35rem] font-bold leading-[1.05] tracking-tight sm:text-5xl sm:leading-[1.05] md:text-6xl md:leading-[1.02] lg:text-7xl lg:leading-[1.02]"
              />
              <p className="mt-4 max-w-2xl text-left text-base font-normal leading-relaxed tracking-tight text-white/70 sm:text-lg md:text-xl">
                Independent certifications and registration first; industry memberships listed separately so it is clear
                what each credential means for your project.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className={`border-b border-white/10 py-12 md:py-14 ${FS_ACCREDITATIONS_SECTION_PX}`}>
        <div className={FS_ACCREDITATIONS_CONTENT_MAX}>
          <Reveal delayMs={40}>
            <LetterReveal as="h2" text="At a Glance" desktopOnly={false} className="font-title text-2xl font-bold tracking-tight text-white md:text-3xl" />
          </Reveal>
          <ul className="mt-8 m-0 grid list-none grid-cols-1 gap-x-8 gap-y-7 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {FS_HUB_CREDENTIAL_SUMMARY.map((item, i) => (
              <ServiceItemReveal key={item.label} index={i} stepMs={70}>
                <li className="m-0 border-t border-white/15 pt-4">
                  <p className="font-title text-lg font-semibold tracking-tight text-white md:text-xl">{item.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/65 md:text-[0.9375rem]">{item.detail}</p>
                </li>
              </ServiceItemReveal>
            ))}
          </ul>
        </div>
      </section>

      <section className={`border-b border-white/10 pt-12 pb-16 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24 ${FS_ACCREDITATIONS_SECTION_PX}`}>
        <div className={FS_ACCREDITATIONS_CONTENT_MAX}>
          <Reveal delayMs={40}>
            <LetterReveal as="h2" text="Accreditations & Certifications" desktopOnly={false} className="font-title text-2xl font-bold tracking-tight text-white md:text-3xl" />
            <p className="mt-3 mb-10 max-w-2xl text-sm leading-relaxed text-white/60 md:mb-12 md:text-base">
              Third-party approval, registration and pre-qualification that relate to how we design, install and maintain
              systems.
            </p>
          </Reveal>
          <CredentialCards slugs={ACCREDITATIONS} baseIndex={0} columns={3} />
        </div>
      </section>

      <section className={`pt-12 pb-16 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24 ${FS_ACCREDITATIONS_SECTION_PX}`}>
        <div className={FS_ACCREDITATIONS_CONTENT_MAX}>
          <Reveal delayMs={40}>
            <LetterReveal as="h2" text="Memberships" desktopOnly={false} className="font-title text-2xl font-bold tracking-tight text-white md:text-3xl" />
            <p className="mt-3 mb-10 max-w-2xl text-sm leading-relaxed text-white/60 md:mb-12 md:text-base">
              Industry association membership supports training and guidance. It is not a substitute for NSI or BAFE
              certification.
            </p>
          </Reveal>
          <CredentialCards slugs={MEMBERSHIPS} baseIndex={ACCREDITATIONS.length} />
        </div>
      </section>

      <FsInsetCtaCard
        variant="service"
        backgroundImageSrc={FS_ACCREDITATIONS_HERO_IMAGE}
        showBorderTop
        headline="Discuss your"
        headlineAccent="requirements"
        description="Need assurance on standards, certification or procurement for an upcoming project? Our team can talk through how these credentials apply to your scope."
      >
        <CustomPillButton href="/contact" size="lg">Contact</CustomPillButton>
        <CallPhoneCta size="lg" />
      </FsInsetCtaCard>
    </div>
  )
}
