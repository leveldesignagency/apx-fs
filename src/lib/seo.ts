// SEO helpers for APX Fire & Security. Prefer NEXT_PUBLIC_SITE_URL in prod.

import { APX_SOCIAL_LINKS } from "./apxSocialLinks"
import { FS_SERVICE_NAV_LINKS } from "./fs-service-navigation"
import { HOME_COUNTIES_AND_REGIONS, LONDON_BOROUGHS } from "./seo-geo-areas"

export const FS_SITE_NAME = "APX Fire & Security"
export const FS_LEGAL_NAME = "APX Fire & Security Limited"
export const FS_COMPANY_NUMBER = "04915204"

// 1200x630 — swap the file when proper art is ready
export const FS_DEFAULT_OG_PATH = "/og/default.png"

// Footer lockup on black — used as the Google logo asset
export const FS_GOOGLE_LOGO_PATH = "/google-logo.png"

export const FS_ORG_LOGO_PATH = "/icon-512.png"

export const FS_PHONE_DISPLAY = "020 8303 2280"
export const FS_PHONE_E164 = "+442083032280"
export const FS_EMAIL = "enquiries@apx-fs.co.uk"
export const FS_COMPANIES_HOUSE_URL =
  "https://find-and-update.company-information.service.gov.uk/company/04915204"
export const FS_SLOGAN =
  "NSI and BAFE-aligned fire alarms, CCTV and access control across London and the Home Counties"

export function getFsSiteUrl(): string {
  const u = process.env.NEXT_PUBLIC_SITE_URL
  if (u?.trim()) return u.replace(/\/$/, "")
  return "https://www.apx-fs.co.uk"
}

export function getApxMepSiteUrl(): string {
  const u = process.env.NEXT_PUBLIC_APX_MEP_URL
  if (u?.trim()) return u.replace(/\/$/, "")
  return "https://www.apx-mep.co.uk"
}

export function fsAbsoluteUrl(path: string): string {
  const base = getFsSiteUrl()
  const p = path.startsWith("/") ? path : `/${path}`
  return `${base}${p}`
}

export const FS_SEO_KEYWORDS = [
  "fire alarm installation London",
  "commercial fire alarm systems",
  "fire alarm maintenance London",
  "NSI fire alarm",
  "BAFE registered fire safety",
  "CCTV installation London",
  "commercial CCTV systems",
  "access control systems London",
  "door entry systems London",
  "intruder alarm installation",
  "video door entry systems",
  "Fire and Security contractor London",
  "life safety systems",
  "fire risk compliance",
  "integrated security systems",
  "fire extinguisher servicing",
  "emergency lighting compliance",
  "London Fire and Security",
  "Home Counties fire security",
  "Kent fire alarm",
  "Essex CCTV",
  "Surrey access control",
] as const

// What we want schema / crawlers to associate with the brand
export const FS_KNOWS_ABOUT = [
  "Fire alarm systems",
  "Fire detection and life safety",
  "Commercial CCTV",
  "Access control systems",
  "Intruder alarm systems",
  "Video door entry",
  "PAVA and voice alarm",
  "Disabled refuge communication",
  "Gate automation",
  "Fire and Security maintenance",
  "NSI Gold systems",
  "BAFE registered fire safety",
  "24/7 emergency call-out",
] as const

export function fsKeywordsMetaString(): string {
  return FS_SEO_KEYWORDS.join(", ")
}

export function fsDefaultDescription(): string {
  return `${FS_SITE_NAME}: NSI & BAFE-aligned fire alarms, CCTV, access control, intruder and life-safety systems for commercial, public-sector and residential clients across Greater London, every London borough, and the Home Counties including Kent, Essex, Surrey, Hertfordshire and Berkshire. Design, installation, commissioning and maintenance.`
}

function fsSameAs(): string[] {
  const social = APX_SOCIAL_LINKS.map((l) => l.href).filter((href) => !href.includes("google.com/search"))
  return [...social, FS_COMPANIES_HOUSE_URL]
}

export function fsJsonLdGraph(): Record<string, unknown> {
  const url = getFsSiteUrl()
  const logoUrl = fsAbsoluteUrl(FS_ORG_LOGO_PATH)
  const googleLogoUrl = fsAbsoluteUrl(FS_GOOGLE_LOGO_PATH)
  const postalAddress = {
    "@type": "PostalAddress" as const,
    streetAddress: "365-369 Bexley Road",
    addressLocality: "Erith",
    addressRegion: "Kent",
    postalCode: "DA8 3EZ",
    addressCountry: "GB",
  }
  const logoImage = {
    "@type": "ImageObject" as const,
    "@id": `${url}/#logo`,
    url: logoUrl,
    contentUrl: logoUrl,
    width: 512,
    height: 512,
    caption: FS_SITE_NAME,
  }
  const brandLogo = {
    "@type": "ImageObject" as const,
    "@id": `${url}/#brandlogo`,
    url: googleLogoUrl,
    contentUrl: googleLogoUrl,
    width: 600,
    height: 160,
    caption: `${FS_LEGAL_NAME} logo`,
  }
  const geoAreas = [
    { "@type": "City" as const, name: "London" },
    { "@type": "AdministrativeArea" as const, name: "Greater London" },
    { "@type": "AdministrativeArea" as const, name: "South East England" },
    ...LONDON_BOROUGHS.map((name) => ({
      "@type": "AdministrativeArea" as const,
      name,
    })),
    ...HOME_COUNTIES_AND_REGIONS.map((name) => ({
      "@type": "AdministrativeArea" as const,
      name,
    })),
  ]
  const memberOf = [
    { "@type": "Organization" as const, name: "National Security Inspectorate", url: "https://www.nsi.org.uk/" },
    { "@type": "Organization" as const, name: "BAFE Fire Safety Register", url: "https://www.bafe.org.uk/" },
    { "@type": "Organization" as const, name: "Constructionline", url: "https://www.constructionline.co.uk/" },
    { "@type": "Organization" as const, name: "Fire Industry Association", url: "https://www.fia.uk.com/" },
  ]
  const offerCatalog = {
    "@type": "OfferCatalog" as const,
    "@id": `${url}/#services`,
    name: "Fire and Security services",
    itemListElement: FS_SERVICE_NAV_LINKS.map((service, index) => ({
      "@type": "Offer" as const,
      position: index + 1,
      itemOffered: {
        "@type": "Service" as const,
        name: service.label,
        url: fsAbsoluteUrl(service.href),
        provider: { "@id": `${url}/#organization` },
      },
    })),
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${url}/#organization`,
        name: FS_SITE_NAME,
        legalName: FS_LEGAL_NAME,
        alternateName: ["APX FS", "APX Fire and Security", "APX Fire & Security Limited"],
        slogan: FS_SLOGAN,
        url,
        logo: { "@id": `${url}/#logo` },
        image: [{ "@id": `${url}/#logo` }, { "@id": `${url}/#brandlogo` }],
        email: FS_EMAIL,
        telephone: FS_PHONE_E164,
        address: postalAddress,
        foundingDate: "1986",
        taxID: FS_COMPANY_NUMBER,
        identifier: {
          "@type": "PropertyValue",
          name: "Company number",
          value: FS_COMPANY_NUMBER,
        },
        areaServed: geoAreas,
        knowsAbout: [...FS_KNOWS_ABOUT],
        knowsLanguage: ["en-GB"],
        sameAs: fsSameAs(),
        award: [
          "NSI Gold, Security",
          "NSI Gold, Fire",
          "BAFE Registered Organisation 301168",
          "Constructionline Gold",
          "FIA Full Member",
          "BS EN ISO 9001:2015",
        ],
        memberOf,
        hasOfferCatalog: { "@id": `${url}/#services` },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: FS_PHONE_E164,
            contactType: "customer service",
            email: FS_EMAIL,
            areaServed: "GB",
            availableLanguage: ["English"],
          },
          {
            "@type": "ContactPoint",
            telephone: FS_PHONE_E164,
            contactType: "sales",
            email: FS_EMAIL,
            areaServed: "GB",
            availableLanguage: ["English"],
            url: fsAbsoluteUrl("/contact"),
          },
        ],
      },
      logoImage,
      brandLogo,
      offerCatalog,
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url,
        name: FS_SITE_NAME,
        description: fsDefaultDescription(),
        publisher: { "@id": `${url}/#organization` },
        inLanguage: "en-GB",
        isAccessibleForFree: true,
      },
      {
        "@type": ["ProfessionalService", "LocalBusiness"],
        "@id": `${url}/#localbusiness`,
        name: FS_SITE_NAME,
        legalName: FS_LEGAL_NAME,
        slogan: FS_SLOGAN,
        image: [logoUrl, googleLogoUrl, fsAbsoluteUrl(FS_DEFAULT_OG_PATH)],
        url,
        telephone: FS_PHONE_E164,
        email: FS_EMAIL,
        priceRange: "$$",
        currenciesAccepted: "GBP",
        address: postalAddress,
        geo: {
          "@type": "GeoCoordinates",
          latitude: 51.4805,
          longitude: 0.1752,
        },
        hasMap: "https://maps.google.com/?q=365-369+Bexley+Road+Northumberland+Heath+Erith+Kent+DA8+3EZ",
        areaServed: [
          {
            "@type": "GeoCircle",
            geoMidpoint: {
              "@type": "GeoCoordinates",
              latitude: 51.4805,
              longitude: 0.1752,
            },
            geoRadius: 120000,
            description:
              "Greater London, Home Counties and South East, Fire and Security installations and maintenance.",
          },
          ...geoAreas,
        ],
        serviceType: [...FS_KNOWS_ABOUT],
        knowsAbout: [...FS_KNOWS_ABOUT],
        memberOf,
        hasOfferCatalog: { "@id": `${url}/#services` },
        parentOrganization: { "@id": `${url}/#organization` },
        sameAs: fsSameAs(),
      },
    ],
  }
}
