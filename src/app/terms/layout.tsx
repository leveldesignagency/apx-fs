import type { Metadata } from "next"
import { buildFsMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = buildFsMetadata({
  title: "Terms of Service | APX Fire & Security",
  description:
    "Terms governing use of the APX Fire & Security website, including enquiries, content, intellectual property and liability.",
  pathname: "/terms",
  robots: { index: true, follow: true },
})

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children
}
