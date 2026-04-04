import type { MetadataRoute } from "next"
import { getFsSiteUrl } from "@/lib/seo"
import { MAIN_CASE_STUDY_SLUGS } from "@/data/projects"

const ACCREDITOR_SLUGS = ["bafe", "nsi", "constructionline", "fia"] as const

const STATIC_PATHS = [
  "",
  "about",
  "accreditations",
  "contact",
  "cookie-policy",
  "delivery-methodology",
  "projects",
  "services",
  "services/sustainability",
  "services/mechanical-engineering",
  "services/maintenance-support",
  "services/fire-life-safety",
  "services/refuge-disabled-communication",
  "services/evac-voice-evacuation",
  "services/security-systems",
  "services/electrical-systems",
  "services/project-management",
  "services/energy-efficiency",
  "services/maintenance",
  "services/cctv/commercial",
  "services/cctv/domestic",
  "services/cctv/advice",
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getFsSiteUrl()
  const urls: MetadataRoute.Sitemap = []

  for (const path of STATIC_PATHS) {
    urls.push({
      url: path ? `${base}/${path}` : base,
      lastModified: new Date(),
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : 0.8,
    })
  }

  for (const slug of ACCREDITOR_SLUGS) {
    urls.push({
      url: `${base}/accreditations/${slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.65,
    })
  }

  for (const slug of MAIN_CASE_STUDY_SLUGS) {
    urls.push({
      url: `${base}/projects/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    })
  }

  return urls
}
