"use client"

import Link from "next/link"
import { ServiceComplianceSection } from "@/components/ServiceComplianceSection"
import { ServicePageClosingSections } from "@/components/ServicePageClosingSections"
import { CustomPillButton } from "@/components/ui/CustomPillButton"
import { CallPhoneCta } from "@/components/ui/CallPhoneCta"
import { ServicePageHero } from "@/components/ServicePageHero"
import { FsFireSubpageHeroButtons } from "@/components/FsFireSubpageHeroButtons"
import { Reveal } from "@/components/Reveal"
import { ServiceItemReveal } from "@/components/ServiceItemReveal"
import { ServiceFeatureImageCard } from "@/components/ServiceFeatureImageCard"
import { serviceHeroImages, serviceSectionImages } from "@/lib/serviceHeroImages"
import { SERVICE_HERO_BRIDGE_GRADIENT } from "@/lib/heroBackgroundGradients"

const IMG = "/service%20images/refuge-capabilities"

const CAPABILITIES = [
  {
    title: "Disabled refuge systems",
    description:
      "Refuge communication outstations with clear, reliable two-way speech paths for staged evacuation in multi-storey buildings.",
    id: "fire-refuge",
    imageSrc: `${IMG}/refuge.jpg`,
    imageAlt: "Green disabled refuge emergency call point with braille and two-way speech",
  },
  {
    title: "Fire telephone systems",
    description:
      "Firefighter and staging telephones where your design requires dedicated voice circuits alongside the wider EVC network.",
    id: "fire-telephone",
    imageSrc: `${IMG}/telephone-lexicomm-outstations-tight.jpg`,
    imageAlt: "Lexicomm Type A fire telephone and Type B/C refuge outstations",
  },
  {
    title: "Disabled toilet alarms",
    description:
      "Accessible WC alarm call points with remote indication and reset where toilet alarms form part of the emergency communication strategy.",
    id: "fire-toilet",
    imageSrc: `${IMG}/toilet-lexicomm-assist-tight.jpg`,
    imageAlt: "AssistCall disabled toilet alarm overdoor light, pull cord and cancel reset plate",
  },
  {
    title: "Central control panels",
    description:
      "Head-end EVC panels, zoning and monitoring configured for your site layout and duty-holder workflows.",
    id: "fire-evc-panels",
    imageSrc: `${IMG}/panels-lexicomm-tight.jpg`,
    imageAlt: "Lexicomm EVC touchscreen masterstation with fire telephone and refuge outstations",
  },
  {
    title: "Two-way communication",
    description:
      "Speech paths between refuge points, fire telephones, toilet alarms and the central panel so staff and the fire service can communicate during an incident.",
    id: "fire-two-way",
    imageSrc: `${IMG}/two-way-lexicomm-outstations-tight.jpg`,
    imageAlt: "Lexicomm refuge and fire telephone outstations for two-way emergency speech",
  },
  {
    title: "Commissioning and handover",
    description:
      "BS 5839-9 aligned commissioning, witnessed testing, user guidance and records so the system is demonstrably compliant at completion.",
    id: "fire-evc-commissioning",
    imageSrc: `${IMG}/commissioning.jpg`,
    imageAlt: "Site engineers reviewing commissioning records on a live project",
  },
  {
    title: "Routine testing and maintenance",
    description:
      "Planned testing, fault attendance and ongoing maintenance options aligned with manufacturer guidance and BS 5839-9.",
    id: "fire-evc-maintenance",
    imageSrc: `${IMG}/maintenance.jpg`,
    imageAlt: "Engineer testing control gear with a multimeter",
  },
] as const

export default function RefugeDisabledCommunicationPage() {
  return (
    <div className="service-page-root min-h-screen overflow-x-hidden bg-black text-white">
      <ServicePageHero
        title="Disabled Refuge Systems"
        titleDetail="Disabled refuge, fire telephone and toilet alarms"
        imageSrc={serviceHeroImages.refuge}
        imageAlt="Disabled refuge emergency voice communication — accessible evacuation provision"
        imageClassName="object-cover object-center"
        heroCompliance={["BS 5839-9"]}
        heroSummary="Disabled refuge, fire telephone and toilet alarm systems that keep emergency communication clear when it matters most."
        afterIntro={<FsFireSubpageHeroButtons />}
        intro={
          <>
            <p className="mb-4">
              APX designs, installs and maintains Emergency Voice Communication (EVC) systems under{" "}
              <strong className="font-semibold text-white">BS 5839-9</strong>, covering disabled refuge systems, fire
              telephone systems, disabled toilet alarms and central control panels with two-way communication.
            </p>
            <p>
              We deliver multi-storey integration, commissioning and handover documentation, plus routine testing and
              maintenance so duty holders can evidence a working emergency communication strategy, not refuge alone.
            </p>
          </>
        }
      />

      <div className="relative bg-[var(--page-bg)]">
        <div
          className="pointer-events-none absolute top-0 left-0 right-0 h-28 sm:h-36"
          style={{
            background:
              SERVICE_HERO_BRIDGE_GRADIENT,
          }}
          aria-hidden
        />

        <div className="relative z-[1] border-t border-white/15" aria-hidden />

        <section className="site-container relative z-[1] py-16 lg:py-16">
          <Reveal>
            <h2 className="mb-4 text-left font-title text-3xl font-bold text-white sm:text-4xl">
              Full EVC Scope
            </h2>
          </Reveal>
          <Reveal delayMs={70}>
            <p className="mb-10 max-w-3xl text-left text-gray-300">
              Disabled refuge points, fire telephones and disabled toilet alarms link to central control panels so staff
              and the fire service can communicate clearly during an incident. We align device placement, cabling,
              two-way speech paths and commissioning with your fire strategy and building use.
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
                  className="transition-transform duration-300 hover:scale-[1.02]"
                />
              </ServiceItemReveal>
            ))}
          </div>
        </section>

        <ServiceComplianceSection
          intro="Disabled refuge, fire telephone and disabled toilet alarm systems sit under dedicated British Standard guidance. We work to BS 5839-9 for design, installation, commissioning, routine testing and maintenance, coordinated with your fire risk assessment and evacuation plans."
          leftEyebrow="Emergency voice communication (BS 5839-9)"
          standardsItems={[
            "BS 5839-9, Fire detection and alarm systems: emergency voice communication systems",
            "Disabled refuge systems, fire telephone systems and disabled toilet alarms",
            "Central control panels and two-way communication paths",
            "Commissioning, handover, routine testing and maintenance",
          ]}
          footerNote={
            <>
              PAVA (BS 5839-8) and fire alarm detection (BS 5839-1) often interface with EVC, see our{" "}
              <Link
                href="/services/pava"
                className="text-black underline decoration-black/30 underline-offset-2 hover:decoration-black"
              >
                PAVA
              </Link>{" "}
              and{" "}
              <Link
                href="/services/fire-life-safety"
                className="text-black underline decoration-black/30 underline-offset-2 hover:decoration-black"
              >
                fire &amp; life safety
              </Link>{" "}
              overviews.
            </>
          }
          rightTitle="Deliverables & records"
          deliverablesItems={[
            "System layout drawings and zone / circuit schedules",
            "Commissioning certificates and witnessed test records",
            "User guidance and familiarisation for duty holders",
            "Routine testing and maintenance options aligned with manufacturer and BS 5839-9",
          ]}
        />

        <ServicePageClosingSections
          serviceTitleShort="Refuge, fire telephone & toilet alarms"
          ctaImageSrc={serviceSectionImages.refugeCta}
          ctaHeadline="Need Refuge, Fire Telephone or"
          ctaHeadlineAccent="Toilet Alarm Systems?"
          ctaDescription="Tell us about your building and evacuation strategy. We can survey, specify and deliver BS 5839-9 emergency voice communication, including disabled refuge, fire telephones and disabled toilet alarms."
        >
          <CustomPillButton href="/contact?service=refuge-disabled-communication" size="md">
            Get in touch
          </CustomPillButton>
          <CallPhoneCta size="md" />
        </ServicePageClosingSections>
      </div>
    </div>
  )
}
