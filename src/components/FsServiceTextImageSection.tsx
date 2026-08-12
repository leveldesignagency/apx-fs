"use client"

import { useCallback, useId, type ReactNode } from "react"
import Image from "next/image"
import { Reveal } from "@/components/Reveal"
import { useFsServiceTextImageSync } from "@/components/FsServiceTextImageSectionGroup"
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
  /** Extra classes on the photo (e.g. blur-lg scale-110) */
  imageClassName?: string
  /** Logo or mark centred over the image column */
  imageOverlaySrc?: string | null
  imageOverlayAlt?: string
  imageOverlayClassName?: string
  className?: string
  /** Minimum height of the row on large screens (image column) */
  imageMinHeightClassName?: string
  /** Black gradient fade on the right edge into the page background (default on) */
  imageRightFeather?: boolean
  /** Image column side on large screens (default right) */
  imageSide?: "left" | "right"
  /** Light band: white background and dark copy (default dark) */
  variant?: "dark" | "light"
  /**
   * Diagonal cant inset at the top inner edge of the image (% of image width).
   * Lower or negative values shift the cant left and reveal more photo (default 14).
   */
  imageCantInsetPercent?: number
  /** Edge-to-edge mode only: image column width in vw (default 42). */
  imageEdgeWidthVw?: number
  /** Edge-to-edge mode only: max width cap, or `none` to drop the cap (default 36rem). */
  imageEdgeMaxWidth?: string
}

/**
 * Text-led service section: ~60% copy, ~40% full-height image.
 * Image: canted clip on the edge toward the text column on large screens; full-width on mobile.
 * When feather is off, the image column is pinned to the viewport edge on large screens.
 *
 * Wrap multiple sections in {@link FsServiceTextImageSectionGroup} to equalise row heights on desktop.
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
  imageMinHeightClassName = "lg:min-h-[min(28rem,70vh)]",
  imageRightFeather = true,
  imageSide = "right",
  variant = "dark",
  imageCantInsetPercent = 14,
  imageEdgeWidthVw = 42,
  imageEdgeMaxWidth = "36rem",
}: FsServiceTextImageSectionProps) {
  const sync = useFsServiceTextImageSync()
  const instanceId = useId()
  const headingId = titleId ?? "fs-service-text-image-heading"
  const resolvedImageSrc = imageSrc ?? fsPlaceholderImageForKey(headingId)
  const isLight = variant === "light"
  const edgeToEdgeImage = !imageRightFeather
  const imageOnLeft = imageSide === "left"
  const cantInset = imageCantInsetPercent
  const cantTopX = imageOnLeft ? 100 - cantInset : cantInset
  const syncedHeight = sync?.maxHeight ?? null
  const inSyncGroup = sync !== null

  const setSectionRef = useCallback(
    (node: HTMLElement | null) => {
      sync?.register(instanceId, node)
    },
    [sync, instanceId]
  )

  const containerClassName = cn(
    "container relative mx-auto w-full px-6",
    syncedHeight
      ? "lg:flex lg:flex-1 lg:flex-col lg:justify-center"
      : imageMinHeightClassName
  )

  const textColumn = (
    <Reveal
      className={cn("h-full min-h-0", edgeToEdgeImage && "relative z-20 pointer-events-auto")}
      delayMs={0}
    >
      <div
        className={cn(
          "flex h-full w-full min-w-0 flex-col justify-center py-16 lg:py-16",
          imageOnLeft ? "lg:pl-8 xl:pl-12" : "lg:pr-8 xl:pr-12"
        )}
      >
        <h2
          id={headingId}
          className={cn(
            "mb-6 text-left font-title text-3xl font-bold sm:text-4xl",
            isLight ? "text-black" : "text-white"
          )}
        >
          {title}
        </h2>
        <div
          className={cn(
            "max-w-3xl space-y-4 text-base leading-relaxed sm:text-lg",
            isLight ? "text-neutral-700" : "text-gray-300"
          )}
        >
          {children}
        </div>
      </div>
    </Reveal>
  )

  const renderImageColumn = (
    columnClassName?: string,
    sizes = edgeToEdgeImage ? `${imageEdgeWidthVw}vw` : "40vw"
  ) => (
    <Reveal className={cn("h-full min-h-0", columnClassName)} delayMs={90}>
      <div className={cn("relative h-full min-h-[240px] w-full min-w-0")}>
      <div
        className={cn(
          "fs-service-text-image-mask group absolute inset-0 overflow-hidden bg-neutral-900",
          imageOnLeft && "fs-service-text-image-mask--image-left"
        )}
      >
        <div className="absolute inset-0 origin-center transition-transform duration-500 ease-out group-hover:scale-105">
        <Image
          src={resolvedImageSrc}
          alt={imageAlt}
          fill
          className={cn("object-cover object-center", imageClassName)}
          sizes={sizes}
          priority={false}
        />
        </div>
        {imageRightFeather ? (
          <div
            className="pointer-events-none absolute inset-0 z-[1] hidden lg:block"
            style={{
              background: isLight
                ? "linear-gradient(to left, rgb(255 255 255) 0%, rgba(255, 255, 255, 0) 38%)"
                : "linear-gradient(to left, rgb(0 0 0) 0%, rgba(0, 0, 0, 0) 38%)",
            }}
            aria-hidden
          />
        ) : null}
        {imageOverlaySrc ? (
          <div className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center p-8 sm:p-10">
            <Image
              src={imageOverlaySrc}
              alt={imageOverlayAlt}
              width={320}
              height={160}
              className={cn(
                "h-auto w-full max-w-[min(14rem,55%)] translate-x-0 object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)]",
                imageOverlayClassName
              )}
            />
          </div>
        ) : null}
        <svg className="fs-service-text-image-cant-border" preserveAspectRatio="none" aria-hidden>
          {imageOnLeft ? (
            <line x1={`${cantTopX}%`} y1="0" x2="100%" y2="100%" />
          ) : (
            <line x1={`${cantTopX}%`} y1="0" x2="0" y2="100%" />
          )}
        </svg>
      </div>
      </div>
    </Reveal>
  )

  const gridColumns = imageOnLeft
    ? "lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
    : "lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]"

  const edgeImagePosition = cn(
    "absolute inset-y-0 z-[1] hidden lg:block",
    imageOnLeft ? "left-0" : "right-0"
  )
  const edgeImageWidth =
    imageEdgeMaxWidth === "none"
      ? `${imageEdgeWidthVw}vw`
      : `min(${imageEdgeMaxWidth}, ${imageEdgeWidthVw}vw)`

  const gridClassName = cn(
    "grid grid-cols-1 items-stretch gap-10 lg:gap-0",
    gridColumns,
    syncedHeight && "lg:h-full lg:min-h-0"
  )

  return (
    <section
      ref={setSectionRef}
      style={{
        ...(syncedHeight ? { minHeight: syncedHeight } : {}),
        ["--fs-service-cant-inset" as string]: `${cantInset}%`,
      }}
      className={cn(
        "fs-service-text-image-section relative",
        isLight ? "fs-service-text-image-section--light bg-white" : "fs-service-text-image-section--dark bg-black",
        edgeToEdgeImage && "lg:overflow-hidden",
        inSyncGroup && "lg:flex lg:flex-col",
        className
      )}
      aria-labelledby={headingId}
    >
      {edgeToEdgeImage ? (
        <>
          <div className={cn(containerClassName, edgeToEdgeImage && "relative z-10 pointer-events-none")}>
            <div className={gridClassName}>
              {imageOnLeft ? (
                <>
                  <div className="relative hidden min-h-[240px] lg:block" aria-hidden />
                  {textColumn}
                  {renderImageColumn("fs-service-text-image-mobile-bleed lg:hidden", "100vw")}
                </>
              ) : (
                <>
                  {textColumn}
                  {renderImageColumn("fs-service-text-image-mobile-bleed lg:hidden", "100vw")}
                  <div className="relative hidden min-h-[240px] lg:block" aria-hidden />
                </>
              )}
            </div>
          </div>
          <div className={edgeImagePosition} style={{ width: edgeImageWidth }}>
            {renderImageColumn("h-full")}
          </div>
        </>
      ) : (
        <div className={containerClassName}>
          <div className={gridClassName}>
            {imageOnLeft ? (
              <>
                {renderImageColumn(
                  "fs-service-text-image-mobile-bleed",
                  "(max-width: 1023px) 100vw, 40vw"
                )}
                {textColumn}
              </>
            ) : (
              <>
                {textColumn}
                {renderImageColumn(
                  "fs-service-text-image-mobile-bleed",
                  "(max-width: 1023px) 100vw, 40vw"
                )}
              </>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
