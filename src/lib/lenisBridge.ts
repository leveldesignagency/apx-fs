/** Imperative Lenis access without importing lenis/react outside PremiumScroll. */
type LenisLike = {
  scroll: number
  scrollTo: (target: number, options?: { immediate?: boolean; force?: boolean }) => void
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
