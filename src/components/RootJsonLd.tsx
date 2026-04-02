import { fsJsonLdGraph } from "@/lib/seo"

/** Organization + WebSite + ProfessionalService JSON-LD for GEO and rich results */
export function RootJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(fsJsonLdGraph()) }}
    />
  )
}
