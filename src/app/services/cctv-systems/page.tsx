"use client"

import Link from "next/link"
import { CctvComplianceSection } from "@/components/CctvComplianceSection"
import { FsCctvCameraTypesStrip } from "@/components/FsCctvCameraTypesStrip"
import { FsCctvSubpageHeroButtons } from "@/components/FsCctvSubpageHeroButtons"
import { ServicePageClosingSections } from "@/components/ServicePageClosingSections"
import { CustomPillButton } from "@/components/ui/CustomPillButton"
import { CallPhoneCta } from "@/components/ui/CallPhoneCta"
import { ServicePageHero } from "@/components/ServicePageHero"
import { Reveal } from "@/components/Reveal"
import { ServiceItemReveal } from "@/components/ServiceItemReveal"
import { ServiceFeatureImageCard } from "@/components/ServiceFeatureImageCard"
import { serviceHeroImages } from "@/lib/serviceHeroImages"
import { SERVICE_HERO_BRIDGE_GRADIENT } from "@/lib/heroBackgroundGradients"

const heroBridge = (
  <div
    className="pointer-events-none absolute left-0 right-0 top-0 h-28 sm:h-36"
    style={{ background: SERVICE_HERO_BRIDGE_GRADIENT }}
    aria-hidden
  />
)

const CAPABILITIES = [
  {
    title: "IP CCTV",
    description: "Network IP cameras and NVR platforms for commercial sites, with clear handover for operators and IT teams.",
    id: "cctv-ip",
    imageSrc: "/service%20images/cctv-capabilities/ip-cctv.jpg",
    imageAlt: "IP turret camera mounted on a commercial ceiling grid",
  },
  {
    title: "HD analogue upgrades",
    description: "Upgrade paths from legacy analogue to HD analogue or hybrid recording where a full IP refresh is not required.",
    id: "cctv-hd-analogue",
    imageSrc: "/service%20images/cctv-capabilities/hd-analogue-web.jpg",
    imageAlt: "Outdoor HD bullet CCTV camera mounted against a clear blue sky",
  },
  {
    title: "Remote viewing",
    description: "Secure remote live and playback access where the platform supplied supports it, with permissions set at handover.",
    id: "cctv-remote",
    imageSrc: "/service%20images/cctv-capabilities/remote-viewing.jpg",
    imageAlt: "Operator reviewing live multi-camera CCTV feeds in a control room",
  },
  {
    title: "Recording and retention",
    description: "Recording design with retention periods agreed to your policy, plus export paths for incidents and insurers.",
    id: "cctv-recording",
    imageSrc: "/service%20images/cctv-capabilities/recording-web.jpg",
    imageAlt: "Active server rack with status displays used for CCTV recording and retention",
  },
  {
    title: "Camera health monitoring",
    description: "Health checks and fault alerting so cameras and recorders stay online and recoverable when something fails.",
    id: "cctv-health",
    imageSrc: "/service%20images/cctv-capabilities/camera-health-web.jpg",
    imageAlt: "Array of outdoor bullet CCTV cameras representing multi-camera health and status monitoring",
  },
  {
    title: "ANPR where offered",
    description: "Automatic number-plate recognition for vehicle access and site control where the brief and location require it.",
    id: "cctv-anpr",
    imageSrc: "/service%20images/cctv-capabilities/anpr.jpg",
    imageAlt: "Camera covering a roadway for vehicle access and number-plate capture",
  },
  {
    title: "Analytics where offered",
    description: "Motion, line-crossing and other analytics options where the selected system and site policy support them.",
    id: "cctv-analytics",
    imageSrc: "/service%20images/cctv-capabilities/analytics-web.jpg",
    imageAlt: "Live thermal video analytics with person detection bounding box and temperature overlay",
  },
  {
    title: "Network segregation",
    description: "CCTV VLAN / segregated network design so video traffic is isolated from corporate IT where required.",
    id: "cctv-network",
    imageSrc: "/service%20images/cctv-capabilities/network.jpg",
    imageAlt: "Ethernet switch with labelled ports isolating CCTV network traffic",
  },
  {
    title: "Maintenance and repairs",
    description: "PPM, corrective repairs and system health visits so commercial CCTV remains reliable after handover.",
    id: "cctv-maintenance",
    imageSrc: "/service%20images/cctv-capabilities/maintenance.jpg",
    imageAlt: "Engineer working on rack cabling during a CCTV maintenance visit",
  },
] as const

export default function CctvSecurityPage() {
  return (
    <div className="service-page-root min-h-screen overflow-x-hidden bg-[var(--page-bg)] text-white">
      <ServicePageHero
        title="CCTV Systems"
        imageSrc={serviceHeroImages.cctv}
        heroCompliance={["BS EN 62676"]}
        heroSummary="Commercial CCTV design, installation and maintenance, IP systems, recording and retention across London and the Home Counties."
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

      <div className="relative bg-[var(--page-bg)]">
        {heroBridge}

        <div className="relative z-[1] border-t border-white/15">
          <FsCctvCameraTypesStrip />
        </div>

        <div className="border-t border-white/15" />

        <section className="site-container relative z-[1] py-16 lg:py-16">
          <Reveal>
            <h2 className="mb-4 text-left font-title text-4xl font-bold text-white sm:text-5xl">
              Commercial CCTV Capabilities
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
            {CAPABILITIES.map(({ title, description, id, imageSrc, imageAlt }, index) => (
              <ServiceItemReveal key={title} index={index} className="h-full min-h-0">
                <ServiceFeatureImageCard
                  id={id}
                  title={title}
                  description={description}
                  imageSrc={imageSrc}
                  imageAlt={imageAlt}
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
          ctaHeadline="Need Commercial"
          ctaHeadlineAccent="CCTV?"
          ctaDescription="Our specialists can survey your site and recommend IP, HD analogue upgrade, remote viewing and retention options for your premises, with clear guidance on operator responsibilities."
        >
          <CustomPillButton href="/contact?service=cctv-systems" size="md">
            Get free consultation
          </CustomPillButton>
          <CallPhoneCta size="md" />
        </ServicePageClosingSections>
      </div>
    </div>
  )
}
