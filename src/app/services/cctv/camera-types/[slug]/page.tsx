import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CctvCameraTypeDetailClient } from "@/components/cctv/CctvCameraTypeDetailClient"
import { getAllCctvCameraTypeSlugs, getCctvCameraTypePage } from "@/data/cctvCameraTypePages"
import { buildFsMetadata } from "@/lib/seo-metadata"
import { FS_SITE_NAME } from "@/lib/seo"
import { FsServiceJsonLd } from "@/components/seo/FsServiceJsonLd"

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllCctvCameraTypeSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = getCctvCameraTypePage(slug)
  if (!page) {
    return { title: `Not found | ${FS_SITE_NAME}` }
  }
  const description =
    page.heroIntro.length > 165 ? `${page.heroIntro.slice(0, 162)}...` : page.heroIntro
  return buildFsMetadata({
    title: `${page.title} | CCTV guide`,
    description: `${description} London, Surrey, Kent, Essex and South East.`,
    pathname: `/services/cctv/camera-types/${slug}`,
    keywords: `${page.label} CCTV, CCTV installation London, commercial CCTV, ${page.title}, APX`,
  })
}

export default async function CctvCameraTypePage({ params }: Props) {
  const { slug } = await params
  const page = getCctvCameraTypePage(slug)
  if (!page) notFound()
  const description =
    page.heroIntro.length > 165 ? `${page.heroIntro.slice(0, 162)}...` : page.heroIntro
  return (
    <>
      <FsServiceJsonLd
        pathname={`/services/cctv/camera-types/${slug}`}
        name={page.title}
        description={`${description} London, Surrey, Kent, Essex and South East.`}
      />
      <CctvCameraTypeDetailClient page={page} />
    </>
  )
}
