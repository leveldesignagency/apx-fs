import type { Metadata } from "next"
import { buildFsMetadata } from "@/lib/seo-metadata"
import { FS_SERVICE_ROUTES } from "@/lib/fs-service-routes"

export const metadata: Metadata = buildFsMetadata({
  title: "Intruder Alarm Systems London | Grade 2 & 3 | APX Fire & Security",
  description:
    "Grade 2 and Grade 3 intruder alarm systems with detection, monitoring integration and clear handover documentation across London and the Home Counties.",
  pathname: FS_SERVICE_ROUTES.intruderAlarmSystems,
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
