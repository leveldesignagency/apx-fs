/** Next/Image `src`, paths under /public (spaces URL-encoded). */
export const serviceHeroImages = {
  cctv: "/client%20logos/service%20pages%20image/home-cctv-system-installer-800x533.jpg",
  domesticCctv: "/service%20images/cctv%20/domestic%20cctv%20hero.jpg",
  commercialCctv:
    "/service%20images/cctv%20/hero-commercial-cctv-system-installation.jpg",
  cctvAdvice: "/service%20images/cctv%20/hero-useful-cctv-advice.jpg",
  fireAlarm:
    "/service%20images/fire%20alarm%20systems/hero-fire-alarm-call-point-wide.jpg",
  intruder: "/service%20images/intruders/hero-hd-forced-entry-door-crowbar.jpg",
  accessControl: "/service%20images/access%20control/hero-access-control-commercial-entry.jpg",
  videoDoor: "/projects/library/home-video-door-entry-system-installer.jpg",
  gateAutomation: "/gate%20automation.jpg",
  /** PAVA: retail concourse with ceiling loudspeakers (HD) */
  pava: "/service%20images/evac/hero-hd-pava-retail-concourse.jpg",
  /** @deprecated use `pava` — kept for older imports */
  evacVoice: "/service%20images/evac/hero-hd-pava-retail-concourse.jpg",
  /** EVAC (BS 8629): hotel corridor with emergency lighting on the right (HD) */
  evac: "/service%20images/evac/hero-hd-evac-exit-right-v2.jpg",
  /** Disabled refuge / EVC: school corridor with fire cabinet and exit route */
  refuge: "/service%20images/refuge/hero-disabled-refuge-school-corridor.jpg",
  monitoring: "/projects/library/intruder-alarm-monitoring-company-sq.jpg",
  maintenance: "/service%20images/MAINTAINENCE%20AND%20SUPPORT.jpg",
  emergencyCallOut: "/service%20images/callout-capabilities/hero-24-hour-call-out.png",
} as const

/**
 * Mid-page section photos, keep distinct from the page hero so service pages do not repeat
 * the same full-bleed crop in hero + body.
 */
export const serviceSectionImages = {
  gateDidYouKnow: "/Comprehensive%20Security%20Systems.jpg",
  gateManagedSites: "/projects/library/access-control-systems-door-entry-card-sq.jpg",
  refuge: "/Fire%20Telephone.jpeg",
  refugeCta: "/service%20images/refuge/disabled-refuge-outstation.jpg",
  fireAlarmBody:
    "/projects/case-studies/university-of-west-london/fire-alarm-installation-university-of-west-london-reception.jpg",
  accessBody: "/projects/library/access-control-systems-door-card-sq.jpg",
  videoDoorBody: "/projects/library/video-door-entry-systems-panel.jpg",
  intruderBody: "/projects/library/intruder-alarm-system-sq.jpg",
  cctvBody: "/projects/library/commercial-cctv-premises-monitoring-sq.jpg",
  /** PAVA mid-page: commercial reception / PA-VA install context */
  pavaBody: "/projects/library/case-study-pa-va-system-installation-reception.jpg",
  /** EVAC mid-page: keep distinct from PAVA speaker hero */
  evacBody: "/projects/library/home-fire-alarm-system-installer.jpg",
  monitoringBody: "/projects/library/commercial-cctv-monitor-business.jpg",
  maintenanceBody: "/projects/library/hero-fire-alarm-system-installer.jpg",
  emergencyCallOutBody: "/projects/library/apx-fire-security-alarm-box.jpg",
} as const
