import type { Metadata } from "next"
import { CapabilityServicePageLayout } from "@/components/CapabilityServicePageLayout"
import { buildFsMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = buildFsMetadata({
  title: "Fire Alarm Systems & Life Safety | London Installers | APX",
  description:
    "Addressable and conventional fire alarms, EVAC, voice evacuation, refuge systems — design, installation and commissioning across London boroughs, Kent, Essex and the Home Counties.",
  pathname: "/services/fire-life-safety",
})

const capabilities = [
  "Addressable fire alarm systems",
  "Conventional fire alarm systems",
  "Cause-and-effect programming",
  "System integration with EVAC, access control, and BMS",
  "Fire detection device installation (smoke, heat, multi-sensor)",
  "Manual call point installation, sounder and VAD installation",
  "Networked fire alarm systems",
  "Full commissioning and certification",
]

const compliance = ["BS 5839-1", "BS 5839-6 (where applicable)", "BS 5839-8", "BS 5839-9"]
const deliverables = ["As-built drawings", "Zone charts", "Commissioning certificates", "O&M manuals", "Audio testing reports"]

export default function FireLifeSafetyPage() {
  return (
    <CapabilityServicePageLayout
      title="Fire & life safety systems"
      intro="APX Fire and Security delivers compliant fire and life safety systems across commercial, industrial, and public-sector environments. Our engineers install, configure, test, and commission systems with clear coordination and minimal disruption."
      capabilities={capabilities}
      compliance={compliance}
      deliverables={deliverables}
      ctaLabel="Discuss your project"
    />
  )
}
