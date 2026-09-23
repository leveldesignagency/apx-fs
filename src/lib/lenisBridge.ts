/** Imperative Lenis access without importing lenis/react outside PremiumScroll. */
type LenisScrollTarget = number | string | HTMLElement

type LenisLike = {
  scroll: number
  scrollTo: (
    target: LenisScrollTarget,
    options?: {
      immediate?: boolean
      force?: boolean
      offset?: number
      duration?: number
      lock?: boolean
    }
  ) => void
  on: (event: "scroll", handler: () => void) => void
  off: (event: "scroll", handler: () => void) => void
  stop: () => void
  start: () => void
}

let lenisInstance: LenisLike | null = null
const scrollListeners = new Set<() => void>()
let lenisScrollHandler: (() => void) | null = null

function notifyScrollListeners() {
  scrollListeners.forEach((handler) => handler())
}

export function setLenisInstance(instance: LenisLike | null) {
  if (lenisInstance && lenisScrollHandler) {
    lenisInstance.off("scroll", lenisScrollHandler)
  }

  lenisInstance = instance
  lenisScrollHandler = instance ? notifyScrollListeners : null

  if (instance && lenisScrollHandler) {
    instance.on("scroll", lenisScrollHandler)
  }
}

export function getDocumentScrollY() {
  if (lenisInstance) return lenisInstance.scroll
  return window.scrollY
}

export function scrollDocumentTo(targetY: number) {
  if (lenisInstance) {
    lenisInstance.scrollTo(targetY, { immediate: true, force: true })
    return
  }
  window.scrollTo(0, targetY)
}

/** Scroll to an element (Lenis-aware). Offset pulls the target slightly below the header. */
export function scrollDocumentToElement(
  el: HTMLElement,
  options?: { offset?: number; immediate?: boolean }
) {
  const offset = options?.offset ?? -96
  const immediate = options?.immediate ?? false

  if (lenisInstance) {
    lenisInstance.scrollTo(el, { offset, immediate, force: true })
    return
  }

  const top = el.getBoundingClientRect().top + window.scrollY + offset
  window.scrollTo({ top, behavior: immediate ? "auto" : "smooth" })
}

export function stopSmoothScroll() {
  lenisInstance?.stop()
}

export function startSmoothScroll() {
  lenisInstance?.start()
}

export function subscribeDocumentScroll(handler: () => void) {
  scrollListeners.add(handler)
  return () => {
    scrollListeners.delete(handler)
  }
}
