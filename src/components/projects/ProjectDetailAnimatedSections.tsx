"use client"

import Image from "next/image"
import Link from "next/link"
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
      </Reveal>
      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:mt-10">
        {images.map((img, idx) => (
          <ServiceItemReveal key={`${img}-${idx}`} index={idx} stepMs={65} className="block">
            <div className="group relative aspect-[4/3] overflow-hidden">
              <Image
                src={img}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10 transition-colors group-hover:ring-white/25" />
            </div>
          </ServiceItemReveal>
        ))}
      </div>
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
