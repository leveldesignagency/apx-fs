"use client"

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import { CustomPillButton } from "@/components/ui/CustomPillButton";
import { Target, Calendar, Users, CheckCircle, ArrowRight, BarChart3, Shield } from "lucide-react";

export default function ProjectManagementPage() {
  const { theme } = useTheme();
  const heroImageSrc = "/burning-paper-background-still-life%20(1).jpg";

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: theme === 'dark' ? '#000000' : '#ffffff' }}>
      <div className="w-full h-[0.75px] bg-black dark:bg-white"></div>

      <section className="relative h-screen overflow-visible flex flex-col bg-transparent">
        <div className="fixed inset-0 z-0" aria-hidden>
          <Image
            src={heroImageSrc}
            alt=""
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50" aria-hidden />
        </div>
        <div className="container mx-auto px-6 flex-1 flex flex-col justify-start pt-44 pb-40 relative z-20">
          <div className="space-y-4">
            <div className="max-w-3xl">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3 text-left font-title text-white">
                Project Management
              </h1>
              <p className="text-sm sm:text-base md:text-lg font-normal mb-4 md:mb-5 text-left tracking-tight max-w-2xl text-white">
                We deliver fire and security projects on time, on budget, and to the highest standards. Our project managers
                coordinate design, installation, commissioning, and handover so your fire safety, CCTV, access control,
                and emergency lighting systems are delivered seamlessly.
              </p>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
                <CustomPillButton href="/contact" size="md">
                  Get a free quote
                </CustomPillButton>
                <Link
                  href="/contact"
                  className="text-white font-normal text-base underline underline-offset-4 hover:text-white/90 transition-colors"
                >
                  Question? get in touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10 -mt-64 sm:-mt-72">
      <div className="w-full h-[0.75px] bg-black dark:bg-white"></div>

      <section className={`py-12 lg:py-16 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`} style={{ backgroundColor: theme === 'dark' ? '#000000' : '#ffffff' }}>
        <div className="container mx-auto px-6">
          <h2 className={`text-4xl font-bold mb-10 text-center font-title ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            Fire & Security Project Management
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Target className="w-8 h-8" />, title: "Project Planning", description: "Scope, programme, and resource planning for fire and security installations and upgrades." },
              { icon: <Calendar className="w-8 h-8" />, title: "Schedule & Coordination", description: "Phased delivery, milestone tracking, and coordination with building and MEP contractors." },
              { icon: <Users className="w-8 h-8" />, title: "Stakeholder Management", description: "Clear communication with clients, facilities teams, and enforcing authorities." },
              { icon: <BarChart3 className="w-8 h-8" />, title: "Budget & Reporting", description: "Cost control, variations, and regular reporting so projects stay on budget." },
              { icon: <CheckCircle className="w-8 h-8" />, title: "Quality & Compliance", description: "Quality checks and compliance documentation for handover and certification." },
              { icon: <ArrowRight className="w-8 h-8" />, title: "Handover & Training", description: "Commissioning, as-built documentation, and user training for new systems." }
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

      <section className={`py-12 lg:py-16 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`} style={{ backgroundColor: theme === 'dark' ? '#000000' : '#ffffff' }}>
        <div className="container mx-auto px-6">
          <h2 className={`text-4xl font-bold mb-10 text-center font-title ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            Project Types We Manage
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "New Build Fire & Security", description: "Full fire detection, CCTV, access control, and emergency lighting for new commercial and residential buildings.", icon: <Shield className="w-8 h-8" /> },
              { title: "Refurbishment & Retrofit", description: "Upgrading existing premises with modern fire alarms, CCTV, and access control to meet current standards.", icon: <Calendar className="w-8 h-8" /> },
              { title: "Multi-Site Rollouts", description: "Coordinated installation and commissioning of fire and security systems across multiple locations.", icon: <BarChart3 className="w-8 h-8" /> },
              { title: "System Replacements", description: "Phased replacement of legacy fire and security systems with minimal disruption to operations.", icon: <CheckCircle className="w-8 h-8" /> },
              { title: "Integration Projects", description: "Unified fire, security, and building management systems with single-panel control and reporting.", icon: <Target className="w-8 h-8" /> },
              { title: "Compliance & Remediation", description: "Projects to bring premises up to current fire safety and security standards following audits.", icon: <ArrowRight className="w-8 h-8" /> }
            ].map((project, index) => (
              <div key={index} className={`p-8 rounded-xl ${theme === 'dark' ? 'bg-black border border-gray-700' : 'bg-white border border-gray-200'}`}>
                <div className={`mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{project.icon}</div>
                <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{project.title}</h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full h-[0.75px] bg-black dark:bg-white"></div>

      <section className={`py-12 lg:py-16 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`} style={{ backgroundColor: theme === 'dark' ? '#000000' : '#ffffff' }}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`text-4xl font-bold mb-6 font-title ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              Ready To Start Your Fire & Security Project?
            </h2>
            <p className={`text-xl mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              From single-system installs to full building fire and security packages, we can plan and deliver your project on time and to the right standards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CustomPillButton href="/contact" size="md">
                Discuss Your Project
              </CustomPillButton>
              <CustomPillButton href="tel:02045685986" size="md" variant="outline">
                Call 020 4568 5986
              </CustomPillButton>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
