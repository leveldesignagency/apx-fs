import type { Metadata } from "next"
import { DeliveryMethodologyPageContent } from "@/components/DeliveryMethodologyPageContent"

export const metadata: Metadata = {
  title: "Delivery Methodology | APX Fire & Security",
  description:
    "How we deliver fire and security projects: from pre-construction and planning through installation, commissioning, handover and aftercare.",
}

export default function DeliveryMethodologyPage() {
  return <DeliveryMethodologyPageContent />
}
