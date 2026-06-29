"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
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
      className="min-h-screen overflow-x-hidden"
      style={{ backgroundColor: isDark ? "#000000" : "#ffffff" }}
    >
      <div className="w-full h-[0.75px] bg-black dark:bg-white" />

      <section
        className={`page-title-band ${isDark ? "bg-black" : "bg-white"}`}
        style={{ backgroundColor: isDark ? "#000000" : "#ffffff" }}
      >
        <div className="container mx-auto px-6 max-w-4xl pb-16">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 mb-8 text-sm hover:underline ${
              isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? "text-white" : "text-black"}`}>
            {title}
          </h1>

          <p className={`text-lg mb-8 leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            Last updated:{" "}
            {new Date().toLocaleDateString("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <div className={`space-y-8 ${isDark ? "text-gray-300" : "text-gray-700"}`}>{children}</div>
        </div>
      </section>

      <div className="w-full h-[0.75px] bg-black dark:bg-white" />
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
    <section>
      <h2 className={`text-2xl font-bold mb-4 ${isDark ? "text-white" : "text-black"}`}>{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  )
}

export function LegalContactBox() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div
      className={`p-4 rounded-lg ${
        isDark ? "bg-gray-900 border border-gray-700" : "bg-gray-50 border border-gray-300"
      }`}
    >
      <p className="mb-2">
        <strong>APX Fire &amp; Security</strong>
      </p>
      <p className="mb-2">
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
