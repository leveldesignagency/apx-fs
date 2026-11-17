/**
 * Reference-counted body scroll lock.
 * Prevents nested overlays (mobile menu ? search) from unlocking the page
 * when the first layer closes.
 */

let lockCount = 0
let savedScrollY = 0
let savedBodyOverflow = ""
let savedBodyPosition = ""
let savedBodyTop = ""
let savedBodyWidth = ""
let savedHtmlOverflow = ""
let touchMoveBlocker: ((e: TouchEvent) => void) | null = null

function applyLock() {
  const body = document.body
  const html = document.documentElement
  savedScrollY = window.scrollY || window.pageYOffset || 0
  savedBodyOverflow = body.style.overflow
  savedBodyPosition = body.style.position
  savedBodyTop = body.style.top
  savedBodyWidth = body.style.width
  savedHtmlOverflow = html.style.overflow

  html.style.overflow = "hidden"
  body.style.overflow = "hidden"
  body.style.position = "fixed"
  body.style.top = `-${savedScrollY}px`
  body.style.width = "100%"

  if (!touchMoveBlocker) {
    touchMoveBlocker = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) {
        e.preventDefault()
        return
      }
      // Allow scroll inside explicitly scrollable overlay regions
      if (target.closest("[data-scroll-lock-allow]")) return
      e.preventDefault()
    }
    document.addEventListener("touchmove", touchMoveBlocker, { passive: false })
  }
}

function releaseLock() {
  const body = document.body
  const html = document.documentElement
  html.style.overflow = savedHtmlOverflow
  body.style.overflow = savedBodyOverflow
  body.style.position = savedBodyPosition
  body.style.top = savedBodyTop
  body.style.width = savedBodyWidth
  window.scrollTo(0, savedScrollY)

  if (touchMoveBlocker) {
    document.removeEventListener("touchmove", touchMoveBlocker)
    touchMoveBlocker = null
  }
}

export function lockBodyScroll(): () => void {
  if (typeof document === "undefined") return () => {}
  lockCount += 1
  if (lockCount === 1) applyLock()
  let released = false
  return () => {
    if (released) return
    released = true
    lockCount = Math.max(0, lockCount - 1)
    if (lockCount === 0) releaseLock()
  }
}
