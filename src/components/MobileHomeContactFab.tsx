"use client"

import Image from "next/image"
import { useState, useCallback, useEffect } from "react"
import { Phone, Mail, X } from "lucide-react"

type Props = {
  logoSrc: string
  logoAlt: string
  phoneDisplay: string
  phoneHref: string
  email: string
}

export function MobileHomeContactFab({ logoSrc, logoAlt, phoneDisplay, phoneHref, email }: Props) {
  const [open, setOpen] = useState(false)

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, close])

  return (
    <>
      <button
        type="button"
        className="md:hidden fixed right-6 z-[9990] flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-black shadow-[0_4px_12px_rgba(0,0,0,0.35)] transition-[transform,background-color] hover:bg-[#111] active:scale-95 focus-visible:outline focus-visible:ring-2 focus-visible:ring-white/60"
        style={{ bottom: "calc(6rem + env(safe-area-inset-bottom, 0px))" }}
        aria-label="Open quick contact"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <Image src={logoSrc} alt={logoAlt} width={44} height={44} className="h-9 w-9 object-contain" />
      </button>

      {open && (
        <>
          <div
            className="md:hidden fixed inset-0 z-[9995] bg-black/65 backdrop-blur-sm"
            aria-hidden
            onClick={close}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-home-contact-title"
            className="md:hidden fixed left-1/2 top-1/2 z-[9996] w-[min(calc(100vw-2rem),20rem)] -translate-x-1/2 -translate-y-1/2 rounded-tl-2xl rounded-br-2xl border-2 border-white bg-black p-6 text-white shadow-xl"
          >
            <div className="mb-5 flex items-start justify-between gap-3">
              <h2 id="mobile-home-contact-title" className="text-lg font-bold leading-tight">
                Quick contact
              </h2>
              <button
                type="button"
                onClick={close}
                className="shrink-0 rounded-full border border-white p-2 hover:bg-white/10"
                aria-label="Close"
              >
                <X className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href={phoneHref}
                className="flex items-center gap-3 rounded-xl border border-white/25 bg-white/5 px-4 py-3.5 transition-colors hover:bg-white/10 active:bg-white/15"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/35 bg-black">
                  <Phone className="h-5 w-5 text-white" strokeWidth={1.5} />
                </span>
                <span className="text-sm font-semibold">{phoneDisplay}</span>
              </a>
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 rounded-xl border border-white/25 bg-white/5 px-4 py-3.5 transition-colors hover:bg-white/10 active:bg-white/15"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/35 bg-black">
                  <Mail className="h-5 w-5 text-white" strokeWidth={1.5} />
                </span>
                <span className="break-all text-sm font-semibold">{email}</span>
              </a>
            </div>
          </div>
        </>
      )}
    </>
  )
}
