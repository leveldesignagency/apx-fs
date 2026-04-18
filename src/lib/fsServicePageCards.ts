/**
 * Shared “shimmer” gradient card style for FS service pages (benefit summaries, detail cards, customer/installation cards).
 */
export const FS_SERVICE_SHIMMER_CARD =
  "rounded-tl-[1.25rem] rounded-br-[1.25rem] border border-white/18 bg-[linear-gradient(145deg,rgba(255,255,255,0.07)_0%,rgba(0,0,0,0.4)_100%)] text-white transition-colors hover:border-white/45"

/**
 * Larger radius, heavier border and padding — e.g. CCTV commercial/domestic/advice three-column icon cards (same gradient as {@link FS_SERVICE_SHIMMER_CARD}).
 */
export const FS_SERVICE_SHIMMER_CARD_FEATURE =
  "rounded-tl-[1.5rem] rounded-br-[1.5rem] border-2 border-white/20 bg-[linear-gradient(145deg,rgba(255,255,255,0.07)_0%,rgba(0,0,0,0.4)_100%)] p-8 text-white transition-colors hover:border-white/45"
