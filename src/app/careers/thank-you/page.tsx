import type { Metadata } from "next"
import Link from "next/link"
import { CustomPillButton } from "@/components/ui/CustomPillButton"
import { getFsCareerRoleById } from "@/data/fsCareersRoles"
import { LetterReveal } from "@/components/LetterReveal"
import { buildFsNoIndexMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = buildFsNoIndexMetadata({
  title: "Application Received | Careers | APX Fire & Security",
  description:
    "Thank you for applying to APX Fire & Security. We have received your application and will be in touch if we progress it.",
  pathname: "/careers/thank-you",
})

type Props = {
  searchParams: Promise<{ role?: string }>
}

export default async function CareersThankYouPage({ searchParams }: Props) {
  const { role: roleId } = await searchParams
  const role = roleId ? getFsCareerRoleById(roleId) : undefined

  return (
    <div className="careers-page careers-apply-page relative min-h-[80vh] overflow-hidden bg-black text-white">
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
          Careers / APX Fire &amp; Security
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
          text="Application received"
          desktopOnly={false}
          className="mt-8 max-w-3xl font-title text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
        />

        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
          {role ? (
            <>
              Thank you{" "}
              <span aria-hidden>{"\u2014"}</span> we have your application for{" "}
              <span className="font-semibold text-white">{role.title}</span>.
            </>
          ) : (
            <>
              Thank you <span aria-hidden>{"\u2014"}</span> we have received your application.
            </>
          )}{" "}
          A confirmation email is on its way. If your experience matches the role, our recruitment team will be in
          touch.
        </p>

        <div className="mt-10 w-full max-w-lg border border-white/15 bg-white/[0.03] px-6 py-5 text-left sm:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">What happens next</p>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-white/70">
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-white" aria-hidden />
              <span>We review your CV against the role requirements and current pipeline.</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-white" aria-hidden />
              <span>
                Shortlisted candidates are contacted for a conversation{" "}
                <span aria-hidden>{"\u2014"}</span> there is no need to chase.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-white" aria-hidden />
              <span>
                Your details are handled under our{" "}
                <Link
                  href="/recruitment-privacy"
                  className="font-semibold text-white underline decoration-white/35 underline-offset-4 hover:decoration-white"
                >
                  recruitment privacy notice
                </Link>
                .
              </span>
            </li>
          </ul>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <CustomPillButton href="/careers" size="md">
            Back to careers
          </CustomPillButton>
          <CustomPillButton href="/" size="md" variant="outline">
            Home
          </CustomPillButton>
        </div>

        <p className="mt-12 max-w-md text-sm text-white/45">
          Questions about your application? Email{" "}
          <a
            href="mailto:enquiries@apx-fs.co.uk"
            className="font-semibold text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white"
          >
            enquiries@apx-fs.co.uk
          </a>{" "}
          or call{" "}
          <a
            href="tel:02083032280"
            className="font-semibold text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white"
          >
            020 8303 2280
          </a>
          .
        </p>
      </section>
    </div>
  )
}
