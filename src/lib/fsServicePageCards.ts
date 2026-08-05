/**
 * Shared “shimmer” gradient card style for FS service pages (benefit summaries, detail cards, customer/installation cards).
 */
export const FS_SERVICE_SHIMMER_CARD =
  "rounded-tl-[1.25rem] rounded-br-[1.25rem] border border-white/18 bg-[linear-gradient(145deg,rgba(255,255,255,0.07)_0%,rgba(0,0,0,0.4)_100%)] text-white transition-colors hover:border-white/45"

/** Shared image grow-on-hover (wrap fill Image; parent needs `group` + `overflow-hidden`). */
export const FS_SERVICE_IMAGE_GROW_INNER =
  "absolute inset-0 origin-center transition-transform duration-500 ease-out group-hover:scale-105"

/** Installation / case-study card shell — image area uses {@link FS_SERVICE_IMAGE_GROW_INNER}. */
export const FS_SERVICE_INSTALLATION_CARD = `${FS_SERVICE_SHIMMER_CARD} group overflow-hidden p-0`

export const FS_SERVICE_INSTALLATION_CARD_IMAGE =
  "relative aspect-[4/3] w-full overflow-hidden bg-white/5"

/** Homepage core capabilities (Where We Thrive) — matches projects listing card borders */
export const FS_HOME_THRIVE_CARD =
  "rounded-tl-[1.25rem] rounded-br-[1.25rem] border-2 border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.07)_0%,rgba(0,0,0,0.4)_100%)] text-white transition-colors hover:border-white"

/**
 * Larger radius, heavier border and padding, e.g. CCTV commercial/domestic/advice three-column icon cards (same gradient as {@link FS_SERVICE_SHIMMER_CARD}).
 */
export const FS_SERVICE_SHIMMER_CARD_FEATURE =
  "rounded-tl-[1.5rem] rounded-br-[1.5rem] border-2 border-white/20 bg-[linear-gradient(145deg,rgba(255,255,255,0.07)_0%,rgba(0,0,0,0.4)_100%)] p-8 text-white transition-colors hover:border-white/45"
