import Image from "next/image"
import { FS_SERVICE_IMAGE_GROW_INNER, FS_SERVICE_SHIMMER_CARD } from "@/lib/fsServicePageCards"
import { toTitleCase } from "@/lib/titleCase"
import { cn } from "@/lib/utils"

type ServiceFeatureImageCardProps = {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  className?: string
  /** Extra classes on the fill Image (e.g. object-bottom to reframe within the mask). */
  imageClassName?: string
  /** Anchor id for homepage search deep-links + flash highlight. */
  id?: string
}

/**
 * Service feature card with title and copy over the photo.
 * Bottom feather only, so the image stays visible above the text.
 * Used across Fire & Security service pages for capability and benefit grids.
 */
export function ServiceFeatureImageCard({
  title,
  description,
  imageSrc,
  imageAlt,
  className,
  imageClassName,
  id,
}: ServiceFeatureImageCardProps) {
  return (
    <div
      id={id}
      className={cn(
        FS_SERVICE_SHIMMER_CARD,
        "group relative h-full overflow-hidden p-0",
        id ? "scroll-mt-28" : null,
        className
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-tl-[1.25rem] rounded-br-[1.25rem] bg-white/5 sm:aspect-[5/4] md:aspect-[16/10]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
          className={cn(FS_SERVICE_IMAGE_GROW_INNER, "object-cover object-center", imageClassName)}
          draggable={false}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[82%] bg-gradient-to-t from-black from-[22%] via-black/80 via-[52%] to-transparent md:h-[85%] md:from-[12%] md:via-[40%]"
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 z-[1] flex flex-col px-5 pb-5 pt-6 sm:px-7 sm:pb-7 sm:pt-8 md:px-6 md:pb-5 md:pt-6">
          <h3 className="fs-service-feature-card__title min-w-0 text-left font-title text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl md:text-[1.85rem]">
            {toTitleCase(title)}
          </h3>
          <p
            className="fs-service-feature-card__body mt-2 text-left text-base leading-[1.55] text-white/90 sm:mt-3 sm:text-lg sm:leading-[1.65] md:mt-0 md:max-h-0 md:overflow-hidden md:opacity-0 md:transition-[max-height,opacity,margin] md:duration-300 md:ease-out md:group-hover:mt-2 md:group-hover:max-h-40 md:group-hover:opacity-100 motion-reduce:md:mt-2 motion-reduce:md:max-h-none motion-reduce:md:opacity-100"
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
