import type { Metadata } from "next"
import { buildFsMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = buildFsMetadata({
  title: "Fire & Security Services | Design, Install & Maintenance | APX",
  description:
    "Fire alarms, CCTV, access control, intruder alarms, maintenance and compliance — end-to-end fire and security services for London, Kent, Essex, Surrey, Hertfordshire and the wider Home Counties.",
  pathname: "/services",
})

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
