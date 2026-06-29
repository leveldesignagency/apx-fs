export type SocialSharePlatform = "facebook" | "x" | "linkedin" | "pinterest" | "email"

export type SocialSharePayload = {
  /** Absolute URL of the page being shared */
  url: string
  title: string
  description?: string
  /** Absolute URL of the share image */
  imageUrl?: string
}

export type SocialShareTarget = {
  platform: SocialSharePlatform
  label: string
  href: string
  openInNewTab: boolean
}

function enc(value: string): string {
  return encodeURIComponent(value)
}

/**
 * Platform share URLs with encoded query params so title + link carry through.
 */
export function buildSocialShareTargets({
  url,
  title,
}: SocialSharePayload): SocialShareTarget[] {
  const encodedUrl = enc(url)
  const encodedTitle = enc(title)

  const targets: SocialShareTarget[] = [
    {
      platform: "facebook",
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      openInNewTab: true,
    },
    {
      platform: "x",
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      openInNewTab: true,
    },
    {
      platform: "linkedin",
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      openInNewTab: true,
    },
  ]

  return targets
}

/** Prefer the live browser URL so port, host and canonical path match what the user is viewing. */
export function resolveClientShareUrl(fallbackUrl: string): string {
  if (typeof window === "undefined") return fallbackUrl
  try {
    const { origin, pathname, search } = window.location
    return `${origin}${pathname}${search}`
  } catch {
    return fallbackUrl
  }
}

export function toAbsoluteUrl(pathOrUrl: string, siteOrigin: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl
  const base = siteOrigin.replace(/\/$/, "")
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`
  return `${base}${path}`
}
