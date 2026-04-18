"use client"

import Link from "next/link"
import { ServicePageBottomCta } from "@/components/ServicePageBottomCta"
import { CustomPillButton } from "@/components/ui/CustomPillButton"
import { OurCustomers } from "@/components/ServicePageSharedSections"
import { ServicePageHero } from "@/components/ServicePageHero"
import { serviceHeroImages } from "@/lib/serviceHeroImages"
import {
  CheckCircle,
  Flame,
  Radio,
  Speaker,
  Volume2,
  Zap,
} from "lucide-react"

const cardClass =
  "rounded-tl-[1.5rem] rounded-br-[1.5rem] border-2 border-white/20 bg-black p-8 text-white transition-colors hover:border-white/45"

export default function EvacVoiceEvacuationPage() {
  return (
    <div className="service-page-root min-h-screen overflow-x-hidden bg-black text-white">
      <ServicePageHero
        title="EVAC & voice evacuation systems"
        imageSrc={serviceHeroImages.fireAlarm}
        heroCompliance={["BS 5839-8"]}
        intro={
          <>
            <p className="mb-4">
              APX provides voice evacuation systems designed to deliver clear, controlled messaging during emergency situations.
            </p>
            <p>
              We integrate public address, zoned messaging, amplifiers and speakers with your fire alarm strategy — with structured design, audio testing, commissioning and
              documentation for commercial, industrial and public-sector projects across London and the Home Counties.
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

        <section className="container relative z-[1] mx-auto px-6 py-12 lg:py-16">
          <h2 className="mb-4 text-left font-title text-3xl font-bold text-white sm:text-4xl">Capabilities</h2>
          <p className="mb-10 max-w-3xl text-left text-gray-300">
            From amplifier and speaker installation through to cause-and-effect with the fire alarm, we deliver voice evacuation that is intelligible, zoned and testable —
            with clear handover files for operators and maintainers.
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Volume2 className="h-8 w-8" strokeWidth={1.75} />,
                title: "Voice evacuation systems",
                description: "Distributed audio networks and control for phased or general building evacuation messaging.",
              },
              {
                icon: <Radio className="h-8 w-8" strokeWidth={1.75} />,
                title: "Public address integration",
                description: "Where PA and emergency voice share infrastructure, we coordinate routing, priorities and supervision.",
              },
              {
                icon: <Zap className="h-8 w-8" strokeWidth={1.75} />,
                title: "Zoned evacuation messaging",
                description: "Zoning aligned to your fire strategy — clear, prioritised announcements and local control where required.",
              },
              {
                icon: <Speaker className="h-8 w-8" strokeWidth={1.75} />,
                title: "Amplifier & speaker installation",
                description: "Sizing, placement and commissioning for audibility and intelligibility across occupied spaces.",
              },
              {
                icon: <Flame className="h-8 w-8" strokeWidth={1.75} />,
                title: "Integration with fire alarm systems",
                description: "Cause-and-effect, interfaces and witnessed testing alongside detection and alarm panels.",
              },
              {
                icon: <CheckCircle className="h-8 w-8" strokeWidth={1.75} />,
                title: "Audio testing & certification",
                description: "Structured measurement and records to demonstrate performance at handover.",
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

        <div className="border-t border-white/15" />

        <section className="container mx-auto px-6 py-12 lg:py-16">
          <p className="mb-10 max-w-3xl text-left text-gray-300">
            Voice alarm systems are covered by BS 5839-8. We align installation, testing and documentation with that standard and with your project&apos;s fire engineering
            inputs — including interfaces to disabled communication and building systems where applicable.
          </p>
          <div className="grid grid-cols-1 gap-10 border-t border-white/15 pt-10 lg:grid-cols-[1fr_auto_1fr] lg:items-start lg:gap-0 lg:border-t-0 lg:pt-0">
            <div className="min-w-0 lg:pr-10">
              <h2 className="mb-6 text-left font-title text-3xl font-bold text-white sm:text-4xl">Standards &amp; handover</h2>
              <p className="mb-4 text-left text-sm font-semibold uppercase tracking-wide text-white/55">
                Voice alarm &amp; BS 5839-8
              </p>
              <ul className="space-y-4">
                {["BS 5839-8 — Voice alarm systems (design, installation, commissioning and maintenance)"].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-left text-gray-300">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-white/50" strokeWidth={2} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-gray-400">
                Related life-safety scopes:{" "}
                <Link href="/services/refuge-disabled-communication" className="text-white underline decoration-white/30 underline-offset-2 hover:decoration-white">
                  refuge &amp; disabled communication
                </Link>
                ,{" "}
                <Link href="/services/fire-life-safety" className="text-white underline decoration-white/30 underline-offset-2 hover:decoration-white">
                  fire &amp; life safety
                </Link>
                .
              </p>
            </div>
            <div
              className="hidden w-px shrink-0 self-stretch bg-white/15 lg:block"
              aria-hidden
            />
            <div className="min-w-0 border-t border-white/15 pt-10 lg:border-t-0 lg:pl-10 lg:pt-0">
              <h2 className="mb-6 text-left font-title text-3xl font-bold text-white sm:text-4xl">Typical deliverables</h2>
              <ul className="space-y-4">
                {[
                  "Audio testing reports and as-commissioned settings",
                  "Commissioning documentation and witness sheets",
                  "System configuration files and operator handover",
                  "Coordination with O&M and training for building users",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-left text-gray-300">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-white/50" strokeWidth={2} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <OurCustomers serviceTitleShort="EVAC & voice" />

        <ServicePageBottomCta
          imageSrc={serviceHeroImages.fireAlarm}
          title="Planning voice evacuation?"
          description="Share your drawings and fire strategy — we can advise on zoning, equipment and commissioning for a compliant voice alarm installation."
        >
          <CustomPillButton href="/contact" size="md">
            Discuss your project
          </CustomPillButton>
          <CustomPillButton href="tel:02083032280" size="md" variant="outline">
            Call 020 8303 2280
          </CustomPillButton>
        </ServicePageBottomCta>
      </div>
    </div>
  )
}
