"use client"

import { usePathname } from "next/navigation"
import { getFsServiceFaqItems } from "@/lib/fs-service-faq-content"
import { FsServiceFaqSection } from "@/components/FsServiceFaqSection"

/** FAQ accordion with copy resolved from the current `/services/...` path. */
export function FsServiceFaqByRoute() {
  const pathname = usePathname() ?? ""
  const items = getFsServiceFaqItems(pathname)
  return <FsServiceFaqSection key={pathname} items={items} />
}
