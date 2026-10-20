"use client"

import Link from "next/link"
import { useEffect, useRef, useState, type ReactNode } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { HomeQuoteFormDrawShell } from "@/components/home/HomeQuoteFormDrawShell"
import { Reveal } from "@/components/Reveal"
import { FormSubmitButton } from "@/components/ui/FormSubmitButton"
import { GlassFormPanel } from "@/components/ui/GlassFormPanel"
import { ServiceCombobox } from "@/components/ui/ServiceCombobox"
import {
  FS_CONTACT_SERVICE_SLUGS,
  FS_LEGACY_CONTACT_SERVICE_SLUGS,
} from "@/lib/fs-service-routes"
import { Check, Copy, Mail, MapPin, Phone } from "lucide-react"
import { TurnstileWidget } from "@/components/TurnstileWidget"
import { ContactFaqSection } from "@/components/contact/ContactFaqSection"

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

const fieldClass =
  "w-full rounded-none border border-white/15 bg-[var(--page-bg)] px-3.5 py-2.5 text-base font-bold text-white placeholder:text-white/40 placeholder:font-normal outline-none transition-[border,box-shadow] focus:border-white/50 focus:ring-0 focus:bg-[var(--page-bg)]"

/** Match quote-form draw shell hairline (~0.5px), square, white on dark card */
const contactInfoCardClass =
  "group flex items-center gap-3.5 rounded-none border-[0.5px] border-white bg-[var(--page-bg)] px-4 py-3.5 transition-colors duration-300 hover:bg-black"

const CONTACT_EMAIL = "enquiries@apx-fs.co.uk"

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
    <main className="contact-page relative min-h-screen overflow-hidden bg-white text-black">
      <div className="relative z-10">
        <section id="contact" className="contact-page-section about-section-px page-title-top pb-16 md:pb-24 lg:pb-28">
          <div className="about-section-inner mx-auto max-w-6xl">
            <div className="grid grid-cols-1 items-stretch gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-12 xl:gap-14">
              <div className="contact-page-copy flex min-h-0 flex-col">
                <Reveal show={mounted} delayMs={0}>
                  <span className="section-label mb-5 block text-black/55">Contact</span>
                  <h1 className="mb-2 font-title text-left text-3xl font-bold text-black sm:mb-3 sm:text-4xl md:text-5xl lg:text-6xl">
                    Let&apos;s start a{" "}
                    <span className="bg-gradient-to-r from-black via-black to-black/45 bg-clip-text text-transparent">
                      conversation
                    </span>
                  </h1>
                  <p className="mt-6 max-w-md text-lg leading-relaxed text-black/65 md:text-xl">
                    Fire, security and life safety, surveys, quotes and expert advice. We cover London and the Home
                    Counties.
                  </p>
                </Reveal>

                <div className="mt-10 flex flex-1 flex-col justify-end gap-3 md:mt-12 lg:mt-0 lg:pt-10">
                  <Reveal show={mounted} delayMs={90} className="w-full">
                    <a href="tel:02083032280" className={contactInfoCardClass}>
                      <Phone className="h-5 w-5 shrink-0 text-white" aria-hidden />
                      <span className="min-w-0 flex-1 text-base font-semibold tracking-tight text-white sm:text-lg">
                        020 8303 2280
                      </span>
                    </a>
                  </Reveal>

                  <Reveal show={mounted} delayMs={140} className="w-full">
                    <div className={`${contactInfoCardClass} relative pr-14`}>
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="flex min-w-0 flex-1 items-center gap-3.5 text-inherit no-underline"
                      >
                        <Mail className="h-5 w-5 shrink-0 text-white" aria-hidden />
                        <span className="min-w-0 break-all text-base font-semibold tracking-tight text-white sm:text-lg">
                          {CONTACT_EMAIL}
                        </span>
                      </a>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          void copyContactEmail()
                        }}
                        className="contact-email-copy pointer-events-none absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center border-[0.5px] border-white bg-[var(--page-bg)] text-white opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100 focus-visible:pointer-events-auto focus-visible:opacity-100"
                        aria-label={emailCopied ? "Email copied" : "Copy email address"}
                      >
                        {emailCopied ? (
                          <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden />
                        ) : (
                          <Copy className="h-4 w-4" strokeWidth={2} aria-hidden />
                        )}
                      </button>
                    </div>
                  </Reveal>

                  <Reveal show={mounted} delayMs={190} className="w-full">
                    <a
                      href="https://maps.google.com/?q=365-369+Bexley+Road+Northumberland+Heath+Erith+Kent+DA8+3EZ"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${contactInfoCardClass} items-start`}
                    >
                      <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-white" aria-hidden />
                      <span className="min-w-0 flex-1 text-sm leading-snug text-white sm:text-base">
                        365-369 Bexley Road
                        <br />
                        Northumberland Heath, Erith
                        <br />
                        Kent, DA8 3EZ
                      </span>
                    </a>
                  </Reveal>
                </div>
              </div>

              <div className="contact-page-form-col flex h-full w-full flex-col">
                <Reveal show={mounted} delayMs={120} className="flex h-full w-full flex-col">
                  <HomeQuoteFormDrawShell active allowOverflow={serviceDropdownOpen}>
                    <div id="quote-form" className="relative w-full">
                      <GlassFormPanel contentClassName="p-4 md:p-5">
                          <form
                            ref={formRef}
                            className="contact-page-form space-y-3.5"
                            onSubmit={(e) => e.preventDefault()}
                            noValidate
                          >
                            {/* Honeypot, leave empty */}
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
                                  <ConsentCheckbox
                                    id="sms-consent"
                                    checked={smsConsent}
                                    onChange={setSmsConsent}
                                    required
                                  >
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
                      </GlassFormPanel>
                    </div>
                  </HomeQuoteFormDrawShell>
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
