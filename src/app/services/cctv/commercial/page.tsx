"use client"

import Image from "next/image"
import Link from "next/link"
import { CctvComplianceSection } from "@/components/CctvComplianceSection"
import { CctvWhatWeOfferSection } from "@/components/CctvWhatWeOfferSection"
import { FsCctvCameraTypesStrip } from "@/components/FsCctvCameraTypesStrip"
import { ServicePageClosingSections } from "@/components/ServicePageClosingSections"
import { FsCctvSubpageHeroButtons } from "@/components/FsCctvSubpageHeroButtons"
import { FsServiceBenefitsList } from "@/components/FsServiceBenefitsList"
import { FsServiceTextImageSection } from "@/components/FsServiceTextImageSection"
import { FsServiceTextImageSectionGroup } from "@/components/FsServiceTextImageSectionGroup"
import { ServicePageHero } from "@/components/ServicePageHero"
import { ServiceFeatureIconCard } from "@/components/ServiceFeatureIconCard"
import { Reveal } from "@/components/Reveal"
import { ServiceItemReveal } from "@/components/ServiceItemReveal"
import { CustomPillButton } from "@/components/ui/CustomPillButton"
import { serviceHeroImages } from "@/lib/serviceHeroImages"
import {
  FS_SERVICE_IMAGE_GROW_INNER,
  FS_SERVICE_INSTALLATION_CARD,
  FS_SERVICE_INSTALLATION_CARD_IMAGE,
} from "@/lib/fsServicePageCards"
import { FS_SERVICE_ROUTES } from "@/lib/fs-service-routes"
import {
  Building2,
  Car,
  GraduationCap,
  HeartPulse,
  Hotel,
  Landmark,
  Link2,
  Monitor,
  ShoppingBag,
} from "lucide-react"

const linkClass =
  "underline decoration-white/45 underline-offset-[3px] transition-colors hover:decoration-white"

const WHAT_WE_OFFER_ITEMS = [
  "Site survey and system design",
  "IP CCTV and HD analogue upgrades (where specified)",
  "NVR/DVR recording, retention and remote viewing where the platform supports it",
  "Privacy-conscious configuration, customer remains responsible for lawful use",
  "Installation, commissioning and training",
  "Camera health monitoring, maintenance and repairs",
  "ANPR and analytics where offered for the site",
  "Network segregation for multi-site estates where required",
  "Integration with access control, intruder alarms, gate automation and remote monitoring",
]

/** Public folder: `public/service images/cctv /` */
const COMMERCIAL_CCTV_BESPOKE_IMAGE_SRC =
  "/service%20images/cctv%20/Bespoke%20Commercial%20CCTV%20Systems.jpg"
const COMMERCIAL_CCTV_MONITORING_IMAGE_SRC =
  "/service%20images/cctv%20/Benefits%20of%20a%20Commercial%20CCTV%20System%20.jpg"

const COMMERCIAL_CCTV_BENEFITS = [
  "Support security and safety oversight for staff and visitors.",
  "Monitor activity in car parks, yards and loading areas.",
  "Provide recorded evidence to support investigations and insurance claims when incidents occur.",
  "Oversee access to grounds, entrances and controlled areas of a building.",
  "Support health and safety practices with clear site visibility.",
  "Observe till points, stock rooms and warehouse areas as part of operational oversight.",
  "Help lone workers and small teams view more of the premises from a single location.",
] as const

const COMMERCIAL_CCTV_SECTORS = [
  {
    icon: ShoppingBag,
    label: "Retail",
    text: "Coverage for shop floors, stock rooms and till points to support day-to-day oversight and provide clear footage when incidents need reviewing.",
  },
  {
    icon: Hotel,
    label: "Hotels",
    text: "Reception areas, corridors, car parks and service entrances, supporting guest and staff safety alongside day-to-day operations.",
  },
  {
    icon: HeartPulse,
    label: "Healthcare",
    text: "Wards, clinics and car parks with discreet camera placement aligned with healthcare site requirements and privacy expectations.",
  },
  {
    icon: GraduationCap,
    label: "Education",
    text: "Entrances, playgrounds and shared areas to help schools and colleges manage access, monitor activity and respond to incidents.",
  },
  {
    icon: Landmark,
    label: "Banking",
    text: "Counters, cash-handling areas and high-value zones with recording suitable for audit and investigation review.",
  },
  {
    icon: Building2,
    label: "Corporate",
    text: "From single offices to multi-site estates, scalable CCTV that integrates with access control, intruder alarms and remote monitoring.",
  },
] as const

const INTEGRATIONS = [
  {
    icon: Link2,
    title: "Access control",
    text: "Event-triggered recording and shared workflows with door access systems.",
    href: FS_SERVICE_ROUTES.accessControlSystems,
  },
  {
    icon: Link2,
    title: "Intruder alarms",
    text: "Alarm-linked camera call-up and coordinated commissioning with graded intruder systems.",
    href: FS_SERVICE_ROUTES.intruderAlarmSystems,
  },
  {
    icon: Car,
    title: "Gate automation",
    text: "Vehicle gate and barrier coverage coordinated with access and CCTV where the site requires it.",
    href: FS_SERVICE_ROUTES.gateAutomationSystems,
  },
  {
    icon: Car,
    title: "ANPR",
    text: "Automatic number-plate recognition where offered and suitable for the location and brief.",
    href: FS_SERVICE_ROUTES.cctvSystems,
  },
  {
    icon: Monitor,
    title: "Remote monitoring",
    text: "Remote viewing and ARC / monitoring pathways where the platform and contract support them.",
    href: "/services/monitoring",
  },
] as const

const COMMERCIAL_CCTV_PROJECTS = [
  {
    title: "Ledian Farm, CCTV & access control",
    venue: "APX case study",
    context: "Integrated CCTV with access control across public and back-of-house areas",
    imageSrc: "/projects/case-studies/ledian-farm/case-study-ledian-farm-cctv-access-control-exterior.jpg",
    href: "/projects/ledian-farm",
  },
  {
    title: "Ledian Farm, entrance coverage",
    venue: "APX case study",
    context: "Entrance and lobby camera coverage coordinated with access control",
    imageSrc: "/projects/case-studies/ledian-farm/case-study-ledian-farm-cctv-access-control-entrance.jpg",
    href: "/projects/ledian-farm",
  },
  {
    title: "Commercial premises monitoring",
    venue: "APX commercial delivery",
    context: "Multi-camera commercial CCTV for business premises oversight",
    imageSrc: "/projects/library/commercial-cctv-monitor-business.jpg",
    href: "/projects",
  },
] as const

export default function CommercialCctvPage() {
  return (
    <div className="service-page-root min-h-screen overflow-x-hidden text-white">
      <div className="relative">
        <ServicePageHero
          title="Commercial CCTV systems"
          imageSrc={serviceHeroImages.commercialCctv}
          imageClassName="object-cover [object-position:50%_78%] sm:[object-position:50%_82%]"
          heroCompliance={["BS EN 62676"]}
          afterIntro={<FsCctvSubpageHeroButtons />}
          intro={
            <>
              <p className="mb-4">
                High-performance commercial CCTV for offices, retail, warehouses and multi-site operations. We design and
                install scalable systems with remote monitoring options and integration with access control, intruder
                alarms, gate automation and ANPR where the brief requires them.
              </p>
              <p>
                Camera types (dome, bullet, PTZ, IR and others) are specified only where they suit the site, see the
                camera-type guides below. Systems can be configured with privacy considerations;{" "}
                <strong className="font-semibold text-white">
                  the customer remains responsible for lawful CCTV operation under UK GDPR
                </strong>
                .
              </p>
            </>
          }
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
          <Reveal>
            <h2 className="mb-4 text-left font-title text-3xl font-bold text-white sm:text-4xl">
              Integration &amp; monitoring
            </h2>
          </Reveal>
          <Reveal delayMs={70}>
            <p className="mb-10 max-w-3xl text-left text-gray-300">
              Commercial CCTV works best as part of a joined-up security package, not as a standalone camera install.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {INTEGRATIONS.map(({ icon: Icon, title, text, href }, i) => (
              <ServiceItemReveal key={title} index={i} className="h-full min-h-0">
                <Link href={href} className="block h-full text-inherit no-underline">
                  <ServiceFeatureIconCard icon={Icon} title={title} description={text} />
                </Link>
              </ServiceItemReveal>
            ))}
          </div>

          <Reveal>
            <h2
              id="commercial-cctv-businesses-heading"
              className="mb-4 mt-16 text-left font-title text-3xl font-bold text-white sm:mt-20 sm:text-4xl lg:mt-24"
            >
              CCTV for businesses
            </h2>
          </Reveal>
          <Reveal delayMs={70}>
            <p className="mb-10 max-w-3xl text-left text-base leading-relaxed text-gray-300 sm:text-lg">
              We design and install commercial CCTV across the following sectors:
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {COMMERCIAL_CCTV_SECTORS.map(({ icon: Icon, label, text }, i) => (
              <ServiceItemReveal key={label} index={i} className="h-full min-h-0">
                <ServiceFeatureIconCard icon={Icon} title={label} description={text} />
              </ServiceItemReveal>
            ))}
          </div>
        </section>

        <div className="border-t border-white/15" />

        <section className="container mx-auto px-6 py-16 lg:py-16">
          <Reveal>
            <h2 className="mb-4 text-left font-title text-3xl font-bold text-white sm:text-4xl">
              APX commercial examples
            </h2>
          </Reveal>
          <Reveal delayMs={70}>
            <p className="mb-8 max-w-2xl text-left text-gray-300">
              Genuine APX project photography from commercial CCTV and integrated security delivery.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {COMMERCIAL_CCTV_PROJECTS.map((item, index) => (
              <ServiceItemReveal key={item.title} index={index} className="h-full min-h-0">
                <Link href={item.href} className="block h-full text-inherit no-underline">
                  <article className={FS_SERVICE_INSTALLATION_CARD}>
                    <div className={FS_SERVICE_INSTALLATION_CARD_IMAGE}>
                      <div className={FS_SERVICE_IMAGE_GROW_INNER}>
                        <Image
                          src={item.imageSrc}
                          alt={item.title}
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
                </Link>
              </ServiceItemReveal>
            ))}
          </div>
        </section>

        <div className="border-t border-white/15" />

        <FsServiceTextImageSectionGroup>
          <FsServiceTextImageSection
            title="Bespoke commercial CCTV systems"
            titleId="bespoke-commercial-cctv-heading"
            imageSrc={COMMERCIAL_CCTV_BESPOKE_IMAGE_SRC}
            imageAlt="Bespoke commercial CCTV system installation"
          >
            <p>
              A well-designed CCTV system helps organisations oversee premises, support investigations and coordinate
              with wider security systems. We work with shop owners and SMEs through to corporate head offices and public
              buildings such as hospitals, libraries and schools.
            </p>
            <p>
              Building on a heritage dating back to 1986, we focus on survey-led design, reliable installation and clear
              handover, including integration with{" "}
              <Link href={FS_SERVICE_ROUTES.accessControlSystems} className={linkClass}>
                access control
              </Link>
              ,{" "}
              <Link href={FS_SERVICE_ROUTES.intruderAlarmSystems} className={linkClass}>
                intruder alarms
              </Link>
              ,{" "}
              <Link href={FS_SERVICE_ROUTES.gateAutomationSystems} className={linkClass}>
                gate automation
              </Link>{" "}
              and remote monitoring where required.
            </p>
            <p>
              Complete the commercial CCTV enquiry form and we will arrange a survey to discuss coverage, recording and
              integration requirements.
            </p>
            <div className="pt-2">
              <CustomPillButton href="/contact?service=cctv-systems" size="md">
                Commercial CCTV enquiry form
              </CustomPillButton>
            </div>
          </FsServiceTextImageSection>

          <div className="border-t border-white/15" />

          <FsServiceTextImageSection
            title="Commercial CCTV monitoring"
            titleId="commercial-cctv-monitoring-heading"
            imageSrc={COMMERCIAL_CCTV_MONITORING_IMAGE_SRC}
            imageAlt="Commercial CCTV monitoring"
          >
            <p>
              Live and recorded viewing helps you oversee car parks, entrances, trading floors and remote sites, with
              optional alarm receiving centre integration and multi-site review for estates that need a single view of
              activity across their portfolio.
            </p>
            <p>
              High-quality recording supports insurance claims, internal investigations and evidence review when
              incidents occur. CCTV is a monitoring and evidence tool, it does not guarantee that crime will be
              prevented.
            </p>
          </FsServiceTextImageSection>

          <div className="border-t border-white/15" />

          <FsServiceTextImageSection
            title="How commercial CCTV is used"
            titleId="commercial-cctv-benefits-heading"
            imageAlt="How commercial CCTV is used on business premises"
            imageClassName="object-cover object-[62%_center]"
          >
            <FsServiceBenefitsList items={COMMERCIAL_CCTV_BENEFITS} />
          </FsServiceTextImageSection>
        </FsServiceTextImageSectionGroup>

        <div className="border-t border-white/15" />

        <CctvComplianceSection
          intro="For offices, retail, warehouses and multi-site estates we design and install scalable CCTV with remote monitoring options, perimeter coverage and secure network configuration, aligned with NSI expectations and BS EN 62676 where applicable. Recording and retention can be designed with privacy in mind; lawful operation remains the customer's responsibility under UK GDPR."
          standardsItems={[
            "NSI Gold-aligned installation practice",
            "BS EN 62676 (video surveillance systems) where applicable",
            "Privacy-conscious retention and signage guidance, customer retains lawful-use responsibility under UK GDPR",
          ]}
          footerNote={
            <>
              Related scopes:{" "}
              <Link
                href={FS_SERVICE_ROUTES.intruderAlarmSystems}
                className="text-black underline decoration-black/30 underline-offset-2 hover:decoration-black"
              >
                intruder alarms
              </Link>
              ,{" "}
              <Link
                href={FS_SERVICE_ROUTES.accessControlSystems}
                className="text-black underline decoration-black/30 underline-offset-2 hover:decoration-black"
              >
                access control
              </Link>
              ,{" "}
              <Link
                href={FS_SERVICE_ROUTES.gateAutomationSystems}
                className="text-black underline decoration-black/30 underline-offset-2 hover:decoration-black"
              >
                gate automation
              </Link>{" "}
              and{" "}
              <Link
                href={FS_SERVICE_ROUTES.cctvSystems}
                className="text-black underline decoration-black/30 underline-offset-2 hover:decoration-black"
              >
                CCTV systems overview
              </Link>
              .
            </>
          }
          deliverablesItems={[
            "Camera schedules and network diagrams",
            "Recording retention and user permission setup",
            "Integration with access, intruder, gate automation and ANPR where specified",
            "Remote monitoring / viewing set-up where the platform supports it",
            "Installation, commissioning and user training",
            "Ongoing maintenance and camera health monitoring options",
          ]}
        />

        <CctvWhatWeOfferSection eyebrow="Commercial" items={WHAT_WE_OFFER_ITEMS} />

        <ServicePageClosingSections
          serviceTitleShort="Commercial CCTV"
          ctaImageSrc={serviceHeroImages.commercialCctv}
          ctaHeadline="Request your"
          ctaHeadlineAccent="free commercial survey."
          ctaDescription="Site visit, coverage review and written recommendations. No obligation. We respond promptly across London and the Home Counties."
        >
          <CustomPillButton href="/contact?service=cctv-systems" size="md">
            Book a survey
          </CustomPillButton>
          <CustomPillButton href="tel:02083032280" size="md" variant="outline">
            Call 020 8303 2280
          </CustomPillButton>
        </ServicePageClosingSections>
      </div>
    </div>
  )
}
