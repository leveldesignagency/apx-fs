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
import { FsInsetCtaCard } from "@/components/FsInsetCtaCard"
import { CustomPillButton } from "@/components/ui/CustomPillButton"

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
    description: `${desc} ${project.location}.`,
    pathname: `/projects/${slug}`,
  })
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const related = MAIN_CASE_STUDIES.filter((item) => item.slug !== project.slug).slice(0, 6)
  const galleryImages = Array.from(new Set(project.gallery))

  return (
    <div className="fs-projects-page fs-project-detail-page min-h-screen bg-black text-white" style={{ backgroundColor: "#000000" }}>
      <section className="relative isolate flex min-h-[64vh] flex-col overflow-hidden border-b border-white/10 md:min-h-[72vh]">
        <div className="absolute inset-0">
          <Image src={project.heroImage} alt={project.title} fill className="object-cover" sizes="100vw" priority />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/55" />
        </div>
        <div className={`relative z-10 mt-auto page-title-top pb-24 md:pb-28 lg:pb-32 ${FS_PROJECTS_SECTION_PX}`}>
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
              <span aria-hidden="true"> · </span>
              <span>{project.status}</span>
            </p>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/90 md:text-lg">{project.summary}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <CustomPillButton href={`/contact?project=${encodeURIComponent(project.slug)}`} size="md">
                Enquire about a similar project
              </CustomPillButton>
              <CustomPillButton href="tel:02083032280" size="md" variant="outline">
                Call 020 8303 2280
              </CustomPillButton>
            </div>
          </div>
        </div>
      </section>

      <section className={`relative z-20 overflow-visible bg-black ${FS_PROJECTS_SECTION_PX}`}>
        <div className={`${FS_PROJECTS_CONTENT_MAX} pt-8 pb-12 md:pt-10 md:pb-14`}>
          <ProjectDetailStory project={project} />
        </div>
      </section>

      {galleryImages.length > 0 ? (
        <section className={`relative z-10 border-t border-white/10 bg-black ${FS_PROJECTS_SECTION_PX}`}>
          <div className={`${FS_PROJECTS_CONTENT_MAX} py-10 md:py-12`}>
            <ProjectDetailGallery title={project.title} images={galleryImages} />
          </div>
        </section>
      ) : null}

      {project.clientReview && (
        <section
          className={`fs-project-client-review relative border-t border-white/10 bg-black ${FS_PROJECTS_SECTION_PX}`}
          aria-labelledby="project-client-review-heading"
        >
          <div className={`${FS_PROJECTS_CONTENT_MAX} py-12 md:py-14`}>
            <ProjectDetailClientReview review={project.clientReview} />
          </div>
        </section>
      )}

      <section className={`border-t border-white/10 ${FS_PROJECTS_SECTION_PX}`}>
        <div className={`${FS_PROJECTS_CONTENT_MAX} py-10 pb-16 md:py-12 md:pb-20 lg:pb-24`}>
          <ProjectDetailRelated related={related} />
        </div>
      </section>

      <FsInsetCtaCard
        variant="service"
        backgroundImageSrc={project.heroImage}
        showBorderTop
        headline="Start your"
        headlineAccent="next project."
        description="Discuss a similar fire or security project with our team. We offer free surveys across London and the Home Counties."
      >
        <CustomPillButton href={`/contact?project=${encodeURIComponent(project.slug)}`} size="lg">
          Get in touch
        </CustomPillButton>
        <CustomPillButton href="tel:02083032280" size="lg" variant="outline">
          Call 020 8303 2280
        </CustomPillButton>
      </FsInsetCtaCard>
    </div>
  )
}
