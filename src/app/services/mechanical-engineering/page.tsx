"use client"

import Image from "next/image"
import Link from "next/link"
import { ServicePageBottomCta } from "@/components/ServicePageBottomCta"
import { ClientLogosMarqueeStrip, OurCustomers } from "@/components/ServicePageSharedSections"
import { CustomPillButton } from "@/components/ui/CustomPillButton"
import { ServicePageHero } from "@/components/ServicePageHero"
import { serviceHeroImages } from "@/lib/serviceHeroImages"
import { FS_SERVICE_SHIMMER_CARD } from "@/lib/fsServicePageCards"
import { Check } from "lucide-react"

const SYSTEM_TYPES = [
  "Addressable Fire Alarm Systems",
  "Conventional Fire Alarm Systems",
  "Wire-Free Fire Alarm Systems",
  "Air Sampling (sniffer) Fire Alarm Systems",
]

/** URL-encoded — folder in /public is `fire alarm system installations` */
const FIRE_ALARM_INSTALLATIONS_DIR = "/fire%20alarm%20system%20installations" as const

/** One card per asset in /public/fire alarm system installations/ */
const FIRE_INSTALLATIONS: { title: string; org: string; imageSrc: string }[] = [
  {
    title: "Dimco Exhibition Building, Westfield Stratford — exterior",
    org: "Fire alarm installation · exhibition / retail",
    imageSrc: `${FIRE_ALARM_INSTALLATIONS_DIR}/fire-alarm-system-dimco-exhibition-westfield-exterior-600x400.jpg`,
  },
  {
    title: "Dimco Exhibition Building, Westfield Stratford — interior",
    org: "Fire alarm installation · exhibition / retail",
    imageSrc: `${FIRE_ALARM_INSTALLATIONS_DIR}/fire-alarm-system-dimco-exhibition-westfield-interior-600x400.jpg`,
  },
  {
    title: "Hilton DoubleTree Kingston — external",
    org: "Hotel · Kingston",
    imageSrc: `${FIRE_ALARM_INSTALLATIONS_DIR}/fire-alarm-installation-hilton-doubletree-kingston-external-600x400.jpg`,
  },
  {
    title: "Hilton DoubleTree Kingston — restaurant",
    org: "Hotel · Kingston",
    imageSrc: `${FIRE_ALARM_INSTALLATIONS_DIR}/fire-alarm-installation-hilton-doubletree-kingston-restaurant-600x400.jpg`,
  },
  {
    title: "John Keats Primary School — classroom",
    org: "Rotherhithe, London",
    imageSrc: `${FIRE_ALARM_INSTALLATIONS_DIR}/fire-alarm-installation-john-keats-primary-school-classroom-600x400.jpg`,
  },
  {
    title: "John Keats Primary School — playground",
    org: "Rotherhithe, London",
    imageSrc: `${FIRE_ALARM_INSTALLATIONS_DIR}/fire-alarm-installation-john-keats-primary-school-playground-600x400.jpg`,
  },
  {
    title: "The Mayfair Townhouse — garden suite",
    org: "Luxury lifestyle hotel · Mayfair, London",
    imageSrc: `${FIRE_ALARM_INSTALLATIONS_DIR}/fire-alarm-system-mayfair-townhouse-garden-suite-600x400.jpg`,
  },
  {
    title: "The Mayfair Townhouse — London",
    org: "Luxury lifestyle hotel · Mayfair, London",
    imageSrc: `${FIRE_ALARM_INSTALLATIONS_DIR}/fire-alarm-system-mayfair-townhouse-london-600x400.jpg`,
  },
  {
    title: "Oaklands House — London",
    org: "Apartment blocks · London",
    imageSrc: `${FIRE_ALARM_INSTALLATIONS_DIR}/fire-alarm-installation-oaklands-house-london-600x400.jpg`,
  },
  {
    title: "Oaklands House — distance view",
    org: "Apartment blocks · London",
    imageSrc: `${FIRE_ALARM_INSTALLATIONS_DIR}/fire-alarm-installation-oaklands-house-london-distance-600x400.jpg`,
  },
  {
    title: "Sancroft Building — collage",
    org: "Paternoster Square, City of London",
    imageSrc: `${FIRE_ALARM_INSTALLATIONS_DIR}/fire-alarm-system-sancroft-building-collage-600x400.jpg`,
  },
  {
    title: "Sancroft Building — exterior",
    org: "Paternoster Square, City of London",
    imageSrc: `${FIRE_ALARM_INSTALLATIONS_DIR}/fire-alarm-system-sancroft-building-exterior-600x400.jpg`,
  },
  {
    title: "Sancroft Building — interior",
    org: "Paternoster Square, City of London",
    imageSrc: `${FIRE_ALARM_INSTALLATIONS_DIR}/fire-alarm-system-sancroft-building-interior-600x400.jpg`,
  },
  {
    title: "Sancroft Building — restrooms",
    org: "Paternoster Square, City of London",
    imageSrc: `${FIRE_ALARM_INSTALLATIONS_DIR}/fire-alarm-system-sancroft-building-restrooms-600x400.jpg`,
  },
  {
    title: "Scape Bloomsbury — exterior",
    org: "Student accommodation · Bloomsbury, London",
    imageSrc: `${FIRE_ALARM_INSTALLATIONS_DIR}/fire-alarm-system-installation-scape-bloomsbury-exterior-600x400.jpg`,
  },
  {
    title: "Scape Bloomsbury — lounge",
    org: "Student accommodation · Bloomsbury, London",
    imageSrc: `${FIRE_ALARM_INSTALLATIONS_DIR}/fire-alarm-system-installation-scape-bloomsbury-lounge-600x400.jpg`,
  },
  {
    title: "University of West London — exterior",
    org: "Higher education · West London",
    imageSrc: `${FIRE_ALARM_INSTALLATIONS_DIR}/fire-alarm-installation-university-of-west-london-exterior-600x400.jpg`,
  },
  {
    title: "University of West London — reception",
    org: "Higher education · West London",
    imageSrc: `${FIRE_ALARM_INSTALLATIONS_DIR}/fire-alarm-installation-university-of-west-london-reception-600x400.jpg`,
  },
  {
    title: "Wembley French School — exterior",
    org: "International school · Wembley, London",
    imageSrc: `${FIRE_ALARM_INSTALLATIONS_DIR}/fire-alarm-installation-wembley-french-school-exterior-600x400.jpg`,
  },
  {
    title: "Wembley French School — interior",
    org: "International school · Wembley, London",
    imageSrc: `${FIRE_ALARM_INSTALLATIONS_DIR}/fire-alarm-installation-wembley-french-school-interior-600x400.jpg`,
  },
  {
    title: "Aspire Herschel Street — exterior",
    org: "Apartment block · Slough, Berkshire",
    imageSrc: `${FIRE_ALARM_INSTALLATIONS_DIR}/access-control-system-installation-aspire-herschel-street-exterior-800x533.jpg`,
  },
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
        heroCompliance={["BS 5839-1", "BS 5839-6"]}
        intro={
          <>
            <p className="mb-4">
              APX Fire and Security delivers fully compliant fire alarm installations across commercial, industrial, and public-sector environments. Our engineers are trained
              in both addressable and conventional systems, ensuring accurate installation, configuration, and commissioning.
            </p>
            <p>
              We also design and install high quality systems for domestic properties. Our experience spans the public and industrial sectors — from small domestic systems
              through to schools, offices, warehouses, hotels and banks. We are fully accredited to BAFE and FIA for our customers&apos; peace of mind.
            </p>
          </>
        }
      />

      <div className="relative bg-black">
        {heroBridge}

        <section className="container relative z-[1] mx-auto px-6 py-8 lg:py-10">
          <h2 className="mb-4 text-left font-title text-3xl font-bold text-white sm:text-4xl">Fire Alarm System Installer London</h2>
          <h3 className="mb-6 text-left font-title text-2xl font-semibold text-white">Bespoke Fire Alarm Systems</h3>
          <div className="max-w-7xl space-y-4 text-base leading-relaxed text-gray-300 sm:text-lg">
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

        <section className="container mx-auto px-6 py-12 lg:py-16">
          <h2 className="mb-4 text-left font-title text-3xl font-bold text-white sm:text-4xl">Compliance, certification &amp; handover</h2>
          <p className="mb-8 max-w-3xl text-left text-gray-300">
            Our fire alarm installations are delivered against recognised UK standards with clear records for approval, handover and audit. Typical deliverables include as-built drawings, zone charts, commissioning certificates and O&amp;M manuals — aligned with BS 5839-1 and BS 5839-6 where domestic or mixed-use elements apply.
          </p>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div>
              <h3 className="mb-4 text-xl font-semibold text-white">Typical scope</h3>
              <p className="mb-3 text-left text-sm font-semibold uppercase tracking-wide text-white/55">
                Design, install &amp; commission
              </p>
              <ul className="space-y-2 list-inside list-disc text-gray-300">
                <li>Addressable and conventional fire alarm systems</li>
                <li>Cause-and-effect programming and witnessed testing</li>
                <li>Fire detection devices (smoke, heat, multi-sensor)</li>
                <li>Manual call points, sounders and VADs</li>
                <li>Integration with EVAC, access control and BMS where specified</li>
                <li>Networked fire alarm systems and phased handover support</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-xl font-semibold text-white">Standards reference</h3>
              <p className="mb-3 text-left text-sm font-semibold uppercase tracking-wide text-white/55">
                Fire detection &amp; BS 5839
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-white/50" strokeWidth={2} />
                  <span>BS 5839-1 — Fire detection and fire alarm systems for buildings (non-domestic)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-white/50" strokeWidth={2} />
                  <span>BS 5839-6 — Where domestic or dwelling-related elements apply</span>
                </li>
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-gray-400">
                Dedicated refuge and disabled communication (BS 5839-9) and voice evacuation (BS 5839-8) scopes are covered on their own service pages — see{" "}
                <Link href="/services/refuge-disabled-communication" className="text-white underline decoration-white/30 underline-offset-2 hover:decoration-white">
                  refuge &amp; disabled communication
                </Link>{" "}
                and{" "}
                <Link href="/services/evac-voice-evacuation" className="text-white underline decoration-white/30 underline-offset-2 hover:decoration-white">
                  EVAC &amp; voice evacuation
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <div className="border-t border-white/15" />

        <section className="container mx-auto px-6 py-12 lg:py-16">
          <h2 className="mb-8 text-left font-title text-3xl font-bold text-white sm:text-4xl">We are BAFE Accredited</h2>
          <div className="max-w-7xl space-y-4 text-base leading-relaxed text-gray-300 sm:text-lg">
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
          <ClientLogosMarqueeStrip />
        </section>

        <div className="border-t border-white/15" />

        <section className="container mx-auto px-6 py-12 lg:py-16">
          <h2 className="mb-4 text-left font-title text-3xl font-bold text-white sm:text-4xl">Our Fire Alarm System Installations</h2>
          <p className="mb-8 max-w-2xl text-left text-gray-300">Examples of fire alarm systems that we have installed for our customers:</p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {FIRE_INSTALLATIONS.map((item, index) => (
              <article key={index} className={`${FS_SERVICE_SHIMMER_CARD} overflow-hidden p-0`}>
                <div className="relative aspect-[4/3] w-full bg-white/5">
                  <Image
                    src={item.imageSrc}
                    alt=""
                    fill
                    className="object-cover object-center"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="mb-2 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="text-gray-300">{item.org}</p>
                </div>
              </article>
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

        <section className="container mx-auto px-6 py-12 lg:py-16">
          <h2 className="mb-6 text-left font-title text-3xl font-bold text-white sm:text-4xl">Do all businesses need a fire alarm system?</h2>
          <div className="max-w-7xl space-y-4 text-base leading-relaxed text-gray-300 sm:text-lg">
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

        <OurCustomers serviceTitleShort="Fire alarm" />

        <ServicePageBottomCta
          imageSrc={serviceHeroImages.fireAlarm}
          title="Need a fire alarm system?"
          description="Contact us for a free survey and expert advice on fire detection and alarm design for your premises."
        >
          <CustomPillButton href="/contact" size="md">
            Get a free quote
          </CustomPillButton>
          <CustomPillButton href="tel:02083032280" size="md" variant="outline">
            Call 020 8303 2280
          </CustomPillButton>
        </ServicePageBottomCta>

      </div>
    </div>
  )
}
