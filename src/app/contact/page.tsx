"use client"

import { useTheme } from "@/contexts/ThemeContext";
import { CustomPillButton } from "@/components/ui/CustomPillButton";
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const textClass = isDark ? "text-white" : "text-black";
  const mutedClass = isDark ? "text-gray-300" : "text-gray-600";
  const bgStyle = { backgroundColor: isDark ? "#000000" : "#ffffff" };
  const inputClass = isDark
    ? "bg-black border border-gray-700 text-white placeholder-gray-500 focus:border-white focus:ring-white/20"
    : "bg-white border border-gray-300 text-black placeholder-gray-400 focus:border-black focus:ring-black/20";

  return (
    <div className="min-h-screen overflow-x-hidden" style={bgStyle}>
      <div className="w-full h-[0.75px] bg-black dark:bg-white" />

      <section className="py-16 lg:py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h1 className={`text-4xl md:text-5xl font-bold font-title mb-6 ${textClass}`}>
                Contact APX Fire & Security
              </h1>
              <p className={`text-lg mb-10 ${mutedClass}`}>
                Get in touch for a free survey, quote, or to discuss your fire and security requirements. We cover London and the Home Counties.
              </p>

              <div className="space-y-6">
                <a href="tel:02045685986" className={`flex items-center gap-4 ${mutedClass} hover:opacity-90 transition-opacity`}>
                  <Phone className="w-6 h-6 flex-shrink-0" />
                  <span className="text-lg">020 4568 5986</span>
                </a>
                <a href="mailto:info@apx-fs.co.uk" className={`flex items-center gap-4 ${mutedClass} hover:opacity-90 transition-opacity`}>
                  <Mail className="w-6 h-6 flex-shrink-0" />
                  <span className="text-lg">info@apx-fs.co.uk</span>
                </a>
                <a
                  href="https://maps.google.com/?q=365-369+Bexley+Road+Northumberland+Heath+Erith+Kent+DA8+3EZ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-start gap-4 ${mutedClass} hover:opacity-90 transition-opacity`}
                >
                  <MapPin className="w-6 h-6 mt-1 flex-shrink-0" />
                  <div>
                    <p>365-369 Bexley Road</p>
                    <p>Northumberland Heath, Erith</p>
                    <p>Kent, DA8 3EZ</p>
                  </div>
                </a>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <CustomPillButton href="tel:02045685986" size="md" variant="outline">Call us</CustomPillButton>
                <CustomPillButton href="mailto:info@apx-fs.co.uk" size="md">Email us</CustomPillButton>
              </div>
            </div>

            <div className={`rounded-xl border p-8 ${isDark ? "border-gray-700" : "border-gray-200"}`}>
              <h2 className={`text-2xl font-bold font-title mb-6 ${textClass}`}>Send a message</h2>
              <form
                className="space-y-5"
                onSubmit={(e) => e.preventDefault()}
              >
                <div>
                  <label htmlFor="name" className={`block text-sm font-medium mb-2 ${textClass}`}>Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${inputClass}`}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className={`block text-sm font-medium mb-2 ${textClass}`}>Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${inputClass}`}
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className={`block text-sm font-medium mb-2 ${textClass}`}>Phone</label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${inputClass}`}
                    placeholder="020 0000 0000"
                  />
                </div>
                <div>
                  <label htmlFor="message" className={`block text-sm font-medium mb-2 ${textClass}`}>Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 resize-y ${inputClass}`}
                    placeholder="How can we help?"
                  />
                </div>
                <button
                  type="submit"
                  className={`w-full px-6 py-3.5 text-base font-bold rounded-tl-2xl rounded-br-2xl border-2 transition-colors inline-flex items-center justify-center ${isDark ? "bg-black text-white border-white hover:bg-white hover:text-black" : "bg-black text-white border-black hover:bg-white hover:text-black border"}`}
                >
                  Send message
                </button>
              </form>
              <p className={`text-sm mt-4 ${mutedClass}`}>
                We aim to respond within one working day.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
