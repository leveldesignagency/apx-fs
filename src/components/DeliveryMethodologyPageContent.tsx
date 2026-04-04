"use client"

import Link from "next/link"
import { DELIVERY_METHODOLOGY_STEPS } from "@/data/deliveryMethodology"
import { DeliveryMethodologyJourney } from "@/components/DeliveryMethodologyJourney"

export function DeliveryMethodologyPageContent() {
  return (
    <div className="dm-page min-h-screen bg-black text-white pb-16 md:pb-20">
      <section className="page-title-band px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[min(100%,92rem)]">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
            <div className="min-w-0 max-w-4xl">
              <span className="section-label mb-3 block text-white/75">Delivery methodology</span>
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-3 text-left text-white tracking-tight"
                style={{ fontFamily: "var(--font-menu)" }}
              >
                Evidence-led delivery — from first survey to compliant handover
              </h1>
            </div>
          </div>
        </div>
      </section>

      <div className="container relative mx-auto px-6 lg:px-8">
        <DeliveryMethodologyJourney steps={DELIVERY_METHODOLOGY_STEPS} />

        <footer className="mt-8 border-t border-white/10 pt-8 text-center md:mt-10 md:pt-10">
          <Link
            href="/contact"
            className="text-sm text-white/70 hover:text-white underline underline-offset-4 transition-colors"
          >
            Discuss your project with our team
          </Link>
        </footer>
      </div>
    </div>
  )
}
