import type { Metadata } from "next"
import { buildFsMetadata } from "@/lib/seo-metadata"
import { FsBreadcrumbJsonLd } from "@/components/seo/FsBreadcrumbJsonLd"

export const metadata: Metadata = buildFsMetadata({
  title: "Service Locations | London, Kent, Essex & Home Counties | APX FS",
  description:
    "APX Fire & Security coverage across Greater London and the Home Counties including Kent, Essex, Surrey, Hertfordshire and Berkshire. Check your postcode for fire alarm, CCTV and access control installation.",
  pathname: "/locations",
  keywords:
    "fire security London, CCTV installation Kent, fire alarm Essex, access control Surrey, Home Counties fire security, APX service area, London borough fire alarm installer",
})

export default function LocationsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FsBreadcrumbJsonLd crumbs={[{ name: "Locations", path: "/locations" }]} />
      {children}
    </>
  )
}
