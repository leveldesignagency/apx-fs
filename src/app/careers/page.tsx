import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { CareersSearchAndRoles } from "@/components/careers/CareersSearchAndRoles"
import { FS_SITE_NAME } from "@/lib/seo"
import { buildFsMetadata } from "@/lib/seo-metadata"
import { FS_CAREER_ROLES } from "@/data/fsCareersRoles"
import { FsBreadcrumbJsonLd } from "@/components/seo/FsBreadcrumbJsonLd"

export const metadata: Metadata = buildFsMetadata({
  title: `Careers | Fire & Security Jobs | ${FS_SITE_NAME}`,
  description: `Join ${FS_SITE_NAME}. Open roles for Fire and Security engineers and installers across London and the Home Counties. Equal-opportunities employer.`,
  pathname: "/careers",
})

export default function CareersPage() {
  return (
    <>
      <FsBreadcrumbJsonLd crumbs={[{ name: "Careers", path: "/careers" }]} />
      <div className="careers-page min-h-screen bg-black text-white">
      <section className="site-container max-w-[1920px] pb-24 pt-16 sm:pb-28 sm:pt-20">
        <div className="careers-page-header careers-divider-b flex flex-col gap-8 border-b border-white/12 pb-10 sm:flex-row sm:items-end sm:justify-between sm:gap-10 sm:pb-12">
          <div className="order-2 min-w-0 max-w-2xl sm:order-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">Careers</p>
            <h1 className="mt-3 font-title text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
              Find your next role
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/65 sm:text-lg">
              Skilled engineers and installers who share our standards for compliant, quality delivery on site across
              London and the Home Counties.
            </p>
          </div>
          <Link href="/" className="order-1 shrink-0 self-end sm:order-2 sm:self-auto">
            <Image
              src="/__APX Web Logo FS.svg"
              alt={`${FS_SITE_NAME} logo`}
              width={200}
              height={67}
              className="h-14 w-auto opacity-90 sm:h-16"
              priority
            />
          </Link>
        </div>

        <CareersSearchAndRoles roles={FS_CAREER_ROLES} />

        <aside className="mt-16 max-w-3xl border-t border-white/12 pt-10 sm:mt-20 sm:pt-12">
          <h2 className="font-title text-xl font-bold text-white sm:text-2xl">Equal opportunities &amp; privacy</h2>
          <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
            APX Fire &amp; Security is an equal-opportunities employer. We welcome applications from all suitably
            qualified candidates. Decisions are based on experience, skills and ability to do the job.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
            Job applications and CVs contain personal information. Please read our{" "}
            <Link
              href="/recruitment-privacy"
              className="font-medium text-white underline decoration-white/35 underline-offset-4 hover:decoration-white"
            >
              recruitment privacy notice
            </Link>{" "}
            before you apply.
          </p>
        </aside>
      </section>
    </div>
    </>
  )
}
