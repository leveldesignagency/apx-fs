import type { LucideIcon } from "lucide-react"
import { FS_SERVICE_SHIMMER_CARD_FEATURE } from "@/lib/fsServicePageCards"
import { cn } from "@/lib/utils"

type ServiceFeatureIconCardProps = {
  icon: LucideIcon
  title: string
  description: string
  className?: string
  /** Override the default shimmer feature shell (e.g. solid black capability cards). */
  shellClassName?: string
}

/**
 * Service feature card: title + body left, Lucide icon top-right.
 * Keeps shared shimmer border / hover from {@link FS_SERVICE_SHIMMER_CARD_FEATURE}.
 */
export function ServiceFeatureIconCard({
  icon: Icon,
  title,
  description,
  className,
  shellClassName,
}: ServiceFeatureIconCardProps) {
  return (
    <div
      className={cn(
        shellClassName ?? FS_SERVICE_SHIMMER_CARD_FEATURE,
        "relative flex h-full flex-col pr-14",
        className
      )}
    >
      <Icon
        className="absolute right-6 top-6 h-7 w-7 text-white sm:right-7 sm:top-7 sm:h-8 sm:w-8"
        strokeWidth={1.5}
        aria-hidden
      />
      <h3 className="min-w-0 text-left font-title text-xl font-bold leading-tight tracking-tight text-white sm:text-[1.35rem]">
        {title}
      </h3>
      <p className="mt-4 text-left text-[15px] leading-[1.65] text-white/55">{description}</p>
    </div>
  )
}
