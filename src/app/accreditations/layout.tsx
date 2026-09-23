import type { Metadata } from "next"
import { buildFsMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = buildFsMetadata({
  title: "Accreditations & Memberships | NSI, BAFE, Constructionline & FIA | APX",
  description:
    "APX Fire & Security accreditations and memberships: NSI Gold, BAFE registration, Constructionline Gold and FIA membership, presented clearly for procurement and duty holders.",
  pathname: "/accreditations",
})

export default function AccreditationsLayout({ children }: { children: React.ReactNode }) {
  return children
}
