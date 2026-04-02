/** Main FS service routes (excludes the three capability pillar pages — those are not listed here) */
export const FS_SERVICE_QUICK_LINKS = [
  { href: "/services/electrical-systems", label: "CCTV systems" },
  { href: "/services/energy-efficiency", label: "Access control systems" },
  { href: "/services/sustainability", label: "Intruder alarm systems" },
  { href: "/services/mechanical-engineering", label: "Fire alarm systems" },
  { href: "/services/maintenance", label: "Video door entry systems" },
  { href: "/services/project-management", label: "Project management" },
] as const

export const FS_CCTV_TAB_LINKS = [
  { href: "/services/cctv/domestic", label: "Domestic" },
  { href: "/services/cctv/commercial", label: "Commercial" },
  { href: "/services/cctv/advice", label: "Useful advice" },
] as const

export function normalizeFsPath(pathname: string): string {
  return pathname.replace(/\/$/, "") || "/"
}
