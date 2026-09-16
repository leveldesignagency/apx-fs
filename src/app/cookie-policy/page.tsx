"use client"

import Link from "next/link"
import { Shield, BarChart, Megaphone, Settings, type LucideIcon } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"
import { LegalContactBox, LegalPageShell, LegalSection } from "@/components/LegalPageShell"
import type { ReactNode } from "react"

function CookieTypeCard({
  title,
  Icon,
  children,
}: {
  title: string
  Icon: LucideIcon
  children: ReactNode
}) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div
      className={`rounded-tl-2xl rounded-br-2xl border p-5 md:p-6 ${
        isDark ? "border-white/20 bg-white/5" : "border-black/15 bg-black/[0.03]"
      }`}
    >
      <div className="flex items-start gap-4">
        <Icon
          className={`mt-0.5 h-6 w-6 shrink-0 ${isDark ? "text-white" : "text-black"}`}
          aria-hidden
        />
        <div className="min-w-0 flex-1 space-y-2">
          <h3 className={`text-xl font-semibold leading-snug ${isDark ? "text-white" : "text-black"}`}>
            {title}
          </h3>
          {children}
        </div>
      </div>
    </div>
  )
}

export default function CookiePolicyPage() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <LegalPageShell title="Cookie Policy">
      <LegalSection title="What Are Cookies?">
        <p>
          Cookies are small text files that are placed on your computer or mobile device when you visit a website.
          They are widely used to make websites work more efficiently and provide information to the website owners.
        </p>
        <p>
          We use cookies to enhance your browsing experience, analyse site traffic, and personalise content. By
          continuing to use our website, you consent to our use of cookies as described in this policy.
        </p>
      </LegalSection>

      <LegalSection title="Types of Cookies We Use">
        <div className="space-y-5">
          <CookieTypeCard title="Essential Cookies" Icon={Shield}>
            <p>
              These cookies are necessary for the website to function and cannot be switched off. They are usually only
              set in response to actions made by you such as setting your privacy preferences, logging in, or filling in
              forms.
            </p>
            <p className="text-sm">
              <strong>Purpose:</strong> Website functionality, security, and user preferences
            </p>
            <p className="text-sm">
              <strong>Duration:</strong> Session or persistent (up to 1 year)
            </p>
          </CookieTypeCard>

          <CookieTypeCard title="Analytics Cookies" Icon={BarChart}>
            <p>
              These cookies help us understand how visitors interact with our website by collecting and reporting
              information anonymously. This helps us improve our website&apos;s performance and user experience.
            </p>
            <p className="text-sm">
              <strong>Purpose:</strong> Website analytics, performance monitoring, and user behaviour analysis
            </p>
            <p className="text-sm">
              <strong>Duration:</strong> Up to 2 years
            </p>
            <p className="text-sm">
              <strong>Third-party services:</strong> Google Analytics (if enabled)
            </p>
          </CookieTypeCard>

          <CookieTypeCard title="Marketing Cookies" Icon={Megaphone}>
            <p>
              These cookies are used to deliver personalised advertisements and track your browsing habits across
              different websites. They help us show you relevant content and measure the effectiveness of our campaigns.
            </p>
            <p className="text-sm">
              <strong>Purpose:</strong> Advertising, marketing campaigns, and conversion tracking
            </p>
            <p className="text-sm">
              <strong>Duration:</strong> Up to 1 year
            </p>
            <p className="text-sm">
              <strong>Third-party services:</strong> Facebook Pixel, Google Ads (if enabled)
            </p>
          </CookieTypeCard>

          <CookieTypeCard title="Functional Cookies" Icon={Settings}>
            <p>
              These cookies enable enhanced functionality and personalisation, such as remembering your preferences,
              language settings, and login information. They may be set by us or by third-party providers.
            </p>
            <p className="text-sm">
              <strong>Purpose:</strong> User preferences, language settings, and enhanced functionality
            </p>
            <p className="text-sm">
              <strong>Duration:</strong> Up to 1 year
            </p>
          </CookieTypeCard>
        </div>
      </LegalSection>

      <LegalSection title="Managing Your Cookie Preferences">
        <p>
          You can manage your cookie preferences at any time from the first-visit cookie banner, or later via Cookie
          Preferences in the website footer or the button below. You can accept all cookies, reject non-essential
          cookies, or customise each category.
        </p>
        <p>
          You can also manage cookies through your browser settings. Most browsers allow you to refuse or accept cookies,
          and to delete cookies that have already been stored. Blocking or deleting cookies may impact your ability to use
          certain features of our website.
        </p>
        <div
          className={`rounded-tl-2xl rounded-br-2xl border p-4 md:p-5 ${
            isDark ? "border-white/20 bg-white/5" : "border-black/15 bg-black/[0.03]"
          }`}
        >
          <p className="text-sm font-semibold">Browser cookie settings</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
            <li>
              <a
                href="https://support.google.com/chrome/answer/95647"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Google Chrome
              </a>
            </li>
            <li>
              <a
                href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Mozilla Firefox
              </a>
            </li>
            <li>
              <a
                href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Safari
              </a>
            </li>
            <li>
              <a
                href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Microsoft Edge
              </a>
            </li>
          </ul>
        </div>
      </LegalSection>

      <LegalSection title="Third-Party Cookies">
        <p>
          Some cookies on our website are set by third-party services that appear on our pages. These third parties may
          use cookies to collect information about your online activities across different websites for advertising
          purposes.
        </p>
        <p>
          We do not control these third-party cookies. Please refer to the privacy policies of these third-party services
          for more information about their cookie practices.
        </p>
      </LegalSection>

      <LegalSection title="Updates to This Policy">
        <p>
          We may update this Cookie Policy from time to time to reflect changes in our practices or for other
          operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Cookie
          Policy on this page and updating the &ldquo;Last updated&rdquo; date.
        </p>
      </LegalSection>

      <LegalSection title="Manage Your Preferences">
        <p>
          You can change your cookie choices at any time. This opens the same preferences panel as the first-visit cookie
          banner.
        </p>
        <button
          type="button"
          id="cookie-preferences"
          onClick={() => {
            window.dispatchEvent(new Event("apx:open-cookie-settings"))
          }}
          className={`cookie-policy-prefs-btn inline-flex items-center gap-2 rounded-tl-2xl rounded-br-2xl border-2 px-5 py-3 text-sm font-bold transition-colors ${
            isDark
              ? "border-white bg-black text-white hover:bg-white hover:text-black"
              : "border-black bg-white text-black hover:bg-black hover:text-white"
          }`}
        >
          <Settings className="h-4 w-4" aria-hidden />
          Cookie Preferences
        </button>
      </LegalSection>

      <LegalSection title="Contact Us">
        <p>If you have any questions about our use of cookies or this Cookie Policy, please contact us:</p>
        <LegalContactBox />
        <p>
          See also our{" "}
          <Link href="/privacy" className="underline hover:opacity-80">
            Privacy Policy
          </Link>
          .
        </p>
      </LegalSection>
    </LegalPageShell>
  )
}
