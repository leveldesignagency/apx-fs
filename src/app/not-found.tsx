import Link from "next/link"
import { CustomPillButton } from "@/components/ui/CustomPillButton"

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-black text-white">
      <div className="h-[0.75px] w-full bg-white/30" aria-hidden />
      <section className="site-container flex flex-col items-center px-6 py-24 text-center md:py-32">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/45">Error 404</p>
        <h1 className="mt-4 font-title text-4xl font-bold tracking-tight md:text-5xl">Page not found</h1>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70 md:text-lg">
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
          <CustomPillButton href="/services" size="md" variant="outline">
            Services
          </CustomPillButton>
        </div>
        <p className="mt-10 text-sm text-white/45">
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
