"use client"

import Link from "next/link"
import { ApxPartnerLogoStrip } from "@/components/ApxPartnerLogoStrip"
import { INTRUDER_ALARM_TECHNOLOGY_PARTNERS } from "@/lib/apx-partner-logos"
import { ServiceComplianceSection } from "@/components/ServiceComplianceSection"
import { ServiceTechnologyProductsSection } from "@/components/ServiceTechnologyProductsSection"
import { ServicePageClosingSections } from "@/components/ServicePageClosingSections"
import { CustomPillButton } from "@/components/ui/CustomPillButton"
import { CallPhoneCta } from "@/components/ui/CallPhoneCta"
import { ServiceHeroGridTilt } from "@/components/ServiceHeroGridTilt"
import { Reveal } from "@/components/Reveal"
import { ServiceItemReveal } from "@/components/ServiceItemReveal"
import { ServiceInstallationsGrid } from "@/components/ServiceInstallationsGrid"
import { ServiceInstallationCard } from "@/components/ServiceInstallationCard"
import { serviceHeroImages } from "@/lib/serviceHeroImages"
import { FsServiceTextImageSection } from "@/components/FsServiceTextImageSection"
import { FsServiceTextImageSectionGroup } from "@/components/FsServiceTextImageSectionGroup"
import { ServiceFeatureImageCard } from "@/components/ServiceFeatureImageCard"
import { FS_SERVICE_IMAGE_GROW_INNER } from "@/lib/fsServicePageCards"
import { SERVICE_HERO_BRIDGE_GRADIENT } from "@/lib/heroBackgroundGradients"
import { toTitleCase } from "@/lib/titleCase"

const IMG = "/service%20images/intruder-capabilities"

const MONITORING_BENEFITS = [
  {
    title: "Commercial-grade protection",
    text: "Detection and signalling designed for offices, schools, hospitals, construction sites, residential developments, hotels and industrial premises.",
    id: "intruder-commercial",
    imageSrc: `${IMG}/commercial.jpg`,
    imageAlt: "Modern commercial building with controlled access and occupancy",
  },
  {
    title: "ARC monitoring",
    text: "Alarm receiving centre (ARC) signalling so events are escalated when your site is unattended, with police response where applicable.",
    id: "intruder-arc",
    imageSrc: `${IMG}/arc.jpg`,
    imageAlt: "Operator reviewing live camera and alarm feeds in a control room",
  },
  {
    title: "Dual-path signalling",
    text: "Resilient dual-path signalling for monitored systems, including CSL GradeShift Pro where your insurer or risk assessment requires it.",
    id: "intruder-dual-path",
    imageSrc: `${IMG}/dual-path.jpg`,
    imageAlt: "Network switch ports used for resilient alarm signalling paths",
  },
  {
    title: "Remote control",
    text: "App and keypad control so authorised users can arm, disarm and check system status remotely.",
    id: "intruder-remote",
    imageSrc: `${IMG}/remote-texecom-chrome-neutral.jpg`,
    imageAlt: "Chrome Texecom security keypad on a neutral wall for remote system control",
  },
  {
    title: "Takeover, maintenance & call-out",
    text: "System takeover and upgrades, planned preventative maintenance, and 24/7 call-out cover for faults and emergencies.",
    id: "intruder-takeover",
    imageSrc: `${IMG}/takeover.jpg`,
    imageAlt: "Engineer with clipboard and van coordinating a site call-out",
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
const INTRUDER_HERO_IMAGE_SRC = "/service%20images/intruders/hero-hd-forced-entry-door-crowbar.jpg"
const BESPOKE_INTRUDER_IMAGE_SRC = "/service%20images/intruders/breaking%20and%20entering.jpg"
const COMMERCIAL_INTRUDER_IMAGE_SRC =
  "/service%20images/intruders/Commercial%20%26%20Industrial%20Intruder%20Systems.jpg"
const EXTERNAL_INTRUDER_IMAGE_SRC =
  "/service%20images/intruders/profile-view-man-with-hoodie-trying-pick-lock-house-forcing-his-entry.jpg"

const heroBridge = (
  <div
    className="pointer-events-none absolute left-0 right-0 top-0 h-28 sm:h-36"
    style={{
      background: SERVICE_HERO_BRIDGE_GRADIENT,
    }}
    aria-hidden
  />
)

export default function IntruderAlarmSystemsPage() {
  return (
    <div className="service-page-root min-h-screen overflow-x-hidden bg-black text-white">
      <ServiceHeroGridTilt
        title="Intruder Alarm Systems"
        fillSeed="intruder-alarm-systems"
        imageSrc={INTRUDER_HERO_IMAGE_SRC}
        imageAlt="Gloved hand forcing a door handle with a crowbar during a break-in attempt"
        imageClassName="object-cover object-center"
        heroCompliance={["PD 6662", "BS EN 50131"]}
        summary="Grade 2 and Grade 3 commercial intruder alarms with ARC monitoring, dual-path signalling and NSI-aligned installation across London and the Home Counties."
      />

      <div className="relative bg-[var(--page-bg)]">
        {heroBridge}

        <div className="relative z-[1] border-t border-white/15" aria-hidden />

        <section className="site-container relative z-[1] py-16 lg:py-16">
          <Reveal>
            <h2 className="mb-10 text-left font-title text-3xl font-bold text-white sm:text-4xl">Constant Protection</h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {MONITORING_BENEFITS.map((item, index) => (
              <ServiceItemReveal key={item.title} index={index} className="h-full min-h-0">
                <ServiceFeatureImageCard
                  id={item.id}
                  title={toTitleCase(item.title)}
                  description={item.text}
                  imageSrc={item.imageSrc}
                  imageAlt={item.imageAlt}
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
          <h3 className="font-title text-2xl font-semibold text-white">Survey-Led Design &amp; Installation</h3>
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
          imageClassName="object-cover object-left brightness-[1.35] contrast-[1.05] saturate-[1.05]"
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

        <section className="site-container py-16 lg:py-16">
          <Reveal>
            <h2 className="mb-4 text-left font-title text-3xl font-bold text-white sm:text-4xl">Our Intruder Alarm System Installations</h2>
          </Reveal>
          <Reveal delayMs={70}>
            <p className="mb-8 max-w-2xl text-left text-gray-300">Examples of intruder alarm systems that we have installed for our customers:</p>
          </Reveal>
          <ServiceInstallationsGrid
            count={INTRUDER_ALARM_INSTALLATIONS.length}
            ctaHref="/contact?service=intruder-alarm-systems"
          >
            {INTRUDER_ALARM_INSTALLATIONS.map((item, index) => (
              <ServiceItemReveal key={item.title} index={index} className="h-full min-h-0">
                <ServiceInstallationCard
                  imageSrc={item.imageSrc}
                  imageAlt={item.title}
                  title={item.title}
                  subtitle={item.venue}
                  meta={item.context}
                />
              </ServiceItemReveal>
            ))}
          </ServiceInstallationsGrid>
        </section>

        <ServicePageClosingSections
          serviceTitleShort="Intruder alarm"
          ctaImageSrc={serviceHeroImages.intruder}
          ctaHeadline="Ready to"
          ctaHeadlineAccent="Secure Your Property?"
          ctaDescription="Book a free survey, arrange a monitored-alarm upgrade, or talk to us about taking over maintenance on an existing system."
        >
          <CustomPillButton href="/contact?service=intruder-alarm-systems" size="md">
            Get a free quote
          </CustomPillButton>
          <CallPhoneCta size="md" />
        </ServicePageClosingSections>

      </div>
    </div>
  )
}
