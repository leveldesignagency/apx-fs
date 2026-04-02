"use client"

import { CctvWhatWeOfferSection } from "@/components/CctvWhatWeOfferSection"
import { ServicePageHero } from "@/components/ServicePageHero"
import { serviceHeroImages } from "@/lib/serviceHeroImages"
import { Home, Shield, Smartphone } from "lucide-react"

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
    <div className="service-page-root min-h-screen overflow-x-hidden bg-black text-white">
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

        <CctvWhatWeOfferSection eyebrow="Domestic" items={WHAT_WE_OFFER_ITEMS} />
      </div>
    </div>
  )
}
