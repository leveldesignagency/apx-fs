import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  FS_NEWS_ARTICLES,
  NEWS_CATEGORY_LABELS,
  getNewsArticleBySlug,
  getNewsArticlesSorted,
} from "@/data/fsNewsArticles"
import { buildFsMetadata } from "@/lib/seo-metadata"
import { getFsSiteUrl } from "@/lib/seo"
import { FS_PROJECTS_CONTENT_MAX, FS_PROJECTS_SECTION_PX } from "@/lib/fsProjectsLayout"
import { NewsArticleBody } from "@/components/news/NewsArticleBody"
import { NewsArticleCard } from "@/components/news/NewsArticleCard"
import { NewsArticleShareBanner } from "@/components/news/NewsArticleShareBanner"

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return FS_NEWS_ARTICLES.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getNewsArticleBySlug(slug)
  if (!article) {
    return { title: "News | APX Fire & Security" }
  }
  const desc =
    article.excerpt.length > 160 ? `${article.excerpt.slice(0, 157)}…` : article.excerpt
  const siteUrl = getFsSiteUrl()
  const imageUrl = `${siteUrl}${article.imageSrc}`

  return buildFsMetadata({
    title: `${article.title} | APX Fire & Security`,
    description: desc,
    pathname: `/news/${slug}`,
    imageUrl,
    openGraphType: "article",
    publishedTime: article.publishedAt,
  })
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getNewsArticleBySlug(slug)
  if (!article) notFound()

  const related = getNewsArticlesSorted()
    .filter((item) => item.slug !== article.slug)
    .slice(0, 3)
  const siteUrl = getFsSiteUrl()
  const articleUrl = `${siteUrl}/news/${slug}`
  const shareDescription =
    article.excerpt.length > 160 ? `${article.excerpt.slice(0, 157)}…` : article.excerpt

  return (
    <div className="news-article-page min-h-screen bg-white text-black">
      <article>
        <header className={`border-b border-black/10 ${FS_PROJECTS_SECTION_PX}`}>
          <div className={`${FS_PROJECTS_CONTENT_MAX} page-title-top pb-10 md:pb-12`}>
            <Link
              href="/news"
              className="news-article-page__back-link inline-flex w-fit text-sm font-semibold uppercase tracking-[0.16em] text-black/60 no-underline transition-colors hover:text-black"
            >
              Back to news
            </Link>

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-10 xl:gap-12">
              <div className="order-2 min-w-0 lg:order-1">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-bold uppercase tracking-[0.16em] text-black/55">
                  <time dateTime={article.publishedAt}>{article.publishedLabel}</time>
                  {article.categories.map((cat) => (
                    <span key={cat} className="rounded-full border border-black/20 px-2.5 py-1 text-[10px]">
                      {NEWS_CATEGORY_LABELS[cat]}
                    </span>
                  ))}
                </div>
                <h1 className="mt-4 font-title text-3xl font-bold normal-case leading-tight text-black md:text-4xl lg:text-[clamp(2rem,3.2vw,3.25rem)]">
                  {article.title}
                </h1>
              </div>

              <div className="news-article-page__hero relative order-1 aspect-[4/3] w-full min-w-0 overflow-hidden bg-neutral-100 sm:aspect-[3/2] lg:order-2 lg:aspect-[4/3] lg:min-h-[32rem] xl:min-h-[38rem]">
                <Image
                  src={article.imageSrc}
                  alt={article.imageAlt}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </header>

        <section className={`${FS_PROJECTS_SECTION_PX} py-10 md:py-12 lg:py-14`}>
          <div className={FS_PROJECTS_CONTENT_MAX}>
            <NewsArticleBody
              paragraphs={article.body}
              inlineLinks={article.inlineLinks}
              quote={article.quote}
            />
            <footer className="news-article-page__date-footer mt-10 border-t border-black/10 pt-6 md:mt-12 md:pt-7">
              <time
                dateTime={article.publishedAt}
                className="text-[11px] font-bold uppercase tracking-[0.16em] text-black/55"
              >
                {article.publishedLabel}
              </time>
            </footer>
          </div>
        </section>

        <NewsArticleShareBanner
          title={article.title}
          description={shareDescription}
          imageUrl={article.imageSrc}
          fallbackUrl={articleUrl}
          siteOrigin={siteUrl}
        />
      </article>

      {related.length > 0 && (
        <section className={`border-t-2 border-black ${FS_PROJECTS_SECTION_PX}`}>
          <div className={`${FS_PROJECTS_CONTENT_MAX} pt-14 pb-20 md:pt-16 md:pb-24 lg:pb-28`}>
            <h2 className="font-title text-2xl font-bold normal-case text-black md:text-3xl">
              More news &amp; articles
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
              {related.map((item) => (
                <NewsArticleCard key={item.slug} article={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
