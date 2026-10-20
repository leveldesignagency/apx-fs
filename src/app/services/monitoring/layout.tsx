import type { ReactNode } from "react"
import type { Metadata } from "next"
import { buildFsMetadata } from "@/lib/seo-metadata"
import { FsServiceJsonLd } from "@/components/seo/FsServiceJsonLd"
import { FS_SERVICE_ROUTES } from "@/lib/fs-service-routes"

export const metadata: Metadata = buildFsMetadata({
  title: "Alarm Monitoring & ARC Signalling | APX Fire & Security",
  description:
    "Alarm receiving centre (ARC) signalling, dual-path options and remote monitoring pathways for intruder, fire and CCTV systems across London and the Home Counties.",
  pathname: FS_SERVICE_ROUTES.monitoring,
})

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <FsServiceJsonLd
        pathname="/services/monitoring"
        description="Alarm receiving centre (ARC) signalling, dual-path options and remote monitoring pathways for intruder, fire and CCTV systems across London and the Home Counties."
        name="Alarm Monitoring & ARC Signalling"
      />
      {children}
    </>
  )
}
