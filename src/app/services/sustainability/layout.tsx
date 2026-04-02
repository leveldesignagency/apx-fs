import type { Metadata } from "next"
import { buildFsMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = buildFsMetadata({
  title: "Sustainable Fire & Security Systems | Low-Carbon Design | APX",
  description:
    "Responsible specification and lifecycle thinking for fire and security systems — supporting environmental targets across London and South East commercial and public-sector estates.",
  pathname: "/services/sustainability",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
