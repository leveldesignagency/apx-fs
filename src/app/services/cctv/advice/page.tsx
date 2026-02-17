"use client"

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import { CustomPillButton } from "@/components/ui/CustomPillButton";
import { RequestFreeSurvey } from "@/components/ServicePageSharedSections";
import { HelpCircle, Camera, FileCheck } from "lucide-react";

export default function UsefulCctvAdvicePage() {
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
              Useful CCTV Advice
            </h1>
            <p className="text-sm sm:text-base md:text-lg font-normal mb-4 md:mb-5 text-left tracking-tight max-w-2xl text-white">
              Not sure what you need? We’ve put together practical advice on choosing and using CCTV — from camera types and placement to recording, data protection, and working with a professional installer.
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
            <h2 className={`text-3xl font-bold mb-10 text-center font-title ${textClass}`}>CCTV Advice & Guidance</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Camera, title: "Choosing the Right System", text: "Indoor vs outdoor, resolution, night vision, and whether to go wired or wireless — we help you decide." },
                { icon: FileCheck, title: "Placement & Coverage", text: "Where to put cameras for the best coverage and evidence, and how to stay within the law." },
                { icon: HelpCircle, title: "Data Protection & Signage", text: "GDPR, signage, retention periods, and sharing footage with police or insurers." },
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
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <h2 className={`text-3xl font-bold mb-6 font-title ${textClass}`}>Free Survey & Expert Advice</h2>
            <p className={`text-lg mb-8 ${mutedClass}`}>
              The best way to get advice tailored to your property is a free, no-obligation survey. We’ll assess your site, discuss your requirements, and recommend the right CCTV solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CustomPillButton href="/contact" size="md">Request a free survey</CustomPillButton>
              <CustomPillButton href="tel:02045685986" size="md" variant="outline">Call 020 4568 5986</CustomPillButton>
            </div>
          </div>
        </section>
        <RequestFreeSurvey />
      </div>
    </div>
  );
}
