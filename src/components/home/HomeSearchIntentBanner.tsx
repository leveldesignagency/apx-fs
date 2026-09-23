"use client"

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Search, X, ArrowUpRight } from "lucide-react"
import { searchFsHomeOfferings, type FsHomeSearchEntry } from "@/data/fsHomeSearchIndex"
import {
  FS_HOME_SEARCH_OPEN_EVENT,
  hasDismissedHomeSearch,
  markHomeSearchDismissed,
} from "@/lib/fsHomeSearchUi"
import { queueSearchAnchorFlash, requestSearchAnchorFlash } from "@/components/home/SearchAnchorFlash"
import { cn } from "@/lib/utils"

const HERO_IMAGE = "/service%20images/cctv%20/hero-commercial-cctv-system-installation.jpg"

type Props = {
  /** Delay before the auto banner appears on the homepage (ms). */
  appearDelayMs?: number
}

export function HomeSearchIntentBanner({ appearDelayMs = 700 }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const titleId = useId()
  const inputId = useId()
  const listId = useId()
  const inputRef = useRef<HTMLInputElement>(null)

  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [activeIndex, setActiveIndex] = useState(0)
  const [entered, setEntered] = useState(false)

  const results = useMemo(() => searchFsHomeOfferings(query, 7), [query])
  const hasQuery = query.trim().length > 0
  const selected = results[activeIndex] ?? null

  const dismiss = useCallback(() => {
    markHomeSearchDismissed()
    setEntered(false)
    window.setTimeout(() => {
      setOpen(false)
      setQuery("")
      setActiveIndex(0)
    }, 220)
  }, [])

  const openBanner = useCallback(() => {
    setQuery("")
    setActiveIndex(0)
    setOpen(true)
  }, [])

  const goTo = useCallback(
    (entry: FsHomeSearchEntry) => {
      markHomeSearchDismissed()
      setEntered(false)
      const hashIdx = entry.href.indexOf("#")
      const path = hashIdx >= 0 ? entry.href.slice(0, hashIdx) : entry.href
      const hash = hashIdx >= 0 ? entry.href.slice(hashIdx + 1) : ""
      const current = pathname.replace(/\/$/, "") || "/"
      const target = path.replace(/\/$/, "") || "/"
      if (hash) {
        queueSearchAnchorFlash(hash)
      }
      window.setTimeout(() => {
        setOpen(false)
        setQuery("")
        setActiveIndex(0)
        // scroll: false so Next does not jump to top and cancel Lenis card scroll
        router.push(path, { scroll: false })
        if (hash && current === target) {
          requestSearchAnchorFlash()
        }
      }, 160)
    },
    [pathname, router]
  )

  // Auto-show once per session on the homepage only
  useEffect(() => {
    if (pathname !== "/") return
    if (hasDismissedHomeSearch()) return
    const t = window.setTimeout(() => setOpen(true), appearDelayMs)
    return () => window.clearTimeout(t)
  }, [appearDelayMs, pathname])

  // Header (and anywhere) can reopen at any time
  useEffect(() => {
    const onOpen = () => openBanner()
    window.addEventListener(FS_HOME_SEARCH_OPEN_EVENT, onOpen)
    return () => window.removeEventListener(FS_HOME_SEARCH_OPEN_EVENT, onOpen)
  }, [openBanner])

  useEffect(() => {
    if (!open) return
    const raf = requestAnimationFrame(() => setEntered(true))
    const focusT = window.setTimeout(() => inputRef.current?.focus(), 380)
    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(focusT)
    }
  }, [open])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        dismiss()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, dismiss])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  if (!open) return null

  return (
    <div
      className={cn(
        "home-search-intent fixed inset-0 z-[220] flex items-center justify-center p-4 sm:p-6",
        entered ? "home-search-intent--entered" : ""
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div
        className="home-search-intent__backdrop absolute inset-0 cursor-default"
        aria-hidden
        onClick={dismiss}
      />

      <div className="home-search-intent__card relative z-[1] flex w-full max-w-[min(100%,26rem)] flex-col overflow-hidden sm:max-w-[28rem]">
        <div className="relative isolate min-h-[11.5rem] shrink-0 sm:min-h-[13rem]">
          <Image
            src={HERO_IMAGE}
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="28rem"
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(160deg,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0.55)_45%,rgba(0,0,0,0.92)_100%)]"
            aria-hidden
          />
          <button
            type="button"
            onClick={dismiss}
            className="home-search-intent__close absolute right-3 top-3 z-[2] inline-flex h-9 w-9 items-center justify-center rounded-full"
            aria-label="Close"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
          <div className="relative z-[1] flex h-full flex-col justify-end px-5 pb-5 pt-14 sm:px-6 sm:pb-6">
            <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/65">
              APX Fire &amp; Security
            </p>
            <h2
              id={titleId}
              className="font-title text-[1.65rem] font-bold leading-[1.08] tracking-tight text-white sm:text-[1.85rem]"
              style={{ textTransform: "none" }}
            >
              What are you
              <br />
              searching for?
            </h2>
          </div>
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-b from-transparent to-black/80"
            aria-hidden
          />
        </div>

        <div className="home-search-intent__glass relative flex flex-1 flex-col gap-4 px-5 py-5 sm:px-6 sm:py-6">
          <div className="relative">
            <label htmlFor={inputId} className="sr-only">
              Search services
            </label>
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45"
              strokeWidth={2}
              aria-hidden
            />
            <input
              ref={inputRef}
              id={inputId}
              type="search"
              autoComplete="off"
              spellCheck={false}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault()
                  if (!results.length) return
                  setActiveIndex((i) => (i + 1) % results.length)
                } else if (e.key === "ArrowUp") {
                  e.preventDefault()
                  if (!results.length) return
                  setActiveIndex((i) => (i - 1 + results.length) % results.length)
                } else if (e.key === "Enter") {
                  e.preventDefault()
                  if (selected) goTo(selected)
                }
              }}
              placeholder="Search..."
              className="home-search-intent__input w-full rounded-full border border-white/40 bg-black/55 py-3 pl-10 pr-4 text-[0.95rem] text-white outline-none placeholder:text-white/40 transition-[border-color,box-shadow] focus:border-white/70 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.08)]"
              aria-controls={listId}
              aria-autocomplete="list"
              aria-expanded={hasQuery}
            />
          </div>

          {hasQuery ? (
            <div
              id={listId}
              role="listbox"
              aria-label="Suggested services"
              className="home-search-intent__results max-h-[13.5rem] overflow-y-auto rounded-2xl border border-white/25 bg-black/70 p-1.5"
            >
              {results.length === 0 ? (
                <p className="px-3 py-3 text-sm text-white/55">
                  No matching APX services. Try CCTV, fire alarm, access, gates...
                </p>
              ) : (
                <ul className="m-0 list-none p-0">
                  {results.map((item, i) => {
                    const active = i === activeIndex
                    return (
                      <li key={item.id} role="option" aria-selected={active}>
                        <button
                          type="button"
                          onMouseEnter={() => setActiveIndex(i)}
                          onClick={() => goTo(item)}
                          className={cn(
                            "home-search-intent__result flex w-full items-start gap-2 rounded-xl px-3 py-2.5 text-left transition-colors",
                            active && "home-search-intent__result--active"
                          )}
                        >
                          <span className="min-w-0 flex-1">
                            <span className="home-search-intent__result-title block text-sm font-semibold leading-snug">
                              {item.title}
                            </span>
                            {item.parentLabel ? (
                              <span className="home-search-intent__result-parent mt-0.5 block text-[0.7rem] uppercase tracking-[0.12em]">
                                {item.parentLabel}
                              </span>
                            ) : null}
                          </span>
                          <ArrowUpRight
                            className="home-search-intent__result-icon mt-0.5 h-4 w-4 shrink-0"
                            strokeWidth={2}
                            aria-hidden
                          />
                        </button>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          ) : null}

          <div className="mt-auto flex justify-center pt-1">
            <button
              type="button"
              disabled={!selected}
              onClick={() => selected && goTo(selected)}
              className={cn(
                "home-search-intent__go inline-flex items-center justify-center rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors",
                selected
                  ? "home-search-intent__go--ready"
                  : "cursor-not-allowed border-white/25 text-white/35"
              )}
            >
              Go to page
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
