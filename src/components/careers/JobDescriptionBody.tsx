import type { ReactNode } from "react"
import type { CareerRole } from "@/components/careers/careers-types"

type Tone = "dark" | "print"

const tones = {
  dark: {
    sectionLabel: "m-0 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45",
    body: "m-0 text-base leading-relaxed text-white/75",
    bodyLg: "m-0 text-base leading-relaxed text-white/75 sm:text-lg",
    metaDt: "m-0 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45",
    metaDd: "m-0 mt-2 text-sm leading-relaxed text-white/75 sm:text-base",
    list: "m-0 mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-white/75",
    rule: "border-t border-solid border-white/15",
  },
  print: {
    sectionLabel: "m-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500",
    body: "m-0 text-[15px] leading-relaxed text-neutral-800",
    bodyLg: "m-0 text-[15px] leading-relaxed text-neutral-800 sm:text-base",
    metaDt: "m-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500",
    metaDd: "m-0 mt-2 text-sm leading-relaxed text-neutral-800",
    list: "m-0 mt-3 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-neutral-800",
    rule: "border-t border-solid border-neutral-200",
  },
} as const

function Block({
  title,
  tone,
  children,
  showRule = true,
}: {
  title?: string
  tone: Tone
  children: ReactNode
  showRule?: boolean
}) {
  const t = tones[tone]
  return (
    <div className={`job-description-block m-0 ${showRule ? `mt-0 ${t.rule}` : "mt-0"}`}>
      <div className="job-description-block__inner m-0 py-8">
        {title ? <h4 className={`${t.sectionLabel} mb-4`}>{title}</h4> : null}
        {children}
      </div>
    </div>
  )
}

function BulletList({ items, tone }: { items: string[]; tone: Tone }) {
  return (
    <ul className={tones[tone].list}>
      {items.map((line) => (
        <li key={line} className="m-0">
          {line}
        </li>
      ))}
    </ul>
  )
}

/** Shared JD body for modal + printable PDF sheet. Salary is intentionally omitted. */
export function JobDescriptionBody({
  role,
  tone = "dark",
}: {
  role: CareerRole
  tone?: Tone
}) {
  const t = tones[tone]

  return (
    <div className="job-description-body m-0 flex flex-col">
      <Block tone={tone} title="Overview" showRule={false}>
        <p className={t.bodyLg}>{role.description}</p>
      </Block>

      <Block tone={tone} title="Role details">
        <dl className="m-0 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {role.employmentType ? (
            <div className="m-0">
              <dt className={t.metaDt}>Employment type</dt>
              <dd className={t.metaDd}>{role.employmentType}</dd>
            </div>
          ) : null}
          {role.hours ? (
            <div className="m-0">
              <dt className={t.metaDt}>Hours</dt>
              <dd className={t.metaDd}>{role.hours}</dd>
            </div>
          ) : null}
          <div className="m-0">
            <dt className={t.metaDt}>Location</dt>
            <dd className={t.metaDd}>{role.location}</dd>
          </div>
          {role.baseLocation ? (
            <div className="m-0">
              <dt className={t.metaDt}>Base</dt>
              <dd className={t.metaDd}>{role.baseLocation}</dd>
            </div>
          ) : null}
          {role.companyVehicle ? (
            <div className="m-0 sm:col-span-2">
              <dt className={t.metaDt}>Company vehicle</dt>
              <dd className={t.metaDd}>{role.companyVehicle}</dd>
            </div>
          ) : null}
        </dl>
      </Block>

      {role.responsibilities?.length ? (
        <Block tone={tone} title="Key responsibilities">
          <BulletList items={role.responsibilities} tone={tone} />
        </Block>
      ) : null}

      {role.requiredExperience?.length ? (
        <Block tone={tone} title="Required experience">
          <BulletList items={role.requiredExperience} tone={tone} />
        </Block>
      ) : null}

      {role.certifications?.length ? (
        <Block tone={tone} title="Certifications & licences">
          <BulletList items={role.certifications} tone={tone} />
        </Block>
      ) : null}

      {role.requirements?.length ? (
        <Block tone={tone} title="Requirements">
          <BulletList items={role.requirements} tone={tone} />
        </Block>
      ) : null}

      {role.benefits?.length ? (
        <Block tone={tone} title="Benefits">
          <BulletList items={role.benefits} tone={tone} />
        </Block>
      ) : null}

      {role.workingAreas?.length ? (
        <Block tone={tone} title="Working areas">
          <BulletList items={role.workingAreas} tone={tone} />
        </Block>
      ) : null}

      <Block tone={tone}>
        <p className={t.body}>
          APX Fire &amp; Security is an equal-opportunities employer. Applications are considered on experience,
          skills and ability to do the role.
        </p>
      </Block>
    </div>
  )
}
