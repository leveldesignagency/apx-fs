"use client"

import { ServicePageBottomCta } from "@/components/ServicePageBottomCta"
import { OurCustomers } from "@/components/ServicePageSharedSections"
import { CustomPillButton } from "@/components/ui/CustomPillButton"
import { ServicePageHero } from "@/components/ServicePageHero"
import { serviceHeroImages } from "@/lib/serviceHeroImages"
import { Target, Calendar, Users, CheckCircle, ArrowRight, BarChart3, Shield } from "lucide-react"

const cardClass =
  "rounded-tl-[1.5rem] rounded-br-[1.5rem] border-2 border-white/20 bg-black p-8 text-white transition-colors hover:border-white/45"

export default function ProjectManagementPage() {
  return (
    <div className="service-page-root min-h-screen overflow-x-hidden bg-black text-white">
      <ServicePageHero
        title="Project management"
        imageSrc={serviceHeroImages.cctv}
        intro="We deliver fire and security projects on time, on budget, and to the highest standards. Our project managers coordinate design, installation, commissioning, and handover so your fire safety, CCTV, access control, and emergency lighting systems are delivered seamlessly."
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
          <h2 className="mb-10 text-left font-title text-3xl font-bold text-white sm:text-4xl">Fire & security project management</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Target className="h-8 w-8" strokeWidth={1.75} />,
                title: "Project planning",
                description: "Scope, programme, and resource planning for fire and security installations and upgrades.",
              },
              {
                icon: <Calendar className="h-8 w-8" strokeWidth={1.75} />,
                title: "Schedule & coordination",
                description: "Phased delivery, milestone tracking, and coordination with building and MEP contractors.",
              },
              {
                icon: <Users className="h-8 w-8" strokeWidth={1.75} />,
                title: "Stakeholder management",
                description: "Clear communication with clients, facilities teams, and enforcing authorities.",
              },
              {
                icon: <BarChart3 className="h-8 w-8" strokeWidth={1.75} />,
                title: "Budget & reporting",
                description: "Cost control, variations, and regular reporting so projects stay on budget.",
              },
              {
                icon: <CheckCircle className="h-8 w-8" strokeWidth={1.75} />,
                title: "Quality & compliance",
                description: "Quality checks and compliance documentation for handover and certification.",
              },
              {
                icon: <ArrowRight className="h-8 w-8" strokeWidth={1.75} />,
                title: "Handover & training",
                description: "Commissioning, as-built documentation, and user training for new systems.",
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
          <h2 className="mb-10 text-left font-title text-3xl font-bold text-white sm:text-4xl">Project types we manage</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "New build fire & security",
                description: "Full fire detection, CCTV, access control, and emergency lighting for new commercial and residential buildings.",
                icon: <Shield className="h-8 w-8" strokeWidth={1.75} />,
              },
              {
                title: "Refurbishment & retrofit",
                description: "Upgrading existing premises with modern fire alarms, CCTV, and access control to meet current standards.",
                icon: <Calendar className="h-8 w-8" strokeWidth={1.75} />,
              },
              {
                title: "Multi-site rollouts",
                description: "Coordinated installation and commissioning of fire and security systems across multiple locations.",
                icon: <BarChart3 className="h-8 w-8" strokeWidth={1.75} />,
              },
              {
                title: "System replacements",
                description: "Phased replacement of legacy fire and security systems with minimal disruption to operations.",
                icon: <CheckCircle className="h-8 w-8" strokeWidth={1.75} />,
              },
              {
                title: "Integration projects",
                description: "Unified fire, security, and building management systems with single-panel control and reporting.",
                icon: <Target className="h-8 w-8" strokeWidth={1.75} />,
              },
              {
                title: "Compliance & remediation",
                description: "Projects to bring premises up to current fire safety and security standards following audits.",
                icon: <ArrowRight className="h-8 w-8" strokeWidth={1.75} />,
              },
            ].map((project, index) => (
              <div key={index} className={cardClass}>
                <div className="mb-4 text-white">{project.icon}</div>
                <h3 className="mb-3 text-left text-xl font-semibold text-white">{project.title}</h3>
                <p className="text-left text-gray-300">{project.description}</p>
              </div>
            ))}
          </div>
        </section>

        <OurCustomers />

        <ServicePageBottomCta
          imageSrc={serviceHeroImages.cctv}
          title="Ready to start your fire & security project?"
          description="From single-system installs to full building fire and security packages, we can plan and deliver your project on time and to the right standards."
        >
          <CustomPillButton href="/contact" size="md">
            Discuss your project
          </CustomPillButton>
          <CustomPillButton href="tel:02083032280" size="md" variant="outline">
            Call 020 8303 2280
          </CustomPillButton>
        </ServicePageBottomCta>
      </div>
    </div>
  )
}
