"use client"

import type { ReactNode } from "react"
import { Reveal } from "@/components/Reveal"
import { toTitleCase } from "@/lib/titleCase"
import { cn } from "@/lib/utils"

type ServiceTechnologyProductsSectionProps = {
  title: string
  titleId?: string
  description?: ReactNode
  eyebrow?: string
  children: ReactNode
  className?: string
}

/** White-band technology / product logo block used across FS service pages */
export function ServiceTechnologyProductsSection({
  title,
  titleId,
  description,
  eyebrow,
  children,
  className,
}: ServiceTechnologyProductsSectionProps) {
  const headingId = titleId ?? "service-technology-products-heading"

  return (
    <section
      className={cn("border-t border-black/10 bg-white text-black", className)}
      aria-labelledby={headingId}
    >
      <div className="site-container py-16 lg:py-16">
        <Reveal>
          <h2 id={headingId} className="mb-2 text-left font-title text-3xl font-bold text-black sm:text-4xl">
            {toTitleCase(title)}
          </h2>
        </Reveal>
        {description ? (
          <Reveal delayMs={70}>
            <div className="mb-8 max-w-2xl text-left text-neutral-600">{description}</div>
          </Reveal>
        ) : null}
        {eyebrow ? (
          <Reveal delayMs={description ? 120 : 70}>
            <p className="mb-6 text-left text-sm font-semibold uppercase tracking-wide text-neutral-500">{eyebrow}</p>
          </Reveal>
        ) : null}
        <Reveal delayMs={140}>{children}</Reveal>
      </div>
    </section>
  )
}
