"use client"

import Link from "next/link"
import Image from "next/image"
import { useRef } from "react"
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, ChevronUp } from "lucide-react"
export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  const scrollFooterIntoView = () => {
    setTimeout(() => {
      footerRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
    }, 200)
  }

  return (
    <div className="footer-outer-wrapper">
      {/* Square-edged black fill behind footer so hero never shows through; sibling keeps footer border/radius intact */}
      <div className="footer-black-fill" aria-hidden />
      <footer
        ref={footerRef}
        className="footer-expand-wrapper text-white relative z-10"
        onMouseEnter={scrollFooterIntoView}
      >
      {/* Top strip: logo (over junction) + hover hint — centred on narrow viewports */}
      <div className="footer-head relative flex min-h-[6rem] items-end justify-center overflow-visible px-4 sm:px-6">
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
        <div className="footer-hint flex max-w-full flex-wrap items-center justify-center gap-2 px-1 pb-3 text-center opacity-70 sm:px-0">
          <span className="text-xs uppercase tracking-wide">Hover to expand</span>
          <ChevronUp className="h-4 w-4 shrink-0 footer-chevron" />
        </div>
      </div>

      {/* Expandable content: visible on footer hover */}
      <div className="footer-expand">
        <div className="container mx-auto w-full min-w-0 max-w-7xl px-4 py-12 pt-16 sm:px-6">
          <div className="grid w-full min-w-0 grid-cols-1 gap-10 text-left md:grid-cols-4 md:gap-x-8 md:gap-y-12 lg:gap-x-10">
            {/* Company Info */}
            <div className="min-w-0 space-y-6">
              <p className="text-left text-gray-400 leading-relaxed">
                APX Fire and Security is a specialist provider of fire and security system installation, commissioning, and maintenance.
              </p>
              <div className="flex justify-center gap-6 sm:justify-start">
                <Facebook className="h-6 w-6 cursor-pointer transition-colors hover:text-white" />
                <Instagram className="h-6 w-6 cursor-pointer transition-colors hover:text-white" />
                <Linkedin className="h-6 w-6 cursor-pointer transition-colors hover:text-white" />
              </div>
            </div>

            {/* Services (no extra horizontal inset on mobile — was pl-8, misaligned vs other columns) */}
            <div className="min-w-0 space-y-6">
              <h4 className="text-xl font-semibold">Services</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/services/electrical-systems" className="relative group hover:text-white transition-colors text-sm cursor-pointer pb-1">CCTV Systems<span className="absolute bottom-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: 'white' }}></span></Link></li>
                <li><Link href="/services/energy-efficiency" className="relative group hover:text-white transition-colors text-sm cursor-pointer pb-1">Access Control Systems<span className="absolute bottom-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: 'white' }}></span></Link></li>
                <li><Link href="/services/sustainability" className="relative group hover:text-white transition-colors text-sm cursor-pointer pb-1">Intruder Alarm Systems<span className="absolute bottom-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: 'white' }}></span></Link></li>
                <li><Link href="/services/mechanical-engineering" className="relative group hover:text-white transition-colors text-sm cursor-pointer pb-1">Fire Alarm Systems<span className="absolute bottom-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: 'white' }}></span></Link></li>
                <li><Link href="/services/maintenance" className="relative group hover:text-white transition-colors text-sm cursor-pointer pb-1">Video Door Entry Systems<span className="absolute bottom-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: 'white' }}></span></Link></li>
                <li><Link href="/services/refuge-disabled-communication" className="relative group hover:text-white transition-colors text-sm cursor-pointer pb-1">Refuge &amp; disabled communication<span className="absolute bottom-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: 'white' }}></span></Link></li>
                <li><Link href="/services/evac-voice-evacuation" className="relative group hover:text-white transition-colors text-sm cursor-pointer pb-1">EVAC &amp; voice evacuation<span className="absolute bottom-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: 'white' }}></span></Link></li>
                <li><Link href="/services/fire-life-safety" className="relative group hover:text-white transition-colors text-sm cursor-pointer pb-1">Fire &amp; life safety (overview)<span className="absolute bottom-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: 'white' }}></span></Link></li>
                <li><Link href="/services/maintenance-support" className="relative group hover:text-white transition-colors text-sm cursor-pointer pb-1">Maintenance &amp; support<span className="absolute bottom-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: 'white' }}></span></Link></li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="min-w-0 space-y-6">
              <h4 className="text-xl font-semibold">Quick Links</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/about" className="relative group hover:text-white transition-colors text-sm cursor-pointer pb-1">About Us<span className="absolute bottom-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: 'white' }}></span></Link></li>
                <li><Link href="/contact" className="relative group hover:text-white transition-colors text-sm cursor-pointer pb-1">Contact<span className="absolute bottom-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: 'white' }}></span></Link></li>
                <li><Link href="/delivery-methodology" className="relative group hover:text-white transition-colors text-sm cursor-pointer pb-1">Delivery methodology<span className="absolute bottom-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: 'white' }}></span></Link></li>
                <li><Link href="/projects" className="relative group hover:text-white transition-colors text-sm cursor-pointer pb-1">Our Projects<span className="absolute bottom-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: 'white' }}></span></Link></li>
                <li><Link href="/accreditations" className="relative group hover:text-white transition-colors text-sm cursor-pointer pb-1">Accreditations<span className="absolute bottom-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: 'white' }}></span></Link></li>
                <li><Link href="/careers" className="relative group hover:text-white transition-colors text-sm cursor-pointer pb-1">Careers<span className="absolute bottom-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: 'white' }}></span></Link></li>
                <li><Link href="/news" className="relative group hover:text-white transition-colors text-sm cursor-pointer pb-1">News<span className="absolute bottom-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: 'white' }}></span></Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="min-w-0 space-y-6">
              <h4 className="text-xl font-semibold">Contact Info</h4>
              <div className="space-y-4 text-left text-gray-400">
                <a
                  href="tel:02083032280"
                  className="flex items-center justify-center gap-4 hover:text-white sm:justify-start"
                  style={{ cursor: "pointer !important" }}
                >
                  <Phone className="h-6 w-6 shrink-0" />
                  <span className="text-sm">020 8303 2280</span>
                </a>
                <a
                  href="mailto:enquiries@apx-fs.co.uk"
                  className="flex items-center justify-center gap-4 break-all hover:text-white sm:justify-start"
                  style={{ cursor: "pointer !important" }}
                >
                  <Mail className="h-6 w-6 shrink-0" />
                  <span className="min-w-0 text-sm">enquiries@apx-fs.co.uk</span>
                </a>
                <a
                  href="https://maps.google.com/?q=365-369+Bexley+Road+Northumberland+Heath+Erith+Kent+DA8+3EZ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start justify-center gap-4 hover:text-white sm:justify-start"
                  style={{ cursor: "pointer !important" }}
                >
                  <MapPin className="mt-1 h-6 w-6 shrink-0" />
                  <div className="min-w-0 text-sm">
                    <p>365-369 Bexley Road</p>
                    <p>Northumberland Heath, Erith</p>
                    <p>Kent, DA8 3EZ</p>
                  </div>
                </a>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-4 sm:justify-start">
                <Image src="/accreditations%20mono/White/NSI-02.svg" alt="NSI Gold" width={96} height={48} className="h-10 w-auto max-w-[95px] opacity-80 hover:opacity-100 transition-opacity duration-300 flex-shrink-0" />
                <Image src="/accreditations%20mono/White/BAFE-02.svg" alt="BAFE" width={96} height={48} className="h-10 w-auto max-w-[95px] opacity-80 hover:opacity-100 transition-opacity duration-300 flex-shrink-0" />
                <Image src="/accreditations%20mono/White/ConstructionOnline-02.svg" alt="Constructionline" width={96} height={48} className="h-10 w-auto max-w-[95px] opacity-80 hover:opacity-100 transition-opacity duration-300 flex-shrink-0" />
                <Image src="/accreditations%20mono/White/FIA-02.svg" alt="FIA" width={96} height={48} className="h-10 w-auto max-w-[95px] opacity-80 hover:opacity-100 transition-opacity duration-300 flex-shrink-0" />
              </div>
            </div>
          </div>

          <div className="mt-16 border-t border-t-white/10 pt-8 text-center text-gray-500 md:text-left">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:items-start">
              <p className="max-w-2xl text-sm leading-relaxed">
                &copy; 2025 APX. All rights reserved. | Privacy Policy | Terms of Service
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
