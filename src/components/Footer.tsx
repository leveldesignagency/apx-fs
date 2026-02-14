"use client"

import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react"
import { useTheme } from '@/contexts/ThemeContext'

export default function Footer() {
  const { theme } = useTheme()
  
  return (
    <footer className="text-white border-t border-t-[0.75px] border-t-white" style={{ backgroundColor: '#000000' }}>
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center cursor-pointer">
              <Image 
                src="/__APX_MEP_SHADOW.svg" 
                alt="APX MEP Logo" 
                width={200} 
                height={67} 
                className="h-18 w-auto"
              />
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Professional mechanical & electrical services 
              across the UK. Trusted by businesses for over 20 years.
            </p>
            <div className="flex space-x-6">
              <Facebook className="h-6 w-6 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="h-6 w-6 hover:text-white cursor-pointer transition-colors" />
              <Linkedin className="h-6 w-6 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold">Services</h4>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="/services/mechanical" className="relative group hover:text-white transition-colors text-sm cursor-pointer pb-1">Mechanical Services<span className="absolute bottom-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: 'white' }}></span></Link></li>
              <li><Link href="/services/electrical" className="relative group hover:text-white transition-colors text-sm cursor-pointer pb-1">Electrical Services<span className="absolute bottom-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: 'white' }}></span></Link></li>
              <li><Link href="/services/hvac" className="relative group hover:text-white transition-colors text-sm cursor-pointer pb-1">HVAC Systems<span className="absolute bottom-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: 'white' }}></span></Link></li>
              <li><Link href="/services/plumbing" className="relative group hover:text-white transition-colors text-sm cursor-pointer pb-1">Plumbing Services<span className="absolute bottom-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: 'white' }}></span></Link></li>
              <li><Link href="/services/maintenance" className="relative group hover:text-white transition-colors text-sm cursor-pointer pb-1">Maintenance<span className="absolute bottom-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: 'white' }}></span></Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold">Quick Links</h4>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="/about" className="relative group hover:text-white transition-colors text-sm cursor-pointer pb-1">About Us<span className="absolute bottom-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: 'white' }}></span></Link></li>
              <li><Link href="/projects" className="relative group hover:text-white transition-colors text-sm cursor-pointer pb-1">Our Projects<span className="absolute bottom-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: 'white' }}></span></Link></li>
              <li><Link href="/certifications" className="relative group hover:text-white transition-colors text-sm cursor-pointer pb-1">Certifications<span className="absolute bottom-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: 'white' }}></span></Link></li>
              <li><Link href="/careers" className="relative group hover:text-white transition-colors text-sm cursor-pointer pb-1">Careers<span className="absolute bottom-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: 'white' }}></span></Link></li>
              <li><Link href="/news" className="relative group hover:text-white transition-colors text-sm cursor-pointer pb-1">News<span className="absolute bottom-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: 'white' }}></span></Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold">Contact Info</h4>
            <div className="space-y-4 text-gray-400">
              <a href="tel:02045685986" className="flex items-center space-x-4 hover:text-white transition-colors cursor-pointer" style={{ cursor: 'pointer !important' }}>
                <Phone className="h-6 w-6 flex-shrink-0" />
                <span className="text-sm">020 4568 5986</span>
              </a>
              <a href="mailto:info@apx-mep.co.uk" className="flex items-center space-x-4 hover:text-white transition-colors cursor-pointer" style={{ cursor: 'pointer !important' }}>
                <Mail className="h-6 w-6 flex-shrink-0" />
                <span className="text-sm">info@apx-mep.co.uk</span>
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
          </div>
        </div>

        <div className="border-t border-t-[0.75px] mt-16 pt-8 text-center text-gray-500" style={{ borderTopColor: theme === 'dark' ? 'white' : 'black' }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm">&copy; 2025 APX. All rights reserved. | Privacy Policy | Terms of Service</p>
            <div className="flex-shrink-0">
              <Image 
                src="/APX Accreditations_MECHANICAL AND ELECTRICAL ACCREDITATIONS.png" 
                alt="APX MEP Accreditations" 
                width={200} 
                height={80} 
                className="h-16 w-auto opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
