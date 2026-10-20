import type { ServiceFaqItem } from "@/lib/fs-service-faq-content"
import { FS_SITE_NAME, fsAbsoluteUrl, getFsSiteUrl } from "@/lib/seo"

export type BreadcrumbCrumb = { name: string; path: string }

export function buildFaqPageJsonLd(items: ServiceFaqItem[]): Record<string, unknown> | null {
  if (!items.length) return null
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}

export function buildBreadcrumbJsonLd(crumbs: BreadcrumbCrumb[]): Record<string, unknown> | null {
  if (crumbs.length < 2) return null
  const base = getFsSiteUrl()
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.path === "/" ? base : fsAbsoluteUrl(c.path),
    })),
  }
}

export function buildServiceJsonLd(opts: {
  name: string
  description: string
  pathname: string
  serviceType?: string
}): Record<string, unknown> {
  const url = getFsSiteUrl()
  const pageUrl = opts.pathname === "/" ? url : fsAbsoluteUrl(opts.pathname)
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: pageUrl,
    serviceType: opts.serviceType ?? opts.name,
    provider: { "@id": `${url}/#organization` },
    areaServed: [
      { "@type": "City", name: "London" },
      { "@type": "AdministrativeArea", name: "Greater London" },
      { "@type": "AdministrativeArea", name: "Kent" },
      { "@type": "AdministrativeArea", name: "Essex" },
      { "@type": "AdministrativeArea", name: "Surrey" },
      { "@type": "AdministrativeArea", name: "Hertfordshire" },
    ],
    brand: { "@type": "Brand", name: FS_SITE_NAME },
  }
}

// Home > Services > ... from a /services path
export function breadcrumbsForServicePath(pathname: string, leafName?: string): BreadcrumbCrumb[] {
  const p = pathname.replace(/\/$/, "") || "/"
  const crumbs: BreadcrumbCrumb[] = [{ name: "Home", path: "/" }]
  if (p === "/") return crumbs

  crumbs.push({ name: "Services", path: "/services" })
  if (p === "/services") return crumbs

  const rest = p.replace(/^\/services\/?/, "")
  const parts = rest.split("/").filter(Boolean)
  let acc = "/services"
  parts.forEach((part, i) => {
    acc += `/${part}`
    const isLast = i === parts.length - 1
    const name =
      isLast && leafName
        ? leafName
        : part
            .split("-")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ")
    crumbs.push({ name, path: acc })
  })
  return crumbs
}

export function breadcrumbsSimple(...crumbs: BreadcrumbCrumb[]): BreadcrumbCrumb[] {
  return [{ name: "Home", path: "/" }, ...crumbs]
}

export function buildArticleJsonLd(opts: {
  title: string
  description: string
  pathname: string
  imageUrl: string
  publishedAt: string
  modifiedAt?: string
}): Record<string, unknown> {
  const url = getFsSiteUrl()
  const pageUrl = fsAbsoluteUrl(opts.pathname)
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    image: [opts.imageUrl],
    datePublished: opts.publishedAt,
    dateModified: opts.modifiedAt ?? opts.publishedAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    author: { "@type": "Organization", name: FS_SITE_NAME, url },
    publisher: {
      "@type": "Organization",
      name: FS_SITE_NAME,
      logo: { "@id": `${url}/#logo` },
    },
  }
}

export function buildJobPostingJsonLd(opts: {
  title: string
  description: string
  pathname: string
  employmentType?: string
  datePosted?: string
}): Record<string, unknown> {
  const url = getFsSiteUrl()
  const pageUrl = fsAbsoluteUrl(opts.pathname)
  const fullTime = (opts.employmentType ?? "").toLowerCase().includes("full")
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: opts.title,
    description: opts.description,
    datePosted: opts.datePosted ?? new Date().toISOString().slice(0, 10),
    hiringOrganization: {
      "@type": "Organization",
      name: FS_SITE_NAME,
      sameAs: url,
      logo: fsAbsoluteUrl("/icon-512.png"),
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: "365-369 Bexley Road",
        addressLocality: "Erith",
        addressRegion: "Kent",
        postalCode: "DA8 3EZ",
        addressCountry: "GB",
      },
    },
    employmentType: fullTime ? "FULL_TIME" : "OTHER",
    directApply: true,
    url: pageUrl,
    industry: "Fire and Security",
  }
}
