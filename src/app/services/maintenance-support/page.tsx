import type { Metadata } from "next"
import { CapabilityServicePageLayout } from "@/components/CapabilityServicePageLayout"

export const metadata: Metadata = {
  title: "Maintenance & Support | APX Fire & Security",
  description:
    "Planned preventative maintenance, 24/7 call-out support, upgrades, and compliance checks to keep fire and security systems fully operational.",
}

const capabilities = [
  "Planned preventative maintenance (PPM)",
  "24/7 call-out support",
  "System health checks",
  "Firmware and software updates",
  "Fault diagnostics and repairs",
  "System upgrades and compliance checks",
]

const compliance = ["BS 5839 maintenance requirements", "Manufacturer maintenance guidelines"]
const deliverables = ["Maintenance reports", "Asset registers", "Compliance certificates"]

export default function MaintenanceSupportPage() {
  return (
    <CapabilityServicePageLayout
      title="Maintenance & support"
      intro="APX provides ongoing support to keep critical fire and security systems compliant, reliable, and fully operational. We structure maintenance around your site risk profile and operating needs, with clear reporting and responsive fault support."
      capabilities={capabilities}
      compliance={compliance}
      deliverables={deliverables}
      ctaLabel="Discuss your support plan"
    />
  )
}
