"use client"

import { useTitleFont, TITLE_FONTS, getGoogleFontsUrl } from "@/contexts/TitleFontContext"
import { useTheme } from "@/contexts/ThemeContext"
import { useMemo } from "react"

const CAMEL_CASE_SAMPLES = [
  "APX Mep Services",
  "Why Choose Us",
  "Ready To Get Started",
  "Mechanical & Electrical",
]

export default function FontSection() {
  const { titleFontKey, setTitleFont, fonts } = useTitleFont()
  const { theme } = useTheme()

  const fontStyles = useMemo(() => {
    return TITLE_FONTS.map((f) => ({
      key: f.key,
      fontFamily: `${f.family}, sans-serif`,
      fontWeight: f.weight,
    }))
  }, [])

  const isDark = theme === "dark"

  return (
    <section
      id="title-font-picker"
      className={`py-16 ${isDark ? "bg-gray-900" : "bg-gray-100"}`}
    >
      <div className="container mx-auto px-6">
        <h2 className={`text-4xl md:text-5xl font-bold mb-2 font-title ${isDark ? "text-white" : "text-black"}`}>
          Choose Title Font
        </h2>
        <p className={`text-xl md:text-2xl mb-10 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
          Select a font for titles across the site. Preview shows camel case. Your choice is saved.
        </p>

        <link rel="stylesheet" href={getGoogleFontsUrl(TITLE_FONTS)} />

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 list-none p-0 m-0">
          {fonts.map((font, i) => {
            const style = fontStyles[i]
            const isSelected = titleFontKey === font.key
            return (
              <li key={font.key}>
                <button
                  type="button"
                  onClick={() => setTitleFont(font.key)}
                  className={`w-full text-left px-5 py-5 rounded-xl border-2 transition-all duration-200
                    ${isDark
                      ? "bg-gray-800 border-gray-600 hover:border-gray-500 text-white"
                      : "bg-white border-gray-300 text-black hover:border-gray-500"}
                    ${isSelected ? (isDark ? "!border-white !ring-2 !ring-white/20" : "!border-black !ring-2 !ring-black/20") : ""}`}
                >
                  <div
                    className="text-xl md:text-2xl lg:text-3xl leading-tight"
                    style={{
                      fontFamily: style.fontFamily,
                      fontWeight: style.fontWeight,
                      color: isDark ? "white" : "black",
                    }}
                  >
                    {CAMEL_CASE_SAMPLES.map((line, j) => (
                      <div key={j} className="truncate">
                        {line}
                      </div>
                    ))}
                  </div>
                  <div className={`text-sm mt-3 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    {font.name}
                    {isSelected && " ✓"}
                  </div>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
