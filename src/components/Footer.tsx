"use client"

import Link from "next/link"
import Image from "next/image"
import { useRef, type ReactNode } from "react"
import { Phone, Mail, MapPin, ChevronUp } from "lucide-react"
import { ApxSocialLinks } from "@/components/ApxSocialLinks"
import { FS_CORE_SERVICE_LINKS } from "@/lib/fs-service-navigation"
import { getLatestNewsArticle, NEWS_HUB_PATH } from "@/data/fsNewsArticles"

const FOOTER_ACCREDITATIONS = [
  "NSI Gold Accredited",
  "BS EN ISO 9001:2015",
  "BAFE Fire Safety Registered",
  "Constructionline Gold Member",
  "FIA Member",
  "UKAS Quality Management",
  "UKAS Product Certification",
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
      className={`group flex cursor-pointer items-center gap-4 justify-start transition-colors hover:text-white ${className ?? ""}`}
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
        <div className="footer-head relative flex min-h-[6rem] items-end justify-center overflow-visible px-8 sm:px-10 lg:px-12">
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
            <span className="text-xs uppercase tracking-wide">Hover to expand</span>
            <ChevronUp className="h-4 w-4 shrink-0 footer-chevron" />
          </div>
        </div>

        <div className="footer-expand">
          <div className="container mx-auto w-full min-w-0 max-w-7xl px-8 py-12 pt-16 sm:px-10 lg:px-12">
            <div className="footer-columns grid w-full min-w-0 grid-cols-1 gap-10 text-left sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-5 lg:gap-x-8 xl:gap-x-10">
              {/* Company */}
              <div className="min-w-0 space-y-6">
                <h4 className="text-xl font-semibold">APX Fire &amp; Security</h4>
                <div className="space-y-4 text-left text-gray-400">
                  <p className="text-sm leading-relaxed">
                    We have been providing bespoke integrated security systems to London and the Home Counties since 1986.
                  </p>
                  <p className="text-sm leading-relaxed">
                    Our extensive knowledge and decades of real world experience allows us to deliver high quality security
                    systems to the domestic and commercial sector.
                  </p>
                </div>
                <ApxSocialLinks
                  className="flex justify-start gap-6"
                  iconClassName="h-6 w-6"
                  linkClassName="cursor-pointer text-gray-400 transition-colors hover:text-white"
                />
              </div>

              {/* Integrated Security Systems */}
              <div className="min-w-0 space-y-6">
                <h4 className="text-xl font-semibold">Integrated Security Systems</h4>
                <ul className="space-y-3 text-gray-400">
                  {FS_CORE_SERVICE_LINKS.map(({ label, href }) => (
                    <li key={href}>
                      <FooterLink href={href}>{label}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Our Accreditations */}
              <div className="min-w-0 space-y-6">
                <h4 className="text-xl font-semibold">Our Accreditations</h4>
                <ul className="space-y-3 text-gray-400">
                  {FOOTER_ACCREDITATIONS.map((item) => (
                    <li key={item} className="text-sm leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* News and Articles */}
              <div className="min-w-0 space-y-6">
                <h4 className="text-xl font-semibold">News and Articles</h4>
                <ul className="space-y-3 text-gray-400">
                  <li>
                    <FooterLink href={`/news/${latestNews.slug}`}>See latest</FooterLink>
                  </li>
                  <li>
                    <FooterLink href={NEWS_HUB_PATH}>See all news</FooterLink>
                  </li>
                </ul>
              </div>

              {/* Contact Details */}
              <div className="min-w-0 space-y-6">
                <h4 className="text-xl font-semibold">Contact Details</h4>
                <div className="space-y-4 text-left text-gray-400">
                  <FooterContactLink href="tel:02083032280">
                    <Phone className="h-6 w-6 shrink-0" />
                    <FooterContactText className="text-sm">020 8303 2280</FooterContactText>
                  </FooterContactLink>
                  <FooterContactLink href="mailto:enquiries@apx-fs.co.uk">
                    <Mail className="h-6 w-6 shrink-0" />
                    <FooterContactText className="min-w-0 break-all text-sm">enquiries@apx-fs.co.uk</FooterContactText>
                  </FooterContactLink>
                  <FooterContactLink
                    href="https://maps.google.com/?q=365-369+Bexley+Road+Northumberland+Heath+Erith+Kent+DA8+3EZ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="items-start"
                  >
                    <MapPin className="mt-1 h-6 w-6 shrink-0" />
                    <FooterContactText className="min-w-0 text-sm leading-relaxed">
                      <span className="block">365-369 Bexley Road,</span>
                      <span className="block">Northumberland Heath,</span>
                      <span className="block">Erith, Kent, DA8 3EZ</span>
                    </FooterContactText>
                  </FooterContactLink>
                </div>
              </div>
            </div>

            <div className="mt-16 border-t border-t-white/10 pt-8 text-center text-gray-500 md:text-left">
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:items-start">
                <p className="max-w-2xl text-sm leading-relaxed">
                  <span className="text-inherit">&copy; 2025 APX. All rights reserved.</span>
                  <span className="text-inherit" aria-hidden>
                    {" "}|{" "}
                  </span>
                  <Link
                    href="/privacy"
                    className="group relative inline-block w-fit max-w-full cursor-pointer pb-1 transition-colors hover:text-white"
                  >
                    Privacy Policy
                    <FooterUnderline />
                  </Link>
                  <span className="text-inherit" aria-hidden>
                    {" "}|{" "}
                  </span>
                  <Link
                    href="/terms"
                    className="group relative inline-block w-fit max-w-full cursor-pointer pb-1 transition-colors hover:text-white"
                  >
                    Terms of Service
                    <FooterUnderline />
                  </Link>
                </p>
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
