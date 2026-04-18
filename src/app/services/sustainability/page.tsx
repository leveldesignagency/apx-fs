"use client"

import Image from "next/image"
import Link from "next/link"
import { ServicePageBottomCta } from "@/components/ServicePageBottomCta"
import { CustomPillButton } from "@/components/ui/CustomPillButton"
import { OurCustomers } from "@/components/ServicePageSharedSections"
import { ServicePageHero } from "@/components/ServicePageHero"
import { serviceHeroImages } from "@/lib/serviceHeroImages"
import { FsServiceTextImageSection } from "@/components/FsServiceTextImageSection"
import { FS_SERVICE_SHIMMER_CARD, FS_SERVICE_SHIMMER_CARD_FEATURE } from "@/lib/fsServicePageCards"
import { Shield, CheckCircle, Monitor, Smartphone, Package } from "lucide-react"

const MONITORING_BENEFITS = [
  { icon: Shield, title: "Comprehensive protection", text: "Comprehensive protection for your people and your property 24 hours a day." },
  { icon: Monitor, title: "Central Monitoring", text: "Active monitoring of your installed security services and systems (optional)." },
  { icon: Package, title: "Protect Belongings", text: "Peace of mind that your belongings and cherished items are protected." },
  { icon: Smartphone, title: "Remotely Controlled", text: "Access and control your security system remotely via tablet or smartphone." },
  { icon: CheckCircle, title: "Quality Installation", text: "Our standards ensure a well designed, well installed and reliable security system." },
]

/** Logos: `public/Intruder Alarm/` — URL-encode the space in the folder name.
 *  `logoScaleClass` balances mixed SVG viewBoxes / intrinsic sizes inside a uniform slot. */
const INTRUDER_ALARM_TECHNOLOGY_LOGOS: { name: string; src: string; logoScaleClass?: string }[] = [
  { name: "Honeywell", src: "/Intruder%20Alarm/honeywell-logo-1.svg", logoScaleClass: "scale-[0.82]" },
  { name: "Eaton", src: "/Intruder%20Alarm/eaton-6-1.svg", logoScaleClass: "scale-[0.8]" },
  { name: "Optex", src: "/Intruder%20Alarm/optex-vehicle-sensors-vector-logo.svg", logoScaleClass: "scale-[2.15]" },
  { name: "Texecom", src: "/Intruder%20Alarm/texecom.png", logoScaleClass: "scale-[0.92]" },
]

/** One card per project — avoids duplicate titles when the same site had multiple marketing photos. */
const INTRUDER_ALARM_INSTALLATIONS: { title: string; venue: string; context: string; imageSrc: string }[] = [
  {
    title: "Intruder Alarm Systems for King's College Hospital NHS Trust",
    venue: "King's College Hospital",
    context: "NHS Foundation Trust",
    imageSrc: "/projects/case-studies/kings-college-hospital/case-study-kings-college-hospital-nhs-foundation-trust.jpg",
  },
  {
    title: "Intruder Alarm St Mary Magdalene CoE School",
    venue: "St Mary Magdalene C of E School",
    context: "Greenwich Peninsula, London",
    imageSrc:
      "/projects/case-studies/st-mary-magdalene-school/intruder-alarm-system-st-mary-magdalene-coe-school-exterior.jpg",
  },
  {
    title: "Intruder Alarm Greenwood Centre Camden Council",
    venue: "Greenwood Centre",
    context: "Camden Council",
    imageSrc:
      "/projects/case-studies/camden-council-greenwood-centre/intruder-alarm-greenwood-centre-camden-council-interior.jpg",
  },
]

const monitoringCardClass = `${FS_SERVICE_SHIMMER_CARD_FEATURE} transition-transform duration-300 hover:scale-[1.02]`

/** Public folder: `public/service images/` */
const BESPOKE_INTRUDER_IMAGE_SRC = "/service%20images/black-criminals-wore-head-yarn-gray.png"

const heroBridge = (
  <div
    className="pointer-events-none absolute left-0 right-0 top-0 h-28 sm:h-36"
    style={{
      background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.82) 52%, rgba(0,0,0,1) 100%)",
    }}
    aria-hidden
  />
)

export default function IntruderAlarmSystemsPage() {
  return (
    <div className="service-page-root min-h-screen overflow-x-hidden bg-black text-white">
      <ServicePageHero
        title="Intruder Alarm Systems"
        imageSrc={serviceHeroImages.intruder}
        heroCompliance={["PD 6662", "BS EN 50131"]}
        intro={
          <>
            <p className="mb-4">
              APX installs and maintains intruder alarm systems for commercial and industrial environments, ensuring robust protection and reliable monitoring.
            </p>
            <p>
              Systems can be linked to CCTV, video entry and access control where required. Established in 1986, we offer Grade 2 and Grade 3 installations, monitoring integration
              and NSI-aligned workmanship you can rely on.
            </p>
          </>
        }
      />

      <div className="relative bg-black">
        {heroBridge}

        <section className="container relative z-[1] mx-auto px-6 py-12 lg:py-16">
          <h2 className="mb-10 text-left font-title text-3xl font-bold text-white sm:text-4xl">Constant Protection</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {MONITORING_BENEFITS.map((item, index) => (
              <div key={index} className={monitoringCardClass}>
                <div className="mb-4 text-white">
                  <item.icon className="h-8 w-8" strokeWidth={1.75} />
                </div>
                <h3 className="mb-3 text-left text-xl font-semibold text-white">{item.title}</h3>
                <p className="text-left text-gray-300">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="border-t border-white/15" />

        <section className="container relative z-[1] mx-auto px-6 py-8 lg:py-10">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <div className="min-w-0 max-w-xl lg:max-w-none">
              <h2 className="mb-4 text-left font-title text-3xl font-bold text-white sm:text-4xl">Bespoke Intruder Alarm Systems</h2>
              <h3 className="mb-6 text-left font-title text-2xl font-semibold text-white">Intruder Alarm System Installer London</h3>
              <div className="space-y-4 text-base leading-relaxed text-gray-300 sm:text-lg">
                <p>
                  We are proud to provide all of our customers, whether they are commercial or domestic, with custom-built Intruder Alarm systems to meet their requirements and deliver the peace of mind that a well designed, well installed and reliable security system can bring.
                </p>
                <p>
                  Whether you are a large commercial business or a small domestic property, we can deliver an Intruder Alarm system that conforms to all the required standards. We install Grade 1, Grade 2 and Grade 3 as per insurance requirements and our reputation for designing high quality installations is renowned within the industry.
                </p>
                <p>
                  Simply complete the Intruder Alarm System enquiry form and we will contact you and arrange to meet you, discuss your requirements and carry out a survey of your property.
                </p>
              </div>
              <div className="mt-8">
                <CustomPillButton href="/contact" size="md">
                  Enquiry form
                </CustomPillButton>
              </div>
            </div>

            <div className="relative isolate min-h-[240px] w-full lg:min-h-[320px]">
              <div className="relative h-full min-h-[inherit] w-full overflow-hidden">
                <Image
                  src={BESPOKE_INTRUDER_IMAGE_SRC}
                  alt=""
                  width={800}
                  height={533}
                  className="h-full w-full object-contain object-bottom object-right"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                />
                {/* Black feathering on right and bottom — softens white cut-out into page background */}
                <div
                  className="pointer-events-none absolute inset-0 z-[1]"
                  style={{
                    background: `
                      linear-gradient(to left, rgb(0 0 0) 0%, rgba(0, 0, 0, 0) 42%),
                      linear-gradient(to top, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 38%)
                    `,
                  }}
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </section>

        <div className="border-t border-white/15" />

        <FsServiceTextImageSection title="Commercial & industrial intruder systems" titleId="commercial-intruder-systems-heading">
          <p>
            Commercial and industrial intruder systems are designed and commissioned against recognised UK expectations for insurance-grade detection, signalling and integration — including Grade 2 and Grade 3 systems, PIR and dual-tech detectors, magnetic contacts, shock sensors, panic facilities and monitoring with police response where required.
          </p>
        </FsServiceTextImageSection>

        <div className="border-t border-white/15" />

        <section className="container mx-auto px-6 py-12 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_auto_1fr] lg:items-start lg:gap-0">
            <div className="min-w-0 lg:pr-10">
              <h2 className="mb-6 text-left font-title text-3xl font-bold text-white sm:text-4xl">Standards &amp; compliance alignment</h2>
              <p className="mb-4 text-left text-sm font-semibold uppercase tracking-wide text-white/55">
                Intruder alarm systems alignment
              </p>
              <ul className="space-y-4">
                {[
                  "PD 6662 — scheme document for application of European standards for intruder alarms",
                  "BS EN 50131 — intruder and hold-up alarm systems",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3 text-left text-gray-300">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-white/50" strokeWidth={2} />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-gray-400">
                Typical deliverables include system design proposals, commissioning certificates and user training — aligned with the structured capability lists on our{" "}
                <Link href="/services/security-systems" className="text-white underline decoration-white/30 underline-offset-2 hover:decoration-white">
                  security systems
                </Link>{" "}
                overview.
              </p>
            </div>
            <div
              className="hidden w-px shrink-0 self-stretch bg-white/15 lg:block"
              aria-hidden
            />
            <div className="min-w-0 border-t border-white/15 pt-10 lg:border-t-0 lg:pl-10 lg:pt-0">
              <h2 className="mb-6 text-left font-title text-3xl font-bold text-white sm:text-4xl">Deliverables &amp; lifecycle</h2>
              <ul className="space-y-4">
                {[
                  "Survey-led design proposals and graded system options",
                  "Installation, commissioning certificates and user training",
                  "ARC signalling and police response set-up where required",
                  "Planned maintenance and system upgrades",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-left text-gray-300">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-white/50" strokeWidth={2} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-gray-400">
                Integrated packages often include CCTV — see our{" "}
                <Link href="/services/electrical-systems" className="text-white underline decoration-white/30 underline-offset-2 hover:decoration-white">
                  CCTV systems
                </Link>{" "}
                overview.
              </p>
            </div>
          </div>
        </section>

        <div className="border-t border-white/15" />

        <FsServiceTextImageSection title="External Intruder Alarm Protection" titleId="external-intruder-protection-heading">
          <p>
            We have installed a number of high quality external intruder protection systems but due to the confidential nature of the properties, the type of system installed and the areas they protect, we can only show a limited number of images.
          </p>
          <p>
            A recent installation that we carried out in a residential London property featured black external laser detectors as shown in the images alongside. The laser-based security creates virtual curtains and surveillance security zones that offer the highest levels of precision for accurate and reliable intrusion detection.
          </p>
          <p>
            Laser-based detection systems such as this are ideal for securing open sites and are a great option for perimeter protection, intrusion detection, for alerting you to pedestrian and vehicle access and for protection against theft and vandalism. Simply contact us to learn more about how we can help you to secure your property.
          </p>
        </FsServiceTextImageSection>

        <div className="border-t border-white/15" />

        <section className="container relative mx-auto px-6 py-12 lg:px-8 lg:py-16">
          <h2 id="intruder-alarm-technology-heading" className="mb-2 text-left font-title text-3xl font-bold text-white sm:text-4xl">
            Intruder Alarm Technology
          </h2>
          <p className="mb-10 max-w-2xl text-left text-gray-300">
            We are proud to install the latest intruder alarm technology from the world&apos;s leading brands.
          </p>
          <p className="mb-6 text-left text-sm font-semibold uppercase tracking-wide text-white/55">Leading brands</p>
          <div className="grid grid-cols-2 items-center justify-items-center gap-x-6 gap-y-10 sm:grid-cols-3 sm:gap-x-8 lg:grid-cols-5 lg:gap-x-6">
            {INTRUDER_ALARM_TECHNOLOGY_LOGOS.map(({ name, src, logoScaleClass }) => (
              <div
                key={name}
                className="flex w-full max-w-[11rem] items-center justify-center justify-self-center sm:max-w-[12rem]"
              >
                <div className="relative flex h-[4.25rem] w-full items-center justify-center overflow-visible sm:h-[4.5rem]">
                  <div
                    className={`relative flex h-full w-full max-h-[3.25rem] max-w-[10.5rem] origin-center items-center justify-center sm:max-h-[3.5rem] sm:max-w-[11.5rem] ${logoScaleClass ?? ""}`}
                  >
                    <Image
                      src={src}
                      alt={`${name} logo`}
                      width={220}
                      height={88}
                      sizes="(max-width: 640px) 42vw, 200px"
                      className="h-full w-auto max-h-full max-w-full object-contain object-center opacity-90"
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="col-span-2 flex h-[4.25rem] w-full max-w-[11rem] items-center justify-center justify-self-center rounded-lg border border-white/25 bg-white/[0.03] sm:col-span-1 sm:h-[4.5rem] sm:max-w-[12rem]">
              <span className="font-title text-lg font-semibold tracking-wide text-white sm:text-xl">CQR</span>
            </div>
          </div>
        </section>

        <div className="border-t border-white/15" />

        <section className="container mx-auto px-6 py-12 lg:py-16">
          <h2 className="mb-4 text-left font-title text-3xl font-bold text-white sm:text-4xl">Our Intruder Alarm System Installations</h2>
          <p className="mb-8 max-w-2xl text-left text-gray-300">Examples of intruder alarm systems that we have installed for our customers:</p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {INTRUDER_ALARM_INSTALLATIONS.map((item) => (
              <article key={item.title} className={`${FS_SERVICE_SHIMMER_CARD} overflow-hidden p-0`}>
                <div className="relative aspect-[4/3] w-full bg-white/5">
                  <Image
                    src={item.imageSrc}
                    alt={item.title}
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

        <OurCustomers serviceTitleShort="Intruder alarm" />

        <ServicePageBottomCta
          imageSrc={serviceHeroImages.intruder}
          title="Ready to secure your property?"
          description="Book a free intruder alarm survey or speak to our team about design, installation, and monitoring."
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
