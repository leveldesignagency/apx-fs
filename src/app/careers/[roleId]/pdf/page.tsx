import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { JobDescriptionBody } from "@/components/careers/JobDescriptionBody"
import { JobPdfPrintButton } from "@/components/careers/JobPdfPrintButton"
import { careerApplyHref } from "@/components/careers/careers-types"
import { FS_CAREER_ROLES, getFsCareerRoleById } from "@/data/fsCareersRoles"
import { FS_EMAIL, FS_PHONE_DISPLAY, FS_SITE_NAME } from "@/lib/seo"
import { buildFsMetadata } from "@/lib/seo-metadata"

type Props = { params: Promise<{ roleId: string }> }

export function generateStaticParams() {
  return FS_CAREER_ROLES.map((r) => ({ roleId: r.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { roleId } = await params
  const role = getFsCareerRoleById(roleId)
  if (!role) return { robots: { index: false, follow: false } }
  return buildFsMetadata({
    title: `${role.title} | Job description | ${FS_SITE_NAME}`,
    description: `${role.title} at ${FS_SITE_NAME}. ${role.location}. Printable job description.`,
    pathname: `/careers/${role.id}/pdf`,
  })
}

export default async function CareerRolePdfPage({ params }: Props) {
  const { roleId } = await params
  const role = getFsCareerRoleById(roleId)
  if (!role) notFound()

  return (
    <div className="job-pdf-page min-h-screen bg-neutral-100 text-neutral-900">
      <div className="job-pdf-screen-only border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-[820px] flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <Link href="/careers" className="text-sm font-medium text-neutral-600 underline-offset-4 hover:underline">
            Back to careers
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <JobPdfPrintButton />
            <Link
              href={careerApplyHref(role.id)}
              className="inline-flex h-11 items-center justify-center border border-neutral-900 px-5 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
            >
              Apply online
            </Link>
          </div>
        </div>
      </div>

      <article className="job-pdf-sheet mx-auto my-0 max-w-[820px] bg-white px-6 py-10 shadow-sm sm:my-8 sm:px-10 sm:py-12 sm:shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
        <header className="border-b border-neutral-200 pb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
            {FS_SITE_NAME}
          </p>
          <h1 className="mt-3 font-title text-3xl font-bold leading-tight tracking-tight text-black sm:text-4xl">
            {role.title}
          </h1>
          <p className="mt-3 text-sm text-neutral-600 sm:text-base">
            {role.department}
            <span className="mx-2 text-neutral-300" aria-hidden>
              {"\u00b7"}
            </span>
            {role.location}
            {role.employmentType ? (
              <>
                <span className="mx-2 text-neutral-300" aria-hidden>
                  {"\u00b7"}
                </span>
                {role.employmentType}
              </>
            ) : null}
          </p>
        </header>

        <div className="mt-8">
          <JobDescriptionBody role={role} tone="print" />
        </div>

        <footer className="mt-10 border-t border-neutral-200 pt-6 text-sm leading-relaxed text-neutral-600">
          <p className="font-semibold text-neutral-900">{FS_SITE_NAME}</p>
          <p className="mt-1">365-369 Bexley Road, Erith, Kent DA8 3EZ</p>
          <p className="mt-1">
            {FS_PHONE_DISPLAY}
            <span className="mx-2 text-neutral-300" aria-hidden>
              {"\u00b7"}
            </span>
            {FS_EMAIL}
          </p>
          <p className="mt-3">
            Apply online: apx-fs.co.uk{careerApplyHref(role.id)}
          </p>
        </footer>
      </article>
    </div>
  )
}
