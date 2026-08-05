"use client"

import type { ReactNode } from "react"
import { FsInsetCtaCard } from "@/components/FsInsetCtaCard"
import { FsServiceFaqByRoute } from "@/components/FsServiceFaqByRoute"
import { OurCustomers } from "@/components/ServicePageSharedSections"

type ServicePageClosingSectionsProps = {
  serviceTitleShort: string
  /** Hero image shown faintly inside the inset CTA card. */
  ctaImageSrc: string
  ctaHeadline: string
  ctaHeadlineAccent: string
  ctaDescription: string
  ctaEyebrow?: string
  children: ReactNode
}

/** Standard page tail: customer marquee, FAQ, inset CTA card (replaces full-bleed photo band). */
export function ServicePageClosingSections({
  serviceTitleShort,
  ctaImageSrc,
  ctaHeadline,
  ctaHeadlineAccent,
  ctaDescription,
  ctaEyebrow = "NSI Gold installer",
  children,
}: ServicePageClosingSectionsProps) {
  return (
    <>
      <OurCustomers serviceTitleShort={serviceTitleShort} />
      <FsServiceFaqByRoute />
      <FsInsetCtaCard
        variant="service"
        backgroundImageSrc={ctaImageSrc}
        eyebrow={ctaEyebrow}
        headline={ctaHeadline}
        headlineAccent={ctaHeadlineAccent}
        description={ctaDescription}
      >
        {children}
      </FsInsetCtaCard>
    </>
  )
}
