"use client"

import { useTheme } from "@/contexts/ThemeContext";
import { Video, Shield, Monitor, CheckCircle, ArrowRight, Smartphone } from "lucide-react";
export default function CctvSecurityPage() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: theme === 'dark' ? '#000000' : '#ffffff' }}>
      <div className="w-full h-[0.75px] bg-black dark:bg-white"></div>

      <section className={`py-20 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`} style={{ backgroundColor: theme === 'dark' ? '#000000' : '#ffffff' }}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className={`text-5xl lg:text-7xl font-bold mb-6 font-title ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                CCTV &
                <br />
                <span className="text-4xl lg:text-6xl opacity-70">Security</span>
              </h1>
              <p className={`text-xl mb-8 leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                IP and analogue CCTV, intruder alarms, and remote monitoring to secure your premises. We design, install,
                and maintain surveillance and security systems for commercial, industrial, and residential clients across the UK.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className={`px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${theme === 'dark' ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}>
                  Get Quote
                </button>
                <button className={`px-8 py-4 rounded-lg font-semibold border transition-all duration-300 ${theme === 'dark' ? 'border-white text-white hover:bg-white hover:text-black' : 'border-black text-black hover:bg-black hover:text-white'}`}>
                  View Portfolio
                </button>
              </div>
            </div>
            <div className="relative">
              <div className={`w-full h-96 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'} flex items-center justify-center`}>
                <div className="text-center">
                  <Video className="w-24 h-24 mx-auto mb-4 opacity-50" />
                  <p className="text-lg opacity-70">CCTV & Security Image Placeholder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full h-[0.75px] bg-black dark:bg-white"></div>

      <section className={`py-20 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`} style={{ backgroundColor: theme === 'dark' ? '#000000' : '#ffffff' }}>
        <div className="container mx-auto px-6">
          <h2 className={`text-4xl font-bold mb-12 text-center font-title ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            Our CCTV & Security Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Video className="w-8 h-8" />, title: "CCTV Systems", description: "HD and 4K IP cameras, NVR/DVR solutions, and remote viewing for round-the-clock surveillance." },
              { icon: <Shield className="w-8 h-8" />, title: "Intruder Alarms", description: "Wired and wireless intruder alarm systems with NSI-approved monitoring and police response." },
              { icon: <Monitor className="w-8 h-8" />, title: "Remote Monitoring", description: "24/7 alarm receiving and video monitoring with rapid response and keyholder escalation." },
              { icon: <Smartphone className="w-8 h-8" />, title: "Mobile Access", description: "View live and recorded footage from smartphones and tablets, with push notifications." },
              { icon: <CheckCircle className="w-8 h-8" />, title: "Maintenance & Support", description: "Scheduled servicing, health checks, and fault response to keep systems reliable." },
              { icon: <ArrowRight className="w-8 h-8" />, title: "Integration", description: "CCTV and alarms integrated with access control and fire systems for a single security platform." }
            ].map((service, index) => (
              <div key={index} className={`p-8 rounded-xl transition-all duration-300 hover:scale-105 ${theme === 'dark' ? 'bg-black border border-gray-700 hover:border-white' : 'bg-white border border-gray-200 hover:border-black'}`}>
                <div className={`mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{service.icon}</div>
                <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{service.title}</h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full h-[0.75px] bg-black dark:bg-white"></div>

      <section className={`py-20 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`} style={{ backgroundColor: theme === 'dark' ? '#000000' : '#ffffff' }}>
        <div className="container mx-auto px-6">
          <h2 className={`text-4xl font-bold mb-12 text-center font-title ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            Standards & Compliance
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className={`text-2xl font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Certifications</h3>
              <ul className="space-y-4">
                {["NSI approved installers", "SSAIB certification", "BS EN 50131 compliant systems", "GDPR-compliant data handling"].map((item, index) => (
                  <li key={index} className={`flex items-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={`text-2xl font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>What We Offer</h3>
              <ul className="space-y-4">
                {["Site survey and system design", "Installation and commissioning", "User training and handover", "Ongoing maintenance and monitoring"].map((item, index) => (
                  <li key={index} className={`flex items-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full h-[0.75px] bg-black dark:bg-white"></div>

      <section className={`py-20 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`} style={{ backgroundColor: theme === 'dark' ? '#000000' : '#ffffff' }}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`text-4xl font-bold mb-6 font-title ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              Need CCTV Or Intruder Alarm Systems?
            </h2>
            <p className={`text-xl mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Our security specialists can survey your site and recommend the right CCTV and alarm solution for your premises and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className={`px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${theme === 'dark' ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}>
                Get Free Consultation
              </button>
              <button className={`px-8 py-4 rounded-lg font-semibold border transition-all duration-300 ${theme === 'dark' ? 'border-white text-white hover:bg-white hover:text-black' : 'border-black text-black hover:bg-black hover:text-white'}`}>
                Call 020 4568 5986
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
