import type { Metadata } from "next"
import {
  FS_DEFAULT_OG_PATH,
  FS_SITE_NAME,
  fsAbsoluteUrl,
  fsKeywordsMetaString,
  getFsSiteUrl,
} from "./seo"

type BuildFsOpts = {
  title: string
  description: string
  /** e.g. `/contact` */
  pathname: string
  keywords?: string
  robots?: Metadata["robots"]
  /** path or absolute URL; falls back to /og/default.png */
  imageUrl?: string
  openGraphType?: "website" | "article"
  publishedTime?: string
  socialTitle?: string
}

const INDEXABLE: NonNullable<Metadata["robots"]> = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
}

export function buildFsMetadata({
  title,
  description,
  pathname,
  keywords,
  robots,
  imageUrl,
  openGraphType = "website",
  publishedTime,
  socialTitle,
}: BuildFsOpts): Metadata {
  const base = getFsSiteUrl()
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`
  const url = path === "/" ? base : `${base}${path}`
  const cardTitle = socialTitle ?? title
  const image = imageUrl
    ? imageUrl.startsWith("http")
      ? imageUrl
      : fsAbsoluteUrl(imageUrl)
    : fsAbsoluteUrl(FS_DEFAULT_OG_PATH)

  const ogImages = [
    {
      url: image,
      width: 1200,
      height: 630,
      alt: cardTitle,
      type: image.endsWith(".jpg") || image.endsWith(".jpeg") ? "image/jpeg" : "image/png",
    },
  ]

  return {
    title,
    description,
    keywords: keywords ?? fsKeywordsMetaString(),
    applicationName: FS_SITE_NAME,
    robots: robots ?? INDEXABLE,
    openGraph: {
      title: cardTitle,
      description,
      url,
      type: openGraphType,
      locale: "en_GB",
      siteName: FS_SITE_NAME,
      images: ogImages,
      ...(publishedTime && openGraphType === "article"
        ? { publishedTime, modifiedTime: publishedTime }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: cardTitle,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  }
}

export function buildFsNoIndexMetadata(opts: Omit<BuildFsOpts, "robots">): Metadata {
  return buildFsMetadata({
    ...opts,
    robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  })
}
