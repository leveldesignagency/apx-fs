/** Custom event: open the site search overlay from the header search control. */
export const FS_HOME_SEARCH_OPEN_EVENT = "apx-fs-open-home-search"

export function openFsHomeSearch(): void {
  if (typeof window === "undefined") return
  window.dispatchEvent(new CustomEvent(FS_HOME_SEARCH_OPEN_EVENT))
}
