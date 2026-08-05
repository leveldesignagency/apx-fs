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
import { FS_SERVICE_SHIMMER_CARD_FEATURE } from "@/lib/fsServicePageCards"
import { serviceHeroImages } from "@/lib/serviceHeroImages"
import { Video, Shield, Monitor, CheckCircle, ArrowRight, Smartphone } from "lucide-react"

export default function CctvSecurityPage() {
  return (
    <div className="service-page-root min-h-screen overflow-x-hidden bg-black text-white">
      <div className="relative">
        <ServicePageHero
          title="CCTV systems"
          imageSrc={serviceHeroImages.cctv}
          heroCompliance={["GDPR", "BS EN 62676"]}
          afterIntro={<FsCctvSubpageHeroButtons />}
          intro="We design, install, and maintain CCTV systems that provide high-definition surveillance and secure monitoring for commercial and industrial sites, with secure network configuration, retention design and user training aligned to your operational needs."
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
            <h2 className="mb-10 text-left font-title text-3xl font-bold text-white sm:text-4xl">Our CCTV systems</h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Video className="h-8 w-8" strokeWidth={1.75} />,
                title: "CCTV systems",
                description: "HD and 4K IP cameras, NVR/DVR solutions, and remote viewing for round-the-clock surveillance.",
              },
              {
                icon: <Shield className="h-8 w-8" strokeWidth={1.75} />,
                title: "Intruder alarms",
                description: "Wired and wireless intruder alarm systems with NSI-approved monitoring and police response.",
              },
              {
                icon: <Monitor className="h-8 w-8" strokeWidth={1.75} />,
                title: "Remote monitoring",
                description: "24/7 alarm receiving and video monitoring with rapid response and keyholder escalation.",
              },
              {
                icon: <Smartphone className="h-8 w-8" strokeWidth={1.75} />,
                title: "Mobile access",
                description: "View live and recorded footage from smartphones and tablets, with push notifications.",
              },
              {
                icon: <CheckCircle className="h-8 w-8" strokeWidth={1.75} />,
                title: "Maintenance & support",
                description: "Scheduled servicing, health checks, and fault response to keep systems reliable.",
              },
              {
                icon: <ArrowRight className="h-8 w-8" strokeWidth={1.75} />,
                title: "Integration",
                description: "CCTV and alarms integrated with access control and fire systems for a single security platform.",
              },
            ].map((service, index) => (
              <ServiceItemReveal key={index} index={index} className="h-full min-h-0">
                <div className={`${FS_SERVICE_SHIMMER_CARD_FEATURE} transition-transform duration-300 hover:scale-[1.02]`}>
                <div className="mb-4 text-white">{service.icon}</div>
                <h3 className="mb-3 text-left text-xl font-semibold text-white">{service.title}</h3>
                <p className="text-left text-gray-300">{service.description}</p>
                </div>
              </ServiceItemReveal>
            ))}
          </div>
        </section>

        <CctvComplianceSection
          intro="We design, install, and maintain CCTV systems that provide high-definition surveillance and secure monitoring for commercial and industrial sites, including IP and analogue architectures, NVR/DVR platforms, remote monitoring, perimeter protection, ANPR and multi-site networks with secure configuration."
          standardsItems={[
            "NSI approved installers",
            "BS EN 62676 (video surveillance systems)",
            "GDPR-compliant data handling and retention design",
          ]}
          footerNote={
            <>
              Intruder alarm installations follow PD 6662 and BS EN 50131, see our{" "}
              <Link href="/services/intruder-alarm-systems" className="text-black underline decoration-black/30 underline-offset-2 hover:decoration-black">
                intruder alarm systems
              </Link>{" "}
              page.
            </>
          }
          deliverablesItems={[
            "Camera schedules and network diagrams",
            "Recording retention setup",
            "Site survey and system design",
            "Installation and commissioning",
            "User training and handover",
            "Ongoing maintenance and monitoring",
          ]}
        />

        <ServicePageClosingSections
          serviceTitleShort="CCTV"
          ctaImageSrc={serviceHeroImages.cctv}
          ctaHeadline="Need the right"
          ctaHeadlineAccent="CCTV system?"
          ctaDescription="Our security specialists can survey your site and recommend the right CCTV and alarm solution for your premises and budget."
        >
          <CustomPillButton href="/contact" size="md">
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
