"use client"

import Link from "next/link"
import { useCallback, useState, type ReactNode } from "react"
import { Check, CheckCircle2 } from "lucide-react"
import type { CareerRole } from "@/components/careers/careers-types"
import { FormSubmitButton } from "@/components/ui/FormSubmitButton"
import { TurnstileWidget } from "@/components/TurnstileWidget"

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
      className="careers-apply-body group flex cursor-pointer items-start gap-3.5 text-sm leading-relaxed"
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
          className="careers-apply-check flex h-6 w-6 items-center justify-center border border-white/45 bg-black transition-[border-color,background-color,box-shadow] peer-checked:border-white peer-checked:bg-white peer-focus-visible:ring-2 peer-focus-visible:ring-white/55 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-black group-hover:border-white/70"
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

const fieldClass =
  "w-full rounded-none border border-white/30 bg-black px-4 py-3.5 text-sm text-white placeholder:text-white/35 outline-none transition-[border,box-shadow] focus:border-white/55 focus:ring-0"

const outlineBtnClass =
  "careers-apply-outline-btn rounded-none border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors enabled:hover:border-white/55 enabled:hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"

const MAX_CV_BYTES = 5 * 1024 * 1024
const ACCEPT_CV =
  ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"

const STEPS = ["Your details", "Experience", "CV & submit"] as const

type Step = 1 | 2 | 3

export function CareerApplicationForm({
  role,
}: {
  role: CareerRole
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
  /** honeypot */
  const [hp, setHp] = useState("")
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [privacyConsent, setPrivacyConsent] = useState(false)

  const canNext1 =
    fullName.trim().length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) && phone.trim().length >= 8
  const canNext2 = experience.trim().length >= 40
  const canSubmit =
    cvFile !== null && cvFile.size > 0 && cvFile.size <= MAX_CV_BYTES && privacyConsent

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
      fd.append("turnstileToken", turnstileToken ?? "")
      fd.append("privacyConsent", privacyConsent ? "true" : "false")

      const res = await fetch("/api/careers/apply", {
        method: "POST",
        body: fd,
      })
      const data = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again or email us directly.")
        return
      }
      setDone(true)
    } catch {
      setError("Network error. Please check your connection and try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div className="mx-auto w-full max-w-lg text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-400" aria-hidden />
        <h2 className="mt-6 font-title text-2xl font-bold text-white sm:text-3xl">Application Sent</h2>
        <p className="careers-apply-body mt-4 text-base leading-relaxed">
          Thank you, we have received your application for <span className="font-medium text-white">{role.title}</span>.
          If your profile matches the role, our team will be in touch.
        </p>
        <Link href="/careers" className={`${outlineBtnClass} mt-10 inline-flex`}>
          Back to careers
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      <Link
        href="/careers"
        className="inline-block text-sm font-semibold transition-colors hover:underline"
      >
        Back to careers
      </Link>

      <div className="mt-8">
        <p className="careers-apply-muted text-center text-[11px] font-semibold uppercase tracking-[0.22em]">
          Job application
        </p>
        <h1 className="mt-3 text-center font-title text-2xl font-bold leading-tight text-white sm:text-3xl">
          {role.title}
        </h1>
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
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${
                    complete ? "careers-step-done" : active ? "careers-step-active" : "careers-step-idle"
                  }`}
                  aria-current={active ? "step" : undefined}
                >
                  {complete ? "✓" : i + 1}
                </span>
                <span
                  className={`hidden text-xs font-medium uppercase tracking-wide sm:inline ${
                    active ? "careers-step-label-active" : "careers-step-label-idle"
                  }`}
                >
                  {label}
                </span>
              </div>
            </li>
          )
        })}
      </ol>

      <p className="careers-apply-muted mt-4 text-center text-sm sm:hidden">
        Step {step} of 3, {STEPS[step - 1]}
      </p>

      <div className="careers-apply-panel mt-10 rounded-none border border-white/20 bg-black/40 p-6 sm:p-8">
        {error ? (
          <p
            className="mb-6 rounded-none border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200"
            role="alert"
          >
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
              <label
                htmlFor="ca-name"
                className="careers-apply-label mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em]"
              >
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
              <label
                htmlFor="ca-email"
                className="careers-apply-label mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em]"
              >
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
              <label
                htmlFor="ca-phone"
                className="careers-apply-label mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em]"
              >
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
              <button type="button" onClick={goNext} disabled={!canNext1} className={outlineBtnClass}>
                Continue
              </button>
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-5">
            <div>
              <label
                htmlFor="ca-exp"
                className="careers-apply-label mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em]"
              >
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
              <p className="careers-apply-muted mt-2 text-xs">
                {experience.trim().length}/2000, minimum 40 characters
              </p>
            </div>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-between">
              <button type="button" onClick={goBack} className={outlineBtnClass}>
                Back
              </button>
              <button type="button" onClick={goNext} disabled={!canNext2} className={outlineBtnClass}>
                Continue
              </button>
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="space-y-5">
            <div>
              <label
                htmlFor="ca-cv"
                className="careers-apply-label mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em]"
              >
                CV upload
              </label>
              <input
                id="ca-cv"
                name="cv"
                type="file"
                accept={ACCEPT_CV}
                required
                onChange={(e) => setCvFile(e.target.files?.[0] ?? null)}
                className="block w-full text-sm text-white/70 file:mr-4 file:rounded-none file:border file:border-white/30 file:bg-black file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
              />
              <p className="careers-apply-muted mt-2 text-xs">PDF or Word, max 5 MB</p>
              {cvFile ? (
                <p className="careers-apply-body mt-2 text-sm">
                  Selected: {cvFile.name} ({(cvFile.size / 1024).toFixed(0)} KB)
                </p>
              ) : null}
            </div>
            <p className="careers-apply-muted text-xs leading-relaxed">
              By submitting, you confirm the information is accurate and agree that we may contact you about this
              application. CVs contain personal data: please read our{" "}
              <Link href="/recruitment-privacy" className="careers-apply-link-strong font-semibold underline underline-offset-2">
                recruitment privacy notice
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="careers-apply-link-strong font-semibold underline underline-offset-2">
                privacy policy
              </Link>
              . APX Fire &amp; Security is an equal-opportunities employer.
            </p>
            <ConsentCheckbox
              id="careers-privacy-consent"
              checked={privacyConsent}
              onChange={setPrivacyConsent}
              required
            >
              I confirm I have read the recruitment privacy notice and privacy policy, and I understand APX will
              process my application for recruitment purposes.{" "}
              <span className="careers-apply-muted">(required)</span>
            </ConsentCheckbox>
            <TurnstileWidget onToken={setTurnstileToken} theme="dark" />
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-between sm:gap-4">
              <button type="button" onClick={goBack} disabled={submitting} className={outlineBtnClass}>
                Back
              </button>
              <FormSubmitButton
                disabled={submitting || !canSubmit}
                onSubmit={onSubmit}
                className="min-w-[200px]"
              >
                {submitting ? "Sending…" : "Submit application"}
              </FormSubmitButton>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
