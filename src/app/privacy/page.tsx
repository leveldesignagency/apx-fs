"use client"

import Link from "next/link"
import { LegalContactBox, LegalPageShell, LegalSection } from "@/components/LegalPageShell"

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell title="Privacy Policy">
      <LegalSection title="Introduction">
        <p>
          APX Fire &amp; Security (&ldquo;APX&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;) respects your
          privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, store
          and share personal information when you visit our website, submit an enquiry, request a quote, or otherwise interact
          with us.
        </p>
        <p>
          Please read this policy carefully. By using our website or providing your information to us, you acknowledge that
          you have read and understood this Privacy Policy.
        </p>
      </LegalSection>

      <LegalSection title="Who We Are">
        <p>
          APX Fire &amp; Security is a specialist provider of fire and security system installation, commissioning, and
          maintenance, serving domestic and commercial clients across London and the Home Counties.
        </p>
        <p>
          For the purposes of applicable data protection law, APX Fire &amp; Security is the data controller responsible for
          your personal data.
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
            <strong>Enquiry and project data</strong>, information you provide when requesting a quote, survey or callback,
            including service requirements, property details and project descriptions.
          </li>
          <li>
            <strong>Technical and usage data</strong>, such as IP address, browser type, device information, pages viewed,
            referral source and approximate location derived from IP address.
          </li>
          <li>
            <strong>Communications data</strong>, records of correspondence if you contact us by email, telephone or through
            forms on this website.
          </li>
          <li>
            <strong>Cookie and preference data</strong>, information collected through cookies and similar technologies, as
            described in our{" "}
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
      </LegalSection>

      <LegalSection title="How We Use Your Data">
        <p>We use personal data for the following purposes:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>responding to enquiries, quote requests and contact form submissions;</li>
          <li>providing information about our fire and security services;</li>
          <li>arranging surveys, site visits, quotations and follow-up communications;</li>
          <li>operating, maintaining and improving our website;</li>
          <li>monitoring website performance, security and usage trends;</li>
          <li>complying with legal, regulatory and insurance obligations;</li>
          <li>establishing, exercising or defending legal claims where necessary.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Lawful Bases for Processing">
        <p>Under UK GDPR, we rely on one or more of the following lawful bases:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Consent</strong>, where you have given clear consent, for example when opting in to marketing
            communications or non-essential cookies.
          </li>
          <li>
            <strong>Contract</strong>, where processing is necessary to respond to your request or take steps before entering
            into a contract with you.
          </li>
          <li>
            <strong>Legitimate interests</strong>, where processing is necessary for our legitimate business interests, such
            as responding to enquiries, improving our services and securing our website, provided your rights do not override
            those interests.
          </li>
          <li>
            <strong>Legal obligation</strong>, where we need to comply with applicable law.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Cookies">
        <p>
          Our website uses cookies and similar technologies. You can manage your preferences through our cookie banner and
          settings panel. For more information, please see our{" "}
          <Link href="/cookie-policy" className="underline hover:opacity-80">
            Cookie Policy
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="Sharing Your Data">
        <p>We may share personal data with:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>service providers who support our website, hosting, analytics, email or IT systems;</li>
          <li>professional advisers such as insurers, auditors or legal advisers where reasonably required;</li>
          <li>regulators, courts or law enforcement where we are legally required to do so.</li>
        </ul>
        <p>
          We require third parties to handle personal data securely and only in accordance with our instructions and
          applicable law. We do not sell your personal data.
        </p>
      </LegalSection>

      <LegalSection title="Data Retention">
        <p>
          We retain personal data only for as long as necessary for the purposes for which it was collected, including to
          satisfy legal, accounting or reporting requirements.
        </p>
        <p>
          Enquiry and contact records are typically retained for a reasonable period to manage follow-up, quotations and
          business records. Retention periods may vary depending on the nature of the enquiry and our legal obligations.
        </p>
      </LegalSection>

      <LegalSection title="Data Security">
        <p>
          We implement appropriate technical and organisational measures designed to protect personal data against accidental
          loss, unauthorised access, alteration or disclosure. However, no method of transmission over the internet or method
          of electronic storage is completely secure.
        </p>
      </LegalSection>

      <LegalSection title="International Transfers">
        <p>
          Some of our service providers may process data outside the United Kingdom. Where this occurs, we take steps to
          ensure that appropriate safeguards are in place in accordance with applicable data protection law.
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
          <li>withdraw consent at any time where processing is based on consent;</li>
          <li>lodge a complaint with the Information Commissioner&apos;s Office (ICO).</li>
        </ul>
        <p>
          To exercise any of these rights, please contact us using the details below. We may need to verify your identity
          before responding.
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
