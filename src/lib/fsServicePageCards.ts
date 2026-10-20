/**
 * Shared flat card style for FS service pages (benefit summaries, detail cards, customer/installation cards).
 * Solid black fill + 1px white border — no gradients / 3D chrome.
 */
export const FS_SERVICE_SHIMMER_CARD =
  "rounded-tl-[1.25rem] rounded-br-[1.25rem] border border-white/18 bg-[var(--page-bg)] text-white transition-colors hover:border-white/45"

/** Shared image grow-on-hover (wrap fill Image; parent needs `group` + `overflow-hidden`). */
export const FS_SERVICE_IMAGE_GROW_INNER =
  "absolute inset-0 origin-center transition-transform duration-500 ease-out group-hover:scale-105"

/** Installation / case-study card shell, image area uses {@link FS_SERVICE_IMAGE_GROW_INNER}. */
export const FS_SERVICE_INSTALLATION_CARD = `${FS_SERVICE_SHIMMER_CARD} group overflow-hidden p-0`

export const FS_SERVICE_INSTALLATION_CARD_IMAGE =
  "relative aspect-[4/3] w-full overflow-hidden bg-white/5"

/**
 * Grid for completed-project / installation cards.
 * Prefer {@link ServiceInstallationsGrid} so short last rows get a fill CTA.
 * Caps width for 1–2 items when no fill CTA (see `.fs-service-installations-grid` in globals.css).
 */
export const FS_SERVICE_INSTALLATIONS_GRID = "fs-service-installations-grid grid gap-8"

/** Homepage core capabilities (Where We Thrive), matches projects listing card borders */
export const FS_HOME_THRIVE_CARD =
  "rounded-tl-[1.25rem] rounded-br-[1.25rem] border border-white/70 bg-[var(--page-bg)] text-white transition-colors hover:border-white"

/**
 * Larger radius and padding, e.g. CCTV commercial/domestic/advice three-column icon cards.
 */
export const FS_SERVICE_SHIMMER_CARD_FEATURE =
  "rounded-tl-[1.5rem] rounded-br-[1.5rem] border border-white/20 bg-[var(--page-bg)] p-8 text-white transition-colors hover:border-white/45"
