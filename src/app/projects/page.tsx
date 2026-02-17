"use client"

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import { CustomPillButton } from "@/components/ui/CustomPillButton";

const PROJECTS = [
  { title: "King's College Hospital NHS Trust", sector: "Healthcare", description: "Integrated fire alarm, intruder alarm and access control across multiple buildings.", image: "/intruder%20alarm%20systems.jpg" },
  { title: "The Mayfair Townhouse", sector: "Hospitality", description: "Fire detection and CCTV systems for a luxury lifestyle hotel in central London.", image: "/cctv%20systems.jpg" },
  { title: "University of West London", sector: "Education", description: "Fire alarm and security systems across campus premises.", image: "/intruder%20alarm%20systems.jpg" },
  { title: "Camden Council", sector: "Local Authority", description: "Fire and intruder alarm installations for council buildings.", image: "/cctv%20systems.jpg" },
  { title: "Scape Bloomsbury", sector: "Student Accommodation", description: "CCTV, access control and fire systems for student residence.", image: "/intruder%20alarm%20systems.jpg" },
  { title: "Greenwood Centre", sector: "Local Authority", description: "Intruder alarm and security systems for Camden Council.", image: "/cctv%20systems.jpg" },
]

export default function ProjectsPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const textClass = isDark ? "text-white" : "text-black";
  const mutedClass = isDark ? "text-gray-300" : "text-gray-600";
  const bgStyle = { backgroundColor: isDark ? "#000000" : "#ffffff" };

  return (
    <div className="min-h-screen overflow-x-hidden" style={bgStyle}>
      <div className="w-full h-[0.75px] bg-black dark:bg-white" />
      <section className="py-20 lg:py-28 px-6">
        <div className="container mx-auto max-w-6xl">
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold font-title mb-6 ${textClass}`}>
            Our Projects
          </h1>
          <p className={`text-lg md:text-xl max-w-2xl ${mutedClass}`}>
            A selection of fire and security installations we have delivered for commercial, public sector, and domestic clients across London and the Home Counties.
          </p>
        </div>
      </section>

      <div className="w-full h-[0.75px] bg-black dark:bg-white" />

      <section className="py-12 lg:py-16 px-6" style={bgStyle}>
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project, i) => (
              <article
                key={i}
                className={`group rounded-xl overflow-hidden border ${isDark ? "border-gray-700 hover:border-white" : "border-gray-200 hover:border-black"}`}
              >
                <div className="aspect-video relative bg-black/20">
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <p className={`text-sm font-semibold uppercase tracking-wide mb-2 ${mutedClass}`}>{project.sector}</p>
                  <h2 className={`text-xl font-bold mb-2 ${textClass}`}>{project.title}</h2>
                  <p className={`text-sm ${mutedClass}`}>{project.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full h-[0.75px] bg-black dark:bg-white" />

      <section className="py-16 lg:py-20 px-6" style={bgStyle}>
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className={`text-3xl font-bold font-title mb-4 ${textClass}`}>Start Your Project</h2>
          <p className={`text-lg mb-8 ${mutedClass}`}>
            Discuss your fire or security requirements with our team. We offer free surveys and tailored solutions.
          </p>
          <CustomPillButton href="/contact" size="lg">Get in touch</CustomPillButton>
        </div>
      </section>
    </div>
  );
}
