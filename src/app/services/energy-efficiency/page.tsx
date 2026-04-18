"use client"

import Image from "next/image"
import Link from "next/link"
import { ServicePageBottomCta } from "@/components/ServicePageBottomCta"
import { CustomPillButton } from "@/components/ui/CustomPillButton"
import { OurCustomers } from "@/components/ServicePageSharedSections"
import { ServicePageHero } from "@/components/ServicePageHero"
import { serviceHeroImages } from "@/lib/serviceHeroImages"
import { ApxPartnerLogoStrip } from "@/components/ApxPartnerLogoStrip"
import { APX_PARTNER_LOGO_DIR, type PartnerLogoEntry } from "@/lib/apx-partner-logos"
import { FsServiceTextImageSection } from "@/components/FsServiceTextImageSection"
import { FS_SERVICE_SHIMMER_CARD, FS_SERVICE_SHIMMER_CARD_FEATURE } from "@/lib/fsServicePageCards"
import {
  Key,
  Clock,
  Flame,
  ShieldCheck,
  ClipboardList,
  Cpu,
  type LucideIcon,
} from "lucide-react"

const benefitFeatureCardClass = `${FS_SERVICE_SHIMMER_CARD_FEATURE} transition-transform duration-300 hover:scale-[1.02]`

const ACCESS_CONTROL_BENEFITS: { Icon: LucideIcon; title: string; text: string }[] = [
  {
    Icon: Key,
    title: "Credentials instead of keys",
    text:
      "Revoke or replace a lost fob or card without rekeying every door — avoiding the cost and disruption of wholesale lock changes.",
  },
  {
    Icon: Clock,
    title: "Smarter schedules",
    text:
      "Reduce reliance on staff for manual unlock and lock-up; grant access by day, time and zone so doors match how your building actually runs.",
  },
  {
    Icon: Flame,
    title: "Safer evacuation",
    text:
      "Fail-safe locking can release doors in a fire or other emergency so people are not held up searching for keys.",
  },
  {
    Icon: ShieldCheck,
    title: "Authorised entry",
    text:
      "Credentials at controlled doors make unauthorised visitors far less likely; lost access can be disabled immediately without new keys for everyone.",
  },
  {
    Icon: ClipboardList,
    title: "Audit and accountability",
    text:
      "See who accessed sensitive areas and when — valuable for investigations, contractor visits and compliance reporting.",
  },
  {
    Icon: Cpu,
    title: "Networked integration",
    text:
      "On larger sites, systems can support time and attendance, payroll feeds and sit alongside CCTV and intruder alarms on one coherent platform.",
  },
]

const ACCESS_CONTROL_PARTNERS: readonly PartnerLogoEntry[] = [
  { name: "TDSi", href: "https://www.tdsi.co.uk/", logoSrc: `${APX_PARTNER_LOGO_DIR}/tdsi.svg`, size: "lg" },
  { name: "CAME Entrotec", href: "https://www.came.com/uk", logoSrc: `${APX_PARTNER_LOGO_DIR}/logo-entrotec.svg`, size: "lg" },
  { name: "PAC", href: "https://www.pac.co.uk/", logoSrc: null },
  { name: "ASSA ABLOY", href: "https://www.assaabloy.com/", logoSrc: `${APX_PARTNER_LOGO_DIR}/assa-abloy-access-blue-logo.svg` },
  { name: "Videx", href: "https://www.videxuk.com/", logoSrc: `${APX_PARTNER_LOGO_DIR}/videx.svg` },
  { name: "CDVI", href: "https://www.cdvi.co.uk/", logoSrc: `${APX_PARTNER_LOGO_DIR}/cdvi.svg` },
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

export default function AccessControlPage() {
  return (
    <div className="service-page-root min-h-screen overflow-x-hidden bg-black text-white">
      <ServicePageHero
        title="Video entry & access control systems"
        imageSrc={serviceHeroImages.accessControl}
        heroCompliance={["BS EN 60839"]}
        intro={
          <>
            <p className="mb-4">
              We install secure, reliable access control and video entry systems for commercial, residential, and multi-tenant environments — from door control and readers
              through to networked systems integrated with CCTV and intruder alarms.
            </p>
            <p>
              Established in 1986 we work throughout London and the Home Counties, designing systems alongside architects and consultants to meet your security and operational
              requirements.
            </p>
          </>
        }
      />

      <div className="relative bg-black">
        {heroBridge}

        <section className="container relative z-[1] mx-auto px-6 py-12 lg:py-16">
          <h2 className="mb-10 text-left font-title text-3xl font-bold text-white sm:text-4xl">Benefits of Access Control Systems</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {ACCESS_CONTROL_BENEFITS.map(({ Icon, title, text }, i) => (
              <div key={i} className={benefitFeatureCardClass}>
                <Icon className="mb-4 h-8 w-8 text-white" strokeWidth={1.75} />
                <h3 className="mb-3 text-left text-xl font-semibold text-white">{title}</h3>
                <p className="text-left text-gray-300">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="border-t border-white/15" />

        <FsServiceTextImageSection title="Bespoke Access Control Systems" titleId="bespoke-access-control-heading">
          <p>
            We have a vast amount of experience in designing high quality and effective access control systems for business and homeowners alike. Established in 1986 we work throughout London and the Home Counties, in all market sectors, ranging from single doors through to fully networked systems that integrate with intruder alarms and CCTV systems.
          </p>
          <p>
            Working alongside architects and consultants, we design systems to meet and exceed our clients expectations, ensuring our electronic access control systems provide the most efficient and convenient way of securing your building and assets.
          </p>
          <p>
            Simply complete the Access Control System enquiry form and we will contact you and arrange to meet you, discuss your requirements and carry out a survey of your property.
          </p>
          <div className="mt-8 max-w-3xl border-t border-white/10 pt-8">
            <p className="text-base leading-relaxed text-gray-300">
              Installations are specified and handed over with reference to BS EN 60839 for electronic access control systems where applicable. Video entry, multi-tenant panels, proximity readers and fob/card systems can be delivered with access schedules, user permission setup and structured training — coordinated with CCTV and intruder systems where required. See also our{" "}
              <Link href="/services/maintenance" className="text-white underline decoration-white/35 underline-offset-2 hover:decoration-white">
                video door entry
              </Link>{" "}
              and{" "}
              <Link href="/services/security-systems" className="text-white underline decoration-white/35 underline-offset-2 hover:decoration-white">
                security systems overview
              </Link>
              .
            </p>
          </div>
        </FsServiceTextImageSection>

        <div className="border-t border-white/15" />

        <section className="container mx-auto px-6 py-12 lg:py-16">
          <h2 className="mb-10 text-left font-title text-3xl font-bold text-white sm:text-4xl">Access Control System Products</h2>
          <p className="mb-10 max-w-2xl text-left text-gray-300">
            We are proud to install access control technology from the world&apos;s leading brands
          </p>
          <ApxPartnerLogoStrip partners={ACCESS_CONTROL_PARTNERS} />
        </section>

        <div className="border-t border-white/15" />

        <section className="container mx-auto px-6 py-12 lg:py-16">
          <h2 className="mb-4 text-left font-title text-3xl font-bold text-white sm:text-4xl">Our Access Control System Installations</h2>
          <p className="mb-8 max-w-2xl text-left text-gray-300">
            Examples of the access control systems that we have installed for our customers:
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {ACCESS_CONTROL_INSTALLATIONS.map((item, index) => (
              <article key={`${item.imageSrc}-${index}`} className={`${FS_SERVICE_SHIMMER_CARD} overflow-hidden p-0`}>
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
                  <h3 className="mb-2 text-base font-semibold leading-snug text-white sm:text-lg">{item.title}</h3>
                  <p className="font-medium text-white/95">{item.venue}</p>
                  <p className="mt-1 text-gray-300">{item.context}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <OurCustomers serviceTitleShort="Video entry & access" />

        <ServicePageBottomCta
          imageSrc={serviceHeroImages.accessControl}
          title="Talk to us about access control"
          description="From single doors to fully networked sites, we design and install access systems to suit your building and operations."
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
