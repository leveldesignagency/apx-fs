import { notFound } from "next/navigation"
import { AccreditationDetailClient } from "@/components/accreditations/AccreditationDetailClient"
import { FS_ACCREDITATIONS, type FsAccreditationSlug } from "@/data/fsAccreditations"

type Props = { params: Promise<{ slug: string }> }

export default async function AccreditationDetailPage({ params }: Props) {
  const { slug } = await params
  const key = slug as FsAccreditationSlug
  const accred = FS_ACCREDITATIONS[key]
  if (!accred) notFound()

  return <AccreditationDetailClient activeSlug={key} accred={accred} />
}
