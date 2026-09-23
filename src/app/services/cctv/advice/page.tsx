"use client"

import Link from "next/link"
import { CctvAdviceConsiderationsSection } from "@/components/CctvAdviceConsiderationsSection"
import { CctvComplianceSection } from "@/components/CctvComplianceSection"
import { CctvWhatWeOfferSection } from "@/components/CctvWhatWeOfferSection"
import { FsServiceTextImageSection } from "@/components/FsServiceTextImageSection"
import { FsServiceTextImageSectionGroup } from "@/components/FsServiceTextImageSectionGroup"
import { ServicePageClosingSections } from "@/components/ServicePageClosingSections"
import { FsCctvSubpageHeroButtons } from "@/components/FsCctvSubpageHeroButtons"
import { ServicePageHero } from "@/components/ServicePageHero"
import { Reveal } from "@/components/Reveal"
import { ServiceItemReveal } from "@/components/ServiceItemReveal"
import { CustomPillButton } from "@/components/ui/CustomPillButton"
import { ServiceFeatureIconCard } from "@/components/ServiceFeatureIconCard"
import { serviceHeroImages } from "@/lib/serviceHeroImages"
import { Camera, FileCheck, HelpCircle } from "lucide-react"

const WHAT_WE_OFFER_ITEMS = [
  "Free, no-obligation survey of your property",
  "Discussion of risks, coverage and budget (quotes follow survey)",
  "Guidance on camera types: dome, bullet, PTZ, wireless, infrared",
  "Advice on recording, retention, signage and lawful use under UK GDPR",
  "What to expect from a professional installer",
  "Wired vs wireless options, wireless still needs power",
  "Indoor, outdoor and low-light placement guidance",
  "Lawful recording, signage and sharing footage",
  "Clear next steps: specification, quote and installation",
]

const CCTV_OPERATIONAL_REQUIREMENT_IMAGE_SRC = "/service%20images/cctv%20/cctv-operational-requirement-sq.jpg"
const CCTV_SHOPKEEPER_ADVICE_IMAGE_SRC = "/service%20images/cctv%20/cctv-shopkeeper-prevent-shoplifting-sq.jpg"

export default function UsefulCctvAdvicePage() {
  return (
    <div className="service-page-root min-h-screen overflow-x-hidden text-white">
      <ServicePageHero
        title="Useful CCTV advice"
        imageSrc={serviceHeroImages.cctvAdvice}
        heroCompliance={["BS EN 62676"]}
        afterIntro={<FsCctvSubpageHeroButtons />}
        intro="Practical guidance on choosing and using CCTV, camera types, placement, recording, privacy and working with a professional installer. When you are ready to proceed, enquire via our main CCTV systems page."
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
            <h2 className="mb-10 text-left font-title text-3xl font-bold text-white sm:text-4xl">CCTV advice & guidance</h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: Camera,
                title: "Choosing the right system",
                text: "Indoor vs outdoor, resolution, night vision, and wired vs wireless (wireless still needs power).",
              },
              {
                icon: FileCheck,
                title: "Placement & coverage",
                text: "Where to put cameras for useful coverage and evidence, within lawful and proportionate limits.",
              },
              {
                icon: HelpCircle,
                title: "Data protection & signage",
                text: "UK GDPR, signage, retention and sharing footage, you remain responsible for lawful day-to-day use.",
              },
            ].map((item, i) => (
              <ServiceItemReveal key={i} index={i} className="h-full min-h-0">
                <ServiceFeatureIconCard icon={item.icon} title={item.title} description={item.text} />
              </ServiceItemReveal>
            ))}
          </div>
        </section>

        <CctvAdviceConsiderationsSection />

        <FsServiceTextImageSectionGroup>
          <FsServiceTextImageSection
            title="What is your ‘Operational Requirement’?"
            titleId="cctv-operational-requirement-heading"
            imageSrc={CCTV_OPERATIONAL_REQUIREMENT_IMAGE_SRC}
            imageAlt="Planning a CCTV operational requirement"
          >
            <p>
              An operational requirement (known as an OR) is basically a list of the problems that you want the CCTV to
              help with. It is used to design the installation, to work out the level of its performance and what its
              functionality should be and to determine if the final installation meets the requirements of the OR.
              It doesn&apos;t have to be complicated, but it needs to be precise. Present your OR to us and use it to
              plan your system.
            </p>
            <p>
              In practice it is the installer who will work out the precise locations for the cameras and what type to
              use and will decide on where to run the cables etc, all in liaison with you and with the intention of
              fulfilling your OR. Even if you&apos;re going to install a DIY system, writing down an operational
              requirement will help focus the mind. Bear in mind too that the system you end up with will also be
              determined by the budget you have at your disposal.
            </p>
            <p>
              A combination of poor planning and design of the CCTV system, uncertainty over the purpose of the CCTV
              system and a user&apos;s unrealistic expectations has led to a considerable number of CCTV systems deemed
              not fit for purpose. That is why we recommend a survey is carried out, to eliminate any problems caused by
              bad design.
            </p>
          </FsServiceTextImageSection>

          <div className="border-t border-white/15" />

          <FsServiceTextImageSection
            title="CCTV Advice for Shopkeepers"
            titleId="cctv-shopkeeper-advice-heading"
            imageSrc={CCTV_SHOPKEEPER_ADVICE_IMAGE_SRC}
            imageAlt="CCTV advice for shopkeepers to help prevent shoplifting"
          >
            <p>
              A common concern we often hear is from shopkeepers who are struggling to deal with frequent shoplifting.
              Serving genuine customers and other distractions can easily lead to thefts going unnoticed, particularly
              when working alone as it can be difficult for them to effectively and constantly view all areas of the
              shop.
            </p>
            <p>
              We can help identify vulnerable areas of the shop and advise how captured images can be monitored. We also
              advise on signage and, where appropriate, a monitor that publicly displays live images to support day-to-day
              oversight. CCTV supports monitoring and evidence, it does not guarantee theft will be prevented.
            </p>
            <p>
              At APX Fire &amp; Security we work with businesses of all sizes and offer a free survey and report for your
              premises. For a no-obligation chat and tailored CCTV advice,{" "}
              <Link
                href="/contact?service=cctv-systems"
                className="text-white underline decoration-white/35 underline-offset-2 hover:decoration-white"
              >
                start a CCTV enquiry
              </Link>{" "}
              or browse{" "}
              <Link
                href="/services/cctv-systems"
                className="text-white underline decoration-white/35 underline-offset-2 hover:decoration-white"
              >
                CCTV systems
              </Link>
              .
            </p>
          </FsServiceTextImageSection>
        </FsServiceTextImageSectionGroup>

        <CctvComplianceSection
          intro="Whether you are comparing installers or planning coverage, the same themes apply: sensible coverage, clear signage, defined retention and lawful use. We can advise and configure systems with privacy in mind; the customer remains responsible for lawful CCTV operation under UK GDPR."
          standardsItems={[
            "NSI Gold-aligned design and commissioning practice",
            "BS EN 62676, video surveillance systems (where applicable)",
            "Privacy guidance at handover, customer retains lawful-use responsibility under UK GDPR",
          ]}
          footerNote={
            <>
              Ready to proceed?{" "}
              <Link
                href="/contact?service=cctv-systems"
                className="text-black underline decoration-black/30 underline-offset-2 hover:decoration-black"
              >
                CCTV enquiry
              </Link>{" "}
              or the{" "}
              <Link
                href="/services/cctv-systems"
                className="text-black underline decoration-black/30 underline-offset-2 hover:decoration-black"
              >
                CCTV systems
              </Link>{" "}
              overview. Related:{" "}
              <Link
                href="/services/intruder-alarm-systems"
                className="text-black underline decoration-black/30 underline-offset-2 hover:decoration-black"
              >
                intruder alarms
              </Link>
              .
            </>
          }
          deliverablesTitle="What to expect from installation"
          deliverablesItems={[
            "Clear scope: cameras, recording and network responsibilities",
            "Commissioning checks and user handover",
            "Documentation for retention, access and incident export",
            "Training on app access and privacy obligations",
            "Maintenance options to keep systems reliable",
          ]}
        />

        <CctvWhatWeOfferSection
          eyebrow="Advice"
          title="What we offer"
          description="The best way to get advice tailored to your property is a free, no-obligation survey. We assess your site, discuss your requirements, and recommend the right CCTV approach."
          items={WHAT_WE_OFFER_ITEMS}
        />

        <ServicePageClosingSections
          serviceTitleShort="CCTV advice"
          ctaImageSrc={serviceHeroImages.cctvAdvice}
          ctaHeadline="Get tailored"
          ctaHeadlineAccent="CCTV advice."
          ctaDescription="Book a free, no-obligation survey and we will recommend the right camera coverage, recording and compliance approach for your home or business."
        >
          <CustomPillButton href="/contact?service=cctv-systems" size="md">
            CCTV enquiry
          </CustomPillButton>
          <CustomPillButton href="tel:02083032280" size="md" variant="outline">
            Call 020 8303 2280
          </CustomPillButton>
        </ServicePageClosingSections>
      </div>
    </div>
  )
}
