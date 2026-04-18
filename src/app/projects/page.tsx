"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { CustomPillButton } from "@/components/ui/CustomPillButton"
import { MAIN_CASE_STUDIES } from "@/data/projects"

/** Grid card CTAs only — square corners; “Get in touch” uses `CustomPillButton` (TL/BR rounded like hero). */
const PROJECTS_GRID_CTA_CLASS =
  "pill-btn pill-btn--square relative inline-flex cursor-pointer items-center justify-center overflow-hidden bg-black px-4 py-2.5 text-xs uppercase tracking-[0.12em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"

export default function ProjectsPage() {
  const [activeProjectSlug, setActiveProjectSlug] = useState<string | null>(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const textClass = "text-white"
  const mutedClass = "text-white/70"
  const bgStyle = { backgroundColor: "#000000" }
  const projects = useMemo(() => MAIN_CASE_STUDIES, [])
  const activeProject = activeProjectSlug
    ? projects.find((project) => project.slug === activeProjectSlug) ?? null
    : null
  const activeGallery = activeProject?.gallery ?? []

  const openGallery = (slug: string, imageIndex = 0) => {
    setActiveProjectSlug(slug)
    setActiveImageIndex(imageIndex)
  }

  const closeGallery = () => {
    setActiveProjectSlug(null)
    setActiveImageIndex(0)
  }

  const prevImage = () => {
    if (!activeGallery.length) return
    setActiveImageIndex((idx) => (idx - 1 + activeGallery.length) % activeGallery.length)
  }

  const nextImage = () => {
    if (!activeGallery.length) return
    setActiveImageIndex((idx) => (idx + 1) % activeGallery.length)
  }

  return (
    <div className="fs-projects-page min-h-screen overflow-x-hidden" style={bgStyle}>
      <section className="page-title-band px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[min(100%,92rem)]">
          <div className="max-w-2xl">
            <span className="section-label mb-3 block text-white/75">Work in focus</span>
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-3 text-left ${textClass}`}
              style={{ fontFamily: "var(--font-menu)" }}
            >
              Built to sign off — fire & security that endures
            </h1>
            <p className={`text-base sm:text-lg md:text-xl font-normal text-left tracking-tight ${mutedClass}`}>
              A selection of fire and security installations we have delivered for commercial, public sector, and domestic clients across London and the Home Counties.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8" style={bgStyle}>
        <div className="mx-auto w-full max-w-[min(100%,92rem)]">
          <div className="space-y-8 md:space-y-10">
            {projects.map((project) => (
              <article key={project.slug} className="grid grid-cols-1 gap-0 border-2 border-white/70 bg-black md:grid-cols-2">
                <button
                  type="button"
                  onClick={() => openGallery(project.slug, 0)}
                  className="group relative aspect-[16/10] w-full overflow-hidden border-b-2 border-white/70 md:border-b-0 md:border-r-2 md:border-white/70"
                  aria-label={`Open gallery for ${project.title}`}
                >
                  <Image
                    src={project.heroImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <span className="absolute bottom-3 left-3 border-2 border-white bg-black/55 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-white">
                    View gallery ({project.gallery.length})
                  </span>
                </button>

                <div className="flex flex-col justify-between p-6 md:p-8">
                  <div>
                    <p className={`text-xs font-semibold uppercase tracking-[0.14em] ${mutedClass}`}>
                      {project.sector} · {project.location}
                    </p>
                    <h2 className={`mt-3 text-3xl font-title font-bold leading-tight md:text-4xl ${textClass}`}>
                      <Link href={`/projects/${project.slug}`} className="hover:opacity-85 transition-opacity">
                        {project.title}
                      </Link>
                    </h2>
                    <p className={`mt-4 text-base leading-relaxed ${mutedClass}`}>{project.shortDescription}</p>
                    <p className={`mt-3 text-base leading-relaxed ${mutedClass}`}>{project.summary}</p>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Link
                      href={`/projects/${project.slug}`}
                      className={PROJECTS_GRID_CTA_CLASS}
                    >
                      <span className="pill-btn-inner" aria-hidden />
                      <span className="pill-btn-border" aria-hidden />
                      <span className="pill-text font-bold">View Project</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => openGallery(project.slug, 0)}
                      className={PROJECTS_GRID_CTA_CLASS}
                    >
                      <span className="pill-btn-inner" aria-hidden />
                      <span className="pill-btn-border" aria-hidden />
                      <span className="pill-text font-bold">Open Gallery</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full h-[2px] bg-white/45" />

      <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8" style={bgStyle}>
        <div className="mx-auto w-full max-w-[min(100%,72rem)] text-center">
          <h2 className={`text-3xl font-bold font-title mb-4 ${textClass}`}>Start Your Project</h2>
          <p className={`text-lg mb-8 ${mutedClass}`}>
            Discuss your fire or security requirements with our team. We offer free surveys and tailored solutions.
          </p>
          <CustomPillButton href="/contact" size="lg">Get in touch</CustomPillButton>
        </div>
      </section>

      {activeProject && activeGallery.length > 0 && (
        <div className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-[2px]">
          <div className="mx-auto flex h-full w-full max-w-[min(100%,100rem)] flex-col px-4 py-4 sm:px-6">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm uppercase tracking-[0.14em] text-white/80">{activeProject.title}</p>
              <button
                type="button"
                onClick={closeGallery}
                className="inline-flex h-10 w-10 items-center justify-center border-2 border-white/70 text-white hover:border-white"
                aria-label="Close gallery"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative flex-1 overflow-hidden border-2 border-white/45">
              <Image
                src={activeGallery[activeImageIndex]!}
                alt={`${activeProject.title} image ${activeImageIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
              />

              <button
                type="button"
                onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center border-2 border-white/70 bg-black/45 text-white hover:border-white"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center border-2 border-white/70 bg-black/45 text-white hover:border-white"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {activeGallery.map((img, idx) => (
                <button
                  key={`${img}-${idx}`}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative h-16 w-24 shrink-0 overflow-hidden border-2 ${
                    idx === activeImageIndex ? "border-white" : "border-white/60"
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="96px" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
