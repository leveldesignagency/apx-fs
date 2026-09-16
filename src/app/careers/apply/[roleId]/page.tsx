import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CareerApplicationForm } from "@/components/careers/CareerApplicationForm"
import { FS_CAREER_ROLES, getFsCareerRoleById } from "@/data/fsCareersRoles"
import { FS_SITE_NAME } from "@/lib/seo"

const inset =
  "site-container max-w-[1920px] pb-28 pt-[max(7.5rem,calc(var(--site-header-offset,1.25rem)+6.5rem))] sm:pb-32"

type Props = { params: Promise<{ roleId: string }> }

export function generateStaticParams() {
  return FS_CAREER_ROLES.map((r) => ({ roleId: r.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { roleId } = await params
  const role = getFsCareerRoleById(roleId)
  if (!role) return {}
  return {
    title: `Apply, ${role.title}`,
    description: `Submit your CV for the ${role.title} role at ${FS_SITE_NAME}.`,
    robots: { index: false, follow: true },
  }
}

export default async function CareersApplyPage({ params }: Props) {
  const { roleId } = await params
  const role = getFsCareerRoleById(roleId)
  if (!role) notFound()

  return (
    <div className="careers-page careers-apply-page min-h-screen bg-white text-black">
      <section className={inset}>
        <CareerApplicationForm role={role} />
      </section>
    </div>
  )
}
