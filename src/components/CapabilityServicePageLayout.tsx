import type { ReactNode } from "react"
import Link from "next/link"
import { ListChecks, ShieldCheck, Package, Check } from "lucide-react"
import { CapabilityServiceTabs } from "@/components/CapabilityServiceTabs"
import { ServicePageHero, type ServicePageHeroProps } from "@/components/ServicePageHero"

export type CapabilityServicePageLayoutProps = {
  /** Page title — sentence case, homepage title font */
  title: string
  intro: ReactNode
  /** Optional hero photo; omit for text-only hero on black (capability pillars) */
  heroImageSrc?: string
  /** Passed to ServicePageHero — core capability pillars omit bottom quick nav by default */
  heroNav?: ServicePageHeroProps["heroNav"]
  capabilities: string[]
  compliance: string[]
  deliverables: string[]
  ctaLabel: string
}

const listClass = "apx-capability-list"
const listItemClass = "apx-capability-list__item"

/** Outer: full page section width (title + inner block + CTA) */
const outerClass =
  "fs-capability-outer mx-auto w-full max-w-[min(100%,92rem)] px-4 sm:px-6 lg:px-8"

const sectionHeadingClass =
  "text-lg sm:text-xl font-semibold text-white font-title tracking-tight mb-4 flex items-center gap-2.5"

function CapabilityListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className={`${listItemClass} !flex items-start gap-2.5`}>
      <Check className="mt-[0.35rem] h-3.5 w-3.5 shrink-0 text-white/45" strokeWidth={2.5} aria-hidden />
      <span className="min-w-0">{children}</span>
    </li>
  )
}

export function CapabilityServicePageLayout({
  title,
  intro,
  heroImageSrc,
  heroNav,
  capabilities,
  compliance,
  deliverables,
  ctaLabel,
}: CapabilityServicePageLayoutProps) {
  return (
    <div className="service-page-root bg-black text-white">
      <ServicePageHero
        title={title}
        intro={intro}
        heroNav={heroNav ?? false}
        compact={!heroImageSrc}
        {...(heroImageSrc ? { imageSrc: heroImageSrc } : {})}
      />

      <div className="relative bg-black">
        <div
          className="pointer-events-none absolute top-0 left-0 right-0 z-0 h-28 sm:h-36"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.82) 52%, rgba(0,0,0,1) 100%)",
          }}
          aria-hidden
        />

        <div className="fs-capability-page fs-capability-page--section relative z-[1] pt-4 pb-20 sm:pt-5 sm:pb-24 lg:pb-28">
          <div className={outerClass}>
            <div className="fs-capability-unified mt-0 sm:mt-1">
              <div className="fs-capability-tabs-row">
                <CapabilityServiceTabs />
              </div>
              <div className="fs-capability-inner fs-capability-inner--unified">
                <div className="fs-capability-columns">
                  <div className="fs-capability-column min-w-0">
                    <h2 className={sectionHeadingClass}>
                      <ListChecks className="h-5 w-5 shrink-0 text-white/70" aria-hidden />
                      Capabilities
                    </h2>
                    <ul className={listClass}>
                      {capabilities.map((item) => (
                        <CapabilityListItem key={item}>{item}</CapabilityListItem>
                      ))}
                    </ul>
                  </div>

                  <div className="fs-capability-column min-w-0">
                    <h2 className={sectionHeadingClass}>
                      <ShieldCheck className="h-5 w-5 shrink-0 text-white/70" aria-hidden />
                      Compliance
                    </h2>
                    <ul className={listClass}>
                      {compliance.map((item) => (
                        <CapabilityListItem key={item}>{item}</CapabilityListItem>
                      ))}
                    </ul>
                  </div>

                  <div className="fs-capability-column min-w-0">
                    <h2 className={sectionHeadingClass}>
                      <Package className="h-5 w-5 shrink-0 text-white/70" aria-hidden />
                      Deliverables
                    </h2>
                    <ul className={listClass}>
                      {deliverables.map((item) => (
                        <CapabilityListItem key={item}>{item}</CapabilityListItem>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-14 flex flex-col items-stretch border-t border-white/15 pt-10 sm:mt-16 sm:pt-12 lg:mt-20">
              <div className="flex justify-end">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-none rounded-tl-xl rounded-tr-none rounded-br-xl rounded-bl-none border-2 border-white border-solid bg-transparent px-6 py-2.5 text-sm font-semibold normal-case tracking-normal text-white transition-colors duration-200 hover:!bg-white hover:!text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  {ctaLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
