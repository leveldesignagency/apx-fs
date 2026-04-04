"use client"

import Link from "next/link"
import { CctvWhatWeOfferSection } from "@/components/CctvWhatWeOfferSection"
import { ServicePageHero } from "@/components/ServicePageHero"
import { serviceHeroImages } from "@/lib/serviceHeroImages"
import { Camera, CheckCircle, FileCheck, HelpCircle } from "lucide-react"

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
    <div className="service-page-root min-h-screen overflow-x-hidden text-white">
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

        <div className="border-t border-white/15" />

        <section className="container mx-auto px-6 py-12 lg:py-16">
          <p className="mb-10 max-w-3xl text-left text-gray-300">
            Whether you are comparing installers or planning coverage, the same standards apply to lawful recording, retention and signage — understanding them helps you choose a system that is evidence-ready and aligned with GDPR and industry expectations for video surveillance.
          </p>
          <div className="grid grid-cols-1 gap-10 border-t border-white/15 pt-10 lg:grid-cols-[1fr_auto_1fr] lg:items-start lg:gap-0 lg:border-t-0 lg:pt-0">
            <div className="min-w-0 lg:pr-10">
              <h2 className="mb-6 text-left font-title text-3xl font-bold text-white sm:text-4xl">Standards &amp; compliance</h2>
              <p className="mb-4 text-left text-sm font-semibold uppercase tracking-wide text-white/55">
                CCTV &amp; surveillance alignment
              </p>
              <ul className="space-y-4">
                {[
                  "Professional installers (e.g. NSI-approved) for design and commissioning",
                  "BS EN 62676 — video surveillance systems (where applicable)",
                  "GDPR-compliant handling: signage, retention limits and lawful use",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-left text-gray-300">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-white/50" strokeWidth={2} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-gray-400">
                When you are ready to proceed, our main service pages cover{" "}
                <Link href="/services/electrical-systems" className="text-white underline decoration-white/30 underline-offset-2 hover:decoration-white">
                  CCTV systems
                </Link>{" "}
                and{" "}
                <Link href="/services/sustainability" className="text-white underline decoration-white/30 underline-offset-2 hover:decoration-white">
                  intruder alarms
                </Link>
                .
              </p>
            </div>
            <div
              className="hidden w-px shrink-0 self-stretch bg-white/15 lg:block"
              aria-hidden
            />
            <div className="min-w-0 border-t border-white/15 pt-10 lg:border-t-0 lg:pl-10 lg:pt-0">
              <h2 className="mb-6 text-left font-title text-3xl font-bold text-white sm:text-4xl">What to expect from installation</h2>
              <ul className="space-y-4">
                {[
                  "Clear scope: cameras, recording and network responsibilities",
                  "Commissioning checks and user handover",
                  "Documentation for retention, access and incident export",
                  "Training on app access and privacy obligations",
                  "Maintenance options to keep systems reliable",
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
