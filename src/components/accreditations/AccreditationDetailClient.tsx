"use client"

import Image from "next/image"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { Reveal } from "@/components/Reveal"
import { LetterReveal } from "@/components/LetterReveal"
import { AccreditationLogo } from "@/components/accreditations/AccreditationLogo"
import { FsInsetCtaCard } from "@/components/FsInsetCtaCard"
import { CustomPillButton } from "@/components/ui/CustomPillButton"
import { CallPhoneCta } from "@/components/ui/CallPhoneCta"
import {
  FS_ACCREDITATIONS,
  FS_ACCREDITATION_TAB_ORDER,
  type FsAccreditationSlug,
} from "@/data/fsAccreditations"
import {
  FS_ACCREDITATION_COLOURED_ICONS,
  FS_ACCREDITATIONS_CONTENT_MAX,
  FS_ACCREDITATIONS_HERO_IMAGE,
  FS_ACCREDITATIONS_SECTION_PX,
} from "@/lib/fsAccreditationsLayout"
import { cn } from "@/lib/utils"

type AccredBody = (typeof FS_ACCREDITATIONS)[FsAccreditationSlug]

const DETAIL_BLOCKS: {
  key: keyof Pick<AccredBody, "intro" | "apxStatus" | "scope" | "whyItMatters">
  heading: string
}[] = [
  { key: "intro", heading: "What the Organisation Is" },
  { key: "apxStatus", heading: "APX's Status" },
  { key: "scope", heading: "Scope Covered" },
  { key: "whyItMatters", heading: "Why It Matters to Customers" },
]

export function AccreditationDetailClient({
  activeSlug,
  accred,
}: {
  activeSlug: FsAccreditationSlug
  accred: AccredBody
}) {
  const hubLabel = "All credentials"

  return (
    <div className="fs-accreditations-page fs-accreditation-detail-page min-h-screen overflow-x-hidden bg-[var(--page-bg)] text-white">
      <section className="relative isolate min-h-[52vh] overflow-hidden border-b border-white/10 md:min-h-[58vh]">
        <div className="absolute inset-0">
          <Image
            src={FS_ACCREDITATIONS_HERO_IMAGE}
            alt=""
            fill
            className="object-cover object-center scale-x-[-1]"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-black/58" aria-hidden />
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/82"
            aria-hidden
          />
        </div>

        <div className={`relative z-10 page-title-top pb-20 md:pb-24 lg:pb-28 ${FS_ACCREDITATIONS_SECTION_PX}`}>
          <div className={FS_ACCREDITATIONS_CONTENT_MAX}>
            <Reveal delayMs={0}>
              <Link
                href="/accreditations"
                className="section-label text-white/70 transition-colors hover:text-white"
              >
                {hubLabel}
              </Link>

              <nav aria-label="Credential pages" className="mt-8 flex flex-wrap gap-2 md:gap-3">
                {FS_ACCREDITATION_TAB_ORDER.map((slug) => {
                  const item = FS_ACCREDITATIONS[slug]
                  const active = slug === activeSlug
                  return (
                    <Link
                      key={slug}
                      href={`/accreditations/${slug}`}
                      className={cn(
                        "border px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.12em] transition-colors sm:px-4 sm:text-xs",
                        active
                          ? "border-white bg-white text-black"
                          : "border-white/35 text-white/85 hover:border-white/70 hover:text-white",
                      )}
                    >
                      {item.name}
                    </Link>
                  )
                })}
              </nav>

              <div className="mt-10 grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(12rem,20rem)] lg:items-center lg:gap-14">
                <div className="min-w-0 max-w-3xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">
                    {accred.shortLabel}
                  </p>
                  <LetterReveal as="h1" text={accred.name} desktopOnly={false} className="mt-3 font-title text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl" />
                  <p className="mt-5 max-w-2xl pb-2 text-base leading-relaxed text-white/85 md:mt-6 md:pb-4 md:text-lg lg:pb-6">
                    {accred.apxStatus}
                  </p>
                </div>

                <div className="relative z-10 flex shrink-0 justify-start lg:justify-end">
                  <div className="flex w-full max-w-[20rem] items-center justify-center bg-white px-6 py-7 sm:px-8 sm:py-8">
                    <AccreditationLogo
                      src={FS_ACCREDITATION_COLOURED_ICONS[activeSlug]}
                      alt={accred.name}
                      priority
                      width={activeSlug === "fia" ? 480 : 400}
                      height={activeSlug === "fia" ? 280 : 200}
                      className={cn(
                        activeSlug === "bafe"
                          ? "max-h-[6.5rem] max-w-[14.5rem] sm:max-h-[7.25rem] sm:max-w-[16rem]"
                          : activeSlug === "fia"
                            ? "max-h-[5.75rem] max-w-[16rem] sm:max-h-[6.5rem] sm:max-w-[17.5rem]"
                            : "max-h-[5.5rem] max-w-[14rem] sm:max-h-[6.25rem] sm:max-w-[15.5rem]",
                      )}
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className={`relative z-20 bg-[var(--page-bg)] ${FS_ACCREDITATIONS_SECTION_PX}`}>
        <div className={`${FS_ACCREDITATIONS_CONTENT_MAX} pt-12 pb-16 md:pt-14 md:pb-24`}>
          <Reveal delayMs={80}>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-x-14 md:gap-y-16 lg:gap-x-20">
              {DETAIL_BLOCKS.map(({ key, heading }, index) => (
                <article
                  key={key}
                  className={cn(
                    "min-w-0",
                    index % 2 === 1 ? "md:border-l md:border-white/10 md:pl-10 lg:pl-12" : "",
                  )}
                >
                  <h2 className="font-title text-xl font-bold leading-snug tracking-tight text-white md:text-2xl lg:text-[1.65rem]">
                    {heading}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-white/76 md:mt-5 md:text-[1.0625rem]">
                    {accred[key]}
                  </p>
                </article>
              ))}
            </div>
          </Reveal>

          {accred.ukasNote ? (
            <Reveal delayMs={120}>
              <aside className="mt-14 border-l-2 border-white/30 pl-5 md:mt-16 md:pl-6">
                <LetterReveal as="h2" text={'UKAS, Accurate Wording'} desktopOnly={false} className="font-title text-lg font-bold tracking-tight text-white md:text-xl" />
                <p className="mt-3 max-w-3xl text-base leading-relaxed text-white/72 md:text-[1.0625rem]">
                  {accred.ukasNote}
                </p>
              </aside>
            </Reveal>
          ) : null}

          {accred.registerUrl ? (
            <Reveal delayMs={140}>
              <div className="mt-12 border-t border-white/12 pt-10 md:mt-14 md:pt-12">
                <LetterReveal as="h2" text={'Official Register / Website'} desktopOnly={false} className="font-title text-xl font-bold tracking-tight text-white md:text-2xl" />
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">
                  Verify the live listing where a public register is available. Do not rely on website copy alone for
                  due diligence.
                </p>
                <a
                  href={accred.registerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-base font-semibold text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white"
                >
                  {accred.registerLabel ?? accred.registerUrl}
                  <ExternalLink className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
                </a>
              </div>
            </Reveal>
          ) : null}
        </div>
      </section>

      <FsInsetCtaCard
        variant="service"
        backgroundImageSrc={FS_ACCREDITATIONS_HERO_IMAGE}
        headline="Ready to talk"
        headlineAccent="through your project?"
        description="We can explain how our certifications, BAFE registration and industry membership support procurement and handover on your site."
      >
        <CustomPillButton href="/contact" size="lg">Contact</CustomPillButton>
        <CallPhoneCta size="lg" />
      </FsInsetCtaCard>
    </div>
  )
}
