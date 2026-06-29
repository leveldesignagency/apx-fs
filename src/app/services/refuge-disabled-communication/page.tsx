"use client"

import Link from "next/link"
import { ServiceComplianceSection } from "@/components/ServiceComplianceSection"
import { ServicePageClosingSections } from "@/components/ServicePageClosingSections"
import { CustomPillButton } from "@/components/ui/CustomPillButton"
import { ServicePageHero } from "@/components/ServicePageHero"
import { serviceHeroImages } from "@/lib/serviceHeroImages"
import {
  Building2,
  CheckCircle,
  Phone,
  Accessibility,
  Layers,
  Network,
} from "lucide-react"

const cardClass =
  "rounded-tl-[1.5rem] rounded-br-[1.5rem] border-2 border-white/20 bg-black p-8 text-white transition-colors hover:border-white/45"

export default function RefugeDisabledCommunicationPage() {
  return (
    <div className="service-page-root min-h-screen overflow-x-hidden bg-black text-white">
      <ServicePageHero
        title="Refuge & Disabled Communication Systems"
        imageSrc={serviceHeroImages.fireAlarm}
        heroCompliance={["BS 5839-9"]}
        intro={
          <>
            <p className="mb-4">
              We install fully compliant Emergency Voice Communication (EVC) systems to support safe evacuation for disabled persons during emergencies.
            </p>
            <p>
              Capabilities include disabled refuge points, fire telephones, disabled toilet alarms and central EVC control panels, with multi-storey integration, structured
              commissioning and documentation for handover and audit.
            </p>
          </>
        }
      />

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
          <h2 className="mb-4 text-left font-title text-3xl font-bold text-white sm:text-4xl">What we install &amp; integrate</h2>
          <p className="mb-10 max-w-3xl text-left text-gray-300">
            EVC systems link refuge areas, WC alarms and fire telephones to central control so staff and the fire service can communicate clearly during an incident. We align
            device placement, cabling and commissioning with your fire strategy and building use.
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Accessibility className="h-8 w-8" strokeWidth={1.75} />,
                title: "Disabled refuge points",
                description: "Refuge communication outstations with clear, reliable speech paths for staged evacuation in multi-storey buildings.",
              },
              {
                icon: <Phone className="h-8 w-8" strokeWidth={1.75} />,
                title: "Fire telephones",
                description: "Firefighter and staging telephones where your design requires dedicated voice circuits alongside the wider EVC network.",
              },
              {
                icon: <Building2 className="h-8 w-8" strokeWidth={1.75} />,
                title: "Disabled toilet alarms",
                description: "Remote indication and reset where WC alarms form part of the emergency communication strategy.",
              },
              {
                icon: <Layers className="h-8 w-8" strokeWidth={1.75} />,
                title: "Central EVC control panels",
                description: "Head-end equipment, zoning and monitoring configured for your site layout and duty-holder workflows.",
              },
              {
                icon: <Network className="h-8 w-8" strokeWidth={1.75} />,
                title: "Multi-storey integration",
                description: "Coordinated risers, interfaces and testing across floors, including coordination with fire detection and voice evacuation where specified.",
              },
              {
                icon: <CheckCircle className="h-8 w-8" strokeWidth={1.75} />,
                title: "Commissioning & handover",
                description: "Witnessed testing, user guidance and records so the system is demonstrably compliant at completion.",
              },
            ].map((item, index) => (
              <div key={index} className={`${cardClass} transition-transform duration-300 hover:scale-[1.02]`}>
                <div className="mb-4 text-white">{item.icon}</div>
                <h3 className="mb-3 text-left text-xl font-semibold text-white">{item.title}</h3>
                <p className="text-left text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <ServiceComplianceSection
          intro="Emergency voice communication for disabled people is subject to dedicated British Standard guidance. We work to BS 5839-9 for design, installation, commissioning and maintenance of these systems, coordinated with your fire risk assessment and evacuation plans."
          leftEyebrow="Emergency voice communication (BS 5839-9)"
          standardsItems={["BS 5839-9, Fire detection and alarm systems: emergency voice communication systems"]}
          footerNote={
            <>
              Voice evacuation (BS 5839-8) and fire alarm detection (BS 5839-1) often interface with EVC, see our{" "}
              <Link href="/services/evac-voice-evacuation" className="text-black underline decoration-black/30 underline-offset-2 hover:decoration-black">
                EVAC &amp; voice evacuation
              </Link>{" "}
              and{" "}
              <Link href="/services/fire-life-safety" className="text-black underline decoration-black/30 underline-offset-2 hover:decoration-black">
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
            "Ongoing maintenance options aligned with manufacturer and BS 5839-9",
          ]}
        />

        <ServicePageClosingSections
          serviceTitleShort="Refuge & EVC"
          ctaImageSrc={serviceHeroImages.fireAlarm}
          ctaTitle="Need refuge or EVC systems?"
          ctaDescription="Tell us about your building and evacuation strategy, we can survey, specify and deliver compliant emergency voice communication."
        >
          <CustomPillButton href="/contact" size="md">
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
