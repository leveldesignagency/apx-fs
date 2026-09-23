"use client"

import { useEffect, useId, useMemo, useRef, useState, type CSSProperties } from "react"
import { containDropdownWheelScroll } from "@/lib/containDropdownWheelScroll"
import { cn } from "@/lib/utils"

export type ServiceComboboxOption = {
  value: string
  label: string
}

type ServiceComboboxProps = {
  id?: string
  name?: string
  options: readonly ServiceComboboxOption[]
  /** Selected option value (slug) or free-typed text when no match. */
  value: string
  onChange: (value: string) => void
  /** Called when open state changes (e.g. form shell overflow). */
  onOpenChange?: (open: boolean) => void
  placeholder?: string
  required?: boolean
  className?: string
  inputClassName?: string
  /** Extra class on the outer relative wrapper (e.g. services-dropdown-container). */
  containerClassName?: string
  /** Allow submitting text that is not in the list. Default true. */
  allowCustom?: boolean
  /** Clear / empty option label shown at top of list. Omit to hide. */
  emptyLabel?: string
}

function matchOption(
  options: readonly ServiceComboboxOption[],
  value: string
): ServiceComboboxOption | undefined {
  if (!value) return undefined
  return (
    options.find((o) => o.value === value) ??
    options.find((o) => o.label.toLowerCase() === value.toLowerCase())
  )
}

/**
 * Combobox: click/focus opens the list; typing filters options.
 * Selecting sets the option value; free text is kept when allowCustom.
 */
export function ServiceCombobox({
  id: idProp,
  name,
  options,
  value,
  onChange,
  onOpenChange,
  placeholder = "Select a service",
  required = false,
  className,
  inputClassName,
  containerClassName,
  allowCustom = true,
  emptyLabel,
}: ServiceComboboxProps) {
  const autoId = useId()
  const id = idProp ?? autoId
  const listId = `${id}-listbox`
  const rootRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const selected = matchOption(options, value)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState(selected?.label ?? (allowCustom && value ? value : ""))

  // Sync display when parent sets value (e.g. ?service= deep link)
  useEffect(() => {
    const next = matchOption(options, value)
    if (next) {
      setQuery(next.label)
      return
    }
    if (!value) {
      setQuery("")
      return
    }
    if (allowCustom) setQuery(value)
  }, [value, options, allowCustom])

  const setOpenState = (next: boolean) => {
    setOpen(next)
    onOpenChange?.(next)
  }

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node
      if (rootRef.current && !rootRef.current.contains(target)) {
        setOpenState(false)
        // Commit typed text on outside click
        const trimmed = query.trim()
        if (!trimmed) {
          onChange("")
          return
        }
        const byLabel = options.find((o) => o.label.toLowerCase() === trimmed.toLowerCase())
        if (byLabel) onChange(byLabel.value)
        else if (allowCustom) onChange(trimmed)
        else if (selected) setQuery(selected.label)
        else {
          setQuery("")
          onChange("")
        }
      }
    }
    document.addEventListener("mousedown", onPointerDown)
    return () => document.removeEventListener("mousedown", onPointerDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional: close handler uses latest query/options
  }, [open, query, options, allowCustom, selected, onChange])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return [...options]
    return options.filter(
      (o) => o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q)
    )
  }, [options, query])

  const commitSelection = (opt: ServiceComboboxOption | null) => {
    if (!opt) {
      setQuery("")
      onChange("")
      setOpenState(false)
      return
    }
    setQuery(opt.label)
    onChange(opt.value)
    setOpenState(false)
  }

  const onInputChange = (next: string) => {
    setQuery(next)
    setOpenState(true)
    const trimmed = next.trim()
    if (!trimmed) {
      onChange("")
      return
    }
    const byLabel = options.find((o) => o.label.toLowerCase() === trimmed.toLowerCase())
    if (byLabel) onChange(byLabel.value)
    else if (allowCustom) onChange(trimmed)
  }

  const submittedValue = selected?.value ?? (allowCustom ? query.trim() : value)

  return (
    <div ref={rootRef} className={cn("relative", containerClassName, className)}>
      <div className="relative">
        <input
          ref={inputRef}
          id={id}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          autoComplete="off"
          required={required}
          value={query}
          placeholder={placeholder}
          onChange={(e) => onInputChange(e.target.value)}
          onFocus={() => setOpenState(true)}
          onClick={() => setOpenState(true)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setOpenState(false)
              inputRef.current?.blur()
            }
            if (e.key === "ArrowDown") {
              e.preventDefault()
              setOpenState(true)
            }
            if (e.key === "Enter" && open && filtered.length === 1) {
              e.preventDefault()
              commitSelection(filtered[0]!)
            }
          }}
          className={cn(
            "quote-form-field quote-form-dropdown w-full rounded-none border border-white/15 bg-black py-3.5 pl-4 pr-12 text-left text-[17px] font-bold text-white outline-none transition-[border,box-shadow] placeholder:font-normal placeholder:text-white/40 focus:border-white/50 focus:bg-black focus:ring-0",
            inputClassName
          )}
        />
        <button
          type="button"
          tabIndex={-1}
          aria-label={open ? "Close service list" : "Open service list"}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-white/60 transition-colors hover:text-white"
          onClick={() => {
            const next = !open
            setOpenState(next)
            if (next) inputRef.current?.focus()
          }}
        >
          <svg
            className="h-5 w-5 shrink-0 transition-transform duration-200"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" } as CSSProperties}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {name ? <input type="hidden" name={name} value={submittedValue} /> : null}

      {open && (
        <div
          id={listId}
          role="listbox"
          className="quote-form-dropdown-menu absolute left-0 right-0 top-full z-50 mt-2 max-h-60 overflow-y-auto overscroll-contain rounded-none border border-white/12 bg-zinc-950 py-2 shadow-2xl"
          data-lenis-prevent
          onWheel={containDropdownWheelScroll}
        >
          {emptyLabel ? (
            <button
              type="button"
              role="option"
              className="quote-form-dropdown-item block w-full px-4 py-3 text-left text-[17px] font-bold text-white/90 transition-colors hover:bg-white/10"
              onClick={() => commitSelection(null)}
            >
              {emptyLabel}
            </button>
          ) : null}
          {filtered.length === 0 ? (
            <p className="px-4 py-3 text-sm font-semibold text-white/50">
              {allowCustom ? "No matches - keep typing to use a custom service" : "No matching services"}
            </p>
          ) : (
            filtered.map((opt) => (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={opt.value === selected?.value}
                className="quote-form-dropdown-item block w-full px-4 py-3 text-left text-[17px] font-bold text-white transition-colors hover:bg-white/10"
                onClick={() => commitSelection(opt)}
              >
                {opt.label}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}
