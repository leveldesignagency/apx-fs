"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

import { FS_SERVICE_FAQ_FALLBACK, type ServiceFaqItem } from "@/lib/fs-service-faq-content"

/** Matches ServicePageHero / ServicePageBottomCta horizontal rhythm */
const FS_SERVICE_CONTENT_OUTER_CLASS = "container relative mx-auto w-full px-6 lg:px-8"

export type { ServiceFaqItem }
export { FS_SERVICE_FAQ_FALLBACK as FS_SERVICE_FAQ_DEFAULT }

type Props = {
  items?: ServiceFaqItem[]
}

export function FsServiceFaqSection({ items = FS_SERVICE_FAQ_FALLBACK }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="border-t border-white/10 bg-black pb-24 pt-14 sm:pb-28 sm:pt-16 lg:pb-32" aria-labelledby="fs-service-faq-heading">
      <div className={FS_SERVICE_CONTENT_OUTER_CLASS}>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:gap-x-16 xl:gap-x-24">
          <div className="lg:pt-1">
            <h2 id="fs-service-faq-heading" className="font-title text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
              Frequently
              <br />
              asked questions
            </h2>
          </div>

          <div className="min-w-0 space-y-3 sm:space-y-4">
            {items.map((item, i) => {
              const isOpen = openIndex === i
              const panelId = `fs-faq-panel-${i}`
              const buttonId = `fs-faq-trigger-${i}`
              return (
                <div
                  key={item.question}
                  className="overflow-hidden rounded-tl-2xl rounded-br-2xl border border-white/20 bg-black/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                >
                  <button
                    id={buttonId}
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-6 sm:py-5"
                    onClick={() => setOpenIndex((v) => (v === i ? null : i))}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                  >
                    <span className="font-title text-base font-semibold leading-snug text-white sm:text-lg">{item.question}</span>
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
                        className="border-t border-white/10 px-5 pb-5 pt-4 text-sm leading-relaxed text-white/75 sm:px-6 sm:pb-6 sm:text-base"
                      >
                        {item.answer}
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
