import type { Metadata } from "next"
import { buildFsMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = buildFsMetadata({
  title: "Fire & Security Maintenance | PPM & 24/7 Support | London | APX",
  description:
    "Planned preventative maintenance and reactive support for fire alarms, CCTV and access control — keeping systems compliant across Greater London, Kent, Essex and Surrey.",
  pathname: "/services/maintenance",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
