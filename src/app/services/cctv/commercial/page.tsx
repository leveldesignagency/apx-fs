"use client"

import { CctvWhatWeOfferSection } from "@/components/CctvWhatWeOfferSection"
import { ServicePageHero } from "@/components/ServicePageHero"
import { serviceHeroImages } from "@/lib/serviceHeroImages"
import { Building2, Monitor, Lock } from "lucide-react"

const cardClass =
  "rounded-tl-[1.5rem] rounded-br-[1.5rem] border-2 border-white/20 bg-black p-8 text-white transition-colors hover:border-white/45"

const WHAT_WE_OFFER_ITEMS = [
  "Site survey and system design",
  "IP and analogue camera systems",
  "NVR/DVR and cloud recording",
  "GDPR-compliant data handling",
  "Installation, commissioning and training",
  "Ongoing maintenance and support",
]

export default function CommercialCctvPage() {
  return (
    <div className="service-page-root min-h-screen overflow-x-hidden bg-black text-white">
      <ServicePageHero
        title="Commercial CCTV systems"
        imageSrc={serviceHeroImages.cctv}
        heroNav="cctv-tabs"
        intro="High-performance CCTV for offices, retail, warehouses, and multi-site operations. We design and install scalable systems with remote monitoring, integration with access control and intruder alarms, and compliance with GDPR and industry standards."
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
              <div key={i} className={cardClass}>
                <item.icon className="mb-4 h-8 w-8 text-white" strokeWidth={1.75} />
                <h3 className="mb-3 text-left text-xl font-semibold text-white">{item.title}</h3>
                <p className="text-left text-gray-300">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <CctvWhatWeOfferSection eyebrow="Commercial" items={WHAT_WE_OFFER_ITEMS} />
      </div>
    </div>
  )
}
