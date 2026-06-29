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
}

/**
 * Text-led service section: ~60% copy, ~40% full-height image.
 * Image: canted clip on the edge toward the text column; optional feather into the page background.
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
}: FsServiceTextImageSectionProps) {
  const sync = useFsServiceTextImageSync()
  const instanceId = useId()
  const headingId = titleId ?? "fs-service-text-image-heading"
  const resolvedImageSrc = imageSrc ?? fsPlaceholderImageForKey(headingId)
  const isLight = variant === "light"
  const edgeToEdgeImage = !imageRightFeather
  const imageOnLeft = imageSide === "left"
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
    <Reveal className="h-full min-h-0" delayMs={0}>
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

  const renderImageColumn = (columnClassName?: string, sizes = edgeToEdgeImage ? "42vw" : "40vw") => (
    <Reveal className={cn("h-full min-h-0", columnClassName)} delayMs={90}>
      <div className={cn("relative h-full min-h-[240px] w-full min-w-0")}>
      <div
        className={cn(
          "fs-service-text-image-mask absolute inset-0 overflow-hidden bg-neutral-900",
          imageOnLeft && "fs-service-text-image-mask--image-left"
        )}
      >
        <Image
          src={resolvedImageSrc}
          alt={imageAlt}
          fill
          className={cn("object-cover object-center", imageClassName)}
          sizes={sizes}
          priority={false}
        />
        {imageRightFeather ? (
          <div
            className="pointer-events-none absolute inset-0 z-[1]"
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
      </div>
      </div>
    </Reveal>
  )

  const gridColumns = imageOnLeft
    ? "lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
    : "lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]"

  const edgeImagePosition = cn(
    "pointer-events-none absolute inset-y-0 hidden w-[42vw] max-w-[36rem] lg:block",
    imageOnLeft ? "left-0" : "right-0"
  )

  const gridClassName = cn(
    "grid grid-cols-1 items-stretch gap-10 lg:gap-0",
    gridColumns,
    syncedHeight && "lg:h-full lg:min-h-0"
  )

  return (
    <section
      ref={setSectionRef}
      style={syncedHeight ? { minHeight: syncedHeight } : undefined}
      className={cn(
        "fs-service-text-image-section relative",
        isLight ? "fs-service-text-image-section--light bg-white" : "fs-service-text-image-section--dark bg-black",
        edgeToEdgeImage && "overflow-hidden",
        inSyncGroup && "lg:flex lg:flex-col",
        className
      )}
      aria-labelledby={headingId}
    >
      {edgeToEdgeImage ? (
        <>
          <div className={containerClassName}>
            <div className={gridClassName}>
              {imageOnLeft ? (
                <>
                  <div className="relative hidden min-h-[240px] lg:block" aria-hidden />
                  {textColumn}
                  {renderImageColumn("lg:hidden")}
                </>
              ) : (
                <>
                  {textColumn}
                  {renderImageColumn("lg:hidden")}
                  <div className="relative hidden min-h-[240px] lg:block" aria-hidden />
                </>
              )}
            </div>
          </div>
          <div className={edgeImagePosition}>{renderImageColumn("pointer-events-auto h-full")}</div>
        </>
      ) : (
        <div className={containerClassName}>
          <div className={gridClassName}>
            {imageOnLeft ? (
              <>
                {renderImageColumn()}
                {textColumn}
              </>
            ) : (
              <>
                {textColumn}
                {renderImageColumn()}
              </>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
