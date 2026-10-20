/** Matches CSS `--page-bg` (near-black page canvas). */
export const PAGE_BG = "#0a0a0a"

/** Near-black rgb for gradient stops (same as PAGE_BG). */
const C = "10,10,10"

/** Homepage main hero, neutral tone (no artificial brighten) */
export const HOME_HERO_IMAGE_FILTERS = "brightness-[1.0] contrast-[1.0] saturate-[1.0]"

/**
 * Fixed hero image overlays (homepage). Used by HeroVideoBackground and sections that should match the same feathering.
 */
export const HERO_BG_GRADIENT_LEFT =
  `linear-gradient(to right, rgba(${C},0.55) 0%, rgba(${C},0.2) 12%, transparent 28%)`

/** Bottom feather into page charcoal */
export const HERO_BG_GRADIENT_BOTTOM =
  `linear-gradient(to bottom, rgba(${C},0) 0%, rgba(${C},0) 22%, rgba(${C},0.12) 38%, rgba(${C},0.35) 52%, rgba(${C},0.62) 66%, rgba(${C},0.88) 80%, ${PAGE_BG} 94%, ${PAGE_BG} 100%)`

/** Service page heroes, lighter overlays paired with image brightness boost */
export const SERVICE_HERO_BG_GRADIENT_LEFT =
  `linear-gradient(to right, rgba(${C},0.32) 0%, rgba(${C},0.1) 14%, transparent 32%)`

/** Bottom feather settles fully into page charcoal (no pure-black mid-stops). */
export const SERVICE_HERO_BG_GRADIENT_BOTTOM =
  `linear-gradient(to bottom, rgba(${C},0) 0%, rgba(${C},0) 40%, rgba(${C},0.12) 55%, rgba(${C},0.32) 68%, rgba(${C},0.58) 82%, rgba(${C},0.86) 92%, ${PAGE_BG} 100%)`

/**
 * Bridge overlay under the hero into the first content band (service pages).
 * Settles to page charcoal so it doesn't clash with `--page-bg`.
 */
export const SERVICE_HERO_BRIDGE_GRADIENT =
  `linear-gradient(to bottom, rgba(${C},0) 0%, rgba(${C},0.82) 52%, ${PAGE_BG} 100%)`

/** Soft charcoal wash over service hero photos (replaces pure black /32). */
export const SERVICE_HERO_WASH = `rgba(${C},0.28)`

export const SERVICE_HERO_IMAGE_FILTERS =
  "brightness-[1.18] contrast-[1.04] saturate-[1.06]"
