import type { Metadata } from "next"
import HomePage from "./home-page"
import { FS_SITE_NAME, fsDefaultDescription } from "@/lib/seo"
import { buildFsMetadata } from "@/lib/seo-metadata"

const HOME_TITLE = `${FS_SITE_NAME} | Fire Alarms, CCTV & Access Control | London & South East`

const baseMeta = buildFsMetadata({
  title: HOME_TITLE,
  description: fsDefaultDescription(),
  pathname: "/",
})

export const metadata: Metadata = {
  ...baseMeta,
  title: {
    absolute: HOME_TITLE,
  },
}

export default function Page() {
  return <HomePage />
}
