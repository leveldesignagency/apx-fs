import { Suspense } from "react"
import { ContactPageClient } from "./ContactPageClient"

function ContactFallback() {
  return <div className="min-h-screen bg-black" aria-hidden />
}

export default function ContactPage() {
  return (
    <Suspense fallback={<ContactFallback />}>
      <ContactPageClient />
    </Suspense>
  )
}
