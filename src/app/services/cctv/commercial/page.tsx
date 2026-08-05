"use client"

import Link from "next/link"
import { CctvComplianceSection } from "@/components/CctvComplianceSection"
import { CctvWhatWeOfferSection } from "@/components/CctvWhatWeOfferSection"
import { FsCctvCameraTypesStrip } from "@/components/FsCctvCameraTypesStrip"
import { ServicePageClosingSections } from "@/components/ServicePageClosingSections"
import { FsCctvSubpageHeroButtons } from "@/components/FsCctvSubpageHeroButtons"
import { FsServiceBenefitsList } from "@/components/FsServiceBenefitsList"
import { FsServiceTextImageSection } from "@/components/FsServiceTextImageSection"
import { FsServiceTextImageSectionGroup } from "@/components/FsServiceTextImageSectionGroup"
import { ServicePageHero } from "@/components/ServicePageHero"
import { Reveal } from "@/components/Reveal"
import { ServiceItemReveal } from "@/components/ServiceItemReveal"
import { CustomPillButton } from "@/components/ui/CustomPillButton"
import { FS_SERVICE_SHIMMER_CARD_FEATURE } from "@/lib/fsServicePageCards"
import { serviceHeroImages } from "@/lib/serviceHeroImages"
import { Building2, Monitor, Lock, ShoppingBag, Hotel, HeartPulse, GraduationCap, Landmark } from "lucide-react"

const WHAT_WE_OFFER_ITEMS = [
  "Site survey and system design",
  "IP and analogue camera systems",
  "NVR/DVR and cloud recording",
  "GDPR-compliant data handling",
  "Installation, commissioning and training",
  "Ongoing maintenance and support",
  "Multi-site roll-out and centralised monitoring options",
  "Integration with access control and intruder alarms",
  "Documentation and handover packs aligned with NSI expectations",
]

/** Public folder: `public/service images/cctv /` */
const COMMERCIAL_CCTV_BESPOKE_IMAGE_SRC =
  "/service%20images/cctv%20/Bespoke%20Commercial%20CCTV%20Systems.jpg"
const COMMERCIAL_CCTV_MONITORING_IMAGE_SRC =
  "/service%20images/cctv%20/Benefits%20of%20a%20Commercial%20CCTV%20System%20.jpg"

const COMMERCIAL_CCTV_BENEFITS = [
  "Provide security and safety for your staff and visitors.",
  "Monitor activity in a car park.",
  "Deter theft or robberies and obtain evidence to support a prosecution.",
  "Monitor access to the grounds of or entrance to a building or part of a building.",
  "Maintain health and safety practices and procedures.",
  "Watch over a till point to spot any potential malpractice.",
  "Observe stock in a warehouse.",
  "Helping a lone shopkeeper to view all areas of the shop.",
] as const

const COMMERCIAL_CCTV_SECTORS = [
  {
    icon: ShoppingBag,
    label: "Retail",
    text: "Protect shop floors, stock rooms and till points with visible coverage that deters theft and gives clear evidence when incidents occur.",
  },
  {
    icon: Hotel,
    label: "Hotels",
    text: "Monitor reception areas, corridors, car parks and service entrances to protect guests and staff while supporting day-to-day hotel operations.",
  },
  {
    icon: HeartPulse,
    label: "Healthcare",
    text: "Support patient and staff safety across wards, clinics and car parks with discreet camera placement aligned with healthcare site requirements.",
  },
  {
    icon: GraduationCap,
    label: "Education",
    text: "Cover entrances, playgrounds and shared areas to help schools and colleges manage access, monitor activity and respond quickly to incidents.",
  },
  {
    icon: Landmark,
    label: "Banking",
    text: "Secure counters, cash handling areas and high-value zones with high-quality recording suitable for audit, investigation and compliance review.",
  },
  {
    icon: Building2,
    label: "Corporate",
    text: "From single offices to multi-site estates, we deliver scalable CCTV that integrates with access control and supports remote monitoring.",
  },
] as const

export default function CommercialCctvPage() {
  return (
    <div className="service-page-root min-h-screen overflow-x-hidden text-white">
      <div className="relative">
        <ServicePageHero
          title="Commercial CCTV systems"
          imageSrc={serviceHeroImages.commercialCctv}
          imageClassName="object-cover [object-position:50%_78%] sm:[object-position:50%_82%]"
          heroCompliance={["GDPR", "BS EN 62676"]}
          afterIntro={<FsCctvSubpageHeroButtons />}
          intro="High-performance CCTV for offices, retail, warehouses, and multi-site operations. We design and install scalable systems with remote monitoring, integration with access control and intruder alarms, and compliance with GDPR and industry standards."
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
            <h2 className="mb-10 text-left font-title text-3xl font-bold text-white sm:text-4xl">Commercial CCTV solutions</h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: Building2,
                title: "Multi-site & scalable",
                text: "From single premises to estate-wide networks with centralised monitoring.",
              },
              { icon: Monitor, title: "24/7 monitoring", text: "Optional alarm receiving and video monitoring with rapid response." },
              { icon: Lock, title: "Integration", text: "CCTV working with access control, intruder alarms, and fire systems." },
            ].map((item, i) => (
              <ServiceItemReveal key={i} index={i} className="h-full min-h-0">
                <div className={FS_SERVICE_SHIMMER_CARD_FEATURE}>
                <item.icon className="mb-4 h-8 w-8 text-white" strokeWidth={1.75} />
                <h3 className="mb-3 text-left text-xl font-semibold text-white">{item.title}</h3>
                <p className="text-left text-gray-300">{item.text}</p>
                </div>
              </ServiceItemReveal>
            ))}
          </div>

          <Reveal>
            <h2
              id="commercial-cctv-businesses-heading"
              className="mb-4 mt-16 text-left font-title text-3xl font-bold text-white sm:mt-20 sm:text-4xl lg:mt-24"
            >
              CCTV Systems for Businesses
            </h2>
          </Reveal>
          <Reveal delayMs={70}>
            <p className="mb-10 max-w-3xl text-left text-base leading-relaxed text-gray-300 sm:text-lg">
              We design and install Commercial CCTV Systems in the following sectors:
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {COMMERCIAL_CCTV_SECTORS.map(({ icon: Icon, label, text }, i) => (
              <ServiceItemReveal key={label} index={i} className="h-full min-h-0">
                <div className={FS_SERVICE_SHIMMER_CARD_FEATURE}>
                <Icon className="mb-4 h-8 w-8 text-white" strokeWidth={1.75} aria-hidden />
                <h3 className="mb-3 text-left text-xl font-semibold text-white">{label}</h3>
                <p className="text-left text-gray-300">{text}</p>
                </div>
              </ServiceItemReveal>
            ))}
          </div>
        </section>

        <div className="border-t border-white/15" />

        <FsServiceTextImageSectionGroup>
          <FsServiceTextImageSection
          title="Bespoke Commercial CCTV Systems"
          titleId="bespoke-commercial-cctv-heading"
          imageSrc={COMMERCIAL_CCTV_BESPOKE_IMAGE_SRC}
          imageAlt="Bespoke commercial CCTV system installation"
          imageRightFeather={false}
        >
          <p>
            A well designed and high quality CCTV system can be a highly effective tool to help organisations and
            businesses protect themselves from all kinds of activity. We help customers of all shapes and sizes, ranging
            from shop owners and small businesses through to corporate head offices and public buildings like hospitals,
            libraries and schools.
          </p>
          <p>
            We have over 35 years experience working in the CCTV industry and the quality of our work speaks for itself,
            with customers that rely on us to provide them with the peace of mind that a well designed, well installed
            and reliable CCTV system can bring.
          </p>
          <p>
            Simply complete the Commercial CCTV System enquiry form and we will contact you and arrange to meet you to
            discuss your requirements and carry out a survey of your property.
          </p>
          <div className="pt-2">
            <CustomPillButton href="/contact" size="md">
              Commercial CCTV enquiry form
            </CustomPillButton>
          </div>
        </FsServiceTextImageSection>

        <div className="border-t border-white/15" />

        <FsServiceTextImageSection
          title="Commercial CCTV Monitoring & Burglary Protection"
          titleId="commercial-cctv-monitoring-burglary-heading"
          imageSrc={COMMERCIAL_CCTV_MONITORING_IMAGE_SRC}
          imageAlt="Commercial CCTV monitoring and burglary protection"
          imageSide="left"
          imageRightFeather={false}
        >
          <p>
            Live and recorded monitoring helps you oversee car parks, entrances, trading floors and remote sites, with
            optional alarm receiving centre integration and multi-site review for estates that need a single view of
            activity across their portfolio.
          </p>
          <p>
            Visible commercial CCTV also deters break-ins, robbery and after-hours intrusion, while high-quality recording
            supports insurance claims, internal investigations and prosecution when incidents occur on your premises.
          </p>
        </FsServiceTextImageSection>

        <div className="border-t border-white/15" />

        <FsServiceTextImageSection
          title="Benefits of a Commercial CCTV System"
          titleId="commercial-cctv-benefits-heading"
          imageAlt="Benefits of a commercial CCTV system"
          imageRightFeather={false}
          imageCantInsetPercent={14}
          imageEdgeWidthVw={54}
          imageEdgeMaxWidth="none"
          imageClassName="object-cover object-[62%_center]"
        >
          <FsServiceBenefitsList items={COMMERCIAL_CCTV_BENEFITS} />
        </FsServiceTextImageSection>
        </FsServiceTextImageSectionGroup>

        <div className="border-t border-white/15" />

        <CctvComplianceSection
          intro="For offices, retail, warehouses and multi-site estates we design and install scalable CCTV with remote monitoring, perimeter protection and secure network configuration, aligned with NSI expectations, BS EN 62676 where applicable, and GDPR-compliant recording and retention design."
          standardsItems={[
            "NSI approved installers",
            "BS EN 62676 (video surveillance systems)",
            "GDPR-compliant data handling and retention design",
          ]}
          footerNote={
            <>
              Intruder alarm installations follow PD 6662 and BS EN 50131, see our{" "}
              <Link href="/services/intruder-alarm-systems" className="text-black underline decoration-black/30 underline-offset-2 hover:decoration-black">
                intruder alarm systems
              </Link>{" "}
              page. Full CCTV scope:{" "}
              <Link href="/services/cctv-systems" className="text-black underline decoration-black/30 underline-offset-2 hover:decoration-black">
                CCTV systems
              </Link>
              .
            </>
          }
          deliverablesItems={[
            "Camera schedules and network diagrams",
            "Recording retention and user permission setup",
            "Site survey and system design",
            "Installation and commissioning",
            "User training and handover",
            "Ongoing maintenance and monitoring",
          ]}
        />

        <CctvWhatWeOfferSection eyebrow="Commercial" items={WHAT_WE_OFFER_ITEMS} />

        <ServicePageClosingSections
          serviceTitleShort="Commercial CCTV"
          ctaImageSrc={serviceHeroImages.commercialCctv}
          ctaHeadline="Request your"
          ctaHeadlineAccent="free commercial survey."
          ctaDescription="Site visit, coverage review and written recommendations. No obligation. We respond promptly across London and the Home Counties."
        >
          <CustomPillButton href="/contact" size="md">
            Book a survey
          </CustomPillButton>
          <CustomPillButton href="tel:02083032280" size="md" variant="outline">
            Call 020 8303 2280
          </CustomPillButton>
        </ServicePageClosingSections>
      </div>
    </div>
  )
}
