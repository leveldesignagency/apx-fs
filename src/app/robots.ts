import type { MetadataRoute } from "next"
import { getFsSiteUrl } from "@/lib/seo"

const PRIVATE_PATHS = ["/api/", "/thank-you", "/x/", "/email-signatures/"]

const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "Google-Extended",
  "GoogleOther",
  "PerplexityBot",
  "ClaudeBot",
  "anthropic-ai",
  "Claude-Web",
  "Applebot-Extended",
  "Amazonbot",
  "CCBot",
  "Bytespider",
  "cohere-ai",
  "YouBot",
  "DuckAssistBot",
] as const

export default function robots(): MetadataRoute.Robots {
  const base = getFsSiteUrl()
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [...PRIVATE_PATHS, "/_next/"],
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: PRIVATE_PATHS,
      })),
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base.replace(/^https?:\/\//, ""),
  }
}
