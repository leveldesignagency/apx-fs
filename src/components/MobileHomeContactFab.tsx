"use client"

import Image from "next/image"
import { useState, useCallback, useEffect } from "react"
import { createPortal } from "react-dom"
import { Phone, Mail } from "lucide-react"

type Props = {
  logoSrc: string
  logoAlt: string
  phoneDisplay: string
  phoneHref: string
  email: string
}

const OVERLAY_Z = 9994

/**
 * Mobile-only: floating contact trigger (square, black, white border, brand mark) + bottom sheet.
 * Dismiss: tap backdrop or Escape.
 */
export function MobileHomeContactFab({ logoSrc, logoAlt, phoneDisplay, phoneHref, email }: Props) {
  const [open, setOpen] = useState(false)
  const [portalReady, setPortalReady] = useState(false)

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    setPortalReady(true)
  }, [])

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
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        className="apx-mobile-contact-fab md:hidden fixed right-6 z-[9990] flex h-14 w-14 shrink-0 items-center justify-center rounded-none border-2 border-white bg-black p-2 shadow-[0_4px_24px_rgba(0,0,0,0.45)] transition-[transform,box-shadow] active:scale-[0.98] hover:shadow-[0_6px_28px_rgba(0,0,0,0.5)]"
        style={{ bottom: "calc(6rem + env(safe-area-inset-bottom, 0px))" }}
        aria-label="Open contact"
        aria-controls={open ? "fs-site-contact-sheet" : undefined}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <Image
          src={logoSrc}
          alt={logoAlt}
          width={40}
          height={40}
          className="h-9 w-9 object-contain"
        />
      </button>

      {open && portalReady
        ? createPortal(
            <div
              className="md:hidden"
              id="fs-site-contact-sheet"
              style={{ zIndex: OVERLAY_Z, position: "fixed", inset: 0 }}
            >
              <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={close}
                aria-hidden
              />
              <div
                className="pointer-events-none absolute bottom-0 left-0 right-0 flex justify-center px-4"
                style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom, 0px))" }}
              >
                <div className="pointer-events-auto w-full">
                  <div
                    role="dialog"
                    aria-modal="true"
                    aria-label="Contact"
                    className="flex w-full items-center justify-center gap-6 rounded-2xl border-2 border-white/40 bg-zinc-950/95 px-5 py-5 text-white shadow-2xl backdrop-blur-2xl"
                    style={{ backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
                  >
                    <a
                      href={phoneHref}
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-none border-2 border-white/50 bg-black transition-colors active:bg-zinc-900 hover:bg-zinc-900"
                      aria-label={`Call ${phoneDisplay}`}
                    >
                      <Phone className="h-6 w-6 text-white" strokeWidth={1.5} />
                    </a>
                    <a
                      href={`mailto:${email}`}
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-none border-2 border-white/50 bg-black transition-colors active:bg-zinc-900 hover:bg-zinc-900"
                      aria-label={`Email ${email}`}
                    >
                      <Mail className="h-6 w-6 text-white" strokeWidth={1.5} />
                    </a>
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  )
}
