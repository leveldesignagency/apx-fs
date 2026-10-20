import type { Metadata } from "next"
import { buildFsMetadata } from "@/lib/seo-metadata"
import { FS_SERVICE_ROUTES } from "@/lib/fs-service-routes"
import { FsServiceJsonLd } from "@/components/seo/FsServiceJsonLd"

export const metadata: Metadata = buildFsMetadata({
  title: "Access Control Systems | Fob, Card, Networked & Multi-Tenant | APX",
  description:
    "Access control across London and the Home Counties: fob and card access, keypads, mobile credentials where offered, single-door and networked systems, multi-tenant control, door controllers, fire-release interfaces where designed, lift and ANPR where offered, video entry and gate integration, maintenance and takeovers.",
  pathname: FS_SERVICE_ROUTES.accessControlSystems,
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FsServiceJsonLd
        pathname="/services/access-control-systems"
        description="Access control across London and the Home Counties: fob and card access, keypads, mobile credentials where offered, single-door and networked systems, multi-tenant control, door controllers, fire-release interfaces where designed, lift and ANPR where offered, video entry and gate integration, maintenance and takeovers."
        name="Access Control Systems"
      />
      {children}
    </>
  )
}
