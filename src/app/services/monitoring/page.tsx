import type { Metadata } from "next"
import Link from "next/link"
import { CapabilityServicePageLayout } from "@/components/CapabilityServicePageLayout"
import { buildFsMetadata } from "@/lib/seo-metadata"
import { FS_SERVICE_ROUTES } from "@/lib/fs-service-routes"

export const metadata: Metadata = buildFsMetadata({
  title: "Alarm Monitoring & ARC Signalling | APX Fire & Security",
  description:
    "Alarm receiving centre (ARC) signalling, dual-path options and remote monitoring pathways for intruder, fire and CCTV systems across London and the Home Counties.",
  pathname: FS_SERVICE_ROUTES.monitoring,
})

const linkClass =
  "underline decoration-white/45 underline-offset-[3px] transition-colors hover:decoration-white"

const capabilities = [
  "Alarm receiving centre (ARC) signalling",
  "Dual-path / resilient signalling options where required",
  "Intruder alarm monitoring pathways",
  "Fire alarm signalling arrangements where specified",
  "CCTV event / remote viewing pathways where offered",
  "Police / keyholder response documentation support",
  "Integration with new installs and system takeovers",
  "Ongoing signalling checks as part of maintenance agreements",
]

const compliance = [
  "PD 6662 / BS EN 50131 signalling expectations (intruder)",
  "ARC and insurer pathway requirements where applicable",
  "NSI-aligned documentation where monitoring forms part of the approved scope",
]

const deliverables = [
  "Survey-led monitoring recommendation",
  "Signalling configuration and test records",
  "Keyholder / response contact schedules",
  "Handover notes for facilities and security teams",
]

const intro = (
  <>
    <p>
      Monitoring keeps sites protected when nobody is on site. APX designs and commissions alarm receiving centre (ARC)
      signalling and related remote pathways for{" "}
      <Link href={FS_SERVICE_ROUTES.intruderAlarmSystems} className={linkClass}>
        intruder alarms
      </Link>
      ,{" "}
      <Link href={FS_SERVICE_ROUTES.fireAlarmSystems} className={linkClass}>
        fire alarms
      </Link>{" "}
      and{" "}
      <Link href={FS_SERVICE_ROUTES.cctvSystems} className={linkClass}>
        CCTV
      </Link>{" "}
      so events reach the right people quickly.
    </p>
    <p className="text-white/85">
      We align signalling with insurance and ARC requirements, document keyholder and response arrangements, and support
      monitoring as part of{" "}
      <Link href={FS_SERVICE_ROUTES.maintenanceSupport} className={linkClass}>
        planned maintenance
      </Link>{" "}
      or alongside{" "}
      <Link href={FS_SERVICE_ROUTES.emergencyCallOut} className={linkClass}>
        24/7 call-out
      </Link>{" "}
      cover for contracted customers. Exact ARC partners and response grades are confirmed at survey.
    </p>
  </>
)

export default function MonitoringServicePage() {
  return (
    <CapabilityServicePageLayout
      title="Monitoring & ARC signalling"
      intro={intro}
      capabilities={capabilities}
      compliance={compliance}
      deliverables={deliverables}
      ctaLabel="Enquire about monitoring"
      ctaHref="/contact?service=monitoring"
    />
  )
}
