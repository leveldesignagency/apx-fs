"use client"

import { useEffect, useId, useRef, useState, type FormEvent } from "react"
import Link from "next/link"
import { Check, Search } from "lucide-react"
import {
  checkFsServiceCoverage,
  type FsCoverageResult,
} from "@/lib/fs-service-coverage"
import { cn } from "@/lib/utils"

const SUCCESS_HOLD_MS = 5000

export function LocationsPostcodeCheck() {
  const inputId = useId()
  const resultId = useId()
  const [postcode, setPostcode] = useState("")
  const [result, setResult] = useState<FsCoverageResult>({ status: "empty" })
  const [success, setSuccess] = useState(false)
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current)
    }
  }, [])

  const clearResetTimer = () => {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current)
      resetTimerRef.current = null
    }
  }

  const resetToIdle = () => {
    clearResetTimer()
    setSuccess(false)
    setResult({ status: "empty" })
  }

  const onCheck = (e?: FormEvent) => {
    e?.preventDefault()
    if (success) return

    const next = checkFsServiceCoverage(postcode)
    if (next.status === "empty") {
      setSuccess(false)
      clearResetTimer()
      setResult({
        status: "invalid",
        message: "Enter a full UK postcode, for example DA8 3EZ.",
      })
      return
    }

    setResult(next)

    if (next.status === "covered") {
      setSuccess(true)
      clearResetTimer()
      resetTimerRef.current = setTimeout(() => {
        setSuccess(false)
        setResult({ status: "empty" })
        resetTimerRef.current = null
      }, SUCCESS_HOLD_MS)
      return
    }

    setSuccess(false)
    clearResetTimer()
  }

  return (
    <form
      className="mt-8 max-w-xl"
      onSubmit={onCheck}
      aria-describedby={result.status !== "empty" ? resultId : undefined}
    >
      <label
        htmlFor={inputId}
        className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-white/50"
        style={{ fontFamily: "var(--font-menu), sans-serif" }}
      >
        Search your postcode
      </label>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <div className="relative min-w-0 flex-1">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
            strokeWidth={2}
            aria-hidden
          />
          <input
            id={inputId}
            type="text"
            name="postcode"
            inputMode="text"
            autoComplete="postal-code"
            enterKeyHint="search"
            spellCheck={false}
            autoCapitalize="characters"
            placeholder="e.g. DA8 3EZ"
            value={postcode}
            disabled={success}
            onChange={(e) => {
              setPostcode(e.target.value)
              if (success) {
                resetToIdle()
                return
              }
              if (result.status !== "empty") setResult({ status: "empty" })
            }}
            className="w-full rounded-full border-[0.5px] border-white/30 bg-black/40 py-3.5 pl-11 pr-4 text-base font-semibold uppercase tracking-wide text-white outline-none placeholder:font-normal placeholder:normal-case placeholder:tracking-normal placeholder:text-white/35 focus:border-white/55 disabled:opacity-70"
          />
        </div>
        <button
          type="submit"
          disabled={success}
          aria-label={success ? "Coverage confirmed" : "Check coverage"}
          className={cn(
            "fs-coverage-check-btn relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border-[0.5px] border-white text-xs font-semibold uppercase tracking-[0.14em]",
            "transition-[width,min-width,max-width,padding,background-color,border-color,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            success
              ? "fs-coverage-check-btn--success h-[3.25rem] w-[3.25rem] min-w-[3.25rem] max-w-[3.25rem] px-0 py-0"
              : "h-[3.25rem] w-full min-w-[9.5rem] max-w-none px-6 py-3.5 sm:w-auto sm:self-stretch sm:h-auto"
          )}
          style={{ fontFamily: "var(--font-menu), sans-serif" }}
        >
          <span
            className={cn(
              "pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-300",
              success ? "opacity-100 delay-150" : "opacity-0"
            )}
            aria-hidden={!success}
          >
            <Check className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <span
            className={cn(
              "whitespace-nowrap transition-opacity duration-200",
              success ? "opacity-0" : "opacity-100"
            )}
          >
            Check coverage
          </span>
        </button>
      </div>

      {result.status !== "empty" ? (
        <p
          id={resultId}
          role="status"
          aria-live="polite"
          className={cn(
            "mt-4 text-sm leading-relaxed sm:text-base",
            result.status === "covered" && "text-white",
            result.status === "outside" && "text-white/75",
            result.status === "invalid" && "text-white/65"
          )}
        >
          {result.status === "covered" ? (
            <>
              <span className="font-semibold text-white">We cover your area. </span>
              {result.message}
            </>
          ) : null}
          {result.status === "outside" ? (
            <>
              <span className="font-semibold text-white">Outside our usual area. </span>
              {result.message}{" "}
              <Link href="/contact" className="underline underline-offset-4 hover:text-white">
                Contact us
              </Link>
              .
            </>
          ) : null}
          {result.status === "invalid" ? result.message : null}
        </p>
      ) : null}
    </form>
  )
}
