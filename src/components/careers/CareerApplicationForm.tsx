"use client"

import Link from "next/link"
import { useCallback, useEffect, useId, useRef, useState, type DragEvent, type ReactNode } from "react"
import { Check, CheckCircle2, FileText, Upload, X } from "lucide-react"
import type { CareerRole } from "@/components/careers/careers-types"
import { FormSubmitButton } from "@/components/ui/FormSubmitButton"
import { TurnstileWidget } from "@/components/TurnstileWidget"
import { cn } from "@/lib/utils"

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
  "careers-apply-field w-full rounded-none border border-white/30 bg-black px-4 py-3.5 text-sm text-white placeholder:text-white/35 outline-none transition-[border,box-shadow] focus:border-white/55 focus:ring-0"

const outlineBtnClass =
  "careers-apply-outline-btn inline-flex h-12 items-center justify-center rounded-none border border-white/30 px-6 text-sm font-semibold text-white transition-colors enabled:hover:border-white/55 enabled:hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"

const MAX_CV_BYTES = 5 * 1024 * 1024
const ACCEPT_CV =
  ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"

const STEPS = ["Your details", "Experience", "CV & submit"] as const

type Step = 1 | 2 | 3
type CvPhase = "empty" | "uploading" | "ready"

function isAllowedCv(file: File) {
  const name = file.name.toLowerCase()
  return (
    name.endsWith(".pdf") ||
    name.endsWith(".doc") ||
    name.endsWith(".docx") ||
    file.type === "application/pdf" ||
    file.type === "application/msword" ||
    file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  )
}

function truncateFileName(name: string, max = 28) {
  if (name.length <= max) return name
  const dot = name.lastIndexOf(".")
  const ext = dot > 0 ? name.slice(dot) : ""
  const base = dot > 0 ? name.slice(0, dot) : name
  const keep = Math.max(8, max - ext.length - 1)
  return `${base.slice(0, keep)}…${ext}`
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function CareerApplicationForm({
  role,
}: {
  role: CareerRole
}) {
  const cvInputId = useId()
  const cvInputRef = useRef<HTMLInputElement>(null)
  const uploadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [step, setStep] = useState<Step>(1)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [experience, setExperience] = useState("")
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [cvPhase, setCvPhase] = useState<CvPhase>("empty")
  const [cvProgress, setCvProgress] = useState(0)
  const [cvError, setCvError] = useState<string | null>(null)
  const [cvDragging, setCvDragging] = useState(false)
  /** honeypot */
  const [hp, setHp] = useState("")
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [privacyConsent, setPrivacyConsent] = useState(false)

  useEffect(() => {
    return () => {
      if (uploadTimerRef.current) clearTimeout(uploadTimerRef.current)
    }
  }, [])

  const clearCv = useCallback(() => {
    if (uploadTimerRef.current) clearTimeout(uploadTimerRef.current)
    setCvFile(null)
    setCvPhase("empty")
    setCvProgress(0)
    setCvError(null)
    if (cvInputRef.current) cvInputRef.current.value = ""
  }, [])

  const acceptCvFile = useCallback((file: File | null | undefined) => {
    if (!file) return
    setCvError(null)
    if (!isAllowedCv(file)) {
      setCvError("Please upload a PDF or Word document.")
      clearCv()
      return
    }
    if (file.size <= 0 || file.size > MAX_CV_BYTES) {
      setCvError("File must be under 5 MB.")
      clearCv()
      return
    }

    if (uploadTimerRef.current) clearTimeout(uploadTimerRef.current)
    setCvFile(file)
    setCvPhase("uploading")
    setCvProgress(8)

    const started = performance.now()
    const tick = () => {
      const elapsed = performance.now() - started
      const next = Math.min(96, 8 + (elapsed / 700) * 88)
      setCvProgress(next)
      if (elapsed < 700) {
        uploadTimerRef.current = setTimeout(tick, 40)
        return
      }
      setCvProgress(100)
      uploadTimerRef.current = setTimeout(() => {
        setCvPhase("ready")
        setCvProgress(100)
      }, 180)
    }
    uploadTimerRef.current = setTimeout(tick, 40)
  }, [clearCv])

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
              <p className="careers-apply-label mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em]">
                CV upload
              </p>
              <input
                ref={cvInputRef}
                id={cvInputId}
                name="cv"
                type="file"
                accept={ACCEPT_CV}
                required={!cvFile}
                className="sr-only"
                onChange={(e) => acceptCvFile(e.target.files?.[0] ?? null)}
              />

              <div
                className={cn(
                  "careers-cv-dropzone relative overflow-hidden rounded-xl border border-dashed transition-colors",
                  cvDragging
                    ? "border-white bg-white/[0.07]"
                    : cvPhase === "ready"
                      ? "border-white/45 bg-white/[0.04]"
                      : "border-white/35 bg-black/30 hover:border-white/55 hover:bg-white/[0.05]",
                  cvPhase === "empty" && "cursor-pointer"
                )}
                onDragEnter={(e: DragEvent) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setCvDragging(true)
                }}
                onDragOver={(e: DragEvent) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setCvDragging(true)
                }}
                onDragLeave={(e: DragEvent) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setCvDragging(false)
                }}
                onDrop={(e: DragEvent) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setCvDragging(false)
                  acceptCvFile(e.dataTransfer.files?.[0] ?? null)
                }}
                onClick={() => {
                  if (cvPhase === "empty") cvInputRef.current?.click()
                }}
                onKeyDown={(e) => {
                  if (cvPhase !== "empty") return
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    cvInputRef.current?.click()
                  }
                }}
                role={cvPhase === "empty" ? "button" : undefined}
                tabIndex={cvPhase === "empty" ? 0 : undefined}
                aria-label={cvPhase === "empty" ? "Upload CV" : undefined}
              >
                {cvPhase === "empty" ? (
                  <div className="flex min-h-[11.5rem] flex-col items-center justify-center gap-3 px-5 py-8 text-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/5">
                      <Upload className="h-5 w-5 text-white" aria-hidden />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">Upload here</p>
                      <p className="careers-apply-muted mt-1.5 text-xs leading-relaxed">
                        Drag &amp; drop your CV, or tap to browse
                      </p>
                    </div>
                    <p className="careers-apply-muted text-[11px] uppercase tracking-[0.14em]">
                      PDF or Word · max 5 MB
                    </p>
                  </div>
                ) : null}

                {cvPhase === "uploading" && cvFile ? (
                  <div className="flex min-h-[11.5rem] flex-col justify-center gap-4 px-5 py-8">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-white/5">
                        <FileText className="h-5 w-5 text-white" aria-hidden />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-white">{truncateFileName(cvFile.name, 36)}</p>
                        <p className="careers-apply-muted mt-0.5 text-xs">Uploading…</p>
                      </div>
                    </div>
                    <div
                      className="h-1.5 w-full overflow-hidden rounded-full bg-white/15"
                      role="progressbar"
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={Math.round(cvProgress)}
                      aria-label="Upload progress"
                    >
                      <div
                        className="h-full rounded-full bg-white transition-[width] duration-75 ease-out"
                        style={{ width: `${cvProgress}%` }}
                      />
                    </div>
                  </div>
                ) : null}

                {cvPhase === "ready" && cvFile ? (
                  <div className="flex min-h-[11.5rem] flex-col items-center justify-center px-5 py-7 text-center">
                    <div className="relative flex h-[4.75rem] w-[4.75rem] items-center justify-center rounded-xl border border-white/25 bg-white/[0.07]">
                      <FileText className="h-8 w-8 text-white" aria-hidden />
                      <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400 text-black">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                      </span>
                    </div>
                    <p className="mt-4 max-w-full truncate px-2 text-sm font-semibold text-white" title={cvFile.name}>
                      {truncateFileName(cvFile.name, 34)}
                    </p>
                    <p className="careers-apply-muted mt-1 text-xs">{formatFileSize(cvFile.size)}</p>
                    <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                      <button
                        type="button"
                        className="rounded-none border border-white/30 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:border-white/55 hover:bg-white/5"
                        onClick={(e) => {
                          e.stopPropagation()
                          cvInputRef.current?.click()
                        }}
                      >
                        Replace
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 rounded-none border border-white/30 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:border-white/55 hover:bg-white/5"
                        onClick={(e) => {
                          e.stopPropagation()
                          clearCv()
                        }}
                      >
                        <X className="h-3.5 w-3.5" aria-hidden />
                        Remove
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>

              {cvError ? (
                <p className="mt-2 text-sm text-red-300" role="alert">
                  {cvError}
                </p>
              ) : (
                <p className="careers-apply-muted mt-2 text-xs">PDF or Word, max 5 MB</p>
              )}
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
            <div className="careers-apply-actions flex flex-col gap-3 pt-2 sm:flex-row sm:items-stretch sm:justify-between sm:gap-4">
              <button
                type="button"
                onClick={goBack}
                disabled={submitting}
                className={`${outlineBtnClass} w-full sm:w-auto sm:min-w-[7.5rem]`}
              >
                Back
              </button>
              <FormSubmitButton
                disabled={submitting || !canSubmit || cvPhase !== "ready"}
                onSubmit={onSubmit}
                className="careers-apply-submit w-full min-w-0 sm:min-w-[12.5rem] sm:w-auto"
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
