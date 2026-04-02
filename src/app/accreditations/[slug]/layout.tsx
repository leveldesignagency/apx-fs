import type { Metadata } from "next"
import { FS_ACCREDITATION_SEO, FS_ACCREDITATION_TAB_ORDER, type FsAccreditationSlug } from "@/data/fsAccreditations"
import { buildFsMetadata } from "@/lib/seo-metadata"

export function generateStaticParams() {
  return FS_ACCREDITATION_TAB_ORDER.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const m = FS_ACCREDITATION_SEO[slug as FsAccreditationSlug]
  if (!m) {
    return { title: "Accreditation | APX Fire & Security" }
  }
  return buildFsMetadata({
    title: m.title,
    description: m.description,
    pathname: `/accreditations/${slug}`,
  })
}

export default function AccreditationSlugLayout({ children }: { children: React.ReactNode }) {
  return children
}
