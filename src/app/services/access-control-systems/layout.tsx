import type { Metadata } from "next"
import { buildFsMetadata } from "@/lib/seo-metadata"
import { FS_SERVICE_ROUTES } from "@/lib/fs-service-routes"

export const metadata: Metadata = buildFsMetadata({
  title: "Access Control Systems London | Install & Commission | APX Fire & Security",
  description:
    "Door access, fob and card permissions, and networked control built for commercial and multi-tenant environments across London and the Home Counties.",
  pathname: FS_SERVICE_ROUTES.accessControlSystems,
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
