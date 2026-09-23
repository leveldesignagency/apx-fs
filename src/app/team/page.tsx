import type { Metadata } from "next"
import { TeamDirectoryClient } from "@/components/team/TeamDirectoryClient"
import { FS_SITE_NAME } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Our Team",
  description: `Meet the ${FS_SITE_NAME} team - engineers, project leads and support staff across London and the Home Counties.`,
}

export default function TeamPage() {
  return (
    <main className="team-page min-h-screen bg-white text-black">
      <TeamDirectoryClient />
    </main>
  )
}
