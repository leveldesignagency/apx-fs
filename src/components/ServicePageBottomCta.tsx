"use client"

import type { ReactNode } from "react"
import { FsServiceFaqByRoute } from "@/components/FsServiceFaqByRoute"

type ServicePageBottomCtaProps = {
  /** Path under `/public` (URL-encoded segments allowed), e.g. from `serviceHeroImages` */
  imageSrc: string
  title: string
  description: string
  children: ReactNode
}

export function ServicePageBottomCta({ imageSrc, title, description, children }: ServicePageBottomCtaProps) {
  return (
    <>
      <FsServiceFaqByRoute />
      <section className="relative isolate mt-12 flex min-h-[50vh] flex-col justify-center border-t border-white sm:mt-14 lg:mt-16">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("${imageSrc}")` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-black/70" aria-hidden />
      <div className="relative z-10 container mx-auto px-6 py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl">
          <h2 className="mb-6 text-left font-title text-3xl font-bold text-white sm:text-4xl">{title}</h2>
          <p className="mb-8 text-left text-lg text-white/90 sm:text-xl">{description}</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">{children}</div>
        </div>
      </div>
    </section>
    </>
  )
}
