"use client"

import { useEffect } from "react"

const MEDIA_SELECTOR = "img, picture, video, canvas, svg"

function isProtectedMediaTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) return false
  return Boolean(target.closest(MEDIA_SELECTOR))
}

/** Soft media lock: blocks right-click / drag-save on images and video. */
export function ImageProtect() {
  useEffect(() => {
    const onContextMenu = (e: MouseEvent) => {
      if (isProtectedMediaTarget(e.target)) e.preventDefault()
    }
    const onDragStart = (e: DragEvent) => {
      if (isProtectedMediaTarget(e.target)) e.preventDefault()
    }

    document.addEventListener("contextmenu", onContextMenu)
    document.addEventListener("dragstart", onDragStart)
    return () => {
      document.removeEventListener("contextmenu", onContextMenu)
      document.removeEventListener("dragstart", onDragStart)
    }
  }, [])

  return null
}
