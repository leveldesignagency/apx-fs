import { redirect } from "next/navigation"

/** Legacy MEP-era URL. Canonical: /delivery-methodology */
export default function MethodologyRedirect() {
  redirect("/delivery-methodology")
}
