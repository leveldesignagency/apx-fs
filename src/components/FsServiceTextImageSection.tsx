"use client"

import { type ReactNode } from "react"
import Image from "next/image"
import { Reveal } from "@/components/Reveal"
import { fsPlaceholderImageForKey } from "@/lib/fsPlaceholderImages"
import { cn } from "@/lib/utils"

export type FsServiceTextImageSectionProps = {
  title: string
  /** Optional id for the section heading (a11y) */
  titleId?: string
  children: ReactNode
  /** When omitted, a stock image from the site library is shown until real artwork is set. */
  imageSrc?: string | null
  imageAlt?: string
  /** Extra classes on the photo */
  imageClassName?: string
  /** Logo or mark centred over the image */
  imageOverlaySrc?: string | null
  imageOverlayAlt?: string
  imageOverlayClassName?: string
  className?: string
  /**
   * Image column side on large screens.
   * Inside a group, omit to auto-alternate (first left, then right, …).
   */
  imageSide?: "left" | "right"
  /** Light band: white background and dark copy (default dark) */
  variant?: "dark" | "light"
  /** @deprecated Masked/edge layout removed, ignored. */
  imageRightFeather?: boolean
  /** @deprecated Masked/edge layout removed, ignored. */
  imageCantInsetPercent?: number
  /** @deprecated Masked/edge layout removed, ignored. */
  imageEdgeWidthVw?: number
  /** @deprecated Masked/edge layout removed, ignored. */
  imageEdgeMaxWidth?: string
  /** @deprecated No longer used. */
  imageMinHeightClassName?: string
}

/**
 * Service section: copy + inset rounded image inside the same band.
 * Wrap consecutive sections in {@link FsServiceTextImageSectionGroup} to alternate
 * image side (first left, then right, …).
 */
export function FsServiceTextImageSection({
  title,
  titleId,
  children,
  imageSrc,
  imageAlt = "",
  imageClassName,
  imageOverlaySrc,
  imageOverlayAlt = "",
  imageOverlayClassName,
  className,
  imageSide: imageSideProp,
  variant = "dark",
}: FsServiceTextImageSectionProps) {
  const headingId = titleId ?? "fs-service-text-image-heading"
  const resolvedImageSrc = imageSrc ?? fsPlaceholderImageForKey(headingId)
  const isLight = variant === "light"
  const imageOnLeft = (imageSideProp ?? "left") === "left"

  const textColumn = (
    <Reveal className="min-h-0 min-w-0 h-full" delayMs={0}>
      <div className="flex h-full w-full min-w-0 flex-col justify-center">
        <h2
          id={headingId}
          className={cn(
            "mb-5 text-left font-title text-3xl font-bold sm:mb-6 sm:text-4xl",
            isLight ? "text-black" : "text-white"
          )}
        >
          {title}
        </h2>
        <div
          className={cn(
            "space-y-4 text-base leading-relaxed sm:text-lg",
            isLight ? "text-neutral-700" : "text-gray-300"
          )}
        >
          {children}
        </div>
      </div>
    </Reveal>
  )

  const imageColumn = (
    <Reveal className="min-h-0 min-w-0 h-full" delayMs={90}>
      <div className="relative h-full min-h-[14rem] w-full overflow-hidden rounded-2xl bg-neutral-900 sm:min-h-[18rem] lg:min-h-0">
        {/* Mobile: keep a readable aspect; desktop: stretch to match text column height */}
        <div className="relative aspect-[16/10] w-full lg:absolute lg:inset-0 lg:aspect-auto">
          <Image
            src={resolvedImageSrc}
            alt={imageAlt}
            fill
            className={cn(
              "object-cover object-center transition-transform duration-500 ease-out hover:scale-[1.03]",
              imageClassName
            )}
            sizes="(max-width: 1023px) 100vw, 48vw"
            priority={false}
          />
        </div>
        {imageOverlaySrc ? (
          <div className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center p-8 sm:p-10">
            <Image
              src={imageOverlaySrc}
              alt={imageOverlayAlt}
              width={320}
              height={160}
              className={cn(
                "h-auto w-full max-w-[min(14rem,55%)] object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)]",
                imageOverlayClassName
              )}
            />
          </div>
        ) : null}
      </div>
    </Reveal>
  )

  return (
    <section
      className={cn(
        "fs-service-text-image-section relative",
        isLight ? "fs-service-text-image-section--light bg-white" : "fs-service-text-image-section--dark bg-black",
        className
      )}
      aria-labelledby={headingId}
    >
      <div className="mx-auto w-full max-w-[min(100%,92rem)] px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 items-stretch gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {imageOnLeft ? (
            <>
              {imageColumn}
              {textColumn}
            </>
          ) : (
            <>
              {textColumn}
              {imageColumn}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
