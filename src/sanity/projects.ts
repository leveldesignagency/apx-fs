import { unstable_cache } from "next/cache"
import type { FsProject } from "@/data/projects"
import {
  FS_PROJECTS,
  MAIN_CASE_STUDIES,
  RESIDENTIAL_PROJECT_SLUGS,
  getProjectBySlug,
} from "@/data/projects"
import { sanityClient } from "./client"
import { urlFor } from "./image"
import {
  PROJECT_BY_SLUG_QUERY,
  PROJECT_SLUGS_QUERY,
  PROJECTS_LIST_QUERY,
} from "./queries"

type SanityImage = {
  _key?: string
  alt?: string
  asset?: { _ref?: string }
}

type SanityProjectDoc = {
  _id: string
  title?: string
  slug?: string
  sector?: string
  location?: string
  scope?: string
  systems?: string
  status?: string
  shortDescription?: string
  summary?: string
  challenge?: string
  solution?: string
  outcome?: string
  contractorOrClient?: string
  engagementNote?: string
  featured?: boolean
  heroImage?: SanityImage
  gallery?: SanityImage[]
  clientReview?: FsProject["clientReview"]
}

function imageUrl(image: SanityImage | undefined, width: number): string | null {
  if (!image?.asset?._ref) return null
  try {
    return urlFor(image).width(width).quality(85).url()
  } catch {
    return null
  }
}

function mapDoc(doc: SanityProjectDoc, fallback?: FsProject): FsProject | null {
  if (!doc.slug || !doc.title) return null

  const heroImage = imageUrl(doc.heroImage, 2000) || fallback?.heroImage || ""
  if (!heroImage) return null

  const galleryFromSanity = (doc.gallery || [])
    .map((img) => imageUrl(img, 1600))
    .filter((src): src is string => Boolean(src))

  const review = doc.clientReview
  const clientReview =
    review?.paragraphs && review.paragraphs.length > 0
      ? review
      : fallback?.clientReview

  return {
    slug: doc.slug,
    title: doc.title,
    sector: doc.sector || fallback?.sector || "",
    location: doc.location || fallback?.location || "",
    scope: doc.scope || fallback?.scope || "",
    systems: doc.systems || fallback?.systems || "",
    status: doc.status || fallback?.status || "",
    shortDescription: doc.shortDescription || fallback?.shortDescription || "",
    summary: doc.summary || fallback?.summary || "",
    challenge: doc.challenge || fallback?.challenge || "",
    solution: doc.solution || fallback?.solution || "",
    outcome: doc.outcome || fallback?.outcome || "",
    heroImage,
    gallery: galleryFromSanity.length
      ? galleryFromSanity
      : fallback?.gallery || [heroImage],
    engagementNote: doc.engagementNote || fallback?.engagementNote,
    contractorOrClient: doc.contractorOrClient || fallback?.contractorOrClient,
    clientReview,
  }
}

function withResidentialCoverage(projects: FsProject[]): FsProject[] {
  const seen = new Set(projects.map((p) => p.slug))
  const extras = RESIDENTIAL_PROJECT_SLUGS.map((slug) => getProjectBySlug(slug)).filter(
    (p): p is FsProject => Boolean(p) && !seen.has(p.slug)
  )
  return extras.length ? [...projects, ...extras] : projects
}

async function fetchProjects(): Promise<FsProject[]> {
  try {
    const docs = await sanityClient.fetch<SanityProjectDoc[]>(PROJECTS_LIST_QUERY)
    const mapped = (docs || [])
      .map((doc) => mapDoc(doc, getProjectBySlug(doc.slug || "")))
      .filter((p): p is FsProject => Boolean(p))
    return withResidentialCoverage(mapped.length ? mapped : MAIN_CASE_STUDIES)
  } catch (err) {
    console.error("[sanity] getSanityProjects failed, using static data", err)
    return withResidentialCoverage(MAIN_CASE_STUDIES)
  }
}

async function fetchProjectBySlug(slug: string): Promise<FsProject | null> {
  try {
    const doc = await sanityClient.fetch<SanityProjectDoc | null>(PROJECT_BY_SLUG_QUERY, {
      slug,
    })
    if (doc) {
      const mapped = mapDoc(doc, getProjectBySlug(slug))
      if (mapped) return mapped
    }
  } catch (err) {
    console.error("[sanity] getSanityProjectBySlug failed", slug, err)
  }
  return getProjectBySlug(slug) || null
}

async function fetchProjectSlugs(): Promise<string[]> {
  try {
    const rows = await sanityClient.fetch<{ slug?: string }[]>(PROJECT_SLUGS_QUERY)
    const slugs = (rows || []).map((r) => r.slug).filter((s): s is string => Boolean(s))
    if (slugs.length) return slugs
  } catch (err) {
    console.error("[sanity] getSanityProjectSlugs failed", err)
  }
  const local = FS_PROJECTS.map((p) => p.slug)
  const missingResidential = RESIDENTIAL_PROJECT_SLUGS.filter((slug) => !local.includes(slug))
  return [...local, ...missingResidential]
}

export function getSanityProjects() {
  return unstable_cache(fetchProjects, ["sanity-projects-list"], {
    revalidate: 60,
    tags: ["sanity-project"],
  })()
}

export function getSanityProjectBySlug(slug: string) {
  return unstable_cache(() => fetchProjectBySlug(slug), ["sanity-project", slug], {
    revalidate: 60,
    tags: ["sanity-project", `project:${slug}`],
  })()
}

export function getSanityProjectSlugs() {
  return unstable_cache(fetchProjectSlugs, ["sanity-project-slugs"], {
    revalidate: 60,
    tags: ["sanity-project"],
  })()
}
