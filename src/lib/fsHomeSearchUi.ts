/** TEMP testing: set false before launch - auto-show every homepage visit (ignore dismiss cookie). */
export const FORCE_HOME_SEARCH_EVERY_VISIT = false

/** Session cookie: auto-show homepage search once per browser session. */
export const FS_HOME_SEARCH_DISMISSED_COOKIE = "apx_fs_home_search_dismissed"
export const FS_HOME_SEARCH_OPEN_EVENT = "apx-fs-open-home-search"

export function hasDismissedHomeSearch(): boolean {
  if (FORCE_HOME_SEARCH_EVERY_VISIT) return false
  if (typeof document === "undefined") return false
  try {
    if (document.cookie.split("; ").some((c) => c.startsWith(`${FS_HOME_SEARCH_DISMISSED_COOKIE}=`))) {
      return true
    }
  } catch {
    /* ignore */
  }
  try {
    return sessionStorage.getItem("apx-fs-home-search-intent-dismissed") === "1"
  } catch {
    return false
  }
}

/** Session cookie (no Max-Age) so it clears when the browser session ends. */
export function markHomeSearchDismissed(): void {
  if (FORCE_HOME_SEARCH_EVERY_VISIT) return
  try {
    document.cookie = `${FS_HOME_SEARCH_DISMISSED_COOKIE}=1; path=/; SameSite=Lax`
  } catch {
    /* ignore */
  }
  try {
    sessionStorage.setItem("apx-fs-home-search-intent-dismissed", "1")
  } catch {
    /* ignore */
  }
}

export function openFsHomeSearch(): void {
  if (typeof window === "undefined") return
  window.dispatchEvent(new CustomEvent(FS_HOME_SEARCH_OPEN_EVENT))
}
