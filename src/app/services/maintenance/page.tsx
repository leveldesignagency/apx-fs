"use client"

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import { CustomPillButton } from "@/components/ui/CustomPillButton";
import { OurCustomers, RequestFreeSurvey } from "@/components/ServicePageSharedSections";
import { Eye, Bell, Shield, Link2, Smartphone } from "lucide-react";

export default function VideoDoorEntrySystemsPage() {
  const { theme } = useTheme();
  const heroImageSrc = "/client%20logos/service%20pages%20image/home-video-door-entry-system-installer-800x533.jpg";
  const textClass = theme === "dark" ? "text-white" : "text-black";
  const mutedClass = theme === "dark" ? "text-gray-300" : "text-gray-600";
  const borderClass = theme === "dark" ? "border-gray-700" : "border-gray-200";

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: theme === "dark" ? "#000000" : "#ffffff" }}>
      <div className="w-full h-[0.75px] bg-black dark:bg-white" />

      {/* Hero */}
      <section className="relative h-screen overflow-visible flex flex-col bg-transparent">
        <div className="fixed inset-0 z-0" aria-hidden>
          <Image src={heroImageSrc} alt="" fill className="object-cover object-center" priority sizes="100vw" />
          <div className="absolute inset-0 bg-black/50" aria-hidden />
        </div>
        <div className="container mx-auto px-6 flex-1 flex flex-col justify-start pt-44 pb-40 relative z-20">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3 text-left font-title text-white">
              Video Door Entry Systems
            </h1>
            <p className="text-sm sm:text-base md:text-lg font-normal text-left tracking-tight max-w-2xl text-white">
              Our video entry systems secure your buildings, from basic occupant access through to multi-caller business systems restricted to authorised personnel.
            </p>
            <p className="text-sm sm:text-base md:text-lg font-normal text-left tracking-tight max-w-2xl text-white">
              We work closely with our domestic and commercial customers to understand exactly what they require from their video door entry systems. From small domestic systems through to large commercial premises, our vast experience in the industry means we offer the very best and latest in video door entry technology that you can rely on.
            </p>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
              <CustomPillButton href="/contact" size="md">
                Get a free quote
              </CustomPillButton>
              <Link href="/contact" className="text-white font-normal text-base underline underline-offset-4 hover:text-white/90 transition-colors">
                Question? get in touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10 -mt-64 sm:-mt-72">
        <div className="w-full h-[0.75px] bg-black dark:bg-white" />

        {/* Bespoke Video Door Entry Systems */}
        <section className={`py-12 lg:py-16 ${textClass}`} style={{ backgroundColor: theme === "dark" ? "#000000" : "#ffffff" }}>
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-4xl font-bold mb-6 font-title">Bespoke Video Door Entry Systems</h2>
            <div className="space-y-6 text-lg leading-relaxed">
              <p className={mutedClass}>
                APX has a vast amount of experience in designing and installing high quality and effective video entry systems for businesses, large apartment buildings and homeowners alike. We offer an extensive range of video entry stations with options and styling to cater for all tastes.
              </p>
              <p className={mutedClass}>
                Established in 1986 we offer our services throughout London and the Home Counties, working alongside architects and consultants, as well as working in conjunction with the Police for customers looking to achieve Secured by Design certification.
              </p>
              <p className={mutedClass}>
                From simple one-way video door access for the rightful occupants through to multi-caller digital systems restricted to individually authorised personnel, we offer the most advanced video door entry systems on the market.
              </p>
            </div>
          </div>
        </section>

        <div className="w-full h-[0.75px] bg-black dark:bg-white" />

        {/* The Latest Technology – brands */}
        <section className={`py-12 lg:py-16 ${textClass}`} style={{ backgroundColor: theme === "dark" ? "#000000" : "#ffffff" }}>
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-6 text-center font-title">The Latest Technology</h2>
            <p className={`text-center max-w-2xl mx-auto mb-10 ${mutedClass}`}>
              We are proud to install the latest video entry technology from the world&apos;s leading brands
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
              {["Came Entrotec", "Videx", "CDVI", "PAC", "Paxton"].map((brand, i) => (
                <div key={i} className={`px-6 py-4 rounded-lg border ${borderClass} min-w-[140px] text-center font-semibold`}>
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="w-full h-[0.75px] bg-black dark:bg-white" />

        {/* Comprehensive Security Systems */}
        <section className={`py-12 lg:py-16 ${textClass}`} style={{ backgroundColor: theme === "dark" ? "#000000" : "#ffffff" }}>
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-4xl font-bold mb-6 font-title">Comprehensive Security Systems</h2>
            <div className="space-y-6 text-lg leading-relaxed">
              <p className={mutedClass}>
                We work closely with building specifiers, architects and our residential customers to understand exactly what they require from the latest video entry systems.
              </p>
              <p className={mutedClass}>
                The systems we install allow you to see who&apos;s calling directly on your internal TV network or via your tablet or smartphone. We can also integrate the entry system with existing CCTV systems and access control systems to provide a comprehensive, all-round secure and flexible security system.
              </p>
              <p className={mutedClass}>
                Our custom-designed video entry systems provide secure access to buildings and premises, with a wide range of products to suit any size of application. Simply complete the Video Entry System enquiry form and we will contact you and arrange to meet you, discuss your requirements and carry out a survey of your property.
              </p>
            </div>
          </div>
        </section>

        <div className="w-full h-[0.75px] bg-black dark:bg-white" />

        {/* Video Entry Systems – 5 benefits */}
        <section className={`py-12 lg:py-16 ${textClass}`} style={{ backgroundColor: theme === "dark" ? "#000000" : "#ffffff" }}>
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-10 text-center font-title">Video Entry Systems</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { icon: Eye, title: "Check Visitors", text: "See exactly who's at the front door before deciding whether to open it." },
                { icon: Bell, title: "Silent Alerts", text: "Discreetly monitor and report any intruders to the police in real time." },
                { icon: Shield, title: "Prevent Crime", text: "Video recording acts as a visual deterrent to any potential criminals." },
                { icon: Link2, title: "Link Systems", text: "Our systems interface with other security systems and devices you have." },
                { icon: Smartphone, title: "Remote Control", text: "Control the whole system remotely via your tablet or smartphone." },
              ].map(({ icon: Icon, title, text }, i) => (
                <div key={i} className={`p-6 rounded-xl border ${borderClass}`}>
                  <Icon className={`w-10 h-10 mb-4 ${theme === "dark" ? "text-white" : "text-black"}`} />
                  <h3 className="text-xl font-semibold mb-2">{title}</h3>
                  <p className={mutedClass}>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="w-full h-[0.75px] bg-black dark:bg-white" />

        {/* Our Video Entry Installations */}
        <section className={`py-12 lg:py-16 ${textClass}`} style={{ backgroundColor: theme === "dark" ? "#000000" : "#ffffff" }}>
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-10 text-center font-title">Our Video Entry Installations</h2>
            <p className={`text-center max-w-2xl mx-auto mb-12 ${mutedClass}`}>
              Examples of video door entry systems that we have installed for our customers:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Aspire Herschel Street", subtitle: "Apartment Block" },
                { title: "Fizzy Living, Lewisham", subtitle: "Apartment Blocks" },
                { title: "Richmond Buildings Workspace", subtitle: "Firmdale Hotels" },
                { title: "United Living Welbourne", subtitle: "Apartment Block" },
              ].map((project, i) => (
                <div key={i} className={`rounded-xl border ${borderClass} overflow-hidden`}>
                  <div className={`aspect-video flex items-center justify-center ${theme === "dark" ? "bg-white/5" : "bg-gray-100"}`}>
                    <span className={`text-sm ${mutedClass}`}>Image placeholder</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                    <p className={mutedClass}>{project.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <OurCustomers />
        <RequestFreeSurvey />
      </div>
    </div>
  );
}
