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
import { serviceHeroImages } from "@/lib/serviceHeroImages"
import {
  Building2,
  CheckCircle,
  Flame,
  Layers,
  Radio,
  Shield,
  Wrench,
} from "lucide-react"
import { SERVICE_HERO_BRIDGE_GRADIENT } from "@/lib/heroBackgroundGradients"

const cardClass =
  "rounded-tl-[1.5rem] rounded-br-[1.5rem] border border-white/20 bg-black p-8 text-white transition-colors hover:border-white/45"

const CAPABILITIES = [
  {
    Icon: Building2,
    title: "Residential blocks & flats",
    description:
      "Evacuation alert systems for buildings containing flats, designed so the fire and rescue service can alert residents in a controlled way during an incident.",
  },
  {
    Icon: Radio,
    title: "Alert devices in dwellings",
    description:
      "Dwelling alert devices and associated wiring arranged to give a clear, recognisable alert within individual flats when activated from the fire service control point.",
  },
  {
    Icon: Layers,
    title: "Control & indicating equipment",
    description:
      "Fire-service operable control and indicating equipment, zoning and indication configured to the building layout and evacuation strategy.",
  },
  {
    Icon: Flame,
    title: "Fire strategy coordination",
    description:
      "Design and cause-and-effect aligned with the fire strategy, fire risk assessment inputs and any interfaces to the wider fire detection package.",
  },
  {
    Icon: Shield,
    title: "BS 8629 aligned delivery",
    description:
      "Design, installation, commissioning and records structured around BS 8629 for evacuation alert systems, distinct from PAVA voice alarm under BS 5839-8.",
  },
  {
    Icon: CheckCircle,
    title: "Commissioning & handover",
    description:
      "Witnessed testing, as-built information and operator / duty-holder guidance so the system can be demonstrated at completion.",
  },
  {
    Icon: Wrench,
    title: "Maintenance & testing",
    description:
      "Planned testing, fault attendance and ongoing maintenance options aligned with manufacturer guidance and BS 8629.",
  },
] as const

export default function EvacSystemsPage() {
  return (
    <div className="service-page-root min-h-screen overflow-x-hidden bg-black text-white">
      <ServicePageHero
        title="EVAC Systems"
        imageSrc={serviceHeroImages.evac}
        heroCompliance={["BS 8629"]}
        heroSummary="EVAC alert systems that support safer evacuation, designed and commissioned to meet relevant British Standards for life safety."
        intro={
          <>
            <p className="mb-4">
              APX designs, installs, commissions and maintains{" "}
              <strong className="font-semibold text-white">EVAC</strong> (evacuation alert) systems under{" "}
              <strong className="font-semibold text-white">BS 8629</strong> for buildings containing flats across London
              and the Home Counties.
            </p>
            <p>
              EVAC is not a public address or voice alarm system. For spoken emergency messaging and day-to-day
              announcements, see our{" "}
              <Link href="/services/pava" className="underline decoration-white/40 underline-offset-2 hover:decoration-white">
                PAVA (public address and voice alarm)
              </Link>{" "}
              service under BS 5839-8.
            </p>
          </>
        }
      />

      <div className="relative bg-[var(--page-bg)]">
        <div
          className="pointer-events-none absolute top-0 left-0 right-0 h-28 sm:h-36"
          style={{
            background:
              SERVICE_HERO_BRIDGE_GRADIENT,
          }}
          aria-hidden
        />

        <div className="relative z-[1] border-t border-white/15" aria-hidden />

        <section className="site-container relative z-[1] py-16 lg:py-16">
          <Reveal>
            <h2 className="mb-4 text-left font-title text-3xl font-bold text-white sm:text-4xl">Capabilities</h2>
          </Reveal>
          <Reveal delayMs={70}>
            <p className="mb-10 max-w-3xl text-left text-gray-300">
              Evacuation alert systems give the fire and rescue service a means to alert residents in flats. We deliver
              the specialist package with clear zoning, testing and handover documentation.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map(({ Icon, title, description }, index) => (
              <ServiceItemReveal key={title} index={index} className="h-full min-h-0">
                <ServiceFeatureIconCard
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

        <ServiceComplianceSection
          intro="EVAC evacuation alert systems for buildings containing flats are covered by BS 8629. We align design, installation, commissioning, testing and maintenance with that standard and with your fire strategy. This scope is separate from PAVA voice alarm (BS 5839-8) and from disabled refuge / EVC (BS 5839-9)."
          leftTitle="Standards & handover"
          leftEyebrow="EVAC & BS 8629"
          standardsItems={[
            "BS 8629, Evacuation alert systems for use by fire and rescue services in buildings containing flats",
            "Alert devices, control and indicating equipment and zoning to the building layout",
            "Coordination with the fire strategy and fire detection package where required",
            "Commissioning, handover records and ongoing testing / maintenance options",
          ]}
          footerNote={
            <>
              Related scopes:{" "}
              <Link
                href="/services/pava"
                className="text-black underline decoration-black/30 underline-offset-2 hover:decoration-black"
              >
                PAVA (BS 5839-8)
              </Link>
              ,{" "}
              <Link
                href="/services/fire-alarm-systems"
                className="text-black underline decoration-black/30 underline-offset-2 hover:decoration-black"
              >
                fire alarm systems
              </Link>
              ,{" "}
              <Link
                href="/services/refuge-disabled-communication"
                className="text-black underline decoration-black/30 underline-offset-2 hover:decoration-black"
              >
                disabled refuge, fire telephone &amp; toilet alarms
              </Link>
              .
            </>
          }
          rightTitle="Typical deliverables"
          deliverablesItems={[
            "System layout drawings and zone schedules",
            "Commissioning certificates and witnessed test records",
            "User / duty-holder guidance for the fire service interface",
            "Maintenance options aligned with manufacturer and BS 8629",
          ]}
        />

        <ServicePageClosingSections
          serviceTitleShort="EVAC"
          ctaImageSrc={serviceHeroImages.evac}
          ctaHeadline="Need an"
          ctaHeadlineAccent="EVAC (BS 8629) System?"
          ctaDescription="Tell us about your residential block and fire strategy. We can survey, specify and deliver evacuation alert systems under BS 8629."
        >
          <CustomPillButton href="/contact?service=evac" size="md">
            Discuss your project
          </CustomPillButton>
          <CallPhoneCta size="md" />
        </ServicePageClosingSections>
      </div>
    </div>
  )
}
