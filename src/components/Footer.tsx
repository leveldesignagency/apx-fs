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
      {/* Top strip: logo (over junction) + hover hint */}
      <div className="footer-head flex items-end justify-center px-6 relative overflow-visible min-h-[6rem]">
        <div className="footer-logo-bridge absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-0">
          <Link href="/" className="flex items-center cursor-pointer block">
            <Image
              src="/__APX_FS_Footer.svg"
              alt="APX Fire & Security Logo"
              width={280}
              height={94}
              className="h-28 sm:h-32 w-auto"
            />
          </Link>
        </div>
        <div className="footer-hint flex items-center gap-2 pb-3 opacity-70">
          <span className="text-xs uppercase tracking-wide">Hover to expand</span>
          <ChevronUp className="w-4 h-4 footer-chevron" />
        </div>
      </div>

      {/* Expandable content: visible on footer hover */}
      <div className="footer-expand">
        <div className="container mx-auto px-6 py-12 pt-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="space-y-6">
              <p className="text-gray-400 leading-relaxed">
                APX Fire and Security is a specialist provider of fire and security system installation, commissioning, and maintenance.
              </p>
              <div className="flex space-x-6">
                <Facebook className="h-6 w-6 hover:text-white cursor-pointer transition-colors" />
                <Instagram className="h-6 w-6 hover:text-white cursor-pointer transition-colors" />
                <Linkedin className="h-6 w-6 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Services */}
            <div className="space-y-6 pl-8 md:pl-12">
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
            <div className="space-y-6">
              <h4 className="text-xl font-semibold">Quick Links</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/about" className="relative group hover:text-white transition-colors text-sm cursor-pointer pb-1">About Us<span className="absolute bottom-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: 'white' }}></span></Link></li>
                <li><Link href="/delivery-methodology" className="relative group hover:text-white transition-colors text-sm cursor-pointer pb-1">Delivery methodology<span className="absolute bottom-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: 'white' }}></span></Link></li>
                <li><Link href="#" className="relative group hover:text-white transition-colors text-sm cursor-pointer pb-1" onClick={(e) => e.preventDefault()}>Our Projects<span className="absolute bottom-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: 'white' }}></span></Link></li>
                <li><Link href="/certifications" className="relative group hover:text-white transition-colors text-sm cursor-pointer pb-1">Certifications<span className="absolute bottom-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: 'white' }}></span></Link></li>
                <li><Link href="/careers" className="relative group hover:text-white transition-colors text-sm cursor-pointer pb-1">Careers<span className="absolute bottom-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: 'white' }}></span></Link></li>
                <li><Link href="/news" className="relative group hover:text-white transition-colors text-sm cursor-pointer pb-1">News<span className="absolute bottom-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: 'white' }}></span></Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h4 className="text-xl font-semibold">Contact Info</h4>
              <div className="space-y-4 text-gray-400">
                <a href="tel:02083032280" className="flex items-center space-x-4 hover:text-white transition-colors cursor-pointer" style={{ cursor: 'pointer !important' }}>
                  <Phone className="h-6 w-6 flex-shrink-0" />
                  <span className="text-sm">020 8303 2280</span>
                </a>
                <a href="mailto:enquiries@apx-fs.co.uk" className="flex items-center space-x-4 hover:text-white transition-colors cursor-pointer" style={{ cursor: 'pointer !important' }}>
                  <Mail className="h-6 w-6 flex-shrink-0" />
                  <span className="text-sm">enquiries@apx-fs.co.uk</span>
                </a>
                <a href="https://maps.google.com/?q=365-369+Bexley+Road+Northumberland+Heath+Erith+Kent+DA8+3EZ" target="_blank" rel="noopener noreferrer" className="flex items-start space-x-4 hover:text-white transition-colors cursor-pointer" style={{ cursor: 'pointer !important' }}>
                  <MapPin className="h-6 w-6 mt-1 flex-shrink-0" />
                  <div className="text-sm">
                    <p>365-369 Bexley Road</p>
                    <p>Northumberland Heath, Erith</p>
                    <p>Kent, DA8 3EZ</p>
                  </div>
                </a>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-start gap-4">
                <Image src="/accreditations%20mono/White/NSI-02.svg" alt="NSI Gold" width={96} height={48} className="h-10 w-auto max-w-[95px] opacity-80 hover:opacity-100 transition-opacity duration-300 flex-shrink-0" />
                <Image src="/accreditations%20mono/White/BAFE-02.svg" alt="BAFE" width={96} height={48} className="h-10 w-auto max-w-[95px] opacity-80 hover:opacity-100 transition-opacity duration-300 flex-shrink-0" />
                <Image src="/accreditations%20mono/White/ConstructionOnline-02.svg" alt="Constructionline" width={96} height={48} className="h-10 w-auto max-w-[95px] opacity-80 hover:opacity-100 transition-opacity duration-300 flex-shrink-0" />
                <Image src="/accreditations%20mono/White/FIA-02.svg" alt="FIA" width={96} height={48} className="h-10 w-auto max-w-[95px] opacity-80 hover:opacity-100 transition-opacity duration-300 flex-shrink-0" />
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 text-center md:text-left text-gray-500 border-t border-t-white/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm">&copy; 2025 APX. All rights reserved. | Privacy Policy | Terms of Service</p>
              <span className="text-xs opacity-80">
                <span className="hover:opacity-100 transition-opacity duration-200">Designed by </span>
                <a href="https://www.leveldesignagency.com/" target="_blank" rel="noopener noreferrer" className="footer-level-credit font-bold opacity-80 hover:opacity-100 transition-colors duration-200">LEVEL DESIGN AGENCY LTD</a>
              </span>
            </div>
          </div>
        </div>
      </div>
      </footer>
    </div>
  )
}
