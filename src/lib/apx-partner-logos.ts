/** URL-encoded, folder name in /public contains spaces */
export const APX_PARTNER_LOGO_DIR = "/ACCESS%20CONTROL%20LOGO%20PARTNERS" as const

export const FIRE_ALARM_BRANDS_DIR = "/service%20images/fire%20alarm%20systems" as const

export const INTRUDER_ALARM_BRANDS_DIR = "/Intruder%20Alarm" as const

export type PartnerLogoEntry = {
  name: string
  /** Provider website — every logo in {@link ApxPartnerLogoStrip} links here */
  href: string
  logoSrc: string | null
  /** Balances mixed SVG viewBoxes / intrinsic sizes inside the uniform slot */
  logoScaleClass?: string
  /** Applied to the logo image when the strip uses the light (white) variant */
  logoLightClassName?: string
  /** @deprecated Prefer logoScaleClass on a uniform slot */
  size?: "lg"
}

export const PAC_PARTNER_LOGO_SRC = `${APX_PARTNER_LOGO_DIR}/pac.png` as const

/** Shared PAC mark (video entry, access control, and other technology logo strips) */
export const PAC_PARTNER: PartnerLogoEntry = {
  name: "PAC",
  href: "https://www.pac.co.uk/",
  logoSrc: PAC_PARTNER_LOGO_SRC,
  logoScaleClass: "scale-[1.35]",
}

export const ACCESS_CONTROL_PARTNERS: readonly PartnerLogoEntry[] = [
  { name: "TDSi", href: "https://www.tdsi.co.uk/", logoSrc: `${APX_PARTNER_LOGO_DIR}/tdsi.svg`, logoScaleClass: "scale-[1.35]" },
  { name: "CAME Entrotec", href: "https://www.came.com/uk", logoSrc: `${APX_PARTNER_LOGO_DIR}/logo-entrotec.svg`, logoScaleClass: "scale-[1.12]" },
  PAC_PARTNER,
  { name: "ASSA ABLOY", href: "https://www.assaabloy.com/", logoSrc: `${APX_PARTNER_LOGO_DIR}/assa-abloy-access-blue-logo.svg`, logoScaleClass: "scale-[0.82]" },
  { name: "Videx", href: "https://www.videxuk.com/", logoSrc: `${APX_PARTNER_LOGO_DIR}/videx.svg`, logoScaleClass: "scale-[0.88]" },
  { name: "CDVI", href: "https://www.cdvi.co.uk/", logoSrc: `${APX_PARTNER_LOGO_DIR}/cdvi.svg`, logoScaleClass: "scale-[0.85]" },
]

export const VIDEO_DOOR_TECH_PARTNERS: readonly PartnerLogoEntry[] = [
  { name: "CAME Entrotec", href: "https://www.came.com/uk", logoSrc: `${APX_PARTNER_LOGO_DIR}/logo-entrotec.svg`, logoScaleClass: "scale-[1.12]" },
  { name: "Videx", href: "https://www.videxuk.com/", logoSrc: `${APX_PARTNER_LOGO_DIR}/videx.svg`, logoScaleClass: "scale-[0.88]" },
  { name: "CDVI", href: "https://www.cdvi.co.uk/", logoSrc: `${APX_PARTNER_LOGO_DIR}/cdvi.svg`, logoScaleClass: "scale-[0.85]" },
  PAC_PARTNER,
  { name: "Paxton", href: "https://www.paxton-access.co.uk/", logoSrc: `${APX_PARTNER_LOGO_DIR}/paxton-logo.svg`, logoScaleClass: "scale-[0.9]" },
]

export const INTRUDER_ALARM_TECHNOLOGY_PARTNERS: readonly PartnerLogoEntry[] = [
  { name: "Honeywell", href: "https://buildings.honeywell.com/uk/en", logoSrc: `${INTRUDER_ALARM_BRANDS_DIR}/honeywell-logo-1.svg`, logoScaleClass: "scale-[0.82]" },
  { name: "Eaton", href: "https://www.eaton.com/gb/en-gb/catalog/security-intrusion---detection.html", logoSrc: `${INTRUDER_ALARM_BRANDS_DIR}/eaton-6-1.svg`, logoScaleClass: "scale-[0.8]" },
  { name: "Optex", href: "https://www.optex.eu/", logoSrc: `${INTRUDER_ALARM_BRANDS_DIR}/optex-vehicle-sensors-vector-logo.svg`, logoScaleClass: "scale-[2.15]" },
  { name: "Texecom", href: "https://www.texe.com/", logoSrc: `${INTRUDER_ALARM_BRANDS_DIR}/texecom.png`, logoScaleClass: "scale-[0.92]", logoLightClassName: "brightness-0" },
  { name: "CQR", href: "https://www.cqr-alarms.com/", logoSrc: "/service%20images/intruders/cqr%20logo.png", logoScaleClass: "scale-[0.88]", logoLightClassName: "brightness-0" },
]

export const FIRE_ALARM_EQUIPMENT_PARTNERS: readonly PartnerLogoEntry[] = [
  { name: "Xtralis", href: "https://www.xtralis.com/", logoSrc: `${FIRE_ALARM_BRANDS_DIR}/xtralis-logo-anthracite.svg`, logoScaleClass: "scale-[0.95]" },
  { name: "Vox Ignis", href: "https://www.voxignis.com/", logoSrc: `${FIRE_ALARM_BRANDS_DIR}/product-logo-vox-ignis-600x400.png`, logoScaleClass: "scale-[1.35]" },
  { name: "Advanced", href: "https://www.advanced.co.uk/", logoSrc: `${FIRE_ALARM_BRANDS_DIR}/product-logo-advanced-600x400.png`, logoScaleClass: "scale-[1.35]" },
  { name: "Reach Wireless", href: "https://www.reachwireless.co.uk/", logoSrc: `${FIRE_ALARM_BRANDS_DIR}/product-logo-reach-wireless-600x400.png`, logoScaleClass: "scale-[1.35]" },
  { name: "Apollo", href: "https://www.apollo-fire.co.uk/", logoSrc: `${FIRE_ALARM_BRANDS_DIR}/product-logo-apollo-600x400.png`, logoScaleClass: "scale-[1.35]" },
  { name: "EMS", href: "https://www.emsgroupuk.com/", logoSrc: `${FIRE_ALARM_BRANDS_DIR}/product-logo-ems-600x400.png`, logoScaleClass: "scale-[1.35]" },
]
