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
  "CCTV systems (IP and analogue)",
  "NVR and DVR installation",
  "Remote monitoring integration",
  "Perimeter protection and ANPR",
  "Intruder alarm systems (Grade 2 and Grade 3)",
  "Monitoring and police response integration",
  "Video entry and door access control",
  "Integration with fire alarms and building systems",
]

const compliance = ["BS EN 62676", "PD 6662", "BS EN 50131", "BS EN 60839", "GDPR-compliant data handling"]
const deliverables = ["Camera schedules", "Network diagrams", "Recording retention setup", "System design proposal", "Commissioning certificates", "User training"]

const intro = (
  <>
    <p>
      We design and install integrated security systems that provide dependable protection while fitting seamlessly with wider building operations. APX delivers structured, compliant installations from design through commissioning and handover — including CCTV, intruder alarms, video entry and access control in coordinated packages.
    </p>
    <p className="text-white/85">
      For how these disciplines connect across fire, security and building systems, see{" "}
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
