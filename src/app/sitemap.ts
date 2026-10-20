import type { MetadataRoute } from "next"
import { getAllCctvCameraTypeSlugs } from "@/data/cctvCameraTypePages"
import { FS_CAREER_ROLES } from "@/data/fsCareersRoles"
import { FS_NEWS_ARTICLES } from "@/data/fsNewsArticles"
import { MAIN_CASE_STUDY_SLUGS } from "@/data/projects"
import { getFsSiteUrl } from "@/lib/seo"

const ACCREDITOR_SLUGS = ["bafe", "nsi", "constructionline", "fia"] as const

// Static paths we want indexed (no thank-you / private stuff)
const STATIC: Array<{
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
  priority: number
}> = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "services", changeFrequency: "weekly", priority: 0.95 },
  { path: "contact", changeFrequency: "monthly", priority: 0.9 },
  { path: "locations", changeFrequency: "monthly", priority: 0.88 },
  { path: "about", changeFrequency: "monthly", priority: 0.85 },
  { path: "projects", changeFrequency: "weekly", priority: 0.85 },
  { path: "careers", changeFrequency: "weekly", priority: 0.8 },
  { path: "accreditations", changeFrequency: "monthly", priority: 0.8 },
  { path: "news", changeFrequency: "weekly", priority: 0.75 },
  { path: "team", changeFrequency: "monthly", priority: 0.7 },
  { path: "delivery-methodology", changeFrequency: "monthly", priority: 0.7 },
  { path: "services/intruder-alarm-systems", changeFrequency: "monthly", priority: 0.9 },
  { path: "services/fire-alarm-systems", changeFrequency: "monthly", priority: 0.9 },
  { path: "services/cctv-systems", changeFrequency: "monthly", priority: 0.9 },
  { path: "services/access-control-systems", changeFrequency: "monthly", priority: 0.88 },
  { path: "services/video-door-entry-systems", changeFrequency: "monthly", priority: 0.88 },
  { path: "services/gate-automation-systems", changeFrequency: "monthly", priority: 0.85 },
  { path: "services/pava", changeFrequency: "monthly", priority: 0.85 },
  { path: "services/evac", changeFrequency: "monthly", priority: 0.85 },
  { path: "services/refuge-disabled-communication", changeFrequency: "monthly", priority: 0.85 },
  { path: "services/monitoring", changeFrequency: "monthly", priority: 0.85 },
  { path: "services/maintenance-support", changeFrequency: "monthly", priority: 0.88 },
  { path: "services/emergency-call-out", changeFrequency: "monthly", priority: 0.88 },
  { path: "services/fire-life-safety", changeFrequency: "monthly", priority: 0.86 },
  { path: "services/security-systems", changeFrequency: "monthly", priority: 0.86 },
  { path: "services/cctv/commercial", changeFrequency: "monthly", priority: 0.84 },
  { path: "services/cctv/domestic", changeFrequency: "monthly", priority: 0.82 },
  { path: "services/cctv/advice", changeFrequency: "monthly", priority: 0.8 },
  { path: "privacy", changeFrequency: "yearly", priority: 0.35 },
  { path: "cookie-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "terms", changeFrequency: "yearly", priority: 0.3 },
  { path: "accessibility", changeFrequency: "yearly", priority: 0.35 },
  { path: "recruitment-privacy", changeFrequency: "yearly", priority: 0.35 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getFsSiteUrl()
  const urls: MetadataRoute.Sitemap = []

  for (const item of STATIC) {
    urls.push({
      url: item.path ? `${base}/${item.path}` : base,
      lastModified: new Date(),
      changeFrequency: item.changeFrequency,
      priority: item.priority,
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
