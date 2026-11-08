"use client"

import Link from "next/link"
import { useEffect, useRef, useState, type ReactNode } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Reveal } from "@/components/Reveal"
import { FormSubmitButton } from "@/components/ui/FormSubmitButton"
import { ServiceCombobox } from "@/components/ui/ServiceCombobox"
import {
  FS_CONTACT_SERVICE_SLUGS,
  FS_LEGACY_CONTACT_SERVICE_SLUGS,
} from "@/lib/fs-service-routes"
import { Check } from "lucide-react"
import { PiEnvelopeDuotone, PiHeadsetDuotone, PiMapPinAreaDuotone } from "react-icons/pi"
import { TurnstileWidget } from "@/components/TurnstileWidget"
import { ContactFaqSection } from "@/components/contact/ContactFaqSection"
import { FS_PHONE_DISPLAY, FS_PHONE_HREF } from "@/components/ui/CallPhoneCta"

/** Values match `/services/…` path segments for `?service=` deep links */
const FS_CONTACT_SERVICES = [
  { value: FS_CONTACT_SERVICE_SLUGS.intruderAlarmSystems, label: "Intruder Alarm Systems" },
  { value: FS_CONTACT_SERVICE_SLUGS.fireAlarmSystems, label: "Fire Alarm Systems" },
  { value: FS_CONTACT_SERVICE_SLUGS.cctvSystems, label: "CCTV Systems" },
  { value: FS_CONTACT_SERVICE_SLUGS.accessControlSystems, label: "Access Control Systems" },
  { value: FS_CONTACT_SERVICE_SLUGS.videoDoorEntrySystems, label: "Video Door Entry Systems" },
  { value: FS_CONTACT_SERVICE_SLUGS.gateAutomationSystems, label: "Gate Automation" },
  { value: FS_CONTACT_SERVICE_SLUGS.pava, label: "PAVA Systems" },
  { value: FS_CONTACT_SERVICE_SLUGS.evac, label: "EVAC Systems" },
  {
    value: FS_CONTACT_SERVICE_SLUGS.refugeDisabledCommunication,
    label: "Disabled Refuge, Fire Telephone & Toilet Alarm Systems",
  },
  { value: FS_CONTACT_SERVICE_SLUGS.monitoring, label: "Monitoring" },
  { value: FS_CONTACT_SERVICE_SLUGS.maintenanceSupport, label: "Maintenance & Repairs" },
  { value: FS_CONTACT_SERVICE_SLUGS.emergencyCallOut, label: "Emergency Call-Out" },
] as const

/** Shared with homepage quote form: dark field, white type */
const fieldClass =
  "quote-form-field w-full rounded-none border border-white/20 bg-black px-3.5 py-2.5 text-base font-bold text-white placeholder:text-white/40 placeholder:font-normal outline-none transition-[border-color] duration-200 focus:border-white focus:ring-0 focus:bg-black"

const CONTACT_EMAIL = "enquiries@apx-fs.co.uk"
const CONTACT_ADDRESS_LINES = ["365-369 Bexley Road", "Northumberland Heath, Erith", "Kent, DA8 3EZ"] as const
const CONTACT_MAPS_HREF =
  "https://maps.google.com/?q=365-369+Bexley+Road+Northumberland+Heath+Erith+Kent+DA8+3EZ"

function isTouchLikeDevice() {
  if (typeof window === "undefined") return false
  return window.matchMedia("(hover: none), (pointer: coarse)").matches
}

function ConsentCheckbox({
  id,
  checked,
  onChange,
  required,
  children,
}: {
  id: string
  checked: boolean
  onChange: (next: boolean) => void
  required?: boolean
  children: ReactNode
}) {
  return (
    <label
      htmlFor={id}
      className="contact-consent group flex cursor-pointer items-start gap-3.5 text-sm leading-relaxed text-white/75"
    >
      <span className="relative mt-0.5 inline-flex shrink-0">
        <input
          id={id}
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          required={required}
        />
        <span
          aria-hidden
          className="flex h-6 w-6 items-center justify-center border border-white/45 bg-[var(--page-bg)] transition-[border-color,background-color,box-shadow] peer-checked:border-white peer-checked:bg-white peer-focus-visible:ring-2 peer-focus-visible:ring-white/55 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-black group-hover:border-white/70"
        >
          <Check
            className={`h-3.5 w-3.5 text-black transition-opacity ${checked ? "opacity-100" : "opacity-0"}`}
            strokeWidth={3}
          />
        </span>
      </span>
      <span className="contact-consent__text min-w-0 pt-0.5">{children}</span>
    </label>
  )
}

function FieldLabel({
  htmlFor,
  children,
  required,
  optional,
}: {
  htmlFor?: string
  children: ReactNode
  required?: boolean
  optional?: boolean
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="quote-form-label mb-2 flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-sm font-semibold uppercase tracking-[0.12em] text-white/55"
    >
      <span>{children}</span>
      {required ? <span className="text-[0.8125rem] normal-case tracking-normal text-white/70">(required)</span> : null}
      {optional ? <span className="text-[0.8125rem] normal-case tracking-normal text-white/40">(optional)</span> : null}
    </label>
  )
}

function useCanHoverRedact() {
  const [canHover, setCanHover] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)")
    const sync = () => setCanHover(mq.matches)
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [])
  return canHover
}

/**
 * Solid **** run crossfades into naturally spaced letters on parent `.group` hover.
 * Stars and letters are separate layers (not locked into shared fixed-width slots).
 */
function RedactedChars({ text, startIndex = 0 }: { text: string; startIndex?: number }) {
  const chars = text.split("")
  return (
    <span className="contact-redact__swap">
      <span className="contact-redact__stars" aria-hidden>
        {chars.map((_, i) => (
          <span
            key={`star-${startIndex + i}`}
            className="contact-redact__star"
            style={{ ["--redact-i" as string]: startIndex + i }}
          >
            *
          </span>
        ))}
      </span>
      <span className="contact-redact__letters" aria-hidden>
        {chars.map((ch, i) => (
          <span
            key={`letter-${startIndex + i}`}
            className="contact-redact__letter"
            style={{ ["--redact-i" as string]: startIndex + i }}
          >
            {ch === " " ? "\u00a0" : ch}
          </span>
        ))}
      </span>
    </span>
  )
}

function RedactedEnquiryEmail({ email }: { email: string }) {
  const at = email.indexOf("@")
  const local = at >= 0 ? email.slice(0, at) : email
  const domain = at >= 0 ? email.slice(at) : ""

  return (
    <span className="contact-redact break-all" aria-hidden>
      <RedactedChars text={local} />
      <span className="contact-redact__plain">{domain}</span>
    </span>
  )
}

/** Last N digits as one redacted run; leading digits + spaces stay plain. */
function RedactedPhone({ display, lastDigits = 7 }: { display: string; lastDigits?: number }) {
  const digitIdxs: number[] = []
  for (let i = 0; i < display.length; i++) {
    if (/\d/.test(display[i]!)) digitIdxs.push(i)
  }
  const redactFrom = new Set(digitIdxs.slice(-lastDigits))
  const parts: { type: "plain" | "redact"; text: string }[] = []
  let buf = ""
  let mode: "plain" | "redact" | null = null

  const flush = () => {
    if (!buf || !mode) return
    parts.push({ type: mode, text: buf })
    buf = ""
  }

  for (let i = 0; i < display.length; i++) {
    const ch = display[i]!
    const next: "plain" | "redact" = redactFrom.has(i) ? "redact" : "plain"
    if (mode && next !== mode) flush()
    mode = next
    buf += ch
  }
  flush()

  let delay = 0
  return (
    <span className="contact-redact" aria-hidden>
      {parts.map((part, i) => {
        if (part.type === "plain") {
          return (
            <span key={`pp-${i}`} className="contact-redact__plain">
              {part.text}
            </span>
          )
        }
        const start = delay
        delay += part.text.length
        return <RedactedChars key={`pr-${i}`} text={part.text} startIndex={start} />
      })}
    </span>
  )
}

function RedactedAddress({ lines }: { lines: readonly string[] }) {
  const redactChunks = new Set(["365-369", "DA8 3EZ"])
  let delay = 0

  return (
    <span className="contact-redact" aria-hidden>
      {lines.map((line, lineIdx) => {
        const parts = line.split(/(365-369|DA8 3EZ)/g)
        return (
          <span key={line} className="block">
            {parts.map((part, partIdx) => {
              if (!part) return null
              if (redactChunks.has(part)) {
                const start = delay
                delay += part.length
                return <RedactedChars key={`${lineIdx}-${partIdx}`} text={part} startIndex={start} />
              }
              return (
                <span key={`${lineIdx}-${partIdx}`} className="contact-redact__plain">
                  {part}
                </span>
              )
            })}
          </span>
        )
      })}
    </span>
  )
}

function ContactMethodRow({
  label,
  detail,
  icon,
  onActivate,
  ariaLabel,
  hint,
}: {
  label: string
  detail: ReactNode
  icon: ReactNode
  onActivate: () => void
  ariaLabel: string
  hint?: string
}) {
  return (
    <button type="button" onClick={onActivate} aria-label={ariaLabel} className="contact-method-row group">
      <span className="contact-method-row__icon" aria-hidden>
        {icon}
      </span>
      <span className="contact-method-row__copy">
        <span className="contact-method-row__label">{label}</span>
        <span className="contact-method-row__detail">{detail}</span>
        {hint ? <span className="contact-method-row__hint">{hint}</span> : null}
      </span>
    </button>
  )
}

export function ContactPageClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const formRef = useRef<HTMLFormElement>(null)
  const formStartedAtRef = useRef(Date.now())
  const [mounted, setMounted] = useState(false)
  const [service, setService] = useState("")
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false)
  const [contactMethod, setContactMethod] = useState<"phone" | "email" | "text">("email")
  const [privacyConsent, setPrivacyConsent] = useState(false)
  const [smsConsent, setSmsConsent] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [contactPopup, setContactPopup] = useState<null | "email" | "phone">(null)
  const [copiedKind, setCopiedKind] = useState<null | "email" | "phone">(null)
  const copiedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const canHoverRedact = useCanHoverRedact()

  useEffect(() => {
    setMounted(true)
    formStartedAtRef.current = Date.now()
    return () => {
      if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current)
    }
  }, [])

  useEffect(() => {
    if (!contactPopup) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setContactPopup(null)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [contactPopup])

  const markCopied = (kind: "email" | "phone") => {
    setCopiedKind(kind)
    if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current)
    copiedTimerRef.current = setTimeout(() => setCopiedKind(null), 2200)
  }

  const copyContactEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL)
      markCopied("email")
    } catch {
      /* ignore */
    }
  }

  const copyContactPhone = async () => {
    try {
      await navigator.clipboard.writeText(FS_PHONE_DISPLAY)
      markCopied("phone")
    } catch {
      /* ignore */
    }
  }

  const handleEmail = () => {
    // Mobile / touch: open mail app directly (no custom modal)
    if (isTouchLikeDevice()) {
      window.location.href = `mailto:${CONTACT_EMAIL}`
      return
    }
    setContactPopup("email")
    void copyContactEmail()
  }

  const handlePhone = () => {
    // Mobile / touch: start a call directly (no custom modal)
    if (isTouchLikeDevice()) {
      window.location.href = FS_PHONE_HREF
      return
    }
    setContactPopup("phone")
    void copyContactPhone()
  }

  const handleMaps = () => {
    window.open(CONTACT_MAPS_HREF, "_blank", "noopener,noreferrer")
  }

  useEffect(() => {
    const raw = searchParams.get("service")
    if (!raw) return
    const normalized = FS_LEGACY_CONTACT_SERVICE_SLUGS[raw] ?? raw
    if (FS_CONTACT_SERVICES.some((opt) => opt.value === normalized)) setService(normalized)
  }, [searchParams])

  const serviceLabel = service
    ? (FS_CONTACT_SERVICES.find((o) => o.value === service)?.label ?? service)
    : ""

  const phoneRequired = contactMethod === "phone" || contactMethod === "text"
  const emailRequired = contactMethod === "email"

  return (
    <main className="contact-page relative min-h-screen overflow-hidden bg-[var(--page-bg)] text-white">
      {contactPopup ? (
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
            onClick={() => setContactPopup(null)}
          />
          <div className="contact-email-popup__card">
            <p id="contact-email-popup-title" className="contact-email-popup__eyebrow">
              {contactPopup === "email" ? "Email" : "Phone"}
            </p>
            <p className="contact-email-popup__address">
              {contactPopup === "email" ? CONTACT_EMAIL : FS_PHONE_DISPLAY}
            </p>
            <p className="contact-email-popup__status" aria-live="polite">
              {copiedKind === contactPopup ? "Copied to clipboard" : "Ready to copy"}
            </p>
            <div className="contact-email-popup__actions">
              <button
                type="button"
                className="contact-email-popup__btn contact-email-popup__btn--primary"
                onClick={() =>
                  void (contactPopup === "email" ? copyContactEmail() : copyContactPhone())
                }
              >
                {copiedKind === contactPopup
                  ? "Copied"
                  : contactPopup === "email"
                    ? "Copy email"
                    : "Copy number"}
              </button>
              {contactPopup === "email" ? (
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="contact-email-popup__btn contact-email-popup__btn--ghost"
                  onClick={() => setContactPopup(null)}
                >
                  Open mail app
                </a>
              ) : (
                <a
                  href={FS_PHONE_HREF}
                  className="contact-email-popup__btn contact-email-popup__btn--ghost"
                  onClick={() => setContactPopup(null)}
                >
                  Call now
                </a>
              )}
            </div>
            <button
              type="button"
              className="contact-email-popup__close"
              onClick={() => setContactPopup(null)}
            >
              Close
            </button>
          </div>
        </div>
      ) : null}

      <div className="relative z-10">
        <section id="contact" className="contact-page-section about-section-px page-title-top pb-16 md:pb-24 lg:pb-28">
          <div className="about-section-inner mx-auto max-w-6xl">
            <div className="grid grid-cols-1 items-stretch gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-12 xl:gap-14">
              <div className="contact-page-copy flex min-h-0 flex-col">
                <Reveal show={mounted} delayMs={0}>
                  <span className="section-label mb-5 block text-white/55">Contact</span>
                  <h1 className="contact-page-title font-title text-left text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl">
                    Let&apos;s Start a Conversation
                  </h1>
                  <p className="contact-page-credibility mt-5 max-w-md text-sm leading-relaxed text-white/55 sm:text-base">
                    NSI Gold for security and fire. Surveys, quotes and specialist advice across London and the Home
                    Counties.
                  </p>
                </Reveal>

                <div className="contact-page-methods mt-10 flex flex-col md:mt-12 lg:mt-14">
                  <Reveal show={mounted} delayMs={90} className="w-full">
                    <ContactMethodRow
                      label="Email"
                      detail={
                        <>
                          {canHoverRedact ? (
                            <>
                              <span className="sr-only">{CONTACT_EMAIL}</span>
                              <RedactedEnquiryEmail email={CONTACT_EMAIL} />
                            </>
                          ) : (
                            <span className="break-all">{CONTACT_EMAIL}</span>
                          )}
                        </>
                      }
                      hint={canHoverRedact ? "Hover to reveal · click for options" : "Tap to email"}
                      icon={<PiEnvelopeDuotone />}
                      onActivate={handleEmail}
                      ariaLabel={`Email ${CONTACT_EMAIL}`}
                    />
                  </Reveal>

                  <Reveal show={mounted} delayMs={140} className="w-full">
                    <ContactMethodRow
                      label="Phone"
                      detail={
                        canHoverRedact ? (
                          <>
                            <span className="sr-only">{FS_PHONE_DISPLAY}</span>
                            <RedactedPhone display={FS_PHONE_DISPLAY} lastDigits={7} />
                          </>
                        ) : (
                          FS_PHONE_DISPLAY
                        )
                      }
                      hint={canHoverRedact ? "Hover to reveal · click for options" : "Tap to call"}
                      icon={<PiHeadsetDuotone />}
                      onActivate={handlePhone}
                      ariaLabel={`Phone ${FS_PHONE_DISPLAY}`}
                    />
                  </Reveal>

                  <Reveal show={mounted} delayMs={190} className="w-full">
                    <ContactMethodRow
                      label="Address"
                      detail={
                        canHoverRedact ? (
                          <>
                            <span className="sr-only">{CONTACT_ADDRESS_LINES.join(", ")}</span>
                            <RedactedAddress lines={CONTACT_ADDRESS_LINES} />
                          </>
                        ) : (
                          CONTACT_ADDRESS_LINES.map((line) => (
                            <span key={line} className="block">
                              {line}
                            </span>
                          ))
                        )
                      }
                      hint="Open in Google Maps"
                      icon={<PiMapPinAreaDuotone />}
                      onActivate={handleMaps}
                      ariaLabel="Open address in Google Maps"
                    />
                  </Reveal>
                </div>
              </div>

              <div className="contact-page-form-col mt-8 flex h-full w-full flex-col sm:mt-10 lg:mt-14">
                <Reveal show={mounted} delayMs={120} className="flex h-full w-full flex-col">
                    <div
                      id="quote-form"
                      className={`contact-page-form-shell relative w-full ${serviceDropdownOpen ? "overflow-visible" : ""}`}
                    >
                        <form
                          ref={formRef}
                          className="contact-page-form space-y-3.5"
                          onSubmit={(e) => e.preventDefault()}
                          noValidate
                        >
                          <label className="sr-only" htmlFor="contact-website-hp">
                            Website
                          </label>
                          <input
                            id="contact-website-hp"
                            name="website"
                            type="text"
                            tabIndex={-1}
                            autoComplete="off"
                            className="absolute -left-[9999px] h-px w-px opacity-0"
                          />

                          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                            <div>
                              <FieldLabel htmlFor="name" required>
                                Name
                              </FieldLabel>
                              <input
                                id="name"
                                type="text"
                                name="name"
                                required
                                inputMode="text"
                                enterKeyHint="next"
                                className={fieldClass}
                                placeholder="Your full name"
                                autoComplete="name"
                              />
                            </div>
                            <div>
                              <FieldLabel htmlFor="companyName" optional>
                                Company
                              </FieldLabel>
                              <input
                                id="companyName"
                                type="text"
                                name="companyName"
                                className={fieldClass}
                                placeholder="Company or organisation"
                                autoComplete="organization"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                            <div>
                              <FieldLabel htmlFor="email" required={emailRequired} optional={!emailRequired}>
                                Email
                              </FieldLabel>
                              <input
                                id="email"
                                type="email"
                                name="email"
                                required={emailRequired}
                                inputMode="email"
                                enterKeyHint="next"
                                className={fieldClass}
                                placeholder="your@email.com"
                                autoComplete="email"
                              />
                            </div>
                            <div>
                              <FieldLabel htmlFor="phone" required={phoneRequired} optional={!phoneRequired}>
                                Phone
                              </FieldLabel>
                              <input
                                id="phone"
                                type="tel"
                                name="phone"
                                required={phoneRequired}
                                inputMode="tel"
                                enterKeyHint="next"
                                className={fieldClass}
                                placeholder="020 0000 0000"
                                autoComplete="tel"
                              />
                            </div>
                          </div>

                          <div className="relative">
                            <FieldLabel htmlFor="service" optional>
                              Service
                            </FieldLabel>
                            <ServiceCombobox
                              id="service"
                              name="service"
                              options={FS_CONTACT_SERVICES}
                              value={service}
                              onChange={setService}
                              onOpenChange={setServiceDropdownOpen}
                              placeholder="Select or type a service"
                              emptyLabel="Select a service"
                              allowCustom
                              inputClassName="border-white/20 px-3.5 py-2.5 text-base focus:border-white sm:text-base"
                            />
                          </div>

                          <div>
                            <FieldLabel htmlFor="message" required>
                              Message
                            </FieldLabel>
                            <textarea
                              id="message"
                              name="message"
                              rows={3}
                              required
                              className={`${fieldClass} min-h-[96px] resize-y`}
                              placeholder="Tell us about your project or enquiry…"
                            />
                          </div>

                          <div>
                            <p className="quote-form-label mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-white/55">
                              Preferred contact{" "}
                              <span className="text-[0.8125rem] normal-case tracking-normal text-white/70">(required)</span>
                            </p>
                            <div className="flex flex-wrap gap-5">
                              <label className="flex cursor-pointer items-center gap-2.5">
                                <input
                                  type="radio"
                                  name="contact-method"
                                  value="phone"
                                  checked={contactMethod === "phone"}
                                  onChange={() => setContactMethod("phone")}
                                />
                                <span className="contact-pref-option text-base text-white/90">Phone</span>
                              </label>
                              <label className="flex cursor-pointer items-center gap-2.5">
                                <input
                                  type="radio"
                                  name="contact-method"
                                  value="email"
                                  checked={contactMethod === "email"}
                                  onChange={() => setContactMethod("email")}
                                />
                                <span className="contact-pref-option text-base text-white/90">Email</span>
                              </label>
                              <label className="flex cursor-pointer items-center gap-2.5">
                                <input
                                  type="radio"
                                  name="contact-method"
                                  value="text"
                                  checked={contactMethod === "text"}
                                  onChange={() => setContactMethod("text")}
                                />
                                <span className="contact-pref-option text-base text-white/90">Text message</span>
                              </label>
                            </div>
                            {contactMethod === "text" ? (
                              <div className="mt-4">
                                <ConsentCheckbox id="sms-consent" checked={smsConsent} onChange={setSmsConsent} required>
                                  I consent to APX Fire &amp; Security contacting me by SMS / text message about this
                                  enquiry. Message and data rates may apply.{" "}
                                  <span className="text-white/55">(required for text message)</span>
                                </ConsentCheckbox>
                              </div>
                            ) : null}
                          </div>

                          <ConsentCheckbox
                            id="privacy-consent"
                            checked={privacyConsent}
                            onChange={setPrivacyConsent}
                            required
                          >
                            I have read the{" "}
                            <Link
                              href="/privacy"
                              className="font-semibold text-white underline decoration-white/40 underline-offset-2 hover:decoration-white"
                            >
                              Privacy Policy
                            </Link>{" "}
                            and understand APX Fire &amp; Security will process my details to respond to this enquiry.{" "}
                            <span className="text-white/55">(required)</span>
                          </ConsentCheckbox>

                          {submitError ? (
                            <p className="text-center text-sm text-red-300" role="alert">
                              {submitError}
                            </p>
                          ) : null}

                          <div className="flex w-full justify-center">
                            <TurnstileWidget onToken={setTurnstileToken} theme="dark" />
                          </div>

                          <div className="flex w-full justify-end">
                            <FormSubmitButton
                              className="contact-form-submit"
                              onSubmit={async () => {
                                setSubmitError(null)
                                const form = formRef.current
                                if (!form) throw new Error("missing-form")
                                if (!privacyConsent) {
                                  setSubmitError("Please confirm you have read the Privacy Policy.")
                                  throw new Error("privacy")
                                }
                                if (contactMethod === "text" && !smsConsent) {
                                  setSubmitError("Please confirm you consent to SMS contact.")
                                  throw new Error("sms")
                                }
                                const fd = new FormData(form)
                                const emailVal = String(fd.get("email") ?? "").trim()
                                const phoneVal = String(fd.get("phone") ?? "").trim()
                                const emailLooksOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)
                                const phoneLooksOk = phoneVal.length >= 8
                                if (!emailLooksOk && !phoneLooksOk) {
                                  setSubmitError("Please provide at least one contact method (email or phone).")
                                  throw new Error("contact-method")
                                }
                                if (contactMethod === "email" && !emailLooksOk) {
                                  setSubmitError("Please enter a valid email address.")
                                  throw new Error("email")
                                }
                                if ((contactMethod === "phone" || contactMethod === "text") && !phoneLooksOk) {
                                  setSubmitError("Please enter a phone number for your preferred contact method.")
                                  throw new Error("phone")
                                }
                                const websiteHp = String(fd.get("website") ?? "").trim()
                                if (websiteHp.length > 0) {
                                  router.push("/thank-you")
                                  return
                                }
                                const res = await fetch("/api/contact", {
                                  method: "POST",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({
                                    name: String(fd.get("name") ?? "").trim(),
                                    companyName: String(fd.get("companyName") ?? "").trim(),
                                    email: emailVal,
                                    phone: phoneVal,
                                    service,
                                    serviceLabel: service ? serviceLabel : "",
                                    contactMethod,
                                    message: String(fd.get("message") ?? "").trim(),
                                    website: websiteHp,
                                    privacyConsent,
                                    smsConsent: contactMethod === "text" ? smsConsent : false,
                                    formStartedAt: formStartedAtRef.current,
                                    turnstileToken: turnstileToken ?? "",
                                  }),
                                })
                                const data = (await res.json().catch(() => ({}))) as { error?: string }
                                if (!res.ok) {
                                  setSubmitError(
                                    data.error ?? "Could not send. Please try again or email us directly."
                                  )
                                  throw new Error("contact-failed")
                                }
                                router.push("/thank-you")
                              }}
                            >
                              Send message
                            </FormSubmitButton>
                          </div>
                        </form>
                    </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <ContactFaqSection />
      </div>
    </main>
  )
}
