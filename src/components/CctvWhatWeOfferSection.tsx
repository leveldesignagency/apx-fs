"use client"

import { CheckCircle } from "lucide-react"
import { Reveal } from "@/components/Reveal"
import { ServiceItemReveal } from "@/components/ServiceItemReveal"

type CctvWhatWeOfferSectionProps = {
  /** Small caps label above the heading */
  eyebrow?: string
  title?: string
  items: string[]
  /** Optional intro under the title (e.g. advice page) */
  description?: string
}

/** Shared “What we offer” block for CCTV domestic / commercial / advice, no CTA */
export function CctvWhatWeOfferSection({
  eyebrow = "Scope",
  title = "What we offer",
  items,
  description,
}: CctvWhatWeOfferSectionProps) {
  return (
    <section className="bg-white text-black" aria-labelledby="cctv-what-we-offer-heading">
        <div className="container mx-auto px-6 pt-14 pb-24 lg:pt-20 lg:pb-32">
          <Reveal>
            <span className="section-label mb-3 block text-neutral-500">{eyebrow}</span>
            <h2
              id="cctv-what-we-offer-heading"
              className={`max-w-3xl font-title text-3xl font-bold tracking-tight text-black sm:text-4xl ${description ? "mb-6 sm:mb-8" : "mb-10"}`}
            >
              {title}
            </h2>
          </Reveal>
          {description ? (
            <Reveal delayMs={70}>
              <p className="mb-10 max-w-3xl text-left text-lg leading-relaxed text-neutral-600">{description}</p>
            </Reveal>
          ) : null}
          <ul className="grid list-none grid-cols-1 gap-x-12 gap-y-5 md:grid-cols-2 md:gap-y-5">
            {items.map((text, i) => (
              <ServiceItemReveal key={text} index={i} stepMs={55} className="contents">
                <li className="flex items-start gap-3.5">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-black/40" strokeWidth={2} aria-hidden />
                  <span className="min-w-0 text-left text-base leading-relaxed text-neutral-700">{text}</span>
                </li>
              </ServiceItemReveal>
            ))}
          </ul>
        </div>
      </section>
  )
}
