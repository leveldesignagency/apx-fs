import type { Metadata } from "next"
import { CapabilityServicePageLayout } from "@/components/CapabilityServicePageLayout"
import { buildFsMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = buildFsMetadata({
  title: "Fire & Security Maintenance & Support | PPM London | APX",
  description:
    "Planned maintenance, 24/7 call-out, upgrades and compliance checks for fire alarms, CCTV and access control — across London boroughs and the South East.",
  pathname: "/services/maintenance-support",
})

const capabilities = [
  "Planned Preventative Maintenance (PPM)",
  "24/7 call-out support",
  "System health checks",
  "Firmware and software updates",
  "Fault diagnostics and repairs",
  "Compliance testing",
]

const compliance = ["BS 5839 maintenance requirements", "Manufacturer maintenance guidelines"]
const deliverables = ["Maintenance reports", "Asset registers", "Compliance certificates"]

const intro =
  "APX provides ongoing maintenance and support to ensure systems remain compliant, reliable, and fully operational. We structure programmes around your site risk profile and operating hours, with clear reporting and responsive fault support."

export default function MaintenanceSupportPage() {
  return (
    <CapabilityServicePageLayout
      title="Maintenance & support services"
      intro={intro}
      capabilities={capabilities}
      compliance={compliance}
      deliverables={deliverables}
      ctaLabel="Discuss your support plan"
    />
  )
}
