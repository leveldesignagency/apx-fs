"use client"

import Link from "next/link"
import { LegalContactBox, LegalPageShell, LegalSection } from "@/components/LegalPageShell"

export default function AccessibilityStatementPage() {
  return (
    <LegalPageShell title="Accessibility Statement">
      <LegalSection title="Our commitment">
        <p>
          APX Fire &amp; Security Limited is committed to making this website accessible to as many people as possible,
          including people with disabilities. We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA
          where practicable.
        </p>
      </LegalSection>

      <LegalSection title="How you should be able to use this website">
        <p>We want you to be able to:</p>
        <ul className="list-inside list-disc space-y-2">
          <li>change colours, contrast levels and fonts using your browser or device settings;</li>
          <li>zoom in up to 200% without the text spilling off the screen;</li>
          <li>navigate most of the website using a keyboard;</li>
          <li>listen to most of the website using a screen reader (for example VoiceOver or NVDA).</li>
        </ul>
      </LegalSection>

      <LegalSection title="How accessible this website is">
        <p>
          We believe this website is partially compliant with WCAG 2.2 Level AA. Some parts may not yet be fully
          accessible   " for example complex interactive components, third-party embeds if added later, or PDF documents
          that are not fully tagged.
        </p>
        <p>
          We continue to improve accessibility as we update the site. This statement will be reviewed when material
          design or content changes are made.
        </p>
      </LegalSection>

      <LegalSection title="Feedback and contact information">
        <p>
          If you find any accessibility problems that are not listed on this page, or if you need information in a
          different format, please contact us:
        </p>
        <LegalContactBox />
        <p>
          We will consider your request and get back to you. Where we cannot provide an accessible alternative
          immediately, we will explain why and what we can offer instead.
        </p>
      </LegalSection>

      <LegalSection title="Enforcement procedure">
        <p>
          The Equality and Human Rights Commission (EHRC) is responsible for enforcing the Public Sector Bodies (Websites
          and Mobile Applications) (No. 2) Accessibility Regulations 2018 in the UK. If you are not happy with how we
          respond to your complaint, contact the{" "}
          <a
            href="https://www.equalityadvisoryservice.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-80"
          >
            Equality Advisory and Support Service (EASS)
          </a>
          .
        </p>
        <p className="text-sm opacity-80">
          Note: APX Fire &amp; Security Limited is a private company. The public-sector accessibility regulations may not
          apply in full, but we still aim to provide an accessible website and to respond constructively to accessibility
          feedback.
        </p>
      </LegalSection>

      <LegalSection title="Technical information">
        <p>
          This website is built with modern HTML, CSS and JavaScript (Next.js). We test key journeys in current major
          browsers and aim to use semantic markup, visible focus styles and sufficient colour contrast.
        </p>
      </LegalSection>

      <LegalSection title="Related policies">
        <p>
          See also our{" "}
          <Link href="/privacy" className="underline hover:opacity-80">
            Privacy Policy
          </Link>
          ,{" "}
          <Link href="/cookie-policy" className="underline hover:opacity-80">
            Cookie Policy
          </Link>{" "}
          and{" "}
          <Link href="/terms" className="underline hover:opacity-80">
            Terms of Service
          </Link>
          .
        </p>
      </LegalSection>
    </LegalPageShell>
  )
}
