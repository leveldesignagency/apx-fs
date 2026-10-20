import type { ReactNode } from "react"
import type { Metadata } from "next"
import { buildFsMetadata } from "@/lib/seo-metadata"
import { FsServiceJsonLd } from "@/components/seo/FsServiceJsonLd"

export const metadata: Metadata = buildFsMetadata({
  title: "PAVA Systems | Public Address & Voice Alarm | BS 5839-8 | London | APX",
  description:
    "PAVA (public address and voice alarm) systems to BS 5839-8: zoned and phased messaging, fire alarm integration, amplifiers and loudspeakers, cause-and-effect testing, commissioning and maintenance across London and the Home Counties.",
  pathname: "/services/pava",
})

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <FsServiceJsonLd
        pathname="/services/pava"
        description="PAVA (public address and voice alarm) systems to BS 5839-8: zoned and phased messaging, fire alarm integration, amplifiers and loudspeakers, cause-and-effect testing, commissioning and maintenance across London and the Home Counties."
        name="PAVA Systems"
      />
      {children}
    </>
  )
}
