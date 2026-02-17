"use client"

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import { CustomPillButton } from "@/components/ui/CustomPillButton";
import { RequestFreeSurvey } from "@/components/ServicePageSharedSections";

const FIRE_SURVEY_TITLE = "Request Your Free Fire Alarm System Survey";
const FIRE_SURVEY_DESCRIPTION = "Not sure what kind of system you need? There is no 'one size fits all' when it comes to fire safety and the type of fire system we install is dependent on the property and the activity that takes place inside. So we offer a free, no obligation survey to ascertain the type of Fire Alarm System that best suits your needs. Simply contact us for a chat about your requirements.";

const SYSTEM_TYPES = [
  "Addressable Fire Alarm Systems",
  "Conventional Fire Alarm Systems",
  "Wire-Free Fire Alarm Systems",
  "Air Sampling (sniffer) Fire Alarm Systems",
];

const FIRE_CUSTOMERS = [
  { name: "The Mayfair Townhouse", tagline: "Luxury Lifestyle Hotel" },
  { name: "Hilton DoubleTree", tagline: "Hotel Group" },
  { name: "Firmdale Hotels", tagline: "Hotel Group" },
  { name: "United Living", tagline: "Housing & Infrastructure" },
  { name: "Camden Council", tagline: "Local Authority, London" },
  { name: "University of West London", tagline: "Higher Education" },
  { name: "Scape Bloomsbury", tagline: "Student Accommodation" },
];

const FIRE_INSTALLATIONS = [
  { title: "Fire Alarm System Dimco Exhibition Building Westfield", org: "Dimco Exhibition Building, Westfield, Stratford" },
  { title: "Fire Alarm System University of West London", org: "University of West London, Higher Education" },
  { title: "Fire Alarm System Sancroft Building", org: "Sancroft Building, Office Space, London" },
  { title: "Fire Alarm System Oaklands House London", org: "Oaklands House, London, Apartment Blocks" },
  { title: "Fire Alarm System Hilton DoubleTree Kingston", org: "Hilton DoubleTree Kingston, Central London Hotel" },
  { title: "Fire Alarm System John Keats Primary School", org: "John Keats Primary School, Rotherhithe, London" },
  { title: "Fire Alarm System Mayfair Townhouse London", org: "Mayfair Townhouse, Luxury Lifestyle Hotel" },
  { title: "Fire Alarm System Scape Bloomsbury", org: "Scape Bloomsbury, Student Accommodation" },
  { title: "Fire Alarm System Wembley French School", org: "Wembley French School, International School" },
];

const FIRE_BRANDS = ["Xtralis", "Vox-Ignis", "Advanced", "Reach Wireless", "Apollo", "EMS"];

const REGULATION_QUESTIONS = [
  "Are your premises small, single-storey or open-plan?",
  "Do you have any high-risk substances on-site such as chemicals?",
  "Are there any high-risk activities on-site, such as cooking?",
  "Are there vulnerable people in the building (e.g. children, elderly, disabled)?",
  "If a fire broke out on-site it would be easily spotted straight away?",
  "Would shouting 'fire' be easily heard by all occupants of the building?",
];

export default function FireSafetySystemsPage() {
  const { theme } = useTheme();
  const heroImageSrc = "/client%20logos/service%20pages%20image/home-fire-alarm-system-installer-800x533.jpg";
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
                Fire Alarm Systems
              </h1>
              <p className="text-sm sm:text-base md:text-lg font-normal mb-3 text-left tracking-tight max-w-2xl text-white">
                At APX we specialise in designing and installing high quality fire alarm systems for both domestic properties and commercial premises.
              </p>
              <p className="text-sm sm:text-base md:text-lg font-normal mb-4 md:mb-5 text-left tracking-tight max-w-2xl text-white">
                We offer a wide range of conventional and addressable fire alarm systems. Our vast experience in the fire detection industry spans the public and industrial sector, with installations ranging from small domestic systems through to commercial premises such as schools, offices, warehouses, hotels and banks. We are fully accredited to BAFE and FIA for our customers' peace of mind.
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

        {/* Fire Alarm System Installer London / Bespoke */}
        <section className="py-12 lg:py-16" style={bgStyle}>
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className={`text-3xl font-bold mb-4 font-title ${textClass}`}>
              Fire Alarm System Installer London
            </h2>
            <h3 className={`text-2xl font-semibold mb-6 font-title ${textClass}`}>
              Bespoke Fire Alarm Systems
            </h3>
            <div className={`space-y-4 ${mutedClass}`}>
              <p>
                Established in 1986 we work throughout London and the Home Counties to install fire protection systems that combine the highest standard of fire protection equipment with high levels of customer care, at affordable prices.
              </p>
              <p>
                Our systems are expertly designed in accordance with NSI Gold standards, covering both the domestic and commercial market. We specialise in the following systems:
              </p>
            </div>
            <ul className={`list-disc list-inside space-y-2 mb-6 ${mutedClass}`}>
              {SYSTEM_TYPES.map((name, i) => (
                <li key={i}>{name}</li>
              ))}
            </ul>
            <p className={`${mutedClass}`}>
              By installing a fire alarm system which will give you an early warning of the outbreak of fire, an effective alarm can prevent a small incident becoming a total devastation.
            </p>
          </div>
        </section>

        <div className="w-full h-[0.75px] bg-black dark:bg-white" />

        {/* We are BAFE Accredited */}
        <section className="py-12 lg:py-16" style={bgStyle}>
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className={`text-3xl font-bold mb-8 font-title ${textClass}`}>
              We are BAFE Accredited
            </h2>
            <div className={`space-y-4 ${mutedClass}`}>
              <p>
                BAFE (British Approvals for Fire Equipment) is an independent British organisation that publishes and maintains a national register of competent fire safety service providers. We are proud to be BAFE accredited.
              </p>
              <p>
                BAFE registration is very important for those in the UK fire safety and protection industry. Many organisations now require BAFE registration from those who install or maintain their fire safety systems, products and services. For many working in the fire and protection industry, BAFE registration is a commercial imperative.
              </p>
              <p>
                The BAFE register also brings customers together with companies they can trust, with a directory of independently audited and approved providers. If you would like to know more you can view our BAFE registration online.
              </p>
            </div>
            <p className={`mt-6 font-semibold ${textClass}`}>
              BAFE Fire Safety Register Registered Organisation 301168
            </p>
          </div>
        </section>

        <div className="w-full h-[0.75px] bg-black dark:bg-white" />

        {/* Our Fire Alarm System Customers */}
        <section className="py-12 lg:py-16" style={bgStyle}>
          <div className="container mx-auto px-6">
            <h2 className={`text-3xl font-bold mb-4 font-title text-center ${textClass}`}>
              Our Fire Alarm System Customers
            </h2>
            <p className={`text-center max-w-2xl mx-auto mb-12 ${mutedClass}`}>
              A small selection of some of our fire alarm system customers:
            </p>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
              {FIRE_CUSTOMERS.map((c, i) => (
                <div
                  key={i}
                  className={`text-center p-6 rounded-xl min-w-[180px] ${isDark ? "bg-white/5 border border-gray-700" : "bg-gray-50 border border-gray-200"}`}
                >
                  <p className={`font-semibold ${textClass}`}>{c.name}</p>
                  <p className={`text-sm mt-1 ${mutedClass}`}>{c.tagline}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="w-full h-[0.75px] bg-black dark:bg-white" />

        {/* Our Fire Alarm System Installations */}
        <section className="py-12 lg:py-16" style={bgStyle}>
          <div className="container mx-auto px-6">
            <h2 className={`text-3xl font-bold mb-4 font-title text-center ${textClass}`}>
              Our Fire Alarm System Installations
            </h2>
            <p className={`text-center max-w-2xl mx-auto mb-12 ${mutedClass}`}>
              Examples of fire alarm systems that we have installed for our customers:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {FIRE_INSTALLATIONS.map((item, index) => (
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

        <div className="w-full h-[0.75px] bg-black dark:bg-white" />

        {/* Fire Alarm & Detection Systems Equipment */}
        <section className="py-12 lg:py-16" style={bgStyle}>
          <div className="container mx-auto px-6">
            <h2 className={`text-3xl font-bold mb-2 font-title text-center ${textClass}`}>
              Fire Alarm & Detection Systems Equipment
            </h2>
            <p className={`text-center max-w-2xl mx-auto mb-12 ${mutedClass}`}>
              We are proud to install fire alarm technology from the world's leading brands
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
              {FIRE_BRANDS.map((name, i) => (
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

        {/* Do all businesses need a fire alarm system? */}
        <section className="py-12 lg:py-16" style={bgStyle}>
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className={`text-3xl font-bold mb-6 font-title ${textClass}`}>
              Do all businesses need a fire alarm system?
            </h2>
            <div className={`space-y-4 ${mutedClass}`}>
              <p>
                Current UK fire alarm regulations state that all business premises must have "an appropriate fire detection system". This basically means that if a fire breaks out, could it easily be detected and could the people within the building easily be told about it?
              </p>
              <p>
                This doesn't mean that all business premises need a fire alarm system. Try asking yourself the following questions to demonstrate potential situations:
              </p>
            </div>
            <ul className={`list-disc list-inside space-y-2 my-6 ${mutedClass}`}>
              {REGULATION_QUESTIONS.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ul>
            <p className={`${mutedClass}`}>
              If your answer to one or more of these questions is "no" then it's likely that you do need a fire alarm system. Our free survey will help to decide the level of protection you need.
            </p>
            <div className="mt-8">
              <CustomPillButton href="/contact" size="md">
                Get a free survey
              </CustomPillButton>
            </div>
          </div>
        </section>

        <div className="w-full h-[0.75px] bg-black dark:bg-white" />

        <RequestFreeSurvey title={FIRE_SURVEY_TITLE} description={FIRE_SURVEY_DESCRIPTION} />
      </div>
    </div>
  );
}
