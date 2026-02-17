"use client"

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import { CustomPillButton } from "@/components/ui/CustomPillButton";
import { OurCustomers, RequestFreeSurvey } from "@/components/ServicePageSharedSections";
import { Video, Shield, Monitor, CheckCircle, ArrowRight, Smartphone } from "lucide-react";

export default function CctvSecurityPage() {
  const { theme } = useTheme();
  const heroImageSrc = "/client%20logos/service%20pages%20image/home-cctv-system-installer-800x533.jpg";

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
                CCTV Systems
              </h1>
              <p className="text-sm sm:text-base md:text-lg font-normal mb-4 md:mb-5 text-left tracking-tight max-w-2xl text-white">
                We offer the latest in CCTV technology, specialising in the design and installation of high performance CCTV systems that meet your requirements. Choosing the right CCTV system and having it professionally installed will provide you with superior results and will save you time and money in the long run.
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
            Our CCTV Systems
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

      <section className={`py-12 lg:py-16 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`} style={{ backgroundColor: theme === 'dark' ? '#000000' : '#ffffff' }}>
        <div className="container mx-auto px-6">
          <h2 className={`text-4xl font-bold mb-10 text-center font-title ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
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

      <section className={`py-12 lg:py-16 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`} style={{ backgroundColor: theme === 'dark' ? '#000000' : '#ffffff' }}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`text-4xl font-bold mb-6 font-title ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              Need CCTV Or Intruder Alarm Systems?
            </h2>
            <p className={`text-xl mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Our security specialists can survey your site and recommend the right CCTV and alarm solution for your premises and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CustomPillButton href="/contact" size="md">
                Get Free Consultation
              </CustomPillButton>
              <CustomPillButton href="tel:02045685986" size="md" variant="outline">
                Call 020 4568 5986
              </CustomPillButton>
            </div>
          </div>
        </div>
      </section>
        <OurCustomers />
        <RequestFreeSurvey />
      </div>
    </div>
  );
}
