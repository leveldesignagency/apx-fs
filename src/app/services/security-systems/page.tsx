import type { Metadata } from "next"
import Link from "next/link"
import { CapabilityServicePageLayout } from "@/components/CapabilityServicePageLayout"
import { buildFsMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = buildFsMetadata({
  title: "CCTV, Access Control & Intruder Alarms | London | APX",
  description:
    "CCTV, intruder alarms, video door entry and access control for commercial, industrial and public-sector sites across Greater London, Kent, Essex and the Home Counties.",
  pathname: "/services/security-systems",
})

const capabilities = [
  "Fire alarm to access control release",
  "CCTV event-triggered recording",
  "Intruder alarm to monitoring station",
  "EVAC to fire alarm cause-and-effect",
  "BMS integration",
  "Networked multi-system solutions",
  "Reduced false alarms",
  "Improved site security",
  "Streamlined building management",
  "Enhanced emergency response",
]

const compliance = ["BS 5839-1", "BS EN 62676", "PD 6662", "BS EN 50131", "BS EN 60839", "GDPR-compliant data handling"]
const deliverables = [
  "Integration test records",
  "Interface schedules",
  "Commissioning certificates",
  "Cause-and-effect matrices",
  "O&M and user training",
]

const intro = (
  <>
    <p>
      APX specialises in delivering integrated fire and security solutions that operate seamlessly across multiple systems — from coordinated interfaces and monitoring to
      handover documentation that reflects how your site actually runs.
    </p>
    <p className="text-white/85">
      For how each discipline is delivered on its own, browse the{" "}
      <Link href="/services" className="underline decoration-white/45 underline-offset-[3px] transition-colors hover:decoration-white">
        services hub
      </Link>{" "}
      or see{" "}
      <Link
        href="/about#disciplines-and-integration"
        className="underline decoration-white/45 underline-offset-[3px] transition-colors hover:decoration-white"
      >
        Disciplines &amp; integrated delivery
      </Link>{" "}
      on our About page.
    </p>
  </>
)

export default function SecuritySystemsPage() {
  return (
    <CapabilityServicePageLayout
      title="Security systems"
      intro={intro}
      capabilities={capabilities}
      compliance={compliance}
      deliverables={deliverables}
      ctaLabel="Discuss your project"
    />
  )
}
