import type { Metadata } from "next"
import Link from "next/link"
import { CapabilityServicePageLayout } from "@/components/CapabilityServicePageLayout"
import { buildFsMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = buildFsMetadata({
  title: "Fire Alarm Systems & Life Safety | London Installers | APX",
  description:
    "Addressable and conventional fire alarms — design, installation, commissioning and certification across London boroughs, Kent, Essex and the Home Counties. BS 5839-1 aligned delivery.",
  pathname: "/services/fire-life-safety",
})

const capabilities = [
  "Addressable fire alarm systems",
  "Conventional fire alarm systems",
  "Cause-and-effect programming",
  "System integration with EVAC, access control, and BMS",
  "Fire detection device installation (smoke, heat, multi-sensor)",
  "Manual call point installation",
  "Sounder and VAD installation",
  "Networked fire alarm systems",
  "Full commissioning and certification",
]

const compliance = ["BS 5839-1", "BS 5839-6 (where applicable)"]
const deliverables = ["As-built drawings", "Zone charts", "Commissioning certificates", "O&M manuals"]

const intro = (
  <>
    <p>
      APX Fire and Security delivers fully compliant fire alarm installations across commercial, industrial, and public-sector environments. Our engineers are trained in
      both addressable and conventional systems, ensuring accurate installation, configuration, and commissioning.
    </p>
    <p className="text-white/85">
      For dedicated{" "}
      <Link
        href="/services/refuge-disabled-communication"
        className="underline decoration-white/45 underline-offset-[3px] transition-colors hover:decoration-white"
      >
        refuge and disabled communication (EVC)
      </Link>{" "}
      or{" "}
      <Link
        href="/services/evac-voice-evacuation"
        className="underline decoration-white/45 underline-offset-[3px] transition-colors hover:decoration-white"
      >
        EVAC and voice evacuation
      </Link>
      , we maintain standalone scopes and documentation — follow the links for capabilities, standards and handover packs.
    </p>
  </>
)

export default function FireLifeSafetyPage() {
  return (
    <CapabilityServicePageLayout
      title="Fire alarm systems"
      intro={intro}
      capabilities={capabilities}
      compliance={compliance}
      deliverables={deliverables}
      ctaLabel="Discuss your project"
    />
  )
}
