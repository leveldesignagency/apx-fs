import type { Metadata } from "next"
import Link from "next/link"
import { CapabilityServicePageLayout } from "@/components/CapabilityServicePageLayout"
import { buildFsMetadata } from "@/lib/seo-metadata"
import { FS_SERVICE_ROUTES } from "@/lib/fs-service-routes"

export const metadata: Metadata = buildFsMetadata({
  title: "Fire & Life Safety Overview | London | APX",
  description:
    "Overview of APX fire and life-safety delivery: fire alarms, EVAC, disabled refuge, fire telephones, toilet alarms, cause-and-effect, commissioning and ongoing maintenance across London and the Home Counties.",
  pathname: "/services/fire-life-safety",
})

const linkClass =
  "underline decoration-white/45 underline-offset-[3px] transition-colors hover:decoration-white"

const capabilities = [
  <Link key="fire" href={FS_SERVICE_ROUTES.fireAlarmSystems} className={linkClass}>
    Fire alarm systems
  </Link>,
  <Link key="evac" href={FS_SERVICE_ROUTES.evacVoiceEvacuation} className={linkClass}>
    EVAC and voice alarm
  </Link>,
  <Link key="refuge" href={FS_SERVICE_ROUTES.refugeDisabledCommunication} className={linkClass}>
    Disabled refuge systems
  </Link>,
  <Link key="phones" href={FS_SERVICE_ROUTES.refugeDisabledCommunication} className={linkClass}>
    Fire telephones
  </Link>,
  <Link key="toilets" href={FS_SERVICE_ROUTES.refugeDisabledCommunication} className={linkClass}>
    Disabled toilet alarms
  </Link>,
  <Link key="cae" href={FS_SERVICE_ROUTES.fireAlarmSystems} className={linkClass}>
    Cause-and-effect
  </Link>,
  <Link key="comm" href={FS_SERVICE_ROUTES.fireAlarmSystems} className={linkClass}>
    Commissioning and certification
  </Link>,
  <Link key="maint" href={FS_SERVICE_ROUTES.maintenanceSupport} className={linkClass}>
    Maintenance and 24/7 support
  </Link>,
]

const compliance = ["BS 5839-1", "BS 5839-6 (where applicable)", "BS 5839-8", "BS 5839-9"]
const deliverables = [
  "Cause-and-effect matrices",
  "Commissioning certificates",
  "Zone charts and as-built drawings",
  "O&M manuals and operator training",
]

const intro = (
  <>
    <p>
      Fire &amp; life safety is an overview hub, not a separate install for telephones or toilet alarms on its own. Fire
      telephones and disabled toilet alarms are covered on the{" "}
      <Link href={FS_SERVICE_ROUTES.refugeDisabledCommunication} className={linkClass}>
        disabled refuge, fire telephone and toilet alarm systems
      </Link>{" "}
      page. Use this overview to reach the right specialist scope for your project.
    </p>
    <p className="text-white/85">
      Start with{" "}
      <Link href={FS_SERVICE_ROUTES.fireAlarmSystems} className={linkClass}>
        fire alarm systems
      </Link>
      ,{" "}
      <Link href={FS_SERVICE_ROUTES.evacVoiceEvacuation} className={linkClass}>
        EVAC and voice alarm
      </Link>
      , or{" "}
      <Link href={FS_SERVICE_ROUTES.refugeDisabledCommunication} className={linkClass}>
        disabled refuge, fire telephone and toilet alarm systems
      </Link>
      . For ongoing care, see{" "}
      <Link href={FS_SERVICE_ROUTES.maintenanceSupport} className={linkClass}>
        maintenance and 24/7 support
      </Link>
      .
    </p>
  </>
)

export default function FireLifeSafetyPage() {
  return (
    <CapabilityServicePageLayout
      title="Fire & Life Safety"
      intro={intro}
      capabilities={capabilities}
      compliance={compliance}
      deliverables={deliverables}
      ctaLabel="Discuss your project"
    />
  )
}
