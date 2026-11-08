"use client"

import Image from "next/image"
import Link from "next/link"
import { CustomPillButton } from "@/components/ui/CustomPillButton"
import { CallPhoneCta } from "@/components/ui/CallPhoneCta"
import { FsInsetCtaCard } from "@/components/FsInsetCtaCard"
import { Reveal } from "@/components/Reveal"
import { ServiceItemReveal } from "@/components/ServiceItemReveal"
import { MAIN_CASE_STUDIES } from "@/data/projects"
import { FS_PROJECTS_CONTENT_MAX, FS_PROJECTS_SECTION_PX } from "@/lib/fsProjectsLayout"
import { toTitleCase } from "@/lib/titleCase"

export default function ProjectsPage() {
  const projects = MAIN_CASE_STUDIES

  return (
    <div className="fs-projects-page min-h-screen overflow-x-hidden bg-[var(--page-bg)] text-white">
      <section className={`page-title-band border-b border-white/10 ${FS_PROJECTS_SECTION_PX}`}>
        <div className={FS_PROJECTS_CONTENT_MAX}>
          <div className="max-w-3xl">
            <Reveal>
              <span className="section-label mb-3 block text-white/75">Work in Focus</span>
              <h1
                className="text-left font-title text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
              >
                Built to Sign Off, Fire &amp; Security That Endures
              </h1>
              <p className="mt-4 max-w-2xl text-left text-base font-normal leading-relaxed tracking-tight text-white/70 sm:text-lg md:text-xl">
                A selection of fire and security installations we have delivered for commercial, public-sector and
                domestic clients across London and the Home Counties.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className={`border-b border-white/10 py-16 sm:py-20 lg:py-24 ${FS_PROJECTS_SECTION_PX}`}>
        <div className={FS_PROJECTS_CONTENT_MAX}>
          <ul className="m-0 grid list-none grid-cols-1 gap-8 p-0 md:grid-cols-2 md:gap-10 xl:grid-cols-3">
            {projects.map((project, index) => (
              <li key={project.slug} className="m-0 min-w-0 p-0">
                <ServiceItemReveal index={index} stepMs={70} className="h-full">
                  <article className="group relative flex h-full flex-col overflow-hidden border border-white/12 bg-black/40 transition-[border-color] duration-300 hover:border-white/35">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="absolute inset-0 z-10"
                      aria-label={`View ${project.title} project`}
                    >
                      <span className="sr-only">View {toTitleCase(project.title)}</span>
                    </Link>

                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={project.heroImage}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
                        sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                      />
                      <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"
                        aria-hidden
                      />
                      <span className="absolute bottom-3 left-3 rounded-full border border-white/25 bg-black/70 px-3 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-white/90 backdrop-blur-sm">
                        {project.sector}
                      </span>
                    </div>

                    <div className="relative z-0 flex flex-1 flex-col p-5 sm:p-6 md:p-7">
                      <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-white/45">
                        {project.location}
                        <span aria-hidden> · </span>
                        {project.status}
                      </p>
                      <h2 className="mt-2 font-title text-xl font-bold leading-snug tracking-tight text-white sm:text-2xl">
                        {toTitleCase(project.title)}
                      </h2>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-white/65 sm:text-base">
                        {project.shortDescription}
                      </p>
                      <div className="pointer-events-none mt-6" aria-hidden>
                        <CustomPillButton href={`/projects/${project.slug}`} size="sm" tabIndex={-1}>
                          View Project
                        </CustomPillButton>
                      </div>
                    </div>
                  </article>
                </ServiceItemReveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FsInsetCtaCard
        variant="service"
        backgroundImageSrc="/projects/cta-architectural-blueprints.jpg"
        headline="Start Your"
        headlineAccent="Next Project"
        description="Discuss your fire or security requirements with our team. We offer free surveys and tailored solutions across London and the Home Counties."
      >
        <CustomPillButton href="/contact" size="lg">
          Get in Touch
        </CustomPillButton>
        <CallPhoneCta size="lg" />
      </FsInsetCtaCard>
    </div>
  )
}
