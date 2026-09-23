"use client"

import Link from "next/link"
import { CctvComplianceSection } from "@/components/CctvComplianceSection"
import { FsCctvCameraTypesStrip } from "@/components/FsCctvCameraTypesStrip"
import { FsCctvSubpageHeroButtons } from "@/components/FsCctvSubpageHeroButtons"
import { ServicePageClosingSections } from "@/components/ServicePageClosingSections"
import { CustomPillButton } from "@/components/ui/CustomPillButton"
import { ServicePageHero } from "@/components/ServicePageHero"
import { Reveal } from "@/components/Reveal"
import { ServiceItemReveal } from "@/components/ServiceItemReveal"
import { ServiceFeatureIconCard } from "@/components/ServiceFeatureIconCard"
import { serviceHeroImages } from "@/lib/serviceHeroImages"
import {
  Activity,
  Car,
  HardDrive,
  Network,
  Scan,
  Shield,
  Smartphone,
  Video,
  Wrench,
} from "lucide-react"

const cardClass =
  "rounded-tl-[1.5rem] rounded-br-[1.5rem] border-2 border-white/20 bg-black p-8 text-white transition-colors hover:border-white/45"

const CAPABILITIES = [
  {
    Icon: Video,
    title: "IP CCTV",
    description: "Network IP cameras and NVR platforms for commercial sites, with clear handover for operators and IT teams.",
    id: "cctv-ip",
  },
  {
    Icon: HardDrive,
    title: "HD analogue upgrades",
    description: "Upgrade paths from legacy analogue to HD analogue or hybrid recording where a full IP refresh is not required.",
    id: "cctv-hd-analogue",
  },
  {
    Icon: Smartphone,
    title: "Remote viewing",
    description: "Secure remote live and playback access where the platform supplied supports it, with permissions set at handover.",
    id: "cctv-remote",
  },
  {
    Icon: Shield,
    title: "Recording and retention",
    description: "Recording design with retention periods agreed to your policy, plus export paths for incidents and insurers.",
    id: "cctv-recording",
  },
  {
    Icon: Activity,
    title: "Camera health monitoring",
    description: "Health checks and fault alerting so cameras and recorders stay online and recoverable when something fails.",
    id: "cctv-health",
  },
  {
    Icon: Car,
    title: "ANPR where offered",
    description: "Automatic number-plate recognition for vehicle access and site control where the brief and location require it.",
    id: "cctv-anpr",
  },
  {
    Icon: Scan,
    title: "Analytics where offered",
    description: "Motion, line-crossing and other analytics options where the selected system and site policy support them.",
    id: "cctv-analytics",
  },
  {
    Icon: Network,
    title: "Network segregation",
    description: "CCTV VLAN / segregated network design so video traffic is isolated from corporate IT where required.",
    id: "cctv-network",
  },
  {
    Icon: Wrench,
    title: "Maintenance and repairs",
    description: "PPM, corrective repairs and system health visits so commercial CCTV remains reliable after handover.",
    id: "cctv-maintenance",
  },
] as const

export default function CctvSecurityPage() {
  return (
    <div className="service-page-root min-h-screen overflow-x-hidden bg-black text-white">
      <div className="relative">
        <ServicePageHero
          title="CCTV Systems"
          imageSrc={serviceHeroImages.cctv}
          heroCompliance={["BS EN 62676"]}
          afterIntro={<FsCctvSubpageHeroButtons />}
          intro={
            <>
              <p className="mb-4">
                APX designs, installs and maintains{" "}
                <strong className="font-semibold text-white">commercial CCTV</strong> for offices, retail, warehouses and
                multi-site estates across London and the Home Counties, IP systems, HD analogue upgrades, remote viewing,
                recording and retention, and secure network configuration.
              </p>
              <p>
                We can configure systems with privacy considerations (coverage, signage guidance and retention design).{" "}
                <strong className="font-semibold text-white">
                  The customer remains responsible for the lawful operation of CCTV under UK GDPR and related rules
                </strong>
                . Domestic CCTV is a secondary residential scope where required, see the Domestic tab (last).
              </p>
            </>
          }
        />
        <FsCctvCameraTypesStrip />
      </div>

      <div className="relative bg-black">
        <div
          className="pointer-events-none absolute top-0 left-0 right-0 h-28 sm:h-36"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.82) 52%, rgba(0,0,0,1) 100%)",
          }}
          aria-hidden
        />

        <section className="container relative z-[1] mx-auto px-6 py-16 lg:py-16">
          <Reveal>
            <h2 className="mb-4 text-left font-title text-3xl font-bold text-white sm:text-4xl">
              Commercial CCTV capabilities
            </h2>
          </Reveal>
          <Reveal delayMs={70}>
            <p className="mb-10 max-w-3xl text-left text-gray-300">
              Primary delivery is commercial and industrial. For homeowners, use the{" "}
              <Link href="/services/cctv/domestic" className="underline decoration-white/45 underline-offset-[3px] hover:decoration-white">
                domestic CCTV
              </Link>{" "}
              page, a secondary residential scope with survey-led quotes (no online package pricing).
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map(({ Icon, title, description, id }, index) => (
              <ServiceItemReveal key={title} index={index} className="h-full min-h-0">
                <ServiceFeatureIconCard
                  id={id}
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

        <CctvComplianceSection
          intro="Commercial CCTV is designed and commissioned against recognised industry practice, including BS EN 62676 where applicable, with secure network configuration, retention design and operator training. We help you set the system up with privacy in mind; lawful day-to-day use remains the customer's responsibility."
          standardsItems={[
            "BS EN 62676 (video surveillance systems) where applicable",
            "NSI Gold-aligned installation practice for security systems",
            "Privacy-conscious design (coverage, signage guidance, retention), customer retains lawful-use responsibility under UK GDPR",
          ]}
          footerNote={
            <>
              Need a dedicated commercial brief? See{" "}
              <Link
                href="/services/cctv/commercial"
                className="text-black underline decoration-black/30 underline-offset-2 hover:decoration-black"
              >
                commercial CCTV
              </Link>
              . Intruder integration is covered on{" "}
              <Link
                href="/services/intruder-alarm-systems"
                className="text-black underline decoration-black/30 underline-offset-2 hover:decoration-black"
              >
                intruder alarm systems
              </Link>
              .
            </>
          }
          deliverablesItems={[
            "Site survey, camera schedules and network diagrams",
            "Recording and retention setup agreed to your policy",
            "Installation, commissioning and user training",
            "Remote viewing / permissions where the platform supports it",
            "ANPR and analytics options where offered for the site",
            "Maintenance, repairs and camera health monitoring options",
          ]}
        />

        <ServicePageClosingSections
          serviceTitleShort="CCTV"
          ctaImageSrc={serviceHeroImages.cctv}
          ctaHeadline="Need commercial"
          ctaHeadlineAccent="CCTV?"
          ctaDescription="Our specialists can survey your site and recommend IP, HD analogue upgrade, remote viewing and retention options for your premises, with clear guidance on operator responsibilities."
        >
          <CustomPillButton href="/contact?service=cctv-systems" size="md">
            Get free consultation
          </CustomPillButton>
          <CustomPillButton href="tel:02083032280" size="md" variant="outline">
            Call 020 8303 2280
          </CustomPillButton>
        </ServicePageClosingSections>
      </div>
    </div>
  )
}
