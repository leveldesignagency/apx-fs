"use client"

import Link from "next/link"
import { CctvWhatWeOfferSection } from "@/components/CctvWhatWeOfferSection"
import { ServicePageHero } from "@/components/ServicePageHero"
import { serviceHeroImages } from "@/lib/serviceHeroImages"
import { CheckCircle, Home, Shield, Smartphone } from "lucide-react"

const cardClass =
  "rounded-tl-[1.5rem] rounded-br-[1.5rem] border-2 border-white/20 bg-black p-8 text-white transition-colors hover:border-white/45"

const WHAT_WE_OFFER_ITEMS = [
  "Site survey and camera placement advice",
  "HD and 4K indoor and outdoor cameras",
  "NVR/DVR recording and cloud options",
  "Mobile app access and push alerts",
  "Installation and handover",
]

export default function DomesticCctvPage() {
  return (
    <div className="service-page-root min-h-screen overflow-x-hidden text-white">
      <ServicePageHero
        title="Domestic CCTV systems"
        imageSrc={serviceHeroImages.cctv}
        heroNav="cctv-tabs"
        intro="Protect your home with professionally designed and installed domestic CCTV systems. From single-camera setups to full property coverage with remote viewing, we deliver solutions that give you peace of mind and evidence when it matters."
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
          <h2 className="mb-10 text-left font-title text-3xl font-bold text-white sm:text-4xl">Why choose domestic CCTV?</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: Home,
                title: "Tailored to your home",
                text: "Systems designed for houses, flats, and driveways — no one-size-fits-all.",
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
              <div key={i} className={cardClass}>
                <item.icon className="mb-4 h-8 w-8 text-white" strokeWidth={1.75} />
                <h3 className="mb-3 text-left text-xl font-semibold text-white">{item.title}</h3>
                <p className="text-left text-gray-300">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="border-t border-white/15" />

        <section className="container mx-auto px-6 py-12 lg:py-16">
          <p className="mb-10 max-w-3xl text-left text-gray-300">
            Domestic CCTV should be proportionate, lawful and clearly communicated — we design and install home systems with sensible coverage, signage and retention explained at handover, aligned with data protection expectations and professional installation practice.
          </p>
          <div className="grid grid-cols-1 gap-10 border-t border-white/15 pt-10 lg:grid-cols-[1fr_auto_1fr] lg:items-start lg:gap-0 lg:border-t-0 lg:pt-0">
            <div className="min-w-0 lg:pr-10">
              <h2 className="mb-6 text-left font-title text-3xl font-bold text-white sm:text-4xl">Standards &amp; compliance</h2>
              <p className="mb-4 text-left text-sm font-semibold uppercase tracking-wide text-white/55">
                CCTV &amp; surveillance alignment
              </p>
              <ul className="space-y-4">
                {[
                  "NSI approved installers",
                  "BS EN 62676 (video surveillance systems) where applicable",
                  "GDPR-compliant data handling, signage and retention design",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-left text-gray-300">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-white/50" strokeWidth={2} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-gray-400">
                For intruder alarms alongside CCTV, see our{" "}
                <Link href="/services/sustainability" className="text-white underline decoration-white/30 underline-offset-2 hover:decoration-white">
                  intruder alarm systems
                </Link>{" "}
                page. Full CCTV overview:{" "}
                <Link href="/services/electrical-systems" className="text-white underline decoration-white/30 underline-offset-2 hover:decoration-white">
                  CCTV systems
                </Link>
                .
              </p>
            </div>
            <div
              className="hidden w-px shrink-0 self-stretch bg-white/15 lg:block"
              aria-hidden
            />
            <div className="min-w-0 border-t border-white/15 pt-10 lg:border-t-0 lg:pl-10 lg:pt-0">
              <h2 className="mb-6 text-left font-title text-3xl font-bold text-white sm:text-4xl">Deliverables &amp; lifecycle</h2>
              <ul className="space-y-4">
                {[
                  "Survey-led camera placement and coverage plan",
                  "Recording setup and mobile app handover",
                  "Installation and commissioning",
                  "User guidance on privacy, signage and retention",
                  "Optional maintenance and health checks",
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

        <CctvWhatWeOfferSection eyebrow="Domestic" items={WHAT_WE_OFFER_ITEMS} />
      </div>
    </div>
  )
}
