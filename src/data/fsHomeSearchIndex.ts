import { FS_SERVICE_ROUTES } from "@/lib/fs-service-routes"
import { FS_SERVICE_NAV_LINKS, FS_CCTV_TAB_LINKS } from "@/lib/fs-service-navigation"

export type FsHomeSearchEntry = {
  id: string
  /** Primary label shown in suggestions */
  title: string
  href: string
  /** Optional parent service for context in the list */
  parentLabel?: string
  /** Extra tokens for matching (not shown) */
  keywords: string[]
}

function entry(
  id: string,
  title: string,
  href: string,
  keywords: string[] = [],
  parentLabel?: string
): FsHomeSearchEntry {
  return { id, title, href, parentLabel, keywords }
}

/**
 * Searchable homepage intent index: broad service pages + capability / feature cards
 * (e.g. Gate, barrier and ANPR integration from access control).
 */
export const FS_HOME_SEARCH_ENTRIES: FsHomeSearchEntry[] = [
  // Broad service pages
  ...FS_SERVICE_NAV_LINKS.map((s) =>
    entry(`nav-${s.href}`, s.label, s.href, [s.shortLabel, s.navLabel, "service"])
  ),
  entry(
    "hub-security",
    "Security Systems",
    FS_SERVICE_ROUTES.securitySystems,
    ["security overview", "integrated security", "umbrella"]
  ),
  entry(
    "hub-fire-life",
    "Fire & Life Safety Systems",
    FS_SERVICE_ROUTES.fireLifeSafety,
    ["fire life safety", "life safety overview", "umbrella"]
  ),
  entry("hub-services", "All services", "/services", ["services hub", "browse services"]),

  // CCTV sub-pages
  ...FS_CCTV_TAB_LINKS.map((t) =>
    entry(`cctv-${t.label}`, `${t.label} CCTV`, t.href, ["cctv", t.label], "CCTV Systems")
  ),

  // Capability / feature cards (what we deliver) - href includes #anchor for flash
  entry(
    "access-gate-anpr",
    "Gate, barrier and ANPR integration",
    `${FS_SERVICE_ROUTES.accessControlSystems}#access-gate-anpr`,
    ["anpr", "number plate", "vehicle access", "barrier", "gate", "parking"],
    "Access Control"
  ),
  entry(
    "access-fob-card",
    "Fob and card access",
    `${FS_SERVICE_ROUTES.accessControlSystems}#access-fob-card`,
    ["fob", "card", "proximity", "credentials"],
    "Access Control"
  ),
  entry(
    "access-keypads",
    "Keypads",
    `${FS_SERVICE_ROUTES.accessControlSystems}#access-keypads`,
    ["pin", "keypad", "code entry"],
    "Access Control"
  ),
  entry(
    "access-mobile",
    "Mobile credentials",
    `${FS_SERVICE_ROUTES.accessControlSystems}#access-mobile`,
    ["phone access", "mobile credential", "smartphone"],
    "Access Control"
  ),
  entry(
    "access-networked",
    "Single-door and networked systems",
    `${FS_SERVICE_ROUTES.accessControlSystems}#access-networked`,
    ["networked access", "multi-door"],
    "Access Control"
  ),
  entry(
    "access-multi-tenant",
    "Multi-tenant systems",
    `${FS_SERVICE_ROUTES.accessControlSystems}#access-multi-tenant`,
    ["tenant", "landlord", "estate access"],
    "Access Control"
  ),
  entry(
    "access-fire-release",
    "Fire alarm release interfaces",
    `${FS_SERVICE_ROUTES.accessControlSystems}#access-fire-release`,
    ["fail safe", "door release", "fire interface"],
    "Access Control"
  ),
  entry(
    "access-lift",
    "Lift control",
    `${FS_SERVICE_ROUTES.accessControlSystems}#access-lift`,
    ["lift access", "floor permissions"],
    "Access Control"
  ),
  entry(
    "access-video-entry",
    "Intercom / video entry integration",
    `${FS_SERVICE_ROUTES.accessControlSystems}#access-video-entry`,
    ["intercom", "video entry integration"],
    "Access Control"
  ),

  entry(
    "gate-swing-sliding",
    "Swing & sliding gates",
    `${FS_SERVICE_ROUTES.gateAutomationSystems}#gate-swing-sliding`,
    ["swing gate", "sliding gate", "powered gate"],
    "Gate Automation"
  ),
  entry(
    "gate-barriers",
    "Vehicle barriers",
    `${FS_SERVICE_ROUTES.gateAutomationSystems}#gate-barriers`,
    ["rising arm", "barrier", "car park"],
    "Gate Automation"
  ),
  entry(
    "gate-safety",
    "Gate safety devices",
    `${FS_SERVICE_ROUTES.gateAutomationSystems}#gate-safety`,
    ["bs en 12453", "safety edge", "photocell"],
    "Gate Automation"
  ),
  entry(
    "gate-cctv-video-entry",
    "CCTV and video entry at the gate",
    `${FS_SERVICE_ROUTES.gateAutomationSystems}#gate-cctv-video-entry`,
    ["gate cctv", "video entry", "intercom gate", "barrier camera"],
    "Gate Automation"
  ),

  entry(
    "intruder-grade",
    "Grade 2 and Grade 3 intruder alarms",
    FS_SERVICE_ROUTES.intruderAlarmSystems,
    ["pd 6662", "bs en 50131", "intruder detection"],
    "Intruder Alarms"
  ),
  entry(
    "intruder-arc",
    "ARC monitoring and signalling",
    FS_SERVICE_ROUTES.monitoring,
    ["alarm receiving centre", "police response", "dual path", "csl", "gradeshift"],
    "Monitoring"
  ),
  entry(
    "intruder-external",
    "External / perimeter intruder protection",
    FS_SERVICE_ROUTES.intruderAlarmSystems,
    ["laser", "perimeter", "external detectors"],
    "Intruder Alarms"
  ),

  entry(
    "fire-addressable",
    "Addressable and conventional fire alarms",
    FS_SERVICE_ROUTES.fireAlarmSystems,
    ["bs 5839", "fire detection", "cause and effect"],
    "Fire Alarms"
  ),
  entry(
    "fire-evac",
    "EVAC and voice alarm systems",
    FS_SERVICE_ROUTES.evacVoiceEvacuation,
    ["voice evacuation", "pa", "bs 5839-8"],
    "EVAC"
  ),
  entry(
    "fire-refuge",
    "Disabled refuge systems",
    `${FS_SERVICE_ROUTES.refugeDisabledCommunication}#fire-refuge`,
    ["evac", "refuge", "bs 5839-9"],
    "Refuge & EVC"
  ),
  entry(
    "fire-telephone",
    "Fire telephones",
    `${FS_SERVICE_ROUTES.refugeDisabledCommunication}#fire-telephone`,
    ["firefighter telephone", "evc"],
    "Refuge & EVC"
  ),
  entry(
    "fire-toilet",
    "Disabled toilet alarms",
    `${FS_SERVICE_ROUTES.refugeDisabledCommunication}#fire-toilet`,
    ["toilet alarm", "assistance alarm"],
    "Refuge & EVC"
  ),

  entry(
    "cctv-ip",
    "IP and HD analogue CCTV",
    `${FS_SERVICE_ROUTES.cctvSystems}#cctv-ip`,
    ["cameras", "surveillance", "recording", "nvr"],
    "CCTV"
  ),
  entry(
    "cctv-remote",
    "Remote viewing and camera health monitoring",
    `${FS_SERVICE_ROUTES.cctvSystems}#cctv-remote`,
    ["remote cctv", "health monitoring"],
    "CCTV"
  ),
  entry(
    "cctv-anpr",
    "ANPR and analytics",
    `${FS_SERVICE_ROUTES.cctvSystems}#cctv-anpr`,
    ["number plate recognition", "anpr camera", "analytics"],
    "CCTV"
  ),

  entry(
    "vde-systems",
    "Video door entry systems",
    FS_SERVICE_ROUTES.videoDoorEntrySystems,
    ["video entry", "door entry", "visitor identification"],
    "Video Door Entry"
  ),

  entry(
    "maint-ppm",
    "Planned preventative maintenance",
    FS_SERVICE_ROUTES.maintenanceSupport,
    ["ppm", "service visits", "maintenance contract"],
    "Maintenance"
  ),
  entry(
    "maint-callout",
    "24/7 emergency call-out",
    FS_SERVICE_ROUTES.emergencyCallOut,
    ["call out", "emergency engineer", "reactive"],
    "Call-out"
  ),
  entry(
    "maint-upgrade",
    "System upgrades and takeovers",
    FS_SERVICE_ROUTES.maintenanceSupport,
    ["takeover", "upgrade", "existing system"],
    "Maintenance"
  ),
]

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s&/+-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function scoreEntry(entry: FsHomeSearchEntry, query: string): number {
  const q = normalize(query)
  if (!q || q.length < 1) return 0

  const title = normalize(entry.title)
  const parent = normalize(entry.parentLabel ?? "")
  const hay = normalize([entry.title, entry.parentLabel ?? "", ...entry.keywords].join(" "))

  if (title === q) return 100
  if (title.startsWith(q)) return 90
  if (title.includes(q)) return 75

  const tokens = q.split(" ").filter(Boolean)
  if (tokens.length === 0) return 0

  let hits = 0
  for (const t of tokens) {
    if (hay.includes(t)) hits += 1
  }
  if (hits === 0) return 0

  const coverage = hits / tokens.length
  let score = 40 + coverage * 35
  if (parent && tokens.some((t) => parent.includes(t))) score += 5
  if (hits === tokens.length) score += 10
  return score
}

/** Ranked suggestions for the homepage intent search. */
export function searchFsHomeOfferings(query: string, limit = 8): FsHomeSearchEntry[] {
  const q = query.trim()
  if (!q) return []

  return FS_HOME_SEARCH_ENTRIES.map((e) => ({ e, score: scoreEntry(e, q) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.e.title.localeCompare(b.e.title))
    .slice(0, limit)
    .map((x) => x.e)
}
