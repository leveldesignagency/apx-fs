import type { MetadataRoute } from "next"
import { getFsSiteUrl } from "@/lib/seo"

export default function robots(): MetadataRoute.Robots {
  const base = getFsSiteUrl()
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${base}/sitemap.xml`,
  }
}
