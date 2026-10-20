import Link from "next/link"
import { LocationsPostcodeCheck } from "@/components/locations/LocationsPostcodeCheck"
import { CustomPillButton } from "@/components/ui/CustomPillButton"
import { CallPhoneCta } from "@/components/ui/CallPhoneCta"
import { HOME_COUNTIES_AND_REGIONS, LONDON_BOROUGHS } from "@/lib/seo-geo-areas"

const PRIMARY_COUNTIES = [
  "Kent",
  "Essex",
  "Surrey",
  "Hertfordshire",
  "Berkshire",
] as const

const FURTHER_COUNTIES = HOME_COUNTIES_AND_REGIONS.filter(
  (name) => !(PRIMARY_COUNTIES as readonly string[]).includes(name)
)

const CORE_SERVICES = [
  { href: "/services/fire-alarm-systems", label: "Fire alarm systems" },
  { href: "/services/cctv-systems", label: "CCTV systems" },
  { href: "/services/access-control-systems", label: "Access control" },
  { href: "/services/intruder-alarm-systems", label: "Intruder alarms" },
  { href: "/services/maintenance-support", label: "Maintenance & repairs" },
  { href: "/services/emergency-call-out", label: "24/7 call-out" },
] as const

export default function LocationsPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--page-bg)] text-white">
      <section className="page-title-band site-container">
        <div className="max-w-3xl">
          <span className="section-label mb-3 block text-white/75">Service area</span>
          <h1
            className="text-left text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-menu)" }}
          >
            Locations we cover
          </h1>
          <p className="mt-4 max-w-2xl text-left text-base font-normal tracking-tight text-white/70 sm:text-lg md:text-xl">
            APX Fire &amp; Security designs, installs and maintains fire and electronic security systems across
            Greater London and the Home Counties. Based in Erith, Kent, we support commercial, public-sector and
            residential sites throughout the South East.
          </p>
          <LocationsPostcodeCheck />
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <CustomPillButton href="/contact" size="md">
              Request a survey
            </CustomPillButton>
            <CallPhoneCta />
          </div>
        </div>
      </section>

      <section className="site-container border-t border-white/15 py-16 lg:py-20" aria-labelledby="locations-primary-heading">
        <h2
          id="locations-primary-heading"
          className="font-title text-2xl font-bold tracking-tight sm:text-3xl"
        >
          Primary coverage
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70">
          Our core service area is Greater London plus neighbouring Home Counties. We regularly install and maintain
          systems in:
        </p>
        <ul className="mt-8 grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3 md:max-w-3xl">
          <li className="border-l border-white/25 pl-3 text-sm font-semibold uppercase tracking-[0.08em]">
            Greater London
          </li>
          {PRIMARY_COUNTIES.map((county) => (
            <li
              key={county}
              className="border-l border-white/25 pl-3 text-sm font-semibold uppercase tracking-[0.08em]"
            >
              {county}
            </li>
          ))}
        </ul>
        {FURTHER_COUNTIES.length > 0 ? (
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-white/50">
            We also cover {FURTHER_COUNTIES.slice(0, -1).join(", ")}
            {FURTHER_COUNTIES.length > 1 ? " and " : ""}
            {FURTHER_COUNTIES[FURTHER_COUNTIES.length - 1]}, subject to survey and programme.
          </p>
        ) : null}
      </section>

      <section
        className="border-t border-white/15 bg-black/40 py-16 lg:py-20"
        aria-labelledby="locations-boroughs-heading"
      >
        <div className="site-container">
          <h2
            id="locations-boroughs-heading"
            className="font-title text-2xl font-bold tracking-tight sm:text-3xl"
          >
            Greater London boroughs
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70">
            We install and support fire detection, CCTV, access control and related systems across London boroughs,
            including:
          </p>
          <ul className="mt-8 columns-2 gap-x-8 gap-y-2 text-sm text-white/75 sm:columns-3 md:columns-4">
            {LONDON_BOROUGHS.map((borough) => (
              <li key={borough} className="mb-2 break-inside-avoid">
                {borough}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="site-container border-t border-white/15 py-16 lg:py-20" aria-labelledby="locations-services-heading">
        <h2
          id="locations-services-heading"
          className="font-title text-2xl font-bold tracking-tight sm:text-3xl"
        >
          What we install across our service area
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70">
          From single-door access control to networked fire alarms and multi-site CCTV, our engineers deliver NSI
          Gold-aligned systems with clear documentation and ongoing support.
        </p>
        <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 md:max-w-3xl">
          {CORE_SERVICES.map((service) => (
            <li key={service.href}>
              <Link
                href={service.href}
                className="inline-flex border-b border-white/20 pb-1 text-base font-medium text-white transition-colors hover:border-white"
              >
                {service.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-2xl text-sm leading-relaxed text-white/55">
          Head office: 365-369 Bexley Road, Northumberland Heath, Erith, Kent, DA8 3EZ.{" "}
          <Link href="/contact" className="underline underline-offset-4 hover:text-white">
            Contact APX
          </Link>{" "}
          for a survey or quote.
        </p>
      </section>
    </div>
  )
}
