import type { ReactNode } from "react"
import type { Metadata } from "next"
import { buildFsMetadata } from "@/lib/seo-metadata"
import { FsServiceJsonLd } from "@/components/seo/FsServiceJsonLd"

export const metadata: Metadata = buildFsMetadata({
  title: "EVAC Systems | Evacuation Alert | BS 8629 | London | APX",
  description:
    "EVAC evacuation alert systems to BS 8629 for buildings containing flats: design, installation, commissioning and maintenance across London and the Home Counties. Separate from PAVA voice alarm (BS 5839-8).",
  pathname: "/services/evac",
})

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <FsServiceJsonLd
        pathname="/services/evac"
        description="EVAC evacuation alert systems to BS 8629 for buildings containing flats: design, installation, commissioning and maintenance across London and the Home Counties. Separate from PAVA voice alarm (BS 5839-8)."
        name="EVAC Systems"
      />
      {children}
    </>
  )
}
