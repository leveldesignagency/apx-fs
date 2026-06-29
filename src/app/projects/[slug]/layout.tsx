import { ProjectDetailScrollReset } from "@/components/projects/ProjectDetailScrollReset"

export default function ProjectDetailLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProjectDetailScrollReset />
      {children}
    </>
  )
}
