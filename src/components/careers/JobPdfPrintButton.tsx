"use client"

import { useState } from "react"
import type { CareerRole } from "@/components/careers/careers-types"
import { downloadCareerRolePdf } from "@/lib/career-role-pdf"

const btnBase =
  "job-pdf-screen-only inline-flex h-11 items-center justify-center px-5 text-sm font-semibold transition-colors disabled:cursor-wait disabled:opacity-60"

export function JobPdfActions({ role }: { role: CareerRole }) {
  const [saving, setSaving] = useState(false)

  const onSavePdf = async () => {
    if (saving) return
    setSaving(true)
    try {
      await downloadCareerRolePdf(role)
    } catch {
      // Fall back only if PDF generation fails
      window.print()
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="job-pdf-screen-only flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={() => window.print()}
        className={`${btnBase} border border-neutral-900 bg-white text-neutral-900 hover:bg-neutral-100`}
      >
        Print
      </button>
      <button
        type="button"
        onClick={() => void onSavePdf()}
        disabled={saving}
        className={`${btnBase} border border-neutral-900 bg-neutral-900 text-white hover:bg-black`}
      >
        {saving ? "Preparing PDF…" : "Save as PDF"}
      </button>
    </div>
  )
}

/** @deprecated use JobPdfActions */
export function JobPdfPrintButton({ role }: { role: CareerRole }) {
  return <JobPdfActions role={role} />
}
