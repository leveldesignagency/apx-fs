import { FS_SERVICE_ROUTES } from "@/lib/fs-service-routes"

/** Main FS service routes (excludes the three capability pillar pages, those are not listed here) */
export const FS_SERVICE_QUICK_LINKS = [
  { href: FS_SERVICE_ROUTES.cctvSystems, label: "CCTV systems" },
  { href: FS_SERVICE_ROUTES.accessControlSystems, label: "Access control systems" },
  { href: FS_SERVICE_ROUTES.intruderAlarmSystems, label: "Intruder alarm systems" },
  { href: FS_SERVICE_ROUTES.fireAlarmSystems, label: "Fire alarm systems" },
  { href: FS_SERVICE_ROUTES.videoDoorEntrySystems, label: "Video door entry systems" },
  { href: FS_SERVICE_ROUTES.refugeDisabledCommunication, label: "Refuge & Disabled Communication" },
  { href: FS_SERVICE_ROUTES.evacVoiceEvacuation, label: "EVAC & Voice Evacuation" },
] as const

/** Core individual service pages (nav, footer, homepage services strip) */
export const FS_CORE_SERVICE_LINKS = FS_SERVICE_QUICK_LINKS

export const FS_CCTV_TAB_LINKS = [
  { href: "/services/cctv/domestic", label: "Domestic" },
  { href: "/services/cctv/commercial", label: "Commercial" },
  { href: "/services/cctv/advice", label: "Useful advice" },
] as const

export function normalizeFsPath(pathname: string): string {
  return pathname.replace(/\/$/, "") || "/"
}
