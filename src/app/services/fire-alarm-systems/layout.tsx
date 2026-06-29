import type { Metadata } from "next"
import { buildFsMetadata } from "@/lib/seo-metadata"
import { FS_SERVICE_ROUTES } from "@/lib/fs-service-routes"

export const metadata: Metadata = buildFsMetadata({
  title: "Fire Alarm Systems London | Design, Install & Commission | APX Fire & Security",
  description:
    "Addressable and conventional fire alarms, BAFE-aligned design, installation, commissioning and certification across London, Kent, Essex and the Home Counties. BS 5839-1 aligned delivery.",
  pathname: FS_SERVICE_ROUTES.fireAlarmSystems,
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
