"use client"

import { useTheme } from "@/contexts/ThemeContext"
import Link from "next/link"
import { ArrowLeft, Shield, BarChart, Megaphone, Settings } from "lucide-react"

export default function CookiePolicyPage() {
  const { theme } = useTheme()

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: theme === 'dark' ? '#000000' : '#ffffff' }}>
      {/* Section Separator - Top */}
      <div className="w-full h-[0.75px] bg-black dark:bg-white"></div>
      
      <section className={`page-title-band ${
        theme === 'dark' ? 'bg-black' : 'bg-white'
      }`} style={{ backgroundColor: theme === 'dark' ? '#000000' : '#ffffff' }}>
        <div className="container mx-auto px-6 max-w-4xl">
          <Link 
            href="/"
            className={`inline-flex items-center gap-2 mb-8 text-sm hover:underline ${
              theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}>
            Cookie Policy
          </h1>

          <p className={`text-lg mb-8 leading-relaxed ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Last updated: {new Date().toLocaleDateString('en-GB', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>

          <div className={`prose prose-lg max-w-none ${
            theme === 'dark' ? 'prose-invert' : ''
          }`}>
            <div className={`space-y-8 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <section>
                <h2 className={`text-2xl font-bold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>
                  What Are Cookies?
                </h2>
                <p className="mb-4">
                  Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
                  They are widely used to make websites work more efficiently and provide information to the website owners.
                </p>
                <p>
                  We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                  By continuing to use our website, you consent to our use of cookies as described in this policy.
                </p>
              </section>

              <section>
                <h2 className={`text-2xl font-bold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>
                  Types of Cookies We Use
                </h2>

                <div className="space-y-6">
                  {/* Essential Cookies */}
                  <div className={`p-6 rounded-lg border ${
                    theme === 'dark' ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-gray-50'
                  }`}>
                    <div className="flex items-start gap-4 mb-3">
                      <Shield className={`w-6 h-6 flex-shrink-0 mt-1 ${
                        theme === 'dark' ? 'text-white' : 'text-black'
                      }`} />
                      <div className="flex-1">
                        <h3 className={`text-xl font-semibold mb-2 ${
                          theme === 'dark' ? 'text-white' : 'text-black'
                        }`}>
                          Essential Cookies
                        </h3>
                        <p className="mb-2">
                          These cookies are necessary for the website to function and cannot be switched off. 
                          They are usually only set in response to actions made by you such as setting your privacy preferences, 
                          logging in, or filling in forms.
                        </p>
                        <p className="text-sm">
                          <strong>Purpose:</strong> Website functionality, security, and user preferences
                        </p>
                        <p className="text-sm">
                          <strong>Duration:</strong> Session or persistent (up to 1 year)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className={`p-6 rounded-lg border ${
                    theme === 'dark' ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-gray-50'
                  }`}>
                    <div className="flex items-start gap-4 mb-3">
                      <BarChart className={`w-6 h-6 flex-shrink-0 mt-1 ${
                        theme === 'dark' ? 'text-white' : 'text-black'
                      }`} />
                      <div className="flex-1">
                        <h3 className={`text-xl font-semibold mb-2 ${
                          theme === 'dark' ? 'text-white' : 'text-black'
                        }`}>
                          Analytics Cookies
                        </h3>
                        <p className="mb-2">
                          These cookies help us understand how visitors interact with our website by collecting and reporting 
                          information anonymously. This helps us improve our website&apos;s performance and user experience.
                        </p>
                        <p className="text-sm">
                          <strong>Purpose:</strong> Website analytics, performance monitoring, and user behavior analysis
                        </p>
                        <p className="text-sm">
                          <strong>Duration:</strong> Up to 2 years
                        </p>
                        <p className="text-sm">
                          <strong>Third-party services:</strong> Google Analytics (if enabled)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Marketing Cookies */}
                  <div className={`p-6 rounded-lg border ${
                    theme === 'dark' ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-gray-50'
                  }`}>
                    <div className="flex items-start gap-4 mb-3">
                      <Megaphone className={`w-6 h-6 flex-shrink-0 mt-1 ${
                        theme === 'dark' ? 'text-white' : 'text-black'
                      }`} />
                      <div className="flex-1">
                        <h3 className={`text-xl font-semibold mb-2 ${
                          theme === 'dark' ? 'text-white' : 'text-black'
                        }`}>
                          Marketing Cookies
                        </h3>
                        <p className="mb-2">
                          These cookies are used to deliver personalized advertisements and track your browsing habits across 
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
                      </div>
                    </div>
                  </div>

                  {/* Functional Cookies */}
                  <div className={`p-6 rounded-lg border ${
                    theme === 'dark' ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-gray-50'
                  }`}>
                    <div className="flex items-start gap-4 mb-3">
                      <Settings className={`w-6 h-6 flex-shrink-0 mt-1 ${
                        theme === 'dark' ? 'text-white' : 'text-black'
                      }`} />
                      <div className="flex-1">
                        <h3 className={`text-xl font-semibold mb-2 ${
                          theme === 'dark' ? 'text-white' : 'text-black'
                        }`}>
                          Functional Cookies
                        </h3>
                        <p className="mb-2">
                          These cookies enable enhanced functionality and personalization, such as remembering your preferences, 
                          language settings, and login information. They may be set by us or by third-party providers.
                        </p>
                        <p className="text-sm">
                          <strong>Purpose:</strong> User preferences, language settings, and enhanced functionality
                        </p>
                        <p className="text-sm">
                          <strong>Duration:</strong> Up to 1 year
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className={`text-2xl font-bold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>
                  Managing Your Cookie Preferences
                </h2>
                <p className="mb-4">
                  You can manage your cookie preferences at any time by clicking the cookie settings button in the bottom-right 
                  corner of the website. You can choose to accept all cookies, reject non-essential cookies, or customize your 
                  preferences for each category.
                </p>
                <p className="mb-4">
                  You can also manage cookies through your browser settings. Most browsers allow you to refuse or accept cookies, 
                  and to delete cookies that have already been stored. However, please note that blocking or deleting cookies may 
                  impact your ability to use certain features of our website.
                </p>
                <div className={`p-4 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-900 border border-gray-700' : 'bg-gray-50 border border-gray-300'
                }`}>
                  <p className="text-sm">
                    <strong>Browser Cookie Settings:</strong>
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                    <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="underline">Google Chrome</a></li>
                    <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer" className="underline">Mozilla Firefox</a></li>
                    <li><a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="underline">Safari</a></li>
                    <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="underline">Microsoft Edge</a></li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className={`text-2xl font-bold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>
                  Third-Party Cookies
                </h2>
                <p className="mb-4">
                  Some cookies on our website are set by third-party services that appear on our pages. These third parties may use 
                  cookies to collect information about your online activities across different websites for advertising purposes.
                </p>
                <p>
                  We do not control these third-party cookies. Please refer to the privacy policies of these third-party services 
                  for more information about their cookie practices.
                </p>
              </section>

              <section>
                <h2 className={`text-2xl font-bold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>
                  Updates to This Policy
                </h2>
                <p>
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, 
                  legal, or regulatory reasons. We will notify you of any material changes by posting the new Cookie Policy on this page 
                  and updating the &ldquo;Last updated&rdquo; date.
                </p>
              </section>

              <section>
                <h2 className={`text-2xl font-bold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>
                  Contact Us
                </h2>
                <p className="mb-4">
                  If you have any questions about our use of cookies or this Cookie Policy, please contact us:
                </p>
                <div className={`p-4 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-900 border border-gray-700' : 'bg-gray-50 border border-gray-300'
                }`}>
                  <p className="mb-2">
                    <strong>Email:</strong> enquiries@apx-fs.co.uk
                  </p>
                  <p>
                    <strong>Phone:</strong> 020 8303 2280
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full h-[0.75px] bg-black dark:bg-white"></div>
    </div>
  )
}




