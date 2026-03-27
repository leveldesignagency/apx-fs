import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MAIN_CASE_STUDIES, getProjectBySlug } from "@/data/projects"

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return MAIN_CASE_STUDIES.map((project) => ({ slug: project.slug }))
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
        <div className="relative z-10 mx-auto w-full max-w-[min(100%,92rem)] px-4 pb-14 pt-28 sm:px-6 md:pb-16 md:pt-32 lg:px-8">
          <Link href="/projects" className="text-sm uppercase tracking-[0.18em] text-white/70 hover:text-white">
            Back to projects
          </Link>
          <h1 className="mt-3 max-w-full text-4xl font-title font-bold leading-tight min-[900px]:max-w-[75%] md:text-6xl">
            {project.title}
          </h1>
          <p className="mt-2 text-sm uppercase tracking-[0.16em] text-white/75">
            {project.sector} · {project.location}
          </p>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/90 md:text-lg">{project.summary}</p>
        </div>
      </section>

      <section className="relative z-20 bg-black overflow-visible">
        <div className="mx-auto w-full max-w-[min(100%,92rem)] px-4 pt-10 pb-20 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="h-auto min-h-[8.5rem] overflow-visible border border-white/10 bg-white/[0.03] p-3.5 md:p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.06em] text-white">Scope</p>
              <p className="mt-2 text-sm leading-relaxed text-white/90">{project.scope}</p>
            </div>
            <div className="h-auto min-h-[8.5rem] overflow-visible border border-white/10 bg-white/[0.03] p-3.5 md:p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.06em] text-white">Systems</p>
              <p className="mt-2 text-sm leading-relaxed text-white/90">{project.systems}</p>
            </div>
            <div className="h-auto min-h-[8.5rem] overflow-visible border border-white/10 bg-white/[0.03] p-3.5 md:p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.06em] text-white">Status</p>
              <p className="mt-2 text-sm leading-relaxed text-white/90">{project.status}</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="h-auto min-h-[10.5rem] overflow-visible border border-white/10 bg-white/[0.02] p-4 md:p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.06em] text-white">Challenge</p>
              <p className="mt-2 text-sm leading-relaxed text-white/85">{project.challenge}</p>
            </div>
            <div className="h-auto min-h-[10.5rem] overflow-visible border border-white/10 bg-white/[0.02] p-4 md:p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.06em] text-white">Solution</p>
              <p className="mt-2 text-sm leading-relaxed text-white/85">{project.solution}</p>
            </div>
            <div className="h-auto min-h-[10.5rem] overflow-visible border border-white/10 bg-white/[0.02] p-4 md:p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.06em] text-white">Outcome</p>
              <p className="mt-2 text-sm leading-relaxed text-white/85">{project.outcome}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-6 border-t border-white/10 bg-black">
        <div className="mx-auto w-full max-w-[min(100%,92rem)] px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-xl font-title font-semibold md:text-2xl">Project Images</h2>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            {galleryImages.map((img, idx) => (
              <div key={`${img}-${idx}`} className="relative aspect-[4/3] overflow-hidden border border-white/10">
                <Image src={img} alt={project.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {project.clientReview && (
        <section
          className="fs-project-client-review relative border-t-2 border-white/25 bg-white/[0.06]"
          aria-labelledby="project-client-review-heading"
        >
          <div className="mx-auto w-full max-w-[min(100%,52rem)] px-4 py-16 sm:px-6 md:py-24 lg:px-8">
            <p
              id="project-client-review-heading"
              className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/80"
              style={{ fontFamily: "var(--font-menu), sans-serif" }}
            >
              Client review
            </p>
            <blockquote className="mt-6 border-l-4 border-white pl-6 md:pl-8">
              <div className="space-y-6 text-lg font-semibold leading-[1.55] text-white md:text-xl md:leading-[1.55]">
                {project.clientReview.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <footer className="mt-12 border-t border-white/20 pt-8">
                <p className="text-2xl font-bold font-title leading-tight text-white md:text-3xl">
                  {project.clientReview.organization}
                </p>
                <p className="mt-4 text-lg font-semibold text-white md:text-xl">{project.clientReview.author}</p>
                <p className="mt-1 text-sm text-white/70 md:text-base">{project.clientReview.role}</p>
              </footer>
            </blockquote>
          </div>
        </section>
      )}

      <section className="mt-12 border-t border-white/10 md:mt-16">
        <div className="mx-auto w-full max-w-[min(100%,92rem)] px-4 py-14 pb-24 sm:px-6 lg:px-8 md:py-16 md:pb-28">
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
