import type { Metadata } from "next"
import Link from "next/link"
import { CapabilityServicePageLayout } from "@/components/CapabilityServicePageLayout"
import { buildFsMetadata } from "@/lib/seo-metadata"
import { FS_SERVICE_ROUTES } from "@/lib/fs-service-routes"

export const metadata: Metadata = buildFsMetadata({
  title: "Fire & Security Maintenance & Support | PPM London | APX",
  description:
    "Annual and six-monthly PPM, corrective works, system takeovers and 24/7 call-out for fire alarms, CCTV, access control, intruder alarms and video entry across London and the Home Counties.",
  pathname: "/services/maintenance-support",
})

const linkClass =
  "underline decoration-white/45 underline-offset-[3px] transition-colors hover:decoration-white"

const capabilities = [
  "Annual and six-monthly PPM",
  "Corrective works and repairs",
  "System takeovers",
  "Obsolescence planning",
  "Battery replacement",
  "Remote support where available",
  "Emergency out-of-hours response (contracted customers)",
  "Maintenance contracts",
  "Monitoring support",
  "Clear service reports after each visit",
]

const compliance = [
  "BS 5839 maintenance requirements (fire)",
  "Manufacturer maintenance guidelines",
  "NSI-aligned service records where applicable",
]

const deliverables = [
  "Visit service reports",
  "Defect and remedial records",
  "Asset and system records (where included in the agreement)",
  "Compliance evidence packs (where included in the agreement)",
]

const intro = (
  <>
    <p>
      APX provides planned maintenance and reactive support for fire and security systems, including{" "}
      <Link href={FS_SERVICE_ROUTES.fireAlarmSystems} className={linkClass}>
        fire alarms
      </Link>
      ,{" "}
      <Link href={FS_SERVICE_ROUTES.cctvSystems} className={linkClass}>
        CCTV
      </Link>
      ,{" "}
      <Link href={FS_SERVICE_ROUTES.accessControlSystems} className={linkClass}>
        access control
      </Link>
      ,{" "}
      <Link href={FS_SERVICE_ROUTES.intruderAlarmSystems} className={linkClass}>
        intruder alarms
      </Link>{" "}
      and{" "}
      <Link href={FS_SERVICE_ROUTES.videoDoorEntrySystems} className={linkClass}>
        video entry
      </Link>
     , so systems stay compliant, reliable and ready when you need them.
    </p>
    <p className="text-white/85">
      Programmes are structured around your site risk profile and operating hours.{" "}
      <strong className="font-semibold text-white">24/7 call-out support is available to customers on a maintenance
      agreement</strong>
      ; ad-hoc emergency attendance for non-contracted sites can be discussed case by case. See also our{" "}
      <Link href={FS_SERVICE_ROUTES.emergencyCallOut} className={linkClass}>
        24/7 call-out
      </Link>{" "}
      and{" "}
      <Link href={FS_SERVICE_ROUTES.monitoring} className={linkClass}>
        monitoring
      </Link>{" "}
      pages. Ask us about system takeovers and clear post-visit service reports.
    </p>
  </>
)

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
