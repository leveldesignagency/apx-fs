"use client"

import type { ReactNode } from "react"
import { ServiceComplianceSection } from "@/components/ServiceComplianceSection"

type CctvComplianceSectionProps = {
  intro: string
  standardsItems: string[]
  footerNote: ReactNode
  deliverablesTitle?: string
  deliverablesItems: string[]
}

/** White-band standards & deliverables block shared across CCTV service pages */
export function CctvComplianceSection({
  intro,
  standardsItems,
  footerNote,
  deliverablesTitle = "Deliverables & lifecycle",
  deliverablesItems,
}: CctvComplianceSectionProps) {
  return (
    <ServiceComplianceSection
      intro={intro}
      leftEyebrow="CCTV & surveillance alignment"
      standardsItems={standardsItems}
      footerNote={footerNote}
      rightTitle={deliverablesTitle}
      deliverablesItems={deliverablesItems}
    />
  )
}
