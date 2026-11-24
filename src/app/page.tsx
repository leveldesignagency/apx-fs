import type { Metadata } from "next"
import HomePage from "./home-page"
import { FS_SITE_NAME, fsDefaultDescription, fsOrganizationDescription } from "@/lib/seo"
import { buildFsMetadata } from "@/lib/seo-metadata"
import { JsonLd } from "@/components/seo/JsonLd"
import { HOME_FAQ_ITEMS } from "@/lib/hub-faq-content"
import { buildFaqPageJsonLd, buildWebPageJsonLd } from "@/lib/seo-jsonld"

const HOME_TITLE = `${FS_SITE_NAME} | Fire Alarms, CCTV & Access Control | London & South East`
const HOME_DESCRIPTION = fsDefaultDescription()

const baseMeta = buildFsMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  pathname: "/",
})

export const metadata: Metadata = {
  ...baseMeta,
  title: {
    absolute: HOME_TITLE,
  },
}

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          buildWebPageJsonLd({
            name: HOME_TITLE,
            description: fsOrganizationDescription(),
            pathname: "/",
            speakableSelectors: ["h1", ".aeo-direct-answer"],
          }),
          buildFaqPageJsonLd(HOME_FAQ_ITEMS, { pathname: "/" }),
        ]}
      />
      <HomePage />
    </>
  )
}
