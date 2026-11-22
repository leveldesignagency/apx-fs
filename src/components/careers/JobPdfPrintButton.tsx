"use client"

const btnBase =
  "job-pdf-screen-only inline-flex h-11 items-center justify-center px-5 text-sm font-semibold transition-colors"

export function JobPdfActions() {
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
        onClick={() => window.print()}
        className={`${btnBase} border border-neutral-900 bg-neutral-900 text-white hover:bg-black`}
        title="Opens the print dialog. Choose Save as PDF as the destination."
      >
        Save as PDF
      </button>
    </div>
  )
}

/** @deprecated use JobPdfActions */
export function JobPdfPrintButton() {
  return <JobPdfActions />
}
