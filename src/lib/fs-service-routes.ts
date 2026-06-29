/** Canonical `/services/…` paths — slugs match the service name, not legacy MEP routes. */
export const FS_SERVICE_ROUTES = {
  cctvSystems: "/services/cctv-systems",
  accessControlSystems: "/services/access-control-systems",
  intruderAlarmSystems: "/services/intruder-alarm-systems",
  fireAlarmSystems: "/services/fire-alarm-systems",
  videoDoorEntrySystems: "/services/video-door-entry-systems",
  refugeDisabledCommunication: "/services/refuge-disabled-communication",
  evacVoiceEvacuation: "/services/evac-voice-evacuation",
  fireLifeSafety: "/services/fire-life-safety",
  maintenanceSupport: "/services/maintenance-support",
  securitySystems: "/services/security-systems",
} as const

/** Legacy news URLs → canonical `/news` routes. */
export const FS_LEGACY_NEWS_REDIRECTS: Record<string, string> = {
  "/company-profile/security-systems-news": "/news",
  "/2023/07/kings-academy-intruder-alarm-systems": "/news/kings-academy-intruder-alarm-systems",
  "/2023/05/security-systems-installation-lewisham-council": "/news/lewisham-council-bampton-estate",
  "/2023/04/smart-building-security-solution-london": "/news/smart-building-127-charing-cross-road",
  "/2023/04/security-system-installation-portobello-square": "/news/portobello-square-wornington-green",
  "/2023/03/custom-screen-layouts-xts-monitors": "/news/custom-screen-layouts-xts-monitors",
}

/** Legacy MEP-style slugs → permanent redirects to canonical paths. */
export const FS_LEGACY_SERVICE_REDIRECTS: Record<string, string> = {
  "/services/electrical-systems": FS_SERVICE_ROUTES.cctvSystems,
  "/services/energy-efficiency": FS_SERVICE_ROUTES.accessControlSystems,
  "/services/sustainability": FS_SERVICE_ROUTES.intruderAlarmSystems,
  "/services/mechanical-engineering": FS_SERVICE_ROUTES.fireAlarmSystems,
  "/services/maintenance": FS_SERVICE_ROUTES.videoDoorEntrySystems,
  "/services/project-management": "/services",
}

/** Slug segment only (for contact `?service=` query params). */
export const FS_CONTACT_SERVICE_SLUGS = {
  cctvSystems: "cctv-systems",
  accessControlSystems: "access-control-systems",
  intruderAlarmSystems: "intruder-alarm-systems",
  fireAlarmSystems: "fire-alarm-systems",
  videoDoorEntrySystems: "video-door-entry-systems",
  refugeDisabledCommunication: "refuge-disabled-communication",
  evacVoiceEvacuation: "evac-voice-evacuation",
  fireLifeSafety: "fire-life-safety",
  maintenanceSupport: "maintenance-support",
} as const

/** Map legacy contact form slugs to current ones. */
export const FS_LEGACY_CONTACT_SERVICE_SLUGS: Record<string, string> = {
  "electrical-systems": FS_CONTACT_SERVICE_SLUGS.cctvSystems,
  "energy-efficiency": FS_CONTACT_SERVICE_SLUGS.accessControlSystems,
  sustainability: FS_CONTACT_SERVICE_SLUGS.intruderAlarmSystems,
  "mechanical-engineering": FS_CONTACT_SERVICE_SLUGS.fireAlarmSystems,
  maintenance: FS_CONTACT_SERVICE_SLUGS.videoDoorEntrySystems,
}
