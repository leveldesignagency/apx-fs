"use client"

export function JobPdfPrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="job-pdf-screen-only inline-flex h-11 items-center justify-center border border-neutral-900 bg-neutral-900 px-5 text-sm font-semibold text-white transition-colors hover:bg-black"
    >
      Print / Save as PDF
    </button>
  )
}
