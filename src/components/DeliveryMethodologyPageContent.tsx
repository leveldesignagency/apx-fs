"use client"

import Link from "next/link"
import { DELIVERY_METHODOLOGY_STEPS } from "@/data/deliveryMethodology"
import { DeliveryMethodologyJourney } from "@/components/DeliveryMethodologyJourney"

export function DeliveryMethodologyPageContent() {
  return (
    <div className="dm-page min-h-screen bg-black text-white pb-16 md:pb-24">
      <DeliveryMethodologyJourney steps={DELIVERY_METHODOLOGY_STEPS} />

      <div className="container relative mx-auto px-6 lg:px-8">
        <footer className="mt-8 border-t border-white/10 pt-8 text-center md:mt-10 md:pt-10">
          <Link
            href="/contact"
            className="text-sm text-white/70 underline underline-offset-4 transition-colors hover:text-white"
          >
            Discuss your project with our team
          </Link>
        </footer>
      </div>
    </div>
  )
}
