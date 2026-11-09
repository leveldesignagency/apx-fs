import { ProjectsPageClient } from "@/components/projects/ProjectsPageClient"
import { getSanityProjects } from "@/sanity/projects"

export const revalidate = 60

export default async function ProjectsPage() {
  const projects = await getSanityProjects()
  return <ProjectsPageClient projects={projects} />
}
