import type { Metadata } from "next"
import { FS_SITE_NAME, fsKeywordsMetaString, getFsSiteUrl } from "./seo"

type BuildFsOpts = {
  title: string
  description: string
  /** Path only, e.g. `/contact` */
  pathname: string
  keywords?: string
  robots?: Metadata["robots"]
}

/**
 * Per-page metadata with OG/Twitter/canonical — use for layouts and server pages.
 */
export function buildFsMetadata({
  title,
  description,
  pathname,
  keywords,
  robots,
}: BuildFsOpts): Metadata {
  const base = getFsSiteUrl()
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`
  const url = `${base}${path}`
  return {
    title,
    description,
    keywords: keywords ?? fsKeywordsMetaString(),
    robots: robots ?? { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      locale: "en_GB",
      siteName: FS_SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: path,
    },
  }
}
