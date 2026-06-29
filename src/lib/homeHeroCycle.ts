export const HOME_HERO_CORE_IMAGE = "/apx-fs-hero-image.jpg"

/** Full-scale main hero hold at start and end of each cycle */
export const HOME_HERO_MAIN_MS = 8000

/** Each service slide in the right-hand panel */
export const HOME_HERO_SLIDE_MS = 8000

export type HomeHeroCyclePhase = "main" | "services"

export function getHomeHeroCycleDuration(
  phase: HomeHeroCyclePhase,
  reduceMotion: boolean,
): number {
  if (reduceMotion) return 0
  return phase === "main" ? HOME_HERO_MAIN_MS : HOME_HERO_SLIDE_MS
}
