import Image from "next/image"
import Link from "next/link"
import type { FsNewsArticle } from "@/data/fsNewsArticles"
import { NEWS_CATEGORY_LABELS } from "@/data/fsNewsArticles"

type NewsArticleCardProps = {
  article: FsNewsArticle
  featured?: boolean
}

export function NewsArticleCard({ article, featured = false }: NewsArticleCardProps) {
  const primaryCategory = article.categories[0]
  const categoryLabel = NEWS_CATEGORY_LABELS[primaryCategory]

  return (
    <article
      className={`news-card group flex h-full flex-col overflow-hidden border-2 border-black bg-white ${
        featured ? "news-card--featured md:grid md:grid-cols-2 md:items-stretch md:gap-0" : ""
      }`}
    >
      <Link
        href={`/news/${article.slug}`}
        className={`news-card__media relative block overflow-hidden bg-neutral-100 ${
          featured ? "aspect-[4/3] sm:aspect-[3/2] md:aspect-auto" : "aspect-[16/10]"
        }`}
      >
        <Image
          src={article.imageSrc}
          alt={article.imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
        />
      </Link>
      <div
        className={`flex flex-1 flex-col ${
          featured ? "border-t-2 border-black md:border-t-0 md:border-l-2" : "border-t-2 border-black"
        } ${featured ? "p-6 md:p-8 lg:p-10" : "p-5 md:p-6"}`}
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-bold uppercase tracking-[0.16em] text-black/55">
          <time dateTime={article.publishedAt}>{article.publishedLabel}</time>
          <span aria-hidden className="text-black/30">
            |
          </span>
          <span>{categoryLabel}</span>
        </div>
        <h2 className={`mt-3 font-title font-bold leading-tight text-black ${featured ? "text-2xl md:text-3xl lg:text-4xl" : "text-xl md:text-2xl"}`}>
          <Link href={`/news/${article.slug}`} className="news-card__title-link">
            {article.title}
          </Link>
        </h2>
        <p className={`mt-3 flex-1 text-sm leading-relaxed text-black/75 md:text-base ${featured ? "md:text-lg" : ""}`}>
          {article.excerpt}
        </p>
        <Link
          href={`/news/${article.slug}`}
          className="news-card__read-more mt-5 inline-flex w-fit text-xs font-bold uppercase tracking-[0.14em] text-black"
        >
          Read article
        </Link>
      </div>
    </article>
  )
}
