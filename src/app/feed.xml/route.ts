import { getNewsArticlesSorted } from "@/data/fsNewsArticles"
import { FS_SITE_NAME, fsAbsoluteUrl, fsDefaultDescription, getFsSiteUrl } from "@/lib/seo"

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

export function GET() {
  const base = getFsSiteUrl()
  const articles = getNewsArticlesSorted()
  const items = articles
    .map((article) => {
      const link = fsAbsoluteUrl(`/news/${article.slug}`)
      const pubDate = new Date(`${article.publishedAt}T09:00:00.000Z`).toUTCString()
      return `    <item>
      <title>${xmlEscape(article.title)}</title>
      <link>${xmlEscape(link)}</link>
      <guid isPermaLink="true">${xmlEscape(link)}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${xmlEscape(article.excerpt)}</description>
    </item>`
    })
    .join("\n")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(FS_SITE_NAME)} news</title>
    <link>${xmlEscape(base)}</link>
    <description>${xmlEscape(fsDefaultDescription())}</description>
    <language>en-GB</language>
    <atom:link href="${xmlEscape(`${base}/feed.xml`)}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=1800, s-maxage=1800",
    },
  })
}
