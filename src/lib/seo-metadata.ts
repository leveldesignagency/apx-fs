import type { Metadata } from "next"
import { FS_SITE_NAME, fsKeywordsMetaString, getFsSiteUrl } from "./seo"

type BuildFsOpts = {
  title: string
  description: string
  /** Path only, e.g. `/contact` */
  pathname: string
  keywords?: string
  robots?: Metadata["robots"]
  /** Absolute URL for OG/Twitter preview image */
  imageUrl?: string
  openGraphType?: "website" | "article"
  publishedTime?: string
}

/**
 * Per-page metadata with OG/Twitter/canonical, use for layouts and server pages.
 */
export function buildFsMetadata({
  title,
  description,
  pathname,
  keywords,
  robots,
  imageUrl,
  openGraphType = "website",
  publishedTime,
}: BuildFsOpts): Metadata {
  const base = getFsSiteUrl()
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`
  const url = `${base}${path}`
  const ogImages = imageUrl ? [{ url: imageUrl, alt: title }] : undefined

  return {
    title,
    description,
    keywords: keywords ?? fsKeywordsMetaString(),
    robots: robots ?? { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      type: openGraphType,
      locale: "en_GB",
      siteName: FS_SITE_NAME,
      ...(ogImages ? { images: ogImages } : {}),
      ...(publishedTime && openGraphType === "article"
        ? { publishedTime, modifiedTime: publishedTime }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
    alternates: {
      /** Absolute URL, avoids mismatches with path-only canonicals in audits */
      canonical: url,
    },
  }
}
