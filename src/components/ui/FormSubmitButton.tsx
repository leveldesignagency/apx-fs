"use client"

import { useState, useRef } from "react"
import { cn } from "@/lib/utils"

/** Compact progress ring (r=12 in 32×32 viewBox) */
const R = 12
const CX = 16
const CY = 16
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * R
const CHECK_LENGTH = 24
const RUN_DURATION_MS = 2000
const RESET_AFTER_DONE_MS = 1500

export interface FormSubmitButtonProps {
  children?: React.ReactNode
  className?: string
  disabled?: boolean
  /** Called when button is clicked (before animation). Return a Promise to run progress; resolve when submit finishes. */
  onSubmit?: () => void | Promise<void>
}

export function FormSubmitButton({
  children = "Submit",
  className,
  disabled,
  onSubmit,
}: FormSubmitButtonProps) {
  const [state, setState] = useState<"idle" | "running" | "done">("idle")
  const runTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (state !== "idle" || disabled) return
    e.preventDefault()
    e.stopPropagation()
    setState("running")

    if (onSubmit) {
      try {
        await onSubmit()
      } catch {
        setState("idle")
        return
      }
    }

    if (runTimeoutRef.current) clearTimeout(runTimeoutRef.current)
    if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current)

    runTimeoutRef.current = setTimeout(() => {
      setState("done")
      runTimeoutRef.current = null
      resetTimeoutRef.current = setTimeout(() => {
        setState("idle")
        resetTimeoutRef.current = null
      }, RESET_AFTER_DONE_MS)
    }, 600 + RUN_DURATION_MS)
  }

  const isBusy = state === "running" || state === "done"

  return (
    <button
      type="submit"
      className={cn("form-submit-btn", state === "running" && "form-submit-btn--running", state === "done" && "form-submit-btn--done", className)}
      disabled={disabled || isBusy}
      onClick={handleClick}
      aria-busy={state === "running"}
      aria-live="polite"
    >
      <span className="form-submit-btn__text">{children}</span>
      <svg className="form-submit-btn__progress" viewBox="0 0 32 32" width={32} height={32} aria-hidden>
        <circle
          className="form-submit-btn__progress-track"
          r={R}
          cx={CX}
          cy={CY}
          fill="none"
          strokeWidth={5}
        />
        <circle
          className="form-submit-btn__progress-fill"
          r={R}
          cx={CX}
          cy={CY}
          fill="none"
          strokeWidth={5}
          transform={`rotate(-90 ${CX} ${CY})`}
          strokeDasharray={`${CIRCLE_CIRCUMFERENCE} ${CIRCLE_CIRCUMFERENCE}`}
          strokeDashoffset={state === "idle" || state === "done" ? CIRCLE_CIRCUMFERENCE : 0}
        />
        <polyline
          className="form-submit-btn__progress-check"
          points="8,16 13,21 24,11"
          fill="none"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={`${CHECK_LENGTH} ${CHECK_LENGTH}`}
          strokeDashoffset={state === "done" ? 0 : CHECK_LENGTH}
        />
      </svg>
    </button>
  )
}
