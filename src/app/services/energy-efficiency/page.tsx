"use client"

import { ServicePageBottomCta } from "@/components/ServicePageBottomCta"
import { CustomPillButton } from "@/components/ui/CustomPillButton"
import { OurCustomers } from "@/components/ServicePageSharedSections"
import { ServicePageHero } from "@/components/ServicePageHero"
import { serviceHeroImages } from "@/lib/serviceHeroImages"
import { ApxPartnerLogoStrip } from "@/components/ApxPartnerLogoStrip"
import { APX_PARTNER_LOGO_DIR, type PartnerLogoEntry } from "@/lib/apx-partner-logos"
import {
  Key,
  Shield,
  Clock,
  Users,
  DoorOpen,
  Flame,
  ShieldCheck,
  Cpu,
  ClipboardList,
  CalendarClock,
  type LucideIcon,
} from "lucide-react"

const cardClass =
  "rounded-tl-[1.5rem] rounded-br-[1.5rem] border-2 border-white/20 bg-black p-6 text-white transition-colors hover:border-white/45"

const benefitDetailCardClass =
  "flex h-full flex-col gap-4 rounded-tl-[1.25rem] rounded-br-[1.25rem] border border-white/18 bg-[linear-gradient(145deg,rgba(255,255,255,0.07)_0%,rgba(0,0,0,0.4)_100%)] p-6 sm:p-7"

const ACCESS_CONTROL_PARTNERS: readonly PartnerLogoEntry[] = [
  { name: "TDSi", href: "https://www.tdsi.co.uk/", logoSrc: `${APX_PARTNER_LOGO_DIR}/tdsi.svg`, size: "lg" },
  { name: "CAME Entrotec", href: "https://www.came.com/uk", logoSrc: `${APX_PARTNER_LOGO_DIR}/logo-entrotec.svg`, size: "lg" },
  { name: "PAC", href: "https://www.pac.co.uk/", logoSrc: null },
  { name: "ASSA ABLOY", href: "https://www.assaabloy.com/", logoSrc: `${APX_PARTNER_LOGO_DIR}/assa-abloy-access-blue-logo.svg` },
  { name: "Videx", href: "https://www.videxuk.com/", logoSrc: null },
  { name: "CDVI", href: "https://www.cdvi.co.uk/", logoSrc: `${APX_PARTNER_LOGO_DIR}/cdvi.svg` },
]

const ACCESS_CONTROL_BENEFIT_DETAILS: { Icon: LucideIcon; title: string; body: string }[] = [
  {
    Icon: Key,
    title: "No hassle with traditional keys",
    body:
      "Traditional keys require extra work and can pose several security threats. For example, if a key holder loses their key, you may have to change all the locks to maintain the security of the building, which would incur a substantial cost.",
  },
  {
    Icon: DoorOpen,
    title: "Give employees the freedom to come and go",
    body:
      "With keyed systems, security staff will sometimes have to start early to unlock doors or stay late to lock up. With access control systems, it is easier to give everyone a programmed card, offering employees more flexibility in their schedules, removing the need for additional staff to allow access.",
  },
  {
    Icon: Flame,
    title: "Safe working environment",
    body:
      "Keep your employees safe in the case of an emergency. Doors locked with keys can be unsafe if a fire or other emergency requires a quick escape. With access control system fail safe locks, the doors will automatically unlock so all people can exit a building without having to waste time searching for their keys.",
  },
  {
    Icon: ShieldCheck,
    title: "Keep unwanted visitors out",
    body:
      "Access control systems make it less likely that an unwanted visitor will enter your facility. If every door requires credentials before it unlocks, you will know everyone in the building is authorised to be there. Unlike key systems, access control systems allow you to deactivate an access card and assign a new one. No need to change locks or issue new keys to everyone.",
  },
  {
    Icon: Cpu,
    title: "Advanced automation",
    body:
      "Our fully networked access control installations offer advanced features such as automatic time and attendance reports linked to payroll.",
  },
  {
    Icon: ClipboardList,
    title: "Keep track of who enters the facility",
    body:
      "Another benefit of access control systems is that you can keep track of who is coming and going. In the event of a security incident, you will be able to see exactly who swiped their card to access a specific area.",
  },
  {
    Icon: CalendarClock,
    title: "Set specialised access parameters",
    body:
      "Unlike keyed systems, access control systems allow you to grant access to certain people on specific days and times. You can programme any door or any card to meet your exact needs.",
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
        title="Access Control Systems"
        imageSrc={serviceHeroImages.accessControl}
        intro={
          <>
            <p className="mb-4">
              Uniquely designed for each client, whatever the size. From simple stand-alone systems to fully networked installations.
            </p>
            <p>
              APX Fire & Security offer the best and latest in Access Control technology, from large commercial properties through to small domestic properties and everything in between. We specialise in the design and installation of high-performance access systems that provide our customers with superior results, peace of mind and unrivaled after-sales support.
            </p>
          </>
        }
      />

      <div className="relative bg-black">
        {heroBridge}

        <section className="container relative z-[1] mx-auto px-6 py-8 lg:py-10">
          <h2 className="mb-4 text-left font-title text-3xl font-bold text-white sm:text-4xl">Bespoke Access Control Systems</h2>
          <div className="max-w-5xl space-y-4 text-base leading-relaxed text-gray-300 sm:text-lg">
            <p>
              We have a vast amount of experience in designing high quality and effective access control systems for business and homeowners alike. Established in 1986 we work throughout London and the Home Counties, in all market sectors, ranging from single doors through to fully networked systems that integrate with intruder alarms and CCTV systems.
            </p>
            <p>
              Working alongside architects and consultants, we design systems to meet and exceed our clients expectations, ensuring our electronic access control systems provide the most efficient and convenient way of securing your building and assets.
            </p>
            <p>
              Simply complete the Access Control System enquiry form and we will contact you and arrange to meet you, discuss your requirements and carry out a survey of your property.
            </p>
          </div>
        </section>

        <div className="border-t border-white/15" />

        <section className="container mx-auto px-6 py-12 lg:py-16">
          <h2 className="mb-10 text-left font-title text-3xl font-bold text-white sm:text-4xl">Benefits of Access Control Systems</h2>
          <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Key, title: "No Keys", text: "No more lost keys or expensive replacement locks to worry about." },
              { icon: Users, title: "Monitor Access", text: "Control who comes and goes and record when they access." },
              { icon: Shield, title: "Better Security", text: "Less likely that unwanted visitors will enter your facility." },
              { icon: Clock, title: "24 Hour Access", text: "Avoid security staff having to unlock doors or stay late to lock up." },
            ].map(({ icon: Icon, title, text }, i) => (
              <div key={i} className={cardClass}>
                <Icon className="mb-4 h-10 w-10 text-white" strokeWidth={1.75} />
                <h3 className="mb-2 text-left text-xl font-semibold text-white">{title}</h3>
                <p className="text-left text-gray-300">{text}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
            {ACCESS_CONTROL_BENEFIT_DETAILS.map(({ Icon, title, body }, i) => (
              <article key={i} className={benefitDetailCardClass}>
                <div className="flex items-start gap-4">
                  <Icon
                    className="mt-0.5 h-6 w-6 shrink-0 text-white/80 sm:h-7 sm:w-7"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-3 text-left font-title text-xl font-semibold leading-snug tracking-tight text-white sm:text-[1.35rem]">
                      {title}
                    </h3>
                    <p className="text-left text-base leading-relaxed text-gray-300">{body}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

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
          <h2 className="mb-10 text-left font-title text-3xl font-bold text-white sm:text-4xl">Our Access Control System Installations</h2>
          <p className="mb-8 max-w-2xl text-left text-gray-300">
            Examples of the Access Control Systems that we have installed for our customers:
          </p>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Mayfair Townhouse", subtitle: "Luxury Lifestyle Hotel, London" },
              { title: "Scape Bloomsbury", subtitle: "Student Accommodation" },
              { title: "John Keats Primary School", subtitle: "Rotherhithe, London" },
              { title: "Ledian Farm", subtitle: "Retirement Village, Kent" },
              { title: "United Living Welbourne", subtitle: "Apartment Block" },
              { title: "Aspire Herschel Street", subtitle: "Apartment Block" },
            ].map((project, i) => (
              <div key={i} className="overflow-hidden rounded-tl-[1.5rem] rounded-br-[1.5rem] border-2 border-white/20 bg-black">
                <div className="flex aspect-video items-center justify-center bg-white/5">
                  <span className="text-sm text-gray-400">Image placeholder</span>
                </div>
                <div className="p-6">
                  <h3 className="mb-1 text-xl font-semibold text-white">{project.title}</h3>
                  <p className="text-gray-300">{project.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <OurCustomers />

        <ServicePageBottomCta
          imageSrc={serviceHeroImages.accessControl}
          title="Talk to us about access control"
          description="From single doors to fully networked sites, we design and install access systems to suit your building and operations."
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
