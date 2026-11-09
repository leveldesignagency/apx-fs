"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

export type CursorSurface = "image" | "dark" | "light"

function parseCssColor(bg: string): { r: number; g: number; b: number; a: number } | null {
  const m = bg.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+)\s*)?\)/)
  if (!m) return null
  return {
    r: Number(m[1]),
    g: Number(m[2]),
    b: Number(m[3]),
    a: m[4] !== undefined ? Number(m[4]) : 1,
  }
}

function relativeLuminance(r: number, g: number, b: number): number {
  const lin = [r, g, b].map((c) => {
    const v = c / 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * lin[0]! + 0.7152 * lin[1]! + 0.0722 * lin[2]!
}

function luminanceFromBackground(el: Element | null): number {
  let node: HTMLElement | null = el as HTMLElement
  while (node && node !== document.documentElement) {
    const bg = getComputedStyle(node).backgroundColor
    const p = parseCssColor(bg)
    if (p && p.a >= 0.06) {
      let lum = relativeLuminance(p.r, p.g, p.b)
      if (p.a < 0.98) lum = lum * p.a + (1 - p.a) * 1
      return lum
    }
    node = node.parentElement
  }
  return 1
}

function isOverImage(clientX: number, clientY: number): boolean {
  const stack = document.elementsFromPoint(clientX, clientY)
  for (const node of stack) {
    if (!(node instanceof Element)) continue
    if (node.closest("[data-cursor-surface-ignore]")) continue
    const tag = node.tagName
    if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS") return true
    if (tag === "SVG" && node.getAttribute("role") === "img") return true
  }
  return false
}

function isInteractiveTarget(el: EventTarget | null): boolean {
  if (!el || !(el instanceof Element)) return false
  const node = el as HTMLElement
  return (
    node.closest("a, button, [role='button'], input, textarea, select, .cursor-pointer, summary, label[for]") !==
    null
  )
}

function getSurface(el: Element, clientX: number, clientY: number): CursorSurface {
  if (isOverImage(clientX, clientY)) return "image"
  if (el.closest("header.site-header")) return "dark"

  const surfaceHint = el.closest("[data-cursor-surface]")?.getAttribute("data-cursor-surface")
  if (surfaceHint === "light") return "light"
  if (surfaceHint === "dark") return "dark"

  return luminanceFromBackground(el) < 0.34 ? "dark" : "light"
}

/** Premium custom cursor: single dot only (no outer ring / lagging tail). */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [useFinePointer, setUseFinePointer] = useState(false)
  const [visible, setVisible] = useState(false)
  const [pack, setPack] = useState<{ surface: CursorSurface; hover: boolean }>({
    surface: "light",
    hover: false,
  })

  useEffect(() => {
    setMounted(true)
    setUseFinePointer(typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches)
  }, [])

  useEffect(() => {
    if (!mounted || !useFinePointer) return
    document.documentElement.classList.add("apx-cursor-dot-active")
    return () => document.documentElement.classList.remove("apx-cursor-dot-active")
  }, [mounted, useFinePointer])

  useEffect(() => {
    const dot = dotRef.current
    if (!dot || !mounted || !useFinePointer) return

    const move = (e: MouseEvent) => {
      const target = e.target instanceof Element ? e.target : null
      if (!target) return

      const surface = getSurface(target, e.clientX, e.clientY)
      const hover = isInteractiveTarget(target)
      setPack({ surface, hover })

      // Instant follow — no lerp / trailing tail
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      setVisible(true)
    }

    const leave = () => setVisible(false)
    const enter = () => setVisible(true)

    document.addEventListener("mousemove", move, { passive: true })
    document.addEventListener("mouseleave", leave)
    document.addEventListener("mouseenter", enter)

    return () => {
      document.removeEventListener("mousemove", move)
      document.removeEventListener("mouseleave", leave)
      document.removeEventListener("mouseenter", enter)
    }
  }, [mounted, useFinePointer])

  if (!mounted || !useFinePointer) return null

  const { surface, hover } = pack
  const surfaceClass =
    surface === "dark"
      ? "apx-cursor-dot--surface-dark"
      : surface === "image"
        ? "apx-cursor-dot--surface-image"
        : "apx-cursor-dot--surface-light"

  return createPortal(
    <div
      className={`apx-cursor-dot${hover ? " apx-cursor-dot--hover" : ""} ${surfaceClass}`}
      aria-hidden
      hidden={!visible}
      style={{ opacity: visible ? 1 : 0 }}
      data-surface={surface}
    >
      <div ref={dotRef} className="apx-cursor-dot__core" />
    </div>,
    document.body
  )
}
