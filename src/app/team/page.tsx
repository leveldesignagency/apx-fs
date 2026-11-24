import type { Metadata } from "next"
import { TeamDirectoryClient } from "@/components/team/TeamDirectoryClient"
import { FS_TEAM_MEMBERS } from "@/data/fsTeam"
import { FS_SITE_NAME } from "@/lib/seo"
import { buildFsMetadata } from "@/lib/seo-metadata"
import { FsBreadcrumbJsonLd } from "@/components/seo/FsBreadcrumbJsonLd"
import { JsonLd } from "@/components/seo/JsonLd"
import { buildTeamGraphJsonLd } from "@/lib/seo-jsonld"

export const metadata: Metadata = buildFsMetadata({
  title: `Our Team | Engineers & Project Leads | ${FS_SITE_NAME}`,
  description: `Meet the ${FS_SITE_NAME} team: engineers, project leads and support staff delivering Fire and Security systems across London and the Home Counties.`,
  pathname: "/team",
})

export default function TeamPage() {
  return (
    <>
      <FsBreadcrumbJsonLd crumbs={[{ name: "Team", path: "/team" }]} />
      <JsonLd data={buildTeamGraphJsonLd(FS_TEAM_MEMBERS)} />
      <div className="team-page min-h-screen bg-white text-black">
        <TeamDirectoryClient />
      </div>
    </>
  )
}
