"use client"

import { createContext, useContext, useEffect, type ReactNode } from "react"

/**
 * Homepage type system (extend sitewide later):
 * - Titles / menu: Teko
 * - Paragraphs / items / buttons: Oxanium
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

const TITLE_FAMILY = 'var(--font-teko), "Teko", sans-serif'
const BODY_FAMILY = 'var(--font-oxanium), "Oxanium", sans-serif'

export function TitleFontProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.style.setProperty("--font-title", TITLE_FAMILY)
    document.documentElement.style.setProperty("--font-subtitle", BODY_FAMILY)
    document.documentElement.style.setProperty("--font-body", BODY_FAMILY)
    document.documentElement.style.setProperty("--font-menu", TITLE_FAMILY)
  }, [])

  return (
    <TitleFontContext.Provider value={{ titleFontFamily: TITLE_FAMILY }}>
      {children}
    </TitleFontContext.Provider>
  )
}
