"use client"

import { useTheme } from "@/contexts/ThemeContext";
import { Lightbulb, FileCheck, Zap, CheckCircle, ArrowRight, Shield } from "lucide-react";
export default function EmergencyLightingPage() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: theme === 'dark' ? '#000000' : '#ffffff' }}>
      <div className="w-full h-[0.75px] bg-black dark:bg-white"></div>

      <section className={`py-20 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`} style={{ backgroundColor: theme === 'dark' ? '#000000' : '#ffffff' }}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className={`text-5xl lg:text-7xl font-bold mb-6 font-title ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                Emergency
                <br />
                <span className="text-4xl lg:text-6xl opacity-70">Lighting</span>
              </h1>
              <p className={`text-xl mb-8 leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Emergency lighting and escape route illumination that meets BS 5266 and fire safety regulations. We design,
                install, test, and maintain systems so occupants can evacuate safely when the mains supply fails.
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
                  <Lightbulb className="w-24 h-24 mx-auto mb-4 opacity-50" />
                  <p className="text-lg opacity-70">Emergency Lighting Image Placeholder</p>
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
            Emergency Lighting Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Lightbulb className="w-8 h-8" />, title: "Design & Specification", description: "Escape route and open area emergency lighting design to BS 5266 and building regulations." },
              { icon: <Zap className="w-8 h-8" />, title: "Installation", description: "Maintained and non-maintained luminaires, central battery and self-contained systems." },
              { icon: <FileCheck className="w-8 h-8" />, title: "Testing & Logbooks", description: "Monthly and annual testing, duration tests, and compliant logbook documentation." },
              { icon: <Shield className="w-8 h-8" />, title: "Compliance", description: "Systems that meet Regulatory Reform (Fire Safety) Order and enforcing authority requirements." },
              { icon: <CheckCircle className="w-8 h-8" />, title: "Maintenance", description: "Scheduled servicing, battery replacement, and fault repair to keep systems reliable." },
              { icon: <ArrowRight className="w-8 h-8" />, title: "Upgrades", description: "Replacement of legacy systems with LED and modern central battery solutions." }
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
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`text-4xl font-bold mb-6 font-title ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              Need Emergency Lighting Design Or Maintenance?
            </h2>
            <p className={`text-xl mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              From new builds to existing premises, we ensure your emergency lighting is designed, installed, and maintained to the correct standards.
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
