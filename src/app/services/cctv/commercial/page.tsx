"use client"

import Link from "next/link"
import { CctvWhatWeOfferSection } from "@/components/CctvWhatWeOfferSection"
import { FsCctvCameraTypesStrip } from "@/components/FsCctvCameraTypesStrip"
import { FsServiceFaqByRoute } from "@/components/FsServiceFaqByRoute"
import { ServicePageHero } from "@/components/ServicePageHero"
import { FS_SERVICE_SHIMMER_CARD_FEATURE } from "@/lib/fsServicePageCards"
import { serviceHeroImages } from "@/lib/serviceHeroImages"
import { Building2, CheckCircle, Monitor, Lock } from "lucide-react"

const WHAT_WE_OFFER_ITEMS = [
  "Site survey and system design",
  "IP and analogue camera systems",
  "NVR/DVR and cloud recording",
  "GDPR-compliant data handling",
  "Installation, commissioning and training",
  "Ongoing maintenance and support",
  "Multi-site roll-out and centralised monitoring options",
  "Integration with access control and intruder alarms",
  "Documentation and handover packs aligned with NSI expectations",
]

export default function CommercialCctvPage() {
  return (
    <div className="service-page-root min-h-screen overflow-x-hidden text-white">
      <div className="relative">
        <ServicePageHero
          title="Commercial CCTV systems"
          imageSrc={serviceHeroImages.cctv}
          heroNav="cctv-tabs"
          intro="High-performance CCTV for offices, retail, warehouses, and multi-site operations. We design and install scalable systems with remote monitoring, integration with access control and intruder alarms, and compliance with GDPR and industry standards."
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
          <h2 className="mb-10 text-left font-title text-3xl font-bold text-white sm:text-4xl">Commercial CCTV solutions</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: Building2,
                title: "Multi-site & scalable",
                text: "From single premises to estate-wide networks with centralised monitoring.",
              },
              { icon: Monitor, title: "24/7 monitoring", text: "Optional alarm receiving and video monitoring with rapid response." },
              { icon: Lock, title: "Integration", text: "CCTV working with access control, intruder alarms, and fire systems." },
            ].map((item, i) => (
              <div key={i} className={FS_SERVICE_SHIMMER_CARD_FEATURE}>
                <item.icon className="mb-4 h-8 w-8 text-white" strokeWidth={1.75} />
                <h3 className="mb-3 text-left text-xl font-semibold text-white">{item.title}</h3>
                <p className="text-left text-gray-300">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="border-t border-white/15" />

        <section className="container mx-auto px-6 py-16 lg:py-16">
          <p className="mb-10 max-w-3xl text-left text-gray-300">
            For offices, retail, warehouses and multi-site estates we design and install scalable CCTV with remote monitoring, perimeter protection and secure network configuration — aligned with NSI expectations, BS EN 62676 where applicable, and GDPR-compliant recording and retention design.
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
                  "BS EN 62676 (video surveillance systems)",
                  "GDPR-compliant data handling and retention design",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-left text-gray-300">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-white/50" strokeWidth={2} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-gray-400">
                Intruder alarm installations follow PD 6662 and BS EN 50131 — see our{" "}
                <Link href="/services/sustainability" className="text-white underline decoration-white/30 underline-offset-2 hover:decoration-white">
                  intruder alarm systems
                </Link>{" "}
                page. Full CCTV scope:{" "}
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
                  "Camera schedules and network diagrams",
                  "Recording retention and user permission setup",
                  "Site survey and system design",
                  "Installation and commissioning",
                  "User training and handover",
                  "Ongoing maintenance and monitoring",
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

        <CctvWhatWeOfferSection eyebrow="Commercial" items={WHAT_WE_OFFER_ITEMS} />

        <FsServiceFaqByRoute />
      </div>
    </div>
  )
}
