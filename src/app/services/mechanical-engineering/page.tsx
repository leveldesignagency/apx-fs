"use client"

import { useTheme } from "@/contexts/ThemeContext";
import { Flame, Shield, Bell, CheckCircle, ArrowRight, FileCheck } from "lucide-react";
export default function FireSafetySystemsPage() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: theme === 'dark' ? '#000000' : '#ffffff' }}>
      <div className="w-full h-[0.75px] bg-black dark:bg-white"></div>

      <section className={`py-20 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`} style={{ backgroundColor: theme === 'dark' ? '#000000' : '#ffffff' }}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className={`text-5xl lg:text-7xl font-bold mb-6 font-title ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                Fire Safety
                <br />
                <span className="text-4xl lg:text-6xl opacity-70">Systems</span>
              </h1>
              <p className={`text-xl mb-8 leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                From fire detection and alarm systems to suppression and emergency planning, we design, install, and maintain
                fire safety solutions that protect people and property. Fully compliant with UK regulations and BAFE standards.
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
                  <Flame className="w-24 h-24 mx-auto mb-4 opacity-50" />
                  <p className="text-lg opacity-70">Fire Safety Systems Image Placeholder</p>
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
            Our Fire Safety Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Bell className="w-8 h-8" />, title: "Fire Detection & Alarms", description: "Conventional and addressable fire alarm systems, smoke and heat detection, and 24/7 monitoring integration." },
              { icon: <Shield className="w-8 h-8" />, title: "Fire Risk Assessments", description: "BS 5839 and regulatory fire risk assessments to identify hazards and ensure compliance." },
              { icon: <Flame className="w-8 h-8" />, title: "Suppression Systems", description: "Sprinklers, gas suppression, and specialist systems for high-risk and critical environments." },
              { icon: <FileCheck className="w-8 h-8" />, title: "Compliance & Certification", description: "Annual testing, certification, and documentation to meet fire safety legislation." },
              { icon: <CheckCircle className="w-8 h-8" />, title: "Emergency Planning", description: "Evacuation strategy, signage, and staff training to support fire safety management." },
              { icon: <ArrowRight className="w-8 h-8" />, title: "System Upgrades", description: "Modernisation of legacy systems and integration with building management and security." }
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
            Our Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Risk Assessment", description: "Site visit and fire risk assessment to define scope and compliance requirements." },
              { step: "02", title: "Design & Specification", description: "System design to BS 5839 and relevant standards, with clear documentation." },
              { step: "03", title: "Installation & Commissioning", description: "Professional installation, testing, and handover with certification." },
              { step: "04", title: "Maintenance & Support", description: "Scheduled servicing and 24/7 support to keep systems compliant and reliable." }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-bold ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'}`}>{step.step}</div>
                <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{step.title}</h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full h-[0.75px] bg-black dark:bg-white"></div>

      <section className={`py-20 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`} style={{ backgroundColor: theme === 'dark' ? '#000000' : '#ffffff' }}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`text-4xl font-bold mb-6 font-title ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              Ready To Protect Your Premises?
            </h2>
            <p className={`text-xl mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Contact our fire safety team for a site survey, risk assessment, or detailed quote for your fire detection and alarm systems.
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
