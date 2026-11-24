import type { Metadata } from "next"
import { buildFsMetadata } from "@/lib/seo-metadata"
import { FsBreadcrumbJsonLd } from "@/components/seo/FsBreadcrumbJsonLd"
import { JsonLd } from "@/components/seo/JsonLd"
import { ABOUT_FAQ_ITEMS } from "@/lib/hub-faq-content"
import { fsOrganizationDescription } from "@/lib/seo"
import { buildAboutPageJsonLd, buildFaqPageJsonLd } from "@/lib/seo-jsonld"

const ABOUT_DESCRIPTION =
  "APX Fire & Security: NSI and BAFE-aligned fire alarms, CCTV and access control across London and the Home Counties. Formerly Smiths Technical Systems Ltd."

export const metadata: Metadata = buildFsMetadata({
  title: "About Us | Fire & Security Specialists | London, Kent & Essex | APX",
  description: ABOUT_DESCRIPTION,
  pathname: "/about",
})

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FsBreadcrumbJsonLd crumbs={[{ name: "About", path: "/about" }]} />
      <JsonLd
        data={[
          buildAboutPageJsonLd({
            name: "About APX Fire & Security",
            description: fsOrganizationDescription(),
            pathname: "/about",
          }),
          buildFaqPageJsonLd(ABOUT_FAQ_ITEMS, { pathname: "/about" }),
        ]}
      />
      {children}
    </>
  )
}
