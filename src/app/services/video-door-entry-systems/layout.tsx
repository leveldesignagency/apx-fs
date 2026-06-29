import type { Metadata } from "next"
import { buildFsMetadata } from "@/lib/seo-metadata"
import { FS_SERVICE_ROUTES } from "@/lib/fs-service-routes"

export const metadata: Metadata = buildFsMetadata({
  title: "Video Door Entry Systems London | Install & Commission | APX Fire & Security",
  description:
    "Video entry and door access systems from single-door installations through to integrated, multi-user deployments across London and the Home Counties.",
  pathname: FS_SERVICE_ROUTES.videoDoorEntrySystems,
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
