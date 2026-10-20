import { FsServiceJsonLd } from "@/components/seo/FsServiceJsonLd"
import { ServicesHubClient } from "./ServicesHubClient"

const HUB_DESCRIPTION =
  "Fire alarms, CCTV, access control, intruder alarms, maintenance and compliance, end-to-end Fire and Security services for London, Kent, Essex, Surrey, Hertfordshire and the wider Home Counties."

export default function ServicesPage() {
  return (
    <>
      <FsServiceJsonLd
        pathname="/services"
        name="Fire & Security Services"
        description={HUB_DESCRIPTION}
      />
      <ServicesHubClient />
    </>
  )
}
