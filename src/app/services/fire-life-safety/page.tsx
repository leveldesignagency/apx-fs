import type { Metadata } from "next"
import Link from "next/link"
import { CapabilityServicePageLayout } from "@/components/CapabilityServicePageLayout"
import { buildFsMetadata } from "@/lib/seo-metadata"
import { FS_SERVICE_ROUTES } from "@/lib/fs-service-routes"
import { FsServiceJsonLd } from "@/components/seo/FsServiceJsonLd"

export const metadata: Metadata = buildFsMetadata({
  title: "Fire & Life Safety Overview | London | APX",
  description:
    "Overview of APX fire and life-safety delivery: fire alarms, PAVA, EVAC, disabled refuge, fire telephones, toilet alarms, cause-and-effect, commissioning and ongoing maintenance across London and the Home Counties.",
  pathname: "/services/fire-life-safety",
})

const linkClass =
  "underline decoration-white/45 underline-offset-[3px] transition-colors hover:decoration-white"

const capabilities = [
  <Link key="fire" href={FS_SERVICE_ROUTES.fireAlarmSystems} className={linkClass}>
    Fire alarm systems
  </Link>,
  <Link key="pava" href={FS_SERVICE_ROUTES.pava} className={linkClass}>
    PAVA (public address & voice alarm)
  </Link>,
  <Link key="evac" href={FS_SERVICE_ROUTES.evac} className={linkClass}>
    EVAC (evacuation alert)
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

const compliance = ["BS 5839-1", "BS 5839-8", "BS 5839-9", "BS 8629"]
const deliverables = [
  "Cause-and-effect matrices",
  "Commissioning certificates",
  "Zone charts and as-built drawings",
  "O&M manuals and operator training",
]

const intro = (
  <>
    <p>
      APX Fire &amp; Security provides fully integrated fire and life-safety solutions, from{" "}
      <Link href={FS_SERVICE_ROUTES.fireAlarmSystems} className={linkClass}>
        fire detection and alarm systems
      </Link>{" "}
      through to{" "}
      <Link href={FS_SERVICE_ROUTES.pava} className={linkClass}>
        PAVA
      </Link>
      ,{" "}
      <Link href={FS_SERVICE_ROUTES.evac} className={linkClass}>
        EVAC
      </Link>
      , and{" "}
      <Link href={FS_SERVICE_ROUTES.refugeDisabledCommunication} className={linkClass}>
        disabled refuge, fire telephone and disabled toilet alarm systems
      </Link>
      .
    </p>
    <p className="text-white/85">
      We design, install, commission and maintain systems that protect people and property across London and the Home
      Counties, with clear documentation at handover and ongoing{" "}
      <Link href={FS_SERVICE_ROUTES.maintenanceSupport} className={linkClass}>
        maintenance and 24/7 support
      </Link>{" "}
      where you need it.
    </p>
  </>
)

export default function FireLifeSafetyPage() {
  return (
    <>
      <FsServiceJsonLd
        pathname="/services/fire-life-safety"
        description="Overview of APX fire and life-safety delivery: fire alarms, PAVA, EVAC, disabled refuge, fire telephones, toilet alarms, cause-and-effect, commissioning and ongoing maintenance across London and the Home Counties."
        name="Fire & Life Safety Overview"
      />

    <CapabilityServicePageLayout
      title="Fire & Life Safety"
      intro={intro}
      capabilities={capabilities}
      compliance={compliance}
      deliverables={deliverables}
      ctaLabel="Discuss your project"
    />
  
    </>
  
  )
}
