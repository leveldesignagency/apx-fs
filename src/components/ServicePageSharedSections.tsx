"use client"

import { Reveal } from "@/components/Reveal"

const CLIENT_LOGO_PATHS = [
  "/Clients/_-01.png",
  "/Clients/_-02.png",
  "/Clients/_-03.png",
  "/Clients/_-04.png",
  "/Clients/_-05.png",
  "/Clients/_-06.png",
  "/Clients/_-07.png",
  "/Clients/_-08.png",
  "/Clients/_-09.png",
  "/Clients/_-10.png",
  "/Clients/_-11.png",
]

/** Static logo grid for service pages (homepage keeps the scrolling marquee). */
export function ClientLogosGrid() {
  return (
    <ul className="our-customers-logo-grid m-0 grid list-none grid-cols-2 gap-4 p-0 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6">
      {CLIENT_LOGO_PATHS.map((src, i) => (
        <li key={src} className="min-w-0">
          <Reveal delayMs={70 + i * 55} className="h-full">
            <div className="our-customers-logo-grid__cell flex h-full min-h-[5.5rem] items-center justify-center border border-black/10 bg-white px-4 py-5 sm:min-h-[6.5rem] sm:px-5 sm:py-6 md:min-h-[7.25rem]">
              {/* eslint-disable-next-line @next/next/no-img-element -- static logo tiles; paths are local PNGs */}
              <img src={src} alt="" className="our-customers-logo-grid__img" />
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  )
}

export function OurCustomers({ serviceTitleShort }: { serviceTitleShort: string }) {
  return (
    <>
      <div className="h-[0.75px] w-full bg-black/15" aria-hidden />
      <section className="bg-white pt-12 pb-20 text-black sm:pb-24 lg:pt-16 lg:pb-32">
        <div className="site-container relative mb-10 w-full">
          <Reveal>
            <h2 className="text-left font-title text-4xl font-bold text-black">
              Our {serviceTitleShort} customers
            </h2>
          </Reveal>
        </div>
        <div className="site-container">
          <ClientLogosGrid />
        </div>
      </section>
    </>
  )
}
