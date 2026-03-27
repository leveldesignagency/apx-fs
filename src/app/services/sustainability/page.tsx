"use client"

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import { CustomPillButton } from "@/components/ui/CustomPillButton";
import { OurCustomers, RequestFreeSurvey } from "@/components/ServicePageSharedSections";
import { Shield, CheckCircle, Monitor, Smartphone, Package } from "lucide-react";

const INTRUDER_SURVEY_TITLE = "Request Your Free Intruder Alarm Survey";
const INTRUDER_SURVEY_DESCRIPTION = "As one of the leading intruder alarm installers in London and the south east, we are pleased to offer a free survey and a report for your property. Our systems are expertly designed in accordance with NSI Gold standards, covering both the domestic and commercial market. Simply contact us for a chat about your requirements.";

const MONITORING_BENEFITS = [
  { icon: Shield, title: "Comprehensive protection", text: "Comprehensive protection for your people and your property 24 hours a day." },
  { icon: Monitor, title: "Central Monitoring", text: "Active monitoring of your installed security services and systems (optional)." },
  { icon: Package, title: "Protect Belongings", text: "Peace of mind that your belongings and cherished items are protected." },
  { icon: Smartphone, title: "Remotely Controlled", text: "Access and control your security system remotely via tablet or smartphone." },
  { icon: CheckCircle, title: "Quality Installation", text: "Our standards ensure a well designed, well installed and reliable security system." },
];

const BRANDS = ["CQR", "Honeywell", "Eaton", "Optex", "Texecom"];

const INSTALLATIONS = [
  { title: "Intruder Alarm Systems for King's College Hospital NHS Trust", org: "King's College Hospital NHS Foundation Trust" },
  { title: "Intruder Alarm St Mary Magdalene CoE School", org: "St Mary Magdalene C of E School, Greenwich Peninsula, London" },
  { title: "Intruder Alarm Greenwood Centre Camden Council", org: "Greenwood Centre, Camden Council" },
];

export default function IntruderAlarmSystemsPage() {
  const { theme } = useTheme();
  const heroImageSrc = "/client%20logos/service%20pages%20image/home-intruder-alarm-system-installer-800x533.jpg";
  const isDark = theme === "dark";
  const textClass = isDark ? "text-white" : "text-black";
  const mutedClass = isDark ? "text-gray-300" : "text-gray-600";
  const bgStyle = { backgroundColor: isDark ? "#000000" : "#ffffff" };

  return (
    <div className="min-h-screen overflow-x-hidden" style={bgStyle}>
      <div className="w-full h-[0.75px] bg-black dark:bg-white" />

      {/* Hero */}
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
                Intruder Alarm Systems
              </h1>
              <p className="text-sm sm:text-base md:text-lg font-normal mb-3 text-left tracking-tight max-w-2xl text-white">
                Expertly designed to protect anything from a one bedroom apartment through to fully monitored emergency response systems covering multi-occupancy offices.
              </p>
              <p className="text-sm sm:text-base md:text-lg font-normal mb-4 md:mb-5 text-left tracking-tight max-w-2xl text-white">
                APX Fire & Security specialise in the design and installation of high-performance Intruder Alarm systems that can also be linked to other systems such as CCTV, Video Entry and Access Control systems. Established in 1986, our vast experience in the industry means we offer the very best and latest in Intruder Alarm technology that you can rely on.
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
        <div className="w-full h-[0.75px] bg-black dark:bg-white" />

        {/* Intruder Alarm System Installer London / Bespoke */}
        <section className={`py-12 lg:py-16`} style={bgStyle}>
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className={`text-3xl font-bold mb-4 font-title ${textClass}`}>
              Intruder Alarm System Installer London
            </h2>
            <h3 className={`text-2xl font-semibold mb-6 font-title ${textClass}`}>
              Bespoke Intruder Alarm Systems
            </h3>
            <div className={`space-y-4 ${mutedClass}`}>
              <p>
                We are proud to provide all of our customers, whether they are commercial or domestic, with custom-built Intruder Alarm systems to meet their requirements and deliver the peace of mind that a well designed, well installed and reliable security system can bring.
              </p>
              <p>
                Whether you are a large commercial business or a small domestic property, we can deliver an Intruder Alarm system that conforms to all the required standards. We install Grade 1, Grade 2 and Grade 3 as per insurance requirements and our reputation for designing high quality installations is renowned within the industry.
              </p>
              <p>
                Simply complete the Intruder Alarm System enquiry form and we will contact you and arrange to meet you, discuss your requirements and carry out a survey of your property.
              </p>
            </div>
            <div className="mt-8">
              <CustomPillButton href="/contact" size="md">
                Enquiry form
              </CustomPillButton>
            </div>
          </div>
        </section>

        <div className="w-full h-[0.75px] bg-black dark:bg-white" />

        {/* Why use APX Fire & Security? */}
        <section className={`py-12 lg:py-16`} style={bgStyle}>
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className={`text-3xl font-bold mb-8 font-title ${textClass}`}>
              Why use APX Fire & Security?
            </h2>
            <div className={`space-y-4 ${mutedClass}`}>
              <p>
                Established in 1986 we have vast experience in this sector and have installed a wide variety of systems during this time. After each survey that we carry out, every one of our intruder alarm installations is individually designed to suit the specific requirements of our customers, whether they are domestic, industrial or commercial properties.
              </p>
              <p>
                All of our systems meet the relevant standards and can be enhanced with Police Response via our dedicated Alarm Receiving Centre (ARC) if this is required. We can also offer the option of a fully integrated system that can be connected to your CCTV, access control or video door entry systems.
              </p>
              <p>
                With technology constantly evolving in all areas of security we ensure that our installers are regularly trained to maintain the highest levels of skills and product knowledge to provide our customers. We are also proud to be NSI Gold standard installers.
              </p>
            </div>
          </div>
        </section>

        <div className="w-full h-[0.75px] bg-black dark:bg-white" />

        {/* Intruder Alarm Monitoring Company / Constant Protection */}
        <section className={`py-12 lg:py-16`} style={bgStyle}>
          <div className="container mx-auto px-6">
            <h2 className={`text-3xl font-bold mb-2 font-title ${textClass}`}>
              Intruder Alarm Monitoring Company
            </h2>
            <p className={`text-xl font-semibold mb-10 ${textClass}`}>
              Constant Protection
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {MONITORING_BENEFITS.map((item, index) => (
                <div
                  key={index}
                  className={`p-8 rounded-xl transition-all duration-300 hover:scale-[1.02] ${isDark ? "bg-black border border-gray-700 hover:border-white" : "bg-white border border-gray-200 hover:border-black"}`}
                >
                  <div className={`mb-4 ${textClass}`}>
                    <item.icon className="w-8 h-8" />
                  </div>
                  <h3 className={`text-xl font-semibold mb-3 ${textClass}`}>
                    {item.title}
                  </h3>
                  <p className={mutedClass}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="w-full h-[0.75px] bg-black dark:bg-white" />

        {/* External Intruder Alarm Protection */}
        <section className={`py-12 lg:py-16`} style={bgStyle}>
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className={`text-3xl font-bold mb-8 font-title ${textClass}`}>
              External Intruder Alarm Protection
            </h2>
            <div className={`space-y-4 ${mutedClass}`}>
              <p>
                We have installed a number of high quality external intruder protection systems but due to the confidential nature of the properties, the type of system installed and the areas they protect, we can only show a limited number of images.
              </p>
              <p>
                A recent installation that we carried out in a residential London property featured black external laser detectors as shown in the images alongside. The laser-based security creates virtual curtains and surveillance security zones that offer the highest levels of precision for accurate and reliable intrusion detection.
              </p>
              <p>
                Laser-based detection systems such as this are ideal for securing open sites and are a great option for perimeter protection, intrusion detection, for alerting you to pedestrian and vehicle access and for protection against theft and vandalism. Simply contact us to learn more about how we can help you to secure your property.
              </p>
            </div>
          </div>
        </section>

        <div className="w-full h-[0.75px] bg-black dark:bg-white" />

        {/* Intruder Alarm Technology - brands */}
        <section className={`py-12 lg:py-16`} style={bgStyle}>
          <div className="container mx-auto px-6">
            <h2 className={`text-3xl font-bold mb-2 font-title text-center ${textClass}`}>
              Intruder Alarm Technology
            </h2>
            <p className={`text-center max-w-2xl mx-auto mb-12 ${mutedClass}`}>
              We are proud to install the latest intruder alarm technology from the world&apos;s leading brands
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
              {BRANDS.map((name, i) => (
                <div
                  key={i}
                  className={`px-6 py-3 rounded-lg font-semibold ${isDark ? "bg-white/10 text-white" : "bg-gray-100 text-black"}`}
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="w-full h-[0.75px] bg-black dark:bg-white" />

        {/* Our Intruder Alarm System Installations */}
        <section className={`py-12 lg:py-16`} style={bgStyle}>
          <div className="container mx-auto px-6">
            <h2 className={`text-3xl font-bold mb-4 font-title text-center ${textClass}`}>
              Our Intruder Alarm System Installations
            </h2>
            <p className={`text-center max-w-2xl mx-auto mb-12 ${mutedClass}`}>
              Examples of intruder alarm systems that we have installed for our customers:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {INSTALLATIONS.map((item, index) => (
                <div
                  key={index}
                  className={`p-8 rounded-xl border ${isDark ? "border-gray-700 hover:border-white" : "border-gray-200 hover:border-black"}`}
                >
                  <h3 className={`text-lg font-semibold mb-2 ${textClass}`}>
                    {item.title}
                  </h3>
                  <p className={mutedClass}>{item.org}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <OurCustomers />

        <RequestFreeSurvey title={INTRUDER_SURVEY_TITLE} description={INTRUDER_SURVEY_DESCRIPTION} />
      </div>
    </div>
  );
}
