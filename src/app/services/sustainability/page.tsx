"use client"

import { ServicePageBottomCta } from "@/components/ServicePageBottomCta"
import { CustomPillButton } from "@/components/ui/CustomPillButton"
import { OurCustomers } from "@/components/ServicePageSharedSections"
import { ServicePageHero } from "@/components/ServicePageHero"
import { serviceHeroImages } from "@/lib/serviceHeroImages"
import { Shield, CheckCircle, Monitor, Smartphone, Package } from "lucide-react"

const MONITORING_BENEFITS = [
  { icon: Shield, title: "Comprehensive protection", text: "Comprehensive protection for your people and your property 24 hours a day." },
  { icon: Monitor, title: "Central Monitoring", text: "Active monitoring of your installed security services and systems (optional)." },
  { icon: Package, title: "Protect Belongings", text: "Peace of mind that your belongings and cherished items are protected." },
  { icon: Smartphone, title: "Remotely Controlled", text: "Access and control your security system remotely via tablet or smartphone." },
  { icon: CheckCircle, title: "Quality Installation", text: "Our standards ensure a well designed, well installed and reliable security system." },
]

const BRANDS = ["CQR", "Honeywell", "Eaton", "Optex", "Texecom"]

const INSTALLATIONS = [
  { title: "Intruder Alarm Systems for King's College Hospital NHS Trust", org: "King's College Hospital NHS Foundation Trust" },
  { title: "Intruder Alarm St Mary Magdalene CoE School", org: "St Mary Magdalene C of E School, Greenwich Peninsula, London" },
  { title: "Intruder Alarm Greenwood Centre Camden Council", org: "Greenwood Centre, Camden Council" },
]

const cardClass =
  "rounded-tl-[1.5rem] rounded-br-[1.5rem] border-2 border-white/20 bg-black p-8 text-white transition-colors hover:border-white/45"

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
        intro={
          <>
            <p className="mb-4">
              Expertly designed to protect anything from a one bedroom apartment through to fully monitored emergency response systems covering multi-occupancy offices.
            </p>
            <p>
              APX Fire & Security specialise in the design and installation of high-performance Intruder Alarm systems that can also be linked to other systems such as CCTV, Video Entry and Access Control systems. Established in 1986, our vast experience in the industry means we offer the very best and latest in Intruder Alarm technology that you can rely on.
            </p>
          </>
        }
      />

      <div className="relative bg-black">
        {heroBridge}

        <section className="container relative z-[1] mx-auto max-w-4xl px-6 py-12 lg:py-16">
          <h2 className="mb-4 text-left font-title text-3xl font-bold text-white sm:text-4xl">Intruder Alarm System Installer London</h2>
          <h3 className="mb-6 text-left font-title text-2xl font-semibold text-white">Bespoke Intruder Alarm Systems</h3>
          <div className="space-y-4 text-lg leading-relaxed text-gray-300">
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
        </section>

        <div className="border-t border-white/15" />

        <section className="container mx-auto max-w-4xl px-6 py-12 lg:py-16">
          <h2 className="mb-8 text-left font-title text-3xl font-bold text-white sm:text-4xl">Why use APX Fire & Security?</h2>
          <div className="space-y-4 text-lg leading-relaxed text-gray-300">
            <p>
              Established in 1986 we have vast experience in this sector and have installed a wide variety of systems during this time. After each survey that we carry out, every one of our intruder alarm installations is individually designed to suit the specific requirements of our customers, whether they are domestic, industrial or commercial properties.
            </p>
            <p>
              All of our systems meet the relevant standards and can be enhanced with Police Response via our dedicated Alarm Receiving Centre (ARC) if this is required. We can also offer the option of a fully integrated system that can be connected to your CCTV, access control or video door entry systems.
            </p>
            <p>
              With technology constantly evolving in all areas of security we ensure that our installers are regularly trained to maintain the highest levels of skills and product knowledge to provide our customers. We are also proud to be NSI Gold standard installers.
            </p>
          </div>
        </section>

        <div className="border-t border-white/15" />

        <section className="container mx-auto px-6 py-12 lg:py-16">
          <h2 className="mb-2 text-left font-title text-3xl font-bold text-white sm:text-4xl">Intruder Alarm Monitoring Company</h2>
          <p className="mb-10 text-left text-xl font-semibold text-white">Constant Protection</p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {MONITORING_BENEFITS.map((item, index) => (
              <div key={index} className={`${cardClass} transition-transform duration-300 hover:scale-[1.02]`}>
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

        <section className="container mx-auto max-w-4xl px-6 py-12 lg:py-16">
          <h2 className="mb-8 text-left font-title text-3xl font-bold text-white sm:text-4xl">External Intruder Alarm Protection</h2>
          <div className="space-y-4 text-lg leading-relaxed text-gray-300">
            <p>
              We have installed a number of high quality external intruder protection systems but due to the confidential nature of the properties, the type of system installed and the areas they protect, we can only show a limited number of images.
            </p>
            <p>
              A recent installation that we carried out in a residential London property featured black external laser detectors as shown in the images alongside. The laser-based security creates virtual curtains and surveillance security zones that offer the highest levels of precision for accurate and reliable intrusion detection.
            </p>
            <p>
              Laser-based detection systems such as this are ideal for securing open sites and are a great option for perimeter protection, intrusion detection, for alerting you to pedestrian and vehicle access and for protection against theft and vandalism. Simply contact us to learn more about how we can help you to secure your property.
            </p>
          </div>
        </section>

        <div className="border-t border-white/15" />

        <section className="container mx-auto px-6 py-12 lg:py-16">
          <h2 className="mb-2 text-left font-title text-3xl font-bold text-white sm:text-4xl">Intruder Alarm Technology</h2>
          <p className="mb-8 max-w-2xl text-left text-gray-300">
            We are proud to install the latest intruder alarm technology from the world&apos;s leading brands
          </p>
          <div className="flex flex-wrap items-center gap-8 sm:gap-12">
            {BRANDS.map((name, i) => (
              <div key={i} className="rounded-lg border border-white/20 px-6 py-3 font-semibold text-white">
                {name}
              </div>
            ))}
          </div>
        </section>

        <div className="border-t border-white/15" />

        <section className="container mx-auto px-6 py-12 lg:py-16">
          <h2 className="mb-4 text-left font-title text-3xl font-bold text-white sm:text-4xl">Our Intruder Alarm System Installations</h2>
          <p className="mb-8 max-w-2xl text-left text-gray-300">Examples of intruder alarm systems that we have installed for our customers:</p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {INSTALLATIONS.map((item, index) => (
              <div
                key={index}
                className="rounded-tl-[1.5rem] rounded-br-[1.5rem] border-2 border-white/20 bg-black p-8 text-white transition-colors hover:border-white/45"
              >
                <h3 className="mb-2 text-lg font-semibold text-white">{item.title}</h3>
                <p className="text-gray-300">{item.org}</p>
              </div>
            ))}
          </div>
        </section>

        <OurCustomers />

        <ServicePageBottomCta
          imageSrc={serviceHeroImages.intruder}
          title="Ready to secure your property?"
          description="Book a free intruder alarm survey or speak to our team about design, installation, and monitoring."
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
