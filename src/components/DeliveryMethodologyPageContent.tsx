"use client"

import Link from "next/link"
import { DELIVERY_METHODOLOGY_STEPS } from "@/data/deliveryMethodology"
import { DeliveryMethodologyJourney } from "@/components/DeliveryMethodologyJourney"

export function DeliveryMethodologyPageContent() {
  return (
    <div className="dm-page min-h-screen bg-black text-white pt-28 pb-16 md:pb-20">
      <section className="container mx-auto px-6 lg:px-8 pb-7 sm:pb-8 md:pb-9">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
          <div className="min-w-0 max-w-4xl">
            <span className="section-label mb-3 block text-white/75">Delivery methodology</span>
            <h1 className="mt-3 text-4xl font-title font-bold tracking-tight text-white normal-case sm:text-5xl lg:text-6xl [line-height:0.9]">
              Evidence-led delivery — from first survey to compliant handover
            </h1>
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
