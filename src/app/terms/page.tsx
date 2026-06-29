"use client"

import Link from "next/link"
import { LegalContactBox, LegalPageShell, LegalSection } from "@/components/LegalPageShell"

export default function TermsOfServicePage() {
  return (
    <LegalPageShell title="Terms of Service">
      <LegalSection title="Introduction">
        <p>
          These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the APX Fire &amp; Security website
          (the &ldquo;Website&rdquo;). By accessing or using the Website, you agree to be bound by these Terms. If you do not
          agree, please do not use the Website.
        </p>
        <p>
          These Terms relate to your use of the Website only. Any contract for fire or security services will be subject to
          separate written terms agreed with APX Fire &amp; Security.
        </p>
      </LegalSection>

      <LegalSection title="About APX Fire &amp; Security">
        <p>
          APX Fire &amp; Security has been providing bespoke integrated security systems to London and the Home Counties since
          1986. We design, install, commission and maintain fire and security systems for domestic and commercial clients.
        </p>
        <LegalContactBox />
      </LegalSection>

      <LegalSection title="Use of the Website">
        <p>You agree to use the Website only for lawful purposes and in a way that does not:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>breach any applicable local, national or international law or regulation;</li>
          <li>attempt to gain unauthorised access to our systems, servers or data;</li>
          <li>introduce viruses, malware or other harmful material;</li>
          <li>interfere with or disrupt the Website or its security features;</li>
          <li>copy, scrape or harvest content except as permitted by law or with our prior written consent.</li>
        </ul>
        <p>We may suspend or restrict access to the Website if we reasonably believe these Terms have been breached.</p>
      </LegalSection>

      <LegalSection title="Information on the Website">
        <p>
          We aim to ensure that information on the Website is accurate and up to date. However, content is provided for
          general information purposes only and may be changed without notice.
        </p>
        <p>
          Nothing on the Website constitutes professional advice, a binding quotation or an offer to provide services. Service
          descriptions, images and specifications are illustrative and may vary depending on site requirements, standards and
          project scope.
        </p>
      </LegalSection>

      <LegalSection title="Enquiries and Contact Forms">
        <p>
          When you submit an enquiry, quote request or contact form, you confirm that the information you provide is accurate
          to the best of your knowledge.
        </p>
        <p>
          Submitting a form does not create a contract for works. Any survey, quotation or proposal we provide will be subject
          to separate terms, scope and acceptance.
        </p>
        <p>
          Our use of personal data submitted through the Website is described in our{" "}
          <Link href="/privacy" className="underline hover:opacity-80">
            Privacy Policy
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="Intellectual Property">
        <p>
          All content on the Website, including text, graphics, logos, images, layouts, downloads and software, is owned by or
          licensed to APX Fire &amp; Security and is protected by copyright, trade mark and other intellectual property laws.
        </p>
        <p>
          You may view and print pages from the Website for your personal, non-commercial use only. You must not reproduce,
          distribute, modify, publicly display or create derivative works from Website content without our prior written
          consent.
        </p>
      </LegalSection>

      <LegalSection title="Third-Party Links">
        <p>
          The Website may include links to third-party websites or services for your convenience. We do not control and are not
          responsible for the content, availability or practices of those third parties. Accessing linked sites is at your own
          risk.
        </p>
      </LegalSection>

      <LegalSection title="Disclaimer">
        <p>
          To the fullest extent permitted by law, the Website and its content are provided on an &ldquo;as is&rdquo; and
          &ldquo;as available&rdquo; basis without warranties of any kind, whether express or implied, including implied
          warranties of satisfactory quality, fitness for a particular purpose or non-infringement.
        </p>
        <p>
          We do not warrant that the Website will be uninterrupted, error-free or free from viruses or other harmful components.
        </p>
      </LegalSection>

      <LegalSection title="Limitation of Liability">
        <p>
          Nothing in these Terms excludes or limits our liability for death or personal injury caused by negligence, fraud or
          fraudulent misrepresentation, or any other liability that cannot be excluded or limited under applicable law.
        </p>
        <p>
          Subject to the above, APX Fire &amp; Security shall not be liable for any loss or damage arising out of or in connection
          with your use of the Website, including indirect or consequential loss, loss of profit, loss of business, loss of
          data or loss of opportunity, whether in contract, tort (including negligence), breach of statutory duty or otherwise.
        </p>
      </LegalSection>

      <LegalSection title="Indemnity">
        <p>
          You agree to indemnify and hold harmless APX Fire &amp; Security against any claims, losses, liabilities, costs and
          expenses arising from your breach of these Terms or misuse of the Website, except to the extent caused by our
          negligence or wilful misconduct.
        </p>
      </LegalSection>

      <LegalSection title="Governing Law">
        <p>
          These Terms are governed by the laws of England and Wales. The courts of England and Wales shall have exclusive
          jurisdiction to settle any dispute arising out of or in connection with these Terms or your use of the Website,
          subject to any mandatory rights you may have as a consumer.
        </p>
      </LegalSection>

      <LegalSection title="Changes to These Terms">
        <p>
          We may revise these Terms at any time by updating this page. Your continued use of the Website after changes are
          posted constitutes acceptance of the revised Terms. Please check this page regularly.
        </p>
      </LegalSection>

      <LegalSection title="Contact Us">
        <p>If you have any questions about these Terms, please contact us:</p>
        <LegalContactBox />
      </LegalSection>
    </LegalPageShell>
  )
}
