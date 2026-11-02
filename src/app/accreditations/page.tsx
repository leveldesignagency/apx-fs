import { AccreditationsHubClient } from "@/components/accreditations/AccreditationsHubClient"
import { FsBreadcrumbJsonLd } from "@/components/seo/FsBreadcrumbJsonLd"

export default function AccreditationsIndexPage() {
  return (
    <>
      <FsBreadcrumbJsonLd crumbs={[{ name: "Accreditations", path: "/accreditations" }]} />
      <AccreditationsHubClient />
    </>
  )
}
