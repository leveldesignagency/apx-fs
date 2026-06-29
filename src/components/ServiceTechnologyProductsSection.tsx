import type { ReactNode } from "react"
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
    <>
      <div className="border-t border-white/15" />
      <section className={cn("bg-white text-black", className)} aria-labelledby={headingId}>
        <div className="container mx-auto px-6 py-16 lg:py-16">
          <h2 id={headingId} className="mb-2 text-left font-title text-3xl font-bold text-black sm:text-4xl">
            {title}
          </h2>
          {description ? <div className="mb-8 max-w-2xl text-left text-neutral-600">{description}</div> : null}
          {eyebrow ? (
            <p className="mb-6 text-left text-sm font-semibold uppercase tracking-wide text-neutral-500">{eyebrow}</p>
          ) : null}
          {children}
        </div>
      </section>
    </>
  )
}
