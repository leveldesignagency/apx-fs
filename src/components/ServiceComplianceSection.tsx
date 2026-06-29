"use client"

import type { ReactNode } from "react"
import { CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export type ServiceComplianceSectionProps = {
  intro?: ReactNode
  /** Optional main heading above the two-column grid (e.g. fire alarm page) */
  sectionTitle?: string
  leftTitle?: string
  leftEyebrow?: string
  standardsItems: string[]
  footerNote?: ReactNode
  rightTitle?: string
  rightEyebrow?: string
  deliverablesItems: string[]
  rightFooterNote?: ReactNode
  className?: string
}

/** White-band standards & deliverables block shared across FS service pages */
export function ServiceComplianceSection({
  intro,
  sectionTitle,
  leftTitle = "Standards & compliance",
  leftEyebrow,
  standardsItems,
  footerNote,
  rightTitle = "Deliverables & lifecycle",
  rightEyebrow,
  deliverablesItems,
  rightFooterNote,
  className,
}: ServiceComplianceSectionProps) {
  const columnTitleClass = sectionTitle
    ? "mb-4 text-left text-xl font-semibold text-black"
    : "mb-6 text-left font-title text-3xl font-bold text-black sm:text-4xl"

  return (
    <>
      <div className="border-t border-white/15" />
      <section className={cn("service-page-white-band fs-service-compliance-section border-b border-black/10 text-black", className)}>
        <div className="container mx-auto px-6 py-16 lg:py-16">
          {sectionTitle ? (
            <h2 className="mb-4 text-left font-title text-3xl font-bold text-black sm:text-4xl">{sectionTitle}</h2>
          ) : null}
          {intro ? (
            <p className={cn("max-w-3xl text-left text-neutral-600", sectionTitle ? "mb-8" : "mb-10")}>{intro}</p>
          ) : null}
          <div
            className={cn(
              "grid grid-cols-1 gap-10 lg:grid-cols-[1fr_auto_1fr] lg:items-start lg:gap-0",
              intro && !sectionTitle && "border-t border-black/10 pt-10 lg:border-t-0 lg:pt-0",
            )}
          >
            <div className="min-w-0 lg:pr-10">
              <h3 className={columnTitleClass}>{leftTitle}</h3>
              {leftEyebrow ? (
                <p className="mb-4 text-left text-sm font-semibold uppercase tracking-wide text-neutral-500">
                  {leftEyebrow}
                </p>
              ) : null}
              <ul className="space-y-4">
                {standardsItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-left text-neutral-700">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-black/35" strokeWidth={2} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {footerNote ? (
                <p className="mt-6 text-sm leading-relaxed text-neutral-500">{footerNote}</p>
              ) : null}
            </div>
            <div className="hidden w-px shrink-0 self-stretch bg-black/10 lg:block" aria-hidden />
            <div className="min-w-0 border-t border-black/10 pt-10 lg:border-t-0 lg:pl-10 lg:pt-0">
              <h3 className={columnTitleClass}>{rightTitle}</h3>
              {rightEyebrow ? (
                <p className="mb-4 text-left text-sm font-semibold uppercase tracking-wide text-neutral-500">
                  {rightEyebrow}
                </p>
              ) : null}
              <ul className="space-y-4">
                {deliverablesItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-left text-neutral-700">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-black/35" strokeWidth={2} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {rightFooterNote ? (
                <p className="mt-6 text-sm leading-relaxed text-neutral-500">{rightFooterNote}</p>
              ) : null}
            </div>
          </div>
        </div>
      </section>
      <div className="border-t border-white/15" />
    </>
  )
}
