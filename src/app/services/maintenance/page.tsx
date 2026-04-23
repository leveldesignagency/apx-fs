"use client"

import Image from "next/image"
import { ServicePageBottomCta } from "@/components/ServicePageBottomCta"
import { CustomPillButton } from "@/components/ui/CustomPillButton"
import { OurCustomers } from "@/components/ServicePageSharedSections"
import { ServicePageHero } from "@/components/ServicePageHero"
import { serviceHeroImages } from "@/lib/serviceHeroImages"
import { FS_SERVICE_SHIMMER_CARD, FS_SERVICE_SHIMMER_CARD_FEATURE } from "@/lib/fsServicePageCards"
import { ApxPartnerLogoStrip } from "@/components/ApxPartnerLogoStrip"
import { APX_PARTNER_LOGO_DIR, type PartnerLogoEntry } from "@/lib/apx-partner-logos"
import { Eye, Bell, Shield, Link2, Smartphone } from "lucide-react"

const videoEntryFeatureCardClass = `${FS_SERVICE_SHIMMER_CARD_FEATURE} transition-transform duration-300 hover:scale-[1.02]`

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

/** Same partner assets as Access Control — shared folder in /public */
const VIDEO_DOOR_TECH_PARTNERS: readonly PartnerLogoEntry[] = [
  { name: "CAME Entrotec", href: "https://www.came.com/uk", logoSrc: `${APX_PARTNER_LOGO_DIR}/logo-entrotec.svg`, size: "lg" },
  { name: "Videx", href: "https://www.videxuk.com/", logoSrc: `${APX_PARTNER_LOGO_DIR}/videx.svg` },
  { name: "CDVI", href: "https://www.cdvi.co.uk/", logoSrc: `${APX_PARTNER_LOGO_DIR}/cdvi.svg` },
  { name: "PAC", href: "https://www.pac.co.uk/", logoSrc: null },
  { name: "Paxton", href: "https://www.paxton-access.co.uk/", logoSrc: `${APX_PARTNER_LOGO_DIR}/paxton-logo.svg` },
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
              We install secure video entry systems for commercial, residential, and multi-tenant environments — from multi-tenant entry panels through to integration with
              access control, CCTV and intruder alarms.
            </p>
            <p>
              We work closely with domestic and commercial customers across London and the Home Counties, from small systems through to large commercial premises, with
              options to suit your building and duty-holder workflows.
            </p>
          </>
        }
      />

      <div className="relative bg-black">
        {heroBridge}

        <section className="container relative z-[1] mx-auto px-6 py-16 lg:py-16">
          <h2 className="mb-10 text-left font-title text-3xl font-bold text-white sm:text-4xl">Video Entry Systems</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { icon: Eye, title: "Check Visitors", text: "See exactly who's at the front door before deciding whether to open it." },
              { icon: Bell, title: "Silent Alerts", text: "Discreetly monitor and report any intruders to the police in real time." },
              { icon: Shield, title: "Prevent Crime", text: "Video recording acts as a visual deterrent to any potential criminals." },
              { icon: Link2, title: "Link Systems", text: "Our systems interface with other security systems and devices you have." },
              { icon: Smartphone, title: "Remote Control", text: "Control the whole system remotely via your tablet or smartphone." },
            ].map(({ icon: Icon, title, text }, i) => (
              <div key={i} className={videoEntryFeatureCardClass}>
                <Icon className="mb-4 h-10 w-10 text-white" strokeWidth={1.75} />
                <h3 className="mb-2 text-left text-xl font-semibold text-white">{title}</h3>
                <p className="text-left text-gray-300">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="border-t border-white/15" />

        <section className="container relative z-[1] mx-auto px-6 py-8 lg:py-10">
          <h2 className="mb-4 text-left font-title text-3xl font-bold text-white sm:text-4xl">Bespoke Video Door Entry Systems</h2>
          <div className="max-w-5xl space-y-4 text-base leading-relaxed text-gray-300 sm:text-lg">
            <p>
              APX has a vast amount of experience in designing and installing high quality and effective video entry systems for businesses, large apartment buildings and homeowners alike. We offer an extensive range of video entry stations with options and styling to cater for all tastes.
            </p>
            <p>
              Established in 1986 we offer our services throughout London and the Home Counties, working alongside architects and consultants, as well as working in conjunction with the Police for customers looking to achieve Secured by Design certification.
            </p>
            <p>
              From simple one-way video door access for the rightful occupants through to multi-caller digital systems restricted to individually authorised personnel, we offer the most advanced video door entry systems on the market.
            </p>
          </div>
        </section>

        <div className="border-t border-white/15" />

        <section className="container mx-auto px-6 py-16 lg:py-16">
          <h2 className="mb-6 text-left font-title text-3xl font-bold text-white sm:text-4xl">The Latest Technology</h2>
          <p className="mb-10 max-w-2xl text-left text-gray-300">
            We are proud to install the latest video entry technology from the world&apos;s leading brands
          </p>
          <ApxPartnerLogoStrip partners={VIDEO_DOOR_TECH_PARTNERS} />
        </section>

        <div className="border-t border-white/15" />

        <section className="container mx-auto px-6 py-16 lg:py-16">
          <h2 className="mb-4 text-left font-title text-3xl font-bold text-white sm:text-4xl">Comprehensive Security Systems</h2>
          <div className="max-w-5xl space-y-4 text-base leading-relaxed text-gray-300 sm:text-lg">
            <p>
              We work closely with building specifiers, architects and our residential customers to understand exactly what they require from the latest video entry systems.
            </p>
            <p>
              The systems we install allow you to see who&apos;s calling directly on your internal TV network or via your tablet or smartphone. We can also integrate the entry system with existing CCTV systems and access control systems to provide a comprehensive, all-round secure and flexible security system.
            </p>
            <p>
              Our custom-designed video entry systems provide secure access to buildings and premises, with a wide range of products to suit any size of application. Simply complete the Video Entry System enquiry form and we will contact you and arrange to meet you, discuss your requirements and carry out a survey of your property.
            </p>
          </div>
        </section>

        <div className="border-t border-white/15" />

        <section className="container mx-auto px-6 py-16 lg:py-16">
          <h2 className="mb-4 text-left font-title text-3xl font-bold text-white sm:text-4xl">Our Video Entry Installations</h2>
          <p className="mb-8 max-w-2xl text-left text-gray-300">
            Examples of video door entry systems that we have installed for our customers:
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {VIDEO_DOOR_INSTALLATIONS.map((item, index) => (
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

        <OurCustomers serviceTitleShort="Video door entry" />

        <ServicePageBottomCta
          imageSrc={serviceHeroImages.videoDoor}
          title="Upgrade your video entry"
          description="Get expert design, installation, and integration with CCTV and access control for residential and commercial buildings."
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
