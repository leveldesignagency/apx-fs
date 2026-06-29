import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MAIN_CASE_STUDIES, getProjectBySlug } from "@/data/projects"
import { buildFsMetadata } from "@/lib/seo-metadata"
import { FS_PROJECTS_CONTENT_MAX, FS_PROJECTS_SECTION_PX } from "@/lib/fsProjectsLayout"
import { ProjectDetailStory } from "@/components/projects/ProjectDetailStory"

/** Matches Footer.tsx quick links: grow-from-centre underline on hover */
const FS_FOOTER_STYLE_EXT_LINK =
  "relative group inline-block max-w-full cursor-pointer pb-1 text-inherit no-underline transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/50"
const FS_FOOTER_STYLE_EXT_LINK_LINE =
  "pointer-events-none absolute bottom-0 left-1/2 h-0.5 w-full -translate-x-1/2 origin-center scale-x-0 bg-white transition-transform duration-500 group-hover:scale-x-100"

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
            {project.heroTitleLinkUrl ? (
              <a
                href={project.heroTitleLinkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="fs-project-hero-title-link"
              >
                {project.title}
              </a>
            ) : (
              project.title
            )}
          </h1>
          <p className="mt-2 text-sm uppercase tracking-[0.16em] text-white/75">
            <span>{project.sector}</span>
            <span aria-hidden="true"> · </span>
            {project.heroLocationLinkUrl ? (
              <a
                href={project.heroLocationLinkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={FS_FOOTER_STYLE_EXT_LINK}
              >
                {project.location}
                <span className={FS_FOOTER_STYLE_EXT_LINK_LINE} aria-hidden />
              </a>
            ) : (
              project.location
            )}
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
          <span
            className="section-label mb-3 block text-white/55"
            style={{ fontFamily: "var(--font-menu), sans-serif" }}
          >
            Gallery
          </span>
          <h2 className="font-title text-2xl font-bold text-white md:text-3xl lg:text-4xl">Project images</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:mt-10">
            {galleryImages.map((img, idx) => (
              <div key={`${img}-${idx}`} className="group relative aspect-[4/3] overflow-hidden">
                <Image
                  src={img}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10 transition-colors group-hover:ring-white/25" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {project.clientReview && (
        <section
          className={`fs-project-client-review relative border-t border-white/10 bg-black ${FS_PROJECTS_SECTION_PX}`}
          aria-labelledby="project-client-review-heading"
        >
          <div className={`${FS_PROJECTS_CONTENT_MAX} py-16 md:py-24`}>
            <p
              id="project-client-review-heading"
              className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/80"
              style={{ fontFamily: "var(--font-menu), sans-serif" }}
            >
              Client review
            </p>
            <blockquote className="mt-6 border-l border-white/25 pl-5 md:pl-7">
              <div className="space-y-5 text-sm font-normal leading-relaxed text-white/85 md:text-base md:leading-relaxed">
                {project.clientReview.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <footer className="mt-10 border-t border-white/15 pt-7">
                <p className="text-xl font-semibold font-title leading-snug text-white md:text-2xl">
                  {project.clientReview.organizationUrl ? (
                    <a
                      href={project.clientReview.organizationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={FS_FOOTER_STYLE_EXT_LINK}
                    >
                      {project.clientReview.organization}
                      <span className={FS_FOOTER_STYLE_EXT_LINK_LINE} aria-hidden />
                    </a>
                  ) : (
                    project.clientReview.organization
                  )}
                </p>
                <p className="mt-3 text-base font-medium text-white md:text-lg">{project.clientReview.author}</p>
                <p className="mt-1 text-sm text-white/65">{project.clientReview.role}</p>
              </footer>
            </blockquote>
          </div>
        </section>
      )}

      <section className={`mt-12 border-t border-white/10 md:mt-16 ${FS_PROJECTS_SECTION_PX}`}>
        <div className={`${FS_PROJECTS_CONTENT_MAX} py-14 pb-24 md:py-16 md:pb-28`}>
          <h2 className="pt-4 text-2xl font-title font-semibold md:pt-6 md:text-3xl">Explore other projects</h2>
          <div className="mt-7 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {related.map((item) => (
              <Link key={item.slug} href={`/projects/${item.slug}`} className="group block border border-white/10 p-2 hover:border-white/40">
                <div className="relative aspect-[4/3] overflow-hidden border border-white/10">
                  <Image
                    src={item.heroImage}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 16vw"
                  />
                </div>
                <p className="mt-2 line-clamp-2 text-xs uppercase tracking-[0.08em] text-white/70 group-hover:text-white">{item.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
