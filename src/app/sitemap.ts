import type { MetadataRoute } from "next"
import { getAllCctvCameraTypeSlugs } from "@/data/cctvCameraTypePages"
import { FS_CAREER_ROLES } from "@/data/fsCareersRoles"
import { FS_NEWS_ARTICLES } from "@/data/fsNewsArticles"
import { MAIN_CASE_STUDY_SLUGS } from "@/data/projects"
import { getFsSiteUrl } from "@/lib/seo"

const ACCREDITOR_SLUGS = ["bafe", "nsi", "constructionline", "fia"] as const

const STATIC_PATHS = [
  "",
  "about",
  "careers",
  "accreditations",
  "contact",
  "cookie-policy",
  "delivery-methodology",
  "projects",
  "services",
  "services/intruder-alarm-systems",
  "services/fire-alarm-systems",
  "services/maintenance-support",
  "services/fire-life-safety",
  "services/refuge-disabled-communication",
  "services/evac-voice-evacuation",
  "services/security-systems",
  "services/cctv-systems",
  "services/access-control-systems",
  "services/video-door-entry-systems",
  "services/cctv/commercial",
  "services/cctv/domestic",
  "services/cctv/advice",
  "news",
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

  for (const r of FS_CAREER_ROLES) {
    urls.push({
      url: `${base}/careers/apply/${r.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.55,
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

  for (const slug of getAllCctvCameraTypeSlugs()) {
    urls.push({
      url: `${base}/services/cctv/camera-types/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.72,
    })
  }

  for (const article of FS_NEWS_ARTICLES) {
    urls.push({
      url: `${base}/news/${article.slug}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: "yearly",
      priority: 0.6,
    })
  }

  return urls
}
