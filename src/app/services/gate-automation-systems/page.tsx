"use client"

import Link from "next/link"
import { ServiceComplianceSection } from "@/components/ServiceComplianceSection"
import { ServicePageClosingSections } from "@/components/ServicePageClosingSections"
import { CustomPillButton } from "@/components/ui/CustomPillButton"
import { ServicePageHero } from "@/components/ServicePageHero"
import { Reveal } from "@/components/Reveal"
import { ServiceItemReveal } from "@/components/ServiceItemReveal"
import { ServiceFeatureIconCard } from "@/components/ServiceFeatureIconCard"
import { FsServiceTextImageSection } from "@/components/FsServiceTextImageSection"
import { FsServiceTextImageSectionGroup } from "@/components/FsServiceTextImageSectionGroup"
import { serviceHeroImages } from "@/lib/serviceHeroImages"
import { FS_SERVICE_ROUTES } from "@/lib/fs-service-routes"
import {
  Car,
  Fence,
  Shield,
  Link2,
  Eye,
  Wrench,
} from "lucide-react"

const cardClass =
  "rounded-tl-[1.5rem] rounded-br-[1.5rem] border-2 border-white/20 bg-black p-8 text-white transition-colors hover:border-white/45"

const linkClass =
  "underline decoration-white/40 underline-offset-[3px] transition-colors hover:decoration-white"

const heroBridge = (
  <div
    className="pointer-events-none absolute left-0 right-0 top-0 h-28 sm:h-36"
    style={{
      background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.82) 52%, rgba(0,0,0,1) 100%)",
    }}
    aria-hidden
  />
)

export default function GateAutomationSystemsPage() {
  return (
    <div className="service-page-root min-h-screen overflow-x-hidden bg-black text-white">
      <ServicePageHero
        title="Gate Automation Systems"
        imageSrc={serviceHeroImages.gateAutomation}
        heroCompliance={["BS EN 12453"]}
        intro={
          <>
            <p className="mb-4">
              We design, install and commission automated gates and vehicle barriers for commercial, industrial and residential sites, from single entrances through to multi-lane
              perimeter control.
            </p>
            <p>
              Systems can stand alone or integrate with access control, video door entry and CCTV so authorised vehicles and visitors are managed as part of your wider security
              strategy across London and the Home Counties.
            </p>
          </>
        }
      />

      <div className="relative bg-black">
        {heroBridge}

        <section className="container relative z-[1] mx-auto px-6 py-16 lg:py-16">
          <Reveal>
            <h2 className="mb-4 text-left font-title text-3xl font-bold text-white sm:text-4xl">What we install &amp; integrate</h2>
          </Reveal>
          <Reveal delayMs={70}>
            <p className="mb-10 max-w-3xl text-left text-gray-300">
              Gate automation covers powered swing and sliding gates, rising barriers and the control, safety and access interfaces that make them reliable day to day. We align
              operators, loops, photocells and credentials with how your site actually runs.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                Icon: Fence,
                title: "Swing & sliding gates",
                description: "Automated residential and commercial gate operators specified for the leaf weight, duty cycle and usage pattern of your entrance.",
                id: "gate-swing-sliding",
              },
              {
                Icon: Car,
                title: "Vehicle barriers",
                description: "Rising arm and related barrier control for car parks, yards and multi-lane sites, with loop detection and timed release options.",
                id: "gate-barriers",
              },
              {
                Icon: Shield,
                title: "Safety devices",
                description: "Photocells, safety edges and force limitation configured with reference to BS EN 12453 where powered gates apply.",
                id: "gate-safety",
              },
              {
                Icon: Link2,
                title: "Access control integration",
                description: "Readers, fobs, intercoms and schedules linked so gates open only for authorised users and vehicles.",
              },
              {
                Icon: Eye,
                title: "CCTV & video entry",
                description: "Camera coverage and video entry at the gate line so operators can identify callers and review vehicle movements.",
                id: "gate-cctv-video-entry",
              },
              {
                Icon: Wrench,
                title: "Upgrades & maintenance",
                description: "Survey of legacy operators, phased replacements and planned maintenance so entrances stay dependable.",
              },
            ].map(({ Icon, title, description, id }, index) => (
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

        <div className="border-t border-white/15" />

        <FsServiceTextImageSectionGroup>
          <FsServiceTextImageSection
            title="Vehicle barriers"
            titleId="gate-barriers-heading"
            imageSrc={serviceHeroImages.gateAutomation}
            imageAlt="Gate automation and vehicle barrier installation"
          >
            <p>
              Rising-arm and related vehicle barriers suit car parks, yards, loading bays and multi-lane entrances where a
              full gate is not required, or where lanes need different rules for staff, visitors and deliveries.
            </p>
            <p>
              We specify barrier length, duty cycle and control logic around how the site runs: induction loops for
              free-exit, timed release, ticket or token validation, and integration with{" "}
              <Link href={FS_SERVICE_ROUTES.accessControlSystems} className={linkClass}>
                access control
              </Link>{" "}
              so only authorised vehicles open the arm. Multi-lane sites can share a common control strategy while each
              lane keeps its own detection and safety devices.
            </p>
            <p>
              Safety, clear sightlines and reliable day-to-day operation come first. We survey approach speeds, pedestrian
              routes and existing civil works so the barrier package is practical to install, commission and maintain.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <CustomPillButton href="/contact?service=gate-automation-systems" size="md">
                Barrier enquiry
              </CustomPillButton>
              <CustomPillButton href={FS_SERVICE_ROUTES.accessControlSystems} size="md" variant="outline">
                Access control
              </CustomPillButton>
            </div>
          </FsServiceTextImageSection>

          <div className="border-t border-white/15" />

          <FsServiceTextImageSection
            title="Video entry &amp; CCTV at the gate line"
            titleId="gate-cctv-video-entry-heading"
            imageSrc={serviceHeroImages.videoDoor}
            imageAlt="Video door entry and CCTV at a controlled entrance"
          >
            <p>
              Gate automation works best when operators can see who is calling and what is moving on the approach. We
              integrate{" "}
              <Link href={FS_SERVICE_ROUTES.videoDoorEntrySystems} className={linkClass}>
                video door entry
              </Link>{" "}
              at the gate or barrier line so reception or residents can identify visitors before releasing the entrance,
              including mobile answering where the platform supports it.
            </p>
            <p>
              <Link href={FS_SERVICE_ROUTES.cctvSystems} className={linkClass}>
                CCTV
              </Link>{" "}
              coverage of the approach, intercom and vehicle lane supports identification, incident review and remote
              decision-making. Cameras can sit alongside access events so recordings and door/gate activity tell one
              coherent story when something needs investigating.
            </p>
            <p>
              Whether you need a simple caller panel with remote release, or a joined-up package of gates, barriers,
              credentials and cameras, we survey the entrance as one system so safety devices, credentials and viewing
              stay aligned with how the site is used.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <CustomPillButton href="/contact?service=gate-automation-systems" size="md">
                Discuss integration
              </CustomPillButton>
              <CustomPillButton href={FS_SERVICE_ROUTES.videoDoorEntrySystems} size="md" variant="outline">
                Video door entry
              </CustomPillButton>
              <CustomPillButton href={FS_SERVICE_ROUTES.cctvSystems} size="md" variant="outline">
                CCTV systems
              </CustomPillButton>
            </div>
          </FsServiceTextImageSection>
        </FsServiceTextImageSectionGroup>

        <ServiceComplianceSection
          intro="Powered gates and doors are subject to dedicated safety guidance. Where applicable we design, install and commission with reference to BS EN 12453, coordinated with your access control and site operating procedures."
          leftEyebrow="Powered gate safety (BS EN 12453)"
          standardsItems={["BS EN 12453, Safety in use of powered doors and gates"]}
          footerNote={
            <>
              Gate automation often sits alongside{" "}
              <Link href="/services/access-control-systems" className="text-black underline decoration-black/30 underline-offset-2 hover:decoration-black">
                access control
              </Link>
              ,{" "}
              <Link href="/services/video-door-entry-systems" className="text-black underline decoration-black/30 underline-offset-2 hover:decoration-black">
                video door entry
              </Link>{" "}
              and{" "}
              <Link href="/services/cctv-systems" className="text-black underline decoration-black/30 underline-offset-2 hover:decoration-black">
                CCTV
              </Link>
              .
            </>
          }
          rightTitle="Deliverables & records"
          deliverablesItems={[
            "Entrance layout and equipment schedules",
            "Safety device configuration and commissioning records",
            "Access / credential setup where integrated",
            "Operator guidance and maintenance options",
          ]}
        />

        <ServicePageClosingSections
          serviceTitleShort="Gate automation"
          ctaImageSrc={serviceHeroImages.gateAutomation}
          ctaHeadline="Automate your"
          ctaHeadlineAccent="site entrance."
          ctaDescription="Tell us about your gates, barriers and access requirements, we can survey, specify and deliver a system that fits how your site operates."
        >
          <CustomPillButton href="/contact?service=gate-automation-systems" size="md">
            Get in touch
          </CustomPillButton>
          <CustomPillButton href="tel:02083032280" size="md" variant="outline">
            Call 020 8303 2280
          </CustomPillButton>
        </ServicePageClosingSections>
      </div>
    </div>
  )
}
