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
        <p className="mt-4 text-base leading-relaxed text-black/65">
          This notice explains how APX Fire &amp; Security Ltd (&ldquo;APX&rdquo;, &ldquo;we&rdquo;) handles personal information when you apply
          for a role via our website or send a CV for recruitment purposes.
        </p>

        <div className="mt-10 space-y-8 text-base leading-relaxed text-black/80">
          <section>
            <h2 className="font-title text-xl font-bold text-black">What we collect</h2>
            <p className="mt-3">
              When you apply online we typically collect your name, email address, telephone number, details of your
              experience, and your CV (and any other information you choose to include in those documents). CVs often
              contain personal data such as employment history, qualifications and contact details.
            </p>
          </section>

          <section>
            <h2 className="font-title text-xl font-bold text-black">How we use your information</h2>
            <p className="mt-3">
              We use applicant information to assess suitability for the role you applied for (and similar vacancies
              where you have agreed), to contact you about your application, and to keep records of our recruitment
              process. We do not use application data for unrelated marketing.
            </p>
          </section>

          <section>
            <h2 className="font-title text-xl font-bold text-black">How applications are received</h2>
            <p className="mt-3">
              Website applications are submitted through our careers form and emailed securely to APX&apos;s designated
              recruitment mailbox via our email service provider (Resend). Attachments (including CVs) are included
              with that message. Access is limited to staff involved in recruitment and hiring for the relevant role.
            </p>
            <p className="mt-3">
              Exact mailbox recipients and any longer-term HR filing locations are controlled by APX. Applications are not stored
              permanently in the website database; they are transmitted by email to the configured notification address.
            </p>
          </section>

          <section>
            <h2 className="font-title text-xl font-bold text-black">Legal basis</h2>
            <p className="mt-3">
              We process recruitment data because it is necessary to take steps at your request before entering into a
              contract (considering you for employment), and/or because we have a legitimate interest in recruiting
              suitable staff, balanced against your rights.
            </p>
          </section>

          <section>
            <h2 className="font-title text-xl font-bold text-black">How long we keep it</h2>
            <p className="mt-3">
              If you are unsuccessful, we normally retain application materials only for as long as needed to complete
              the recruitment exercise and for a short period afterwards (typically up to 6-12 months) in case of
              related queries or similar vacancies, unless a longer period is required by law or you agree otherwise.
              Successful applicants&apos; information forms part of the employment record under separate HR policies.
            </p>
          </section>

          <section>
            <h2 className="font-title text-xl font-bold text-black">Your rights</h2>
            <p className="mt-3">
              You may request access to, correction of, or erasure of your personal data in certain circumstances, and
              you may object to or restrict certain processing. To exercise these rights, or if you have a complaint
              about how we handle recruitment data, contact us using the details on our{" "}
              <Link href="/contact" className="font-semibold underline underline-offset-2">
                contact page
              </Link>
              . You may also contact the Information Commissioner&apos;s Office (ICO).
            </p>
          </section>

          <section>
            <h2 className="font-title text-xl font-bold text-black">Equal opportunities</h2>
            <p className="mt-3">
              APX Fire &amp; Security is an equal-opportunities employer. We welcome applications from all suitably
              qualified candidates regardless of age, disability, gender reassignment, marriage or civil partnership,
              pregnancy or maternity, race, religion or belief, sex or sexual orientation. Decisions are based on
              experience, skills and ability to do the job.
            </p>
          </section>

          <section>
            <h2 className="font-title text-xl font-bold text-black">Related policies</h2>
            <p className="mt-3">
              For general website privacy information, see our{" "}
              <Link href="/privacy" className="font-semibold underline underline-offset-2">
                Privacy Policy
              </Link>
              . This recruitment notice is specific to job applications and CVs.
            </p>
          </section>
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
