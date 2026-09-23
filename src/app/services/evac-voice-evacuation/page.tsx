"use client"

import Image from "next/image"
import Link from "next/link"
import { ServiceComplianceSection } from "@/components/ServiceComplianceSection"
import { ServicePageClosingSections } from "@/components/ServicePageClosingSections"
import { CustomPillButton } from "@/components/ui/CustomPillButton"
import { ServicePageHero } from "@/components/ServicePageHero"
import { Reveal } from "@/components/Reveal"
import { ServiceItemReveal } from "@/components/ServiceItemReveal"
import { ServiceFeatureIconCard } from "@/components/ServiceFeatureIconCard"
import { serviceHeroImages } from "@/lib/serviceHeroImages"
import {
  FS_SERVICE_IMAGE_GROW_INNER,
  FS_SERVICE_INSTALLATION_CARD,
  FS_SERVICE_INSTALLATION_CARD_IMAGE,
} from "@/lib/fsServicePageCards"
import {
  CheckCircle,
  Flame,
  Layers,
  Music,
  Speaker,
  Volume2,
  Wrench,
  Zap,
} from "lucide-react"

const cardClass =
  "rounded-tl-[1.5rem] rounded-br-[1.5rem] border-2 border-white/20 bg-black p-8 text-white transition-colors hover:border-white/45"

const FIRE_ALARM_INSTALLATIONS_DIR = "/fire%20alarm%20system%20installations" as const

const EVAC_PROJECTS = [
  {
    title: "Sancroft Building, City of London PA/VA",
    venue: "Paternoster Square, City of London",
    context: "Public address / voice alarm (PA/VA) installation",
    imageSrc: `${FIRE_ALARM_INSTALLATIONS_DIR}/fire-alarm-system-sancroft-building-exterior-600x400.jpg`,
  },
  {
    title: "Sancroft Building, interior systems",
    venue: "Paternoster Square, City of London",
    context: "Amplifiers, loudspeakers and life-safety voice messaging",
    imageSrc: `${FIRE_ALARM_INSTALLATIONS_DIR}/fire-alarm-system-sancroft-building-interior-600x400.jpg`,
  },
] as const

const CAPABILITIES = [
  {
    Icon: Zap,
    title: "Zoned evacuation messages",
    description:
      "Zone-based emergency messaging aligned to your fire strategy, with prioritised announcements and local control where required.",
  },
  {
    Icon: Layers,
    title: "Phased evacuation",
    description:
      "Staged or phased building evacuation messaging so floors and areas can be instructed in sequence under the fire plan.",
  },
  {
    Icon: Flame,
    title: "Fire alarm integration",
    description:
      "Interfaces to the fire detection and alarm system so voice messages follow the agreed cause-and-effect logic.",
  },
  {
    Icon: Music,
    title: "Background music & general announcements",
    description:
      "Where the design allows shared PA/VA infrastructure, we coordinate non-emergency paging and background music with emergency priority override.",
  },
  {
    Icon: Speaker,
    title: "Amplifiers and loudspeakers",
    description:
      "Selection, placement and commissioning of amplifiers and loudspeakers for audibility and speech intelligibility across occupied spaces.",
  },
  {
    Icon: CheckCircle,
    title: "Cause-and-effect testing",
    description:
      "Witnessed testing of message triggers, priorities and fault behaviour against the fire strategy and interface schedules.",
  },
  {
    Icon: Volume2,
    title: "Commissioning",
    description:
      "Structured audio commissioning, configuration records and operator familiarisation at handover.",
  },
  {
    Icon: Wrench,
    title: "Maintenance",
    description:
      "Planned maintenance, routine testing and reactive support so voice alarm systems remain available and compliant in service.",
  },
] as const

export default function EvacVoiceEvacuationPage() {
  return (
    <div className="service-page-root min-h-screen overflow-x-hidden bg-black text-white">
      <ServicePageHero
        title="EVAC & Voice Alarm Systems"
        imageSrc={serviceHeroImages.evacVoice}
        heroCompliance={["BS 5839-8"]}
        intro={
          <>
            <p className="mb-4">
              APX designs, installs, commissions and maintains voice alarm systems for commercial, industrial and
              public-sector buildings across London and the Home Counties, aligned with{" "}
              <strong className="font-semibold text-white">BS 5839-8</strong>.
            </p>
            <p>
              <strong className="font-semibold text-white">EVAC</strong> (emergency voice alarm / voice evacuation) delivers
              clear spoken instructions during a fire or other emergency.{" "}
              <strong className="font-semibold text-white">Voice alarm</strong> and{" "}
              <strong className="font-semibold text-white">voice evacuation</strong> describe that life-safety function under
              BS 5839-8. <strong className="font-semibold text-white">PA/VA</strong> (public address / voice alarm) refers to
              systems that also support day-to-day paging or background music, with emergency messages taking priority.
            </p>
          </>
        }
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

        <section className="container relative z-[1] mx-auto px-6 py-16 lg:py-16">
          <Reveal>
            <h2 className="mb-4 text-left font-title text-3xl font-bold text-white sm:text-4xl">Capabilities</h2>
          </Reveal>
          <Reveal delayMs={70}>
            <p className="mb-10 max-w-3xl text-left text-gray-300">
              From amplifiers and loudspeakers through to fire alarm integration, cause-and-effect testing, commissioning
              and maintenance, we deliver voice alarm systems that are intelligible, zoned and testable, with clear
              handover files for operators and maintainers.
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
          intro="Voice alarm (voice evacuation / EVAC) systems are covered by BS 5839-8. We align design, installation, commissioning, audibility testing, cause-and-effect records and ongoing maintenance with that standard and with your project's fire engineering inputs, including interfaces to disabled communication and building systems where applicable."
          leftTitle="Standards & handover"
          leftEyebrow="Voice alarm & BS 5839-8"
          standardsItems={[
            "BS 5839-8, Voice alarm systems, design, installation, commissioning and maintenance",
            "Zoned and phased evacuation messaging to the fire strategy",
            "Fire alarm integration and cause-and-effect testing",
            "Amplifiers, loudspeakers and PA/VA day-to-day functions where specified",
          ]}
          footerNote={
            <>
              Related life-safety scopes:{" "}
              <Link
                href="/services/refuge-disabled-communication"
                className="text-black underline decoration-black/30 underline-offset-2 hover:decoration-black"
              >
                disabled refuge, fire telephone &amp; toilet alarms
              </Link>
              ,{" "}
              <Link
                href="/services/fire-alarm-systems"
                className="text-black underline decoration-black/30 underline-offset-2 hover:decoration-black"
              >
                fire alarm systems
              </Link>
              .
            </>
          }
          rightTitle="Typical deliverables"
          deliverablesItems={[
            "Audio testing reports and as-commissioned settings",
            "Cause-and-effect / interface witness sheets",
            "Commissioning documentation and operator handover",
            "Maintenance options aligned with BS 5839-8 and manufacturer guidance",
          ]}
        />

        <div className="border-t border-white/15" />

        <section className="container mx-auto px-6 py-16 lg:py-16">
          <Reveal>
            <h2 className="mb-4 text-left font-title text-3xl font-bold text-white sm:text-4xl">
              Completed project
            </h2>
          </Reveal>
          <Reveal delayMs={70}>
            <p className="mb-8 max-w-2xl text-left text-gray-300">
              Example PA/VA delivery in the City of London, the Sancroft Building at Paternoster Square.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {EVAC_PROJECTS.map((item, index) => (
              <ServiceItemReveal key={item.title} index={index} className="h-full min-h-0">
                <article className={FS_SERVICE_INSTALLATION_CARD}>
                  <div className={FS_SERVICE_INSTALLATION_CARD_IMAGE}>
                    <div className={FS_SERVICE_IMAGE_GROW_INNER}>
                      <Image
                        src={item.imageSrc}
                        alt={item.title}
                        fill
                        className="object-cover object-center"
                        sizes="(min-width: 768px) 50vw, 100vw"
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
          serviceTitleShort="EVAC & Voice Alarm"
          ctaImageSrc={serviceHeroImages.evacVoice}
          ctaHeadline="Planning"
          ctaHeadlineAccent="voice alarm / EVAC?"
          ctaDescription="Share your drawings and fire strategy. We can advise on zoning, phased evacuation, amplifiers, loudspeakers and BS 5839-8 commissioning for a compliant voice alarm installation."
        >
          <CustomPillButton href="/contact?service=evac-voice-evacuation" size="md">
            Discuss your project
          </CustomPillButton>
          <CustomPillButton href="tel:02083032280" size="md" variant="outline">
            Call 020 8303 2280
          </CustomPillButton>
        </ServicePageClosingSections>
      </div>
    </div>
  )
}
