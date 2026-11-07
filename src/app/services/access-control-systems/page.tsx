"use client"

import Link from "next/link"
import {
  CalendarClock,
  ClipboardList,
  KeyRound,
  Network,
  ShieldCheck,
  Siren,
  type LucideIcon,
} from "lucide-react"
import { ServicePageClosingSections } from "@/components/ServicePageClosingSections"
import { CustomPillButton } from "@/components/ui/CustomPillButton"
import { CallPhoneCta } from "@/components/ui/CallPhoneCta"
import { ServicePageHero } from "@/components/ServicePageHero"
import { Reveal } from "@/components/Reveal"
import { ServiceItemReveal } from "@/components/ServiceItemReveal"
import { ServiceInstallationsGrid } from "@/components/ServiceInstallationsGrid"
import { ServiceInstallationCard } from "@/components/ServiceInstallationCard"
import { serviceHeroImages } from "@/lib/serviceHeroImages"
import { ApxPartnerLogoStrip } from "@/components/ApxPartnerLogoStrip"
import { ACCESS_CONTROL_PARTNERS } from "@/lib/apx-partner-logos"
import { ServiceTechnologyProductsSection } from "@/components/ServiceTechnologyProductsSection"
import { FsServiceTextImageSection } from "@/components/FsServiceTextImageSection"
import { ServiceFeatureImageCard } from "@/components/ServiceFeatureImageCard"
import { SERVICE_HERO_BRIDGE_GRADIENT } from "@/lib/heroBackgroundGradients"
import { toTitleCase } from "@/lib/titleCase"

const IMG = "/service%20images/access-capabilities"

const ACCESS_CONTROL_CAPABILITIES: {
  title: string
  text: string
  imageSrc: string
  imageAlt: string
  id?: string
}[] = [
  {
    title: "Fob and card access",
    text: "Proximity fobs and cards with revoke-and-replace credentials, no wholesale rekeying when something is lost.",
    id: "access-fob-card",
    imageSrc: `${IMG}/fob-card-assa.jpg`,
    imageAlt: "Hand presenting a proximity access card to a wall-mounted reader",
  },
  {
    title: "Keypads",
    text: "PIN/keypad entry where codes suit the door and user group, alone or alongside readers.",
    id: "access-keypads",
    imageSrc: `${IMG}/keypads-tdsi-dual-tech.jpg`,
    imageAlt: "TDSi Dual-Tech access control keypad with PIN entry",
  },
  {
    title: "Mobile credentials where offered",
    text: "Phone-based credentials on platforms that support them, specified on survey, not assumed for every system.",
    id: "access-mobile",
    imageSrc: `${IMG}/mobile-assa.jpg`,
    imageAlt: "Smartphone used as a mobile credential at a commercial door",
  },
  {
    title: "Single-door and networked systems",
    text: "From one controlled door to multi-door networked systems with schedules, zones and central management.",
    id: "access-networked",
    imageSrc: `${IMG}/networked.jpg`,
    imageAlt: "Secure commercial door lock and handle",
  },
  {
    title: "Multi-tenant systems",
    text: "Shared buildings and estates with tenant, landlord and visitor permissions structured clearly at handover.",
    id: "access-multi-tenant",
    imageSrc: `${IMG}/multi-tenant.jpg`,
    imageAlt: "Modern apartment block with shared entrances",
  },
  {
    title: "Door controllers",
    text: "Controllers, readers and locks engineered as a coherent package with commissioning and user training.",
    id: "access-controllers",
    imageSrc: `${IMG}/controllers-door-reader.jpg`,
    imageAlt: "Access control proximity reader on a commercial corridor door",
  },
  {
    title: "Fire alarm release interfaces",
    text: "Where the fire strategy and door design require it, we interface access control for emergency release, not every door or system uses the same fail-safe or lockdown behaviour.",
    id: "access-fire-release",
    imageSrc: `${IMG}/fire-release-edr-beside-fire-door.jpg`,
    imageAlt: "Emergency door release and press-to-exit beside a fire door with vision panel",
  },
  {
    title: "Lift control where offered",
    text: "Floor and lift access permissions where the lift interface and building brief support them.",
    id: "access-lift",
    imageSrc: `${IMG}/lift.jpg`,
    imageAlt: "Multi-storey commercial building with lift access control",
  },
  {
    title: "Intercom / video entry integration",
    text: "Coordinate with video door entry and intercoms so visitors and residents are managed in one workflow.",
    id: "access-video-entry",
    imageSrc: `${IMG}/video-entry.jpg`,
    imageAlt: "Video door entry panel with camera, keypad and call buttons",
  },
  {
    title: "Gate, barrier and ANPR integration",
    text: "Link vehicle gates and barriers to access control, with ANPR where offered and suitable for the site.",
    id: "access-gate-anpr",
    imageSrc: `${IMG}/gate-anpr.jpg`,
    imageAlt: "Vehicle roadway coverage used for ANPR and barrier control",
  },
  {
    title: "Maintenance and system takeovers",
    text: "PPM, corrective works and takeovers of existing access systems so credentials and schedules stay manageable.",
    id: "access-maintenance",
    imageSrc: `${IMG}/maintenance.jpg`,
    imageAlt: "Engineer diagnosing access-control hardware with a multimeter",
  },
  {
    title: "CCTV and intruder coordination",
    text: "Event-linked recording and alarm workflows with CCTV and intruder systems where the brief requires a joined-up package.",
    id: "access-cctv-intruder",
    imageSrc: `${IMG}/cctv-intruder.jpg`,
    imageAlt: "IP turret camera used for event-linked recording with access control",
  },
]

const ACCESS_CONTROL_BENEFITS: { Icon: LucideIcon; title: string; text: string }[] = [
  {
    Icon: KeyRound,
    title: "Credentials instead of keys",
    text: "Revoke or replace a lost fob or card without rekeying every door.",
  },
  {
    Icon: CalendarClock,
    title: "Smarter schedules",
    text: "Grant access by day, time and zone so doors match how the building runs.",
  },
  {
    Icon: Siren,
    title: "Emergency release where designed",
    text: "Fire release and emergency unlock only where strategy and hardware support them.",
  },
  {
    Icon: ShieldCheck,
    title: "Authorised entry",
    text: "Controlled doors reduce unauthorised access; lost credentials can be disabled fast.",
  },
  {
    Icon: ClipboardList,
    title: "Audit and accountability",
    text: "See who accessed sensitive areas and when, for investigations and compliance.",
  },
  {
    Icon: Network,
    title: "Networked integration",
    text: "Sit alongside CCTV, intruder, video entry and gate automation on one platform.",
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
      background: SERVICE_HERO_BRIDGE_GRADIENT,
    }}
    aria-hidden
  />
)

/** HD Paxton-style proximity reader in a commercial corridor (replaces tight fob crop). */
const ACCESS_CONTROL_HERO_IMAGE_SRC =
  "/service%20images/access%20control/hero-access-control-commercial-entry.jpg"
/** Mid-page: person presenting a card at a commercial glass-door reader. */
const BESPOKE_ACCESS_CONTROL_IMAGE_SRC =
  "/service%20images/access%20control/access-control-systems-door-entry-card-sq.jpg"

export default function AccessControlPage() {
  return (
    <div className="service-page-root min-h-screen overflow-x-hidden bg-black text-white">
      <ServicePageHero
        title="Access Control Systems"
        imageSrc={ACCESS_CONTROL_HERO_IMAGE_SRC}
        imageAlt="Paxton-style proximity card reader on a commercial corridor beside a secure door"
        imageClassName="object-cover object-center"
        heroCompliance={["BS EN 60839"]}
        heroSummary="Commercial and multi-tenant access control design, installation and maintenance, from door controllers to site-wide credential management."
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

      <div className="relative bg-[var(--page-bg)]">
        {heroBridge}

        <div className="relative z-[1] border-t border-white/15" aria-hidden />

        <section className="site-container relative z-[1] py-16 lg:py-16">
          <Reveal>
            <h2 className="mb-4 text-left font-title text-3xl font-bold text-white sm:text-4xl">
              What We Deliver
            </h2>
          </Reveal>
          <Reveal delayMs={70}>
            <p className="mb-10 max-w-3xl text-left text-gray-300">
              Capabilities are matched to the brief. Emergency release and lockdown behaviour depend on fire strategy,
              door hardware and the access platform, we configure what the design requires, not a one-size-fits-all rule.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {ACCESS_CONTROL_CAPABILITIES.map(({ title, text, id, imageSrc, imageAlt }, i) => (
              <ServiceItemReveal key={title} index={i} className="h-full min-h-0">
                <ServiceFeatureImageCard
                  id={id}
                  title={title}
                  description={text}
                  imageSrc={imageSrc}
                  imageAlt={imageAlt}
                  className="transition-transform duration-300 hover:scale-[1.02]"
                />
              </ServiceItemReveal>
            ))}
          </div>
        </section>

        <div className="border-t border-white/15" />

        <section
          className="relative z-[1] border-t border-white/15 bg-[var(--page-bg)]"
          aria-labelledby="access-control-benefits-heading"
        >
          <div className="site-container py-14 sm:py-16 lg:py-20">
            <Reveal>
              <h2
                id="access-control-benefits-heading"
                className="mb-10 text-left font-title text-3xl font-bold text-white sm:mb-12 sm:text-4xl"
              >
                Benefits of Access Control
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-14">
              {ACCESS_CONTROL_BENEFITS.map(({ Icon, title, text }, i) => (
                <ServiceItemReveal key={title} index={i} className="h-full min-h-0">
                  <div className="flex h-full flex-col items-center text-center">
                    <Icon
                      className="mb-5 h-12 w-12 text-white sm:mb-6 sm:h-14 sm:w-14"
                      strokeWidth={1.25}
                      aria-hidden
                    />
                    <h3 className="font-title text-lg font-bold tracking-tight text-white sm:text-xl">
                      {toTitleCase(title)}
                    </h3>
                    <p className="mt-3 max-w-[14rem] text-[15px] leading-relaxed text-white/60 sm:mt-3.5 sm:max-w-[15rem]">
                      {text}
                    </p>
                  </div>
                </ServiceItemReveal>
              ))}
            </div>
          </div>
        </section>

        <div className="border-t border-white/15" />

        <FsServiceTextImageSection
          title="Bespoke access control systems"
          titleId="bespoke-access-control-heading"
          imageSrc={BESPOKE_ACCESS_CONTROL_IMAGE_SRC}
          imageAlt="Access control card reader at a secure door entry"
          variant="light"
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
            <CustomPillButton href="/contact?service=access-control-systems" size="md" variant="onLight">
              Access control enquiry
            </CustomPillButton>
          </div>
          <div className="mt-8 max-w-3xl border-t border-black/10 pt-8">
            <p className="text-base leading-relaxed text-neutral-700">
              Installations are specified and handed over with reference to BS EN 60839 where applicable, including access
              schedules, user permissions and structured training. See also{" "}
              <Link
                href="/services/video-door-entry-systems"
                className="text-black underline decoration-black/35 underline-offset-2 hover:decoration-black"
              >
                video door entry
              </Link>
              ,{" "}
              <Link
                href="/services/gate-automation-systems"
                className="text-black underline decoration-black/35 underline-offset-2 hover:decoration-black"
              >
                gate automation
              </Link>{" "}
              and the{" "}
              <Link
                href="/services/security-systems"
                className="text-black underline decoration-black/35 underline-offset-2 hover:decoration-black"
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

        <section className="site-container py-16 lg:py-16">
          <Reveal>
            <h2 className="mb-4 text-left font-title text-3xl font-bold text-white sm:text-4xl">Our Access Control System Installations</h2>
          </Reveal>
          <Reveal delayMs={70}>
            <p className="mb-8 max-w-2xl text-left text-gray-300">
              Examples of the access control systems that we have installed for our customers:
            </p>
          </Reveal>
          <ServiceInstallationsGrid
            count={ACCESS_CONTROL_INSTALLATIONS.length}
            ctaHref="/contact?service=access-control-systems"
          >
            {ACCESS_CONTROL_INSTALLATIONS.map((item, index) => (
              <ServiceItemReveal key={`${item.imageSrc}-${index}`} index={index} className="h-full min-h-0">
                <ServiceInstallationCard
                  imageSrc={item.imageSrc}
                  title={item.title}
                  subtitle={item.venue}
                  meta={item.context}
                />
              </ServiceItemReveal>
            ))}
          </ServiceInstallationsGrid>
        </section>

        <ServicePageClosingSections
          serviceTitleShort="Access control"
          ctaImageSrc={serviceHeroImages.accessControl}
          ctaHeadline="Talk to Us About"
          ctaHeadlineAccent="Access Control"
          ctaDescription="From single doors to networked multi-tenant sites, including maintenance takeovers, we design and install access systems to suit your building and operations."
        >
          <CustomPillButton href="/contact?service=access-control-systems" size="md">
            Get a free quote
          </CustomPillButton>
          <CallPhoneCta size="md" />
        </ServicePageClosingSections>

      </div>
    </div>
  )
}
