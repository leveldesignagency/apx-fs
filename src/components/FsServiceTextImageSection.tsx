import type { ReactNode } from "react"
import Image from "next/image"
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
  className?: string
  /** Minimum height of the row on large screens (image column) */
  imageMinHeightClassName?: string
}

/**
 * Text-led service section: ~60% copy (left), ~40% full-height image (right).
 * Image: canted (angled) clip on the **left** edge, black feathering on the **right** into the page background.
 * Replace `imageSrc` when artwork is available.
 */
export function FsServiceTextImageSection({
  title,
  titleId,
  children,
  imageSrc,
  imageAlt = "",
  className,
  imageMinHeightClassName = "lg:min-h-[min(28rem,70vh)]",
}: FsServiceTextImageSectionProps) {
  const headingId = titleId ?? "fs-service-text-image-heading"
  const resolvedImageSrc = imageSrc ?? fsPlaceholderImageForKey(headingId)

  /** Left edge canted: diagonal from ~14% top toward bottom-left */
  const imageClipStyle = {
    clipPath: "polygon(14% 0, 100% 0, 100% 100%, 0% 100%)",
    WebkitClipPath: "polygon(14% 0, 100% 0, 100% 100%, 0% 100%)",
  } as const

  return (
    <section className={cn("relative bg-black", className)} aria-labelledby={headingId}>
      {/* Match other FS service sections: `container mx-auto px-6` (same left/right gutter as standard section wrappers). */}
      <div className="container relative mx-auto w-full px-6">
        <div
          className={cn(
            "grid grid-cols-1 items-stretch gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-0",
            imageMinHeightClassName
          )}
        >
          <div className="flex w-full min-w-0 flex-col justify-center py-16 lg:py-16 lg:pr-8 xl:pr-12">
            <h2 id={headingId} className="mb-6 text-left font-title text-3xl font-bold text-white sm:text-4xl">
              {title}
            </h2>
            <div className="max-w-3xl space-y-4 text-base leading-relaxed text-gray-300 sm:text-lg">{children}</div>
          </div>

          <div className="relative h-full min-h-[240px] w-full min-w-0">
          <div className="absolute inset-0 overflow-hidden bg-neutral-900" style={imageClipStyle}>
            <Image
              src={resolvedImageSrc}
              alt={imageAlt}
              fill
              className="object-cover object-center"
              sizes="40vw"
              priority={false}
            />
            {/* Right-edge feather into page black */}
            <div
              className="pointer-events-none absolute inset-0 z-[1]"
              style={{
                background: "linear-gradient(to left, rgb(0 0 0) 0%, rgba(0, 0, 0, 0) 38%)",
              }}
              aria-hidden
            />
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}
