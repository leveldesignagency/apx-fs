import type { ReactNode } from "react"
import type { FsProject } from "@/data/projects"

type ProjectDetailStoryProps = {
  project: Pick<FsProject, "scope" | "systems" | "status" | "challenge" | "solution" | "outcome">
}

const META_FIELDS = [
  { key: "scope", label: "Scope" },
  { key: "systems", label: "Systems" },
  { key: "status", label: "Status" },
] as const satisfies ReadonlyArray<{ key: keyof Pick<FsProject, "scope" | "systems" | "status">; label: string }>

const STORY_FIELDS = [
  { key: "challenge", label: "Challenge" },
  { key: "solution", label: "Solution" },
  { key: "outcome", label: "Outcome" },
] as const satisfies ReadonlyArray<{ key: keyof Pick<FsProject, "challenge" | "solution" | "outcome">; label: string }>

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
      <p className="mt-4 text-base leading-relaxed text-white/78 md:mt-5 md:text-[1.0625rem] md:leading-relaxed">
        {children}
      </p>
    </article>
  )
}

/** Project detail — open editorial layout, no boxed cards */
export function ProjectDetailStory({ project }: ProjectDetailStoryProps) {
  return (
    <div className="fs-project-detail-story">
      <div className="fs-project-detail-meta grid grid-cols-1 gap-10 border-y border-white/12 py-10 sm:grid-cols-3 sm:gap-8 md:py-12 lg:gap-12">
        {META_FIELDS.map(({ key, label }, index) => (
          <div
            key={key}
            className={`min-w-0 ${index > 0 ? "sm:border-l sm:border-white/10 sm:pl-8 lg:pl-10" : ""}`}
          >
            <p
              className="section-label mb-3 text-white/55"
              style={{ fontFamily: "var(--font-menu), sans-serif" }}
            >
              {label}
            </p>
            <p className="font-title text-xl font-semibold leading-snug text-white sm:text-2xl lg:text-[1.65rem]">
              {project[key]}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-14 grid grid-cols-1 gap-12 md:mt-16 lg:grid-cols-3 lg:gap-8 xl:gap-12">
        {STORY_FIELDS.map(({ key, label }, index) => (
          <ProjectDetailField
            key={key}
            label={label}
            className={index > 0 ? "lg:border-l lg:border-white/10 lg:pl-8 xl:pl-10" : ""}
          >
            {project[key]}
          </ProjectDetailField>
        ))}
      </div>
    </div>
  )
}
