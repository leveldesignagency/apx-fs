"use client"

import Link from "next/link"
import { LegalContactBox, LegalPageShell, LegalSection } from "@/components/LegalPageShell"

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell title="Privacy Policy" lastUpdated="30 September 2026">
      <LegalSection title="Introduction">
        <p>
          APX Fire &amp; Security Limited, trading as APX Fire &amp; Security (&ldquo;APX&rdquo;, &ldquo;we&rdquo;,
          &ldquo;us&rdquo; or &ldquo;our&rdquo;), respects your privacy and is committed to protecting your personal data.
          This Privacy Policy explains how we collect, use, store and share personal information when you visit our website,
          submit an enquiry, request a quote, or otherwise interact with us.
        </p>
        <p>
          Job applications and CVs are covered in more detail by our separate{" "}
          <Link href="/recruitment-privacy" className="underline hover:opacity-80">
            Recruitment Privacy Notice
          </Link>
          .
        </p>
        <p>
          Providing information through our forms, or otherwise contacting us, means you understand we will process that
          information as described here. Cookie choices are managed separately via our cookie banner and{" "}
          <Link href="/cookie-policy" className="underline hover:opacity-80">
            Cookie Policy
          </Link>
          ; browsing alone does not consent to non-essential cookies.
        </p>
      </LegalSection>

      <LegalSection title="Who We Are">
        <p>
          <strong>APX Fire &amp; Security Limited</strong> (company number 04915204), trading as APX Fire &amp; Security,
          is a specialist provider of Fire and Security system installation, commissioning, and maintenance, serving
          domestic and commercial clients across London and the Home Counties.
        </p>
        <p>
          For the purposes of UK data protection law (UK GDPR and the Data Protection Act 2018), APX Fire &amp; Security
          Limited is the <strong>data controller</strong> responsible for your personal data.
        </p>
        <LegalContactBox />
      </LegalSection>

      <LegalSection title="Personal Data We Collect">
        <p>We may collect and process the following categories of personal data:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Identity and contact data</strong>, such as your name, job title, company name, email address, telephone
            number and postal address.
          </li>
          <li>
            <strong>Preferred contact method</strong>, whether you asked us to reply by email, phone or SMS / text message.
          </li>
          <li>
            <strong>Enquiry and project data</strong>, information you provide when requesting a quote, survey or callback,
            including service requirements, property details and project descriptions.
          </li>
          <li>
            <strong>Technical and usage data</strong>, such as IP address, browser type, device information, pages viewed,
            referral source and approximate location derived from IP address (where collected for security or, if enabled,
            analytics).
          </li>
          <li>
            <strong>Communications data</strong>, records of correspondence if you contact us by email, telephone or through
            forms on this website.
          </li>
          <li>
            <strong>Cookie and preference data</strong>, as described in our{" "}
            <Link href="/cookie-policy" className="underline hover:opacity-80">
              Cookie Policy
            </Link>
            .
          </li>
        </ul>
        <p>
          We do not intentionally collect special category data (such as health information) through this website unless you
          choose to include it in a free-text message. Please avoid sending sensitive personal data unless it is necessary for
          your enquiry.
        </p>
        <p>
          Website contact and careers forms are not stored in a website database. Submissions are emailed to our business
          mailbox (<strong>enquiries@apx-fs.co.uk</strong>) so we can respond. Security checks (for example bot protection)
          may process limited technical data at the point of submission.
        </p>
      </LegalSection>

      <LegalSection title="How We Use Your Data">
        <p>We use personal data for the following purposes:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>responding to enquiries, quote requests and contact form submissions using your preferred contact method;</li>
          <li>sending an automated confirmation where you have provided an email address;</li>
          <li>providing information about our Fire and Security services;</li>
          <li>arranging surveys, site visits, quotations and follow-up communications;</li>
          <li>operating, maintaining and securing our website (including rate limiting and abuse prevention);</li>
          <li>monitoring website performance and usage trends where analytics are enabled and consented to;</li>
          <li>complying with legal, regulatory and insurance obligations;</li>
          <li>establishing, exercising or defending legal claims where necessary.</li>
        </ul>
        <p>
          We do <strong>not</strong> use website enquiry details for unrelated marketing (for example newsletters) unless you
          have given a separate, clear opt-in for that purpose.
        </p>
      </LegalSection>

      <LegalSection title="Lawful Bases for Processing">
        <p>Under UK GDPR, we rely on one or more of the following lawful bases:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Contract / pre-contract steps</strong> (Article 6(1)(b)), where processing is necessary to respond to your
            request or take steps before entering into a contract with you (for example a quote or site survey).
          </li>
          <li>
            <strong>Legitimate interests</strong> (Article 6(1)(f)), where processing is necessary for our legitimate business
            interests — such as responding to enquiries, keeping business records during a client relationship, improving our
            services and securing our website — provided your rights do not override those interests.
          </li>
          <li>
            <strong>Consent</strong> (Article 6(1)(a)), where you have given clear consent — for example non-essential cookies,
            or SMS / text message contact where you have selected that method and confirmed SMS consent. You may withdraw
            consent at any time.
          </li>
          <li>
            <strong>Legal obligation</strong> (Article 6(1)(c)), where we need to comply with applicable law (for example tax
            or health and safety record-keeping).
          </li>
        </ul>
        <p>
          Electronic marketing messages are also subject to the Privacy and Electronic Communications Regulations (PECR). We
          only send SMS about your specific enquiry when you have chosen that contact method and given SMS consent.
        </p>
      </LegalSection>

      <LegalSection title="Cookies">
        <p>
          Our website uses essential cookies and, only if you choose, optional cookies. You can Accept All, Reject All, or
          Customise Preferences via the cookie banner, and reopen Cookie Preferences from the footer at any time. Non-essential
          cookies do not load until you accept them. For more information, see our{" "}
          <Link href="/cookie-policy" className="underline hover:opacity-80">
            Cookie Policy
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="Sharing Your Data">
        <p>We may share personal data with:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Vercel</strong> — website hosting and delivery;
          </li>
          <li>
            <strong>Resend</strong> — email delivery for form notifications and confirmation messages (processor acting on our
            instructions);
          </li>
          <li>
            <strong>Cloudflare</strong> — Turnstile bot protection on forms (processes a verification token / limited technical
            data);
          </li>
          <li>other service providers who support IT, telephony or office systems we use to run the business;</li>
          <li>professional advisers such as insurers, auditors or legal advisers where reasonably required;</li>
          <li>regulators, courts or law enforcement where we are legally required to do so.</li>
        </ul>
        <p>
          We require processors to handle personal data securely and only in accordance with our instructions and applicable
          law. We do not sell your personal data.
        </p>
      </LegalSection>

      <LegalSection title="Data Retention">
        <p>
          We retain personal data only for as long as necessary for the purposes set out in this policy, including legal,
          accounting or reporting requirements. Our standard schedule is:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Active clients</strong> — we keep relevant personal and project contact data{" "}
            <strong>throughout the client relationship</strong> so we can deliver and support services.
          </li>
          <li>
            <strong>After a client relationship ends</strong> — we remove or anonymise personal contact data{" "}
            <strong>one (1) year</strong> after the relationship ends, unless a longer period is required (see below).
          </li>
          <li>
            <strong>Website enquiries that do not become clients</strong> — we keep enquiry emails and related notes for{" "}
            <strong>one (1) year</strong> from the enquiry (or from the last meaningful contact about that enquiry), then
            delete them.
          </li>
          <li>
            <strong>Job applications</strong> — see the{" "}
            <Link href="/recruitment-privacy" className="underline hover:opacity-80">
              Recruitment Privacy Notice
            </Link>{" "}
            (unsuccessful applications: normally one year).
          </li>
          <li>
            <strong>Contracts, invoices and tax records</strong> — may be kept for longer where the law requires (often up to
            six years for accounting records). In those cases we keep what is needed for compliance and remove unnecessary
            personal details where practical.
          </li>
        </ul>
        <p>
          Because website forms deliver data by email to our mailbox, deletion is carried out in our email system, CRM and
          files as part of a scheduled review (typically quarterly), not by an automated website delete button.
        </p>
      </LegalSection>

      <LegalSection title="Data Security">
        <p>
          We implement appropriate technical and organisational measures designed to protect personal data against accidental
          loss, unauthorised access, alteration or disclosure. Forms on this website use bot protection, rate limiting and
          related controls. However, no method of transmission over the internet or method of electronic storage is completely
          secure.
        </p>
      </LegalSection>

      <LegalSection title="International Transfers">
        <p>
          Some of our service providers may process data outside the United Kingdom. Where this occurs, we take steps to
          ensure that appropriate safeguards are in place in accordance with applicable data protection law (for example
          standard contractual clauses or other approved transfer mechanisms used by those providers).
        </p>
      </LegalSection>

      <LegalSection title="Your Rights">
        <p>Under UK data protection law, you may have the right to:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>request access to your personal data;</li>
          <li>request correction of inaccurate or incomplete data;</li>
          <li>request erasure of your personal data in certain circumstances;</li>
          <li>object to or restrict processing in certain circumstances;</li>
          <li>request data portability where applicable;</li>
          <li>withdraw consent at any time where processing is based on consent (this does not affect earlier lawful
            processing);</li>
          <li>lodge a complaint with the Information Commissioner&apos;s Office (ICO).</li>
        </ul>
        <p>
          To exercise any of these rights, please contact us using the details below. We may need to verify your identity
          before responding. We aim to respond within one calendar month.
        </p>
      </LegalSection>

      <LegalSection title="Third-Party Links">
        <p>
          Our website may contain links to third-party websites. We are not responsible for the privacy practices or content
          of those sites and encourage you to read their privacy policies.
        </p>
      </LegalSection>

      <LegalSection title="Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated
          &ldquo;Last updated&rdquo; date. We encourage you to review this page periodically.
        </p>
      </LegalSection>

      <LegalSection title="Contact Us">
        <p>If you have any questions about this Privacy Policy or how we handle your personal data, please contact us:</p>
        <LegalContactBox />
        <p>
          You also have the right to complain to the Information Commissioner&apos;s Office (ICO) at{" "}
          <a
            href="https://ico.org.uk/make-a-complaint/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-80"
          >
            ico.org.uk/make-a-complaint
          </a>
          .
        </p>
      </LegalSection>
    </LegalPageShell>
  )
}
