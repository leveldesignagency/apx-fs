"use client"

import { useCallback, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { scrollDocumentToElement } from "@/lib/lenisBridge"

const FLASH_KEY = "apx-fs-search-flash-id"
const FLASH_EVENT = "apx-fs-run-search-flash"
/** Hold at full white, then allow border to ease back to CSS opacity. */
const FOCUS_HOLD_MS = 900
const FOCUS_FADE_MS = 450

/** In-memory backup: sessionStorage alone can race with route transitions. */
let pendingFlashId: string | null = null
let focusCleanupTimer: number | undefined

function readQueuedFlashId(): string {
  const fromMem = pendingFlashId
  let fromStore = ""
  try {
    fromStore = sessionStorage.getItem(FLASH_KEY) || ""
  } catch {
    /* ignore */
  }
  const fromHash = typeof window !== "undefined" ? window.location.hash.replace(/^#/, "").trim() : ""
  return (fromMem || fromStore || fromHash).trim()
}

function clearQueuedFlashId() {
  pendingFlashId = null
  try {
    sessionStorage.removeItem(FLASH_KEY)
  } catch {
    /* ignore */
  }
}

function clearFocusEffects() {
  if (focusCleanupTimer) {
    window.clearTimeout(focusCleanupTimer)
    focusCleanupTimer = undefined
  }
  document.querySelectorAll(".search-anchor-soft-blur").forEach((node) => {
    node.classList.remove("search-anchor-soft-blur")
  })
  document.querySelectorAll(".search-anchor-flash").forEach((node) => {
    if (node instanceof HTMLElement) {
      node.style.borderColor = ""
    }
    node.classList.remove("search-anchor-flash")
  })
  document.querySelectorAll(".search-anchor-flash-wrap").forEach((node) => {
    node.classList.remove("search-anchor-flash-wrap")
  })
  document.documentElement.classList.remove("search-anchor-focus-active")
}

function softBlurSiblings(el: HTMLElement) {
  const wrap = (el.closest(".about-reveal") as HTMLElement | null) ?? el.parentElement
  const grid = wrap?.parentElement
  const section = el.closest("section") as HTMLElement | null
  const sectionParent = section?.parentElement

  const mark = (node: Element | null | undefined) => {
    if (node instanceof HTMLElement) node.classList.add("search-anchor-soft-blur")
  }

  if (grid && wrap) {
    for (const child of Array.from(grid.children)) {
      if (child !== wrap) mark(child)
    }
  }

  if (sectionParent && section) {
    for (const child of Array.from(sectionParent.children)) {
      if (child !== section) mark(child)
    }
  }

  return wrap
}

function applyFlashClass(el: HTMLElement) {
  clearFocusEffects()

  const wrap = softBlurSiblings(el)
  wrap?.classList.add("search-anchor-flash-wrap")
  el.classList.add("search-anchor-flash")
  document.documentElement.classList.add("search-anchor-focus-active")

  // Pulse the card's own border to full white, then clear so CSS opacity returns
  void el.offsetWidth
  el.style.borderColor = "#ffffff"

  focusCleanupTimer = window.setTimeout(() => {
    el.style.borderColor = ""
    document.querySelectorAll(".search-anchor-soft-blur").forEach((node) => {
      node.classList.remove("search-anchor-soft-blur")
    })
    document.documentElement.classList.remove("search-anchor-focus-active")

    window.setTimeout(() => {
      el.classList.remove("search-anchor-flash")
      wrap?.classList.remove("search-anchor-flash-wrap")
      focusCleanupTimer = undefined
    }, FOCUS_FADE_MS)
  }, FOCUS_HOLD_MS)
}

/** Scrolls to `#hash` targets and flashes a border (used by homepage intent search). */
export function SearchAnchorFlash() {
  const pathname = usePathname()
  const runTokenRef = useRef(0)

  const flashId = useCallback((id: string) => {
    if (!id) return false
    const el = document.getElementById(id)
    if (!el) return false

    scrollDocumentToElement(el, { offset: -112, immediate: false })
    applyFlashClass(el)

    try {
      const next = `${window.location.pathname}${window.location.search}#${id}`
      if (window.location.hash !== `#${id}`) {
        window.history.replaceState(null, "", next)
      }
    } catch {
      /* ignore */
    }

    clearQueuedFlashId()
    return true
  }, [])

  const runFlashLoop = useCallback(
    (explicitId?: string) => {
      const id = (explicitId || readQueuedFlashId()).trim()
      if (!id) return

      const token = ++runTokenRef.current
      let attempts = 0
      const maxAttempts = 50

      const tryFlash = () => {
        if (token !== runTokenRef.current) return
        if (flashId(id)) return
        attempts += 1
        if (attempts >= maxAttempts) {
          clearQueuedFlashId()
          return
        }
        window.setTimeout(tryFlash, 50)
      }

      window.setTimeout(tryFlash, 80)
    },
    [flashId]
  )

  useEffect(() => {
    runFlashLoop()
  }, [pathname, runFlashLoop])

  useEffect(() => {
    const onHash = () => {
      const id = window.location.hash.replace(/^#/, "").trim()
      if (id) flashId(id)
    }
    const onRun = () => runFlashLoop()
    window.addEventListener("hashchange", onHash)
    window.addEventListener(FLASH_EVENT, onRun)
    return () => {
      window.removeEventListener("hashchange", onHash)
      window.removeEventListener(FLASH_EVENT, onRun)
      clearFocusEffects()
    }
  }, [flashId, runFlashLoop])

  return null
}

export function queueSearchAnchorFlash(anchorId: string) {
  const id = anchorId.trim()
  if (!id) return
  pendingFlashId = id
  try {
    sessionStorage.setItem(FLASH_KEY, id)
  } catch {
    /* ignore */
  }
}

/** Fire after navigation when pathname may not change (same page). */
export function requestSearchAnchorFlash() {
  if (typeof window === "undefined") return
  window.dispatchEvent(new Event(FLASH_EVENT))
}
