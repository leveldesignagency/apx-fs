import type { Metadata } from "next"
import { buildFsMetadata } from "@/lib/seo-metadata"
import { FS_SERVICE_ROUTES } from "@/lib/fs-service-routes"

export const metadata: Metadata = buildFsMetadata({
  title: "CCTV Systems London | Design, Install & Commission | APX Fire & Security",
  description:
    "IP and analogue CCTV design, installation and commissioning with remote monitoring, retention setup and secure network integration across London and the Home Counties.",
  pathname: FS_SERVICE_ROUTES.cctvSystems,
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
