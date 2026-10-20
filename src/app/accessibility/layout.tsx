import type { Metadata } from "next"
import { buildFsMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = buildFsMetadata({
  title: "Accessibility Statement | APX Fire & Security",
  description:
    "How APX Fire & Security works to keep apx-fs.co.uk accessible, including WCAG aims, known limits, and how to request content in another format.",
  pathname: "/accessibility",
})

export default function AccessibilityLayout({ children }: { children: React.ReactNode }) {
  return children
}
