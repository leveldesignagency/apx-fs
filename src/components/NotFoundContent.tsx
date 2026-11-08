import Link from "next/link"
import { CustomPillButton } from "@/components/ui/CustomPillButton"

export function NotFoundContent() {
  return (
    <div className="not-found-page min-h-[70vh] bg-black text-white">
      <div className="h-[0.75px] w-full bg-white/30" aria-hidden />
      <section className="not-found-page__section site-container flex flex-col items-center overflow-hidden px-6 pb-16 pt-44 text-center sm:pt-48 md:pb-24 md:pt-56 lg:pt-60">
        <p className="not-found-page__code font-title font-bold text-white" aria-hidden>
          404
        </p>
        <h1 className="not-found-page__title mt-2 font-title text-3xl font-bold tracking-normal sm:text-4xl md:text-5xl">
          Page Not Found
        </h1>
        <p className="not-found-page__body mt-5 max-w-lg text-base leading-relaxed text-white/70 md:text-lg">
          The page you requested does not exist or may have moved. Use the links below to continue, or contact us if you
          need help finding something.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <CustomPillButton href="/" size="md">
            Back to home
          </CustomPillButton>
          <CustomPillButton href="/contact" size="md" variant="outline">
            Contact us
          </CustomPillButton>
        </div>
        <p className="not-found-page__body mt-10 text-sm text-white/45">
          Or go to our{" "}
          <Link href="/about" className="underline decoration-white/30 underline-offset-4 hover:decoration-white">
            About
          </Link>{" "}
          or{" "}
          <Link href="/projects" className="underline decoration-white/30 underline-offset-4 hover:decoration-white">
            Projects
          </Link>{" "}
          pages.
        </p>
      </section>
    </div>
  )
}
