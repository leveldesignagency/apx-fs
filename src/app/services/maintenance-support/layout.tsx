import type { ReactNode } from "react"
import type { Metadata } from "next"
import { buildFsMetadata } from "@/lib/seo-metadata"
import { FsServiceJsonLd } from "@/components/seo/FsServiceJsonLd"

export const metadata: Metadata = buildFsMetadata({
  title: "Fire & Security Maintenance & Repairs | PPM London | APX",
  description:
    "PPM, system takeovers, corrective works and 24/7 call-out for fire alarms, CCTV, access control, intruder alarms and video entry across London and the Home Counties.",
  pathname: "/services/maintenance-support",
})

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <FsServiceJsonLd
        pathname="/services/maintenance-support"
        description="PPM, system takeovers, corrective works and 24/7 call-out for fire alarms, CCTV, access control, intruder alarms and video entry across London and the Home Counties."
        name="Fire & Security Maintenance & Repairs"
      />
      {children}
    </>
  )
}
