import { fsJsonLdGraph } from "@/lib/seo"

export function RootJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(fsJsonLdGraph()) }}
    />
  )
}
