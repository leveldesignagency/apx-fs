import { redirect, notFound } from "next/navigation"
import { getFsAccreditation } from "@/data/fsAccreditations"

type Props = { params: Promise<{ slug: string }> }

/** Legacy URLs: `/about/accreditors/[slug]` → `/accreditations/[slug]` */
export default async function LegacyAccreditorRedirect({ params }: Props) {
  const { slug } = await params
  if (!getFsAccreditation(slug)) notFound()
  redirect(`/accreditations/${slug}`)
}
