"use client"

import { useTheme } from "@/contexts/ThemeContext"

/**
 * Fixed full-viewport layer above the hero video.
 * Transparent at top (hero – video shows through), feathers to solid theme color
 * toward the bottom. As you scroll, the solid part covers the video so it fades out.
 */
export default function HeroVideoOverlay() {
  const { theme } = useTheme()
  const color = theme === "light" ? "white" : "black"
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        background: `linear-gradient(to bottom, transparent 0%, transparent 35%, ${color} 70%, ${color} 100%)`,
      }}
      aria-hidden
    />
  )
}
