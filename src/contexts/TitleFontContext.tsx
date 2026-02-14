"use client"

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react"

export const TITLE_FONTS = [
  { key: "outfit", name: "Outfit", family: "Outfit", weight: "800" },
  { key: "bebas-neue", name: "Bebas Neue", family: "Bebas Neue", weight: "400" },
  { key: "oswald", name: "Oswald", family: "Oswald", weight: "700" },
  { key: "montserrat", name: "Montserrat", family: "Montserrat", weight: "800" },
  { key: "playfair-display", name: "Playfair Display", family: "Playfair Display", weight: "700" },
  { key: "archivo-black", name: "Archivo Black", family: "Archivo Black", weight: "400" },
  { key: "space-grotesk", name: "Space Grotesk", family: "Space Grotesk", weight: "700" },
  { key: "syne", name: "Syne", family: "Syne", weight: "800" },
  { key: "dm-sans", name: "DM Sans", family: "DM Sans", weight: "700" },
  { key: "libre-baskerville", name: "Libre Baskerville", family: "Libre Baskerville", weight: "700" },
  { key: "anton", name: "Anton", family: "Anton", weight: "400" },
  { key: "barlow-condensed", name: "Barlow Condensed", family: "Barlow Condensed", weight: "700" },
  { key: "poppins", name: "Poppins", family: "Poppins", weight: "700" },
  { key: "manrope", name: "Manrope", family: "Manrope", weight: "800" },
  { key: "raleway", name: "Raleway", family: "Raleway", weight: "700" },
  { key: "inter", name: "Inter", family: "Inter", weight: "800" },
  { key: "roboto", name: "Roboto", family: "Roboto", weight: "700" },
  { key: "open-sans", name: "Open Sans", family: "Open Sans", weight: "700" },
  { key: "lato", name: "Lato", family: "Lato", weight: "700" },
  { key: "work-sans", name: "Work Sans", family: "Work Sans", weight: "700" },
  { key: "nunito", name: "Nunito", family: "Nunito", weight: "800" },
  { key: "rubik", name: "Rubik", family: "Rubik", weight: "700" },
  { key: "source-sans-3", name: "Source Sans 3", family: "Source Sans 3", weight: "700" },
  { key: "lexend", name: "Lexend", family: "Lexend", weight: "700" },
  { key: "sora", name: "Sora", family: "Sora", weight: "700" },
  { key: "plus-jakarta-sans", name: "Plus Jakarta Sans", family: "Plus Jakarta Sans", weight: "700" },
  { key: "figtree", name: "Figtree", family: "Figtree", weight: "700" },
  { key: "urbanist", name: "Urbanist", family: "Urbanist", weight: "700" },
  { key: "league-spartan", name: "League Spartan", family: "League Spartan", weight: "700" },
  { key: "kanit", name: "Kanit", family: "Kanit", weight: "700" },
] as const

export type TitleFontKey = (typeof TITLE_FONTS)[number]["key"]

function getFontByKey(key: string) {
  return TITLE_FONTS.find((f) => f.key === key) ?? TITLE_FONTS[0]
}

function getGoogleFontsUrl(fonts: typeof TITLE_FONTS) {
  const families = fonts
    .map((f) => `${f.family.replace(/ /g, "+")}:wght@${f.weight}`)
    .join("&family=")
  return `https://fonts.googleapis.com/css2?family=${families}&display=swap`
}

interface TitleFontContextType {
  titleFontKey: TitleFontKey
  titleFontFamily: string
  setTitleFont: (key: TitleFontKey) => void
  fonts: typeof TITLE_FONTS
}

const TitleFontContext = createContext<TitleFontContextType | undefined>(undefined)

export const useTitleFont = () => {
  const ctx = useContext(TitleFontContext)
  if (ctx === undefined) throw new Error("useTitleFont must be used within TitleFontProvider")
  return ctx
}

const STORAGE_KEY = "apx-title-font"

interface TitleFontProviderProps {
  children: ReactNode
}

export const TitleFontProvider = ({ children }: TitleFontProviderProps) => {
  const [titleFontKey, setTitleFontKeyState] = useState<TitleFontKey>("plus-jakarta-sans")
  const font = getFontByKey(titleFontKey)
  const titleFontFamily = `${font.family}, sans-serif`

  const setTitleFont = useCallback((key: TitleFontKey) => {
    setTitleFontKeyState(key)
    if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, key)
  }, [])

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as TitleFontKey | null
    if (stored && TITLE_FONTS.some((f) => f.key === stored)) setTitleFontKeyState(stored)
  }, [])

  useEffect(() => {
    document.documentElement.style.setProperty("--font-title", titleFontFamily)
  }, [titleFontFamily])

  useEffect(() => {
    const googleFontUrl = `https://fonts.googleapis.com/css2?family=${font.family.replace(/ /g, "+")}:wght@${font.weight}&display=swap`
    const id = "apx-title-font-link"
    let link = document.getElementById(id) as HTMLLinkElement | null
    if (!link) {
      link = document.createElement("link")
      link.id = id
      link.rel = "stylesheet"
      document.head.appendChild(link)
    }
    link.href = googleFontUrl
  }, [font.family, font.weight])

  return (
    <TitleFontContext.Provider
      value={{
        titleFontKey,
        titleFontFamily,
        setTitleFont,
        fonts: TITLE_FONTS,
      }}
    >
      {children}
    </TitleFontContext.Provider>
  )
}

export { getGoogleFontsUrl }
