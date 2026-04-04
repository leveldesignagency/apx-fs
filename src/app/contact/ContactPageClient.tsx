"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Reveal } from "@/components/Reveal"
import { FormSubmitButton } from "@/components/ui/FormSubmitButton"
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react"

/** Values match `/services/…` paths from the services hub for `?service=` deep links */
const FS_CONTACT_SERVICES = [
  { value: "electrical-systems", label: "CCTV systems" },
  { value: "energy-efficiency", label: "Access control systems" },
  { value: "sustainability", label: "Intruder alarm systems" },
  { value: "mechanical-engineering", label: "Fire alarm systems" },
  { value: "maintenance", label: "Video door entry systems" },
  { value: "refuge-disabled-communication", label: "Refuge & disabled communication systems" },
  { value: "evac-voice-evacuation", label: "EVAC & voice evacuation systems" },
  { value: "fire-life-safety", label: "Fire & life safety systems" },
  { value: "maintenance-support", label: "Maintenance & support" },
] as const

const fieldClass =
  "w-full rounded-xl border border-white/15 bg-black px-4 py-3.5 text-[17px] font-bold text-white placeholder:text-white/40 placeholder:font-normal outline-none transition-[border,box-shadow] focus:border-white/50 focus:ring-0 focus:bg-black"

export function ContactPageClient() {
  const searchParams = useSearchParams()
  const [mounted, setMounted] = useState(false)
  const [service, setService] = useState("")
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false)
  const [contactMethod, setContactMethod] = useState<"phone" | "email" | "text">("email")

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const s = searchParams.get("service")
    if (s && FS_CONTACT_SERVICES.some((opt) => opt.value === s)) setService(s)
  }, [searchParams])

  const serviceLabel = service
    ? (FS_CONTACT_SERVICES.find((o) => o.value === service)?.label ?? "Select a service")
    : "Select a service"

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="absolute -left-[20%] top-[-10%] h-[min(90vw,720px)] w-[min(90vw,720px)] rounded-full opacity-90 blur-3xl"
          style={{
            background: "radial-gradient(circle at 40% 40%, rgba(255,255,255,0.12) 0%, transparent 55%)",
          }}
        />
        <div
          className="absolute right-[-15%] top-[25%] h-[min(70vw,560px)] w-[min(70vw,560px)] rounded-full opacity-70 blur-3xl"
          style={{
            background: "radial-gradient(circle at 60% 50%, rgba(180,200,255,0.09) 0%, transparent 58%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-[45%]"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative z-10">
        <section className="about-section-px page-title-top pb-16 md:pb-24 lg:pb-28">
          <div className="about-section-inner mx-auto max-w-6xl">
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12 xl:gap-16">
              <div className="lg:col-span-5">
                <Reveal show={mounted} delayMs={0}>
                  <span className="section-label mb-5 block text-white/55">Contact</span>
                  <h1
                    className="text-[2.35rem] font-bold leading-[1.06] tracking-tight text-white sm:text-5xl md:text-[3.25rem] lg:text-[3.5rem]"
                    style={{ fontFamily: "var(--font-menu)" }}
                  >
                    Let&apos;s start a{" "}
                    <span className="bg-gradient-to-r from-white via-white to-white/55 bg-clip-text text-transparent">
                      conversation
                    </span>
                  </h1>
                  <p className="mt-6 max-w-md text-lg leading-relaxed text-white/72 md:text-xl">
                    Fire, security and life safety — surveys, quotes and expert advice. We cover London and the Home
                    Counties.
                  </p>
                </Reveal>

                <div className="mt-10 space-y-3 md:mt-12">
                  <Reveal show={mounted} delayMs={90}>
                    <a
                      href="tel:02083032280"
                      className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:border-white/22 hover:bg-white/[0.06]"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white transition-transform duration-300 group-hover:scale-105">
                        <Phone className="h-5 w-5" aria-hidden />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">Phone</p>
                        <p className="mt-0.5 text-lg font-semibold tracking-tight text-white">020 8303 2280</p>
                      </div>
                      <ArrowUpRight
                        className="h-5 w-5 shrink-0 text-white/0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white/50"
                        aria-hidden
                      />
                    </a>
                  </Reveal>
                  <Reveal show={mounted} delayMs={140}>
                    <a
                      href="mailto:enquiries@apx-fs.co.uk"
                      className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:border-white/22 hover:bg-white/[0.06]"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white transition-transform duration-300 group-hover:scale-105">
                        <Mail className="h-5 w-5" aria-hidden />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">Email</p>
                        <p className="mt-0.5 break-all text-lg font-semibold tracking-tight text-white">
                          enquiries@apx-fs.co.uk
                        </p>
                      </div>
                      <ArrowUpRight
                        className="h-5 w-5 shrink-0 text-white/0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white/50"
                        aria-hidden
                      />
                    </a>
                  </Reveal>
                  <Reveal show={mounted} delayMs={190}>
                    <a
                      href="https://maps.google.com/?q=365-369+Bexley+Road+Northumberland+Heath+Erith+Kent+DA8+3EZ"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:border-white/22 hover:bg-white/[0.06]"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white transition-transform duration-300 group-hover:scale-105">
                        <MapPin className="h-5 w-5" aria-hidden />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">Office</p>
                        <p className="mt-0.5 leading-snug text-white/90">
                          365-369 Bexley Road
                          <br />
                          Northumberland Heath, Erith
                          <br />
                          Kent, DA8 3EZ
                        </p>
                      </div>
                      <ArrowUpRight
                        className="mt-1 h-5 w-5 shrink-0 text-white/0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white/50"
                        aria-hidden
                      />
                    </a>
                  </Reveal>
                </div>
              </div>

              <div className="lg:col-span-7">
                <Reveal show={mounted} delayMs={120}>
                  <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] p-8 shadow-[0_32px_120px_rgba(0,0,0,0.5)] backdrop-blur-md md:p-10">
                    <div
                      className="pointer-events-none absolute -right-16 top-0 h-48 w-48 rounded-full opacity-40 blur-2xl"
                      style={{
                        background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
                      }}
                    />
                    <div className="relative">
                      <div className="mb-8 flex items-end justify-between gap-4 border-b border-white/10 pb-6">
                        <div>
                          <h2 className="text-2xl font-bold text-white md:text-3xl" style={{ fontFamily: "var(--font-menu)" }}>
                            Send a message
                          </h2>
                          <p className="mt-2 text-sm text-white/55">We&apos;ll get back to you within one working day.</p>
                        </div>
                      </div>
                      <form className="contact-page-form space-y-5" onSubmit={(e) => e.preventDefault()}>
                        <div>
                          <label htmlFor="name" className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                            Name
                          </label>
                          <input
                            id="name"
                            type="text"
                            name="name"
                            required
                            className={fieldClass}
                            placeholder="Your name"
                            autoComplete="name"
                          />
                        </div>
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                          <div>
                            <label htmlFor="email" className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                              Email
                            </label>
                            <input
                              id="email"
                              type="email"
                              name="email"
                              required
                              className={fieldClass}
                              placeholder="your@email.com"
                              autoComplete="email"
                            />
                          </div>
                          <div>
                            <label htmlFor="phone" className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                              Phone
                            </label>
                            <input
                              id="phone"
                              type="tel"
                              name="phone"
                              className={fieldClass}
                              placeholder="020 0000 0000"
                              autoComplete="tel"
                            />
                          </div>
                        </div>
                        <div className="relative">
                          <label htmlFor="service" className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                            Service
                          </label>
                          <button
                            type="button"
                            id="service"
                            onClick={() => setServiceDropdownOpen(!serviceDropdownOpen)}
                            className={`flex w-full cursor-pointer items-center justify-between rounded-xl border border-white/15 bg-black px-4 py-3.5 text-left text-[17px] font-bold text-white outline-none transition-[border,box-shadow] focus:border-white/50 focus:bg-black focus:ring-0 ${service ? "text-white" : "text-white/85"}`}
                          >
                            <span>{serviceLabel}</span>
                            <svg
                              className="h-5 w-5 shrink-0 text-white/60 transition-transform duration-200"
                              style={{ transform: serviceDropdownOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          <input type="hidden" name="service" value={service} />
                          {serviceDropdownOpen && (
                            <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-60 overflow-auto rounded-xl border border-white/12 bg-zinc-950 py-2 shadow-2xl">
                              <button
                                type="button"
                                className="block w-full px-4 py-3 text-left text-[17px] font-bold text-white/90 transition-colors hover:bg-white/10"
                                onClick={() => {
                                  setService("")
                                  setServiceDropdownOpen(false)
                                }}
                              >
                                Select a service
                              </button>
                              {FS_CONTACT_SERVICES.map((opt) => (
                                <button
                                  key={opt.value}
                                  type="button"
                                  className="block w-full px-4 py-3 text-left text-[17px] font-bold text-white transition-colors hover:bg-white/10"
                                  onClick={() => {
                                    setService(opt.value)
                                    setServiceDropdownOpen(false)
                                  }}
                                >
                                  {opt.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                            Preferred contact
                          </p>
                          <div className="flex flex-wrap gap-6">
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
                        </div>
                        <div>
                          <label htmlFor="message" className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                            Message
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            rows={5}
                            required
                            className={`${fieldClass} min-h-[140px] resize-y`}
                            placeholder="Tell us about your project or enquiry…"
                          />
                        </div>
                        <div className="flex w-full justify-center">
                          <FormSubmitButton
                            className="w-full max-w-[14rem]"
                            onSubmit={async () => {
                              /* Wire your real submit here */
                            }}
                          >
                            Send message
                          </FormSubmitButton>
                        </div>
                      </form>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
