"use client"

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import { CustomPillButton } from "@/components/ui/CustomPillButton";
import { RequestFreeSurvey } from "@/components/ServicePageSharedSections";
import { Building2, Monitor, Lock, CheckCircle } from "lucide-react";

export default function CommercialCctvPage() {
  const { theme } = useTheme();
  const heroImageSrc = "/client%20logos/service%20pages%20image/home-cctv-system-installer-800x533.jpg";
  const isDark = theme === "dark";
  const textClass = isDark ? "text-white" : "text-black";
  const mutedClass = isDark ? "text-gray-300" : "text-gray-600";
  const bgStyle = { backgroundColor: isDark ? "#000000" : "#ffffff" };

  return (
    <div className="min-h-screen overflow-x-hidden" style={bgStyle}>
      <div className="w-full h-[0.75px] bg-black dark:bg-white" />
      <section className="relative h-screen overflow-visible flex flex-col bg-transparent">
        <div className="fixed inset-0 z-0" aria-hidden>
          <Image src={heroImageSrc} alt="" fill className="object-cover object-center" priority sizes="100vw" />
          <div className="absolute inset-0 bg-black/50" aria-hidden />
        </div>
        <div className="container mx-auto px-6 flex-1 flex flex-col justify-start pt-44 pb-40 relative z-20">
          <div className="max-w-3xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3 text-left font-title text-white">
              Commercial CCTV Systems
            </h1>
            <p className="text-sm sm:text-base md:text-lg font-normal mb-4 md:mb-5 text-left tracking-tight max-w-2xl text-white">
              High-performance CCTV for offices, retail, warehouses, and multi-site operations. We design and install scalable systems with remote monitoring, integration with access control and intruder alarms, and compliance with GDPR and industry standards.
            </p>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
              <CustomPillButton href="/contact" size="md">Get a free quote</CustomPillButton>
              <Link href="/contact" className="text-white font-normal text-base underline underline-offset-4 hover:text-white/90 transition-colors">Question? get in touch</Link>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10 -mt-64 sm:-mt-72">
        <div className="w-full h-[0.75px] bg-black dark:bg-white" />
        <section className="py-12 lg:py-16" style={bgStyle}>
          <div className="container mx-auto px-6">
            <h2 className={`text-3xl font-bold mb-10 text-center font-title ${textClass}`}>Commercial CCTV Solutions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Building2, title: "Multi-Site & Scalable", text: "From single premises to estate-wide networks with centralised monitoring." },
                { icon: Monitor, title: "24/7 Monitoring", text: "Optional alarm receiving and video monitoring with rapid response." },
                { icon: Lock, title: "Integration", text: "CCTV working with access control, intruder alarms, and fire systems." },
              ].map((item, i) => (
                <div key={i} className={`p-8 rounded-xl border ${isDark ? "border-gray-700" : "border-gray-200"}`}>
                  <item.icon className={`w-8 h-8 mb-4 ${textClass}`} />
                  <h3 className={`text-xl font-semibold mb-3 ${textClass}`}>{item.title}</h3>
                  <p className={mutedClass}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <div className="w-full h-[0.75px] bg-black dark:bg-white" />
        <section className="py-12 lg:py-16" style={bgStyle}>
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className={`text-3xl font-bold mb-6 font-title ${textClass}`}>What We Offer</h2>
            <ul className="space-y-3">
              {["Site survey and system design", "IP and analogue camera systems", "NVR/DVR and cloud recording", "GDPR-compliant data handling", "Installation, commissioning and training", "Ongoing maintenance and support"].map((item, i) => (
                <li key={i} className={`flex items-center gap-3 ${mutedClass}`}>
                  <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-500" />{item}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <CustomPillButton href="/contact" size="md">Get a free quote</CustomPillButton>
            </div>
          </div>
        </section>
        <RequestFreeSurvey />
      </div>
    </div>
  );
}
