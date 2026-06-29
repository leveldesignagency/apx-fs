"use client"

import { useMemo, useState } from "react"
import { Search, X } from "lucide-react"
import type { FsNewsArticle, NewsCategory } from "@/data/fsNewsArticles"
import { NEWS_CATEGORY_LABELS } from "@/data/fsNewsArticles"
import { NewsArticleCard } from "@/components/news/NewsArticleCard"
import { NewsHubYearFilter } from "@/components/news/NewsHubYearFilter"

type NewsHubClientProps = {
  articles: FsNewsArticle[]
}

const ALL_CATEGORIES = "all" as const
type CategoryFilter = typeof ALL_CATEGORIES | NewsCategory

export function NewsHubClient({ articles }: NewsHubClientProps) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<CategoryFilter>(ALL_CATEGORIES)
  const [year, setYear] = useState<string>("all")

  const years = useMemo(() => {
    const set = new Set(articles.map((a) => a.publishedAt.slice(0, 4)))
    return [...set].sort((a, b) => b.localeCompare(a))
  }, [articles])

  const categoryOptions = useMemo(() => {
    const set = new Set<NewsCategory>()
    articles.forEach((a) => a.categories.forEach((c) => set.add(c)))
    return [...set].sort((a, b) => NEWS_CATEGORY_LABELS[a].localeCompare(NEWS_CATEGORY_LABELS[b]))
  }, [articles])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return articles.filter((article) => {
      if (year !== "all" && !article.publishedAt.startsWith(year)) return false
      if (category !== ALL_CATEGORIES && !article.categories.includes(category)) return false
      if (!q) return true
      const haystack = [
        article.title,
        article.excerpt,
        ...article.body,
        ...article.categories.map((c) => NEWS_CATEGORY_LABELS[c]),
      ]
        .join(" ")
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [articles, category, query, year])

  const [featured, ...rest] = filtered
  const hasFilters = query.trim() !== "" || category !== ALL_CATEGORIES || year !== "all"

  const clearFilters = () => {
    setQuery("")
    setCategory(ALL_CATEGORIES)
    setYear("all")
  }

  return (
    <div className="news-hub">
      <div className="news-hub__toolbar border-b-2 border-black pb-8 md:pb-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <label className="news-hub__search relative block w-full max-w-xl">
            <span className="sr-only">Search news and articles</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black/45" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search headlines, topics, locations…"
              className="w-full border-2 border-black bg-white py-3.5 pl-12 pr-4 text-base text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-black/20"
            />
          </label>
          <p className="text-sm font-medium text-black/60">
            {filtered.length} {filtered.length === 1 ? "article" : "articles"}
            {hasFilters ? " matching your filters" : ""}
          </p>
        </div>

        <div className="news-hub__filters-row mt-6 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
          <div className="news-hub__topic-pills flex min-w-0 flex-1 flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setCategory(ALL_CATEGORIES)}
              className={`news-hub__pill ${category === ALL_CATEGORIES ? "news-hub__pill--active" : ""}`}
            >
              All topics
            </button>
            {categoryOptions.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`news-hub__pill ${category === cat ? "news-hub__pill--active" : ""}`}
              >
                {NEWS_CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>
          <div className="news-hub__year-wrap flex w-full shrink-0 justify-end lg:w-auto lg:pt-0.5">
            <NewsHubYearFilter years={years} value={year} onChange={setYear} />
          </div>
        </div>

        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-black/70 transition-colors hover:text-black"
          >
            <X className="h-4 w-4" aria-hidden />
            Clear filters
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="border-2 border-dashed border-black/25 px-6 py-16 text-center">
          <p className="font-title text-2xl font-bold text-black">No articles found</p>
          <p className="mt-3 text-base text-black/65">Try a different search term or reset your filters.</p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-6 border-2 border-black px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-black transition-colors hover:bg-black hover:text-white"
          >
            Show all articles
          </button>
        </div>
      ) : (
        <div className="news-hub__grid mt-10 space-y-8 md:mt-12 md:space-y-10">
          {featured && (
            <div>
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-black/55">Latest</p>
              <NewsArticleCard article={featured} featured />
            </div>
          )}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
              {rest.map((article) => (
                <NewsArticleCard key={article.slug} article={article} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
