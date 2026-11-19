"use client"

import { useEffect, useRef, useState } from "react"
import { FS_PHONE_DISPLAY, FS_PHONE_HREF } from "@/components/ui/CallPhoneCta"

export const CONTACT_EMAIL = "enquiries@apx-fs.co.uk"

export function isTouchLikeDevice() {
  if (typeof window === "undefined") return false
  return window.matchMedia("(hover: none), (pointer: coarse)").matches
}

type ContactCopyCallPopupProps = {
  kind: "email" | "phone"
  onClose: () => void
}

/**
 * Desktop copy / open modal used by contact methods and inline phone links.
 * Touch devices should dial or mailto directly instead of opening this.
 */
export function ContactCopyCallPopup({ kind, onClose }: ContactCopyCallPopupProps) {
  const [copied, setCopied] = useState(false)
  const copiedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const value = kind === "email" ? CONTACT_EMAIL : FS_PHONE_DISPLAY

  const copyValue = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current)
      copiedTimerRef.current = setTimeout(() => setCopied(false), 2200)
    } catch {
      /* ignore */
    }
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    void navigator.clipboard.writeText(value).then(
      () => {
        setCopied(true)
        if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current)
        copiedTimerRef.current = setTimeout(() => setCopied(false), 2200)
      },
      () => {
        /* ignore clipboard errors */
      }
    )
    return () => {
      window.removeEventListener("keydown", onKey)
      if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current)
    }
  }, [onClose, value])

  return (
    <div
      className="contact-email-popup"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-email-popup-title"
    >
      <button
        type="button"
        className="contact-email-popup__backdrop"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="contact-email-popup__card">
        <p id="contact-email-popup-title" className="contact-email-popup__eyebrow">
          {kind === "email" ? "Email" : "Phone"}
        </p>
        <p className="contact-email-popup__address">{value}</p>
        <p className="contact-email-popup__status" aria-live="polite">
          {copied ? "Copied to clipboard" : "Ready to copy"}
        </p>
        <div className="contact-email-popup__actions">
          <button
            type="button"
            className="contact-email-popup__btn contact-email-popup__btn--primary"
            onClick={() => void copyValue()}
          >
            {copied ? "Copied" : kind === "email" ? "Copy email" : "Copy number"}
          </button>
          {kind === "email" ? (
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="contact-email-popup__btn contact-email-popup__btn--ghost"
              onClick={onClose}
            >
              Open mail app
            </a>
          ) : (
            <a
              href={FS_PHONE_HREF}
              className="contact-email-popup__btn contact-email-popup__btn--ghost"
              onClick={onClose}
            >
              Call now
            </a>
          )}
        </div>
        <button type="button" className="contact-email-popup__close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  )
}

/** Touch → dial immediately; desktop → open copy / call modal via callback. */
export function activatePhoneContact(openModal: () => void) {
  if (isTouchLikeDevice()) {
    window.location.href = FS_PHONE_HREF
    return
  }
  openModal()
}

/** Touch ? mailto immediately; desktop ? open copy / mail modal via callback. */
export function activateEmailContact(openModal: () => void) {
  if (isTouchLikeDevice()) {
    window.location.href = `mailto:${CONTACT_EMAIL}`
    return
  }
  openModal()
}
