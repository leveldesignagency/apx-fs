"use client"

import Link from "next/link"
import { ServiceComplianceSection } from "@/components/ServiceComplianceSection"
import { ServicePageClosingSections } from "@/components/ServicePageClosingSections"
import { CustomPillButton } from "@/components/ui/CustomPillButton"
import { ServicePageHero } from "@/components/ServicePageHero"
import { Reveal } from "@/components/Reveal"
import { ServiceItemReveal } from "@/components/ServiceItemReveal"
import { ServiceFeatureIconCard } from "@/components/ServiceFeatureIconCard"
import { FsServiceTextImageSection } from "@/components/FsServiceTextImageSection"
import { FsServiceTextImageSectionGroup } from "@/components/FsServiceTextImageSectionGroup"
import { serviceHeroImages } from "@/lib/serviceHeroImages"
import { FS_SERVICE_ROUTES } from "@/lib/fs-service-routes"
import {
  AlertTriangle,
  Car,
  ClipboardCheck,
  Fence,
  Shield,
  Wrench,
} from "lucide-react"

const cardClass =
  "rounded-tl-[1.5rem] rounded-br-[1.5rem] border-2 border-white/20 bg-black p-8 text-white transition-colors hover:border-white/45"

const linkClass =
  "underline decoration-white/40 underline-offset-[3px] transition-colors hover:decoration-white"

const heroBridge = (
  <div
    className="pointer-events-none absolute left-0 right-0 top-0 h-28 sm:h-36"
    style={{
      background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.82) 52%, rgba(0,0,0,1) 100%)",
    }}
    aria-hidden
  />
)

export default function GateAutomationSystemsPage() {
  return (
    <div className="service-page-root min-h-screen overflow-x-hidden bg-black text-white">
      <ServicePageHero
        title="Gate, Barrier &amp; Bollard Automation"
        imageSrc={serviceHeroImages.gateAutomation}
        heroCompliance={["Gate Safe trained", "BS EN 12453"]}
        intro={
          <>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-white/70">
              Installation · Servicing · Repairs · Maintenance · Safety &amp; Compliance
            </p>
            <p className="mb-4">
              Our gate automation team is made up of Gate Safe trained engineers who install, repair, service and maintain
              automated gates, barriers and bollards from leading brands including Roger Technology, BFT, CAME, FAAC and Nice.
            </p>
            <p>
              We work across London and the Home Counties on domestic and commercial entrances, with the same focus on safe
              installation, correct commissioning and ongoing maintenance.
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
              Full lifecycle support for powered gates, barriers and bollards: new installs, servicing, repairs and planned
              maintenance, with safety devices and compliance front of mind on every survey.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                Icon: Fence,
                title: "Gates, barriers & bollards",
                description:
                  "Automated swing and sliding gates, vehicle barriers and bollards specified for the entrance, duty cycle and site conditions.",
                id: "gate-swing-sliding",
              },
              {
                Icon: Wrench,
                title: "Install, service & repair",
                description:
                  "Gate Safe trained engineers for new installations, servicing, fault-finding and repairs across Roger Technology, BFT, CAME, FAAC and Nice systems.",
                id: "gate-install-service",
              },
              {
                Icon: ClipboardCheck,
                title: "Maintenance programmes",
                description:
                  "Planned maintenance so powered entrances stay reliable, and so managed or commercial sites can evidence regular upkeep.",
                id: "gate-maintenance",
              },
              {
                Icon: Shield,
                title: "Safety devices",
                description:
                  "Photocells, safety edges and related protective devices configured so the installation is safe for users and the public.",
                id: "gate-safety",
              },
              {
                Icon: Car,
                title: "Vehicle entrance control",
                description:
                  "Barriers and gate lines for car parks, yards and shared residential entrances, coordinated with how traffic actually moves on site.",
                id: "gate-barriers",
              },
              {
                Icon: AlertTriangle,
                title: "Risk recognition",
                description:
                  "We look for compliance issues, crushing and dragging points, inadequate safety devices and incorrectly installed equipment before they become incidents.",
                id: "gate-risks",
              },
            ].map(({ Icon, title, description, id }, index) => (
              <ServiceItemReveal key={title} index={index} className="h-full min-h-0">
                <ServiceFeatureIconCard
                  id={id}
                  icon={Icon}
                  title={title}
                  description={description}
                  shellClassName={cardClass}
                  className="transition-transform duration-300 hover:scale-[1.02]"
                />
              </ServiceItemReveal>
            ))}
          </div>
        </section>

        <section className="relative z-[1] border-y border-white/20 bg-white/[0.03] py-16 lg:py-24">
          <div className="container mx-auto px-6">
            <Reveal>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
                Site survey focus
              </p>
              <h2 className="mb-3 max-w-3xl text-left font-title text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
                Risks we look for
              </h2>
            </Reveal>
            <Reveal delayMs={60}>
              <p className="mb-10 max-w-2xl text-left text-base text-white/70 sm:mb-14 sm:text-lg">
                We pride ourselves on recognising potential risks early, including:
              </p>
            </Reveal>
            <ul className="grid grid-cols-1 divide-y divide-white/25 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
              {[
                "Compliance issues",
                "Crushing and dragging points",
                "Inadequate safety devices",
                "Incorrectly installed equipment",
              ].map((item, i) => (
                <li
                  key={item}
                  className={[
                    "flex flex-col gap-5 py-8 sm:min-h-[11rem] sm:border-t sm:border-white/25 sm:py-10",
                    i === 0 ? "sm:pr-6 lg:pl-0 lg:pr-8" : "",
                    i === 1 ? "sm:border-l sm:border-white/25 sm:pl-6 sm:pr-0 lg:border-l lg:px-8" : "",
                    i === 2 ? "sm:pr-6 lg:border-l lg:border-white/25 lg:px-8" : "",
                    i === 3 ? "sm:border-l sm:border-white/25 sm:pl-6 lg:border-l lg:pl-8 lg:pr-0" : "",
                  ].join(" ")}
                >
                  <Reveal delayMs={80 + i * 50}>
                    <span className="block font-title text-sm font-semibold tracking-[0.2em] text-white/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-4 block font-title text-2xl font-bold leading-tight text-white sm:text-[1.75rem] lg:text-[1.85rem]">
                      {item}
                    </span>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <FsServiceTextImageSectionGroup>
          <FsServiceTextImageSection
            title="Did you know?"
            titleId="gate-did-you-know-heading"
            imageSrc={serviceHeroImages.gateAutomation}
            imageAlt="Automated gate and barrier entrance"
          >
            <p>
              As a homeowner, you are responsible for ensuring that your electric gate is safe and does not pose a risk to
              your family, visitors, delivery drivers, or members of the public who may come into contact with it.
            </p>
            <p>
              Even though your gate is on private property, if it causes injury you almost certainly will be held legally
              responsible.
            </p>
            <p>
              Powered gates are classed as machines, even in domestic settings. That means they must be safe, legally
              compliant, correctly installed and properly maintained.
            </p>
            <p>
              All automated gates are deemed machinery regardless of the setting, so every installation must comply with
              the Supply of Machinery (Safety) Regulations 2008.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <CustomPillButton href="/contact?service=gate-automation-systems" size="md">
                Arrange a survey
              </CustomPillButton>
            </div>
          </FsServiceTextImageSection>

          <div className="border-t border-white/15" />

          <FsServiceTextImageSection
            title="Managed sites &amp; shared entrances"
            titleId="gate-managed-sites-heading"
            imageSrc={serviceHeroImages.accessControl}
            imageAlt="Controlled vehicle entrance on a managed site"
          >
            <p>
              Any residential complex managed by landlords or managing agents, or which has a shared communal entrance
              gate, is subject to health and safety legislation. That includes the legal requirement to ensure electric
              gates and barriers are regularly maintained.
            </p>
            <p>Relevant legislation and guidance includes:</p>
            <ul className="list-disc space-y-2 pl-5 text-white/85">
              <li>The Health and Safety at Work Act 1974</li>
              <li>The Workplace (Health, Safety and Welfare) Regulations 1992</li>
              <li>The Provision and Use of Work Equipment Regulations 1998</li>
              <li>The Supply of Machinery (Safety) Regulations 2008</li>
            </ul>
            <p>
              Owners of gates on privately owned residential land are not subject to the health and safety legislation for
              maintenance requirements, but the installer must always ensure compliance with the Supply of Machinery
              (Safety) Regulations 2008.
            </p>
            <p>
              Need{" "}
              <Link href={FS_SERVICE_ROUTES.accessControlSystems} className={linkClass}>
                access control
              </Link>
              ,{" "}
              <Link href={FS_SERVICE_ROUTES.videoDoorEntrySystems} className={linkClass}>
                video door entry
              </Link>{" "}
              or{" "}
              <Link href={FS_SERVICE_ROUTES.cctvSystems} className={linkClass}>
                CCTV
              </Link>{" "}
              at the same entrance? We can survey the whole package together.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <CustomPillButton href="/contact?service=gate-automation-systems" size="md">
                Arrange a survey
              </CustomPillButton>
              <CustomPillButton href="tel:02083032280" size="md" variant="outline">
                Call 020 8303 2280
              </CustomPillButton>
            </div>
          </FsServiceTextImageSection>
        </FsServiceTextImageSectionGroup>

        <ServiceComplianceSection
          intro="Powered gates are machinery. We install and maintain with safety and legal compliance in mind, including Gate Safe trained engineers and BS EN 12453 where it applies to the entrance."
          leftEyebrow="Safety &amp; compliance"
          standardsItems={[
            "Gate Safe trained engineers",
            "Supply of Machinery (Safety) Regulations 2008",
            "BS EN 12453, safety in use of powered doors and gates (where applicable)",
            "H&S duties on managed / workplace sites (HSWA 1974, Workplace Regs 1992, PUWER 1998)",
          ]}
          footerNote={
            <>
              Brands we work with include Roger Technology, BFT, CAME, FAAC and Nice. Gate automation often sits alongside{" "}
              <Link
                href="/services/access-control-systems"
                className="text-black underline decoration-black/30 underline-offset-2 hover:decoration-black"
              >
                access control
              </Link>
              ,{" "}
              <Link
                href="/services/video-door-entry-systems"
                className="text-black underline decoration-black/30 underline-offset-2 hover:decoration-black"
              >
                video door entry
              </Link>{" "}
              and{" "}
              <Link
                href="/services/cctv-systems"
                className="text-black underline decoration-black/30 underline-offset-2 hover:decoration-black"
              >
                CCTV
              </Link>
              .
            </>
          }
          rightTitle="What you get"
          deliverablesItems={[
            "Survey of the entrance, risks and existing equipment",
            "Install, service, repair or maintenance options",
            "Safety device checks and commissioning records",
            "Clear next steps for domestic or managed sites",
          ]}
        />

        <ServicePageClosingSections
          serviceTitleShort="Gate automation"
          ctaImageSrc={serviceHeroImages.gateAutomation}
          ctaHeadline="Arrange a"
          ctaHeadlineAccent="survey."
          ctaDescription="Contact us to book a survey for gates, barriers or bollards, new installs, servicing, repairs or maintenance."
        >
          <CustomPillButton href="/contact?service=gate-automation-systems" size="md">
            Arrange a survey
          </CustomPillButton>
          <CustomPillButton href="tel:02083032280" size="md" variant="outline">
            Call 020 8303 2280
          </CustomPillButton>
        </ServicePageClosingSections>
      </div>
    </div>
  )
}
