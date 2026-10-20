"use client"

import Link from "next/link"
import { ServiceComplianceSection } from "@/components/ServiceComplianceSection"
import { ServicePageClosingSections } from "@/components/ServicePageClosingSections"
import { CustomPillButton } from "@/components/ui/CustomPillButton"
import { CallPhoneCta } from "@/components/ui/CallPhoneCta"
import { ServicePageHero } from "@/components/ServicePageHero"
import { Reveal } from "@/components/Reveal"
import { ServiceItemReveal } from "@/components/ServiceItemReveal"
import { ServiceFeatureIconCard } from "@/components/ServiceFeatureIconCard"
import { FsServiceTextImageSection } from "@/components/FsServiceTextImageSection"
import { serviceHeroImages, serviceSectionImages } from "@/lib/serviceHeroImages"
import { FS_SERVICE_ROUTES } from "@/lib/fs-service-routes"
import {
  BatteryCharging,
  ClipboardList,
  Clock,
  FileText,
  RefreshCw,
  Shield,
  Siren,
  Wrench,
} from "lucide-react"
import { SERVICE_HERO_BRIDGE_GRADIENT } from "@/lib/heroBackgroundGradients"

const cardClass =
  "rounded-tl-[1.5rem] rounded-br-[1.5rem] border border-white/20 bg-black p-8 text-white transition-colors hover:border-white/45"

const linkClass = "underline decoration-white/40 underline-offset-2 hover:decoration-white"

const CAPABILITIES = [
  {
    Icon: RefreshCw,
    title: "System takeovers",
    description:
      "Assess existing Fire and Security installations, bring them under APX care, and plan upgrades without unnecessary downtime.",
  },
  {
    Icon: ClipboardList,
    title: "Planned PPM",
    description:
      "Annual and six-monthly planned preventative maintenance structured around your site risk profile and operating hours.",
  },
  {
    Icon: Wrench,
    title: "Corrective works",
    description:
      "Fault diagnosis, repairs and corrective works so systems stay available between scheduled visits.",
  },
  {
    Icon: Shield,
    title: "Obsolescence planning",
    description:
      "Lifecycle and obsolescence advice so aging panels, cameras and controllers are replaced before they become a liability.",
  },
  {
    Icon: BatteryCharging,
    title: "Batteries & consumables",
    description:
      "Battery replacement and routine consumables as part of the maintenance programme where included in the agreement.",
  },
  {
    Icon: Clock,
    title: "Remote support",
    description:
      "Remote diagnostics and support where the installed platform allows, reducing downtime before an engineer attends.",
  },
  {
    Icon: Siren,
    title: "24/7 call-out cover",
    description:
      "Out-of-hours emergency response for contracted customers, coordinated with monitoring pathways where in place.",
  },
  {
    Icon: FileText,
    title: "Clear service reports",
    description:
      "Visit reports, defect and remedial records, plus asset and compliance evidence packs where included in the agreement.",
  },
] as const

export default function MaintenanceSupportPage() {
  return (
    <div className="service-page-root min-h-screen overflow-x-hidden bg-black text-white">
      <ServicePageHero
        title="Maintenance & Repairs"
        imageSrc={serviceHeroImages.maintenance}
        heroCompliance={["BS 5839", "NSI-aligned"]}
        heroSummary="Planned maintenance and reactive repairs for Fire and Security systems, keeping compliance and uptime under control."
        intro={
          <>
            <p className="mb-4">
              APX provides planned maintenance and reactive support for Fire and Security systems, including{" "}
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
            <p>
              <strong className="font-semibold text-white">System takeovers</strong> are a core part of what we offer:
              we survey existing installations, bring them under APX maintenance, and plan upgrades without unnecessary
              downtime.{" "}
              <strong className="font-semibold text-white">
                24/7 call-out support is available to customers on a maintenance agreement
              </strong>
              . See also{" "}
              <Link href={FS_SERVICE_ROUTES.emergencyCallOut} className={linkClass}>
                24/7 call-out
              </Link>{" "}
              and{" "}
              <Link href={FS_SERVICE_ROUTES.monitoring} className={linkClass}>
                monitoring
              </Link>
              .
            </p>
          </>
        }
      />

      <div className="relative bg-[var(--page-bg)]">
        <div
          className="pointer-events-none absolute top-0 left-0 right-0 h-28 sm:h-36"
          style={{ background: SERVICE_HERO_BRIDGE_GRADIENT }}
          aria-hidden
        />

        <div className="relative z-[1] border-t border-white/15" aria-hidden />

        <section className="site-container relative z-[1] py-16 lg:py-16">
          <Reveal>
            <h2 className="mb-4 text-left font-title text-3xl font-bold text-white sm:text-4xl">Capabilities</h2>
          </Reveal>
          <Reveal delayMs={70}>
            <p className="mb-10 max-w-3xl text-left text-gray-300">
              From system takeovers and PPM through to corrective works, obsolescence planning and clear service
              reports, we keep Fire and Security systems healthy for the long term.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map(({ Icon, title, description }, index) => (
              <ServiceItemReveal key={title} index={index} className="h-full min-h-0">
                <ServiceFeatureIconCard
                  icon={Icon}
                  title={title}
                  description={description}
                  shellClassName={cardClass}
                  className="transition-transform duration-300 hover:scale-[1.02]"
                />
              </ServiceItemReveal>
            ))}
          </div>
        </section>

        <div className="border-t border-white/15" />

        <FsServiceTextImageSection
          title="Takeovers without the disruption"
          titleId="maintenance-takeovers-heading"
          imageSrc={serviceSectionImages.maintenanceBody}
          imageAlt="Engineer working on a fire and security system during maintenance"
          imageSide="right"
        >
          <p>
            Changing contractor does not have to mean starting from scratch. We survey what is already installed, bring
            Fire and Security systems under APX maintenance, and plan upgrades or obsolescence work around how the site
            actually runs.
          </p>
          <p>
            PPM visits, corrective works and clear service reports keep duty holders informed, with 24/7 call-out cover
            available for customers on a maintenance agreement.
          </p>
        </FsServiceTextImageSection>

        <ServiceComplianceSection
          intro="Maintenance programmes are structured around British Standards, manufacturer guidance and NSI-aligned records where applicable. Every visit is backed by clear reporting so duty holders can evidence ongoing care."
          leftTitle="Standards & records"
          leftEyebrow="Maintenance"
          standardsItems={[
            "BS 5839 maintenance requirements (fire)",
            "Manufacturer maintenance guidelines",
            "NSI-aligned service records where applicable",
            "Programmes tailored to site risk and operating hours",
          ]}
          footerNote={
            <>
              Related services:{" "}
              <Link
                href={FS_SERVICE_ROUTES.monitoring}
                className="text-black underline decoration-black/30 underline-offset-2 hover:decoration-black"
              >
                monitoring
              </Link>
              ,{" "}
              <Link
                href={FS_SERVICE_ROUTES.emergencyCallOut}
                className="text-black underline decoration-black/30 underline-offset-2 hover:decoration-black"
              >
                24/7 call-out
              </Link>
              .
            </>
          }
          rightTitle="Typical deliverables"
          deliverablesItems={[
            "Visit service reports",
            "Defect and remedial records",
            "Asset and system records (where included in the agreement)",
            "Compliance evidence packs (where included in the agreement)",
          ]}
        />

        <ServicePageClosingSections
          serviceTitleShort="Maintenance"
          ctaImageSrc={serviceHeroImages.maintenance}
          ctaHeadline="Need"
          ctaHeadlineAccent="Maintenance & Repairs?"
          ctaDescription="Tell us about your systems and sites. We can propose PPM, takeovers and call-out cover that match how you operate."
        >
          <CustomPillButton href="/contact?service=maintenance-support" size="md">
            Discuss maintenance &amp; repairs
          </CustomPillButton>
          <CallPhoneCta size="md" />
        </ServicePageClosingSections>
      </div>
    </div>
  )
}
