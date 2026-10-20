import type { Metadata } from "next"
import { buildFsMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = buildFsMetadata({
  title: "Privacy Policy | APX Fire & Security",
  description:
    "How APX Fire & Security collects, uses and protects personal data when you use our website or contact us about Fire and Security services.",
  pathname: "/privacy",
  robots: { index: true, follow: true },
})

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children
}
