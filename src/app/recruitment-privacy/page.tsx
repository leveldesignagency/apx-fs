import type { Metadata } from "next"
import Link from "next/link"
import { buildFsMetadata } from "@/lib/seo-metadata"

export const metadata: Metadata = buildFsMetadata({
  title: "Recruitment Privacy Notice | APX Fire & Security",
  description:
    "How APX Fire & Security collects, uses and stores personal information in CVs and job applications.",
  pathname: "/recruitment-privacy",
})

export default function RecruitmentPrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <section className="site-container max-w-3xl pb-24 pt-16 sm:pb-28 sm:pt-20">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/45">Legal</p>
        <h1 className="mt-3 font-title text-3xl font-bold leading-tight text-black sm:text-4xl">
          Recruitment privacy notice
        </h1>
        <p className="mt-2 text-sm text-black/50">Last updated: 30 September 2026</p>
        <p className="mt-4 text-base leading-relaxed text-black/65">
          This notice explains how <strong>APX Fire &amp; Security Limited</strong> (company number 04915204), trading as
          APX Fire &amp; Security (&ldquo;APX&rdquo;, &ldquo;we&rdquo;), handles personal information when you apply for a
          role via our website or send a CV for recruitment purposes. It sits alongside our general{" "}
          <Link href="/privacy" className="font-semibold underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </p>

        <div className="mt-10 space-y-8 text-base leading-relaxed text-black/80">
          <div>
            <h2 className="font-title text-xl font-bold text-black">Data controller</h2>
            <p className="mt-3">
              APX Fire &amp; Security Limited is the data controller. Contact:{" "}
              <a href="mailto:enquiries@apx-fs.co.uk" className="font-semibold underline underline-offset-2">
                enquiries@apx-fs.co.uk
              </a>
              , telephone 020 8303 2280. Trading address: 365-369 Bexley Road, Erith, Kent, DA8 3EZ. Registered office:
              Springhaven, 1a Barnfield Close, Hastings, East Sussex, TN34 1TS.
            </p>
          </div>

          <div>
            <h2 className="font-title text-xl font-bold text-black">What we collect</h2>
            <p className="mt-3">
              When you apply online we typically collect your name, email address, telephone number, details of your
              experience, and your CV (and any other information you choose to include). CVs often contain personal data such
              as employment history, qualifications and contact details.
            </p>
            <p className="mt-3">
              Please do not include special category data (for example health information, ethnicity or trade union
              membership) unless we specifically ask for it for a lawful reason. If you include it voluntarily, we will only
              use it where necessary and permitted by law.
            </p>
          </div>

          <div>
            <h2 className="font-title text-xl font-bold text-black">How we use your information</h2>
            <p className="mt-3">
              We use applicant information to assess suitability for the role you applied for, to contact you about your
              application, and to keep records of our recruitment process. We do not use application data for unrelated
              marketing.
            </p>
          </div>

          <div>
            <h2 className="font-title text-xl font-bold text-black">How applications are received</h2>
            <p className="mt-3">
              Website applications are submitted through our careers form and emailed to our designated recruitment mailbox (
              <strong>enquiries@apx-fs.co.uk</strong>) via our email service provider (Resend). CVs are attached to that
              message. Access is limited to staff involved in recruitment and hiring for the relevant role.
            </p>
            <p className="mt-3">
              Applications are <strong>not stored permanently in the website database</strong>; they are transmitted by email.
              Cloudflare Turnstile may be used to reduce automated abuse of the form. Hosting is provided by Vercel.
            </p>
          </div>

          <div>
            <h2 className="font-title text-xl font-bold text-black">Legal basis</h2>
            <p className="mt-3">
              We process recruitment data because it is necessary to take steps at your request before entering into a
              contract (considering you for employment) and/or because we have a legitimate interest in recruiting suitable
              staff, balanced against your rights. We do not rely on consent as our primary lawful basis for reviewing
              applications (due to the imbalance of power in recruitment), but we ask you to confirm you have read this
              notice before submitting.
            </p>
          </div>

          <div>
            <h2 className="font-title text-xl font-bold text-black">How long we keep it</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong>Unsuccessful applications</strong> — we retain application materials for{" "}
                <strong>one (1) year</strong> from the date of application (or from the end of that recruitment exercise, if
                later), then delete emails and any saved CV copies, unless a longer period is required by law or you ask us to
                keep your details for future roles.
              </li>
              <li>
                <strong>Successful applicants</strong> — your information becomes part of the employment / HR record and is
                retained under separate employment policies for the duration of employment and for any period required after
                employment ends.
              </li>
            </ul>
            <p className="mt-3">
              Retention is enforced by scheduled mailbox / file reviews (not by website automation), because applications are
              delivered by email.
            </p>
          </div>

          <div>
            <h2 className="font-title text-xl font-bold text-black">Your rights</h2>
            <p className="mt-3">
              You may request access to, correction of, or erasure of your personal data in certain circumstances, and you may
              object to or restrict certain processing. To exercise these rights, or if you have a complaint about how we
              handle recruitment data, contact{" "}
              <a href="mailto:enquiries@apx-fs.co.uk" className="font-semibold underline underline-offset-2">
                enquiries@apx-fs.co.uk
              </a>{" "}
              or use our{" "}
              <Link href="/contact" className="font-semibold underline underline-offset-2">
                contact page
              </Link>
              . You may also complain to the Information Commissioner&apos;s Office (ICO) at{" "}
              <a
                href="https://ico.org.uk/make-a-complaint/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline underline-offset-2"
              >
                ico.org.uk/make-a-complaint
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="font-title text-xl font-bold text-black">Equal opportunities</h2>
            <p className="mt-3">
              APX Fire &amp; Security is an equal-opportunities employer. We welcome applications from all suitably qualified
              candidates regardless of age, disability, gender reassignment, marriage or civil partnership, pregnancy or
              maternity, race, religion or belief, sex or sexual orientation. Decisions are based on experience, skills and
              ability to do the job.
            </p>
          </div>

          <div>
            <h2 className="font-title text-xl font-bold text-black">Related policies</h2>
            <p className="mt-3">
              For general website privacy information, see our{" "}
              <Link href="/privacy" className="font-semibold underline underline-offset-2">
                Privacy Policy
              </Link>
              . For cookies, see our{" "}
              <Link href="/cookie-policy" className="font-semibold underline underline-offset-2">
                Cookie Policy
              </Link>
              .
            </p>
          </div>
        </div>

        <p className="mt-12 text-sm text-black/50">
          <Link href="/careers" className="underline underline-offset-2 hover:text-black">
            Back to careers
          </Link>
        </p>
      </section>
    </div>
  )
}
