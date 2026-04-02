"use client"

import { CheckCircle } from "lucide-react"

const itemCardClass =
  "rounded-tl-[1.25rem] rounded-br-[1.25rem] border border-white/18 bg-[linear-gradient(135deg,rgba(255,255,255,0.07)_0%,rgba(0,0,0,0.35)_100%)] px-5 py-5 sm:px-6 sm:py-6"

type CctvWhatWeOfferSectionProps = {
  /** Small caps label above the heading */
  eyebrow?: string
  title?: string
  items: string[]
  /** Optional intro under the title (e.g. advice page) */
  description?: string
}

/** Shared “What we offer” block for CCTV domestic / commercial / advice — no CTA */
export function CctvWhatWeOfferSection({
  eyebrow = "Scope",
  title = "What we offer",
  items,
  description,
}: CctvWhatWeOfferSectionProps) {
  return (
    <>
      <div className="border-t border-white/15" />
      <section className="container mx-auto max-w-6xl px-6 py-14 lg:py-20" aria-labelledby="cctv-what-we-offer-heading">
        <span className="section-label mb-3 block text-white/55">{eyebrow}</span>
        <h2
          id="cctv-what-we-offer-heading"
          className={`max-w-3xl font-title text-3xl font-bold tracking-tight text-white sm:text-4xl ${description ? "mb-6 sm:mb-8" : "mb-10"}`}
        >
          {title}
        </h2>
        {description ? (
          <p className="mb-10 max-w-3xl text-left text-lg leading-relaxed text-gray-300">{description}</p>
        ) : null}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          {items.map((text, i) => (
            <div key={i} className={itemCardClass}>
              <div className="flex gap-4">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-tl-lg rounded-br-lg border border-white/22 bg-black/50"
                  aria-hidden
                >
                  <CheckCircle className="h-5 w-5 text-white/75" strokeWidth={2} />
                </span>
                <p className="min-w-0 text-left text-base leading-relaxed text-gray-200">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
