"use client"

import { useState, useRef } from "react"
import { cn } from "@/lib/utils"

const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * 20 // r=20 → ~125.66
const CHECK_LENGTH = 34
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
      <svg className="form-submit-btn__progress" viewBox="0 0 48 48" width={48} height={48} aria-hidden>
        <circle
          className="form-submit-btn__progress-track"
          r={20}
          cx={24}
          cy={24}
          fill="none"
          strokeWidth={8}
        />
        <circle
          className="form-submit-btn__progress-fill"
          r={20}
          cx={24}
          cy={24}
          fill="none"
          strokeWidth={8}
          transform="rotate(-90 24 24)"
          strokeDasharray={`${CIRCLE_CIRCUMFERENCE} ${CIRCLE_CIRCUMFERENCE}`}
          strokeDashoffset={state === "idle" || state === "done" ? CIRCLE_CIRCUMFERENCE : 0}
        />
        <polyline
          className="form-submit-btn__progress-check"
          points="12,24 20,32 36,16"
          fill="none"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={`${CHECK_LENGTH} ${CHECK_LENGTH}`}
          strokeDashoffset={state === "done" ? 0 : CHECK_LENGTH}
        />
      </svg>
    </button>
  )
}
