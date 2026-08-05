import type { Metadata } from "next"
import { buildFsMetadata } from "@/lib/seo-metadata"
import { getNewsArticlesSorted } from "@/data/fsNewsArticles"
import { NewsHubClient } from "@/components/news/NewsHubClient"

export const metadata: Metadata = buildFsMetadata({
  title: "Security Systems News & Information | APX Fire & Security",
  description:
    "Company news, project updates and technical articles on fire alarms, CCTV, access control and video door entry from APX Fire & Security.",
  pathname: "/news",
})

export default function NewsIndexPage() {
  const articles = getNewsArticlesSorted()

  return (
    <div className="news-page min-h-screen bg-white text-black" data-cursor-surface="light">
      <NewsHubClient articles={articles} />
    </div>
  )
}
