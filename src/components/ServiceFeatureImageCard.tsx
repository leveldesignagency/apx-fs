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
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-white/5 md:aspect-[16/10]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
          className={cn(FS_SERVICE_IMAGE_GROW_INNER, "object-cover")}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[78%] bg-gradient-to-t from-black from-[18%] via-black/80 via-[48%] to-transparent md:h-[85%] md:from-[12%] md:via-[40%]"
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 z-[1] flex flex-col px-6 pb-6 pt-8 sm:px-7 sm:pb-7 md:px-6 md:pb-5 md:pt-6">
          <h3 className="min-w-0 text-left font-title text-xl font-bold leading-tight tracking-tight text-white sm:text-[1.35rem]">
            {toTitleCase(title)}
          </h3>
          <p
            className="mt-3 text-left text-[15px] leading-[1.65] text-white/90 md:mt-0 md:max-h-0 md:overflow-hidden md:opacity-0 md:transition-[max-height,opacity,margin] md:duration-300 md:ease-out md:group-hover:mt-2 md:group-hover:max-h-40 md:group-hover:opacity-100 motion-reduce:md:mt-2 motion-reduce:md:max-h-none motion-reduce:md:opacity-100"
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
