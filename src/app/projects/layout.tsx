import type { Metadata } from "next"
import { buildFsMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = buildFsMetadata({
  title: "Fire & Security Projects | Case Studies | London & South East | APX",
  description:
    "Fire alarm, CCTV, access control and life-safety project case studies — commercial, healthcare, education and public sector installations across London boroughs, Kent, Essex and the Home Counties.",
  pathname: "/projects",
})

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children
}
