/** URL-encoded — folder name in /public contains spaces */
export const APX_PARTNER_LOGO_DIR = "/ACCESS%20CONTROL%20LOGO%20PARTNERS" as const

export type PartnerLogoEntry = {
  name: string
  href: string
  logoSrc: string | null
  /** Slightly larger slot + image (e.g. TDSi / Entrotec) */
  size?: "lg"
}
