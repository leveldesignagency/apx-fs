"use client"

import { useId, useState, type FormEvent } from "react"
import Link from "next/link"
import { Search } from "lucide-react"
import {
  checkFsServiceCoverage,
  type FsCoverageResult,
} from "@/lib/fs-service-coverage"
import { cn } from "@/lib/utils"

export function LocationsPostcodeCheck() {
  const inputId = useId()
  const resultId = useId()
  const [postcode, setPostcode] = useState("")
  const [result, setResult] = useState<FsCoverageResult>({ status: "empty" })

  const onCheck = (e?: FormEvent) => {
    e?.preventDefault()
    setResult(checkFsServiceCoverage(postcode))
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
            onChange={(e) => {
              setPostcode(e.target.value)
              if (result.status !== "empty") setResult({ status: "empty" })
            }}
            className="w-full rounded-full border-[0.5px] border-white/30 bg-black/40 py-3.5 pl-11 pr-4 text-base font-semibold uppercase tracking-wide text-white outline-none placeholder:font-normal placeholder:normal-case placeholder:tracking-normal placeholder:text-white/35 focus:border-white/55"
          />
        </div>
        <button
          type="submit"
          className="fs-coverage-check-btn inline-flex shrink-0 items-center justify-center rounded-full border-[0.5px] border-white px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] transition-colors"
          style={{ fontFamily: "var(--font-menu), sans-serif" }}
        >
          Check coverage
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
              <span className="font-semibold text-white">You&apos;re covered. </span>
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
