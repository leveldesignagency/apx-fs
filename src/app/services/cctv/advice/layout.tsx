import type { Metadata } from "next"
import { buildFsMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = buildFsMetadata({
  title: "CCTV Advice & Guidance | Security Consultants | APX",
  description:
    "Expert guidance on CCTV specification, coverage, privacy and compliance — supporting projects across Greater London and the South East.",
  pathname: "/services/cctv/advice",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
