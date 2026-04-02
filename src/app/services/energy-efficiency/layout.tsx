import type { Metadata } from "next"
import { buildFsMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = buildFsMetadata({
  title: "Energy efficiency & building performance | Fire & security systems | APX",
  description:
    "Practical energy efficiency measures for mechanical and electrical systems supporting fire and security performance — commercial and public-sector projects across London and the Home Counties.",
  pathname: "/services/energy-efficiency",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
