import type { Metadata } from "next"
import Link from "next/link"
import { CapabilityServicePageLayout } from "@/components/CapabilityServicePageLayout"
import { buildFsMetadata } from "@/lib/seo-metadata"
import { FS_SERVICE_ROUTES } from "@/lib/fs-service-routes"
import { FsServiceJsonLd } from "@/components/seo/FsServiceJsonLd"

export const metadata: Metadata = buildFsMetadata({
  title: "Security Systems Overview | Intruder, CCTV, Access & Monitoring | APX",
  description:
    "Umbrella overview of APX security systems: intruder alarms, CCTV, access control, video door entry, gate automation, monitoring and system integration, plus PPM, takeovers and 24/7 support across London and the Home Counties.",
  pathname: "/services/security-systems",
})

const linkClass =
  "underline decoration-white/45 underline-offset-[3px] transition-colors hover:decoration-white"

const capabilities = [
  <Link key="intruder" href={FS_SERVICE_ROUTES.intruderAlarmSystems} className={linkClass}>
    Intruder alarms
  </Link>,
  <Link key="cctv" href={FS_SERVICE_ROUTES.cctvSystems} className={linkClass}>
    CCTV
  </Link>,
  <Link key="access" href={FS_SERVICE_ROUTES.accessControlSystems} className={linkClass}>
    Access control
  </Link>,
  <Link key="video" href={FS_SERVICE_ROUTES.videoDoorEntrySystems} className={linkClass}>
    Video door entry
  </Link>,
  <Link key="gate" href={FS_SERVICE_ROUTES.gateAutomationSystems} className={linkClass}>
    Gate automation
  </Link>,
  <Link key="monitoring" href={FS_SERVICE_ROUTES.monitoring} className={linkClass}>
    Monitoring
  </Link>,
  <span key="integration">System integration across Fire and Security interfaces</span>,
  <span key="app">
    Mobile-app control and remote viewing where supported by the system supplied
  </span>,
  <Link key="ppm" href={FS_SERVICE_ROUTES.maintenanceSupport} className={linkClass}>
    PPM and system takeover
  </Link>,
  <Link key="callout" href={FS_SERVICE_ROUTES.emergencyCallOut} className={linkClass}>
    24/7 call-out support
  </Link>,
]

const compliance = [
  "PD 6662 / BS EN 50131 (intruder)",
  "BS EN 62676 (CCTV)",
  "BS EN 60839 (access control / video entry)",
  "GDPR-aligned CCTV data handling",
  "NSI Gold-aligned delivery for security systems",
]

const deliverables = [
  "Survey-led design proposals and interface schedules",
  "Integration test records and commissioning certificates",
  "Monitoring / ARC signalling set-up where required",
  "O&M, user training and maintenance options",
]

const intro = (
  <>
    <p>
      APX Fire &amp; Security designs, installs and maintains integrated security systems that protect people and
      premises, from{" "}
      <Link href={FS_SERVICE_ROUTES.intruderAlarmSystems} className={linkClass}>
        intruder alarms
      </Link>{" "}
      and{" "}
      <Link href={FS_SERVICE_ROUTES.cctvSystems} className={linkClass}>
        CCTV
      </Link>{" "}
      through to{" "}
      <Link href={FS_SERVICE_ROUTES.accessControlSystems} className={linkClass}>
        access control
      </Link>
      ,{" "}
      <Link href={FS_SERVICE_ROUTES.videoDoorEntrySystems} className={linkClass}>
        video door entry
      </Link>
      ,{" "}
      <Link href={FS_SERVICE_ROUTES.gateAutomationSystems} className={linkClass}>
        gate automation
      </Link>{" "}
      and{" "}
      <Link href={FS_SERVICE_ROUTES.monitoring} className={linkClass}>
        monitoring
      </Link>
      , with systems coordinated so events, recording and responses work together.
    </p>
    <p className="text-white/85">
      Mobile-app control and remote viewing are available where the platform you choose supports them. After handover we
      provide{" "}
      <Link href={FS_SERVICE_ROUTES.maintenanceSupport} className={linkClass}>
        maintenance and repairs
      </Link>{" "}
      and{" "}
      <Link href={FS_SERVICE_ROUTES.emergencyCallOut} className={linkClass}>
        24/7 call-out
      </Link>{" "}
      cover across London and the Home Counties.
    </p>
  </>
)

export default function SecuritySystemsPage() {
  return (
    <>
      <FsServiceJsonLd
        pathname="/services/security-systems"
        description="Umbrella overview of APX security systems: intruder alarms, CCTV, access control, video door entry, gate automation, monitoring and system integration, plus PPM, takeovers and 24/7 support across London and the Home Counties."
        name="Security Systems Overview"
      />

    <CapabilityServicePageLayout
      title="Security Systems"
      intro={intro}
      capabilities={capabilities}
      compliance={compliance}
      deliverables={deliverables}
      ctaLabel="Discuss your project"
    />
  
    </>
  
  )
}
