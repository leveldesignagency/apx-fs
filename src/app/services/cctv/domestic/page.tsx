"use client"

import Link from "next/link"
import { CctvComplianceSection } from "@/components/CctvComplianceSection"
import { CctvWhatWeOfferSection } from "@/components/CctvWhatWeOfferSection"
import { FsCctvCameraTypesStrip } from "@/components/FsCctvCameraTypesStrip"
import { FsServiceFaqByRoute } from "@/components/FsServiceFaqByRoute"
import { FsServiceBenefitsList } from "@/components/FsServiceBenefitsList"
import { FsServiceTextImageSection } from "@/components/FsServiceTextImageSection"
import { FsServiceTextImageSectionGroup } from "@/components/FsServiceTextImageSectionGroup"
import { FsCctvSubpageHeroButtons } from "@/components/FsCctvSubpageHeroButtons"
import { ServicePageHero } from "@/components/ServicePageHero"
import { Reveal } from "@/components/Reveal"
import { ServiceItemReveal } from "@/components/ServiceItemReveal"
import { CustomPillButton } from "@/components/ui/CustomPillButton"
import { FS_SERVICE_SHIMMER_CARD_FEATURE } from "@/lib/fsServicePageCards"
import { serviceHeroImages } from "@/lib/serviceHeroImages"
import { Home, Shield, Smartphone } from "lucide-react"

/** Public folder: `public/service images/cctv /` */
const DOMESTIC_CCTV_BESPOKE_IMAGE_SRC = "/service%20images/cctv%20/bespoke%20domestic%20cctv.jpg"
const DOMESTIC_CCTV_PLANNING_IMAGE_SRC =
  "/service%20images/cctv%20/Planning%20a%20Domestic%20CCTV%20System.jpg"
const DOMESTIC_CCTV_WHY_INSTALL_IMAGE_SRC =
  "/service%20images/cctv%20/why%20install%20a%20domestic%20cctv%20system.jpg"

const WHY_INSTALL_DOMESTIC_CCTV = [
  "Deter people from committing offences both inside and outside the home.",
  "Gather evidence of criminal activity, should crime occur.",
  "See an image of a visitor at the door before answering it.",
  "Watch over vehicles parked to the front or side of the home.",
  "Remotely view your home (inside and out) when at work or away on holiday.",
  "Check to see if deliveries have been made.",
  "Remotely check to see if employed persons, such as cleaners or builders, have arrived and left at the appropriate times.",
  "Remotely check on children or other family members when out for the evening.",
  "Check on children's bedrooms after bedtime.",
  "Check the grounds of your home from the comfort of the armchair.",
] as const

const WHAT_WE_OFFER_ITEMS = [
  "Site survey and camera placement advice",
  "HD and 4K indoor and outdoor cameras",
  "NVR/DVR recording and cloud options",
  "Mobile app access and push alerts",
  "Installation and handover",
  "Discreet cabling and tidy finishes to suit your home",
  "Signage and privacy obligations explained at handover",
  "Retention and export guidance for incidents and insurance",
  "Optional maintenance and system health checks",
]

export default function DomesticCctvPage() {
  return (
    <div className="service-page-root min-h-screen overflow-x-hidden text-white">
      <div className="relative">
        <ServicePageHero
          title="Domestic CCTV systems"
          imageSrc={serviceHeroImages.domesticCctv}
          heroCompliance={["GDPR", "BS EN 62676"]}
          afterIntro={<FsCctvSubpageHeroButtons />}
          intro="Protect your home with professionally designed and installed domestic CCTV systems. From single-camera setups to full property coverage with remote viewing, we deliver solutions that give you peace of mind and evidence when it matters."
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
            <h2 className="mb-10 text-left font-title text-3xl font-bold text-white sm:text-4xl">Why choose domestic CCTV?</h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: Home,
                title: "Tailored to your home",
                text: "Systems designed for houses, flats, and driveways, no one-size-fits-all.",
              },
              {
                icon: Smartphone,
                title: "Remote viewing",
                text: "Check live and recorded footage from your phone or tablet, wherever you are.",
              },
              {
                icon: Shield,
                title: "Deterrence & evidence",
                text: "Visible cameras deter intruders; recorded footage supports insurance and police.",
              },
            ].map((item, i) => (
              <ServiceItemReveal key={i} index={i} className="h-full min-h-0">
                <div className={FS_SERVICE_SHIMMER_CARD_FEATURE}>
                <item.icon className="mb-4 h-8 w-8 text-white" strokeWidth={1.75} />
                <h3 className="mb-3 text-left text-xl font-semibold text-white">{item.title}</h3>
                <p className="text-left text-gray-300">{item.text}</p>
                </div>
              </ServiceItemReveal>
            ))}
          </div>
        </section>

        <div className="border-t border-white/15" />

        <FsServiceTextImageSectionGroup>
          <FsServiceTextImageSection
          title="Planning a Domestic CCTV System"
          titleId="planning-domestic-cctv-heading"
          imageSrc={DOMESTIC_CCTV_PLANNING_IMAGE_SRC}
          imageAlt="Planning a domestic CCTV system, site survey and security assessment"
          imageRightFeather={false}
        >
          <p>
            Before you start planning a CCTV installation, we are pleased to offer a free survey and a report for your
            property. Our report highlights security weaknesses and identifies places that need security improvements
            that should be carried out before installing CCTV.
          </p>
          <p>
            For example: if your home has an open access along the side then the report may advise you to fit a gate at
            the entrance to the side access, parallel to the front of the house. We would advise that you do this first
            and then monitor the gate with a CCTV camera.
          </p>
          <p>
            Once the gate has been fitted we can install a camera at the appropriate height on the side wall to capture
            images of an intruder attempting to force or climb over the gate. Physical security changes like these will
            always dictate the best position for the cameras, so we know we&apos;re installing them in the best place.
          </p>
          <p>
            Simply complete our{" "}
            <Link
              href="/contact"
              className="text-white underline decoration-white/35 underline-offset-2 hover:decoration-white"
            >
              Domestic CCTV enquiry form
            </Link>{" "}
            and we will contact you and arrange to meet you to discuss your requirements and carry out a survey of your
            property.
          </p>
          <div className="pt-2">
            <CustomPillButton href="/contact" size="md">
              Request a free survey
            </CustomPillButton>
          </div>
        </FsServiceTextImageSection>

        <div className="border-t border-white/15" />

          <FsServiceTextImageSection
          title="Bespoke Domestic CCTV Systems"
          titleId="bespoke-domestic-cctv-heading"
          imageSrc={DOMESTIC_CCTV_BESPOKE_IMAGE_SRC}
          imageAlt="Bespoke domestic CCTV system installation"
          imageSide="left"
          imageRightFeather={false}
        >
          <p>
            There are all manner of reasons why a domestic property may need an effective CCTV system. Whether you are
            looking to protect your property whilst away from home or to monitor and alert you to any potential threats
            or damage, we can build a CCTV system to achieve your objective.
          </p>
          <p>
            For example: maybe you have recently had a vehicle broken into whilst it was parked on the driveway in
            front of your house and you want the CCTV to act as a deterrent and capture useful images of people walking
            onto the driveway. We will work out the best location and angle of the cameras in order to capture useful
            images around your parked vehicles. We will also ensure that the cameras are installed in such a way that
            they do not become an easy target for the criminal.
          </p>
          <p>
            Whatever your reason for wanting a CCTV system, we will take the time to understand your requirements and
            install the right equipment to deliver the peace of mind you are looking for.
          </p>
        </FsServiceTextImageSection>

        <div className="border-t border-white/15" />

        <FsServiceTextImageSection
          title="Why install a Domestic CCTV System?"
          titleId="why-install-domestic-cctv-heading"
          imageSrc={DOMESTIC_CCTV_WHY_INSTALL_IMAGE_SRC}
          imageAlt="Why install a domestic CCTV system, home security monitoring"
          imageRightFeather={false}
        >
          <FsServiceBenefitsList items={WHY_INSTALL_DOMESTIC_CCTV} />
        </FsServiceTextImageSection>
        </FsServiceTextImageSectionGroup>

        <div className="border-t border-white/15" />

        <CctvComplianceSection
          intro="Domestic CCTV should be proportionate, lawful and clearly communicated, we design and install home systems with sensible coverage, signage and retention explained at handover, aligned with data protection expectations and professional installation practice."
          standardsItems={[
            "NSI approved installers",
            "BS EN 62676 (video surveillance systems) where applicable",
            "GDPR-compliant data handling, signage and retention design",
          ]}
          footerNote={
            <>
              For intruder alarms alongside CCTV, see our{" "}
              <Link href="/services/intruder-alarm-systems" className="text-black underline decoration-black/30 underline-offset-2 hover:decoration-black">
                intruder alarm systems
              </Link>{" "}
              page. Full CCTV overview:{" "}
              <Link href="/services/cctv-systems" className="text-black underline decoration-black/30 underline-offset-2 hover:decoration-black">
                CCTV systems
              </Link>
              .
            </>
          }
          deliverablesItems={[
            "Survey-led camera placement and coverage plan",
            "Recording setup and mobile app handover",
            "Installation and commissioning",
            "User guidance on privacy, signage and retention",
            "Optional maintenance and health checks",
          ]}
        />

        <CctvWhatWeOfferSection eyebrow="Domestic" items={WHAT_WE_OFFER_ITEMS} />

        <FsServiceFaqByRoute />
      </div>
    </div>
  )
}
