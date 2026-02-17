"use client"

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import { CustomPillButton } from "@/components/ui/CustomPillButton";
import { OurCustomers, RequestFreeSurvey } from "@/components/ServicePageSharedSections";
import { Key, Shield, Clock, Users } from "lucide-react";

export default function AccessControlPage() {
  const { theme } = useTheme();
  const heroImageSrc = "/client%20logos/service%20pages%20image/home-access-control-system-installer-800x533.jpg";
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
              Access Control Systems
            </h1>
            <p className="text-sm sm:text-base md:text-lg font-normal text-left tracking-tight max-w-2xl text-white">
              Uniquely designed for each client, whatever the size. From simple stand-alone systems to fully networked installations.
            </p>
            <p className="text-sm sm:text-base md:text-lg font-normal text-left tracking-tight max-w-2xl text-white">
              APX Fire & Security offer the best and latest in Access Control technology, from large commercial properties through to small domestic properties and everything in between. We specialise in the design and installation of high-performance access systems that provide our customers with superior results, peace of mind and unrivaled after-sales support.
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

        {/* Bespoke Access Control Systems */}
        <section className={`py-12 lg:py-16 ${textClass}`} style={{ backgroundColor: theme === "dark" ? "#000000" : "#ffffff" }}>
          <div className="container mx-auto px-6 max-w-4xl">
            {/* Optional: replace with image – "Access Control System" / "Bespoke Access Control Systems" */}
            <h2 className="text-4xl font-bold mb-6 font-title">Bespoke Access Control Systems</h2>
            <div className="space-y-6 text-lg leading-relaxed">
              <p className={mutedClass}>
                We have a vast amount of experience in designing high quality and effective access control systems for business and homeowners alike. Established in 1986 we work throughout London and the Home Counties, in all market sectors, ranging from single doors through to fully networked systems that integrate with intruder alarms and CCTV systems.
              </p>
              <p className={mutedClass}>
                Working alongside architects and consultants, we design systems to meet and exceed our clients expectations, ensuring our electronic access control systems provide the most efficient and convenient way of securing your building and assets.
              </p>
              <p className={mutedClass}>
                Simply complete the Access Control System enquiry form and we will contact you and arrange to meet you, discuss your requirements and carry out a survey of your property.
              </p>
            </div>
          </div>
        </section>

        <div className="w-full h-[0.75px] bg-black dark:bg-white" />

        {/* Benefits – 4 key points + detailed list */}
        <section className={`py-12 lg:py-16 ${textClass}`} style={{ backgroundColor: theme === "dark" ? "#000000" : "#ffffff" }}>
          <div className="container mx-auto px-6">
            {/* Optional: replace with image – "Benefits of Access Control Systems" */}
            <h2 className="text-4xl font-bold mb-10 text-center font-title">Benefits of Access Control Systems</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { icon: Key, title: "No Keys", text: "No more lost keys or expensive replacement locks to worry about." },
                { icon: Users, title: "Monitor Access", text: "Control who comes and goes and record when they access." },
                { icon: Shield, title: "Better Security", text: "Less likely that unwanted visitors will enter your facility." },
                { icon: Clock, title: "24 Hour Access", text: "Avoid security staff having to unlock doors or stay late to lock up." },
              ].map(({ icon: Icon, title, text }, i) => (
                <div key={i} className={`p-6 rounded-xl border ${borderClass}`}>
                  <Icon className={`w-10 h-10 mb-4 ${theme === "dark" ? "text-white" : "text-black"}`} />
                  <h3 className="text-xl font-semibold mb-2">{title}</h3>
                  <p className={mutedClass}>{text}</p>
                </div>
              ))}
            </div>
            <div className="max-w-4xl mx-auto space-y-6">
              <p className={`text-base lg:text-lg leading-relaxed ${mutedClass}`}>
                <strong className={textClass}>No hassle with traditional keys:</strong> Traditional keys require extra work and can pose several security threats. For example, if a key holder loses their key, you may have to change all the locks to maintain the security of the building, which would incur a substantial cost.
              </p>
              <p className={`text-base lg:text-lg leading-relaxed ${mutedClass}`}>
                <strong className={textClass}>Give employees the freedom to come and go:</strong> With keyed systems, security staff will sometimes have to start early to unlock doors or stay late to lock up. With access control systems, it is easier to give everyone a programmed card, offering employees more flexibility in their schedules, removing the need for additional staff to allow access.
              </p>
              <p className={`text-base lg:text-lg leading-relaxed ${mutedClass}`}>
                <strong className={textClass}>Safe working environment:</strong> Keep your employees safe in the case of an emergency. Doors locked with keys can be unsafe if a fire or other emergency requires a quick escape. With access control system fail safe locks, the doors will automatically unlock so all people can exit a building without having to waste time searching for their keys.
              </p>
              <p className={`text-base lg:text-lg leading-relaxed ${mutedClass}`}>
                <strong className={textClass}>Keep unwanted visitors out:</strong> Access control systems make it less likely that an unwanted visitor will enter your facility. If every door requires credentials before it unlocks, you will know everyone in the building is authorised to be there. Unlike key systems, access control systems allow you to deactivate an access card and assign a new one. No need to change locks or issue new keys to everyone.
              </p>
              <p className={`text-base lg:text-lg leading-relaxed ${mutedClass}`}>
                <strong className={textClass}>Advanced automation:</strong> Our fully networked access control installations offer advanced features such as automatic time and attendance reports linked to payroll.
              </p>
              <p className={`text-base lg:text-lg leading-relaxed ${mutedClass}`}>
                <strong className={textClass}>Keep track of who enters the facility:</strong> Another benefit of access control systems is that you can keep track of who is coming and going. In the event of a security incident, you will be able to see exactly who swiped their card to access a specific area.
              </p>
              <p className={`text-base lg:text-lg leading-relaxed ${mutedClass}`}>
                <strong className={textClass}>Set specialised access parameters:</strong> Unlike keyed systems, access control systems allow you to grant access to certain people on specific days and times. You can programme any door or any card to meet your exact needs.
              </p>
            </div>
          </div>
        </section>

        <div className="w-full h-[0.75px] bg-black dark:bg-white" />

        {/* Access Control System Products – brands (placeholders for brand images) */}
        <section className={`py-12 lg:py-16 ${textClass}`} style={{ backgroundColor: theme === "dark" ? "#000000" : "#ffffff" }}>
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-10 text-center font-title">Access Control System Products</h2>
            <p className={`text-center max-w-2xl mx-auto mb-10 ${mutedClass}`}>
              We are proud to install access control technology from the world&apos;s leading brands
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
              {["TDSI", "Came Entrotec", "PAC", "ASSA ABLOY", "Videx", "CDVI"].map((brand, i) => (
                <div key={i} className={`px-6 py-4 rounded-lg border ${borderClass} min-w-[140px] text-center font-semibold`}>
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="w-full h-[0.75px] bg-black dark:bg-white" />

        {/* Our Access Control System Installations – case studies (placeholders for project images) */}
        <section className={`py-12 lg:py-16 ${textClass}`} style={{ backgroundColor: theme === "dark" ? "#000000" : "#ffffff" }}>
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-10 text-center font-title">Our Access Control System Installations</h2>
            <p className={`text-center max-w-2xl mx-auto mb-12 ${mutedClass}`}>
              Examples of the Access Control Systems that we have installed for our customers:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Mayfair Townhouse", subtitle: "Luxury Lifestyle Hotel, London" },
                { title: "Scape Bloomsbury", subtitle: "Student Accommodation" },
                { title: "John Keats Primary School", subtitle: "Rotherhithe, London" },
                { title: "Ledian Farm", subtitle: "Retirement Village, Kent" },
                { title: "United Living Welbourne", subtitle: "Apartment Block" },
                { title: "Aspire Herschel Street", subtitle: "Apartment Block" },
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
