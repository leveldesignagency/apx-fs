import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import { CustomPillButton } from "@/components/ui/CustomPillButton"
import { buildFsMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = buildFsMetadata({
  title: "Thank You | Enquiry Received | APX Fire & Security",
  description: "Thank you for contacting APX Fire & Security. We have received your enquiry and will respond shortly.",
  pathname: "/thank-you",
  robots: { index: false, follow: false },
})

export default function ThankYouPage() {
  return (
    <div className="min-h-[70vh] bg-black text-white">
      <div className="h-[0.75px] w-full bg-white/30" aria-hidden />
      <section className="site-container flex flex-col items-center px-6 py-24 text-center md:py-32">
        <CheckCircle2 className="h-14 w-14 text-emerald-400" aria-hidden />
        <h1 className="mt-8 font-title text-4xl font-bold tracking-tight md:text-5xl">Thank you</h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
          We have received your enquiry and will respond using your preferred contact method. A confirmation email has
          also been sent to the address you provided.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <CustomPillButton href="/" size="md">
            Back to home
          </CustomPillButton>
          <CustomPillButton href="/services" size="md" variant="outline">
            Browse services
          </CustomPillButton>
        </div>
        <p className="mt-10 text-sm text-white/50">
          Urgent? Call{" "}
          <a href="tel:02083032280" className="font-semibold text-white underline decoration-white/40 underline-offset-4">
            020 8303 2280
          </a>{" "}
          or email{" "}
          <a
            href="mailto:enquiries@apx-fs.co.uk"
            className="font-semibold text-white underline decoration-white/40 underline-offset-4"
          >
            enquiries@apx-fs.co.uk
          </a>
          .
        </p>
        <p className="mt-4 text-sm text-white/45">
          <Link href="/contact" className="underline decoration-white/30 underline-offset-4 hover:decoration-white">
            Send another message
          </Link>
        </p>
      </section>
    </div>
  )
}
