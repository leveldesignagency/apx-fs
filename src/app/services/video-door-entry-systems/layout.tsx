import type { Metadata } from "next"
import { buildFsMetadata } from "@/lib/seo-metadata"
import { FS_SERVICE_ROUTES } from "@/lib/fs-service-routes"

export const metadata: Metadata = buildFsMetadata({
  title: "Video Door Entry Systems | Audio, Video & Multi-Occupancy | APX",
  description:
    "Audio and video door entry for single residences and multi-occupancy buildings across London and the Home Counties: IP and networked systems, concierge and mobile answering where available, access control and gate automation integration, maintenance and upgrades.",
  pathname: FS_SERVICE_ROUTES.videoDoorEntrySystems,
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
