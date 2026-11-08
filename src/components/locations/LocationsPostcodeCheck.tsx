"use client"

import { useEffect, useId, useRef, useState, type FormEvent } from "react"
import { createPortal } from "react-dom"
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
  const [portalReady, setPortalReady] = useState(false)
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setPortalReady(true)
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
    <>
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
            aria-label="Check coverage"
            className={cn(
              "fs-coverage-check-btn relative inline-flex h-[3.25rem] w-full min-w-[10.5rem] shrink-0 items-center justify-center overflow-hidden rounded-full border-[0.5px] border-white px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] sm:w-auto sm:self-stretch sm:h-auto sm:text-[0.9375rem]",
              "transition-colors duration-300"
            )}
            style={{ fontFamily: "var(--font-menu), sans-serif" }}
          >
            Check coverage
          </button>
        </div>

        {result.status !== "empty" && result.status !== "covered" ? (
          <p
            id={resultId}
            role="status"
            aria-live="polite"
            className={cn(
              "mt-4 text-sm leading-relaxed sm:text-base",
              result.status === "outside" && "text-white/75",
              result.status === "invalid" && "text-white/65"
            )}
          >
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

      {portalReady && success && result.status === "covered"
        ? createPortal(
            <div
              className="fs-coverage-success-overlay fixed inset-0 z-[220] flex items-center justify-center px-6"
              role="status"
              aria-live="polite"
            >
              <div className="absolute inset-0 bg-black/70" aria-hidden />
              <div className="relative flex flex-col items-center gap-5 text-center">
                <div className="fs-coverage-success-badge flex h-20 w-20 items-center justify-center rounded-full bg-[#16a34a] text-white shadow-[0_12px_40px_rgba(22,163,74,0.45)] sm:h-24 sm:w-24">
                  <Check className="h-10 w-10 sm:h-12 sm:w-12" strokeWidth={2.75} aria-hidden />
                </div>
                <div className="max-w-sm">
                  <p
                    className="text-xl font-bold uppercase tracking-[0.06em] text-white sm:text-2xl"
                    style={{ fontFamily: "var(--font-menu), sans-serif" }}
                  >
                    We cover your area
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/75 sm:text-base">{result.message}</p>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  )
}
