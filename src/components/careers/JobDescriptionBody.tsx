import type { ReactNode } from "react"
import type { CareerRole } from "@/components/careers/careers-types"

type Tone = "dark" | "print"

const tones = {
  dark: {
    sectionLabel: "text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45",
    body: "text-base leading-relaxed text-white/75",
    bodyLg: "text-base leading-relaxed text-white/75 sm:text-lg",
    metaDt: "text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45",
    metaDd: "mt-2 text-sm leading-relaxed text-white/75 sm:text-base",
    list: "mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-white/75",
    rule: "border-white/12",
  },
  print: {
    sectionLabel: "text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500",
    body: "text-[15px] leading-relaxed text-neutral-800",
    bodyLg: "text-[15px] leading-relaxed text-neutral-800 sm:text-base",
    metaDt: "text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500",
    metaDd: "mt-1.5 text-sm leading-relaxed text-neutral-800",
    list: "mt-3 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-neutral-800",
    rule: "border-neutral-200",
  },
} as const

function Section({
  title,
  tone,
  children,
}: {
  title: string
  tone: Tone
  children: ReactNode
}) {
  const t = tones[tone]
  return (
    <section className={`border-t pt-6 ${t.rule}`}>
      <h4 className={t.sectionLabel}>{title}</h4>
      <div className="mt-3">{children}</div>
    </section>
  )
}

function BulletList({ items, tone }: { items: string[]; tone: Tone }) {
  return (
    <ul className={tones[tone].list}>
      {items.map((line) => (
        <li key={line}>{line}</li>
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
    <div className="space-y-0">
      <section className="pb-6">
        <h4 className={t.sectionLabel}>Overview</h4>
        <p className={`mt-3 ${t.bodyLg}`}>{role.description}</p>
      </section>

      <section className={`border-t py-6 ${t.rule}`}>
        <h4 className={t.sectionLabel}>Role details</h4>
        <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {role.employmentType ? (
            <div>
              <dt className={t.metaDt}>Employment type</dt>
              <dd className={t.metaDd}>{role.employmentType}</dd>
            </div>
          ) : null}
          {role.hours ? (
            <div>
              <dt className={t.metaDt}>Hours</dt>
              <dd className={t.metaDd}>{role.hours}</dd>
            </div>
          ) : null}
          <div>
            <dt className={t.metaDt}>Location</dt>
            <dd className={t.metaDd}>{role.location}</dd>
          </div>
          {role.baseLocation ? (
            <div>
              <dt className={t.metaDt}>Base</dt>
              <dd className={t.metaDd}>{role.baseLocation}</dd>
            </div>
          ) : null}
          {role.companyVehicle ? (
            <div className="sm:col-span-2">
              <dt className={t.metaDt}>Company vehicle</dt>
              <dd className={t.metaDd}>{role.companyVehicle}</dd>
            </div>
          ) : null}
        </dl>
      </section>

      {role.responsibilities?.length ? (
        <Section title="Key responsibilities" tone={tone}>
          <BulletList items={role.responsibilities} tone={tone} />
        </Section>
      ) : null}

      {role.requiredExperience?.length ? (
        <Section title="Required experience" tone={tone}>
          <BulletList items={role.requiredExperience} tone={tone} />
        </Section>
      ) : null}

      {role.certifications?.length ? (
        <Section title="Certifications & licences" tone={tone}>
          <BulletList items={role.certifications} tone={tone} />
        </Section>
      ) : null}

      {role.requirements?.length ? (
        <Section title="Requirements" tone={tone}>
          <BulletList items={role.requirements} tone={tone} />
        </Section>
      ) : null}

      {role.benefits?.length ? (
        <Section title="Benefits" tone={tone}>
          <BulletList items={role.benefits} tone={tone} />
        </Section>
      ) : null}

      {role.workingAreas?.length ? (
        <Section title="Working areas" tone={tone}>
          <BulletList items={role.workingAreas} tone={tone} />
        </Section>
      ) : null}

      <section className={`border-t pt-6 ${t.rule}`}>
        <p className={t.body}>
          APX Fire &amp; Security is an equal-opportunities employer. Applications are considered on experience,
          skills and ability to do the role.
        </p>
      </section>
    </div>
  )
}
