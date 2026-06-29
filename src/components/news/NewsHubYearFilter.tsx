"use client"

import { useEffect, useId, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"

type NewsHubYearFilterProps = {
  years: string[]
  value: string
  onChange: (year: string) => void
}

export function NewsHubYearFilter({ years, value, onChange }: NewsHubYearFilterProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const labelId = useId()
  const listboxId = useId()

  const displayLabel = value === "all" ? "All years" : value

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }

    document.addEventListener("mousedown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("mousedown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  const selectYear = (year: string) => {
    onChange(year)
    setOpen(false)
  }

  const options = [{ value: "all", label: "All years" }, ...years.map((y) => ({ value: y, label: y }))]

  return (
    <div ref={rootRef} className="news-hub__year-filter relative">
      <div className="flex items-center justify-end gap-3">
        <span id={labelId} className="news-hub__year-filter-label shrink-0">
          Year
        </span>
        <div className="relative w-[10.75rem] shrink-0">
          <button
            type="button"
            id="news-year-filter"
            className="news-hub__year-trigger flex w-full items-center justify-between gap-3 border-2 border-black bg-white px-3.5 py-2.5 text-left text-sm font-semibold text-black outline-none transition-[border-color,box-shadow] focus-visible:ring-2 focus-visible:ring-black/20"
            aria-label={`Year, ${displayLabel}`}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={listboxId}
            onClick={() => setOpen((prev) => !prev)}
          >
            <span>{displayLabel}</span>
            <ChevronDown
              className={`h-4 w-4 shrink-0 text-black/55 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
              aria-hidden
            />
          </button>

          {open && (
            <ul
              id={listboxId}
              role="listbox"
              aria-labelledby={labelId}
              className="news-hub__year-menu absolute left-0 top-[calc(100%+0.375rem)] z-[60] w-full max-h-60 overflow-y-auto overscroll-contain border-2 border-black bg-white shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
              data-lenis-prevent
            >
              {options.map((option) => {
                const selected = value === option.value
                return (
                  <li key={option.value} role="none">
                    <button
                      type="button"
                      role="option"
                      aria-selected={selected}
                      className={`news-hub__year-option px-3.5 py-2.5 text-left text-sm font-semibold ${
                        selected ? "news-hub__year-option--selected" : ""
                      }`}
                      onClick={() => selectYear(option.value)}
                    >
                      {option.label}
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
