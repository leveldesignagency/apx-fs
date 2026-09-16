import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { CareersSearchAndRoles } from "@/components/careers/CareersSearchAndRoles"
import { FS_SITE_NAME } from "@/lib/seo"
import { FS_CAREER_ROLES } from "@/data/fsCareersRoles"

export const metadata: Metadata = {
  title: "Careers",
  description: `Join ${FS_SITE_NAME}. View open roles in fire and security engineering across London and the Home Counties.`,
}

export default function CareersPage() {
  return (
    <div className="careers-page min-h-screen bg-black text-white">
      <section className="site-container max-w-[1920px] pb-24 pt-16 sm:pb-28 sm:pt-20">
        <div className="careers-page-header careers-divider-b flex flex-col gap-8 border-b border-white/12 pb-10 sm:flex-row sm:items-end sm:justify-between sm:gap-10 sm:pb-12">
          <div className="min-w-0 max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">Careers</p>
            <h1 className="mt-3 font-title text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
              Find your next role
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/65 sm:text-lg">
              Skilled engineers and installers who share our standards for compliant, quality delivery on site across
              London and the Home Counties.
            </p>
          </div>
          <Link href="/" className="shrink-0 self-start sm:self-auto">
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
      </section>
    </div>
  )
}
