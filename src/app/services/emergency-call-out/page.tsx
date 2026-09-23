import type { Metadata } from "next"
import Link from "next/link"
import { CapabilityServicePageLayout } from "@/components/CapabilityServicePageLayout"
import { buildFsMetadata } from "@/lib/seo-metadata"
import { FS_SERVICE_ROUTES } from "@/lib/fs-service-routes"

export const metadata: Metadata = buildFsMetadata({
  title: "24/7 Emergency Call-Out | Fire & Security | APX Fire & Security",
  description:
    "24/7 emergency engineer call-out for fire and security faults for contracted customers across London and the Home Counties, with planned maintenance between incidents.",
  pathname: FS_SERVICE_ROUTES.emergencyCallOut,
})

const linkClass =
  "underline decoration-white/45 underline-offset-[3px] transition-colors hover:decoration-white"

const capabilities = [
  "24/7 / out-of-hours emergency engineer response (contracted customers)",
  "Fire alarm fault and false-alarm attendance",
  "Intruder, CCTV, access control and video entry reactive support",
  "Escalation aligned to your site contacts and SLAs",
  "Coordination with monitoring / ARC pathways where in place",
  "Follow-up remedial works after emergency attendance",
  "Ad-hoc attendance for non-contracted sites discussed case by case",
]

const compliance = [
  "Response expectations set in the maintenance agreement",
  "Manufacturer and British Standards guidance followed on remedial works",
  "Clear attendance and defect records after each call-out",
]

const deliverables = [
  "Engineer attendance and fault diagnosis",
  "Service / attendance report",
  "Recommended remediations and parts where required",
  "Escalation notes for facilities or security managers",
]

const intro = (
  <>
    <p>
      When a fire or security system needs urgent attention, APX provides{" "}
      <strong className="font-semibold text-white">24/7 call-out cover for customers on a maintenance agreement</strong>
      {" "}
      so faults, false alarms and critical failures can be attended outside normal hours across London and the Home
      Counties.
    </p>
    <p className="text-white/85">
      Call-out works best alongside{" "}
      <Link href={FS_SERVICE_ROUTES.maintenanceSupport} className={linkClass}>
        planned preventative maintenance
      </Link>{" "}
      and, where required,{" "}
      <Link href={FS_SERVICE_ROUTES.monitoring} className={linkClass}>
        monitoring / ARC signalling
      </Link>
      . Ad-hoc emergency attendance for sites without a contract can be discussed case by case - tell us your system type
      and location when you enquire.
    </p>
  </>
)

export default function EmergencyCallOutPage() {
  return (
    <CapabilityServicePageLayout
      title="24/7 emergency call-out"
      intro={intro}
      capabilities={capabilities}
      compliance={compliance}
      deliverables={deliverables}
      ctaLabel="Arrange call-out cover"
      ctaHref="/contact?service=emergency-call-out"
    />
  )
}
