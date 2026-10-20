// SEO helpers for APX Fire & Security. Prefer NEXT_PUBLIC_SITE_URL in prod.

import { APX_SOCIAL_LINKS } from "./apxSocialLinks"
import { HOME_COUNTIES_AND_REGIONS, LONDON_BOROUGHS } from "./seo-geo-areas"

export const FS_SITE_NAME = "APX Fire & Security"
export const FS_LEGAL_NAME = "APX Fire & Security Limited"
export const FS_COMPANY_NUMBER = "04915204"

// 1200x630 — swap the file when proper art is ready
export const FS_DEFAULT_OG_PATH = "/og/default.png"

// Footer lockup on black — used as the Google logo asset
export const FS_GOOGLE_LOGO_PATH = "/google-logo.png"

export const FS_ORG_LOGO_PATH = "/icon-512.png"

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
  const boroughs = LONDON_BOROUGHS.join(", ")
  const regions = HOME_COUNTIES_AND_REGIONS.join(", ")
  const primary = FS_SEO_KEYWORDS.join(", ")
  return `${primary}, ${boroughs}, ${regions}, Greater London, South East England`
}

export function fsDefaultDescription(): string {
  return `${FS_SITE_NAME}: NSI & BAFE-aligned fire alarms, CCTV, access control, intruder and life-safety systems for commercial, public-sector and residential clients across Greater London, every London borough, and the Home Counties including Kent, Essex, Surrey, Hertfordshire and Berkshire. Design, installation, commissioning and maintenance.`
}

function fsSameAs(): string[] {
  return APX_SOCIAL_LINKS.map((l) => l.href).filter((href) => !href.includes("google.com/search"))
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

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${url}/#organization`,
        name: FS_SITE_NAME,
        legalName: FS_LEGAL_NAME,
        alternateName: ["APX FS", "APX Fire and Security"],
        url,
        logo: { "@id": `${url}/#logo` },
        image: [{ "@id": `${url}/#logo` }, { "@id": `${url}/#brandlogo` }],
        email: "enquiries@apx-fs.co.uk",
        telephone: "+442083032280",
        address: postalAddress,
        foundingDate: "1986",
        taxID: FS_COMPANY_NUMBER,
        identifier: {
          "@type": "PropertyValue",
          name: "Company number",
          value: FS_COMPANY_NUMBER,
        },
        areaServed: [
          { "@type": "City", name: "London" },
          { "@type": "AdministrativeArea", name: "Greater London" },
          ...HOME_COUNTIES_AND_REGIONS.map((name) => ({
            "@type": "AdministrativeArea" as const,
            name,
          })),
        ],
        knowsAbout: [...FS_KNOWS_ABOUT],
        sameAs: fsSameAs(),
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+442083032280",
            contactType: "customer service",
            email: "enquiries@apx-fs.co.uk",
            areaServed: "GB",
            availableLanguage: ["English"],
          },
        ],
      },
      logoImage,
      brandLogo,
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url,
        name: FS_SITE_NAME,
        description: fsDefaultDescription(),
        publisher: { "@id": `${url}/#organization` },
        inLanguage: "en-GB",
      },
      {
        "@type": ["ProfessionalService", "LocalBusiness"],
        "@id": `${url}/#localbusiness`,
        name: FS_SITE_NAME,
        legalName: FS_LEGAL_NAME,
        image: [logoUrl, googleLogoUrl, fsAbsoluteUrl(FS_DEFAULT_OG_PATH)],
        url,
        telephone: "+442083032280",
        email: "enquiries@apx-fs.co.uk",
        priceRange: "$$",
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
          ...LONDON_BOROUGHS.slice(0, 12).map((name) => ({
            "@type": "AdministrativeArea" as const,
            name,
          })),
          ...HOME_COUNTIES_AND_REGIONS.map((name) => ({
            "@type": "AdministrativeArea" as const,
            name,
          })),
        ],
        serviceType: [...FS_KNOWS_ABOUT],
        knowsAbout: [...FS_KNOWS_ABOUT],
        parentOrganization: { "@id": `${url}/#organization` },
        sameAs: fsSameAs(),
      },
    ],
  }
}
