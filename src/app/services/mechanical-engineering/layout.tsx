import type { Metadata } from "next"
import { buildFsMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = buildFsMetadata({
  title: "Mechanical Engineering & HVAC Interfaces | Fire & Security | APX",
  description:
    "Mechanical coordination for fire and security systems — plant, ventilation and building services interfaces across London, Kent, Essex and the Home Counties.",
  pathname: "/services/mechanical-engineering",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
