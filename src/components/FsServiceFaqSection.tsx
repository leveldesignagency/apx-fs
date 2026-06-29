"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"
import { Reveal } from "@/components/Reveal"
import { ServiceItemReveal } from "@/components/ServiceItemReveal"
import { cn } from "@/lib/utils"

import { FS_SERVICE_FAQ_FALLBACK, type ServiceFaqItem } from "@/lib/fs-service-faq-content"

/** Matches ServicePageHero / ServicePageBottomCta horizontal rhythm */
const FS_SERVICE_CONTENT_OUTER_CLASS = "container relative mx-auto w-full px-6 lg:px-8"

export type { ServiceFaqItem }
export { FS_SERVICE_FAQ_FALLBACK as FS_SERVICE_FAQ_DEFAULT }

type Props = {
  items?: ServiceFaqItem[]
  variant?: "dark" | "light"
}

export function FsServiceFaqSection({ items = FS_SERVICE_FAQ_FALLBACK, variant = "dark" }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const isLight = variant === "light"

  return (
    <section
      className={cn(
        "border-t pb-24 pt-14 sm:pb-28 sm:pt-16 lg:pb-32",
        isLight ? "service-page-white-band fs-service-faq-section--light border-black/10" : "border-white/10 bg-black"
      )}
      aria-labelledby="fs-service-faq-heading"
    >
      <div className={FS_SERVICE_CONTENT_OUTER_CLASS}>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:gap-x-16 xl:gap-x-24">
          <Reveal className="lg:pt-1">
            <h2
              id="fs-service-faq-heading"
              className={cn(
                "font-title text-2xl font-bold normal-case leading-tight tracking-tight sm:text-3xl md:text-4xl",
                !isLight && "text-white"
              )}
            >
              Frequently
              <br />
              asked questions
            </h2>
          </Reveal>

          <div className="min-w-0 space-y-3 sm:space-y-4">
            {items.map((item, i) => {
              const isOpen = openIndex === i
              const panelId = `fs-faq-panel-${i}`
              const buttonId = `fs-faq-trigger-${i}`
              return (
                <ServiceItemReveal key={item.question} index={i} stepMs={65} className="block">
                  <div
                    className={cn(
                      "fs-service-faq-card overflow-hidden rounded-tl-2xl rounded-br-2xl border shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
                      isLight ? "shadow-[inset_0_1px_0_rgba(0,0,0,0.04)]" : "border-white/20 bg-black/50"
                    )}
                  >
                  <button
                    id={buttonId}
                    type="button"
                    className={cn(
                      "flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:px-6 sm:py-5",
                      isLight
                        ? "hover:bg-black/[0.04] focus-visible:ring-black/35 focus-visible:ring-offset-white"
                        : "hover:bg-white/[0.04] focus-visible:ring-white/40 focus-visible:ring-offset-black"
                    )}
                    onClick={() => setOpenIndex((v) => (v === i ? null : i))}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                  >
                    <span
                      className={cn(
                        "fs-service-faq-card__question text-base font-semibold normal-case leading-snug sm:text-lg",
                        !isLight && "text-white"
                      )}
                    >
                      {item.question}
                    </span>
                    <span
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:duration-150",
                        isLight ? "border-black/25 bg-black/5 text-black" : "border-white/35 bg-white/10 text-white",
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
                        className={cn(
                          "fs-service-faq-card__answer border-t px-5 pb-5 pt-4 text-sm leading-relaxed sm:px-6 sm:pb-6 sm:text-base",
                          isLight ? "text-neutral-700" : "border-white/10 text-white/75"
                        )}
                      >
                        {item.answer}
                      </div>
                    </div>
                  </div>
                  </div>
                </ServiceItemReveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
