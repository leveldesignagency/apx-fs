import type { FsTeamMember } from "@/data/fsTeam"
import type { ServiceFaqItem } from "@/lib/fs-service-faq-content"
import {
  FS_SITE_NAME,
  fsAbsoluteUrl,
  fsOrganizationDescription,
  getFsSiteUrl,
} from "@/lib/seo"

export type BreadcrumbCrumb = { name: string; path: string }

export function buildFaqPageJsonLd(
  items: ServiceFaqItem[],
  opts?: { pathname?: string }
): Record<string, unknown> | null {
  if (!items.length) return null
  const url = getFsSiteUrl()
  const pageUrl = opts?.pathname
    ? opts.pathname === "/"
      ? url
      : fsAbsoluteUrl(opts.pathname)
    : undefined
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(pageUrl ? { "@id": `${pageUrl}#faq`, url: pageUrl, isPartOf: { "@id": `${url}/#website` } } : {}),
    mainEntity: items.map((item, index) => ({
      "@type": "Question",
      ...(pageUrl ? { "@id": `${pageUrl}#faq-q${index + 1}` } : {}),
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}

export function buildAboutPageJsonLd(opts: {
  name: string
  description: string
  pathname?: string
  speakableSelectors?: string[]
}): Record<string, unknown> {
  const url = getFsSiteUrl()
  const pathname = opts.pathname ?? "/about"
  const pageUrl = fsAbsoluteUrl(pathname)
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: opts.name,
    description: opts.description || fsOrganizationDescription(),
    inLanguage: "en-GB",
    isPartOf: { "@id": `${url}/#website` },
    about: { "@id": `${url}/#organization` },
    mainEntity: { "@id": `${url}/#organization` },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: opts.speakableSelectors ?? ["h1", ".aeo-direct-answer"],
    },
  }
}

export function buildContactPageJsonLd(opts: {
  name: string
  description: string
  pathname?: string
  speakableSelectors?: string[]
}): Record<string, unknown> {
  const url = getFsSiteUrl()
  const pathname = opts.pathname ?? "/contact"
  const pageUrl = fsAbsoluteUrl(pathname)
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: opts.name,
    description: opts.description,
    inLanguage: "en-GB",
    isPartOf: { "@id": `${url}/#website` },
    about: { "@id": `${url}/#organization` },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: opts.speakableSelectors ?? ["h1", ".aeo-direct-answer"],
    },
  }
}

export function buildPersonJsonLd(member: FsTeamMember): Record<string, unknown> {
  const url = getFsSiteUrl()
  const teamUrl = fsAbsoluteUrl("/team")
  const jobTitle =
    member.role === "APX Fire & Security" ? "Fire & Security specialist" : member.role
  return {
    "@type": "Person",
    "@id": `${teamUrl}#${member.id}`,
    name: member.name,
    jobTitle,
    worksFor: { "@id": `${url}/#organization` },
    url: `${teamUrl}#${member.id}`,
    ...(member.image ? { image: fsAbsoluteUrl(member.image) } : {}),
  }
}

export function buildTeamGraphJsonLd(members: FsTeamMember[]): Record<string, unknown> | null {
  if (!members.length) return null
  const url = getFsSiteUrl()
  const teamUrl = fsAbsoluteUrl("/team")
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${teamUrl}#webpage`,
        url: teamUrl,
        name: `Our Team | ${FS_SITE_NAME}`,
        description: `Meet the ${FS_SITE_NAME} team delivering fire and security systems across London and the Home Counties.`,
        inLanguage: "en-GB",
        isPartOf: { "@id": `${url}/#website` },
        about: { "@id": `${url}/#organization` },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: members.map((m, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: { "@id": `${teamUrl}#${m.id}` },
          })),
        },
      },
      ...members.map(buildPersonJsonLd),
    ],
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
    "@id": `${pageUrl}#service`,
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
    audience: { "@type": "BusinessAudience", audienceType: "Commercial, public-sector and residential clients" },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: fsAbsoluteUrl("/contact"),
      availableLanguage: "English",
    },
    termsOfService: fsAbsoluteUrl("/terms"),
  }
}

export function buildWebPageJsonLd(opts: {
  name: string
  description: string
  pathname: string
  speakableSelectors?: string[]
}): Record<string, unknown> {
  const url = getFsSiteUrl()
  const pageUrl = opts.pathname === "/" ? url : fsAbsoluteUrl(opts.pathname)
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: opts.name,
    description: opts.description,
    inLanguage: "en-GB",
    isPartOf: { "@id": `${url}/#website` },
    about: { "@id": `${url}/#organization` },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: opts.speakableSelectors ?? ["h1", ".service-page-hero__intro"],
    },
  }
}

export function buildProjectJsonLd(opts: {
  title: string
  description: string
  pathname: string
  imageUrl?: string
  location?: string
}): Record<string, unknown> {
  const url = getFsSiteUrl()
  const pageUrl = fsAbsoluteUrl(opts.pathname)
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    url: pageUrl,
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    inLanguage: "en-GB",
    articleSection: "Projects",
    ...(opts.imageUrl ? { image: [opts.imageUrl] } : {}),
    ...(opts.location ? { contentLocation: { "@type": "Place", name: opts.location } } : {}),
    author: { "@id": `${url}/#organization` },
    publisher: { "@id": `${url}/#organization` },
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
    "@type": "NewsArticle",
    "@id": `${pageUrl}#article`,
    headline: opts.title,
    description: opts.description,
    image: [opts.imageUrl],
    datePublished: opts.publishedAt,
    dateModified: opts.modifiedAt ?? opts.publishedAt,
    url: pageUrl,
    inLanguage: "en-GB",
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    author: { "@id": `${url}/#organization` },
    publisher: { "@id": `${url}/#organization` },
  }
}

export function buildDeliveryHowToJsonLd(): Record<string, unknown> {
  const url = getFsSiteUrl()
  const pageUrl = fsAbsoluteUrl("/delivery-methodology")
  const steps = [
    {
      name: "Survey and consultation",
      text: "Site survey and consultation to confirm requirements, constraints and standards.",
    },
    {
      name: "Design and coordination",
      text: "System design and coordination with the project team, M&E packages and stakeholders.",
    },
    {
      name: "Pre-construction planning",
      text: "Programme, materials and access planning before installation starts.",
    },
    {
      name: "Installation",
      text: "On-site installation by APX engineers to the agreed design and programme.",
    },
    {
      name: "Commissioning and certification",
      text: "Commissioning, testing and certification aligned to British Standards and scheme requirements.",
    },
    {
      name: "Handover, maintenance and support",
      text: "Handover documentation, training where required, then maintenance and ongoing support.",
    },
  ]
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${pageUrl}#howto`,
    name: "How APX Fire & Security delivers fire and security projects",
    description:
      "Survey, design, planning, installation, commissioning and handover for fire and security projects across London and the Home Counties.",
    url: pageUrl,
    inLanguage: "en-GB",
    totalTime: "P4W",
    provider: { "@id": `${url}/#organization` },
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      url: `${pageUrl}#step-${index + 1}`,
    })),
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
    hiringOrganization: { "@id": `${url}/#organization` },
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
