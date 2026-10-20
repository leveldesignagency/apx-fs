"use client"

import { Star } from "lucide-react"
import { getGoogleReviewsEmbedSrc, GOOGLE_REVIEWS_LISTING_URL } from "@/lib/googleBusinessReviews"

const cardClass =
  "google-reviews-card why-choose-card -mt-6 flex min-h-0 w-full min-w-0 flex-1 flex-col overflow-hidden rounded-tl-[1.35rem] rounded-br-[1.35rem] md:rounded-tl-[1.5rem] md:rounded-br-[1.5rem]"

/** Matches .why-choose-icon-badge footprint so card body aligns with sibling cells. */
function WhyChooseIconSpacer() {
  return <div className="h-11 w-11 shrink-0 md:h-12 md:w-12" aria-hidden />
}

/**
 * Fourth cell in Why Choose Us 2×2 grid: optional iframe embed (env) or fallback card linking to Google reviews.
 */
export function GoogleBusinessReviewsSlot() {
  const embedSrc = getGoogleReviewsEmbedSrc()

  if (embedSrc) {
    const embedH = "min-h-[360px] h-full sm:min-h-[380px]"
    return (
      <>
        <WhyChooseIconSpacer />
        <article className={`${cardClass} overflow-hidden ${embedH}`}>
          <iframe
            title="Google reviews"
            src={embedSrc}
            className="h-full w-full shrink-0 border-0 bg-white"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allow="clipboard-write"
          />
        </article>
      </>
    )
  }

  return (
    <>
      <WhyChooseIconSpacer />
      <article className={`${cardClass} px-4 pb-5 pt-5 text-center md:px-5 md:pb-6 md:pt-6`}>
        <div className="google-reviews-card__brand mb-3 flex items-center justify-center">
          {/* Official Google wordmark from gstatic (not a redrawn SVG) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/google-wordmark.svg"
            alt="Google"
            width={148}
            height={48}
            className="h-7 w-auto md:h-8"
            decoding="async"
          />
        </div>

        <h4 className="google-reviews-card__title font-title text-base font-semibold leading-snug md:text-lg">
          Reviews
        </h4>

        <div className="mt-3 flex justify-center gap-1" aria-label="5 out of 5 stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="google-reviews-card__star h-7 w-7 sm:h-6 sm:w-6 md:h-7 md:w-7" strokeWidth={0} fill="currentColor" />
          ))}
        </div>

        <p className="google-reviews-card__copy mt-3 flex-1 text-sm leading-relaxed">
          See verified feedback on our Google Business Profile.
        </p>

        <div className="mt-auto flex justify-center pt-5">
          <a
            href={GOOGLE_REVIEWS_LISTING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="google-reviews-card__btn inline-flex min-h-[44px] items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold active:translate-y-0"
          >
            <span className="google-reviews-card__btn-label">View on Google</span>
          </a>
        </div>
      </article>
    </>
  )
}
