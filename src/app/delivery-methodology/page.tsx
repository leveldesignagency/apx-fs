import type { Metadata } from "next"
import { DeliveryMethodologyPageContent } from "@/components/DeliveryMethodologyPageContent"
import { buildFsMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = buildFsMetadata({
  title: "Delivery Methodology | Fire & Security Projects | London & South East | APX",
  description:
    "How APX delivers fire and security: pre-construction, design coordination, installation, commissioning, handover and aftercare — for sites across Greater London, Kent, Essex and the Home Counties.",
  pathname: "/delivery-methodology",
})

export default function DeliveryMethodologyPage() {
  return <DeliveryMethodologyPageContent />
}
