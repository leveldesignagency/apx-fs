import type { Metadata } from "next"
import { buildFsMetadata } from "@/lib/seo-metadata"
import { FsServiceJsonLd } from "@/components/seo/FsServiceJsonLd"

export const metadata: Metadata = buildFsMetadata({
  title: "Commercial CCTV Installation | London & South East | APX",
  description:
    "Commercial CCTV design, installation and commissioning, high-resolution surveillance, remote monitoring and integration for offices, retail and industrial sites across London and the Home Counties.",
  pathname: "/services/cctv/commercial",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FsServiceJsonLd
        pathname="/services/cctv/commercial"
        description="Commercial CCTV design, installation and commissioning, high-resolution surveillance, remote monitoring and integration for offices, retail and industrial sites across London and the Home Counties."
        name="Commercial CCTV Installation"
      />
      {children}
    </>
  )
}
