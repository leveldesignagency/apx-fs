"use client"

import Image from "next/image"
import Link from "next/link"
import { ApxPartnerLogoStrip } from "@/components/ApxPartnerLogoStrip"
import { INTRUDER_ALARM_TECHNOLOGY_PARTNERS } from "@/lib/apx-partner-logos"
import { ServiceComplianceSection } from "@/components/ServiceComplianceSection"
import { ServiceTechnologyProductsSection } from "@/components/ServiceTechnologyProductsSection"
import { ServicePageClosingSections } from "@/components/ServicePageClosingSections"
import { CustomPillButton } from "@/components/ui/CustomPillButton"
import { ServicePageHero } from "@/components/ServicePageHero"
import { Reveal } from "@/components/Reveal"
import { ServiceItemReveal } from "@/components/ServiceItemReveal"
import { serviceHeroImages } from "@/lib/serviceHeroImages"
import { FsServiceTextImageSection } from "@/components/FsServiceTextImageSection"
import { FsServiceTextImageSectionGroup } from "@/components/FsServiceTextImageSectionGroup"
import { ServiceFeatureIconCard } from "@/components/ServiceFeatureIconCard"
import {
  FS_SERVICE_IMAGE_GROW_INNER,
  FS_SERVICE_INSTALLATION_CARD,
  FS_SERVICE_INSTALLATION_CARD_IMAGE,
} from "@/lib/fsServicePageCards"
import { Shield, CheckCircle, Monitor, Smartphone, Package } from "lucide-react"

const MONITORING_BENEFITS = [
  {
    icon: Shield,
    title: "Commercial-grade protection",
    text: "Detection and signalling designed for offices, schools, hospitals, construction sites, residential developments, hotels and industrial premises.",
  },
  {
    icon: Monitor,
    title: "ARC monitoring",
    text: "Alarm receiving centre (ARC) signalling so events are escalated when your site is unattended, with police response where applicable.",
  },
  {
    icon: Package,
    title: "Dual-path signalling",
    text: "Resilient dual-path signalling for monitored systems, including CSL GradeShift Pro where your insurer or risk assessment requires it.",
  },
  {
    icon: Smartphone,
    title: "Remote control",
    text: "App and keypad control so authorised users can arm, disarm and check system status remotely.",
  },
  {
    icon: CheckCircle,
    title: "Takeover, maintenance & call-out",
    text: "System takeover and upgrades, planned preventative maintenance, and 24/7 call-out cover for faults and emergencies.",
  },
]

/** One card per project, avoids duplicate titles when the same site had multiple marketing photos. */
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

/** Public folder: `public/service images/intruders/` */
const INTRUDER_HERO_IMAGE_SRC = "/service%20images/intruders/thieves-wear-black-hats-pry-windows-steal-things.jpg"
const BESPOKE_INTRUDER_IMAGE_SRC = "/service%20images/intruders/breaking%20and%20entering.png"
const COMMERCIAL_INTRUDER_IMAGE_SRC =
  "/service%20images/intruders/Commercial%20%26%20Industrial%20Intruder%20Systems.jpg"
const EXTERNAL_INTRUDER_IMAGE_SRC =
  "/service%20images/intruders/profile-view-man-with-hoodie-trying-pick-lock-house-forcing-his-entry.jpg"

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
        imageSrc={INTRUDER_HERO_IMAGE_SRC}
        heroCompliance={["PD 6662", "BS EN 50131"]}
        intro={
          <>
            <p className="mb-4">
              APX installs and maintains intruder alarm systems for commercial and industrial environments, with Grade 2 and Grade 3 installations, ARC monitoring options and NSI-aligned workmanship.
            </p>
            <p>
              Building on a heritage dating back to 1986, we design systems that link to CCTV, video entry and access control where required, with dual-path signalling (CSL GradeShift Pro), planned maintenance and 24/7 call-out cover available.
            </p>
          </>
        }
      />

      <div className="relative bg-black">
        {heroBridge}

        <section className="container relative z-[1] mx-auto px-6 py-16 lg:py-16">
          <Reveal>
            <h2 className="mb-10 text-left font-title text-3xl font-bold text-white sm:text-4xl">Constant Protection</h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {MONITORING_BENEFITS.map((item, index) => (
              <ServiceItemReveal key={index} index={index} className="h-full min-h-0">
                <ServiceFeatureIconCard
                  icon={item.icon}
                  title={item.title}
                  description={item.text}
                  className="transition-transform duration-300 hover:scale-[1.02]"
                />
              </ServiceItemReveal>
            ))}
          </div>
        </section>

        <div className="border-t border-white/15" />

        <FsServiceTextImageSectionGroup>
          <FsServiceTextImageSection
          title="Commercial & Industrial Intruder Systems"
          titleId="commercial-intruder-systems-heading"
          imageSrc={COMMERCIAL_INTRUDER_IMAGE_SRC}
          imageAlt="Commercial intruder alarm system installation"
        >
          <p>
            Commercial and industrial intruder systems are our primary focus, designed and commissioned for insurance-grade
            detection, signalling and integration. Typical delivery includes Grade 2 and Grade 3 systems, PIR and dual-tech
            detectors, magnetic contacts, shock sensors, panic facilities, ARC monitoring and police response where required.
          </p>
          <p>
            We regularly serve offices, schools, hospitals, construction sites, residential developments, hotels and
            industrial premises across London and the Home Counties, coordinating with CCTV, access control and video entry
            where the brief requires a joined-up security package.
          </p>
        </FsServiceTextImageSection>

        <div className="border-t border-white/15" />

          <FsServiceTextImageSection
          title="Bespoke Intruder Alarm Systems"
          titleId="bespoke-intruder-alarm-heading"
          imageSrc={BESPOKE_INTRUDER_IMAGE_SRC}
          imageAlt="Bespoke intruder alarm system installation"
          imageClassName="object-cover object-[20%_center] brightness-[1.18] contrast-[1.05] saturate-[1.06]"
        >
          <h3 className="font-title text-2xl font-semibold text-white">Survey-led design &amp; installation</h3>
          <p>
            Every system is surveyed and designed around how the building is used, detection zones, signalling path and
            integration with your wider security stack, so you get a well-designed, well-installed and reliable installation.
          </p>
          <p>
            We install Grade 2 and Grade 3 systems aligned with insurance and risk expectations. Domestic properties can
            be supported where required, but commercial and multi-site work is the core of our intruder delivery.
          </p>
          <p>
            Looking to take over an existing alarm, upgrade signalling for monitoring, or move onto planned maintenance
            with 24/7 call-out cover? Complete the enquiry form and we will arrange a survey.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <CustomPillButton href="/contact?service=intruder-alarm-systems" size="md">
              Enquiry form
            </CustomPillButton>
            <CustomPillButton href="/services/monitoring" size="md" variant="outline">
              Monitored upgrade
            </CustomPillButton>
            <CustomPillButton href="/services/maintenance-support" size="md" variant="outline">
              Maintenance takeover
            </CustomPillButton>
          </div>
        </FsServiceTextImageSection>

        <div className="border-t border-white/15" />

        <FsServiceTextImageSection
          title="External Intruder Alarm Protection"
          titleId="external-intruder-protection-heading"
          imageSrc={EXTERNAL_INTRUDER_IMAGE_SRC}
          imageAlt="External intruder alarm and perimeter protection"
          imageClassName="object-cover object-left"
        >
          <p>
            We have installed a number of high quality external intruder protection systems but due to the confidential
            nature of the properties, the type of system installed and the areas they protect, we can only show a
            limited number of images.
          </p>
          <p>
            A recent installation that we carried out in a residential London property featured black external laser
            detectors as shown in the images alongside. The laser-based security creates virtual curtains and
            surveillance security zones that offer the highest levels of precision for accurate and reliable intrusion
            detection.
          </p>
          <p>
            Laser-based detection systems such as this are ideal for securing open sites and are a great option for
            perimeter protection and intrusion detection, alerting you to pedestrian and vehicle access and protecting
            against theft and vandalism. Simply contact us to learn more about how we can help you to secure
            your property.
          </p>
        </FsServiceTextImageSection>
        </FsServiceTextImageSectionGroup>

        <ServiceComplianceSection
          leftTitle="Standards & compliance alignment"
          leftEyebrow="Intruder alarm systems alignment"
          standardsItems={[
            "PD 6662, scheme document for application of European standards for intruder alarms",
            "BS EN 50131, intruder and hold-up alarm systems",
          ]}
          footerNote={
            <>
              Typical deliverables include system design proposals, commissioning certificates and user training, aligned with the structured capability lists on our{" "}
              <Link href="/services/security-systems" className="text-black underline decoration-black/30 underline-offset-2 hover:decoration-black">
                security systems
              </Link>{" "}
              overview.
            </>
          }
          deliverablesItems={[
            "Survey-led design proposals for Grade 2 and Grade 3 systems",
            "Installation, commissioning certificates and user training",
            "ARC signalling, dual-path options (CSL GradeShift Pro) and police response set-up where required",
            "System takeover and upgrades, planned maintenance and 24/7 call-outs",
          ]}
          rightFooterNote={
            <>
              Integrated packages often include CCTV, see our{" "}
              <Link href="/services/cctv-systems" className="text-black underline decoration-black/30 underline-offset-2 hover:decoration-black">
                CCTV systems
              </Link>{" "}
              overview.
            </>
          }
        />

        <ServiceTechnologyProductsSection
          title="Intruder Alarm Technology"
          titleId="intruder-alarm-technology-heading"
          description="We are proud to install the latest intruder alarm technology from the world&apos;s leading brands."
          eyebrow="Leading brands"
        >
          <ApxPartnerLogoStrip partners={INTRUDER_ALARM_TECHNOLOGY_PARTNERS} variant="light" />
        </ServiceTechnologyProductsSection>

        <div className="border-t border-white/15" />

        <section className="container mx-auto px-6 py-16 lg:py-16">
          <Reveal>
            <h2 className="mb-4 text-left font-title text-3xl font-bold text-white sm:text-4xl">Our Intruder Alarm System Installations</h2>
          </Reveal>
          <Reveal delayMs={70}>
            <p className="mb-8 max-w-2xl text-left text-gray-300">Examples of intruder alarm systems that we have installed for our customers:</p>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {INTRUDER_ALARM_INSTALLATIONS.map((item, index) => (
              <ServiceItemReveal key={item.title} index={index} className="h-full min-h-0">
                <article className={FS_SERVICE_INSTALLATION_CARD}>
                <div className={FS_SERVICE_INSTALLATION_CARD_IMAGE}>
                  <div className={FS_SERVICE_IMAGE_GROW_INNER}>
                  <Image
                    src={item.imageSrc}
                    alt={item.title}
                    fill
                    className="object-cover object-center"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
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
          serviceTitleShort="Intruder alarm"
          ctaImageSrc={serviceHeroImages.intruder}
          ctaHeadline="Ready to"
          ctaHeadlineAccent="secure your property?"
          ctaDescription="Book a free survey, arrange a monitored-alarm upgrade, or talk to us about taking over maintenance on an existing system."
        >
          <CustomPillButton href="/contact?service=intruder-alarm-systems" size="md">
            Get a free quote
          </CustomPillButton>
          <CustomPillButton href="tel:02083032280" size="md" variant="outline">
            Call 020 8303 2280
          </CustomPillButton>
        </ServicePageClosingSections>

      </div>
    </div>
  )
}
