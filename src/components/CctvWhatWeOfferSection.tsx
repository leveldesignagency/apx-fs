"use client"

import { CheckCircle } from "lucide-react"

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
      <section
        className="container mx-auto px-6 pt-14 pb-24 lg:pt-20 lg:pb-32"
        aria-labelledby="cctv-what-we-offer-heading"
      >
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
        <ul className="grid list-none grid-cols-1 gap-x-12 gap-y-5 md:grid-cols-2 md:gap-y-5">
          {items.map((text, i) => (
            <li key={i} className="flex gap-3.5 items-start">
              <CheckCircle
                className="mt-0.5 h-5 w-5 shrink-0 text-white/65"
                strokeWidth={2}
                aria-hidden
              />
              <span className="min-w-0 text-left text-base leading-relaxed text-gray-200">{text}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
