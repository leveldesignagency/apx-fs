"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const CCTV_CONSIDERATION_ITEMS = [
  {
    question: "Do I need to monitor the vehicles parked at the front of the house or in the office car park?",
    answer:
      "If vehicles are a common target or you need evidence of access to your premises, a dedicated camera covering the driveway or car park is worthwhile. We can advise on height, angle and lens choice so faces and activity are captured clearly without unnecessary blind spots.",
  },
  {
    question: "Do I need to be able to capture a clear image of a vehicle's registration plate?",
    answer:
      "Number plate recognition needs the right camera position, resolution and shutter settings, often a separate narrow-view camera at the entrance. Tell us if ANPR-style capture is a priority and we will specify equipment and placement accordingly.",
  },
  {
    question: "Do I need to record activity along the side of my property?",
    answer:
      "Side access routes are a frequent entry point for intruders. If you have an open path, gate or alley alongside the building, a camera covering that route can deter crime and provide evidence if someone attempts to enter.",
  },
  {
    question:
      "Will I need to monitor activity in the garden and should these images be of the entire garden or only close approaches to the dwelling or both?",
    answer:
      "That depends on what you want to see: wide coverage for general activity, tighter views on doors and windows, or both. A survey helps decide whether one wide-angle camera is enough or whether you need separate views for the garden and approach paths.",
  },
  {
    question: "Do I need to monitor the garage or any other outbuildings?",
    answer:
      "Detached garages, sheds and store rooms are often less visible from the house but hold valuable items. If they are out of sight from other cameras, a dedicated external camera is usually the practical solution.",
  },
  {
    question:
      "How many cameras and of what type am I going to need, and do I need to install them all at the same time?",
    answer:
      "You do not have to install everything at once. We can design a system in phases, for example perimeter coverage first, then internal or rear areas, as long as the recorder and cabling plan allow for future expansion.",
  },
  {
    question: "Is there a vulnerable flat roof which needs its own camera?",
    answer:
      "Flat roofs and low extensions can be climbed to reach upper windows. If that is a realistic route onto your property, an elevated or angled camera covering the roof line can be an important part of the design.",
  },
  {
    question: "What other vulnerable places around my home or business are there that also need watching?",
    answer:
      "Think about rear gates, loading bays, cash handling areas, stock rooms and any blind corners staff cannot see while serving customers. Listing these during a survey ensures nothing important is missed from the design.",
  },
  {
    question: "Do I want to monitor rooms inside of the dwelling?",
    answer:
      "Internal cameras are possible but must be justified, proportionate and communicated to household members or staff. We will discuss privacy, signage and whether internal coverage is genuinely needed or better achieved with external cameras only.",
  },
  {
    question: "What sort of images do you want your cameras to capture?",
    answer:
      "Identify whether you need identification of people, overview of an area, close detail at a till or door, or evidence-grade footage for prosecution. That drives camera type, resolution and storage requirements.",
  },
  {
    question: "How will I record the images, and should these be recorded on-site, off-site or both?",
    answer:
      "Most systems use an on-site NVR or DVR; cloud or off-site backup adds resilience if equipment is stolen or damaged. We will explain retention periods, storage capacity and GDPR-compliant access controls at handover.",
  },
  {
    question: "Do I want to monitor images in real time via a portable device such as a phone or laptop?",
    answer:
      "Remote viewing is standard on many modern systems via app or browser. We can set up secure access, user permissions and alerts so you can check live or recorded footage when you are away from the site.",
  },
  {
    question: "How will I run the cables to the cameras? (if required as many cameras are now wire-free).",
    answer:
      "Wired cameras offer reliable power and bandwidth; wireless or battery options suit some locations but still need thoughtful placement. We plan cable routes, containment and power supplies to keep installation tidy and maintainable.",
  },
  {
    question:
      "Should I use infra-red cameras at night or is the artificial light sufficient to use low light cameras?",
    answer:
      "Infra-red gives consistent night images where lighting is poor or switched off. Where street or security lighting is reliable, low-light colour cameras may be enough. We match camera type to each location during the survey.",
  },
] as const

export function CctvAdviceConsiderationsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="border-t border-white/15 bg-black" aria-labelledby="cctv-advice-considerations-heading">
      <div className="container relative mx-auto px-6 py-16 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-x-16 xl:gap-x-24">
          <div className="lg:pt-1">
            <h2
              id="cctv-advice-considerations-heading"
              className="max-w-xl text-left font-title text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl"
            >
              Things to consider with a CCTV system
            </h2>
            <p className="mt-6 max-w-xl text-left text-base leading-relaxed text-gray-300 sm:text-lg">
              Some useful questions you should ask yourself when thinking about a CCTV system:
            </p>
            <p className="mt-4 max-w-xl text-left text-base leading-relaxed text-gray-300 sm:text-lg">
              When it comes to thinking about the kind of CCTV system you want for your home or business, there are lots of
              different options and you have a wide variety of equipment to choose from. At APX, we take the time to find out
              exactly what our customers want to achieve with their CCTV systems and design them accordingly. Here is some
              useful CCTV advice that you may find helpful.
            </p>
          </div>

          <div className="min-w-0 space-y-3 sm:space-y-4">
            {CCTV_CONSIDERATION_ITEMS.map(({ question, answer }, i) => {
              const isOpen = openIndex === i
              const panelId = `cctv-advice-consideration-panel-${i}`
              const buttonId = `cctv-advice-consideration-trigger-${i}`

              return (
                <div
                  key={question}
                  className="fs-service-faq-card overflow-hidden rounded-tl-2xl rounded-br-2xl border border-white/20 bg-black/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                >
                  <button
                    id={buttonId}
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-6 sm:py-5"
                    onClick={() => setOpenIndex((v) => (v === i ? null : i))}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                  >
                    <span className="fs-service-faq-card__question text-base font-semibold leading-snug text-white normal-case sm:text-lg">
                      {question}
                    </span>
                    <span
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/35 bg-white/10 text-white transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:duration-150",
                        isOpen && "rotate-90"
                      )}
                      aria-hidden
                    >
                      <ChevronRight className="h-4 w-4" strokeWidth={2.25} />
                    </span>
                  </button>
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                    aria-hidden={!isOpen}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        className="fs-service-faq-card__answer border-t border-white/10 px-5 pb-5 pt-4 text-sm leading-relaxed text-white/75 sm:px-6 sm:pb-6 sm:text-base"
                      >
                        {answer}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
