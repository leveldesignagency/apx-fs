"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { Phone, Mail, Headset } from "lucide-react"

type Props = {
  phoneDisplay: string
  phoneHref: string
  email: string
}

/**
 * Mobile-only: circular contact FAB that morphs upward into a tall pill with phone + mail icons.
 * Dismiss: tap outside or Escape.
 */
export function MobileHomeContactFab({ phoneDisplay, phoneHref, email }: Props) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => setOpen(false), [])
  const toggle = useCallback(() => setOpen((v) => !v), [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, close])

  useEffect(() => {
    if (!open) return
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close()
    }
    document.addEventListener("pointerdown", onPointer)
    return () => document.removeEventListener("pointerdown", onPointer)
  }, [open, close])

  return (
    <div
      ref={rootRef}
      className="apx-mobile-contact-fab-root md:hidden fixed right-6 z-[9990]"
      style={{ bottom: "calc(6rem + env(safe-area-inset-bottom, 0px))" }}
    >
      <div
        className={[
          "apx-mobile-contact-fab relative flex w-11 flex-col items-center justify-center overflow-hidden border-2 border-white bg-black shadow-[0_4px_24px_rgba(0,0,0,0.45)]",
          "origin-bottom transition-[height,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "h-[7.25rem] rounded-full" : "h-11 rounded-full active:scale-[0.98]",
        ].join(" ")}
        role={open ? "dialog" : undefined}
        aria-label={open ? "Contact" : undefined}
        aria-modal={open ? true : undefined}
      >
        {/* Closed: headset trigger */}
        <button
          type="button"
          className={[
            "absolute inset-0 flex items-center justify-center text-white transition-opacity duration-200",
            open ? "pointer-events-none opacity-0" : "opacity-100",
          ].join(" ")}
          aria-label="Open contact"
          aria-expanded={open}
          aria-haspopup="dialog"
          onClick={toggle}
        >
          <Headset className="h-5 w-5" strokeWidth={1.75} aria-hidden />
        </button>

        {/* Open: icons stacked vertically inside the pill */}
        <div
          className={[
            "flex h-full w-full flex-col items-center justify-evenly py-1 transition-opacity duration-200",
            open ? "opacity-100 delay-75" : "pointer-events-none opacity-0",
          ].join(" ")}
          aria-hidden={!open}
        >
          <a
            href={phoneHref}
            className="flex h-10 w-10 items-center justify-center text-white transition-opacity active:opacity-70"
            aria-label={`Call ${phoneDisplay}`}
            tabIndex={open ? 0 : -1}
          >
            <Phone className="h-5 w-5" strokeWidth={1.75} />
          </a>
          <a
            href={`mailto:${email}`}
            className="flex h-10 w-10 items-center justify-center text-white transition-opacity active:opacity-70"
            aria-label={`Email ${email}`}
            tabIndex={open ? 0 : -1}
          >
            <Mail className="h-5 w-5" strokeWidth={1.75} />
          </a>
        </div>
      </div>
    </div>
  )
}
