"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState, type ReactNode } from "react"
import { Phone, Mail, MapPin, ChevronUp, ChevronDown, Award } from "lucide-react"
import { ApxSocialLinks } from "@/components/ApxSocialLinks"
import { careerApplyHref } from "@/components/careers/careers-types"
import { FS_CAREER_ROLES } from "@/data/fsCareersRoles"
import { FS_CORE_SERVICE_LINKS } from "@/lib/fs-service-navigation"
import { getLatestNewsArticle, NEWS_HUB_PATH } from "@/data/fsNewsArticles"

const FOOTER_ACCREDITATIONS = [
  "NSI Gold, Security",
  "NSI Fire Gold",
  "BAFE Registered",
  "Constructionline Gold",
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

function isTransparentBg(color: string) {
  return !color || color === "transparent" || color === "rgba(0, 0, 0, 0)"
}

function ownBackgroundColor(el: Element | null): string | null {
  if (!el) return null
  const bg = getComputedStyle(el as HTMLElement).backgroundColor
  return isTransparentBg(bg) ? null : bg
}

/** Walk up until a real painted background is found. */
function effectiveBackgroundColor(el: Element | null): string | null {
  let node = el as HTMLElement | null
  while (node && node !== document.documentElement) {
    const own = ownBackgroundColor(node)
    if (own) return own
    node = node.parentElement
  }
  return null
}

/**
 * Colour of the band above the footer — used behind the rounded top corners
 * so the join matches whatever section precedes the footer on each page.
 */
function resolvePrecedeBackground(wrapper: HTMLElement): string {
  const rect = wrapper.getBoundingClientRect()
  const sampleY = Math.max(1, Math.min(window.innerHeight - 1, rect.top - 2))
  // Prefer left edge (avoid logo bridge in the centre); only when footer is near viewport
  if (rect.top < window.innerHeight + 80 && rect.top > -40) {
    const hit = document.elementFromPoint(8, sampleY)
    if (hit && !wrapper.contains(hit)) {
      const fromPoint = effectiveBackgroundColor(hit)
      if (fromPoint) return fromPoint
    }
  }

  const main = document.querySelector("main")
  if (main) {
    // Last section in document order that paints its own background
    const sections = main.querySelectorAll("section")
    for (let i = sections.length - 1; i >= 0; i--) {
      const own = ownBackgroundColor(sections[i])
      if (own) return own
    }

    // Fallback: depth-first from the end of main
    const stack: Element[] = [main]
    let lastOwn: string | null = null
    while (stack.length) {
      const node = stack.pop()!
      const own = ownBackgroundColor(node)
      if (own && node !== main) lastOwn = own
      for (let i = 0; i < node.children.length; i++) stack.push(node.children[i])
    }
    if (lastOwn) return lastOwn
  }

  return getComputedStyle(document.body).backgroundColor || "#0a0a0a"
}

function FooterUnderline() {
  return <span className="footer-link-underline" aria-hidden />
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative inline-block w-fit max-w-full cursor-pointer pb-1 text-base transition-colors hover:text-white md:text-sm"
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

type FooterAccordionId = "services" | "menu" | "careers" | "accreditations" | "news" | "contact"

function FooterMobileAccordion({
  id,
  title,
  openId,
  onToggle,
  children,
}: {
  id: FooterAccordionId
  title: string
  openId: FooterAccordionId | null
  onToggle: (id: FooterAccordionId) => void
  children: ReactNode
}) {
  const open = openId === id
  return (
    <div className="border-b border-white/15">
      <button
        type="button"
        className="footer-mobile-acc-trigger flex w-full items-center justify-between gap-3 py-4 text-left"
        aria-expanded={open}
        onClick={() => onToggle(id)}
      >
        <span className="text-lg font-semibold tracking-tight text-white">{title}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-white/70 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          strokeWidth={1.75}
          aria-hidden
        />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <div className="pb-5 pt-0">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const latestNews = getLatestNewsArticle()
  const [mobileOpen, setMobileOpen] = useState<FooterAccordionId | null>("services")

  const toggleMobileSection = (id: FooterAccordionId) => {
    setMobileOpen((prev) => (prev === id ? null : id))
  }

  const scrollFooterIntoView = () => {
    const wrapper = wrapperRef.current
    if (wrapper) {
      wrapper.style.setProperty("--footer-precede-bg", resolvePrecedeBackground(wrapper))
    }
    setTimeout(() => {
      footerRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
    }, 200)
  }

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    let cancelled = false

    const sync = () => {
      if (cancelled) return
      try {
        wrapper.style.setProperty("--footer-precede-bg", resolvePrecedeBackground(wrapper))
      } catch {
        /* ignore sample errors during route transitions */
      }
    }

    sync()
    const t1 = window.setTimeout(sync, 50)
    const t2 = window.setTimeout(sync, 300)
    const raf = requestAnimationFrame(sync)

    const onScroll = () => sync()
    // Page scroll may be on documentElement (PremiumScroll), not window
    document.addEventListener("scroll", onScroll, { passive: true, capture: true })
    window.addEventListener("resize", sync)

    const main = document.querySelector("main")
    const mo =
      main &&
      new MutationObserver(() => {
        requestAnimationFrame(sync)
      })
    mo?.observe(main, { childList: true, subtree: true, attributes: true, attributeFilter: ["class", "style"] })

    return () => {
      cancelled = true
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      cancelAnimationFrame(raf)
      document.removeEventListener("scroll", onScroll, true)
      window.removeEventListener("resize", sync)
      mo?.disconnect()
    }
  }, [pathname])

  return (
    <div ref={wrapperRef} className="footer-outer-wrapper">
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
            {/* Mobile: centred accordion menu */}
            <div className="footer-mobile-acc md:hidden">
              <div className="mx-auto flex max-w-md flex-col items-center text-center">
                <h4 className="text-xl font-semibold tracking-tight">APX Fire &amp; Security</h4>
                <p className="mt-3 text-base leading-relaxed text-white/70">
                  Fire, life-safety and security systems across London and the Home Counties. Heritage dating back to
                  1986.
                </p>
                <ApxSocialLinks
                  className="mt-5 flex justify-center gap-6"
                  iconClassName="h-6 w-6"
                  linkClassName="cursor-pointer text-white opacity-55 transition-opacity duration-200 hover:opacity-100 focus-visible:opacity-100"
                />
                <div className="mt-6 flex w-full flex-col items-center gap-3">
                  <FooterContactLink href="tel:02083032280" className="justify-center text-base">
                    <Phone className="h-5 w-5 shrink-0" />
                    <FooterContactText className="text-base font-medium">020 8303 2280</FooterContactText>
                  </FooterContactLink>
                  <FooterContactLink href="mailto:enquiries@apx-fs.co.uk" className="justify-center text-base">
                    <Mail className="h-5 w-5 shrink-0" />
                    <FooterContactText className="min-w-0 break-all text-base font-medium">
                      enquiries@apx-fs.co.uk
                    </FooterContactText>
                  </FooterContactLink>
                </div>
              </div>

              <div className="mx-auto mt-8 w-full max-w-md border-t border-white/15">
                <FooterMobileAccordion
                  id="services"
                  title="Services"
                  openId={mobileOpen}
                  onToggle={toggleMobileSection}
                >
                  <ul className="flex flex-col items-center gap-3 text-center text-base text-white/75">
                    {FS_CORE_SERVICE_LINKS.map(({ label, href }) => (
                      <li key={href}>
                        <FooterLink href={href}>{label}</FooterLink>
                      </li>
                    ))}
                  </ul>
                </FooterMobileAccordion>

                <FooterMobileAccordion id="menu" title="Explore" openId={mobileOpen} onToggle={toggleMobileSection}>
                  <ul className="flex flex-col items-center gap-3 text-center text-base text-white/75">
                    <li>
                      <FooterLink href="/services">Services</FooterLink>
                    </li>
                    <li>
                      <FooterLink href="/about">About</FooterLink>
                    </li>
                    <li>
                      <FooterLink href="/projects">Projects</FooterLink>
                    </li>
                    <li>
                      <FooterLink href="/locations">Locations</FooterLink>
                    </li>
                    <li>
                      <FooterLink href="/contact">Contact</FooterLink>
                    </li>
                    <li>
                      <FooterLink href="/accreditations">Accreditations</FooterLink>
                    </li>
                  </ul>
                </FooterMobileAccordion>

                <FooterMobileAccordion
                  id="careers"
                  title="Careers"
                  openId={mobileOpen}
                  onToggle={toggleMobileSection}
                >
                  <ul className="flex flex-col items-center gap-3 text-center text-base text-white/75">
                    <li>
                      <FooterLink href="/careers">View all careers</FooterLink>
                    </li>
                    {FS_CAREER_ROLES.map((role) => (
                      <li key={role.id}>
                        <FooterLink href={careerApplyHref(role.id)}>{role.title}</FooterLink>
                      </li>
                    ))}
                  </ul>
                </FooterMobileAccordion>

                <FooterMobileAccordion
                  id="accreditations"
                  title="Accreditations"
                  openId={mobileOpen}
                  onToggle={toggleMobileSection}
                >
                  <ul className="flex flex-col items-center gap-3 text-center text-base text-white/75">
                    {FOOTER_ACCREDITATIONS.map((item) => (
                      <li key={item} className="flex items-center justify-center gap-2">
                        <Award className="h-4 w-4 shrink-0 text-white/70" strokeWidth={1.75} aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <nav
                    aria-label="Accreditation logos"
                    className="footer-accred-logos mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-3"
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
                          className="h-8 w-auto max-w-[5.25rem] object-contain object-center"
                          loading="lazy"
                          decoding="async"
                        />
                      </Link>
                    ))}
                  </nav>
                </FooterMobileAccordion>

                <FooterMobileAccordion id="news" title="News" openId={mobileOpen} onToggle={toggleMobileSection}>
                  <ul className="flex flex-col items-center gap-3 text-center text-base text-white/75">
                    <li>
                      <FooterLink href={`/news/${latestNews.slug}`}>See latest</FooterLink>
                    </li>
                    <li>
                      <FooterLink href={NEWS_HUB_PATH}>See all news</FooterLink>
                    </li>
                  </ul>
                </FooterMobileAccordion>

                <FooterMobileAccordion
                  id="contact"
                  title="Visit us"
                  openId={mobileOpen}
                  onToggle={toggleMobileSection}
                >
                  <div className="flex flex-col items-center gap-3 text-center text-base text-white/75">
                    <FooterContactLink
                      href="https://maps.google.com/?q=365-369+Bexley+Road+Northumberland+Heath+Erith+Kent+DA8+3EZ"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="items-start justify-center"
                    >
                      <MapPin className="mt-0.5 h-5 w-5 shrink-0" />
                      <FooterContactText className="min-w-0 text-base leading-relaxed">
                        <span className="block">365-369 Bexley Road</span>
                        <span className="block">Erith, Kent DA8 3EZ</span>
                      </FooterContactText>
                    </FooterContactLink>
                    <p className="pt-1 text-sm leading-relaxed text-white/55">
                      Company no. 04915204
                      <span className="mt-1 block">Registered office: Hastings, East Sussex</span>
                    </p>
                  </div>
                </FooterMobileAccordion>
              </div>
            </div>

            {/* Tablet / desktop: full columns */}
            <div className="footer-columns hidden w-full min-w-0 grid-cols-1 gap-10 text-left sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 md:grid lg:items-stretch lg:gap-x-5 xl:gap-x-6">
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

              {/* Services */}
              <div className="flex min-w-0 flex-col items-start space-y-6">
                <h4 className="text-xl font-semibold">Services</h4>
                <ul className="footer-services-list grid w-full max-w-sm grid-cols-2 gap-x-4 gap-y-2 text-left text-gray-400 sm:flex sm:max-w-none sm:flex-col sm:items-start sm:gap-0 sm:space-y-2">
                  {FS_CORE_SERVICE_LINKS.map(({ label, href }) => (
                    <li key={href} className="min-w-0 text-left">
                      <FooterLink href={href}>{label}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Menu + Careers */}
              <div className="flex min-w-0 flex-col items-start space-y-10">
                <div className="flex w-full min-w-0 flex-col items-start space-y-6">
                  <h4 className="text-xl font-semibold">Menu</h4>
                  <ul className="flex flex-col items-start space-y-3 text-gray-400">
                    <li>
                      <FooterLink href="/services">Services</FooterLink>
                    </li>
                    <li>
                      <FooterLink href="/about">About</FooterLink>
                    </li>
                    <li>
                      <FooterLink href="/projects">Projects</FooterLink>
                    </li>
                    <li>
                      <FooterLink href="/locations">Locations</FooterLink>
                    </li>
                    <li>
                      <FooterLink href="/contact">Contact</FooterLink>
                    </li>
                    <li>
                      <FooterLink href="/accreditations">Accreditations</FooterLink>
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

              {/* Accreditations + News */}
              <div className="flex min-w-0 flex-col items-start space-y-10">
                <div className="flex w-full min-w-0 flex-col items-start space-y-6">
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
          </div>

          <div className="footer-legal border-t border-t-white/10 site-container py-8 pb-28 text-left text-gray-500 md:pb-8">
            <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-left lg:flex-row lg:items-end lg:justify-between lg:gap-6">
              <div className="footer-legal-stack flex w-full min-w-0 max-w-md flex-col items-center gap-5 md:max-w-xl md:items-start lg:max-w-none">
                <p className="footer-legal-copy text-pretty text-center text-xs leading-relaxed text-inherit md:text-left sm:text-sm">
                  &copy; {new Date().getFullYear()} APX Fire &amp; Security Ltd.
                  <span className="mx-1.5 hidden text-white/35 md:inline" aria-hidden>
                    ·
                  </span>
                  <span className="mt-1 block md:mt-0 md:inline">Company no. 04915204.</span>{" "}
                  <span className="mt-1 block md:mt-0 md:inline">All rights reserved.</span>
                </p>
                <nav
                  aria-label="Legal"
                  className="footer-legal-links grid w-full grid-cols-1 gap-y-3 text-sm leading-snug md:flex md:max-w-full md:flex-wrap md:items-center md:justify-start md:gap-x-3 md:gap-y-2 md:text-sm"
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
              <span className="footer-level-line shrink-0 text-xs opacity-80">
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
      </footer>
    </div>
  )
}
