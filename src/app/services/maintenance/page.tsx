"use client"

import { useTheme } from "@/contexts/ThemeContext";
import { Wrench, Clock, Shield, CheckCircle, ArrowRight, Phone, Calendar } from "lucide-react";
export default function MaintenancePage() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: theme === 'dark' ? '#000000' : '#ffffff' }}>
      <div className="w-full h-[0.75px] bg-black dark:bg-white"></div>

      <section className={`py-20 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`} style={{ backgroundColor: theme === 'dark' ? '#000000' : '#ffffff' }}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className={`text-5xl lg:text-7xl font-bold mb-6 font-title ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                Maintenance
                <br />
                <span className="text-4xl lg:text-6xl opacity-70">& Support</span>
              </h1>
              <p className={`text-xl mb-8 leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Keep your fire and security systems compliant and reliable with our maintenance and support services.
                From scheduled servicing to 24/7 emergency call-out, we ensure your fire alarms, CCTV, access control,
                and emergency lighting are always in working order.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className={`px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${theme === 'dark' ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}>
                  Request Service
                </button>
                <button className={`px-8 py-4 rounded-lg font-semibold border transition-all duration-300 ${theme === 'dark' ? 'border-white text-white hover:bg-white hover:text-black' : 'border-black text-black hover:bg-black hover:text-white'}`}>
                  Emergency Call
                </button>
              </div>
            </div>
            <div className="relative">
              <div className={`w-full h-96 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'} flex items-center justify-center`}>
                <div className="text-center">
                  <Wrench className="w-24 h-24 mx-auto mb-4 opacity-50" />
                  <p className="text-lg opacity-70">Maintenance & Support Image Placeholder</p>
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
            Fire & Security Maintenance Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Calendar className="w-8 h-8" />, title: "Scheduled Servicing", description: "Regular servicing of fire alarms, CCTV, access control, and emergency lighting to maintain compliance and performance." },
              { icon: <Wrench className="w-8 h-8" />, title: "Emergency Repairs", description: "24/7 emergency response for fire and security system faults to minimize risk and downtime." },
              { icon: <Shield className="w-8 h-8" />, title: "Compliance Inspections", description: "Fire risk assessments, alarm testing, and emergency lighting tests with full documentation and certification." },
              { icon: <Clock className="w-8 h-8" />, title: "Remote Monitoring", description: "Alarm and system health monitoring with proactive alerts and scheduled maintenance reminders." },
              { icon: <CheckCircle className="w-8 h-8" />, title: "Fault Resolution", description: "Diagnosis and repair of faults on fire, security, and emergency lighting systems." },
              { icon: <ArrowRight className="w-8 h-8" />, title: "System Upgrades", description: "Firmware updates, hardware upgrades, and expansion of existing fire and security systems." }
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className={`text-4xl font-bold mb-6 font-title ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                24/7 Emergency Response
              </h2>
              <p className={`text-xl mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                When a fire or security system fails, we respond quickly to restore protection. Our engineers are available
                around the clock for alarm faults, detection issues, and emergency lighting failures.
              </p>
              <div className="space-y-4">
                {[
                  "Average response time: 1–2 hours",
                  "Fully equipped service vehicles",
                  "Certified fire & security technicians",
                  "Real-time status updates",
                  "Follow-up and certification"
                ].map((item, index) => (
                  <div key={index} className={`flex items-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className={`p-8 rounded-xl ${theme === 'dark' ? 'bg-black border border-gray-700' : 'bg-white border border-gray-200'}`}>
              <div className="text-center">
                <Phone className="w-16 h-16 mx-auto mb-6 text-red-500" />
                <h3 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  Emergency Hotline
                </h3>
                <p className={`text-xl mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  020 4568 5986
                </p>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Available 24/7 for fire and security system emergencies
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full h-[0.75px] bg-black dark:bg-white"></div>

      <section className={`py-20 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`} style={{ backgroundColor: theme === 'dark' ? '#000000' : '#ffffff' }}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`text-4xl font-bold mb-6 font-title ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              Keep Your Fire & Security Systems Reliable
            </h2>
            <p className={`text-xl mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Proactive maintenance keeps you compliant and reduces the risk of faults. Contact us to arrange scheduled
              servicing or discuss a maintenance contract for your fire and security systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className={`px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${theme === 'dark' ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}>
                Schedule Maintenance
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
