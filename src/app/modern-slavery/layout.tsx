import type { Metadata } from "next"
import { buildFsMetadata } from "@/lib/seo-metadata"
import { FsBreadcrumbJsonLd } from "@/components/seo/FsBreadcrumbJsonLd"

export const metadata: Metadata = buildFsMetadata({
  title: "Modern Slavery Statement | APX Fire & Security",
  description:
    "APX Fire & Security statement on preventing modern slavery and human trafficking in our business and supply chain.",
  pathname: "/modern-slavery",
  robots: { index: true, follow: true },
})

export default function ModernSlaveryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FsBreadcrumbJsonLd crumbs={[{ name: "Modern Slavery Statement", path: "/modern-slavery" }]} />
      {children}
    </>
  )
}
