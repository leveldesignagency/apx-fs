import type { Metadata } from "next"
import Link from "next/link"
import { CustomPillButton } from "@/components/ui/CustomPillButton"
import { LetterReveal } from "@/components/LetterReveal"
import { buildFsNoIndexMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = buildFsNoIndexMetadata({
  title: "Thank You | Enquiry Received | APX Fire & Security",
  description: "Thank you for contacting APX Fire & Security. We have received your enquiry and will respond shortly.",
  pathname: "/thank-you",
})

export default function ThankYouPage() {
  return (
    <div className="relative min-h-[80vh] overflow-hidden bg-black text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 50% -10%, rgba(255,255,255,0.12), transparent 55%), radial-gradient(ellipse 50% 40% at 100% 100%, rgba(255,255,255,0.04), transparent 50%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 85%)",
        }}
      />

      <section className="site-container relative z-[1] flex max-w-[1920px] flex-col items-center px-6 pb-28 pt-[clamp(8.75rem,18vh,12rem)] text-center sm:pb-32 xl:pt-[clamp(12.75rem,16vh,14.5rem)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/50">
          Contact / APX Fire &amp; Security
        </p>

        <div className="mt-8 flex h-16 w-16 items-center justify-center border border-white/35 bg-white text-black shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" aria-hidden>
            <path
              d="M5 12.5 9.5 17 19 7.5"
              stroke="currentColor"
              strokeWidth="2.25"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
          </svg>
        </div>

        <LetterReveal
          as="h1"
          text="Enquiry received"
          desktopOnly={false}
          className="mt-8 max-w-3xl font-title text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
        />

        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
          Thank you <span aria-hidden>{"\u2014"}</span> we have your message and will respond using your preferred
          contact method. A confirmation email is on its way to the address you provided.
        </p>

        <div className="mt-10 w-full max-w-lg border border-white/15 bg-white/[0.03] px-6 py-5 text-left sm:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">What happens next</p>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-white/70">
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-white" aria-hidden />
              <span>Our team reviews your enquiry and routes it to the right specialist.</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-white" aria-hidden />
              <span>
                We reply by your preferred method{" "}
                <span aria-hidden>{"\u2014"}</span> usually within one working day.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-white" aria-hidden />
              <span>
                Your details are handled under our{" "}
                <Link
                  href="/privacy"
                  className="font-semibold text-white underline decoration-white/35 underline-offset-4 hover:decoration-white"
                >
                  privacy policy
                </Link>
                .
              </span>
            </li>
          </ul>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <CustomPillButton href="/" size="md">
            Back to home
          </CustomPillButton>
          <CustomPillButton href="/services" size="md" variant="outline">
            Browse services
          </CustomPillButton>
        </div>

        <p className="mt-12 max-w-md text-sm text-white/45">
          Urgent? Call{" "}
          <a
            href="tel:02083032280"
            className="font-semibold text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white"
          >
            020 8303 2280
          </a>{" "}
          or email{" "}
          <a
            href="mailto:enquiries@apx-fs.co.uk"
            className="font-semibold text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white"
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
