import Link from "next/link"
import type { FsNewsArticleInlineLink, FsNewsArticleQuote } from "@/data/fsNewsArticles"

const NEWS_BODY_LINK_CLASS =
  "font-semibold text-black underline decoration-black/35 underline-offset-2 transition-colors hover:decoration-black"

type NewsArticleParagraphProps = {
  text: string
  paragraphIndex: number
  inlineLinks?: FsNewsArticleInlineLink[]
  className?: string
}

export function NewsArticleParagraph({
  text,
  paragraphIndex,
  inlineLinks,
  className,
}: NewsArticleParagraphProps) {
  const link = inlineLinks?.find((item) => item.paragraphIndex === paragraphIndex)
  if (!link || !text.includes(link.linkText)) {
    return <span className={className}>{text}</span>
  }

  const [before, ...rest] = text.split(link.linkText)
  const after = rest.join(link.linkText)

  return (
    <span className={className}>
      {before}
      <Link href={link.href} className={NEWS_BODY_LINK_CLASS} target="_blank" rel="noopener noreferrer">
        {link.linkText}
      </Link>
      {after}
    </span>
  )
}

type NewsArticleBodyProps = {
  paragraphs: string[]
  inlineLinks?: FsNewsArticleInlineLink[]
  quote?: FsNewsArticleQuote
}

export function NewsArticleBody({ paragraphs, inlineLinks, quote }: NewsArticleBodyProps) {
  return (
    <div className="news-article-page__body space-y-5 text-base leading-relaxed text-black/85 md:text-lg md:leading-relaxed">
      {paragraphs.map((paragraph, i) => (
        <p key={i}>
          <NewsArticleParagraph text={paragraph} paragraphIndex={i} inlineLinks={inlineLinks} />
        </p>
      ))}
      {quote ? (
        <figure className="space-y-4">
          {quote.intro ? <p className="font-semibold text-black">{quote.intro}</p> : null}
          <blockquote className="border-l-2 border-black/20 pl-5 md:pl-6">
          <div className="space-y-4">
            {quote.paragraphs.map((paragraph, i) => (
              <p key={i} className="text-black/80">
                {paragraph}
              </p>
            ))}
          </div>
          <footer className="mt-5 text-sm font-semibold text-black md:text-base">
            {quote.author}
            <span className="mt-1 block text-sm font-normal text-black/65 md:text-base">{quote.role}</span>
          </footer>
        </blockquote>
        </figure>
      ) : null}
    </div>
  )
}
