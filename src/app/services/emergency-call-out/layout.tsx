import type { ReactNode } from "react"
import type { Metadata } from "next"
import { buildFsMetadata } from "@/lib/seo-metadata"
import { FsServiceJsonLd } from "@/components/seo/FsServiceJsonLd"
import { FS_SERVICE_ROUTES } from "@/lib/fs-service-routes"

export const metadata: Metadata = buildFsMetadata({
  title: "24/7 Emergency Call-Out | Fire & Security | APX Fire & Security",
  description:
    "24/7 emergency engineer call-out for Fire and Security faults for contracted customers across London and the Home Counties, with planned maintenance between incidents.",
  pathname: FS_SERVICE_ROUTES.emergencyCallOut,
})

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <FsServiceJsonLd
        pathname="/services/emergency-call-out"
        description="24/7 emergency engineer call-out for Fire and Security faults for contracted customers across London and the Home Counties, with planned maintenance between incidents."
        name="24/7 Emergency Call-Out"
      />
      {children}
    </>
  )
}
