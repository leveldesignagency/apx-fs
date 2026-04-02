import type { Metadata } from "next"
import { buildFsMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = buildFsMetadata({
  title: "Fire & Security Project Management | London Contractors | APX",
  description:
    "End-to-end coordination of fire and security packages — design, installation, commissioning and handover for projects across London boroughs and the South East.",
  pathname: "/services/project-management",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
