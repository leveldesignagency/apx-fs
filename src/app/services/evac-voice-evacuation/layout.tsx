import type { Metadata } from "next"
import { buildFsMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = buildFsMetadata({
  title: "EVAC & Voice Evacuation Systems | London | APX",
  description:
    "Voice evacuation and public address integration — BS 5839-8 aligned design, installation, audio testing and commissioning for commercial and public-sector buildings.",
  pathname: "/services/evac-voice-evacuation",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
