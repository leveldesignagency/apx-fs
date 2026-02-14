"use client"

import { useTheme } from "@/contexts/ThemeContext";
import { Key, DoorOpen, Fingerprint, CheckCircle, ArrowRight, Lock } from "lucide-react";
export default function AccessControlPage() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: theme === 'dark' ? '#000000' : '#ffffff' }}>
      <div className="w-full h-[0.75px] bg-black dark:bg-white"></div>

      <section className={`py-20 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`} style={{ backgroundColor: theme === 'dark' ? '#000000' : '#ffffff' }}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className={`text-5xl lg:text-7xl font-bold mb-6 font-title ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                Access
                <br />
                <span className="text-4xl lg:text-6xl opacity-70">Control</span>
              </h1>
              <p className={`text-xl mb-8 leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Control who enters your building with card, fob, biometric, and mobile access systems. We design and install
                access control that integrates with your security, fire, and building management systems for a unified solution.
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
                  <Key className="w-24 h-24 mx-auto mb-4 opacity-50" />
                  <p className="text-lg opacity-70">Access Control Image Placeholder</p>
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
            Access Control Solutions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Key className="w-8 h-8" />, title: "Card & Fob Systems", description: "Proximity and smart card readers, fobs, and credentials for doors, barriers, and turnstiles." },
              { icon: <Fingerprint className="w-8 h-8" />, title: "Biometric Access", description: "Fingerprint and facial recognition for high-security areas and audit trails." },
              { icon: <DoorOpen className="w-8 h-8" />, title: "Door Entry & Intercom", description: "Video and audio door entry, entry panels, and integration with access control." },
              { icon: <Lock className="w-8 h-8" />, title: "Electronic Locking", description: "Electric strikes, maglocks, and fail-safe/fail-secure options for controlled release." },
              { icon: <CheckCircle className="w-8 h-8" />, title: "Visitor Management", description: "Pre-registration, sign-in, and host notification for visitors and contractors." },
              { icon: <ArrowRight className="w-8 h-8" />, title: "Integration", description: "Integration with CCTV, intruder alarms, and fire systems for a single security platform." }
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
              Ready To Upgrade Your Access Control?
            </h2>
            <p className={`text-xl mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              From single-door systems to multi-site access control, we can design and install a solution that fits your security and operational needs.
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
