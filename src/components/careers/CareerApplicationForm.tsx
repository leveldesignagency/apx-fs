"use client"

import Image from "next/image"
import Link from "next/link"
import { useCallback, useState } from "react"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import type { CareerRole } from "@/components/careers/careers-types"
import { FormSubmitButton } from "@/components/ui/FormSubmitButton"

const fieldClass =
  "w-full rounded-tl-xl rounded-br-xl border-2 border-white/25 bg-black px-4 py-3.5 text-sm text-white placeholder:text-white/40 outline-none transition-[border,box-shadow] focus:border-white/50 focus:ring-0"

const MAX_CV_BYTES = 5 * 1024 * 1024
const ACCEPT_CV = ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"

const STEPS = ["Your details", "Experience", "CV & submit"] as const

type Step = 1 | 2 | 3

export function CareerApplicationForm({
  role,
  siteName,
  logoSrc,
  homeHref,
}: {
  role: CareerRole
  siteName: string
  logoSrc: string
  homeHref: string
}) {
  const [step, setStep] = useState<Step>(1)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [experience, setExperience] = useState("")
  const [cvFile, setCvFile] = useState<File | null>(null)
  /** Honeypot — leave empty */
  const [hp, setHp] = useState("")

  const canNext1 = fullName.trim().length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) && phone.trim().length >= 8
  const canNext2 = experience.trim().length >= 40
  const canSubmit = cvFile !== null && cvFile.size > 0 && cvFile.size <= MAX_CV_BYTES

  const goNext = useCallback(() => {
    setError(null)
    if (step === 1 && canNext1) setStep(2)
    else if (step === 2 && canNext2) setStep(3)
  }, [step, canNext1, canNext2])

  const goBack = useCallback(() => {
    setError(null)
    if (step === 2) setStep(1)
    else if (step === 3) setStep(2)
  }, [step])

  const onSubmit = async () => {
    setError(null)
    if (!canSubmit || !cvFile || hp !== "") return
    setSubmitting(true)
    try {
      const fd = new FormData()
      fd.append("roleId", role.id)
      fd.append("fullName", fullName.trim())
      fd.append("email", email.trim())
      fd.append("phone", phone.trim())
      fd.append("experience", experience.trim())
      fd.append("cv", cvFile)
      fd.append("company", hp)

      const res = await fetch("/api/careers/apply", {
        method: "POST",
        body: fd,
      })
      const data = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again or email us directly.")
        throw new Error("apply-failed")
      }
      setDone(true)
    } catch {
      setError("Network error. Please check your connection and try again.")
      throw new Error("network")
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div className="mx-auto w-full max-w-lg text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-400" aria-hidden />
        <h2 className="mt-6 font-title text-2xl font-bold text-white sm:text-3xl">Application sent</h2>
        <p className="mt-4 text-base leading-relaxed text-white/70">
          Thank you — we have received your application for <span className="text-white/90">{role.title}</span>. If your
          profile matches the role, our team will be in touch.
        </p>
        <Link
          href="/careers"
          className="mt-10 inline-flex rounded-tl-xl rounded-br-xl border-2 border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/45 hover:bg-white/5"
        >
          Back to careers
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      <Link
        href="/careers"
        className="group inline-flex items-center gap-2 text-sm font-semibold text-white/60 transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden />
        Careers
      </Link>

      <div className="mt-8 flex flex-col items-center">
        <Link href={homeHref} className="inline-block">
          <Image src={logoSrc} alt={`${siteName} logo`} width={240} height={80} className="h-16 w-auto sm:h-20" priority />
        </Link>
        <p className="mt-6 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">Job application</p>
        <h1 className="mt-3 text-center font-title text-2xl font-bold leading-tight text-white sm:text-3xl">{role.title}</h1>
      </div>

      <ol className="mt-10 flex items-center justify-center gap-2 sm:gap-4" aria-label="Application steps">
        {STEPS.map((label, i) => {
          const n = (i + 1) as Step
          const active = step === n
          const complete = step > n
          return (
            <li key={label} className="flex min-w-0 items-center gap-2 sm:gap-4">
              {i > 0 ? <span className="hidden h-px w-4 shrink-0 bg-white/20 sm:block sm:w-8" aria-hidden /> : null}
              <div className="flex min-w-0 items-center gap-2">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold ${
                    complete
                      ? "border-emerald-400/80 bg-emerald-500/15 text-emerald-200"
                      : active
                        ? "border-white bg-white text-black"
                        : "border-white/25 text-white/50"
                  }`}
                  aria-current={active ? "step" : undefined}
                >
                  {complete ? "✓" : i + 1}
                </span>
                <span className={`hidden text-xs font-medium uppercase tracking-wide sm:inline ${active ? "text-white" : "text-white/45"}`}>
                  {label}
                </span>
              </div>
            </li>
          )
        })}
      </ol>

      <p className="mt-4 text-center text-sm text-white/50 sm:hidden">
        Step {step} of 3 — {STEPS[step - 1]}
      </p>

      <div className="mt-10 rounded-tl-2xl rounded-br-2xl border border-white/15 bg-black/40 p-6 sm:p-8">
        {error ? (
          <p className="mb-6 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-100" role="alert">
            {error}
          </p>
        ) : null}

        {/* Honeypot */}
        <label className="absolute -left-[9999px] h-0 w-0 overflow-hidden" htmlFor="careers-company-hp">
          Company
        </label>
        <input
          id="careers-company-hp"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={hp}
          onChange={(e) => setHp(e.target.value)}
          className="absolute -left-[9999px] h-0 w-0"
        />

        {step === 1 ? (
          <div className="space-y-5">
            <div>
              <label htmlFor="ca-name" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                Full name
              </label>
              <input
                id="ca-name"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="ca-email" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                Email
              </label>
              <input
                id="ca-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="ca-phone" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                Contact number
              </label>
              <input
                id="ca-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={fieldClass}
              />
            </div>
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={goNext}
                disabled={!canNext1}
                className="rounded-tl-xl rounded-br-xl border-2 border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors enabled:hover:border-white/45 enabled:hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continue
              </button>
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-5">
            <div>
              <label htmlFor="ca-exp" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                Relevant experience
              </label>
              <textarea
                id="ca-exp"
                name="experience"
                required
                rows={8}
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="Outline your background, certifications and projects relevant to this role."
                maxLength={2000}
                className={`${fieldClass} min-h-[180px] resize-y`}
              />
              <p className="mt-2 text-xs text-white/40">{experience.trim().length}/2000 — minimum 40 characters</p>
            </div>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={goBack}
                className="rounded-tl-xl rounded-br-xl border-2 border-white/25 px-6 py-3 text-sm font-semibold text-white/90 transition-colors hover:border-white/45 hover:bg-white/5"
              >
                Back
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={!canNext2}
                className="rounded-tl-xl rounded-br-xl border-2 border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors enabled:hover:border-white/45 enabled:hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continue
              </button>
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="space-y-5">
            <div>
              <label htmlFor="ca-cv" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                CV upload
              </label>
              <input
                id="ca-cv"
                name="cv"
                type="file"
                accept={ACCEPT_CV}
                required
                onChange={(e) => setCvFile(e.target.files?.[0] ?? null)}
                className="block w-full text-sm text-white/80 file:mr-4 file:rounded-tl-lg file:rounded-br-lg file:border-2 file:border-white/25 file:bg-black file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
              />
              <p className="mt-2 text-xs text-white/45">PDF or Word — max 5 MB</p>
              {cvFile ? (
                <p className="mt-2 text-sm text-white/70">
                  Selected: {cvFile.name} ({(cvFile.size / 1024).toFixed(0)} KB)
                </p>
              ) : null}
            </div>
            <p className="text-xs leading-relaxed text-white/45">
              By submitting, you confirm the information is accurate and agree that we may contact you about this application.
            </p>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-between sm:gap-4">
              <button
                type="button"
                onClick={goBack}
                disabled={submitting}
                className="rounded-tl-xl rounded-br-xl border-2 border-white/25 px-6 py-3 text-sm font-semibold text-white/90 transition-colors hover:border-white/45 hover:bg-white/5 disabled:opacity-50"
              >
                Back
              </button>
              <FormSubmitButton disabled={submitting || !canSubmit} onSubmit={onSubmit} className="min-w-[200px]">
                {submitting ? "Sending…" : "Submit application"}
              </FormSubmitButton>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
