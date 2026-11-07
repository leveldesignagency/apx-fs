"use client"

import { useEffect, useRef } from "react"

const UNDERLAY_PHOTO = "/accredited-apx-fs.jpg"

function measureCmPx(): number {
  const probe = document.createElement("div")
  probe.style.cssText =
    "position:absolute;left:-9999px;top:0;width:1cm;height:1cm;pointer-events:none"
  document.body.appendChild(probe)
  const px = probe.offsetWidth || 37.8
  probe.remove()
  return px
}

function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function hash2(col: number, row: number) {
  let h = (col * 374761393 + row * 668265263) >>> 0
  h = Math.imul(h ^ (h >>> 13), 1274126177) >>> 0
  return (h >>> 0) / 4294967296
}

/**
 * Downward triangle of cm squares dissolving into transparency.
 * Photo underlay sits behind so missing cells cut through even over Trusted.
 */
export function HomeSectionGridBead() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef({
    cell: 38,
    cols: 0,
    rows: 0,
    gridW: 0,
    gridH: 0,
    on: new Uint8Array(0),
    base: new Uint8Array(0),
    scrollPhase: 0,
    reduceMotion: false,
  })

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const state = stateRef.current
    state.reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let frame = 0

    // Clear downward triangle (wide top -> tip bottom), majority of the field
    const inTriangle = (col: number, row: number) => {
      const { cols, rows } = state
      if (rows <= 1) return true
      const t = row / (rows - 1)
      const fillRatio = 1 - t * 0.88
      const half = Math.max(0.75, (cols * fillRatio) / 2)
      const cx = (cols - 1) / 2
      return Math.abs(col - cx) <= half
    }

    // Inside triangle: nearly solid at top, crumbs toward the tip
    const keepChance = (row: number) => {
      const { rows } = state
      if (rows <= 1) return 1
      const t = row / (rows - 1)
      if (t < 0.22) return 0.99
      const u = (t - 0.22) / 0.78
      const fall = u * u
      return Math.max(0.04, 0.97 * (1 - fall) * (1 - fall * 0.4))
    }

    const rebuildBase = () => {
      const { cols, rows } = state
      const n = cols * rows
      state.base = new Uint8Array(n)
      state.on = new Uint8Array(n)
      for (let row = 0; row < rows; row++) {
        const keep = keepChance(row)
        for (let col = 0; col < cols; col++) {
          const idx = row * cols + col
          if (!inTriangle(col, row)) {
            state.base[idx] = 0
            state.on[idx] = 0
            continue
          }
          const filled = hash2(col, row + 17) < keep ? 1 : 0
          state.base[idx] = filled
          state.on[idx] = filled
        }
      }
    }

    const paint = () => {
      const { cell, cols, rows, on, gridW, gridH } = state
      ctx.clearRect(0, 0, gridW, gridH)

      // White squares only -- gaps stay clear so the photo underlay shows through
      const inset = Math.max(0.8, cell * 0.045)
      ctx.fillStyle = "#ffffff"
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          if (on[row * cols + col] !== 1) continue
          ctx.fillRect(
            col * cell + inset,
            row * cell + inset,
            cell - inset * 2,
            cell - inset * 2
          )
        }
      }

      // Thin grid over the whole field (reads in the transparent gaps too)
      const lineW = Math.max(1, cell * 0.028)
      ctx.lineWidth = lineW
      ctx.strokeStyle = "rgba(0,0,0,0.16)"
      ctx.beginPath()
      for (let c = 0; c <= cols; c++) {
        const x = c * cell + 0.5
        ctx.moveTo(x, 0)
        ctx.lineTo(x, gridH)
      }
      for (let r = 0; r <= rows; r++) {
        const y = r * cell + 0.5
        ctx.moveTo(0, y)
        ctx.lineTo(gridW, y)
      }
      ctx.stroke()
    }

    const resize = () => {
      state.cell = measureCmPx()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const availW = wrap.clientWidth
      const availH = wrap.clientHeight

      const nextCols = Math.max(1, Math.floor(availW / state.cell))
      const nextRows = Math.max(1, Math.floor(availH / state.cell))
      const changed = nextCols !== state.cols || nextRows !== state.rows

      state.cols = nextCols
      state.rows = nextRows
      state.gridW = state.cols * state.cell
      state.gridH = state.rows * state.cell

      canvas.width = Math.max(1, Math.floor(state.gridW * dpr))
      canvas.height = Math.max(1, Math.floor(state.gridH * dpr))
      canvas.style.width = `${state.gridW}px`
      canvas.style.height = `${state.gridH}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      if (changed || state.base.length !== state.cols * state.rows) {
        rebuildBase()
      }
      paint()
    }

    const flickerFromScroll = () => {
      if (state.reduceMotion) return
      const { cols, rows, on, base } = state
      const phase = Math.floor(window.scrollY / 18)
      if (phase === state.scrollPhase) return
      state.scrollPhase = phase

      const rand = mulberry32((phase * 2654435761) >>> 0)
      const touches = Math.max(5, Math.floor(cols * rows * 0.018))

      // Spark only in empty cells (outside triangle or missing crumbs)
      for (let n = 0; n < touches; n++) {
        const col = Math.floor(rand() * cols)
        const row = Math.floor(rand() * rows)
        const idx = row * cols + col
        if (base[idx] === 1) {
          on[idx] = 1
          continue
        }
        on[idx] = rand() > 0.6 ? 1 : 0
      }
      paint()
    }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        flickerFromScroll()
      })
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      ro.disconnect()
      window.removeEventListener("scroll", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div ref={wrapRef} className="home-section-grid-bead" aria-hidden>
      {/* Same photo as Accreditations -- holes cut through to this */}
      <div
        className="home-section-grid-bead__photo"
        style={{ backgroundImage: `url("${UNDERLAY_PHOTO}")` }}
      />
      <div className="home-section-grid-bead__photo-dim" />
      <canvas ref={canvasRef} className="home-section-grid-bead__canvas" />
    </div>
  )
}
