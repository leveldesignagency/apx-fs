import type { Metadata } from "next"
import { buildFsMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = buildFsMetadata({
  title: "Electrical Systems for Fire & Security | Power & Containment | APX",
  description:
    "Electrical distribution, containment and small power for fire alarms, CCTV and access control — compliant installations across Greater London and the Home Counties.",
  pathname: "/services/electrical-systems",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
