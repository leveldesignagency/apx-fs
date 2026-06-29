"use client"

import type { ReactNode } from "react"
import { FsServiceFaqByRoute } from "@/components/FsServiceFaqByRoute"
import { OurCustomers } from "@/components/ServicePageSharedSections"
import { ServicePageBottomCta } from "@/components/ServicePageBottomCta"

type ServicePageClosingSectionsProps = {
  serviceTitleShort: string
  ctaImageSrc: string
  ctaTitle: string
  ctaDescription: string
  children: ReactNode
}

/** Standard page tail: customer marquee → FAQ (white) → CTA band (bottom). */
export function ServicePageClosingSections({
  serviceTitleShort,
  ctaImageSrc,
  ctaTitle,
  ctaDescription,
  children,
}: ServicePageClosingSectionsProps) {
  return (
    <>
      <OurCustomers serviceTitleShort={serviceTitleShort} />
      <FsServiceFaqByRoute />
      <ServicePageBottomCta imageSrc={ctaImageSrc} title={ctaTitle} description={ctaDescription}>
        {children}
      </ServicePageBottomCta>
    </>
  )
}
