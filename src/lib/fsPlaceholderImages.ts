/**
 * Stock images under `public/projects/library/` used as temporary fills where real project
 * photography is not yet wired. Cycle with {@link fsPlaceholderImageAt} or pick deterministically
 * with {@link fsPlaceholderImageForKey} so the same block stays stable across renders.
 */
export const FS_PLACEHOLDER_IMAGES = [
  "/projects/library/video-door-entry-systems-panel.jpg",
  "/projects/library/hero-access-control-system.jpg",
  "/projects/library/home-cctv-system-installer.jpg",
  "/projects/library/hero-fire-alarm-system-installer.jpg",
  "/projects/library/commercial-cctv-premises-monitoring-sq.jpg",
  "/projects/library/intruder-alarm-system-sq.jpg",
  "/projects/library/access-control-systems-door-card-sq.jpg",
  "/projects/library/domestic-cctv-system-installer-london.jpg",
  "/projects/library/hero-intruder-alarm-system-installer-london.jpg",
  "/projects/library/commercial-cctv-monitor-business.jpg",
  "/projects/library/home-video-door-entry-system-installer.jpg",
  "/projects/library/hero-domestic-cctv-residential-property.jpg",
] as const

export function fsPlaceholderImageAt(index: number): string {
  const n = FS_PLACEHOLDER_IMAGES.length
  const i = ((index % n) + n) % n
  return FS_PLACEHOLDER_IMAGES[i]!
}

function fnv1aHash(str: string): number {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/** Stable pseudo-random image for a string key (section id, title, etc.). */
export function fsPlaceholderImageForKey(key: string): string {
  return fsPlaceholderImageAt(fnv1aHash(key))
}
