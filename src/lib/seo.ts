/**
 * SEO & local (GEO) configuration — APX Fire & Security.
 * Set NEXT_PUBLIC_SITE_URL in production (e.g. https://www.apx-fs.co.uk).
 */

import { HOME_COUNTIES_AND_REGIONS, LONDON_BOROUGHS } from "./seo-geo-areas"

export const FS_SITE_NAME = "APX Fire & Security"

/** Default if env unset — replace in deployment */
export function getFsSiteUrl(): string {
  const u = process.env.NEXT_PUBLIC_SITE_URL
  if (u?.trim()) return u.replace(/\/$/, "")
  return "http://localhost:3000"
}

/** High commercial-intent + service terms for meta keywords & copy */
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
  "fire and security contractor London",
  "life safety systems",
  "fire risk compliance",
  "integrated security systems",
  "fire extinguisher servicing",
  "emergency lighting compliance",
  "London fire and security",
  "Home Counties fire security",
  "Kent fire alarm",
  "Essex CCTV",
  "Surrey access control",
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

export function fsJsonLdGraph(): Record<string, unknown> {
  const url = getFsSiteUrl()
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${url}/#organization`,
        name: FS_SITE_NAME,
        url,
        logo: `${url}/__APX%20Web%20Logo%20FS.svg`,
        email: "enquiries@apx-fs.co.uk",
        telephone: "+442045685986",
        address: {
          "@type": "PostalAddress",
          addressLocality: "London",
          addressRegion: "England",
          addressCountry: "GB",
        },
        areaServed: [
          { "@type": "City", name: "London" },
          { "@type": "AdministrativeArea", name: "Greater London" },
          ...HOME_COUNTIES_AND_REGIONS.map((name) => ({
            "@type": "AdministrativeArea" as const,
            name,
          })),
        ],
        sameAs: [] as string[],
      },
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url,
        name: FS_SITE_NAME,
        publisher: { "@id": `${url}/#organization` },
        inLanguage: "en-GB",
      },
      {
        "@type": "ProfessionalService",
        "@id": `${url}/#localbusiness`,
        name: FS_SITE_NAME,
        image: `${url}/__APX%20Web%20Logo%20FS.svg`,
        url,
        telephone: "+442045685986",
        email: "enquiries@apx-fs.co.uk",
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          addressLocality: "London",
          addressRegion: "England",
          addressCountry: "GB",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 51.5074,
          longitude: -0.1278,
        },
        areaServed: [
          {
            "@type": "GeoCircle",
            geoMidpoint: {
              "@type": "GeoCoordinates",
              latitude: 51.5074,
              longitude: -0.1278,
            },
            geoRadius: 120000,
            description: "Greater London, Home Counties and South East — fire and security installations and maintenance.",
          },
        ],
        serviceType: [
          "Fire alarm systems",
          "CCTV installation",
          "Access control",
          "Intruder alarms",
          "Video door entry",
          "Life safety systems",
          "Fire and security maintenance",
        ],
      },
    ],
  }
}
