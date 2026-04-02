import type { Metadata } from "next"
import { buildFsMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = buildFsMetadata({
  title: "About Us | Fire & Security Specialists | London, Kent & Essex | APX",
  description:
    "APX Fire & Security: NSI and BAFE-aligned fire alarms, CCTV, access control and life-safety delivery across Greater London, every borough, and the Home Counties including Kent, Essex and Surrey.",
  pathname: "/about",
})

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
