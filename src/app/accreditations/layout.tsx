import type { Metadata } from "next"
import { buildFsMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = buildFsMetadata({
  title: "Accreditations | NSI, BAFE, Constructionline & FIA | APX Fire & Security",
  description:
    "Independent certifications and industry affiliations that underpin how APX Fire & Security delivers fire and security systems across London and the Home Counties.",
  pathname: "/accreditations",
})

export default function AccreditationsLayout({ children }: { children: React.ReactNode }) {
  return children
}
