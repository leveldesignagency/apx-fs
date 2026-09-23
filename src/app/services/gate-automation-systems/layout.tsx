import type { Metadata } from "next"
import { buildFsMetadata } from "@/lib/seo-metadata"
import { FS_SERVICE_ROUTES } from "@/lib/fs-service-routes"

export const metadata: Metadata = buildFsMetadata({
  title: "Gate, Barrier & Bollard Automation | Install, Service & Repair | APX Fire & Security",
  description:
    "Gate Safe trained engineers for automated gates, barriers and bollards. Installation, servicing, repairs and maintenance across Roger Technology, BFT, CAME, FAAC and Nice. London and the Home Counties.",
  pathname: FS_SERVICE_ROUTES.gateAutomationSystems,
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
