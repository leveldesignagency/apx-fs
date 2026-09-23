"use client"

import Image from "next/image"
import Link from "next/link"
import { ServicePageClosingSections } from "@/components/ServicePageClosingSections"
import { FsServiceTextImageSection } from "@/components/FsServiceTextImageSection"
import { FsServiceTextImageSectionGroup } from "@/components/FsServiceTextImageSectionGroup"
import { CustomPillButton } from "@/components/ui/CustomPillButton"
import { ServicePageHero } from "@/components/ServicePageHero"
import { Reveal } from "@/components/Reveal"
import { ServiceItemReveal } from "@/components/ServiceItemReveal"
import { serviceHeroImages } from "@/lib/serviceHeroImages"
import {
  FS_SERVICE_IMAGE_GROW_INNER,
  FS_SERVICE_INSTALLATION_CARD,
  FS_SERVICE_INSTALLATION_CARD_IMAGE,
} from "@/lib/fsServicePageCards"
import { ApxPartnerLogoStrip } from "@/components/ApxPartnerLogoStrip"
import { VIDEO_DOOR_TECH_PARTNERS } from "@/lib/apx-partner-logos"
import { ServiceTechnologyProductsSection } from "@/components/ServiceTechnologyProductsSection"
import { ServiceFeatureIconCard } from "@/components/ServiceFeatureIconCard"
import { FS_SERVICE_ROUTES } from "@/lib/fs-service-routes"
import {
  Building2,
  Car,
  Eye,
  Home,
  Link2,
  Network,
  Phone,
  Smartphone,
  Video,
  Wrench,
  type LucideIcon,
} from "lucide-react"

const linkClass =
  "underline decoration-white/45 underline-offset-[3px] transition-colors hover:decoration-white"

const VIDEO_DOOR_CAPABILITIES: { Icon: LucideIcon; title: string; text: string }[] = [
  {
    Icon: Phone,
    title: "Audio and video entry",
    text: "Audio-only or audio-and-video door stations so occupants can speak to, and where specified see, callers before granting entry.",
  },
  {
    Icon: Home,
    title: "Single residence systems",
    text: "Houses and single dwellings with clear internal handsets or monitors matched to how the household wants to answer calls.",
  },
  {
    Icon: Building2,
    title: "Multi-occupancy systems",
    text: "Apartment blocks and multi-tenant buildings with panel directories, flat stations and permissions structured for shared entrances.",
  },
  {
    Icon: Eye,
    title: "Concierge integration where applicable",
    text: "Link entry calls to a concierge or reception desk where the building operates a staffed desk and the platform supports it.",
  },
  {
    Icon: Network,
    title: "IP and networked systems",
    text: "IP and networked video entry for larger estates, with structured cabling and handover documentation for operators.",
  },
  {
    Icon: Smartphone,
    title: "Mobile answering where available",
    text: "Answer and release from a phone or tablet where the system supplied supports mobile answering, not assumed for every product.",
  },
  {
    Icon: Link2,
    title: "Access-control integration",
    text: "Coordinate with fob/card access so visitor release and resident credentials work as one package.",
  },
  {
    Icon: Car,
    title: "Gate automation integration",
    text: "Integrate with vehicle gates and barriers where the site needs shared visitor and vehicle entry control.",
  },
  {
    Icon: Wrench,
    title: "Maintenance and upgrades",
    text: "PPM, fault attendance, system takeovers and upgrades so ageing panels and handsets can be modernised without unnecessary downtime.",
  },
  {
    Icon: Video,
    title: "CCTV coordination",
    text: "Where required, align entry cameras and recording with wider CCTV so events and visitor footage stay coherent.",
  },
]

const VIDEO_DOOR_INSTALLATIONS: { title: string; venue: string; context: string; imageSrc: string }[] = [
  {
    title: "Video Door Entry Installation Aspire Herschel Street",
    venue: "Aspire Herschel Street",
    context: "Apartment Block",
    imageSrc:
      "/projects/case-studies/aspire-herschel-street/video-door-entry-installation-aspire-herschel-street-exterior.jpg",
  },
  {
    title: "Video Door Entry Installation Fizzy Living Lewisham",
    venue: "Fizzy Living, Lewisham",
    context: "Apartment Blocks",
    imageSrc:
      "/projects/case-studies/fizzy-living-lewisham/video-door-entry-installation-fizzy-living-lewisham-exterior.jpg",
  },
  {
    title: "Video Entry Installation Fizzy Living Lewisham",
    venue: "Fizzy Living, Lewisham",
    context: "Apartment Blocks",
    imageSrc:
      "/projects/case-studies/fizzy-living-lewisham/video-door-entry-installation-fizzy-living-lewisham-interior.jpg",
  },
  {
    title: "Video Door Entry Installation Firmdale Hotels Richmond Buildings Workspace",
    venue: "Richmond Buildings Workspace",
    context: "Firmdale Hotels",
    imageSrc:
      "/projects/case-studies/firmdale-richmond-buildings/video-door-entry-systems-firmdale-richmond-buildings-workspace-exterior.jpg",
  },
  {
    title: "Video Entry Installation Firmdale Hotels Richmond Buildings Workspace",
    venue: "Richmond Buildings Workspace",
    context: "Firmdale Hotels",
    imageSrc:
      "/projects/case-studies/firmdale-richmond-buildings/video-door-entry-systems-firmdale-richmond-buildings-workspace-interior.jpg",
  },
  {
    title: "Video Door Entry Installation United Living Welbourne",
    venue: "United Living Welbourne",
    context: "Apartment Block",
    imageSrc:
      "/projects/case-studies/united-living-welbourne/video-door-entry-systems-installation-united-living-welbourne.jpg",
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

export default function VideoDoorEntrySystemsPage() {
  return (
    <div className="service-page-root min-h-screen overflow-x-hidden bg-black text-white">
      <ServicePageHero
        title="Video Door Entry Systems"
        imageSrc={serviceHeroImages.videoDoor}
        heroCompliance={["BS EN 60839"]}
        intro={
          <>
            <p className="mb-4">
              APX designs, installs and maintains audio and video door entry for single residences and multi-occupancy
              buildings across London and the Home Counties, including IP and networked systems, with access control and
              gate automation integration where required.
            </p>
            <p>
              Building on a heritage dating back to 1986, we survey each entrance so panels, handsets and permissions
              match how the building is used. Concierge integration and mobile answering are included where applicable
              and where the platform supports them.
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
              Video entry helps occupants identify callers and control entry. It supports oversight and recorded evidence
              where recording is specified, it does not guarantee that crime will be prevented.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {VIDEO_DOOR_CAPABILITIES.map(({ Icon, title, text }, i) => (
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

        <FsServiceTextImageSectionGroup>
          <FsServiceTextImageSection
            title="Bespoke video door entry systems"
            titleId="bespoke-video-door-entry-heading"
            imageSrc="/service%20images/video%20door%20entry/video-door-entry-systems-panel.jpg"
            imageAlt="Video door entry systems panel"
          >
            <p>
              Building on a heritage dating back to 1986, we design and install video entry for houses, apartment
              buildings and commercial premises across London and the Home Counties, from simple audio/video stations
              through to multi-caller networked systems with authorised directories.
            </p>
            <p>
              We work alongside architects and consultants, and can support Secured by Design pathways where that forms
              part of the project brief. Product styling and station options are selected on survey to suit the entrance
              and interior.
            </p>
          </FsServiceTextImageSection>

          <div className="border-t border-white/15" />

          <FsServiceTextImageSection
            title="Integrated entry and access"
            titleId="integrated-entry-access-heading"
            imageSrc="/projects/library/domestic-cctv-system-installer-london.jpg"
            imageAlt="Residential property with integrated entry and access"
          >
            <p>
              Specifiers and residents need clear visitor handling. Systems can present calls on internal monitors or,
              where available, via mobile answering. We integrate with{" "}
              <Link href={FS_SERVICE_ROUTES.accessControlSystems} className={linkClass}>
                access control
              </Link>
              ,{" "}
              <Link href={FS_SERVICE_ROUTES.gateAutomationSystems} className={linkClass}>
                gate automation
              </Link>{" "}
              and{" "}
              <Link href={FS_SERVICE_ROUTES.cctvSystems} className={linkClass}>
                CCTV
              </Link>{" "}
              so entry, credentials and recording work together.
            </p>
            <p>
              Maintenance, upgrades and system takeovers are available so ageing panels and handsets can be modernised
              with clear handover for residents and duty holders.
            </p>
            <div className="pt-2">
              <CustomPillButton href="/contact?service=video-door-entry-systems" size="md">
                Video entry enquiry
              </CustomPillButton>
            </div>
          </FsServiceTextImageSection>

          <div className="border-t border-white/15" />

          <FsServiceTextImageSection
            title="Comprehensive Security Systems"
            titleId="comprehensive-security-systems-heading"
            imageSrc="/Comprehensive%20Security%20Systems.jpg"
            imageAlt="Comprehensive security systems with video door entry"
          >
            <p>
              We work closely with building specifiers, architects and our residential customers to understand exactly
              what they require from the latest video entry systems.
            </p>
            <p>
              The systems we install allow you to see who&apos;s calling directly on your internal TV network or via
              your tablet or smartphone. We can also integrate the entry system with existing{" "}
              <Link href={FS_SERVICE_ROUTES.cctvSystems} className={linkClass}>
                CCTV systems
              </Link>{" "}
              and{" "}
              <Link href={FS_SERVICE_ROUTES.accessControlSystems} className={linkClass}>
                access control systems
              </Link>{" "}
              to provide a comprehensive, all-round secure and flexible security system.
            </p>
            <p>
              Our custom-designed video entry systems provide secure access to buildings and premises, with a wide
              range of products to suit any size of application. Simply complete the Video Entry System enquiry form
              and we will contact you and arrange to meet you, discuss your requirements and carry out a survey of
              your property.
            </p>
            <div className="pt-2">
              <CustomPillButton href="/contact?service=video-door-entry-systems" size="md">
                Video Entry System enquiry
              </CustomPillButton>
            </div>
          </FsServiceTextImageSection>
        </FsServiceTextImageSectionGroup>

        <ServiceTechnologyProductsSection
          title="Video entry technology partners"
          description="Manufacturer brands shown are typical partners we work with, confirm current approved product lines with APX on survey."
        >
          <ApxPartnerLogoStrip partners={VIDEO_DOOR_TECH_PARTNERS} variant="light" />
        </ServiceTechnologyProductsSection>

        <div className="border-t border-white/15" />

        <section className="container mx-auto px-6 py-16 lg:py-16">
          <Reveal>
            <h2 className="mb-4 text-left font-title text-3xl font-bold text-white sm:text-4xl">
              Our video entry installations
            </h2>
          </Reveal>
          <Reveal delayMs={70}>
            <p className="mb-8 max-w-2xl text-left text-gray-300">
              Examples of video door entry systems we have installed for customers:
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {VIDEO_DOOR_INSTALLATIONS.map((item, index) => (
              <ServiceItemReveal key={`${item.imageSrc}-${index}`} index={index} className="h-full min-h-0">
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
              </ServiceItemReveal>
            ))}
          </div>
        </section>

        <ServicePageClosingSections
          serviceTitleShort="Video door entry"
          ctaImageSrc={serviceHeroImages.videoDoor}
          ctaHeadline="Upgrade your"
          ctaHeadlineAccent="video entry."
          ctaDescription="Expert design, installation, access-control and gate integration, plus maintenance and upgrades for residential and commercial buildings."
        >
          <CustomPillButton href="/contact?service=video-door-entry-systems" size="md">
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
