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
  "quote-form-field w-full rounded-none border border-white/15 bg-black px-3.5 py-2.5 text-base font-bold text-white placeholder:text-white/40 placeholder:font-normal outline-none transition-[border,box-shadow] focus:border-white/50 focus:ring-0 focus:bg-black"

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
    <label htmlFor={id} className="group flex cursor-pointer items-start gap-3.5 text-sm leading-relaxed text-white/75">
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
      <span className="min-w-0 pt-0.5">{children}</span>
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
      className="mb-2 flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-xs font-semibold uppercase tracking-[0.12em] text-white/50"
    >
      <span>{children}</span>
      {required ? <span className="normal-case tracking-normal text-white/70">(required)</span> : null}
      {optional ? <span className="normal-case tracking-normal text-white/40">(optional)</span> : null}
    </label>
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
  const [emailCopied, setEmailCopied] = useState(false)
  const emailCopiedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setMounted(true)
    formStartedAtRef.current = Date.now()
    return () => {
      if (emailCopiedTimerRef.current) clearTimeout(emailCopiedTimerRef.current)
    }
  }, [])

  const copyContactEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL)
      setEmailCopied(true)
      if (emailCopiedTimerRef.current) clearTimeout(emailCopiedTimerRef.current)
      emailCopiedTimerRef.current = setTimeout(() => setEmailCopied(false), 1800)
    } catch {
      /* ignore */
    }
  }

  const handleEmail = () => {
    if (isTouchLikeDevice()) {
      window.location.href = `mailto:${CONTACT_EMAIL}`
      return
    }
    void copyContactEmail()
  }

  const handlePhone = () => {
    window.location.href = FS_PHONE_HREF
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
      <div className="relative z-10">
        <section id="contact" className="contact-page-section about-section-px page-title-top pb-16 md:pb-24 lg:pb-28">
          <div className="about-section-inner mx-auto max-w-6xl">
            <div className="grid grid-cols-1 items-stretch gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-12 xl:gap-14">
              <div className="contact-page-copy flex min-h-0 flex-col">
                <Reveal show={mounted} delayMs={0}>
                  <span className="section-label mb-5 block text-white/55">Contact</span>
                  <h1 className="contact-page-title font-title text-left text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl">
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
                          <span className="break-all">{CONTACT_EMAIL}</span>
                          {emailCopied ? <span className="contact-method-row__copied">Copied</span> : null}
                        </>
                      }
                      hint="Click to copy"
                      icon={<PiEnvelopeDuotone />}
                      onActivate={handleEmail}
                      ariaLabel={`Email ${CONTACT_EMAIL}`}
                    />
                  </Reveal>

                  <Reveal show={mounted} delayMs={140} className="w-full">
                    <ContactMethodRow
                      label="Phone"
                      detail={FS_PHONE_DISPLAY}
                      hint="24/7 call-out available"
                      icon={<PiHeadsetDuotone />}
                      onActivate={handlePhone}
                      ariaLabel={`Call ${FS_PHONE_DISPLAY}`}
                    />
                  </Reveal>

                  <Reveal show={mounted} delayMs={190} className="w-full">
                    <ContactMethodRow
                      label="Address"
                      detail={
                        <>
                          {CONTACT_ADDRESS_LINES.map((line) => (
                            <span key={line} className="block">
                              {line}
                            </span>
                          ))}
                        </>
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
                            />
                          </div>

                          <div>
                            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                              Preferred contact{" "}
                              <span className="normal-case tracking-normal text-white/70">(required)</span>
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
                                <span className="text-sm text-white/85">Phone</span>
                              </label>
                              <label className="flex cursor-pointer items-center gap-2.5">
                                <input
                                  type="radio"
                                  name="contact-method"
                                  value="email"
                                  checked={contactMethod === "email"}
                                  onChange={() => setContactMethod("email")}
                                />
                                <span className="text-sm text-white/85">Email</span>
                              </label>
                              <label className="flex cursor-pointer items-center gap-2.5">
                                <input
                                  type="radio"
                                  name="contact-method"
                                  value="text"
                                  checked={contactMethod === "text"}
                                  onChange={() => setContactMethod("text")}
                                />
                                <span className="text-sm text-white/85">Text message</span>
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

                          <div className="flex w-full justify-center">
                            <FormSubmitButton
                              className="w-full max-w-[14rem]"
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
