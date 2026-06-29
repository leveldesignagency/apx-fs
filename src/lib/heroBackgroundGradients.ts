/** Homepage main hero, neutral tone (no artificial brighten) */
export const HOME_HERO_IMAGE_FILTERS = "brightness-[1.0] contrast-[1.0] saturate-[1.0]"

/**
 * Fixed hero image overlays (homepage). Used by HeroVideoBackground and sections that should match the same feathering.
 */
export const HERO_BG_GRADIENT_LEFT =
  "linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 12%, transparent 28%)"

/** Bottom feather into black, taller ramp, heavier mid-feather, solid black in the lower third */
export const HERO_BG_GRADIENT_BOTTOM =
  "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0.12) 38%, rgba(0,0,0,0.35) 52%, rgba(0,0,0,0.62) 66%, rgba(0,0,0,0.88) 80%, #000000 94%, #000000 100%)"

/** Service page heroes, lighter overlays paired with image brightness boost */
export const SERVICE_HERO_BG_GRADIENT_LEFT =
  "linear-gradient(to right, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.1) 14%, transparent 32%)"

export const SERVICE_HERO_BG_GRADIENT_BOTTOM =
  "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.1) 55%, rgba(0,0,0,0.28) 68%, rgba(0,0,0,0.52) 82%, rgba(0,0,0,0.78) 92%, #000000 100%)"

export const SERVICE_HERO_IMAGE_FILTERS =
  "brightness-[1.18] contrast-[1.04] saturate-[1.06]"
