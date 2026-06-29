import type { Metadata } from "next"
import { buildFsMetadata } from "@/lib/seo-metadata"
import { getNewsArticlesSorted } from "@/data/fsNewsArticles"
import { NewsHubClient } from "@/components/news/NewsHubClient"
import { FS_PROJECTS_CONTENT_MAX, FS_PROJECTS_SECTION_PX } from "@/lib/fsProjectsLayout"

export const metadata: Metadata = buildFsMetadata({
  title: "Security Systems News & Information | APX Fire & Security",
  description:
    "Company news, project updates and technical articles on fire alarms, CCTV, access control and video door entry from APX Fire & Security.",
  pathname: "/news",
})

export default function NewsIndexPage() {
  const articles = getNewsArticlesSorted()

  return (
    <div className="news-page min-h-screen bg-white text-black">
      <section className={`page-title-band border-b-2 border-black ${FS_PROJECTS_SECTION_PX}`}>
        <div className={FS_PROJECTS_CONTENT_MAX}>
          <div className="max-w-3xl">
            <span className="section-label mb-3 block text-black/55">News &amp; articles</span>
            <h1
              className="text-left text-3xl font-bold text-black sm:text-4xl md:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-menu)" }}
            >
              Security systems news &amp; information
            </h1>
            <p className="mt-4 max-w-2xl text-left text-base font-normal tracking-tight text-black/70 sm:text-lg md:text-xl">
              Project wins, sector updates and practical guidance from our fire and security teams across London and the Home Counties.
            </p>
          </div>
        </div>
      </section>

      <section className={`pt-12 pb-14 md:pt-14 md:pb-16 lg:pt-16 lg:pb-20 ${FS_PROJECTS_SECTION_PX}`}>
        <div className={FS_PROJECTS_CONTENT_MAX}>
          <NewsHubClient articles={articles} />
        </div>
      </section>
    </div>
  )
}
