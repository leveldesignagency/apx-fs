"use client"

import Link from "next/link"
import { LegalContactBox, LegalPageShell, LegalSection } from "@/components/LegalPageShell"

export default function ModernSlaveryStatementPage() {
  return (
    <LegalPageShell title="Modern Slavery Statement" lastUpdated="8 November 2026">
      <LegalSection title="Introduction">
        <p>
          APX Fire &amp; Security Limited (&ldquo;APX&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;)
          is committed to acting ethically and with integrity in all of our business dealings. We oppose slavery,
          servitude, forced or compulsory labour and human trafficking in any form.
        </p>
        <p>
          This statement sets out the steps we take to help prevent modern slavery in our business and supply chains.
          It is published voluntarily to be transparent with clients, suppliers and the public. Where the Modern Slavery
          Act 2015 requires a statement under section 54, this page is intended to meet that transparency expectation
          for the business activities described here.
        </p>
      </LegalSection>

      <LegalSection title="Our organisation">
        <p>
          <strong>APX Fire &amp; Security Limited</strong> (company number 04915204) designs, installs, commissions and
          maintains fire and security systems for domestic and commercial clients, primarily across London and the Home
          Counties. Building on a heritage dating back to 1986, our work includes fire detection and alarms, CCTV,
          access control, intruder alarms, video door entry and related life-safety and security services.
        </p>
        <LegalContactBox />
      </LegalSection>

      <LegalSection title="Our supply chains">
        <p>
          Our supply chains typically include UK-based manufacturers and distributors of fire and security equipment,
          installation materials, tools, vehicles, professional services, and facilities or office support. Most of our
          labour for site work is performed by our own employed engineers or carefully selected UK subcontractors.
        </p>
        <p>
          We consider our overall risk of modern slavery to be low relative to complex global manufacturing chains, but
          we do not treat that as a reason for complacency - particularly where products or components may originate
          outside the UK.
        </p>
      </LegalSection>

      <LegalSection title="Policies and due diligence">
        <p>We take the following approach:</p>
        <ul className="list-inside list-disc space-y-2">
          <li>
            We comply with applicable UK employment law and expect everyone working for us to do the same.
          </li>
          <li>
            Recruitment is managed through legitimate channels. Right-to-work checks are completed as required by law.
            Further detail on how we handle applicant data is in our{" "}
            <Link href="/recruitment-privacy" className="underline hover:opacity-80">
              Recruitment Privacy Notice
            </Link>
            .
          </li>
          <li>
            We expect suppliers and subcontractors to comply with applicable law, including prohibitions on forced
            labour, child labour and human trafficking, and to provide safe working conditions.
          </li>
          <li>
            Where we identify elevated risk (for example new overseas-sourced products or unfamiliar labour providers),
            we ask additional questions and may choose not to engage until we are satisfied with the response.
          </li>
          <li>
            Concerns can be raised with management. We take reports seriously and will investigate and act where
            appropriate.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Training and awareness">
        <p>
          Relevant staff involved in procurement, subcontracting and recruitment are made aware of modern slavery risks
          and of the standards we expect from suppliers and labour providers. We review this approach as our business
          and supply chains change.
        </p>
      </LegalSection>

      <LegalSection title="Effectiveness and review">
        <p>
          We review this statement at least annually, or sooner if there is a material change to our operations or supply
          chain. Indicators we may use include supplier responses to due diligence requests, recruitment compliance, and
          any reported concerns.
        </p>
        <p>
          If you have a concern about modern slavery in connection with our business or supply chain, please contact us
          using the details in this statement or via our{" "}
          <Link href="/contact" className="underline hover:opacity-80">
            contact page
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="Approval">
        <p>
          This statement has been approved for publication on behalf of APX Fire &amp; Security Limited and applies to
          the financial year in which it is last updated, as shown at the top of this page.
        </p>
      </LegalSection>
    </LegalPageShell>
  )
}
