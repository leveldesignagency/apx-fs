"use client"

import Image from "next/image"
import Link from "next/link"
import { ServicePageClosingSections } from "@/components/ServicePageClosingSections"
import { CustomPillButton } from "@/components/ui/CustomPillButton"
import { CallPhoneCta } from "@/components/ui/CallPhoneCta"
import { ServicePageHero } from "@/components/ServicePageHero"
import { FsFireSubpageHeroButtons } from "@/components/FsFireSubpageHeroButtons"
import { Reveal } from "@/components/Reveal"
import { ServiceItemReveal } from "@/components/ServiceItemReveal"
import { ServiceInstallationsGrid } from "@/components/ServiceInstallationsGrid"
import { ServiceFeatureImageCard } from "@/components/ServiceFeatureImageCard"
import { FsServiceTextImageSection } from "@/components/FsServiceTextImageSection"
import { FsServiceTextImageSectionGroup } from "@/components/FsServiceTextImageSectionGroup"
import { ApxPartnerLogoStrip } from "@/components/ApxPartnerLogoStrip"
import { FIRE_ALARM_EQUIPMENT_PARTNERS } from "@/lib/apx-partner-logos"
import { ServiceComplianceSection } from "@/components/ServiceComplianceSection"
import { ServiceTechnologyProductsSection } from "@/components/ServiceTechnologyProductsSection"
import {
  FS_SERVICE_IMAGE_GROW_INNER,
  FS_SERVICE_INSTALLATION_CARD,
  FS_SERVICE_INSTALLATION_CARD_IMAGE,
} from "@/lib/fsServicePageCards"
import { Check } from "lucide-react"
import { SERVICE_HERO_BRIDGE_GRADIENT } from "@/lib/heroBackgroundGradients"

const IMG = "/service%20images/fire-alarm-capabilities"

const CAPABILITIES = [
  {
    title: "Design, installation and commissioning",
    description:
      "Survey-led design, installation and commissioning of fire detection and alarm systems for commercial and public-sector buildings across London and the Home Counties.",
    id: "fire-design",
    imageSrc: `${IMG}/design.jpg`,
    imageAlt: "Hotel restaurant at Hilton DoubleTree Kingston with an APX fire alarm installation",
  },
  {
    title: "Cause-and-effect testing",
    description:
      "Witnessed cause-and-effect testing of call points, detectors, sounders and interfaces against the fire strategy and agreed acceptance criteria.",
    id: "fire-cause-effect",
    imageSrc: `${IMG}/cause-effect.jpg`,
    imageAlt: "Red manual call point and fire-action sign on a concrete wall",
  },
  {
    title: "Addressable and conventional systems",
    description:
      "Addressable and conventional fire alarm systems specified to the building, occupancy and fire risk assessment, including detectors, call points and sounders.",
    id: "fire-addressable",
    imageSrc: `${IMG}/detectors.jpg`,
    imageAlt: "Ceiling-mounted smoke detector on a fire detection and alarm system",
  },
  {
    title: "Networked fire alarm systems",
    description:
      "Networked panels and loops for multi-building and multi-storey sites, with clear zoning so operators can locate and manage events quickly.",
    id: "fire-networked",
    imageSrc: `${IMG}/networked.jpg`,
    imageAlt: "Sancroft Building interior, City of London, prepared for networked fire detection",
  },
  {
    title: "Wireless and wire-free systems",
    description:
      "Wireless and wire-free fire alarm options where cabling is constrained, specified on survey and commissioned to the same handover standard as wired systems.",
    id: "fire-wireless",
    imageSrc: `${IMG}/wireless.jpg`,
    imageAlt: "Occupied lounge with a ceiling fire detector at Scape Bloomsbury student accommodation",
  },
  {
    title: "Aspirating air sampling detection",
    description:
      "Aspirating (air sampling) detection for high-value, high-airflow or early-warning applications, designed into the fire alarm package where the risk requires it.",
    id: "fire-aspirating",
    imageSrc: `${IMG}/aspirating.jpg`,
    imageAlt: "Exposed ceiling services and fire exit signage in a commercial building",
  },
  {
    title: "BMS, access and smoke-control interfaces",
    description:
      "Interfaces to BMS, access control, smoke control and other plant so doors, dampers and related systems follow the agreed fire cause-and-effect.",
    id: "fire-interfaces",
    imageSrc: `${IMG}/interfaces.jpg`,
    imageAlt: "Zoned fire protection pipework and valves interfaced to building fire systems",
  },
  {
    title: "Maintenance and emergency call-outs",
    description:
      "Planned preventative maintenance, battery and device replacement, and emergency call-outs so fire alarm systems remain available after handover.",
    id: "fire-maintenance",
    imageSrc: `${IMG}/maintenance.jpg`,
    imageAlt: "Engineer testing control gear with a multimeter during a maintenance visit",
  },
  {
    title: "Zone charts and O&M documentation",
    description:
      "Zone charts, as-built drawings, commissioning certificates and O&M packs aligned with BS 5839-1 for approval, handover and ongoing audit.",
    id: "fire-documentation",
    imageSrc: `${IMG}/documentation.jpg`,
    imageAlt: "Engineers reviewing building drawings and handover documentation",
  },
] as const

const SCOPE_CAPABILITIES = [
  "Addressable and conventional fire alarm systems",
  "Design, installation, commissioning and cause-and-effect testing",
  "Networked and wireless / wire-free systems",
  "Aspirating (air sampling) detection",
  "Interfaces with BMS, access control and smoke control",
  "Maintenance, emergency call-outs, zone charts and O&M packs",
]

/** URL-encoded, folder in /public is `fire alarm system installations` */
const FIRE_ALARM_INSTALLATIONS_DIR = "/fire%20alarm%20system%20installations" as const

/** One card per asset in /public/fire alarm system installations/ */
const FIRE_INSTALLATIONS: { title: string; org: string; imageSrc: string }[] = [
  {
    title: "Dimco Exhibition Building, Westfield Stratford, exterior",
    org: "Fire alarm installation · exhibition / retail",
    imageSrc: `${FIRE_ALARM_INSTALLATIONS_DIR}/fire-alarm-system-dimco-exhibition-westfield-exterior-600x400.jpg`,
  },
  {
    title: "Dimco Exhibition Building, Westfield Stratford, interior",
    org: "Fire alarm installation · exhibition / retail",
    imageSrc: `${FIRE_ALARM_INSTALLATIONS_DIR}/fire-alarm-system-dimco-exhibition-westfield-interior-600x400.jpg`,
  },
  {
    title: "Hilton DoubleTree Kingston, external",
    org: "Hotel · Kingston",
    imageSrc: `${FIRE_ALARM_INSTALLATIONS_DIR}/fire-alarm-installation-hilton-doubletree-kingston-external-600x400.jpg`,
  },
  {
    title: "Hilton DoubleTree Kingston, restaurant",
    org: "Hotel · Kingston",
    imageSrc: `${FIRE_ALARM_INSTALLATIONS_DIR}/fire-alarm-installation-hilton-doubletree-kingston-restaurant-600x400.jpg`,
  },
  {
    title: "John Keats Primary School, classroom",
    org: "Rotherhithe, London",
    imageSrc: `${FIRE_ALARM_INSTALLATIONS_DIR}/fire-alarm-installation-john-keats-primary-school-classroom-600x400.jpg`,
  },
  {
    title: "John Keats Primary School, playground",
    org: "Rotherhithe, London",
    imageSrc: `${FIRE_ALARM_INSTALLATIONS_DIR}/fire-alarm-installation-john-keats-primary-school-playground-600x400.jpg`,
  },
  {
    title: "The Mayfair Townhouse, garden suite",
    org: "Luxury lifestyle hotel · Mayfair, London",
    imageSrc: `${FIRE_ALARM_INSTALLATIONS_DIR}/fire-alarm-system-mayfair-townhouse-garden-suite-600x400.jpg`,
  },
  {
    title: "The Mayfair Townhouse, London",
    org: "Luxury lifestyle hotel · Mayfair, London",
    imageSrc: `${FIRE_ALARM_INSTALLATIONS_DIR}/fire-alarm-system-mayfair-townhouse-london-600x400.jpg`,
  },
  {
    title: "Oaklands House, London",
    org: "Apartment blocks · London",
    imageSrc: `${FIRE_ALARM_INSTALLATIONS_DIR}/fire-alarm-installation-oaklands-house-london-600x400.jpg`,
  },
  {
    title: "Oaklands House, distance view",
    org: "Apartment blocks · London",
    imageSrc: `${FIRE_ALARM_INSTALLATIONS_DIR}/fire-alarm-installation-oaklands-house-london-distance-600x400.jpg`,
  },
  {
    title: "Sancroft Building, collage",
    org: "Paternoster Square, City of London",
    imageSrc: `${FIRE_ALARM_INSTALLATIONS_DIR}/fire-alarm-system-sancroft-building-collage-600x400.jpg`,
  },
  {
    title: "Sancroft Building, exterior",
    org: "Paternoster Square, City of London",
    imageSrc: `${FIRE_ALARM_INSTALLATIONS_DIR}/fire-alarm-system-sancroft-building-exterior-600x400.jpg`,
  },
  {
    title: "Sancroft Building, interior",
    org: "Paternoster Square, City of London",
    imageSrc: `${FIRE_ALARM_INSTALLATIONS_DIR}/fire-alarm-system-sancroft-building-interior-600x400.jpg`,
  },
  {
    title: "Sancroft Building, restrooms",
    org: "Paternoster Square, City of London",
    imageSrc: `${FIRE_ALARM_INSTALLATIONS_DIR}/fire-alarm-system-sancroft-building-restrooms-600x400.jpg`,
  },
  {
    title: "Scape Bloomsbury, exterior",
    org: "Student accommodation · Bloomsbury, London",
    imageSrc: `${FIRE_ALARM_INSTALLATIONS_DIR}/fire-alarm-system-installation-scape-bloomsbury-exterior-600x400.jpg`,
  },
  {
    title: "Scape Bloomsbury, lounge",
    org: "Student accommodation · Bloomsbury, London",
    imageSrc: `${FIRE_ALARM_INSTALLATIONS_DIR}/fire-alarm-system-installation-scape-bloomsbury-lounge-600x400.jpg`,
  },
  {
    title: "University of West London, exterior",
    org: "Higher education · West London",
    imageSrc: `${FIRE_ALARM_INSTALLATIONS_DIR}/fire-alarm-installation-university-of-west-london-exterior-600x400.jpg`,
  },
  {
    title: "University of West London, reception",
    org: "Higher education · West London",
    imageSrc: `${FIRE_ALARM_INSTALLATIONS_DIR}/fire-alarm-installation-university-of-west-london-reception-600x400.jpg`,
  },
  {
    title: "Wembley French School, exterior",
    org: "International school · Wembley, London",
    imageSrc: `${FIRE_ALARM_INSTALLATIONS_DIR}/fire-alarm-installation-wembley-french-school-exterior-600x400.jpg`,
  },
  {
    title: "Wembley French School, interior",
    org: "International school · Wembley, London",
    imageSrc: `${FIRE_ALARM_INSTALLATIONS_DIR}/fire-alarm-installation-wembley-french-school-interior-600x400.jpg`,
  },
]

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
      background: SERVICE_HERO_BRIDGE_GRADIENT,
    }}
    aria-hidden
  />
)

/** Commercial office floor with ceiling detectors (Sancroft). */
const FIRE_ALARM_HERO_IMAGE_SRC =
  "/service%20images/fire%20alarm%20systems/hero-commercial-fire-alarm.jpg"

/** Exit sign + smoke detector for the installer / systems section. */
const FIRE_ALARM_BODY_IMAGE_SRC =
  "/client%20logos/service%20pages%20image/home-fire-alarm-system-installer-800x533.jpg"

/** Emergency exit / warning cue for the “do you need a system?” section. */
const FIRE_ALARM_REGULATION_IMAGE_SRC =
  "/service%20images/fire%20alarm%20systems/green-emergency-exit-sign-ceiling%20hero%20image.jpg"

/** Commercial project backdrop for BAFE strip (kept sharp, no artificial blur). */
const FIRE_ALARM_BAFE_IMAGE_SRC =
  `${FIRE_ALARM_INSTALLATIONS_DIR}/fire-alarm-system-sancroft-building-interior-600x400.jpg`

export default function FireSafetySystemsPage() {
  return (
    <div className="service-page-root min-h-screen overflow-x-hidden bg-black text-white">
      <ServicePageHero
        title="Fire Alarm Systems"
        imageSrc={FIRE_ALARM_HERO_IMAGE_SRC}
        imageAlt="Commercial office floor with ceiling-mounted fire detectors"
        imageClassName="object-cover object-[center_top]"
        heroCompliance={["BS 5839-1"]}
        heroSummary="Design, installation and maintenance of addressable and conventional fire alarms for commercial and public-sector sites across London and the Home Counties."
        afterIntro={<FsFireSubpageHeroButtons />}
        intro={
          <>
            <p className="mb-4">
              APX Fire &amp; Security delivers fire alarm installations across commercial, industrial and public-sector
              environments. Our engineers are trained in addressable and conventional systems, ensuring accurate
              installation, configuration and commissioning.
            </p>
            <p>
              Our experience spans schools, offices, warehouses, hotels and banks across London and the Home Counties.
              We are BAFE-certified and a Full Member of the FIA, with NSI Gold approval for fire systems.
            </p>
          </>
        }
      />

      <div className="relative bg-[var(--page-bg)]">
        {heroBridge}

        <div className="relative z-[1] border-t border-white/15" aria-hidden />

        <section className="site-container relative z-[1] py-16 lg:py-16">
          <Reveal>
            <h2 className="mb-4 text-left font-title text-3xl font-bold text-white sm:text-4xl">
              Fire alarm capabilities
            </h2>
          </Reveal>
          <Reveal delayMs={70}>
            <p className="mb-10 max-w-3xl text-left text-gray-300">
              Design, installation, commissioning and maintenance of fire detection and alarm systems to BS 5839-1,
              from addressable and conventional panels through to networked, wireless and aspirating detection, with
              clear cause-and-effect records at handover.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map(({ title, description, id, imageSrc, imageAlt }, index) => (
              <ServiceItemReveal key={title} index={index} className="h-full min-h-0">
                <ServiceFeatureImageCard
                  id={id}
                  title={title}
                  description={description}
                  imageSrc={imageSrc}
                  imageAlt={imageAlt}
                  className="transition-transform duration-300 hover:scale-[1.02]"
                />
              </ServiceItemReveal>
            ))}
          </div>
        </section>

        <div className="border-t border-white/15" />

        <FsServiceTextImageSectionGroup>
        <FsServiceTextImageSection
          title="Fire Alarm System Installer London"
          titleId="fire-alarm-installer-london-heading"
          imageSrc={FIRE_ALARM_BODY_IMAGE_SRC}
          imageAlt="Smoke detector and emergency exit sign on a fire detection and warning system"
        >
          <h3 className="font-title text-2xl font-semibold text-white">Bespoke Fire Alarm Systems</h3>
          <p>
            Building on a heritage dating back to 1986, we work throughout London and the Home Counties to install fire
            protection systems that combine high-quality detection equipment with clear documentation and dependable
            aftercare.
          </p>
          <p>
            Systems are designed and delivered to NSI Gold standards for fire, with commercial and public-sector work as
            our primary focus, addressable and conventional detection, networked and wireless options, aspirating
            systems, plant interfaces, and maintenance after handover.
          </p>
          <p>
            By installing a fire alarm system which will give you an early warning of the outbreak of fire, an effective
            alarm can prevent a small incident becoming a total devastation.
          </p>
        </FsServiceTextImageSection>

        <div className="border-t border-white/15" />

        <FsServiceTextImageSection
          title="Do all businesses need a fire alarm system?"
          titleId="fire-alarm-regulation-heading"
          imageSrc={FIRE_ALARM_REGULATION_IMAGE_SRC}
          imageAlt="Illuminated emergency exit sign for fire warning and evacuation"
        >
          <p>
            UK fire safety law requires suitable fire detection and warning arrangements for the premises, determined by
            a fire risk assessment, not by a one-size-fits-all rule that every business must have a full fire alarm panel.
            In simple terms: if a fire broke out, could it be detected quickly, and could people in the building be warned?
          </p>
          <p>
            That does not mean every premises needs the same system. The questions below are general prompts only; a
            competent fire-safety person should confirm what your site requires before you rely on this guidance:
          </p>
          <ul className="my-2 space-y-2 text-gray-300">
            {REGULATION_QUESTIONS.map((q, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-white/50" strokeWidth={2} />
                <span>{q}</span>
              </li>
            ))}
          </ul>
          <p>
            If your answer to one or more of these questions is &ldquo;no&rdquo;, a surveyed fire detection and warning
            system is often appropriate. The level of protection required is defined by a fire risk assessment (carried
            out by others). Once that assessment is in place, our free survey helps design and specify a system that
            meets those requirements for your building.
          </p>
          <div className="pt-2">
            <CustomPillButton href="/contact" size="md">
              Get a free survey
            </CustomPillButton>
          </div>
        </FsServiceTextImageSection>

        <ServiceComplianceSection
          sectionTitle="Compliance, certification & handover"
          intro="Fire alarm installations are delivered against recognised UK standards with clear records for approval, handover and audit. Typical deliverables include as-built drawings, zone charts, commissioning certificates and O&M manuals, aligned with BS 5839-1 for non-domestic buildings."
          leftTitle="Typical scope"
          leftEyebrow="Design, install & commission"
          standardsItems={SCOPE_CAPABILITIES}
          rightTitle="Standards reference"
          rightEyebrow="Fire detection & BS 5839"
          deliverablesItems={[
            "BS 5839-1, Fire detection and fire alarm systems for buildings (non-domestic)",
          ]}
          rightFooterNote={
            <>
              Where your project also needs{" "}
              <Link href="/services/refuge-disabled-communication" className="text-black underline decoration-black/30 underline-offset-2 hover:decoration-black">
                disabled refuge, fire telephone &amp; toilet alarms
              </Link>{" "}
              (BS 5839-9),{" "}
              <Link href="/services/pava" className="text-black underline decoration-black/30 underline-offset-2 hover:decoration-black">
                PAVA
              </Link>{" "}
              voice alarm (BS 5839-8) or{" "}
              <Link href="/services/evac" className="text-black underline decoration-black/30 underline-offset-2 hover:decoration-black">
                EVAC
              </Link>{" "}
              (BS 8629), we design and install those systems as part of the wider life-safety package.
            </>
          }
        />

        <FsServiceTextImageSection
          title="BAFE Registered"
          titleId="bafe-registered-heading"
          variant="light"
          imageSrc={FIRE_ALARM_BAFE_IMAGE_SRC}
          imageAlt="Commercial interior prepared for fire detection and alarm installation"
          imageClassName="object-cover object-center brightness-[0.72]"
          imageOverlaySrc="/accreditations%20mono/Coloured/BAFE-01.svg"
          imageOverlayAlt="BAFE Fire Safety Register"
          imageOverlayClassName="max-w-[min(21rem,78%)]"
        >
          <p>
            BAFE (British Approvals for Fire Equipment) is the independent registration body for third-party certificated
            fire safety organisations. It is not itself a UKAS-accredited certification body, licensed UKAS-accredited
            certification bodies audit companies against BAFE schemes, and BAFE lists providers on its Fire Safety Register
            while that certification remains valid.
          </p>
          <p>
            We are BAFE Registered for the fire safety services shown against our listing. Many clients and insurers
            expect BAFE registration from companies that install or maintain fire detection and alarm systems.
          </p>
          <p>
            Verify our listing on the BAFE Fire Safety Register, Registered Organisation 301168.
          </p>
          <p className="font-semibold text-black">
            <a
              href="https://www.bafe.org.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-black/30 underline-offset-2 hover:decoration-black"
            >
              BAFE Fire Safety Register (bafe.org.uk)
            </a>
          </p>
        </FsServiceTextImageSection>
        </FsServiceTextImageSectionGroup>

        <ServiceTechnologyProductsSection
          title="Fire Alarm & Detection Systems Equipment"
          description="We are proud to install fire alarm technology from the world&apos;s leading brands"
        >
          <ApxPartnerLogoStrip partners={FIRE_ALARM_EQUIPMENT_PARTNERS} variant="light" />
        </ServiceTechnologyProductsSection>

        <div className="border-t border-white/15" />

        <section className="site-container py-16 lg:py-16">
          <Reveal>
            <h2 className="mb-4 text-left font-title text-3xl font-bold text-white sm:text-4xl">Our Fire Alarm System Installations</h2>
          </Reveal>
          <Reveal delayMs={70}>
            <p className="mb-8 max-w-2xl text-left text-gray-300">Examples of fire alarm systems that we have installed for our customers:</p>
          </Reveal>
          <ServiceInstallationsGrid
            count={FIRE_INSTALLATIONS.length}
            ctaHref="/contact?service=fire-alarm-systems"
          >
            {FIRE_INSTALLATIONS.map((item, index) => (
              <ServiceItemReveal key={index} index={index} className="h-full min-h-0">
                <article className={FS_SERVICE_INSTALLATION_CARD}>
                <div className={FS_SERVICE_INSTALLATION_CARD_IMAGE}>
                  <div className={FS_SERVICE_IMAGE_GROW_INNER}>
                  <Image
                    src={item.imageSrc}
                    alt=""
                    fill
                    className="object-cover object-center"
                    sizes="(min-width: 768px) 22.5rem, 100vw"
                  />
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="mb-2 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="text-gray-300">{item.org}</p>
                </div>
                </article>
              </ServiceItemReveal>
            ))}
          </ServiceInstallationsGrid>
        </section>

        <ServicePageClosingSections
          serviceTitleShort="Fire alarm"
          ctaImageSrc={FIRE_ALARM_HERO_IMAGE_SRC}
          ctaHeadline="Need a Fire"
          ctaHeadlineAccent="Alarm System?"
          ctaDescription="Contact us for a free survey and expert advice on fire detection and alarm design for your premises."
        >
          <CustomPillButton href="/contact" size="md">
            Get a free quote
          </CustomPillButton>
          <CallPhoneCta size="md" />
        </ServicePageClosingSections>

      </div>
    </div>
  )
}
