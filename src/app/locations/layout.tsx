import type { Metadata } from "next"
import { buildFsMetadata } from "@/lib/seo-metadata"
import { FsBreadcrumbJsonLd } from "@/components/seo/FsBreadcrumbJsonLd"
import { JsonLd } from "@/components/seo/JsonLd"
import { LOCATIONS_FAQ_ITEMS } from "@/lib/hub-faq-content"
import { buildFaqPageJsonLd, buildWebPageJsonLd } from "@/lib/seo-jsonld"

const LOCATIONS_DESCRIPTION =
  "APX Fire & Security coverage across Greater London and the Home Counties including Kent, Essex, Surrey and Hertfordshire. Check your postcode for installation support."

export const metadata: Metadata = buildFsMetadata({
  title: "Service Locations | London, Kent, Essex & Home Counties | APX FS",
  description: LOCATIONS_DESCRIPTION,
  pathname: "/locations",
  keywords:
    "fire security London, CCTV installation Kent, fire alarm Essex, access control Surrey, Home Counties fire security, APX service area, London borough fire alarm installer",
})

export default function LocationsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FsBreadcrumbJsonLd crumbs={[{ name: "Locations", path: "/locations" }]} />
      <JsonLd
        data={[
          buildWebPageJsonLd({
            name: "Service Locations | APX Fire & Security",
            description: LOCATIONS_DESCRIPTION,
            pathname: "/locations",
            speakableSelectors: ["h1", ".aeo-direct-answer"],
          }),
          buildFaqPageJsonLd(LOCATIONS_FAQ_ITEMS, { pathname: "/locations" }),
        ]}
      />
      {children}
    </>
  )
}
