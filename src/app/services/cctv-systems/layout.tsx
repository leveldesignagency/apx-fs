import type { Metadata } from "next"
import { buildFsMetadata } from "@/lib/seo-metadata"
import { FS_SERVICE_ROUTES } from "@/lib/fs-service-routes"

export const metadata: Metadata = buildFsMetadata({
  title: "Commercial CCTV Systems | IP, ANPR & Retention | London | APX",
  description:
    "Commercial CCTV design, installation and maintenance: IP CCTV, HD analogue upgrades, remote viewing, recording and retention, camera health monitoring, ANPR and analytics where offered, network segregation and repairs across London and the Home Counties.",
  pathname: FS_SERVICE_ROUTES.cctvSystems,
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
