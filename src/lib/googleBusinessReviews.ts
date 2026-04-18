/**
 * Google Business / Maps — reviews link + optional embed.
 * Replace GOOGLE_REVIEWS_LISTING_URL with the exact listing or “Write a review” URL when you have it.
 * Optional: set NEXT_PUBLIC_GOOGLE_REVIEWS_EMBED_URL to an iframe src from Elfsight, TrustIndex, etc.
 */

export const GOOGLE_REVIEWS_LISTING_URL =
  "https://www.google.com/maps/search/?api=1&query=APX+Fire+%26+Security+London"

export function getGoogleReviewsEmbedSrc(): string | undefined {
  const u = process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_EMBED_URL
  return u?.trim() || undefined
}
