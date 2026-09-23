"use client"

import Link from "next/link"
import { CctvComplianceSection } from "@/components/CctvComplianceSection"
import { CctvWhatWeOfferSection } from "@/components/CctvWhatWeOfferSection"
import { FsCctvCameraTypesStrip } from "@/components/FsCctvCameraTypesStrip"
import { ServicePageClosingSections } from "@/components/ServicePageClosingSections"
import { FsServiceBenefitsList } from "@/components/FsServiceBenefitsList"
import { FsServiceTextImageSection } from "@/components/FsServiceTextImageSection"
import { FsServiceTextImageSectionGroup } from "@/components/FsServiceTextImageSectionGroup"
import { FsCctvSubpageHeroButtons } from "@/components/FsCctvSubpageHeroButtons"
import { ServicePageHero } from "@/components/ServicePageHero"
import { Reveal } from "@/components/Reveal"
import { ServiceItemReveal } from "@/components/ServiceItemReveal"
import { CustomPillButton } from "@/components/ui/CustomPillButton"
import { ServiceFeatureIconCard } from "@/components/ServiceFeatureIconCard"
import { serviceHeroImages } from "@/lib/serviceHeroImages"
import { Home, Shield, Smartphone } from "lucide-react"

/** Public folder: `public/service images/cctv /` */
const DOMESTIC_CCTV_BESPOKE_IMAGE_SRC = "/service%20images/cctv%20/bespoke%20domestic%20cctv.jpg"
const DOMESTIC_CCTV_PLANNING_IMAGE_SRC =
  "/service%20images/cctv%20/Planning%20a%20Domestic%20CCTV%20System.jpg"
const DOMESTIC_CCTV_WHY_INSTALL_IMAGE_SRC =
  "/service%20images/cctv%20/why%20install%20a%20domestic%20cctv%20system.jpg"

const RESIDENTIAL_ENQUIRY_HREF = "/contact?service=cctv-systems"

const WHY_INSTALL_DOMESTIC_CCTV = [
  "Provide recorded evidence if an incident occurs at the property.",
  "See who is at the door before answering.",
  "Oversee vehicles parked on the driveway or at the side of the home.",
  "View live or recorded footage remotely where the system supports it.",
  "Check whether deliveries have been made.",
  "See when contractors or cleaners arrive and leave, where that is appropriate for your household.",
  "Help oversee children or other family members when you are out, where that is your household choice.",
  "View garden and approach areas from indoors.",
] as const

const WHAT_WE_OFFER_ITEMS = [
  "Free survey and written recommendations for your property (no obligation)",
  "Camera placement advice suited to houses, flats and driveways",
  "IP or HD recording options specified for the property, not a fixed package price",
  "Remote viewing where the platform supplied supports it",
  "Installation, commissioning and handover",
  "Discreet cabling and tidy finishes where practical",
  "Signage, privacy and neighbour-facing considerations explained at handover",
  "Retention and export guidance for incidents and insurance",
  "Optional maintenance and system health checks",
]

export default function DomesticCctvPage() {
  return (
    <div className="service-page-root min-h-screen overflow-x-hidden text-white">
      <div className="relative">
        <ServicePageHero
          title="Domestic CCTV systems"
          imageSrc={serviceHeroImages.domesticCctv}
          heroCompliance={["BS EN 62676"]}
          afterIntro={<FsCctvSubpageHeroButtons />}
          intro={
            <>
              <p className="mb-4">
                APX&apos;s primary focus is commercial fire and security, but we also design and install domestic CCTV for
                homeowners across <strong className="font-semibold text-white">London and the Home Counties</strong>{" "}
                where a residential survey is a good fit.
              </p>
              <p>
                Systems are survey-led and specified for your property, we do not publish package prices online because
                coverage, cabling and recording needs vary. We can configure privacy-conscious coverage and explain
                signage and retention at handover;{" "}
                <strong className="font-semibold text-white">
                  you remain responsible for the lawful operation of CCTV under UK GDPR
                </strong>{" "}
                (including what you record of neighbours and public areas).
              </p>
            </>
          }
        />
        <FsCctvCameraTypesStrip />
      </div>

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
            <h2 className="mb-10 text-left font-title text-3xl font-bold text-white sm:text-4xl">
              Residential CCTV, surveyed properly
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: Home,
                title: "Tailored to your home",
                text: "Houses, flats and driveways, coverage planned on survey, not a one-size-fits-all kit.",
              },
              {
                icon: Smartphone,
                title: "Remote viewing where supported",
                text: "Live and recorded access from phone or tablet only where the system supplied supports it.",
              },
              {
                icon: Shield,
                title: "Evidence & oversight",
                text: "Recording supports review and insurance when incidents occur, CCTV does not guarantee crime will be prevented.",
              },
            ].map((item, i) => (
              <ServiceItemReveal key={i} index={i} className="h-full min-h-0">
                <ServiceFeatureIconCard icon={item.icon} title={item.title} description={item.text} />
              </ServiceItemReveal>
            ))}
          </div>
        </section>

        <div className="border-t border-white/15" />

        <FsServiceTextImageSectionGroup>
          <FsServiceTextImageSection
            title="Planning a domestic CCTV system"
            titleId="planning-domestic-cctv-heading"
            imageSrc={DOMESTIC_CCTV_PLANNING_IMAGE_SRC}
            imageAlt="Planning a domestic CCTV system, site survey and security assessment"
          >
            <p>
              Before installation we offer a free survey and written recommendations for your property. The report can
              highlight practical improvements (for example side-access gates) that affect where cameras should go,
              physical security and camera placement work together.
            </p>
            <p>
              Service area: <strong className="font-semibold text-white">London and the Home Counties</strong>. If you
              are outside that area, contact us and we will say clearly whether we can help.
            </p>
            <p>
              Residential enquiries use the same contact form as our CCTV service, select{" "}
              <strong className="font-semibold text-white">CCTV Systems</strong> and note that it is a domestic /
              homeowner enquiry so we can respond appropriately.
            </p>
            <div className="pt-2">
              <CustomPillButton href={RESIDENTIAL_ENQUIRY_HREF} size="md">
                Residential CCTV enquiry
              </CustomPillButton>
            </div>
          </FsServiceTextImageSection>

          <div className="border-t border-white/15" />

          <FsServiceTextImageSection
            title="Bespoke domestic CCTV systems"
            titleId="bespoke-domestic-cctv-heading"
            imageSrc={DOMESTIC_CCTV_BESPOKE_IMAGE_SRC}
            imageAlt="Bespoke domestic CCTV system installation"
          >
            <p>
              Domestic systems are specified after we understand how you use the property, driveway, side access,
              gardens and entrances, and what you need to review if something happens. Equipment and recording are
              chosen for that brief; quotes follow the survey rather than a published price list.
            </p>
            <p>
              We position cameras to capture useful images of approaches you care about, while explaining privacy limits
              around neighbours and public space so you can operate the system lawfully.
            </p>
          </FsServiceTextImageSection>

          <div className="border-t border-white/15" />

          <FsServiceTextImageSection
            title="How homeowners use domestic CCTV"
            titleId="why-install-domestic-cctv-heading"
            imageSrc={DOMESTIC_CCTV_WHY_INSTALL_IMAGE_SRC}
            imageAlt="How homeowners use domestic CCTV"
          >
            <FsServiceBenefitsList items={WHY_INSTALL_DOMESTIC_CCTV} />
          </FsServiceTextImageSection>
        </FsServiceTextImageSectionGroup>

        <div className="border-t border-white/15" />

        <CctvComplianceSection
          intro="Domestic CCTV should be proportionate, clearly communicated and used lawfully. We design and install home systems with sensible coverage, and explain signage and retention at handover. Configuring privacy-conscious settings does not transfer legal responsibility, the householder remains responsible for lawful operation under UK GDPR and related rules."
          standardsItems={[
            "BS EN 62676 (video surveillance systems) where applicable",
            "NSI Gold-aligned installation practice",
            "Privacy guidance at handover, householder retains lawful-use responsibility under UK GDPR",
          ]}
          footerNote={
            <>
              Commercial sites should use our{" "}
              <Link
                href="/services/cctv/commercial"
                className="text-black underline decoration-black/30 underline-offset-2 hover:decoration-black"
              >
                commercial CCTV
              </Link>{" "}
              page. Full overview:{" "}
              <Link
                href="/services/cctv-systems"
                className="text-black underline decoration-black/30 underline-offset-2 hover:decoration-black"
              >
                CCTV systems
              </Link>
              .
            </>
          }
          deliverablesItems={[
            "Survey-led camera placement and coverage plan",
            "Recording setup and operator handover (including app access where supported)",
            "Installation and commissioning",
            "Guidance on privacy, signage and retention",
            "Optional maintenance and health checks",
          ]}
        />

        <CctvWhatWeOfferSection eyebrow="Domestic" items={WHAT_WE_OFFER_ITEMS} />

        <ServicePageClosingSections
          serviceTitleShort="Domestic CCTV"
          ctaImageSrc={serviceHeroImages.domesticCctv}
          ctaHeadline="Request a"
          ctaHeadlineAccent="residential survey."
          ctaDescription="Free site visit and recommendations for homes in London and the Home Counties. Quotes follow the survey, no online package pricing. No obligation."
        >
          <CustomPillButton href={RESIDENTIAL_ENQUIRY_HREF} size="md">
            Residential CCTV enquiry
          </CustomPillButton>
          <CustomPillButton href="tel:02083032280" size="md" variant="outline">
            Call 020 8303 2280
          </CustomPillButton>
        </ServicePageClosingSections>
      </div>
    </div>
  )
}
