"use client"

import Link from "next/link"
import { ServiceComplianceSection } from "@/components/ServiceComplianceSection"
import { ServicePageClosingSections } from "@/components/ServicePageClosingSections"
import { CustomPillButton } from "@/components/ui/CustomPillButton"
import { CallPhoneCta } from "@/components/ui/CallPhoneCta"
import { ServicePageHero } from "@/components/ServicePageHero"
import { Reveal } from "@/components/Reveal"
import { ServiceItemReveal } from "@/components/ServiceItemReveal"
import { ServiceFeatureImageCard } from "@/components/ServiceFeatureImageCard"
import { FsServiceTextImageSection } from "@/components/FsServiceTextImageSection"
import { serviceHeroImages, serviceSectionImages } from "@/lib/serviceHeroImages"
import { FS_SERVICE_ROUTES } from "@/lib/fs-service-routes"
import { SERVICE_HERO_BRIDGE_GRADIENT } from "@/lib/heroBackgroundGradients"

const linkClass = "underline decoration-white/40 underline-offset-2 hover:decoration-white"

const IMG = "/service%20images/callout-capabilities"

const CAPABILITIES = [
  {
    title: "24/7 engineer response",
    description:
      "Out-of-hours emergency engineer attendance for contracted customers across London and the Home Counties.",
    imageSrc: `${IMG}/engineer.jpg`,
    imageAlt: "Engineer with clipboard and van coordinating an emergency call-out",
  },
  {
    title: "Fire alarm attendance",
    description:
      "Fault and false-alarm attendance on fire detection systems so sites can return to normal operation quickly.",
    imageSrc: `${IMG}/fire.jpg`,
    imageAlt: "Red fire alarm call point and fire sign on a concrete wall",
  },
  {
    title: "Security system support",
    description:
      "Reactive support for intruder, CCTV, access control and video entry faults that need urgent on-site attention.",
    imageSrc: `${IMG}/security.jpg`,
    imageAlt: "Secure commercial door lock and handle",
  },
  {
    title: "Escalation & SLAs",
    description:
      "Call handling and escalation aligned to your site contacts and the response expectations in your agreement.",
    imageSrc: `${IMG}/sla.jpg`,
    imageAlt: "Operator handling an escalation while reviewing paperwork",
  },
  {
    title: "Monitoring coordination",
    description:
      "Coordination with monitoring / ARC pathways where in place, so operator alerts and engineer attendance work together.",
    imageSrc: `${IMG}/monitoring.jpg`,
    imageAlt: "Operator reviewing live camera and alarm feeds in a control room",
  },
  {
    title: "Follow-up remediations",
    description:
      "Recommended remediations and parts after emergency attendance, scheduled so temporary fixes become lasting ones.",
    imageSrc: `${IMG}/remediations.jpg`,
    imageAlt: "Engineer diagnosing control gear with a multimeter after a call-out",
  },
  {
    title: "Ad-hoc attendance",
    description:
      "Emergency attendance for sites without a contract can be discussed case by case - tell us your system type and location.",
    imageSrc: `${IMG}/adhoc.jpg`,
    imageAlt: "Engineer inspecting an outdoor control cabinet on an ad-hoc attendance",
  },
  {
    title: "Attendance records",
    description:
      "Clear attendance and defect records after each call-out for facilities and security managers.",
    imageSrc: `${IMG}/records.jpg`,
    imageAlt: "Engineer completing an attendance checklist on a clipboard",
  },
] as const

export default function EmergencyCallOutPage() {
  return (
    <div className="service-page-root min-h-screen overflow-x-hidden bg-black text-white">
      <ServicePageHero
        title="24/7 Emergency Call-Out"
        imageSrc={serviceHeroImages.emergencyCallOut}
        heroCompliance={["Contracted cover"]}
        heroSummary="24/7 emergency call-out for Fire and Security faults, with contracted engineer response when systems need urgent attention."
        intro={
          <>
            <p className="mb-4">
              When a fire or security system needs urgent attention, APX provides{" "}
              <strong className="font-semibold text-white">
                24/7 call-out cover for customers on a maintenance agreement
              </strong>{" "}
              so faults, false alarms and critical failures can be attended outside normal hours across London and the
              Home Counties.
            </p>
            <p>
              Call-out works best alongside{" "}
              <Link href={FS_SERVICE_ROUTES.maintenanceSupport} className={linkClass}>
                planned preventative maintenance
              </Link>{" "}
              and, where required,{" "}
              <Link href={FS_SERVICE_ROUTES.monitoring} className={linkClass}>
                monitoring / ARC signalling
              </Link>
              . Ad-hoc emergency attendance for sites without a contract can be discussed case by case.
            </p>
          </>
        }
      />

      <div className="relative bg-[var(--page-bg)]">
        <div
          className="pointer-events-none absolute top-0 left-0 right-0 h-28 sm:h-36"
          style={{ background: SERVICE_HERO_BRIDGE_GRADIENT }}
          aria-hidden
        />

        <div className="relative z-[1] border-t border-white/15" aria-hidden />

        <section className="site-container relative z-[1] py-16 lg:py-16">
          <Reveal>
            <h2 className="mb-4 text-left font-title text-3xl font-bold text-white sm:text-4xl">Capabilities</h2>
          </Reveal>
          <Reveal delayMs={70}>
            <p className="mb-10 max-w-3xl text-left text-gray-300">
              From out-of-hours engineer response and fire / security fault attendance through to escalation, monitoring
              coordination and clear records, call-out is built to sit with your maintenance agreement.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map(({ title, description, imageSrc, imageAlt }, index) => (
              <ServiceItemReveal key={title} index={index} className="h-full min-h-0">
                <ServiceFeatureImageCard
                  title={title}
                  description={description}
                  imageSrc={imageSrc}
                  imageAlt={imageAlt}
                  className="transition-transform duration-300 hover:scale-[1.02]"
                />
              </ServiceItemReveal>
            ))}
          </div>
        </section>

        <div className="border-t border-white/15" />

        <FsServiceTextImageSection
          title="Faults don't wait for office hours"
          titleId="call-out-when-heading"
          imageSrc={serviceSectionImages.emergencyCallOutBody}
          imageAlt="Fire and security control equipment that may need emergency attendance"
          imageSide="right"
        >
          <p>
            Faults, false alarms and critical failures do not wait for office hours. Contracted customers get out-of-hours
            engineer response across London and the Home Counties, with escalation aligned to your site contacts and SLAs.
          </p>
          <p>
            Call-out works best with planned maintenance between incidents, and with monitoring pathways where events need
            to reach an ARC before an engineer is sent. After attendance we leave clear records and recommended remediations.
          </p>
        </FsServiceTextImageSection>

        <ServiceComplianceSection
          intro="Response expectations are set in the maintenance agreement. Remedial works follow manufacturer and British Standards guidance, with clear attendance records after every call-out."
          leftTitle="Cover & expectations"
          leftEyebrow="24/7 call-out"
          standardsItems={[
            "Response expectations set in the maintenance agreement",
            "Manufacturer and British Standards guidance followed on remedial works",
            "Clear attendance and defect records after each call-out",
            "Escalation aligned to your site contacts and SLAs",
          ]}
          footerNote={
            <>
              Related services:{" "}
              <Link
                href={FS_SERVICE_ROUTES.maintenanceSupport}
                className="text-black underline decoration-black/30 underline-offset-2 hover:decoration-black"
              >
                maintenance &amp; repairs
              </Link>
              ,{" "}
              <Link
                href={FS_SERVICE_ROUTES.monitoring}
                className="text-black underline decoration-black/30 underline-offset-2 hover:decoration-black"
              >
                monitoring
              </Link>
              .
            </>
          }
          rightTitle="Typical deliverables"
          deliverablesItems={[
            "Engineer attendance and fault diagnosis",
            "Service / attendance report",
            "Recommended remediations and parts where required",
            "Escalation notes for facilities or security managers",
          ]}
        />

        <ServicePageClosingSections
          serviceTitleShort="Call-out"
          ctaImageSrc={serviceHeroImages.emergencyCallOut}
          ctaHeadline="Need"
          ctaHeadlineAccent="24/7 Cover?"
          ctaDescription="Tell us about your systems and whether you need contracted call-out, ad-hoc attendance, or a full maintenance agreement."
        >
          <CustomPillButton href="/contact?service=emergency-call-out" size="md">
            Arrange call-out cover
          </CustomPillButton>
          <CallPhoneCta size="md" />
        </ServicePageClosingSections>
      </div>
    </div>
  )
}
