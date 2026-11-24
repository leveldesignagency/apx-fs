import type { Metadata } from "next"
import { DeliveryMethodologyPageContent } from "@/components/DeliveryMethodologyPageContent"
import { buildFsMetadata } from "@/lib/seo-metadata"
import { FsBreadcrumbJsonLd } from "@/components/seo/FsBreadcrumbJsonLd"
import { JsonLd } from "@/components/seo/JsonLd"
import { buildDeliveryHowToJsonLd, buildWebPageJsonLd } from "@/lib/seo-jsonld"

const DESCRIPTION =
  "How APX Fire & Security delivers projects: survey, design, planning, installation, commissioning, certification, handover and maintenance across London and the Home Counties."

export const metadata: Metadata = buildFsMetadata({
  title: "Delivery Methodology | Fire & Security Projects | London & South East | APX",
  description: DESCRIPTION,
  pathname: "/delivery-methodology",
})

export default function DeliveryMethodologyPage() {
  return (
    <>
      <FsBreadcrumbJsonLd crumbs={[{ name: "Delivery methodology", path: "/delivery-methodology" }]} />
      <JsonLd
        data={[
          buildWebPageJsonLd({
            name: "Delivery Methodology | APX Fire & Security",
            description: DESCRIPTION,
            pathname: "/delivery-methodology",
            speakableSelectors: ["h1", ".aeo-direct-answer"],
          }),
          buildDeliveryHowToJsonLd(),
        ]}
      />
      <DeliveryMethodologyPageContent />
    </>
  )
}
