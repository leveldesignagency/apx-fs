import {
  breadcrumbsSimple,
  buildBreadcrumbJsonLd,
  type BreadcrumbCrumb,
} from "@/lib/seo-jsonld"
import { JsonLd } from "@/components/seo/JsonLd"

export function FsBreadcrumbJsonLd({ crumbs }: { crumbs: BreadcrumbCrumb[] }) {
  return <JsonLd data={buildBreadcrumbJsonLd(breadcrumbsSimple(...crumbs))} />
}
