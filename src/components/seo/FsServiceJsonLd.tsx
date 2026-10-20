import { getFsServiceFaqItems } from "@/lib/fs-service-faq-content"
import { FS_SERVICE_NAV_LINKS } from "@/lib/fs-service-navigation"
import {
  breadcrumbsForServicePath,
  buildBreadcrumbJsonLd,
  buildFaqPageJsonLd,
  buildServiceJsonLd,
} from "@/lib/seo-jsonld"
import { JsonLd } from "@/components/seo/JsonLd"

const EXTRA_LABELS: Record<string, string> = {
  "/services": "Fire & Security Services",
  "/services/fire-life-safety": "Fire & Life Safety",
  "/services/security-systems": "Security Systems",
  "/services/cctv/commercial": "Commercial CCTV",
  "/services/cctv/domestic": "Domestic CCTV",
  "/services/cctv/advice": "CCTV Advice",
}

function labelForPath(pathname: string): string {
  if (EXTRA_LABELS[pathname]) return EXTRA_LABELS[pathname]
  const nav = FS_SERVICE_NAV_LINKS.find((l) => l.href === pathname)
  if (nav) return nav.label
  return pathname
    .split("/")
    .filter(Boolean)
    .pop()!
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

type Props = {
  pathname: string
  name?: string
  description: string
}

/** FAQ + breadcrumb + Service schema for /services pages (server components only) */
export function FsServiceJsonLd({ pathname, name, description }: Props) {
  const serviceName = name ?? labelForPath(pathname)
  const faqs = getFsServiceFaqItems(pathname)
  return (
    <JsonLd
      data={[
        buildBreadcrumbJsonLd(breadcrumbsForServicePath(pathname, serviceName)),
        buildFaqPageJsonLd(faqs),
        buildServiceJsonLd({
          name: serviceName,
          description,
          pathname,
          serviceType: serviceName,
        }),
      ]}
    />
  )
}
