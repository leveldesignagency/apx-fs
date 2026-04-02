"use client"

import { ServicePageBottomCta } from "@/components/ServicePageBottomCta"
import { CustomPillButton } from "@/components/ui/CustomPillButton"
import { OurCustomers } from "@/components/ServicePageSharedSections"
import { ServicePageHero } from "@/components/ServicePageHero"
import { serviceHeroImages } from "@/lib/serviceHeroImages"
import { Video, Shield, Monitor, CheckCircle, ArrowRight, Smartphone } from "lucide-react"

const cardClass =
  "rounded-tl-[1.5rem] rounded-br-[1.5rem] border-2 border-white/20 bg-black p-8 text-white transition-colors hover:border-white/45"

export default function CctvSecurityPage() {
  return (
    <div className="service-page-root min-h-screen overflow-x-hidden bg-black text-white">
      <ServicePageHero
        title="CCTV systems"
        imageSrc={serviceHeroImages.cctv}
        intro="We offer the latest in CCTV technology, specialising in the design and installation of high performance CCTV systems that meet your requirements. Choosing the right CCTV system and having it professionally installed will provide you with superior results and will save you time and money in the long run."
      />

      <div className="relative bg-black">
        <div
          className="pointer-events-none absolute top-0 left-0 right-0 h-28 sm:h-36"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.82) 52%, rgba(0,0,0,1) 100%)",
          }}
          aria-hidden
        />

        <section className="container relative z-[1] mx-auto px-6 py-12 lg:py-16">
          <h2 className="mb-10 text-left font-title text-3xl font-bold text-white sm:text-4xl">Our CCTV systems</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Video className="h-8 w-8" strokeWidth={1.75} />,
                title: "CCTV systems",
                description: "HD and 4K IP cameras, NVR/DVR solutions, and remote viewing for round-the-clock surveillance.",
              },
              {
                icon: <Shield className="h-8 w-8" strokeWidth={1.75} />,
                title: "Intruder alarms",
                description: "Wired and wireless intruder alarm systems with NSI-approved monitoring and police response.",
              },
              {
                icon: <Monitor className="h-8 w-8" strokeWidth={1.75} />,
                title: "Remote monitoring",
                description: "24/7 alarm receiving and video monitoring with rapid response and keyholder escalation.",
              },
              {
                icon: <Smartphone className="h-8 w-8" strokeWidth={1.75} />,
                title: "Mobile access",
                description: "View live and recorded footage from smartphones and tablets, with push notifications.",
              },
              {
                icon: <CheckCircle className="h-8 w-8" strokeWidth={1.75} />,
                title: "Maintenance & support",
                description: "Scheduled servicing, health checks, and fault response to keep systems reliable.",
              },
              {
                icon: <ArrowRight className="h-8 w-8" strokeWidth={1.75} />,
                title: "Integration",
                description: "CCTV and alarms integrated with access control and fire systems for a single security platform.",
              },
            ].map((service, index) => (
              <div key={index} className={`${cardClass} transition-transform duration-300 hover:scale-[1.02]`}>
                <div className="mb-4 text-white">{service.icon}</div>
                <h3 className="mb-3 text-left text-xl font-semibold text-white">{service.title}</h3>
                <p className="text-left text-gray-300">{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="border-t border-white/15" />

        <section className="container mx-auto px-6 py-12 lg:py-16">
          <h2 className="mb-10 text-left font-title text-3xl font-bold text-white sm:text-4xl">Standards & compliance</h2>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h3 className="mb-6 text-left text-2xl font-semibold text-white">Certifications</h3>
              <ul className="space-y-4">
                {["NSI approved installers", "SSAIB certification", "BS EN 50131 compliant systems", "GDPR-compliant data handling"].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-left text-gray-300">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-white/50" strokeWidth={2} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-6 text-left text-2xl font-semibold text-white">What we offer</h3>
              <ul className="space-y-4">
                {["Site survey and system design", "Installation and commissioning", "User training and handover", "Ongoing maintenance and monitoring"].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-left text-gray-300">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-white/50" strokeWidth={2} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <OurCustomers />

        <ServicePageBottomCta
          imageSrc={serviceHeroImages.cctv}
          title="Need CCTV or intruder alarm systems?"
          description="Our security specialists can survey your site and recommend the right CCTV and alarm solution for your premises and budget."
        >
          <CustomPillButton href="/contact" size="md">
            Get free consultation
          </CustomPillButton>
          <CustomPillButton href="tel:02045685986" size="md" variant="outline">
            Call 020 4568 5986
          </CustomPillButton>
        </ServicePageBottomCta>
      </div>
    </div>
  )
}
