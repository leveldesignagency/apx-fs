"use client"

import Link from "next/link"
import { Reveal } from "@/components/Reveal"
import { toTitleCase } from "@/lib/titleCase"

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
            <div className="our-customers-logo-grid__cell group flex h-full min-h-[5.5rem] items-center justify-center px-4 py-5 sm:min-h-[6.5rem] sm:px-5 sm:py-6 md:min-h-[7.25rem]">
              {/* eslint-disable-next-line @next/next/no-img-element -- static logo tiles; paths are local PNGs */}
              <img
                src={src}
                alt=""
                className="our-customers-logo-grid__img transition-transform duration-300 ease-out motion-reduce:transition-none motion-safe:group-hover:scale-110"
              />
            </div>
          </Reveal>
        </li>
      ))}
      <li className="min-w-0">
        <Reveal delayMs={70 + CLIENT_LOGO_PATHS.length * 55} className="h-full">
          <Link
            href="/contact"
            className="our-customers-logo-grid__cta group relative flex h-full min-h-[5.5rem] items-center justify-center overflow-hidden rounded-xl rounded-tr-none rounded-bl-none px-4 py-4 text-center no-underline sm:min-h-[6.5rem] sm:px-5 sm:py-5 md:min-h-[7.25rem]"
          >
            <span className="our-customers-logo-grid__cta-pattern" aria-hidden />
            <span className="our-customers-logo-grid__cta-sheen" aria-hidden />
            <span className="relative z-[1] flex w-full flex-col items-center justify-center gap-2.5">
              <span className="font-menu text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-white/45 transition-colors duration-300 group-hover:text-white/70">
                Get in touch
              </span>
              <span className="font-title text-lg font-extrabold leading-[1.05] tracking-normal text-white sm:text-xl">
                Want to be our
                <br />
                next client?
              </span>
              <span
                className="our-customers-logo-grid__cta-arrow inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/25 text-white transition-[border-color,background-color,transform] duration-300 ease-out group-hover:border-white/55 group-hover:bg-white/10 motion-safe:group-hover:rotate-45"
                aria-hidden
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M2 6h7.5M6.5 2.5 10 6l-3.5 3.5"
                    stroke="currentColor"
                    strokeWidth="1.35"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </span>
          </Link>
        </Reveal>
      </li>
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
              {toTitleCase(`Our ${serviceTitleShort} Customers`)}
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
