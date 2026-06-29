import { NewsArticleParagraph } from "@/components/news/NewsArticleBody"
import type { FsNewsArticleInlineLink } from "@/data/fsNewsArticles"

type NewsArticleHeroLeadProps = {
  text: string
  inlineLinks?: FsNewsArticleInlineLink[]
}

/** Opening paragraph under the title, clamped in the hero and repeated in full in the article body. */
export function NewsArticleHeroLead({ text, inlineLinks }: NewsArticleHeroLeadProps) {
  return (
    <p className="news-article-page__hero-lead mt-5 text-lg font-normal leading-relaxed text-black/80 md:mt-6 md:text-xl md:leading-relaxed lg:text-[1.375rem] lg:leading-[1.55]">
      <NewsArticleParagraph text={text} paragraphIndex={0} inlineLinks={inlineLinks} />
    </p>
  )
}
