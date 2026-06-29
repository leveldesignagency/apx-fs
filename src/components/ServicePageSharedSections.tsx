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

/** Same logo strip as “Our Customers” on service pages, reusable under section-specific headings */
export function ClientLogosMarqueeStrip() {
  return (
    <div className="logo-marquee-section our-customers-marquee w-full overflow-hidden py-2">
      <div className="logo-marquee-wrapper max-w-none">
        <div className="logo-marquee">
          <div className="logo-marquee__group">
            {CLIENT_LOGO_PATHS.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element -- seamless CSS marquee; matches homepage strip
              <img key={`oc-a-${i}`} src={src} alt="" className="logo-marquee__img" />
            ))}
          </div>
          <div className="logo-marquee__group" aria-hidden="true">
            {CLIENT_LOGO_PATHS.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={`oc-b-${i}`} src={src} alt="" className="logo-marquee__img" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


export function OurCustomers({ serviceTitleShort }: { serviceTitleShort: string }) {
  return (
    <>
      <div className="w-full h-[0.75px] bg-black/15" aria-hidden />
      <section className="bg-white pt-12 pb-20 text-black sm:pb-24 lg:pt-16 lg:pb-32">
        <div className="container relative mx-auto mb-10 w-full px-6 lg:px-8">
          <Reveal>
            <h2 className="text-left font-title text-4xl font-bold text-black">
              Our {serviceTitleShort} customers
            </h2>
          </Reveal>
        </div>
        <Reveal delayMs={90}>
          <ClientLogosMarqueeStrip />
        </Reveal>
      </section>
    </>
  )
}
