import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CareerApplicationForm } from "@/components/careers/CareerApplicationForm"
import { FS_CAREER_ROLES, getFsCareerRoleById } from "@/data/fsCareersRoles"
import { FS_SITE_NAME } from "@/lib/seo"
import { buildFsMetadata } from "@/lib/seo-metadata"
import { JsonLd } from "@/components/seo/JsonLd"
import {
  breadcrumbsSimple,
  buildBreadcrumbJsonLd,
  buildJobPostingJsonLd,
} from "@/lib/seo-jsonld"

const inset =
  "site-container max-w-[1920px] pb-28 pt-[max(7.5rem,calc(var(--site-header-offset,1.25rem)+6.5rem))] sm:pb-32"

type Props = { params: Promise<{ roleId: string }> }

export function generateStaticParams() {
  return FS_CAREER_ROLES.map((r) => ({ roleId: r.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { roleId } = await params
  const role = getFsCareerRoleById(roleId)
  if (!role) return { robots: { index: false, follow: false } }
  return buildFsMetadata({
    title: `Apply for ${role.title} | Careers | ${FS_SITE_NAME}`,
    description: `Apply for ${role.title} at ${FS_SITE_NAME}. ${role.location}. Submit your CV online.`,
    pathname: `/careers/apply/${role.id}`,
  })
}

export default async function CareersApplyPage({ params }: Props) {
  const { roleId } = await params
  const role = getFsCareerRoleById(roleId)
  if (!role) notFound()

  const path = `/careers/apply/${role.id}`
  const description = [role.description, role.location, role.baseLocation].filter(Boolean).join(" ")

  return (
    <div className="careers-page careers-apply-page min-h-screen bg-white text-black">
      <JsonLd
        data={[
          buildBreadcrumbJsonLd(
            breadcrumbsSimple(
              { name: "Careers", path: "/careers" },
              { name: role.title, path }
            )
          ),
          buildJobPostingJsonLd({
            title: role.title,
            description,
            pathname: path,
            employmentType: role.employmentType,
          }),
        ]}
      />
      <section className={inset}>
        <CareerApplicationForm role={role} />
      </section>
    </div>
  )
}
