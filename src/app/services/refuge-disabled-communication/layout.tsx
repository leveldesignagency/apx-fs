import type { Metadata } from "next"
import { buildFsMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = buildFsMetadata({
  title: "Refuge & Disabled Communication Systems | EVC London | APX",
  description:
    "Emergency voice communication, disabled refuge points, fire telephones and toilet alarms — BS 5839-9 aligned design, installation and commissioning across London and the Home Counties.",
  pathname: "/services/refuge-disabled-communication",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
