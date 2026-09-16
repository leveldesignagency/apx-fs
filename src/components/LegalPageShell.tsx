"use client"

import Link from "next/link"
import { useTheme } from "@/contexts/ThemeContext"
import type { ReactNode } from "react"

type LegalPageShellProps = {
  title: string
  children: ReactNode
}

export function LegalPageShell({ title, children }: LegalPageShellProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div
      className="legal-page min-h-screen overflow-x-hidden"
      style={{ backgroundColor: isDark ? "#000000" : "#ffffff" }}
    >
      <div className="h-[0.75px] w-full bg-black dark:bg-white" />

      <section
        className={`page-title-band ${isDark ? "bg-black" : "bg-white"}`}
        style={{ backgroundColor: isDark ? "#000000" : "#ffffff" }}
      >
        <div className="site-container max-w-6xl pb-16 md:pb-20">
          <Link
            href="/"
            className={`mb-8 inline-block text-sm hover:underline ${
              isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"
            }`}
          >
            Back to Home
          </Link>

          <h1
            className={`mb-4 text-4xl font-bold leading-tight tracking-normal md:mb-5 md:text-5xl ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            {title}
          </h1>

          <p
            className={`mb-10 text-base leading-relaxed md:mb-12 md:text-lg ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Last updated:{" "}
            {new Date().toLocaleDateString("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <div
            className={`legal-page__body space-y-10 text-base leading-relaxed md:space-y-12 md:text-[1.05rem] md:leading-[1.7] ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {children}
          </div>
        </div>
      </section>

      <div className="h-[0.75px] w-full bg-black dark:bg-white" />
    </div>
  )
}

export function LegalSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <section className="legal-page__section">
      <h2
        className={`mb-4 text-2xl font-bold leading-snug tracking-normal md:mb-5 md:text-[1.65rem] ${
          isDark ? "text-white" : "text-black"
        }`}
      >
        {title}
      </h2>
      <div className="space-y-4 leading-relaxed">{children}</div>
    </section>
  )
}

export function LegalContactBox() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div
      className={`rounded-tl-2xl rounded-br-2xl border p-5 md:p-6 ${
        isDark ? "border-white/20 bg-white/5" : "border-black/15 bg-black/[0.03]"
      }`}
    >
      <p className="mb-2">
        <strong>APX Fire &amp; Security</strong>
      </p>
      <p className="mb-2 leading-relaxed">
        365-369 Bexley Road,
        <br />
        Northumberland Heath,
        <br />
        Erith, Kent, DA8 3EZ
      </p>
      <p className="mb-2">
        <strong>Email:</strong>{" "}
        <a href="mailto:enquiries@apx-fs.co.uk" className="underline hover:opacity-80">
          enquiries@apx-fs.co.uk
        </a>
      </p>
      <p>
        <strong>Telephone:</strong>{" "}
        <a href="tel:02083032280" className="underline hover:opacity-80">
          020 8303 2280
        </a>
      </p>
    </div>
  )
}
