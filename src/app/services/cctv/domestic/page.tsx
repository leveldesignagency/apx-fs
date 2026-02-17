"use client"

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import { CustomPillButton } from "@/components/ui/CustomPillButton";
import { RequestFreeSurvey } from "@/components/ServicePageSharedSections";
import { Home, Shield, Smartphone, CheckCircle } from "lucide-react";

export default function DomesticCctvPage() {
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
            <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3 text-left font-title text-white`}>
              Domestic CCTV Systems
            </h1>
            <p className="text-sm sm:text-base md:text-lg font-normal mb-4 md:mb-5 text-left tracking-tight max-w-2xl text-white">
              Protect your home with professionally designed and installed domestic CCTV systems. From single-camera setups to full property coverage with remote viewing, we deliver solutions that give you peace of mind and evidence when it matters.
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
            <h2 className={`text-3xl font-bold mb-10 text-center font-title ${textClass}`}>Why Choose Domestic CCTV?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Home, title: "Tailored to Your Home", text: "Systems designed for houses, flats, and driveways — no one-size-fits-all." },
                { icon: Smartphone, title: "Remote Viewing", text: "Check live and recorded footage from your phone or tablet, wherever you are." },
                { icon: Shield, title: "Deterrence & Evidence", text: "Visible cameras deter intruders; recorded footage supports insurance and police." },
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
              {["Site survey and camera placement advice", "HD and 4K indoor and outdoor cameras", "NVR/DVR recording and cloud options", "Mobile app access and push alerts", "Installation and handover"].map((item, i) => (
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
