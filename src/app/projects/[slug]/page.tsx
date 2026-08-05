import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MAIN_CASE_STUDIES, getProjectBySlug } from "@/data/projects"
import { buildFsMetadata } from "@/lib/seo-metadata"
import { FS_PROJECTS_CONTENT_MAX, FS_PROJECTS_SECTION_PX } from "@/lib/fsProjectsLayout"
import { ProjectDetailStory } from "@/components/projects/ProjectDetailStory"
import {
  ProjectDetailClientReview,
  ProjectDetailGallery,
  ProjectDetailRelated,
} from "@/components/projects/ProjectDetailAnimatedSections"

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return MAIN_CASE_STUDIES.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) {
    return { title: "Project | APX Fire & Security" }
  }
  const desc =
    project.shortDescription.length > 160
      ? `${project.shortDescription.slice(0, 157)}…`
      : project.shortDescription
  return buildFsMetadata({
    title: `${project.title} | Fire & Security Case Study | APX`,
    description: `${desc} ${project.location}, London & South East.`,
    pathname: `/projects/${slug}`,
  })
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const related = MAIN_CASE_STUDIES.filter((item) => item.slug !== project.slug).slice(0, 6)
  const galleryImages = project.gallery.filter((img) => img !== project.heroImage)

  return (
    <div className="fs-projects-page fs-project-detail-page min-h-screen bg-black text-white" style={{ backgroundColor: "#000000" }}>
      <section className="relative isolate overflow-hidden border-b border-white/10 min-h-[56vh] md:min-h-[62vh]">
        <div className="absolute inset-0">
          <Image src={project.heroImage} alt={project.title} fill className="object-cover" sizes="100vw" priority />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/55" />
        </div>
        <div className={`relative z-10 page-title-top pb-14 md:pb-16 ${FS_PROJECTS_SECTION_PX}`}>
          <div className={FS_PROJECTS_CONTENT_MAX}>
          <Link href="/projects" className="text-sm uppercase tracking-[0.18em] text-white/70 hover:text-white">
            Back to projects
          </Link>
          <h1 className="mt-3 max-w-full text-4xl font-title font-bold leading-tight min-[900px]:max-w-[75%] md:text-6xl">
            {project.title}
          </h1>
          <p className="mt-2 text-sm uppercase tracking-[0.16em] text-white/75">
            <span>{project.sector}</span>
            <span aria-hidden="true"> · </span>
            <span>{project.location}</span>
          </p>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/90 md:text-lg">{project.summary}</p>
          </div>
        </div>
      </section>

      <section className={`relative z-20 overflow-visible bg-black ${FS_PROJECTS_SECTION_PX}`}>
        <div className={`${FS_PROJECTS_CONTENT_MAX} pt-10 pb-20 md:pt-12 md:pb-24`}>
          <ProjectDetailStory project={project} />
        </div>
      </section>

      <section className={`relative z-10 mt-6 border-t border-white/10 bg-black ${FS_PROJECTS_SECTION_PX}`}>
        <div className={`${FS_PROJECTS_CONTENT_MAX} py-12 md:py-14`}>
          <ProjectDetailGallery title={project.title} images={galleryImages} />
        </div>
      </section>

      {project.clientReview && (
        <section
          className={`fs-project-client-review relative border-t border-white/10 bg-black ${FS_PROJECTS_SECTION_PX}`}
          aria-labelledby="project-client-review-heading"
        >
          <div className={`${FS_PROJECTS_CONTENT_MAX} py-16 md:py-24`}>
            <ProjectDetailClientReview review={project.clientReview} />
          </div>
        </section>
      )}

      <section className={`mt-12 border-t border-white/10 md:mt-16 ${FS_PROJECTS_SECTION_PX}`}>
        <div className={`${FS_PROJECTS_CONTENT_MAX} py-14 pb-24 md:py-16 md:pb-28`}>
          <ProjectDetailRelated related={related} />
        </div>
      </section>
    </div>
  )
}
