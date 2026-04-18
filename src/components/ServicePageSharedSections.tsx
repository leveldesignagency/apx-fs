"use client"

import { usePathname } from "next/navigation"
import { useTheme } from "@/contexts/ThemeContext"

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

/** Same logo strip as “Our Customers” on service pages — reusable under section-specific headings */
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

function OurCustomersMarquee() {
  return <ClientLogosMarqueeStrip />
}

export function OurCustomers({ serviceTitleShort }: { serviceTitleShort: string }) {
  const pathname = usePathname()
  const { theme } = useTheme()
  const isDark = (pathname?.startsWith("/services") ?? false) || theme === "dark"
  const textClass = isDark ? "text-white" : "text-black"
  const bgColor = isDark ? "#000000" : "#ffffff"

  return (
    <>
      <div className="w-full h-[0.75px] bg-black dark:bg-white" />
      <section className="pt-12 pb-20 sm:pb-24 lg:pt-16 lg:pb-32" style={{ backgroundColor: bgColor }}>
        <div className="container relative mx-auto mb-10 w-full px-6 lg:px-8">
          <h2 className={`text-left font-title text-4xl font-bold ${textClass}`}>
            Our {serviceTitleShort} customers
          </h2>
        </div>
        <OurCustomersMarquee />
      </section>
    </>
  )
}
