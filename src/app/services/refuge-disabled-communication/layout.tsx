import type { Metadata } from "next"
import { buildFsMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = buildFsMetadata({
  title: "Disabled Refuge, Fire Telephone & Toilet Alarms | BS 5839-9 | APX",
  description:
    "Disabled refuge systems, fire telephone systems, disabled toilet alarms and central EVC control panels with two-way communication. BS 5839-9 design, installation, commissioning, testing and maintenance across London and the Home Counties.",
  pathname: "/services/refuge-disabled-communication",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
