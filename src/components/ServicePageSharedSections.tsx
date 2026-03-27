"use client"

import Image from "next/image"
import { useTheme } from "@/contexts/ThemeContext"
import { CustomPillButton } from "@/components/ui/CustomPillButton"

const CLIENT_LOGO_PATHS = [
  "/Clients/_-01.png",
  "/Clients/_-02.png",
  "/Clients/_-03.png",
  "/Clients/_-04.png",
  "/Clients/_-05.png",
  "/Clients/_-06.png",
  "/Clients/_-07.png",
  "/Clients/_-08.png",
  "/Clients/_-09.png",
  "/Clients/_-10.png",
  "/Clients/_-11.png",
]

export function OurCustomers() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const textClass = isDark ? "text-white" : "text-black"
  const mutedClass = isDark ? "text-gray-300" : "text-gray-600"
  const bgColor = isDark ? "#000000" : "#ffffff"

  return (
    <>
      <div className="w-full h-[0.75px] bg-black dark:bg-white" />
      <section className="py-12 lg:py-16" style={{ backgroundColor: bgColor }}>
        <div className="container mx-auto px-6">
          <h2 className={`text-4xl font-bold mb-6 text-center font-title ${textClass}`}>
            Our Customers
          </h2>
          <p className={`text-center max-w-2xl mx-auto mb-12 ${mutedClass}`}>
            A small selection of some of our customers:
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
            {CLIENT_LOGO_PATHS.map((src, i) => (
              <div
                key={i}
                className={`relative flex items-center justify-center w-28 h-16 sm:w-32 sm:h-20 rounded-lg overflow-hidden ${isDark ? "bg-white/5" : "bg-gray-100"}`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="128px"
                  className="object-contain p-2"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

type RequestFreeSurveyProps = {
  title?: string
  description?: string
}

const DEFAULT_SURVEY_TITLE = "Request Your Free Survey"
const DEFAULT_SURVEY_DESCRIPTION = "Not sure what kind of system you need? We offer a free, no obligation survey to ascertain the type of system that best suits your needs. This ensures the systems we provide offer the most efficient and convenient way of securing your building and assets. Simply contact us for a no-obligation chat about your individual requirements."

export function RequestFreeSurvey({ title = DEFAULT_SURVEY_TITLE, description = DEFAULT_SURVEY_DESCRIPTION }: RequestFreeSurveyProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const textClass = isDark ? "text-white" : "text-black"
  const mutedClass = isDark ? "text-gray-300" : "text-gray-600"
  const bgColor = isDark ? "#000000" : "#ffffff"

  return (
    <>
      <div className="w-full h-[0.75px] bg-black dark:bg-white" />
      <section className="py-12 lg:py-16" style={{ backgroundColor: bgColor }}>
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className={`text-4xl font-bold mb-6 font-title ${textClass}`}>
              {title}
            </h2>
            <p className={`text-lg mb-8 leading-relaxed ${mutedClass}`}>
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CustomPillButton href="/contact" size="md">
                Get a free quote
              </CustomPillButton>
              <CustomPillButton href="tel:02045685986" size="md" variant="outline">
                Call 020 4568 5986
              </CustomPillButton>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
