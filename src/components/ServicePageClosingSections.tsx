"use client"

import type { ReactNode } from "react"
import { FsInsetCtaCard } from "@/components/FsInsetCtaCard"
import { FsServiceFaqByRoute } from "@/components/FsServiceFaqByRoute"
import { FsServiceHeroQuickNav } from "@/components/FsServiceHeroQuickNav"
import { OurCustomers } from "@/components/ServicePageSharedSections"
import { Reveal } from "@/components/Reveal"

type ServicePageClosingSectionsProps = {
  serviceTitleShort: string
  /** Hero image shown faintly inside the inset CTA card. */
  ctaImageSrc: string
  ctaHeadline: string
  ctaHeadlineAccent: string
  ctaDescription: string
  children: ReactNode
}

/** Standard page tail: customer logos, FAQ, service quick nav, inset CTA card. */
export function ServicePageClosingSections({
  serviceTitleShort,
  ctaImageSrc,
  ctaHeadline,
  ctaHeadlineAccent,
  ctaDescription,
  children,
}: ServicePageClosingSectionsProps) {
  return (
    <>
      <OurCustomers serviceTitleShort={serviceTitleShort} />
      <FsServiceFaqByRoute />
      <section className="fs-service-closing-quick-nav border-t border-white/10 bg-[var(--page-bg)]">
        <div className="site-container py-10 sm:py-12 lg:py-14">
          <Reveal>
            <FsServiceHeroQuickNav showHint={false} />
          </Reveal>
        </div>
      </section>
      <FsInsetCtaCard
        variant="service"
        backgroundImageSrc={ctaImageSrc}
        headline={ctaHeadline}
        headlineAccent={ctaHeadlineAccent}
        description={ctaDescription}
      >
        {children}
      </FsInsetCtaCard>
    </>
  )
}
