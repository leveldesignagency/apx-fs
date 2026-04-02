import type { Metadata } from "next"
import { buildFsMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = buildFsMetadata({
  title: "Contact | Fire Alarm & CCTV Quotes | London & Home Counties | APX",
  description:
    "Contact APX Fire & Security for fire alarms, CCTV, access control and security maintenance — free surveys and expert advice across Greater London, Kent, Essex, Surrey and the Home Counties.",
  pathname: "/contact",
})

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
