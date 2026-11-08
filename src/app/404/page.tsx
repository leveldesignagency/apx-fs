import type { Metadata } from "next"
import { NotFoundContent } from "@/components/NotFoundContent"

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
}

export default function PageNotFound() {
  return <NotFoundContent />
}
