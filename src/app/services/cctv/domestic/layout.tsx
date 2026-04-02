import type { Metadata } from "next"
import { buildFsMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = buildFsMetadata({
  title: "Home CCTV Systems | Residential Security London & Home Counties | APX",
  description:
    "Domestic CCTV and smart security — discreet installation, app-based viewing and reliable recording for homes across London boroughs and Surrey, Kent and Essex.",
  pathname: "/services/cctv/domestic",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
