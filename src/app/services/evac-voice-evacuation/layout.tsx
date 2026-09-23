import type { Metadata } from "next"
import { buildFsMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = buildFsMetadata({
  title: "EVAC & Voice Alarm Systems | BS 5839-8 | London | APX",
  description:
    "EVAC / voice alarm / voice evacuation and PA/VA systems to BS 5839-8: zoned and phased messaging, fire alarm integration, amplifiers and loudspeakers, cause-and-effect testing, commissioning and maintenance across London and the Home Counties.",
  pathname: "/services/evac-voice-evacuation",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
