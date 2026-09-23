"use client"

import type { ReactNode } from "react"
import type { FsProject } from "@/data/projects"
import { ServiceItemReveal } from "@/components/ServiceItemReveal"

type ProjectDetailStoryProps = {
  project: Pick<
    FsProject,
    "scope" | "systems" | "status" | "challenge" | "solution" | "outcome" | "engagementNote" | "contractorOrClient"
  >
}

const META_FIELDS = [
  { key: "scope", label: "APX scope" },
  { key: "systems", label: "Systems" },
  { key: "status", label: "Status" },
] as const satisfies ReadonlyArray<{
  key: keyof Pick<FsProject, "scope" | "systems" | "status">
  label: string
}>

const STORY_FIELDS = [
  { key: "challenge", label: "Challenge" },
  { key: "solution", label: "Solution" },
  { key: "outcome", label: "Outcome" },
] as const satisfies ReadonlyArray<{
  key: keyof Pick<FsProject, "challenge" | "solution" | "outcome">
  label: string
}>

function ProjectDetailField({
  label,
  children,
  className = "",
}: {
  label: string
  children: ReactNode
  className?: string
}) {
  return (
    <article className={`fs-project-detail-field min-w-0 ${className}`.trim()}>
      <h2 className="fs-project-detail-field__title font-title text-xl font-bold leading-[1.1] text-white sm:text-2xl lg:text-[1.65rem]">
        {label}
      </h2>
      <p className="mt-3 text-base leading-relaxed text-white/78 md:mt-4 md:text-[1.0625rem] md:leading-relaxed">
        {children}
      </p>
    </article>
  )
}

/** Project detail, open editorial layout, no boxed cards */
export function ProjectDetailStory({ project }: ProjectDetailStoryProps) {
  return (
    <div className="fs-project-detail-story">
      {project.engagementNote ? (
        <ServiceItemReveal index={0} stepMs={65} className="mb-10 md:mb-12">
          <aside
            className="border-l-2 border-white/35 pl-5 md:pl-6"
            aria-label="How this engagement works"
          >
            <p
              className="section-label mb-2 text-white/55"
              style={{ fontFamily: "var(--font-menu), sans-serif" }}
            >
              Engagement type
            </p>
            <p className="text-base leading-relaxed text-white/90 md:text-lg md:leading-relaxed">
              {project.engagementNote}
            </p>
          </aside>
        </ServiceItemReveal>
      ) : null}

      <div className="fs-project-detail-meta grid grid-cols-1 gap-6 border-y border-white/12 py-8 sm:grid-cols-3 sm:gap-6 md:py-9 lg:gap-8">
        {META_FIELDS.map(({ key, label }, index) => (
          <ServiceItemReveal key={key} index={index} stepMs={65} className="min-w-0">
            <div className={index > 0 ? "sm:border-l sm:border-white/10 sm:pl-6 lg:pl-8" : ""}>
              <p
                className="section-label mb-2 text-white/55"
                style={{ fontFamily: "var(--font-menu), sans-serif" }}
              >
                {label}
              </p>
              <p className="font-title text-xl font-semibold leading-snug text-white sm:text-2xl lg:text-[1.65rem]">
                {project[key]}
              </p>
            </div>
          </ServiceItemReveal>
        ))}
      </div>

      {project.contractorOrClient ? (
        <ServiceItemReveal index={0} stepMs={65} className="mt-6 md:mt-7">
          <p className="text-sm leading-relaxed text-white/65 md:text-base">
            <span className="font-semibold text-white/85">Client / contractor: </span>
            {project.contractorOrClient}
          </p>
        </ServiceItemReveal>
      ) : null}

      <div className="mt-10 grid grid-cols-1 gap-8 md:mt-12 lg:grid-cols-3 lg:gap-6 xl:gap-8">
        {STORY_FIELDS.map(({ key, label }, index) => (
          <ServiceItemReveal key={key} index={index} stepMs={70} baseDelayMs={80} className="min-w-0">
            <ProjectDetailField
              label={label}
              className={index > 0 ? "lg:border-l lg:border-white/10 lg:pl-6 xl:pl-8" : ""}
            >
              {project[key]}
            </ProjectDetailField>
          </ServiceItemReveal>
        ))}
      </div>
    </div>
  )
}
