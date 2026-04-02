"use client"

import { CctvWhatWeOfferSection } from "@/components/CctvWhatWeOfferSection"
import { ServicePageHero } from "@/components/ServicePageHero"
import { serviceHeroImages } from "@/lib/serviceHeroImages"
import { HelpCircle, Camera, FileCheck } from "lucide-react"

const cardClass =
  "rounded-tl-[1.5rem] rounded-br-[1.5rem] border-2 border-white/20 bg-black p-8 text-white transition-colors hover:border-white/45"

const WHAT_WE_OFFER_ITEMS = [
  "Free, no-obligation survey of your property",
  "Discussion of risks, coverage and budget",
  "Guidance on camera types, resolution and night vision",
  "Advice on recording, retention, signage and GDPR",
  "What to expect from a professional installer",
]

export default function UsefulCctvAdvicePage() {
  return (
    <div className="service-page-root min-h-screen overflow-x-hidden bg-black text-white">
      <ServicePageHero
        title="Useful CCTV advice"
        imageSrc={serviceHeroImages.cctv}
        heroNav="cctv-tabs"
        intro="Not sure what you need? We've put together practical advice on choosing and using CCTV — from camera types and placement to recording, data protection, and working with a professional installer."
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
          <h2 className="mb-10 text-left font-title text-3xl font-bold text-white sm:text-4xl">CCTV advice & guidance</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: Camera,
                title: "Choosing the right system",
                text: "Indoor vs outdoor, resolution, night vision, and whether to go wired or wireless — we help you decide.",
              },
              {
                icon: FileCheck,
                title: "Placement & coverage",
                text: "Where to put cameras for the best coverage and evidence, and how to stay within the law.",
              },
              {
                icon: HelpCircle,
                title: "Data protection & signage",
                text: "GDPR, signage, retention periods, and sharing footage with police or insurers.",
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

        <CctvWhatWeOfferSection
          eyebrow="Advice"
          title="What we offer"
          description="The best way to get advice tailored to your property is a free, no-obligation survey. We assess your site, discuss your requirements, and recommend the right CCTV approach."
          items={WHAT_WE_OFFER_ITEMS}
        />
      </div>
    </div>
  )
}
