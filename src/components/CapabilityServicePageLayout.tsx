import Link from "next/link"
import { CapabilityServiceTabs } from "@/components/CapabilityServiceTabs"

export type CapabilityServicePageLayoutProps = {
  /** Page title — sentence case, homepage title font */
  title: string
  intro: string
  capabilities: string[]
  compliance: string[]
  deliverables: string[]
  ctaLabel: string
}

const listClass = "apx-capability-list"
const listItemClass = "apx-capability-list__item"

/** Outer: full page section width (title + inner block + CTA) */
const outerClass =
  "fs-capability-outer mx-auto w-full max-w-[min(100%,92rem)] px-4 sm:px-6 lg:px-8"

const sectionHeadingClass =
  "text-lg sm:text-xl font-semibold text-white font-title tracking-tight mb-4"

export function CapabilityServicePageLayout({
  title,
  intro,
  capabilities,
  compliance,
  deliverables,
  ctaLabel,
}: CapabilityServicePageLayoutProps) {
  return (
    <div className="fs-capability-page relative pt-20 sm:pt-24 pb-28 sm:pb-32 lg:pb-40">
      <div className={outerClass}>
        <header className="pb-5 sm:pb-6 lg:pb-7">
          <h1
            className="text-3xl sm:text-4xl lg:text-[2.65rem] xl:text-[2.75rem] font-bold tracking-tight leading-[1.15] text-white font-title"
            style={{ fontFamily: "var(--font-title), var(--font-jakarta), sans-serif" }}
          >
            {title}
          </h1>
          <p className="mt-5 text-base sm:text-[1.0625rem] text-white/75 leading-relaxed max-w-[min(100%,68ch)] xl:max-w-[min(100%,72ch)]">
            {intro}
          </p>
        </header>

        {/* One continuous frame: tabs row + capabilities table (shared 1px border) */}
        <div className="fs-capability-unified mt-3 sm:mt-4">
          <div className="fs-capability-tabs-row">
            <CapabilityServiceTabs />
          </div>
          <div className="fs-capability-inner fs-capability-inner--unified">
            <div className="fs-capability-columns">
              <div className="fs-capability-column min-w-0">
                <h2 className={sectionHeadingClass}>Capabilities</h2>
                <ul className={listClass}>
                  {capabilities.map((item) => (
                    <li key={item} className={listItemClass}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="fs-capability-column min-w-0">
                <h2 className={sectionHeadingClass}>Compliance</h2>
                <ul className={listClass}>
                  {compliance.map((item) => (
                    <li key={item} className={listItemClass}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="fs-capability-column min-w-0">
                <h2 className={sectionHeadingClass}>Deliverables</h2>
                <ul className={listClass}>
                  {deliverables.map((item) => (
                    <li key={item} className={listItemClass}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 sm:mt-16 lg:mt-20 pt-10 sm:pt-12 border-t border-white/15 flex flex-col items-stretch">
          <div className="flex justify-end">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-none rounded-tl-xl rounded-tr-none rounded-br-xl rounded-bl-none border-2 border-white border-solid bg-transparent px-6 py-2.5 text-sm font-semibold normal-case tracking-normal text-white transition-colors duration-200 hover:!bg-white hover:!text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
