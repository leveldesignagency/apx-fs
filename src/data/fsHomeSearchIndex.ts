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

function card(
  id: string,
  title: string,
  route: string,
  keywords: string[],
  parentLabel: string
): FsHomeSearchEntry {
  return entry(id, title, `${route}#${id}`, keywords, parentLabel)
}

/**
 * Searchable homepage intent index: broad service pages + capability / feature cards
 * (href includes #anchor so SearchAnchorFlash can scroll + isolate the card).
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

  // Access Control
  card("access-fob-card", "Fob and card access", FS_SERVICE_ROUTES.accessControlSystems, ["fob", "card", "proximity", "credentials"], "Access Control"),
  card("access-keypads", "Keypads", FS_SERVICE_ROUTES.accessControlSystems, ["pin", "keypad", "code entry"], "Access Control"),
  card("access-mobile", "Mobile credentials", FS_SERVICE_ROUTES.accessControlSystems, ["phone access", "mobile credential", "smartphone"], "Access Control"),
  card("access-networked", "Single-door and networked systems", FS_SERVICE_ROUTES.accessControlSystems, ["networked access", "multi-door"], "Access Control"),
  card("access-multi-tenant", "Multi-tenant systems", FS_SERVICE_ROUTES.accessControlSystems, ["tenant", "landlord", "estate access"], "Access Control"),
  card("access-controllers", "Door controllers", FS_SERVICE_ROUTES.accessControlSystems, ["controller", "reader", "door lock"], "Access Control"),
  card("access-fire-release", "Fire alarm release interfaces", FS_SERVICE_ROUTES.accessControlSystems, ["fail safe", "door release", "emergency door release", "edr", "fire interface"], "Access Control"),
  card("access-lift", "Lift control", FS_SERVICE_ROUTES.accessControlSystems, ["lift access", "floor permissions"], "Access Control"),
  card("access-video-entry", "Intercom / video entry integration", FS_SERVICE_ROUTES.accessControlSystems, ["intercom", "video entry integration"], "Access Control"),
  card("access-gate-anpr", "Gate, barrier and ANPR integration", FS_SERVICE_ROUTES.accessControlSystems, ["anpr", "number plate", "vehicle access", "barrier", "gate", "parking"], "Access Control"),
  card("access-maintenance", "Access maintenance and system takeovers", FS_SERVICE_ROUTES.accessControlSystems, ["access ppm", "access takeover"], "Access Control"),
  card("access-cctv-intruder", "CCTV and intruder coordination", FS_SERVICE_ROUTES.accessControlSystems, ["event linked", "joined up security"], "Access Control"),

  // Gate Automation
  card("gate-swing-sliding", "Gates, barriers & bollards", FS_SERVICE_ROUTES.gateAutomationSystems, ["swing gate", "sliding gate", "powered gate", "bollard"], "Gate Automation"),
  card("gate-install-service", "Gate install, service & repair", FS_SERVICE_ROUTES.gateAutomationSystems, ["gate safe", "gate repair", "roger", "bft", "came", "faac"], "Gate Automation"),
  card("gate-maintenance", "Gate maintenance programmes", FS_SERVICE_ROUTES.gateAutomationSystems, ["gate ppm", "powered entrance"], "Gate Automation"),
  card("gate-safety", "Gate safety devices", FS_SERVICE_ROUTES.gateAutomationSystems, ["bs en 12453", "safety edge", "photocell"], "Gate Automation"),
  card("gate-barriers", "Vehicle entrance control", FS_SERVICE_ROUTES.gateAutomationSystems, ["rising arm", "barrier", "car park"], "Gate Automation"),
  card("gate-risks", "Gate risk recognition", FS_SERVICE_ROUTES.gateAutomationSystems, ["crushing", "dragging", "gate compliance"], "Gate Automation"),

  // Intruder
  card("intruder-commercial", "Commercial-grade protection", FS_SERVICE_ROUTES.intruderAlarmSystems, ["commercial intruder", "grade 2", "grade 3", "pd 6662", "bs en 50131"], "Intruder Alarms"),
  card("intruder-arc", "ARC monitoring", FS_SERVICE_ROUTES.intruderAlarmSystems, ["alarm receiving centre", "police response", "arc"], "Intruder Alarms"),
  card("intruder-dual-path", "Dual-path signalling", FS_SERVICE_ROUTES.intruderAlarmSystems, ["dual path", "csl", "gradeshift"], "Intruder Alarms"),
  card("intruder-remote", "Remote control", FS_SERVICE_ROUTES.intruderAlarmSystems, ["texecom", "keypad", "app arm", "remote arm", "disarm"], "Intruder Alarms"),
  card("intruder-takeover", "Takeover, maintenance & call-out", FS_SERVICE_ROUTES.intruderAlarmSystems, ["intruder takeover", "intruder ppm", "call out"], "Intruder Alarms"),
  entry(
    "intruder-external",
    "External / perimeter intruder protection",
    FS_SERVICE_ROUTES.intruderAlarmSystems,
    ["laser", "perimeter", "external detectors"],
    "Intruder Alarms"
  ),

  // Fire Alarms
  card("fire-design", "Design, installation and commissioning", FS_SERVICE_ROUTES.fireAlarmSystems, ["fire design", "fire install", "commissioning"], "Fire Alarms"),
  card("fire-cause-effect", "Cause-and-effect testing", FS_SERVICE_ROUTES.fireAlarmSystems, ["cause and effect", "witnessed testing"], "Fire Alarms"),
  card("fire-addressable", "Addressable and conventional fire alarms", FS_SERVICE_ROUTES.fireAlarmSystems, ["bs 5839", "fire detection", "addressable", "conventional"], "Fire Alarms"),
  card("fire-networked", "Networked fire alarm systems", FS_SERVICE_ROUTES.fireAlarmSystems, ["networked panels", "mxpro", "multi building"], "Fire Alarms"),
  card("fire-wireless", "Wireless and wire-free systems", FS_SERVICE_ROUTES.fireAlarmSystems, ["wireless fire", "reach", "wire free"], "Fire Alarms"),
  card("fire-aspirating", "Aspirating air sampling detection", FS_SERVICE_ROUTES.fireAlarmSystems, ["asd", "aspirating", "air sampling", "xtralis"], "Fire Alarms"),
  card("fire-interfaces", "BMS, access and smoke-control interfaces", FS_SERVICE_ROUTES.fireAlarmSystems, ["bms", "smoke control", "fire interface"], "Fire Alarms"),
  card("fire-maintenance", "Fire maintenance and emergency call-outs", FS_SERVICE_ROUTES.fireAlarmSystems, ["fire ppm", "fire call out"], "Fire Alarms"),
  card("fire-documentation", "Zone charts and O&M documentation", FS_SERVICE_ROUTES.fireAlarmSystems, ["zone chart", "o&m", "as built"], "Fire Alarms"),

  // PAVA
  card("pava-zoned", "Zoned evacuation messages", FS_SERVICE_ROUTES.pava, ["zoned messages", "pa/va", "voice alarm"], "PAVA"),
  card("pava-phased", "Phased evacuation", FS_SERVICE_ROUTES.pava, ["phased evacuation", "staged evacuation"], "PAVA"),
  card("pava-fire-integration", "PAVA fire alarm integration", FS_SERVICE_ROUTES.pava, ["pava interface", "voice alarm interface"], "PAVA"),
  card("pava-music", "Background music & general announcements", FS_SERVICE_ROUTES.pava, ["background music", "paging", "announcements"], "PAVA"),
  card("pava-amplifiers", "Amplifiers and loudspeakers", FS_SERVICE_ROUTES.pava, ["loudspeaker", "amplifier", "intelligibility"], "PAVA"),
  card("pava-cause-effect", "PAVA cause-and-effect testing", FS_SERVICE_ROUTES.pava, ["pava testing", "message triggers"], "PAVA"),
  card("pava-commissioning", "PAVA commissioning", FS_SERVICE_ROUTES.pava, ["pava handover", "audio commissioning"], "PAVA"),
  card("pava-maintenance", "PAVA maintenance", FS_SERVICE_ROUTES.pava, ["pava ppm", "voice alarm maintenance"], "PAVA"),
  entry("fire-pava", "PAVA public address and voice alarm systems", FS_SERVICE_ROUTES.pava, ["pava", "pa/va", "voice alarm", "bs 5839-8", "public address"], "PAVA"),

  // EVAC
  card("evac-residential", "Residential blocks & flats", FS_SERVICE_ROUTES.evac, ["flats", "high rise", "residential evac"], "EVAC"),
  card("evac-dwellings", "Alert devices in dwellings", FS_SERVICE_ROUTES.evac, ["dwelling alert", "flat sounder"], "EVAC"),
  card("evac-cie", "Control & indicating equipment", FS_SERVICE_ROUTES.evac, ["eacie", "evacgo", "cie", "evacuation alert panel"], "EVAC"),
  card("evac-strategy", "Fire strategy coordination", FS_SERVICE_ROUTES.evac, ["fire strategy", "evac strategy"], "EVAC"),
  card("evac-bs8629", "BS 8629 aligned delivery", FS_SERVICE_ROUTES.evac, ["bs 8629", "evacuation alert"], "EVAC"),
  card("evac-commissioning", "EVAC commissioning & handover", FS_SERVICE_ROUTES.evac, ["evac handover", "evac commissioning"], "EVAC"),
  card("evac-maintenance", "EVAC maintenance & testing", FS_SERVICE_ROUTES.evac, ["evac ppm", "evac testing"], "EVAC"),
  entry("fire-evac", "EVAC evacuation alert systems", FS_SERVICE_ROUTES.evac, ["evac", "evacuation alert", "bs 8629", "flats"], "EVAC"),

  // Refuge / EVC
  card("fire-refuge", "Disabled refuge systems", FS_SERVICE_ROUTES.refugeDisabledCommunication, ["refuge", "bs 5839-9"], "Refuge & EVC"),
  card("fire-telephone", "Fire telephones", FS_SERVICE_ROUTES.refugeDisabledCommunication, ["firefighter telephone", "evc"], "Refuge & EVC"),
  card("fire-toilet", "Disabled toilet alarms", FS_SERVICE_ROUTES.refugeDisabledCommunication, ["toilet alarm", "assistance alarm"], "Refuge & EVC"),
  card("fire-evc-panels", "Central control panels", FS_SERVICE_ROUTES.refugeDisabledCommunication, ["evc panel", "lexicomm", "masterstation"], "Refuge & EVC"),
  card("fire-two-way", "Two-way communication", FS_SERVICE_ROUTES.refugeDisabledCommunication, ["two way speech", "refuge speech"], "Refuge & EVC"),
  card("fire-evc-commissioning", "EVC commissioning and handover", FS_SERVICE_ROUTES.refugeDisabledCommunication, ["evc commissioning", "refuge handover"], "Refuge & EVC"),
  card("fire-evc-maintenance", "EVC routine testing and maintenance", FS_SERVICE_ROUTES.refugeDisabledCommunication, ["evc ppm", "refuge maintenance"], "Refuge & EVC"),

  // CCTV
  card("cctv-ip", "IP CCTV", FS_SERVICE_ROUTES.cctvSystems, ["ip cameras", "nvr", "surveillance"], "CCTV"),
  card("cctv-hd-analogue", "HD analogue upgrades", FS_SERVICE_ROUTES.cctvSystems, ["hd analogue", "analogue upgrade", "hybrid"], "CCTV"),
  card("cctv-remote", "Remote viewing", FS_SERVICE_ROUTES.cctvSystems, ["remote cctv", "live view", "playback"], "CCTV"),
  card("cctv-recording", "Recording and retention", FS_SERVICE_ROUTES.cctvSystems, ["retention", "nvr recording", "footage"], "CCTV"),
  card("cctv-health", "Camera health monitoring", FS_SERVICE_ROUTES.cctvSystems, ["camera health", "fault alerting"], "CCTV"),
  card("cctv-anpr", "ANPR where offered", FS_SERVICE_ROUTES.cctvSystems, ["number plate recognition", "anpr camera"], "CCTV"),
  card("cctv-analytics", "Analytics where offered", FS_SERVICE_ROUTES.cctvSystems, ["motion analytics", "line crossing"], "CCTV"),
  card("cctv-network", "Network segregation", FS_SERVICE_ROUTES.cctvSystems, ["vlan", "cctv network"], "CCTV"),
  card("cctv-maintenance", "CCTV maintenance and repairs", FS_SERVICE_ROUTES.cctvSystems, ["cctv ppm", "camera repair"], "CCTV"),

  // Video Door Entry
  card("vde-audio-video", "Audio and video entry", FS_SERVICE_ROUTES.videoDoorEntrySystems, ["video entry", "door station", "visitor"], "Video Door Entry"),
  card("vde-single-residence", "Single residence systems", FS_SERVICE_ROUTES.videoDoorEntrySystems, ["house entry", "domestic video entry"], "Video Door Entry"),
  card("vde-multi-occupancy", "Multi-occupancy systems", FS_SERVICE_ROUTES.videoDoorEntrySystems, ["apartment entry", "block entry"], "Video Door Entry"),
  card("vde-concierge", "Concierge integration", FS_SERVICE_ROUTES.videoDoorEntrySystems, ["concierge", "reception desk"], "Video Door Entry"),
  card("vde-ip", "IP and networked video entry", FS_SERVICE_ROUTES.videoDoorEntrySystems, ["ip video entry", "networked door entry"], "Video Door Entry"),
  card("vde-mobile", "Mobile answering", FS_SERVICE_ROUTES.videoDoorEntrySystems, ["answer on phone", "mobile release"], "Video Door Entry"),
  card("vde-access", "Access-control integration", FS_SERVICE_ROUTES.videoDoorEntrySystems, ["fob release", "card entry"], "Video Door Entry"),
  card("vde-gate", "Gate automation integration", FS_SERVICE_ROUTES.videoDoorEntrySystems, ["gate video entry", "barrier entry"], "Video Door Entry"),
  card("vde-maintenance", "Video entry maintenance and upgrades", FS_SERVICE_ROUTES.videoDoorEntrySystems, ["video entry ppm", "handset upgrade"], "Video Door Entry"),
  card("vde-cctv", "CCTV coordination with video entry", FS_SERVICE_ROUTES.videoDoorEntrySystems, ["entry camera recording"], "Video Door Entry"),
  entry(
    "vde-systems",
    "Video door entry systems",
    FS_SERVICE_ROUTES.videoDoorEntrySystems,
    ["video entry", "door entry", "visitor identification"],
    "Video Door Entry"
  ),

  // Maintenance / call-out / monitoring hubs
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
  entry(
    "intruder-arc-hub",
    "ARC monitoring and signalling",
    FS_SERVICE_ROUTES.monitoring,
    ["alarm receiving centre", "police response", "dual path", "csl", "gradeshift", "monitoring"],
    "Monitoring"
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
