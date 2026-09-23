"use client"

import Image from "next/image"
import Link from "next/link"
import { ServicePageClosingSections } from "@/components/ServicePageClosingSections"
import { CustomPillButton } from "@/components/ui/CustomPillButton"
import { ServicePageHero } from "@/components/ServicePageHero"
import { Reveal } from "@/components/Reveal"
import { ServiceItemReveal } from "@/components/ServiceItemReveal"
import { serviceHeroImages } from "@/lib/serviceHeroImages"
import { ApxPartnerLogoStrip } from "@/components/ApxPartnerLogoStrip"
import { ACCESS_CONTROL_PARTNERS } from "@/lib/apx-partner-logos"
import { ServiceTechnologyProductsSection } from "@/components/ServiceTechnologyProductsSection"
import { FsServiceTextImageSection } from "@/components/FsServiceTextImageSection"
import { ServiceFeatureIconCard } from "@/components/ServiceFeatureIconCard"
import {
  FS_SERVICE_IMAGE_GROW_INNER,
  FS_SERVICE_INSTALLATION_CARD,
  FS_SERVICE_INSTALLATION_CARD_IMAGE,
} from "@/lib/fsServicePageCards"
import {
  Key,
  Clock,
  Flame,
  ShieldCheck,
  ClipboardList,
  Cpu,
  CreditCard,
  Smartphone,
  Network,
  DoorOpen,
  Building2,
  ArrowUpDown,
  Video,
  Car,
  Wrench,
  type LucideIcon,
} from "lucide-react"

const ACCESS_CONTROL_CAPABILITIES: { Icon: LucideIcon; title: string; text: string; id?: string }[] = [
  {
    Icon: CreditCard,
    title: "Fob and card access",
    text: "Proximity fobs and cards with revoke-and-replace credentials, no wholesale rekeying when something is lost.",
    id: "access-fob-card",
  },
  {
    Icon: Key,
    title: "Keypads",
    text: "PIN/keypad entry where codes suit the door and user group, alone or alongside readers.",
    id: "access-keypads",
  },
  {
    Icon: Smartphone,
    title: "Mobile credentials where offered",
    text: "Phone-based credentials on platforms that support them, specified on survey, not assumed for every system.",
    id: "access-mobile",
  },
  {
    Icon: DoorOpen,
    title: "Single-door and networked systems",
    text: "From one controlled door to multi-door networked systems with schedules, zones and central management.",
    id: "access-networked",
  },
  {
    Icon: Building2,
    title: "Multi-tenant systems",
    text: "Shared buildings and estates with tenant, landlord and visitor permissions structured clearly at handover.",
    id: "access-multi-tenant",
  },
  {
    Icon: Cpu,
    title: "Door controllers",
    text: "Controllers, readers and locks engineered as a coherent package with commissioning and user training.",
  },
  {
    Icon: Flame,
    title: "Fire alarm release interfaces",
    text: "Where the fire strategy and door design require it, we interface access control for emergency release, not every door or system uses the same fail-safe or lockdown behaviour.",
    id: "access-fire-release",
  },
  {
    Icon: ArrowUpDown,
    title: "Lift control where offered",
    text: "Floor and lift access permissions where the lift interface and building brief support them.",
    id: "access-lift",
  },
  {
    Icon: Video,
    title: "Intercom / video entry integration",
    text: "Coordinate with video door entry and intercoms so visitors and residents are managed in one workflow.",
    id: "access-video-entry",
  },
  {
    Icon: Car,
    title: "Gate, barrier and ANPR integration",
    text: "Link vehicle gates and barriers to access control, with ANPR where offered and suitable for the site.",
    id: "access-gate-anpr",
  },
  {
    Icon: Wrench,
    title: "Maintenance and system takeovers",
    text: "PPM, corrective works and takeovers of existing access systems so credentials and schedules stay manageable.",
  },
  {
    Icon: Network,
    title: "CCTV and intruder coordination",
    text: "Event-linked recording and alarm workflows with CCTV and intruder systems where the brief requires a joined-up package.",
  },
]

const ACCESS_CONTROL_BENEFITS: { Icon: LucideIcon; title: string; text: string }[] = [
  {
    Icon: Key,
    title: "Credentials instead of keys",
    text:
      "Revoke or replace a lost fob or card without rekeying every door, avoiding the cost and disruption of wholesale lock changes.",
  },
  {
    Icon: Clock,
    title: "Smarter schedules",
    text:
      "Reduce reliance on staff for manual unlock and lock-up; grant access by day, time and zone so doors match how your building actually runs.",
  },
  {
    Icon: Flame,
    title: "Emergency release where designed",
    text:
      "Fire alarm release and emergency unlock behaviour are configured only where the fire strategy, door hardware and access system support them, not a default of every installation.",
  },
  {
    Icon: ShieldCheck,
    title: "Authorised entry",
    text:
      "Credentials at controlled doors reduce unauthorised access; lost credentials can be disabled without issuing new keys to everyone.",
  },
  {
    Icon: ClipboardList,
    title: "Audit and accountability",
    text:
      "See who accessed sensitive areas and when, valuable for investigations, contractor visits and compliance reporting.",
  },
  {
    Icon: Cpu,
    title: "Networked integration",
    text:
      "On larger sites, networked systems can sit alongside CCTV, intruder alarms, video entry and gate automation on one coherent platform.",
  },
]

/** Case study imagery under /public/projects/case-studies/… */
const ACCESS_CONTROL_INSTALLATIONS: { title: string; venue: string; context: string; imageSrc: string }[] = [
  {
    title: "Access Control System Mayfair Townhouse London",
    venue: "Mayfair Townhouse",
    context: "Luxury Lifestyle Hotel",
    imageSrc:
      "/projects/case-studies/mayfair-townhouse/access-control-system-installation-mayfair-townhouse-exterior.jpg",
  },
  {
    title: "Access Control System Installation Scape Bloomsbury",
    venue: "Scape Bloomsbury",
    context: "Student Accommodation",
    imageSrc:
      "/projects/case-studies/scape-bloomsbury/access-control-system-installation-scape-bloomsbury-exterior.jpg",
  },
  {
    title: "Access Control System Installation Scape Bloomsbury",
    venue: "Scape Bloomsbury",
    context: "Student Accommodation",
    imageSrc:
      "/projects/case-studies/scape-bloomsbury/access-control-system-installation-scape-bloomsbury-library.jpg",
  },
  {
    title: "Access Control System Installation John Keats Primary School",
    venue: "John Keats Primary School",
    context: "Rotherhithe, London",
    imageSrc:
      "/projects/case-studies/john-keats-primary-school/access-control-system-installation-john-keats-primary-school-exterior.jpg",
  },
  {
    title: "Access Control System Installation John Keats Primary School",
    venue: "John Keats Primary School",
    context: "Rotherhithe, London",
    imageSrc:
      "/projects/case-studies/john-keats-primary-school/access-control-system-installation-john-keats-primary-school-classroom.jpg",
  },
  {
    title: "Access Control Systems for Ledian Farm Retirement Village",
    venue: "Ledian Farm",
    context: "Retirement Village, Kent",
    imageSrc: "/projects/case-studies/ledian-farm/access-control-system-installation-ledian-farm-exterior.jpg",
  },
  {
    title: "Access Control Systems for Ledian Farm Retirement Village",
    venue: "Ledian Farm",
    context: "Retirement Village, Kent",
    imageSrc: "/projects/case-studies/ledian-farm/access-control-system-installation-ledian-farm-reception.jpg",
  },
  {
    title: "Access Control System Installation United Living Welbourne",
    venue: "United Living Welbourne",
    context: "Apartment Block",
    imageSrc:
      "/projects/case-studies/united-living-welbourne/access-control-system-installation-united-living-welbourne.jpg",
  },
  {
    title: "Access Control System Installation Aspire Herschel Street",
    venue: "Aspire Herschel Street",
    context: "Apartment Block",
    imageSrc:
      "/fire%20alarm%20system%20installations/access-control-system-installation-aspire-herschel-street-exterior-800x533.jpg",
  },
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

/** Hero from legacy APX access control page (`public/service images/access control/`) */
const ACCESS_CONTROL_HERO_IMAGE_SRC = "/service%20images/access%20control/hero-access-control-systems.jpg"
const BESPOKE_ACCESS_CONTROL_IMAGE_SRC =
  "/service%20images/access%20control/access-control-systems-door-entry-card-sq.jpg"

export default function AccessControlPage() {
  return (
    <div className="service-page-root min-h-screen overflow-x-hidden bg-black text-white">
      <ServicePageHero
        title="Access Control Systems"
        imageSrc={ACCESS_CONTROL_HERO_IMAGE_SRC}
        imageClassName="object-cover object-right object-center"
        heroCompliance={["BS EN 60839"]}
        intro={
          <>
            <p className="mb-4">
              APX designs, installs and maintains access control for commercial, multi-tenant and residential buildings
              across London and the Home Counties, fob and card access, keypads, door controllers, single-door and
              networked systems, with video entry, gate and barrier integration where required.
            </p>
            <p>
              Building on a heritage dating back to 1986, we survey each site so credentials, schedules and interfaces
              match how the building runs. Fire alarm release, lift control, mobile credentials and ANPR are included
              only where offered and specified for the door or site, not assumed for every system.
            </p>
          </>
        }
      />

      <div className="relative bg-black">
        {heroBridge}

        <section className="container relative z-[1] mx-auto px-6 py-16 lg:py-16">
          <Reveal>
            <h2 className="mb-4 text-left font-title text-3xl font-bold text-white sm:text-4xl">
              What we deliver
            </h2>
          </Reveal>
          <Reveal delayMs={70}>
            <p className="mb-10 max-w-3xl text-left text-gray-300">
              Capabilities are matched to the brief. Emergency release and lockdown behaviour depend on fire strategy,
              door hardware and the access platform, we configure what the design requires, not a one-size-fits-all rule.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {ACCESS_CONTROL_CAPABILITIES.map(({ Icon, title, text, id }, i) => (
              <ServiceItemReveal key={title} index={i} className="h-full min-h-0">
                <ServiceFeatureIconCard
                  id={id}
                  icon={Icon}
                  title={title}
                  description={text}
                  className="transition-transform duration-300 hover:scale-[1.02]"
                />
              </ServiceItemReveal>
            ))}
          </div>
        </section>

        <div className="border-t border-white/15" />

        <section className="container relative z-[1] mx-auto px-6 py-16 lg:py-16">
          <Reveal>
            <h2 className="mb-10 text-left font-title text-3xl font-bold text-white sm:text-4xl">
              Benefits of access control
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {ACCESS_CONTROL_BENEFITS.map(({ Icon, title, text }, i) => (
              <ServiceItemReveal key={title} index={i} className="h-full min-h-0">
                <ServiceFeatureIconCard
                  icon={Icon}
                  title={title}
                  description={text}
                  className="transition-transform duration-300 hover:scale-[1.02]"
                />
              </ServiceItemReveal>
            ))}
          </div>
        </section>

        <div className="border-t border-white/15" />

        <FsServiceTextImageSection
          title="Bespoke access control systems"
          titleId="bespoke-access-control-heading"
          imageSrc={BESPOKE_ACCESS_CONTROL_IMAGE_SRC}
          imageAlt="Access control card reader at a secure door entry"
        >
          <p>
            Building on a heritage dating back to 1986, we design access control for commercial and residential clients
            across London and the Home Counties, from a single door to fully networked systems that integrate with
            intruder alarms, CCTV, video entry, gates and barriers where the brief requires it.
          </p>
          <p>
            Working alongside architects and consultants, we match readers, controllers and credentials to your
            operational needs. Mobile credentials, lift interfaces and ANPR are offered where the platform and site
            support them. Maintenance contracts and system takeovers are available so permissions stay manageable after
            handover.
          </p>
          <p>
            Complete the access control enquiry form and we will arrange a survey to discuss doors, schedules and
            integrations.
          </p>
          <div className="pt-2">
            <CustomPillButton href="/contact?service=access-control-systems" size="md">
              Access control enquiry
            </CustomPillButton>
          </div>
          <div className="mt-8 max-w-3xl border-t border-white/10 pt-8">
            <p className="text-base leading-relaxed text-gray-300">
              Installations are specified and handed over with reference to BS EN 60839 where applicable, including access
              schedules, user permissions and structured training. See also{" "}
              <Link
                href="/services/video-door-entry-systems"
                className="text-white underline decoration-white/35 underline-offset-2 hover:decoration-white"
              >
                video door entry
              </Link>
              ,{" "}
              <Link
                href="/services/gate-automation-systems"
                className="text-white underline decoration-white/35 underline-offset-2 hover:decoration-white"
              >
                gate automation
              </Link>{" "}
              and the{" "}
              <Link
                href="/services/security-systems"
                className="text-white underline decoration-white/35 underline-offset-2 hover:decoration-white"
              >
                security systems overview
              </Link>
              .
            </p>
          </div>
        </FsServiceTextImageSection>

        <ServiceTechnologyProductsSection
          title="Access Control System Products"
          description="We are proud to install access control technology from the world&apos;s leading brands"
        >
          <ApxPartnerLogoStrip partners={ACCESS_CONTROL_PARTNERS} variant="light" />
        </ServiceTechnologyProductsSection>

        <div className="border-t border-white/15" />

        <section className="container mx-auto px-6 py-16 lg:py-16">
          <Reveal>
            <h2 className="mb-4 text-left font-title text-3xl font-bold text-white sm:text-4xl">Our Access Control System Installations</h2>
          </Reveal>
          <Reveal delayMs={70}>
            <p className="mb-8 max-w-2xl text-left text-gray-300">
              Examples of the access control systems that we have installed for our customers:
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {ACCESS_CONTROL_INSTALLATIONS.map((item, index) => (
              <ServiceItemReveal key={`${item.imageSrc}-${index}`} index={index} className="h-full min-h-0">
                <article className={FS_SERVICE_INSTALLATION_CARD}>
                <div className={FS_SERVICE_INSTALLATION_CARD_IMAGE}>
                  <div className={FS_SERVICE_IMAGE_GROW_INNER}>
                  <Image
                    src={item.imageSrc}
                    alt=""
                    fill
                    className="object-cover object-center"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="mb-2 text-base font-semibold leading-snug text-white sm:text-lg">{item.title}</h3>
                  <p className="font-medium text-white/95">{item.venue}</p>
                  <p className="mt-1 text-gray-300">{item.context}</p>
                </div>
                </article>
              </ServiceItemReveal>
            ))}
          </div>
        </section>

        <ServicePageClosingSections
          serviceTitleShort="Access control"
          ctaImageSrc={serviceHeroImages.accessControl}
          ctaHeadline="Talk to us about"
          ctaHeadlineAccent="access control."
          ctaDescription="From single doors to networked multi-tenant sites, including maintenance takeovers, we design and install access systems to suit your building and operations."
        >
          <CustomPillButton href="/contact?service=access-control-systems" size="md">
            Get a free quote
          </CustomPillButton>
          <CustomPillButton href="tel:02083032280" size="md" variant="outline">
            Call 020 8303 2280
          </CustomPillButton>
        </ServicePageClosingSections>

      </div>
    </div>
  )
}
