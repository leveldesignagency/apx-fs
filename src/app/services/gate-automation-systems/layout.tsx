import type { Metadata } from "next"
import { buildFsMetadata } from "@/lib/seo-metadata"
import { FS_SERVICE_ROUTES } from "@/lib/fs-service-routes"

export const metadata: Metadata = buildFsMetadata({
  title: "Gate Automation Systems London | Install & Commission | APX Fire & Security",
  description:
    "Automated gates, vehicle barriers and perimeter access control for commercial and residential sites across London and the Home Counties, integrated with access control and CCTV.",
  pathname: FS_SERVICE_ROUTES.gateAutomationSystems,
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
