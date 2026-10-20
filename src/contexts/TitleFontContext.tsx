"use client"

import { createContext, useContext, useEffect, type ReactNode } from "react"

/**
 * Locks the title face to Plus Jakarta Sans from next/font (see layout.tsx).
 * Avoids runtime Google Fonts injection of dozens of alternate families.
 */
interface TitleFontContextType {
  titleFontFamily: string
}

const TitleFontContext = createContext<TitleFontContextType | undefined>(undefined)

export const useTitleFont = () => {
  const ctx = useContext(TitleFontContext)
  if (ctx === undefined) throw new Error("useTitleFont must be used within TitleFontProvider")
  return ctx
}

const TITLE_FAMILY = "var(--font-jakarta), \"Plus Jakarta Sans\", sans-serif"

export function TitleFontProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.style.setProperty("--font-title", TITLE_FAMILY)
  }, [])

  return (
    <TitleFontContext.Provider value={{ titleFontFamily: TITLE_FAMILY }}>
      {children}
    </TitleFontContext.Provider>
  )
}
