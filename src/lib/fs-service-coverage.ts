/**
 * Client-side coverage check for London + Home Counties.
 * Matches on the postcode area letters (e.g. DA from DA8 3EZ).
 * Tune FS_COVERED_POSTCODE_AREAS with the office if edge cases need tightening.
 */

/** Outward-code areas APX treats as in-coverage (London and Home Counties). */
export const FS_COVERED_POSTCODE_AREAS = [
  // Greater London + fringe
  "E",
  "EC",
  "N",
  "NW",
  "SE",
  "SW",
  "W",
  "WC",
  "BR",
  "CR",
  "DA",
  "EN",
  "HA",
  "IG",
  "KT",
  "RM",
  "SM",
  "TW",
  "UB",
  "WD",
  // Home Counties (aligned with seo-geo-areas)
  "AL", // Hertfordshire
  "BN", // East / West Sussex
  "CB", // Cambridgeshire
  "CM", // Essex
  "CO", // Essex
  "CT", // Kent
  "GU", // Surrey / Hampshire
  "HP", // Hertfordshire / Buckinghamshire
  "LU", // Bedfordshire
  "ME", // Kent
  "MK", // Buckinghamshire / Bedfordshire
  "OX", // Oxfordshire
  "PO", // West Sussex / Hampshire
  "RG", // Berkshire / Hampshire / Oxfordshire
  "RH", // Surrey / West Sussex
  "SG", // Hertfordshire / Bedfordshire / Cambridgeshire
  "SL", // Berkshire / Buckinghamshire
  "SO", // Hampshire
  "SS", // Essex
  "TN", // Kent / East Sussex
] as const

const COVERED_SET = new Set<string>(
  FS_COVERED_POSTCODE_AREAS.map((a) => a.toUpperCase())
)

/** UK postcode outward area: 1-2 letters at the start of the outward code. */
const UK_POSTCODE_RE =
  /^([A-Z]{1,2})(\d[A-Z\d]?)\s*(\d[A-Z]{2})$/i

export type FsCoverageResult =
  | { status: "empty" }
  | { status: "invalid"; message: string }
  | {
      status: "covered" | "outside"
      normalised: string
      area: string
      message: string
    }

export function normalizeUkPostcode(input: string): string {
  return input.trim().toUpperCase().replace(/\s+/g, " ")
}

export function parseUkPostcodeArea(input: string): {
  normalised: string
  area: string
} | null {
  const compact = input.trim().toUpperCase().replace(/\s+/g, "")
  if (compact.length < 5 || compact.length > 7) return null

  // Insert space before inward code (last 3 chars)
  const withSpace =
    compact.length > 3
      ? `${compact.slice(0, compact.length - 3)} ${compact.slice(-3)}`
      : compact

  const match = withSpace.match(UK_POSTCODE_RE)
  if (!match) return null

  const area = match[1]!
  const district = match[2]!
  const inward = match[3]!
  return {
    normalised: `${area}${district} ${inward}`,
    area,
  }
}

export function checkFsServiceCoverage(input: string): FsCoverageResult {
  const trimmed = input.trim()
  if (!trimmed) return { status: "empty" }

  const parsed = parseUkPostcodeArea(trimmed)
  if (!parsed) {
    return {
      status: "invalid",
      message: "Enter a full UK postcode, for example DA8 3EZ.",
    }
  }

  const covered = COVERED_SET.has(parsed.area)
  if (covered) {
    return {
      status: "covered",
      normalised: parsed.normalised,
      area: parsed.area,
      message: `${parsed.normalised} is within our London and Home Counties service area. We can survey and quote for this location.`,
    }
  }

  return {
    status: "outside",
    normalised: parsed.normalised,
    area: parsed.area,
    message: `${parsed.normalised} sits outside our usual coverage. Get in touch anyway - we sometimes support neighbouring sites.`,
  }
}
