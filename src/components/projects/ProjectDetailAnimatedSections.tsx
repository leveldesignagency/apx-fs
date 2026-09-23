"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Reveal } from "@/components/Reveal"
import { ServiceItemReveal } from "@/components/ServiceItemReveal"
import type { FsProject } from "@/data/projects"

const FS_FOOTER_STYLE_EXT_LINK =
  "relative group inline-block max-w-full cursor-pointer pb-1 text-inherit no-underline transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/50"
const FS_FOOTER_STYLE_EXT_LINK_LINE =
  "pointer-events-none absolute bottom-0 left-1/2 h-0.5 w-full -translate-x-1/2 origin-center scale-x-0 bg-white transition-transform duration-500 group-hover:scale-x-100"

type ProjectDetailGalleryProps = {
  title: string
  images: string[]
}

export function ProjectDetailGallery({ title, images }: ProjectDetailGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  const prevImage = useCallback(() => {
    if (lightboxIndex === null || images.length < 2) return
    setLightboxIndex((lightboxIndex - 1 + images.length) % images.length)
  }, [images.length, lightboxIndex])

  const nextImage = useCallback(() => {
    if (lightboxIndex === null || images.length < 2) return
    setLightboxIndex((lightboxIndex + 1) % images.length)
  }, [images.length, lightboxIndex])

  useEffect(() => {
    if (lightboxIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowLeft") prevImage()
      if (e.key === "ArrowRight") nextImage()
    }
    window.addEventListener("keydown", onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [lightboxIndex, closeLightbox, prevImage, nextImage])

  if (!images.length) return null

  return (
    <>
      <Reveal>
        <span
          className="section-label mb-3 block text-white/55"
          style={{ fontFamily: "var(--font-menu), sans-serif" }}
        >
          Gallery
        </span>
        <h2 className="font-title text-2xl font-bold text-white md:text-3xl lg:text-4xl">Project images</h2>
        <p className="mt-3 max-w-2xl text-sm text-white/60 md:text-base">
          Tap or click an image to open the gallery. Use arrows or keyboard left/right to move between photos.
        </p>
      </Reveal>
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:mt-10">
        {images.map((img, idx) => (
          <ServiceItemReveal key={`${img}-${idx}`} index={idx} stepMs={65} className="block">
            <button
              type="button"
              onClick={() => setLightboxIndex(idx)}
              className="group relative aspect-[4/3] w-full overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              aria-label={`Open gallery image ${idx + 1} of ${images.length} for ${title}`}
            >
              <Image
                src={img}
                alt={`${title}, image ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10 transition-colors group-hover:ring-white/25" />
            </button>
          </ServiceItemReveal>
        ))}
      </div>

      {lightboxIndex !== null && images[lightboxIndex] ? (
        <div
          className="fixed inset-0 z-[120] bg-black/92 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} gallery`}
        >
          <div className="mx-auto flex h-full w-full max-w-[min(100%,100rem)] flex-col px-3 py-3 sm:px-6 sm:py-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="min-w-0 truncate text-xs uppercase tracking-[0.14em] text-white/80 sm:text-sm">
                {title}
                <span className="ml-2 text-white/50">
                  {lightboxIndex + 1} / {images.length}
                </span>
              </p>
              <button
                type="button"
                onClick={closeLightbox}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center border-2 border-white/70 text-white hover:border-white"
                aria-label="Close gallery"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative min-h-0 flex-1 overflow-hidden border-2 border-white/45">
              <Image
                src={images[lightboxIndex]!}
                alt={`${title} image ${lightboxIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />

              {images.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center border-2 border-white/70 bg-black/55 text-white hover:border-white sm:left-3"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center border-2 border-white/70 bg-black/55 text-white hover:border-white sm:right-3"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              ) : null}
            </div>

            {images.length > 1 ? (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {images.map((img, idx) => (
                  <button
                    key={`${img}-thumb-${idx}`}
                    type="button"
                    onClick={() => setLightboxIndex(idx)}
                    className={`relative h-14 w-20 shrink-0 overflow-hidden border-2 sm:h-16 sm:w-24 ${
                      idx === lightboxIndex ? "border-white" : "border-white/50"
                    }`}
                    aria-label={`Go to image ${idx + 1}`}
                    aria-current={idx === lightboxIndex}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="96px" />
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  )
}

type ProjectDetailClientReviewProps = {
  review: NonNullable<FsProject["clientReview"]>
}

export function ProjectDetailClientReview({ review }: ProjectDetailClientReviewProps) {
  return (
    <Reveal>
      <p
        id="project-client-review-heading"
        className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/80"
        style={{ fontFamily: "var(--font-menu), sans-serif" }}
      >
        Client review
      </p>
      <blockquote className="mt-6 border-l border-white/25 pl-5 md:pl-7">
        <div className="space-y-5 text-sm font-normal leading-relaxed text-white/85 md:text-base md:leading-relaxed">
          {review.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <footer className="mt-10 border-t border-white/15 pt-7">
          <p className="text-xl font-semibold font-title leading-snug text-white md:text-2xl">
            {review.organizationUrl ? (
              <a
                href={review.organizationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={FS_FOOTER_STYLE_EXT_LINK}
              >
                {review.organization}
                <span className={FS_FOOTER_STYLE_EXT_LINK_LINE} aria-hidden />
              </a>
            ) : (
              review.organization
            )}
          </p>
          <p className="mt-3 text-base font-medium text-white md:text-lg">{review.author}</p>
          <p className="mt-1 text-sm text-white/65">{review.role}</p>
        </footer>
      </blockquote>
    </Reveal>
  )
}

type RelatedProject = Pick<FsProject, "slug" | "title" | "heroImage">

type ProjectDetailRelatedProps = {
  related: RelatedProject[]
}

export function ProjectDetailRelated({ related }: ProjectDetailRelatedProps) {
  return (
    <>
      <Reveal>
        <h2 className="pt-4 text-2xl font-title font-semibold md:pt-6 md:text-3xl">Explore other projects</h2>
      </Reveal>
      <div className="mt-7 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {related.map((item, idx) => (
          <ServiceItemReveal key={item.slug} index={idx} stepMs={55} className="block">
            <Link href={`/projects/${item.slug}`} className="group block border border-white/10 p-2 hover:border-white/40">
              <div className="relative aspect-[4/3] overflow-hidden border border-white/10">
                <Image
                  src={item.heroImage}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 16vw"
                />
              </div>
              <p className="mt-2 line-clamp-2 text-xs uppercase tracking-[0.08em] text-white/70 group-hover:text-white">
                {item.title}
              </p>
            </Link>
          </ServiceItemReveal>
        ))}
      </div>
    </>
  )
}
