import type { Metadata } from "next"
import { buildFsMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = buildFsMetadata({
  title: "Cookie Policy | APX Fire & Security",
  description: "How APX Fire & Security uses cookies and similar technologies on this website.",
  pathname: "/cookie-policy",
  robots: { index: true, follow: true },
})

export default function CookiePolicyLayout({ children }: { children: React.ReactNode }) {
  return children
}
