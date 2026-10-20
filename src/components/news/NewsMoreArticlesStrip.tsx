import Link from "next/link"
import type { FsNewsArticle } from "@/data/fsNewsArticles"
import { NewsArticleCard } from "@/components/news/NewsArticleCard"
import { FS_PROJECTS_CONTENT_MAX, FS_PROJECTS_SECTION_PX } from "@/lib/fsProjectsLayout"

type NewsMoreArticlesStripProps = {
  articles: FsNewsArticle[]
}

/**
 * Bottom �read next� strip on article pages.
 * Reserved band for more articles (or a future client promo slot).
 */
export function NewsMoreArticlesStrip({ articles }: NewsMoreArticlesStripProps) {
  if (articles.length === 0) return null

  return (
    <section
      className={`news-more-articles-strip border-t border-black/10 bg-[#f6f6f6] ${FS_PROJECTS_SECTION_PX}`}
      aria-labelledby="news-more-articles-heading"
    >
      <div className={`${FS_PROJECTS_CONTENT_MAX} py-14 md:py-16 lg:py-20`}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-black/55">
              Keep reading
            </p>
            <h2
              id="news-more-articles-heading"
              className="mt-2 font-title text-2xl font-bold normal-case tracking-tight text-black md:text-3xl lg:text-4xl"
            >
              More articles
            </h2>
          </div>
          <Link
            href="/news"
            className="inline-flex w-fit shrink-0 text-xs font-bold uppercase tracking-[0.14em] text-black underline decoration-black/30 underline-offset-[0.2em] transition-colors hover:decoration-black"
          >
            View all news
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 md:grid-cols-3 md:gap-6 lg:gap-8">
          {articles.map((item) => (
            <NewsArticleCard key={item.slug} article={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
