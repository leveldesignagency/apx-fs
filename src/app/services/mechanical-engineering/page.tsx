"use client"

import { ServicePageBottomCta } from "@/components/ServicePageBottomCta"
import { OurCustomers } from "@/components/ServicePageSharedSections"
import { CustomPillButton } from "@/components/ui/CustomPillButton"
import { ServicePageHero } from "@/components/ServicePageHero"
import { serviceHeroImages } from "@/lib/serviceHeroImages"
import { Check } from "lucide-react"

const SYSTEM_TYPES = [
  "Addressable Fire Alarm Systems",
  "Conventional Fire Alarm Systems",
  "Wire-Free Fire Alarm Systems",
  "Air Sampling (sniffer) Fire Alarm Systems",
]

const FIRE_CUSTOMERS = [
  { name: "The Mayfair Townhouse", tagline: "Luxury Lifestyle Hotel" },
  { name: "Hilton DoubleTree", tagline: "Hotel Group" },
  { name: "Firmdale Hotels", tagline: "Hotel Group" },
  { name: "United Living", tagline: "Housing & Infrastructure" },
  { name: "Camden Council", tagline: "Local Authority, London" },
  { name: "University of West London", tagline: "Higher Education" },
  { name: "Scape Bloomsbury", tagline: "Student Accommodation" },
]

const FIRE_INSTALLATIONS = [
  { title: "Fire Alarm System Dimco Exhibition Building Westfield", org: "Dimco Exhibition Building, Westfield, Stratford" },
  { title: "Fire Alarm System University of West London", org: "University of West London, Higher Education" },
  { title: "Fire Alarm System Sancroft Building", org: "Sancroft Building, Office Space, London" },
  { title: "Fire Alarm System Oaklands House London", org: "Oaklands House, London, Apartment Blocks" },
  { title: "Fire Alarm System Hilton DoubleTree Kingston", org: "Hilton DoubleTree Kingston, Central London Hotel" },
  { title: "Fire Alarm System John Keats Primary School", org: "John Keats Primary School, Rotherhithe, London" },
  { title: "Fire Alarm System Mayfair Townhouse London", org: "Mayfair Townhouse, Luxury Lifestyle Hotel" },
  { title: "Fire Alarm System Scape Bloomsbury", org: "Scape Bloomsbury, Student Accommodation" },
  { title: "Fire Alarm System Wembley French School", org: "Wembley French School, International School" },
]

const FIRE_BRANDS = ["Xtralis", "Vox-Ignis", "Advanced", "Reach Wireless", "Apollo", "EMS"]

const REGULATION_QUESTIONS = [
  "Are your premises small, single-storey or open-plan?",
  "Do you have any high-risk substances on-site such as chemicals?",
  "Are there any high-risk activities on-site, such as cooking?",
  "Are there vulnerable people in the building (e.g. children, elderly, disabled)?",
  "If a fire broke out on-site it would be easily spotted straight away?",
  "Would shouting 'fire' be easily heard by all occupants of the building?",
]

const heroBridge = (
  <div
    className="pointer-events-none absolute left-0 right-0 top-0 h-28 sm:h-36"
    style={{
      background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.82) 52%, rgba(0,0,0,1) 100%)",
    }}
    aria-hidden
  />
)

export default function FireSafetySystemsPage() {
  return (
    <div className="service-page-root min-h-screen overflow-x-hidden bg-black text-white">
      <ServicePageHero
        title="Fire Alarm Systems"
        imageSrc={serviceHeroImages.fireAlarm}
        intro={
          <>
            <p className="mb-4">
              At APX we specialise in designing and installing high quality fire alarm systems for both domestic properties and commercial premises.
            </p>
            <p>
              We offer a wide range of conventional and addressable fire alarm systems. Our vast experience in the fire detection industry spans the public and industrial sector, with installations ranging from small domestic systems through to commercial premises such as schools, offices, warehouses, hotels and banks. We are fully accredited to BAFE and FIA for our customers&apos; peace of mind.
            </p>
          </>
        }
      />

      <div className="relative bg-black">
        {heroBridge}

        <section className="container relative z-[1] mx-auto max-w-4xl px-6 py-12 lg:py-16">
          <h2 className="mb-4 text-left font-title text-3xl font-bold text-white sm:text-4xl">Fire Alarm System Installer London</h2>
          <h3 className="mb-6 text-left font-title text-2xl font-semibold text-white">Bespoke Fire Alarm Systems</h3>
          <div className="space-y-4 text-lg leading-relaxed text-gray-300">
            <p>
              Established in 1986 we work throughout London and the Home Counties to install fire protection systems that combine the highest standard of fire protection equipment with high levels of customer care, at affordable prices.
            </p>
            <p>Our systems are expertly designed in accordance with NSI Gold standards, covering both the domestic and commercial market. We specialise in the following systems:</p>
          </div>
          <ul className="mt-6 list-inside list-disc space-y-2 text-gray-300">
            {SYSTEM_TYPES.map((name, i) => (
              <li key={i}>{name}</li>
            ))}
          </ul>
          <p className="mt-6 text-gray-300">
            By installing a fire alarm system which will give you an early warning of the outbreak of fire, an effective alarm can prevent a small incident becoming a total devastation.
          </p>
        </section>

        <div className="border-t border-white/15" />

        <section className="container mx-auto max-w-4xl px-6 py-12 lg:py-16">
          <h2 className="mb-8 text-left font-title text-3xl font-bold text-white sm:text-4xl">We are BAFE Accredited</h2>
          <div className="space-y-4 text-lg leading-relaxed text-gray-300">
            <p>
              BAFE (British Approvals for Fire Equipment) is an independent British organisation that publishes and maintains a national register of competent fire safety service providers. We are proud to be BAFE accredited.
            </p>
            <p>
              BAFE registration is very important for those in the UK fire safety and protection industry. Many organisations now require BAFE registration from those who install or maintain their fire safety systems, products and services. For many working in the fire and protection industry, BAFE registration is a commercial imperative.
            </p>
            <p>
              The BAFE register also brings customers together with companies they can trust, with a directory of independently audited and approved providers. If you would like to know more you can view our BAFE registration online.
            </p>
          </div>
          <p className="mt-6 font-semibold text-white">BAFE Fire Safety Register Registered Organisation 301168</p>
        </section>

        <div className="border-t border-white/15" />

        <section className="container mx-auto px-6 py-12 lg:py-16">
          <h2 className="mb-4 text-left font-title text-3xl font-bold text-white sm:text-4xl">Our Fire Alarm System Customers</h2>
          <p className="mb-8 max-w-2xl text-left text-gray-300">A small selection of some of our fire alarm system customers:</p>
          <div className="flex flex-wrap gap-6 sm:gap-8">
            {FIRE_CUSTOMERS.map((c, i) => (
              <div
                key={i}
                className="min-w-[180px] rounded-xl border border-white/20 bg-black p-6 text-left text-white"
              >
                <p className="font-semibold">{c.name}</p>
                <p className="mt-1 text-sm text-gray-300">{c.tagline}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="border-t border-white/15" />

        <section className="container mx-auto px-6 py-12 lg:py-16">
          <h2 className="mb-4 text-left font-title text-3xl font-bold text-white sm:text-4xl">Our Fire Alarm System Installations</h2>
          <p className="mb-8 max-w-2xl text-left text-gray-300">Examples of fire alarm systems that we have installed for our customers:</p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {FIRE_INSTALLATIONS.map((item, index) => (
              <div
                key={index}
                className="rounded-tl-[1.5rem] rounded-br-[1.5rem] border-2 border-white/20 bg-black p-8 text-white transition-colors hover:border-white/45"
              >
                <h3 className="mb-2 text-lg font-semibold text-white">{item.title}</h3>
                <p className="text-gray-300">{item.org}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="border-t border-white/15" />

        <section className="container mx-auto px-6 py-12 lg:py-16">
          <h2 className="mb-2 text-left font-title text-3xl font-bold text-white sm:text-4xl">Fire Alarm & Detection Systems Equipment</h2>
          <p className="mb-8 max-w-2xl text-left text-gray-300">
            We are proud to install fire alarm technology from the world&apos;s leading brands
          </p>
          <div className="flex flex-wrap items-center gap-8 sm:gap-12">
            {FIRE_BRANDS.map((name, i) => (
              <div key={i} className="rounded-lg border border-white/20 px-6 py-3 font-semibold text-white">
                {name}
              </div>
            ))}
          </div>
        </section>

        <div className="border-t border-white/15" />

        <section className="container mx-auto max-w-4xl px-6 py-12 lg:py-16">
          <h2 className="mb-6 text-left font-title text-3xl font-bold text-white sm:text-4xl">Do all businesses need a fire alarm system?</h2>
          <div className="space-y-4 text-lg leading-relaxed text-gray-300">
            <p>
              Current UK fire alarm regulations state that all business premises must have &ldquo;an appropriate fire detection system&rdquo;. This basically means that if a fire breaks out, could it easily be detected and could the people within the building easily be told about it?
            </p>
            <p>
              This doesn&apos;t mean that all business premises need a fire alarm system. Try asking yourself the following questions to demonstrate potential situations:
            </p>
          </div>
          <ul className="my-6 space-y-2 text-gray-300">
            {REGULATION_QUESTIONS.map((q, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-white/50" strokeWidth={2} />
                <span>{q}</span>
              </li>
            ))}
          </ul>
          <p className="text-gray-300">
            If your answer to one or more of these questions is &ldquo;no&rdquo; then it&apos;s likely that you do need a fire alarm system. Our free survey will help to decide the level of protection you need.
          </p>
          <div className="mt-8">
            <CustomPillButton href="/contact" size="md">
              Get a free survey
            </CustomPillButton>
          </div>
        </section>

        <OurCustomers />

        <ServicePageBottomCta
          imageSrc={serviceHeroImages.fireAlarm}
          title="Need a fire alarm system?"
          description="Contact us for a free survey and expert advice on fire detection and alarm design for your premises."
        >
          <CustomPillButton href="/contact" size="md">
            Get a free quote
          </CustomPillButton>
          <CustomPillButton href="tel:02045685986" size="md" variant="outline">
            Call 020 4568 5986
          </CustomPillButton>
        </ServicePageBottomCta>

      </div>
    </div>
  )
}
