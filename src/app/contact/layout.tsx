import type { Metadata } from "next"
import { buildFsMetadata } from "@/lib/seo-metadata"
import { FsBreadcrumbJsonLd } from "@/components/seo/FsBreadcrumbJsonLd"
import { JsonLd } from "@/components/seo/JsonLd"
import { CONTACT_FAQ_ITEMS } from "@/lib/contact-faq-content"
import { buildContactPageJsonLd, buildFaqPageJsonLd } from "@/lib/seo-jsonld"

const CONTACT_DESCRIPTION =
  "Contact APX Fire & Security for fire alarms, CCTV, access control quotes and maintenance across London and the Home Counties."

export const metadata: Metadata = buildFsMetadata({
  title: "Contact | Fire Alarm & CCTV Quotes | London & Home Counties | APX",
  description: CONTACT_DESCRIPTION,
  pathname: "/contact",
})

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FsBreadcrumbJsonLd crumbs={[{ name: "Contact", path: "/contact" }]} />
      <JsonLd
        data={[
          buildContactPageJsonLd({
            name: "Contact APX Fire & Security",
            description: CONTACT_DESCRIPTION,
            pathname: "/contact",
          }),
          buildFaqPageJsonLd(CONTACT_FAQ_ITEMS, { pathname: "/contact" }),
        ]}
      />
      {children}
    </>
  )
}
