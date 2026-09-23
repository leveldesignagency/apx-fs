import type { Metadata } from "next"
import { DeliveryMethodologyPageContent } from "@/components/DeliveryMethodologyPageContent"
import { buildFsMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = buildFsMetadata({
  title: "Delivery Methodology | Fire & Security Projects | London & South East | APX",
  description:
    "How APX Fire & Security delivers projects: survey and consultation, design and coordination, pre-construction planning, installation, commissioning and certification, then handover, maintenance and support, across London and the Home Counties.",
  pathname: "/delivery-methodology",
})

export default function DeliveryMethodologyPage() {
  return <DeliveryMethodologyPageContent />
}
