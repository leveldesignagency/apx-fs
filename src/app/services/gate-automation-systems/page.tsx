"use client"

import Link from "next/link"
import { ServiceComplianceSection } from "@/components/ServiceComplianceSection"
import { ServicePageClosingSections } from "@/components/ServicePageClosingSections"
import { CustomPillButton } from "@/components/ui/CustomPillButton"
import { CallPhoneCta } from "@/components/ui/CallPhoneCta"
import { ServicePageHero } from "@/components/ServicePageHero"
import { Reveal } from "@/components/Reveal"
import { ServiceItemReveal } from "@/components/ServiceItemReveal"
import { ServiceFeatureIconCard } from "@/components/ServiceFeatureIconCard"
import { FsServiceTextImageSection } from "@/components/FsServiceTextImageSection"
import { FsServiceTextImageSectionGroup } from "@/components/FsServiceTextImageSectionGroup"
import { serviceHeroImages, serviceSectionImages } from "@/lib/serviceHeroImages"
import { FS_SERVICE_ROUTES } from "@/lib/fs-service-routes"
import {
  AlertTriangle,
  Car,
  ClipboardCheck,
  Fence,
  Shield,
  Wrench,
} from "lucide-react"
import { SERVICE_HERO_BRIDGE_GRADIENT } from "@/lib/heroBackgroundGradients"

const cardClass =
  "rounded-tl-[1.5rem] rounded-br-[1.5rem] border border-white/20 bg-black p-8 text-white transition-colors hover:border-white/45"

const linkClass =
  "underline decoration-white/40 underline-offset-[3px] transition-colors hover:decoration-white"

const heroBridge = (
  <div
    className="pointer-events-none absolute left-0 right-0 top-0 h-28 sm:h-36"
    style={{
      background: SERVICE_HERO_BRIDGE_GRADIENT,
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
        heroSummary="Gate, barrier and bollard automation designed and installed to Gate Safe practice, with safe force limitation and access integration."
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

      <div className="relative bg-[var(--page-bg)]">
        {heroBridge}

        <div className="relative z-[1] border-t border-white/15" aria-hidden />

        <section className="site-container relative z-[1] py-16 lg:py-16">
          <Reveal>
            <h2 className="mb-4 text-left font-title text-3xl font-bold text-white sm:text-4xl">
              What We Deliver
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

        <section className="relative z-[1] border-y border-white/15 bg-[var(--page-bg)] py-16 lg:py-20">
          <div className="site-container">
            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-x-14 xl:gap-x-20">
              <div className="lg:col-span-5 lg:sticky lg:top-28">
                <Reveal>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
                    Site survey focus
                  </p>
                  <h2 className="max-w-xl text-left font-title text-4xl font-bold leading-[1.05] text-white sm:text-5xl">
                    Risks we look for
                  </h2>
                </Reveal>
                <Reveal delayMs={70}>
                  <p className="mt-5 max-w-md text-left text-base leading-relaxed text-white/70 sm:text-lg">
                    Before we quote install, service or takeover work, we survey the entrance for hazards that leave
                    homeowners and duty holders exposed.
                  </p>
                </Reveal>
              </div>

              <ol className="m-0 list-none border-t border-white/25 p-0 lg:col-span-7">
                {[
                  {
                    title: "Compliance issues",
                    body: "Gaps against machinery regulations, Gate Safe expectations and the records a surveyor or insurer will expect to see.",
                  },
                  {
                    title: "Crushing and dragging points",
                    body: "Closing edges, hinge zones and draw-in areas where people, clothing or vehicles can be trapped as the gate moves.",
                  },
                  {
                    title: "Inadequate safety devices",
                    body: "Missing or poorly aimed photocells, edges and controls that should stop or reverse the gate before contact.",
                  },
                  {
                    title: "Incorrectly installed equipment",
                    body: "Operators, stops and wiring fitted outside manufacturer guidance, so the entrance is unreliable or unsafe under load.",
                  },
                ].map((item, i) => (
                  <li key={item.title} className="border-b border-white/25 py-7 sm:py-8">
                    <Reveal delayMs={90 + i * 70}>
                      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-5 gap-y-2 sm:gap-x-7">
                        <span className="font-title text-sm font-semibold tracking-[0.18em] text-white/40">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="min-w-0">
                          <h3 className="font-title text-xl font-bold leading-tight text-white sm:text-2xl">
                            {item.title}
                          </h3>
                          <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-white/68 sm:text-base">
                            {item.body}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <FsServiceTextImageSectionGroup>
          <FsServiceTextImageSection
            title="Did you know?"
            titleId="gate-did-you-know-heading"
            imageSrc={serviceSectionImages.gateDidYouKnow}
            imageAlt="Integrated Fire and Security systems protecting a site entrance"
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
            imageSrc={serviceSectionImages.gateManagedSites}
            imageAlt="Access credentials for managed and shared vehicle entrances"
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
              <CallPhoneCta size="md" />
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
          ctaHeadlineAccent="Survey."
          ctaDescription="Contact us to book a survey for gates, barriers or bollards, new installs, servicing, repairs or maintenance."
        >
          <CustomPillButton href="/contact?service=gate-automation-systems" size="md">
            Arrange a survey
          </CustomPillButton>
          <CallPhoneCta size="md" />
        </ServicePageClosingSections>
      </div>
    </div>
  )
}
