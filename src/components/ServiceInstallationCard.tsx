"use client"

import Image from "next/image"
import {
  FS_SERVICE_IMAGE_GROW_INNER,
  FS_SERVICE_INSTALLATION_CARD,
} from "@/lib/fsServicePageCards"
import { toTitleCase } from "@/lib/titleCase"
import { cn } from "@/lib/utils"

export type ServiceInstallationCardProps = {
  imageSrc: string
  imageAlt?: string
  title: string
  /** Primary line under the title (venue / organisation). */
  subtitle?: string
  /** Secondary supporting line. */
  meta?: string
  className?: string
}

/**
 * Installation card: full-bleed image with equal-height overlay text
 * and a feathered black gradient for legibility.
 */
export function ServiceInstallationCard({
  imageSrc,
  imageAlt = "",
  title,
  subtitle,
  meta,
  className,
}: ServiceInstallationCardProps) {
  return (
    <article
      className={cn(
        FS_SERVICE_INSTALLATION_CARD,
        "relative aspect-[4/3] h-full min-h-0",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden select-none" aria-hidden>
        <div className={FS_SERVICE_IMAGE_GROW_INNER}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            draggable={false}
            className="object-cover object-center"
            sizes="(min-width: 768px) 22.5rem, 100vw"
          />
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] bg-[linear-gradient(to_top,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.72)_42%,rgba(0,0,0,0.28)_72%,rgba(0,0,0,0)_100%)] pt-16 sm:pt-20"
        aria-hidden
      />
      <div className="absolute inset-x-0 bottom-0 z-[2] px-5 pb-5 pt-16 sm:px-6 sm:pb-6 sm:pt-20 md:px-7 md:pb-7">
        <h3 className="fs-service-installation-card__title font-title text-xl font-bold leading-[1.08] tracking-normal text-white sm:text-[1.35rem]">
          {toTitleCase(title)}
        </h3>
        {subtitle ? (
          <p className="mt-1.5 text-sm font-medium leading-snug text-white/95 sm:text-base">
            {subtitle}
          </p>
        ) : null}
        {meta ? (
          <p className="mt-1 text-sm leading-snug text-white/70 sm:text-base">{meta}</p>
        ) : null}
      </div>
    </article>
  )
}
