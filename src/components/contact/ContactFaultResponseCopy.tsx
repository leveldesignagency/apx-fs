"use client"

import type { CSSProperties, MouseEvent } from "react"
import {
  CONTACT_EMAIL,
} from "@/components/contact/ContactCopyCallPopup"
import { FS_PHONE_DISPLAY, FS_PHONE_HREF } from "@/components/ui/CallPhoneCta"
import { cn } from "@/lib/utils"

type ContactFaultResponseCopyProps = {
  className?: string
  style?: CSSProperties
  /** Desktop: open copy / call modal. Touch dial via parent activatePhoneContact. */
  onPhoneClick: () => void
  /** Desktop: open copy / mail modal. Touch mailto via parent activateEmailContact. */
  onEmailClick: () => void
  /** Light homepage band vs dark contact page */
  variant?: "onLight" | "onDark"
}

/**
 * Fault / response intro with clickable phone + email.
 * Uses anchors (not buttons) so ThemeToggle global button chrome does not apply.
 */
export function ContactFaultResponseCopy({
  className,
  style,
  onPhoneClick,
  onEmailClick,
  variant = "onDark",
}: ContactFaultResponseCopyProps) {
  const linkClass =
    variant === "onLight"
      ? "font-semibold text-black underline decoration-black/35 underline-offset-[3px] transition-colors hover:decoration-black"
      : "font-semibold text-white underline decoration-white/40 underline-offset-[3px] transition-colors hover:decoration-white"

  const onPhoneAnchorClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    onPhoneClick()
  }

  const onEmailAnchorClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    onEmailClick()
  }

  return (
    <p className={cn("[overflow-wrap:normal] [word-break:normal]", className)} style={style}>
      Call{" "}
      <a href={FS_PHONE_HREF} onClick={onPhoneAnchorClick} className={linkClass}>
        {FS_PHONE_DISPLAY}
      </a>{" "}
      for the fastest response, or email{" "}
      <a href={`mailto:${CONTACT_EMAIL}`} onClick={onEmailAnchorClick} className={linkClass}>
        enquiries@apx{"\u2011"}fs.co.uk
      </a>{" "}
      with your site name, system type and a short description of the fault. One of our team will reply as soon as
      possible. Existing contract customers should quote their account or site reference if available.
    </p>
  )
}
