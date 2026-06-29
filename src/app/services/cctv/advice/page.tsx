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
import { FS_SERVICE_SHIMMER_CARD_FEATURE } from "@/lib/fsServicePageCards"
import { serviceHeroImages } from "@/lib/serviceHeroImages"
import { Camera, FileCheck, HelpCircle } from "lucide-react"

const WHAT_WE_OFFER_ITEMS = [
  "Free, no-obligation survey of your property",
  "Discussion of risks, coverage and budget",
  "Guidance on camera types, resolution and night vision",
  "Advice on recording, retention, signage and GDPR",
  "What to expect from a professional installer",
  "Wired vs wireless options and cabling considerations",
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
        heroCompliance={["GDPR", "BS EN 62676"]}
        afterIntro={<FsCctvSubpageHeroButtons />}
        intro="Not sure what you need? We've put together practical advice on choosing and using CCTV, from camera types and placement to recording, data protection, and working with a professional installer."
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
                text: "Indoor vs outdoor, resolution, night vision, and whether to go wired or wireless, we help you decide.",
              },
              {
                icon: FileCheck,
                title: "Placement & coverage",
                text: "Where to put cameras for the best coverage and evidence, and how to stay within the law.",
              },
              {
                icon: HelpCircle,
                title: "Data protection & signage",
                text: "GDPR, signage, retention periods, and sharing footage with police or insurers.",
              },
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
        </section>

        <CctvAdviceConsiderationsSection />

        <FsServiceTextImageSectionGroup>
          <FsServiceTextImageSection
            title="What is your ‘Operational Requirement’?"
            titleId="cctv-operational-requirement-heading"
            imageSrc={CCTV_OPERATIONAL_REQUIREMENT_IMAGE_SRC}
            imageAlt="Planning a CCTV operational requirement"
            imageRightFeather={false}
          >
            <p>
              An operational requirement (known as an OR) is basically a list of the problems that you want the CCTV to
              help with. It is used to design the installation, to work out the level of its performance and what its
              functionality should be and to determine if the final installation meets with the requirements of the OR.
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
            imageSide="left"
            imageRightFeather={false}
          >
            <p>
              A common concern we often hear is from shopkeepers who are struggling to deal with frequent shoplifting.
              Serving genuine customers and other distractions can easily lead to thefts going unnoticed, particularly
              when working alone as it can be difficult for them to effectively and constantly view all areas of the
              shop.
            </p>
            <p>
              We can help to identify the most vulnerable areas of the shop and advise on how they&apos;ll be able to
              effectively monitor the captured images. We will also advise on signage and the fitting of a monitor to
              publicly display the images being recorded which can help to deter any shoplifting or potential robberies
              taking place.
            </p>
            <p>
              At APX Fire &amp; Security we work with business of all sizes, and are pleased to offer a free survey and a
              report for your business premises. If you&apos;d like to have a chat with no obligation, get some more
              useful CCTV advice, and find out what we can do to help you,{" "}
              <Link
                href="/contact"
                className="text-white underline decoration-white/35 underline-offset-2 hover:decoration-white"
              >
                please get in touch
              </Link>
              .
            </p>
          </FsServiceTextImageSection>
        </FsServiceTextImageSectionGroup>

        <CctvComplianceSection
          intro="Whether you are comparing installers or planning coverage, the same standards apply to lawful recording, retention and signage, understanding them helps you choose a system that is evidence-ready and aligned with GDPR and industry expectations for video surveillance."
          standardsItems={[
            "Professional installers (e.g. NSI-approved) for design and commissioning",
            "BS EN 62676, video surveillance systems (where applicable)",
            "GDPR-compliant handling: signage, retention limits and lawful use",
          ]}
          footerNote={
            <>
              When you are ready to proceed, our main service pages cover{" "}
              <Link href="/services/cctv-systems" className="text-black underline decoration-black/30 underline-offset-2 hover:decoration-black">
                CCTV systems
              </Link>{" "}
              and{" "}
              <Link href="/services/intruder-alarm-systems" className="text-black underline decoration-black/30 underline-offset-2 hover:decoration-black">
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
          ctaTitle="Get tailored CCTV advice for your property"
          ctaDescription="Book a free, no-obligation survey and we will recommend the right camera coverage, recording and compliance approach for your home or business."
        >
          <CustomPillButton href="/contact" size="md">
            Request a free survey
          </CustomPillButton>
          <CustomPillButton href="tel:02083032280" size="md" variant="outline">
            Call 020 8303 2280
          </CustomPillButton>
        </ServicePageClosingSections>
      </div>
    </div>
  )
}
