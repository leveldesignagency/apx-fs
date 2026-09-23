import type { Metadata } from "next"
import { buildFsMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = buildFsMetadata({
  title: "Domestic CCTV | Residential Survey London & Home Counties | APX",
  description:
    "Secondary residential CCTV offering from APX: survey-led home systems across London and the Home Counties. Privacy guidance at handover; householder remains responsible for lawful use under UK GDPR. Quotes follow survey, no online package prices.",
  pathname: "/services/cctv/domestic",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
