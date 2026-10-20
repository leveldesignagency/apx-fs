import { FS_SERVICE_ROUTES } from "@/lib/fs-service-routes"

/**
 * Canonical FS service order — matches the header Services dropdown.
 * Keep every public service list in this order.
 */
export const FS_SERVICE_NAV_LINKS = [
  {
    href: FS_SERVICE_ROUTES.intruderAlarmSystems,
    label: "Intruder Alarm Systems",
    shortLabel: "Intruder",
    navLabel: "Intruder Alarm Systems",
  },
  {
    href: FS_SERVICE_ROUTES.fireAlarmSystems,
    label: "Fire Alarm Systems",
    shortLabel: "Fire",
    navLabel: "Fire Alarm Systems",
  },
  {
    href: FS_SERVICE_ROUTES.cctvSystems,
    label: "CCTV Systems",
    shortLabel: "CCTV",
    navLabel: "CCTV Systems",
    hasCctvSubnav: true,
  },
  {
    href: FS_SERVICE_ROUTES.accessControlSystems,
    label: "Access Control Systems",
    shortLabel: "Access",
    navLabel: "Access Control Systems",
  },
  {
    href: FS_SERVICE_ROUTES.videoDoorEntrySystems,
    label: "Video Door Entry Systems",
    shortLabel: "Video Entry",
    navLabel: "Video Door Entry Systems",
  },
  {
    href: FS_SERVICE_ROUTES.gateAutomationSystems,
    label: "Gate Automation",
    shortLabel: "Gate Automation",
    navLabel: "Gate Automation",
  },
  {
    href: FS_SERVICE_ROUTES.pava,
    label: "PAVA Systems",
    shortLabel: "PAVA",
    navLabel: "PAVA (Public Address & Voice Alarm)",
  },
  {
    href: FS_SERVICE_ROUTES.evac,
    label: "EVAC Systems",
    shortLabel: "EVAC",
    navLabel: "EVAC (Evacuation Alert Systems)",
  },
  {
    href: FS_SERVICE_ROUTES.refugeDisabledCommunication,
    label: "Disabled Refuge, Fire Telephone & Toilet Alarm Systems",
    shortLabel: "Refuge & Toilets",
    navLabel: "Disabled Refuge, Fire Telephone & Toilet Alarm Systems",
  },
  {
    href: FS_SERVICE_ROUTES.monitoring,
    label: "Monitoring",
    shortLabel: "Monitoring",
    navLabel: "Monitoring",
  },
  {
    href: FS_SERVICE_ROUTES.maintenanceSupport,
    label: "Maintenance & Repairs",
    shortLabel: "Maintenance",
    navLabel: "Maintenance & Repairs",
  },
  {
    href: FS_SERVICE_ROUTES.emergencyCallOut,
    label: "24/7 Call-Out",
    shortLabel: "24/7 Call-Out",
    navLabel: "24/7 Call-Out",
  },
] as const

/** Hero + service-page quick links (short labels, popularity order) */
export const FS_SERVICE_QUICK_LINKS = FS_SERVICE_NAV_LINKS.map(({ href, shortLabel }) => ({
  href,
  label: shortLabel,
}))

/** Core individual service pages (nav, footer, homepage services strip) */
export const FS_CORE_SERVICE_LINKS = FS_SERVICE_QUICK_LINKS

export const FS_CCTV_TAB_LINKS = [
  { href: "/services/cctv/commercial", label: "Commercial" },
  { href: "/services/cctv/advice", label: "Useful Advice" },
  { href: "/services/cctv/domestic", label: "Domestic" },
] as const

export function normalizeFsPath(pathname: string): string {
  return pathname.replace(/\/$/, "") || "/"
}
