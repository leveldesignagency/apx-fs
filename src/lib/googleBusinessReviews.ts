/**
 * Google search / Business listing entry point for APX Fire & Security.
 */
export const GOOGLE_REVIEWS_LISTING_URL = "https://www.google.com/search?q=apx+fire+and+security"

/** Optional embed from a reviews widget provider */
export function getGoogleReviewsEmbedSrc(): string | null {
  const u = process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_EMBED_URL
  return u && u.trim().length > 0 ? u.trim() : null
}
