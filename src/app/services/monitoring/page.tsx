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
  Antenna,
  Eye,
  FileText,
  Flame,
  Link2,
  Radio,
  Shield,
  Wrench,
} from "lucide-react"
import { SERVICE_HERO_BRIDGE_GRADIENT } from "@/lib/heroBackgroundGradients"

const cardClass =
  "rounded-tl-[1.5rem] rounded-br-[1.5rem] border border-white/20 bg-black p-8 text-white transition-colors hover:border-white/45"

const linkClass = "underline decoration-white/40 underline-offset-2 hover:decoration-white"

const CAPABILITIES = [
  {
    Icon: Radio,
    title: "ARC signalling",
    description:
      "Alarm receiving centre pathways so intruder, fire and selected CCTV events reach trained operators when the site is unattended.",
  },
  {
    Icon: Antenna,
    title: "Dual-path resilience",
    description:
      "Resilient / dual-path signalling options where insurance, ARC grade or site risk requires backup communications.",
  },
  {
    Icon: Shield,
    title: "Intruder monitoring",
    description:
      "Monitored intruder pathways aligned with PD 6662 / BS EN 50131 expectations and the ARC response grade agreed at survey.",
  },
  {
    Icon: Flame,
    title: "Fire signalling",
    description:
      "Fire alarm signalling arrangements where the fire strategy and ARC product require remote notification of fire events.",
  },
  {
    Icon: Eye,
    title: "CCTV remote pathways",
    description:
      "Event-linked or remote viewing pathways where offered, so operators can verify incidents before escalation.",
  },
  {
    Icon: FileText,
    title: "Keyholder documentation",
    description:
      "Police / keyholder response schedules and handover notes so facilities and security teams know who is contacted and when.",
  },
  {
    Icon: Link2,
    title: "New installs & takeovers",
    description:
      "Monitoring designed into new systems, or added when we take over an existing Fire and Security installation.",
  },
  {
    Icon: Wrench,
    title: "Ongoing signalling checks",
    description:
      "Periodic signalling tests and ARC health checks as part of planned maintenance agreements.",
  },
] as const

export default function MonitoringServicePage() {
  return (
    <div className="service-page-root min-h-screen overflow-x-hidden bg-black text-white">
      <ServicePageHero
        title="Monitoring & ARC Signalling"
        imageSrc={serviceHeroImages.monitoring}
        imageClassName="-scale-x-100 object-cover object-center"
        heroCompliance={["PD 6662", "BS EN 50131"]}
        heroSummary="Alarm receiving centre (ARC) signalling and dual-path monitoring so events are escalated when your site is unattended."
        intro={
          <>
            <p className="mb-4">
              Monitoring keeps sites protected when nobody is on site. APX designs and commissions alarm receiving
              centre (ARC) signalling and related remote pathways for{" "}
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
            <p>
              We align signalling with insurance and ARC requirements, document keyholder and response arrangements, and
              support monitoring as part of{" "}
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
              From ARC signalling and dual-path resilience through to keyholder documentation and ongoing checks, we
              build monitoring that fits the system, the insurer and how your site actually operates.
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
          title="How monitoring fits your site"
          titleId="monitoring-how-it-fits-heading"
          imageSrc={serviceSectionImages.monitoringBody}
          imageAlt="Remote monitoring workstation reviewing security events"
          imageSide="right"
        >
          <p>
            Monitoring is not a generic add-on. We survey the system type, signalling path, insurance expectations and
            who should be contacted when an event fires, then commission ARC pathways that match that brief.
          </p>
          <p>
            Dual-path options, keyholder schedules and CCTV verification where offered are documented at handover, and
            signalling checks can sit inside your planned maintenance agreement so the path stays healthy year-round.
          </p>
        </FsServiceTextImageSection>

        <ServiceComplianceSection
          intro="Monitoring and ARC signalling for intruder systems follow PD 6662 / BS EN 50131 expectations where applicable. We align pathways with ARC and insurer requirements, and keep NSI-aligned records where monitoring forms part of the approved scope."
          leftTitle="Standards & pathways"
          leftEyebrow="Monitoring"
          standardsItems={[
            "PD 6662 / BS EN 50131 signalling expectations (intruder)",
            "ARC and insurer pathway requirements where applicable",
            "NSI-aligned documentation where monitoring forms part of the approved scope",
            "Keyholder and response contact schedules documented at handover",
          ]}
          footerNote={
            <>
              Related services:{" "}
              <Link
                href={FS_SERVICE_ROUTES.intruderAlarmSystems}
                className="text-black underline decoration-black/30 underline-offset-2 hover:decoration-black"
              >
                intruder alarms
              </Link>
              ,{" "}
              <Link
                href={FS_SERVICE_ROUTES.maintenanceSupport}
                className="text-black underline decoration-black/30 underline-offset-2 hover:decoration-black"
              >
                maintenance &amp; repairs
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
            "Survey-led monitoring recommendation",
            "Signalling configuration and test records",
            "Keyholder / response contact schedules",
            "Handover notes for facilities and security teams",
          ]}
        />

        <ServicePageClosingSections
          serviceTitleShort="Monitoring"
          ctaImageSrc={serviceHeroImages.monitoring}
          ctaHeadline="Need"
          ctaHeadlineAccent="Monitored Protection?"
          ctaDescription="Tell us about your system type and site. We can recommend ARC signalling, dual-path options and how monitoring sits with maintenance and call-out."
        >
          <CustomPillButton href="/contact?service=monitoring" size="md">
            Enquire about monitoring
          </CustomPillButton>
          <CallPhoneCta size="md" />
        </ServicePageClosingSections>
      </div>
    </div>
  )
}
