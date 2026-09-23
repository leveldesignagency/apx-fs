"use client"

import Link from "next/link"
import Image from "next/image"
import { useRef, type ReactNode } from "react"
import { Phone, Mail, MapPin, ChevronUp, Award } from "lucide-react"
import { ApxSocialLinks } from "@/components/ApxSocialLinks"
import { careerApplyHref } from "@/components/careers/careers-types"
import { FS_CAREER_ROLES } from "@/data/fsCareersRoles"
import { FS_CORE_SERVICE_LINKS } from "@/lib/fs-service-navigation"
import { getLatestNewsArticle, NEWS_HUB_PATH } from "@/data/fsNewsArticles"

const FOOTER_ACCREDITATIONS = [
  "NSI Gold, Security",
  "NSI Fire Gold",
  "BAFE Fire Safety Registered",
  "Constructionline Gold Member",
  "FIA Full Member",
  "BS EN ISO 9001:2015",
] as const

/** Public folder uses a space in "accreditations mono" */
const ACC_MONO = "/accreditations mono"
const FOOTER_ACCREDITATION_LOGOS = [
  { href: "/accreditations/nsi", src: `${ACC_MONO}/Coloured/NSI-01.png`, alt: "NSI Gold" },
  { href: "/accreditations/bafe", src: `${ACC_MONO}/Coloured/BAFE-01.svg`, alt: "BAFE" },
  { href: "/accreditations/constructionline", src: `${ACC_MONO}/Coloured/ConstructionOnline-01.svg`, alt: "Constructionline" },
  { href: "/accreditations/fia", src: `${ACC_MONO}/Coloured/FIA-01.svg`, alt: "FIA" },
] as const

function FooterUnderline() {
  return (
    <span
      className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-white transition-transform duration-500 group-hover:scale-x-100"
      aria-hidden
    />
  )
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative inline-block w-fit max-w-full cursor-pointer pb-1 text-sm transition-colors hover:text-white"
    >
      {children}
      <FooterUnderline />
    </Link>
  )
}

type FooterContactLinkProps = {
  href: string
  children: ReactNode
  className?: string
  target?: string
  rel?: string
}

function FooterContactLink({ href, children, className, target, rel }: FooterContactLinkProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`group flex cursor-pointer items-center gap-3 transition-colors hover:text-white sm:gap-4 sm:justify-start ${className ?? ""}`}
      style={{ cursor: "pointer !important" }}
    >
      {children}
    </a>
  )
}

function FooterContactText({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={`relative inline-block w-fit max-w-full pb-1 ${className ?? ""}`}>
      {children}
      <FooterUnderline />
    </span>
  )
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const latestNews = getLatestNewsArticle()

  const scrollFooterIntoView = () => {
    setTimeout(() => {
      footerRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
    }, 200)
  }

  return (
    <div className="footer-outer-wrapper">
      <div className="footer-black-fill" aria-hidden />
      <footer
        ref={footerRef}
        className="footer-expand-wrapper text-white relative z-10"
        onMouseEnter={scrollFooterIntoView}
      >
        <div className="footer-head relative flex min-h-[6rem] items-end justify-center overflow-visible site-gutter-x">
          <div className="footer-logo-bridge absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
            <Link href="/" className="flex cursor-pointer items-center">
              <Image
                src="/__APX_FS_Footer.svg"
                alt="APX Fire & Security Logo"
                width={280}
                height={94}
                className="h-28 w-auto sm:h-32"
              />
            </Link>
          </div>
          <div className="footer-hint flex max-w-full flex-wrap items-center justify-center gap-2 px-0 pb-3 text-center opacity-70">
            <span className="hidden text-xs uppercase tracking-wide sm:inline">Hover to expand</span>
            <ChevronUp className="h-4 w-4 shrink-0 footer-chevron" />
          </div>
        </div>

        <div className="footer-expand">
          <div className="site-container py-12 pt-16 pb-28 md:pb-12">
            <div className="footer-columns grid w-full min-w-0 grid-cols-1 gap-10 text-left sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:items-stretch lg:gap-x-6 xl:gap-x-8">
              {/* Company */}
              <div className="flex min-w-0 flex-col items-start space-y-6">
                <h4 className="text-xl font-semibold">APX Fire &amp; Security</h4>
                <div className="max-w-md space-y-4 text-left text-gray-400 sm:max-w-none">
                  <p className="text-sm leading-relaxed">
                    Building on a heritage dating back to 1986, APX Fire &amp; Security Limited (formerly Smiths Technical
                    Systems Ltd) provides the design, installation and maintenance of integrated fire, life-safety and
                    security systems across London and the Home Counties.
                  </p>
                  <p className="text-sm leading-relaxed">
                    Our extensive knowledge and decades of real-world experience allow us to deliver high-quality
                    systems across commercial and public-sector projects.
                  </p>
                </div>
                <ApxSocialLinks
                  className="flex justify-start gap-5 sm:gap-6"
                  iconClassName="h-6 w-6"
                  linkClassName="cursor-pointer text-white opacity-50 transition-opacity duration-200 hover:opacity-100 focus-visible:opacity-100"
                />
              </div>

              {/* Integrated Security Systems */}
              <div className="flex min-w-0 flex-col items-start space-y-6">
                <h4 className="text-xl font-semibold">Integrated Security Systems</h4>
                <ul className="footer-services-list grid w-full max-w-sm grid-cols-2 gap-x-4 gap-y-2 text-left text-gray-400 sm:flex sm:max-w-none sm:flex-col sm:items-start sm:gap-0 sm:space-y-2">
                  {FS_CORE_SERVICE_LINKS.map(({ label, href }) => (
                    <li key={href} className="min-w-0 text-left">
                      <FooterLink href={href}>{label}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Our Accreditations */}
              <div className="flex min-w-0 flex-col items-start space-y-6">
                <h4 className="text-xl font-semibold">Accreditations &amp; Memberships</h4>
                <ul className="flex w-full max-w-sm flex-col items-start space-y-3 text-gray-400 sm:max-w-none">
                  {FOOTER_ACCREDITATIONS.map((item) => (
                    <li
                      key={item}
                      className="flex items-start justify-start gap-2.5 text-left text-sm leading-relaxed"
                    >
                      <Award className="mt-0.5 h-4 w-4 shrink-0 text-white/70" strokeWidth={1.75} aria-hidden />
                      <span className="min-w-0">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* News and Articles + Careers */}
              <div className="flex min-w-0 flex-col items-start space-y-10">
                <div className="flex w-full min-w-0 flex-col items-start space-y-6">
                  <h4 className="text-xl font-semibold">News and Articles</h4>
                  <ul className="flex flex-col items-start space-y-3 text-gray-400">
                    <li>
                      <FooterLink href={`/news/${latestNews.slug}`}>See latest</FooterLink>
                    </li>
                    <li>
                      <FooterLink href={NEWS_HUB_PATH}>See all news</FooterLink>
                    </li>
                  </ul>
                </div>

                <div className="flex w-full min-w-0 flex-col items-start space-y-6">
                  <h4 className="text-xl font-semibold">Careers</h4>
                  <ul className="flex flex-col items-start space-y-3 text-gray-400">
                    <li>
                      <FooterLink href="/careers">View all careers</FooterLink>
                    </li>
                    {FS_CAREER_ROLES.map((role) => (
                      <li key={role.id}>
                        <FooterLink href={careerApplyHref(role.id)}>{role.title}</FooterLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Contact Details */}
              <div className="flex min-w-0 flex-col items-start gap-6 lg:h-full">
                <h4 className="text-xl font-semibold">Contact Details</h4>
                <div className="flex w-full max-w-full flex-col items-start space-y-4 text-left text-gray-400">
                  <FooterContactLink href="tel:02083032280" className="justify-start">
                    <Phone className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
                    <FooterContactText className="text-sm">020 8303 2280</FooterContactText>
                  </FooterContactLink>
                  <FooterContactLink href="mailto:enquiries@apx-fs.co.uk" className="justify-start">
                    <Mail className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
                    <FooterContactText className="min-w-0 break-all text-sm">enquiries@apx-fs.co.uk</FooterContactText>
                  </FooterContactLink>
                  <FooterContactLink
                    href="https://maps.google.com/?q=365-369+Bexley+Road+Northumberland+Heath+Erith+Kent+DA8+3EZ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="items-start justify-start"
                  >
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 sm:mt-1 sm:h-6 sm:w-6" />
                    <FooterContactText className="min-w-0 text-sm leading-relaxed">
                      <span className="block">365-369 Bexley Road</span>
                      <span className="block">Erith, Kent</span>
                      <span className="block">DA8 3EZ</span>
                    </FooterContactText>
                  </FooterContactLink>
                  <div className="pl-8 text-sm leading-relaxed sm:pl-10">
                    <p>
                      <span className="font-semibold text-gray-300">Company number</span> 04915204
                    </p>
                    <p className="mt-2">
                      <span className="font-semibold text-gray-300">Registered office</span>
                      <span className="mt-0.5 block">Springhaven, 1a Barnfield Close,</span>
                      <span className="block">Hastings, East Sussex, TN34 1TS</span>
                    </p>
                  </div>
                </div>
                <nav
                  aria-label="Accreditations and memberships"
                  className="footer-accred-logos mt-2 flex w-full flex-wrap items-center justify-start gap-x-3 gap-y-3 lg:mt-auto lg:justify-end"
                >
                  {FOOTER_ACCREDITATION_LOGOS.map(({ href, src, alt }) => (
                    <Link
                      key={href}
                      href={href}
                      className="footer-accred-logos__link inline-flex h-9 items-center opacity-85 transition-opacity duration-200 hover:opacity-100 focus-visible:opacity-100"
                      aria-label={`${alt}, view accreditation page`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt=""
                        width={120}
                        height={48}
                        className="h-8 w-auto max-w-[5.25rem] object-contain object-center sm:h-9 sm:max-w-[5.75rem]"
                        loading="lazy"
                        decoding="async"
                      />
                    </Link>
                  ))}
                </nav>
              </div>
            </div>

            <div className="footer-legal mt-14 border-t border-t-white/10 pt-8 text-left text-gray-500 md:mt-16">
              <div className="flex flex-col items-start gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
                <div className="footer-legal-stack flex w-full min-w-0 max-w-xl flex-col items-start gap-3 lg:max-w-none">
                  <p className="footer-legal-copy text-pretty text-left text-xs leading-relaxed text-inherit sm:text-sm">
                    &copy; {new Date().getFullYear()} APX Fire &amp; Security Ltd.
                    <span className="mx-1.5 hidden text-white/35 sm:inline" aria-hidden>
                      ·
                    </span>
                    <span className="mt-1 block sm:mt-0 sm:inline">Company no. 04915204.</span>{" "}
                    <span className="mt-1 block sm:mt-0 sm:inline">All rights reserved.</span>
                  </p>
                  <nav
                    aria-label="Legal"
                    className="footer-legal-links flex max-w-full flex-wrap items-center justify-start gap-x-3 gap-y-2 text-xs leading-snug sm:text-sm"
                  >
                    <Link
                      href="/privacy"
                      className="group relative inline-block cursor-pointer pb-0.5 transition-colors hover:text-white"
                    >
                      Privacy Policy
                      <FooterUnderline />
                    </Link>
                    <Link
                      href="/cookie-policy"
                      className="group relative inline-block cursor-pointer pb-0.5 transition-colors hover:text-white"
                    >
                      Cookie Policy
                      <FooterUnderline />
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        window.dispatchEvent(new Event("apx:open-cookie-settings"))
                      }}
                      className="footer-cookie-prefs-btn group relative inline-block cursor-pointer border-0 bg-transparent p-0 pb-0.5 text-inherit transition-colors hover:text-white"
                    >
                      Cookie Preferences
                      <FooterUnderline />
                    </button>
                    <Link
                      href="/terms"
                      className="group relative inline-block cursor-pointer pb-0.5 transition-colors hover:text-white"
                    >
                      Terms of Service
                      <FooterUnderline />
                    </Link>
                    <Link
                      href="/accessibility"
                      className="group relative inline-block cursor-pointer pb-0.5 transition-colors hover:text-white"
                    >
                      Accessibility
                      <FooterUnderline />
                    </Link>
                    <Link
                      href="/recruitment-privacy"
                      className="group relative inline-block cursor-pointer pb-0.5 transition-colors hover:text-white"
                    >
                      Recruitment Privacy
                      <FooterUnderline />
                    </Link>
                  </nav>
                </div>
                <span className="shrink-0 text-xs opacity-80">
                  <span className="transition-opacity duration-200 hover:opacity-100">Designed by </span>
                  <a
                    href="https://www.leveldesignagency.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-level-credit font-bold opacity-80 transition-colors duration-200 hover:opacity-100"
                  >
                    LEVEL DESIGN AGENCY LTD
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
