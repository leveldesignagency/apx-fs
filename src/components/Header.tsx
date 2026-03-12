"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { Phone, Mail, Menu, X, ArrowRight, Check, Facebook, Instagram, Linkedin, ChevronDown } from "lucide-react"
import { useState, useRef } from "react"
import { useTheme } from '@/contexts/ThemeContext'

export default function Header() {
  const pathname = usePathname()
  const { theme } = useTheme()
  const isTransparentHeaderPage = pathname.startsWith("/services/")
  const isServicesPage = pathname.startsWith("/services/")
  const isDark = theme === 'dark'
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'phone' | 'email' } | null>(null)
  const [contactTabReady, setContactTabReady] = useState(false)
  const servicesCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [isCctvExpanded, setIsCctvExpanded] = useState(false)

  const openServices = () => {
    if (servicesCloseTimeoutRef.current) {
      clearTimeout(servicesCloseTimeoutRef.current)
      servicesCloseTimeoutRef.current = null
    }
    setIsServicesOpen(true)
  }
  const closeServices = () => {
    servicesCloseTimeoutRef.current = setTimeout(() => setIsServicesOpen(false), 280)
  }

  const copyToClipboard = async (text: string, type: 'phone' | 'email') => {
    try {
      await navigator.clipboard.writeText(text)
      setToast({ message: type === 'phone' ? 'Phone copied' : 'Email copied', type })
      setTimeout(() => setToast(null), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const handleContactClick = (type: 'phone' | 'email', value: string) => {
    // Check if mobile (screen width < 768px)
    if (window.innerWidth < 768) {
      if (type === 'phone') {
        window.open(`tel:${value}`, '_self')
      } else {
        window.open(`mailto:${value}`, '_self')
      }
    } else {
      // Desktop: copy to clipboard
      copyToClipboard(value, type)
    }
  }

  return (
    <header
      className={`relative z-50 bg-transparent ${isTransparentHeaderPage ? "header-bg-transparent-page" : ""} ${isServicesPage ? "header--no-animate" : ""}`}
      style={{ backgroundColor: "transparent" }}
    >
      {/* ========== SAVED VERSION (original header – not rendered) ========== */}
      {false && (
        <>
          <nav className="w-full px-6 pt-7 pb-3">
            <div className="flex items-center justify-between h-11">
              <Link href="/" className="flex items-center relative overflow-hidden w-[500px] h-18 cursor-pointer">
                <div className="hidden md:block absolute left-0 top-2 h-16 w-full overflow-hidden flex items-center justify-center" style={{ clipPath: 'inset(0 0px 0 92px)' }}>
                  <Image src="/__APX Web Logo FS Banner.svg" alt="APX Fire & Security Banner" width={550} height={55} className="h-14 w-auto animate-banner-in" style={{ transform: 'translateX(-100%)' }} />
                </div>
                <Image src="/__APX Web Logo FS.svg" alt="APX Fire & Security Logo" width={200} height={67} className="h-18 w-auto relative z-10 md:z-10 z-0" />
                <div className="md:hidden absolute left-0 top-0 h-16 w-full flex items-center justify-center">
                  <Image src="/__APX Web Logo FS Banner.svg" alt="APX Fire & Security Banner" width={200} height={60} className="h-16 w-auto opacity-80 transform translate-x-2" />
                </div>
              </Link>
              <div className="header-nav-in flex items-center">
          <div
            className="header-pill hidden md:flex items-center rounded-tl-2xl rounded-br-2xl px-8 py-1.5 space-x-8"
            style={{
              backgroundColor: 'black',
              border: '1px solid white',
            }}
          >
            <div className="relative">
              <div 
                className="nav-menu-item relative text-sm font-medium leading-relaxed cursor-pointer group uppercase opacity-100 hover:opacity-100"
                style={{ color: 'white' }}
                onMouseEnter={openServices}
                onMouseLeave={closeServices}
              >
              Services
                <span 
                  className="absolute top-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100"
                  style={{ backgroundColor: 'white' }}
                ></span>
                <span 
                  className="absolute bottom-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100"
                  style={{ backgroundColor: 'white' }}
                ></span>
              </div>
              
              {/* Services Dropdown – border on outer so bottom border stays visible during accordion collapse */}
              <div
                className="absolute z-40 overflow-hidden rounded-br-2xl"
                style={{
                  top: 'calc(100% + 1.2rem)',
                  left: '-32.5px',
                  width: '264.5px',
                  maxHeight: isServicesOpen ? '320px' : '0',
                  pointerEvents: isServicesOpen ? 'auto' : 'none',
                  transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  backgroundColor: 'black',
                  border: '1px solid white',
                  borderTop: 'none',
                }}
                onMouseEnter={openServices}
                onMouseLeave={closeServices}
              >
                <div className="py-0 rounded-br-2xl">
                  {[
                    { href: '/services/electrical-systems', label: 'CCTV SYSTEMS' },
                    { href: '/services/energy-efficiency', label: 'ACCESS CONTROL SYSTEMS' },
                    { href: '/services/sustainability', label: 'INTRUDER ALARM SYSTEMS' },
                    { href: '/services/mechanical-engineering', label: 'FIRE ALARM SYSTEMS' },
                    { href: '/services/maintenance', label: 'VIDEO DOOR ENTRY SYSTEMS' },
                  ].map(({ href, label }, i) => (
                    <a
                      key={href}
                      href={href}
                      className={`dropdown-item relative group block px-4 py-2 text-sm leading-relaxed cursor-pointer uppercase ${i < 4 ? 'border-b' : ''}`}
                      style={{ color: 'white', borderBottomColor: i < 4 ? 'rgba(255, 255, 255, 0.2)' : undefined }}
                      onClick={() => {
                        setIsServicesOpen(false)
                        if (servicesCloseTimeoutRef.current) {
                          clearTimeout(servicesCloseTimeoutRef.current)
                          servicesCloseTimeoutRef.current = null
                        }
                      }}
                    >
                      <span className="absolute top-0 left-0 w-full h-0.5 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: 'white' }} />
                      <span className="absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: 'white' }} />
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="h-4 w-[0.75px] vertical-separator flex-shrink-0"></div>
            <Link href="/about" className="nav-menu-item relative text-sm font-medium leading-relaxed cursor-pointer group uppercase opacity-100 hover:opacity-100" style={{ color: 'white' }}>
              About
              <span 
                className="absolute top-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100"
                style={{ backgroundColor: 'white' }}
              ></span>
              <span 
                className="absolute bottom-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100"
                style={{ backgroundColor: 'white' }}
              ></span>
            </Link>
            <div className="h-4 w-[0.75px] vertical-separator flex-shrink-0"></div>
            <Link href="/projects" className="nav-menu-item relative text-sm font-medium leading-relaxed cursor-pointer group uppercase opacity-100 hover:opacity-100" style={{ color: 'white' }}>
              Projects
              <span 
                className="absolute top-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100"
                style={{ backgroundColor: 'white' }}
              ></span>
              <span 
                className="absolute bottom-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100"
                style={{ backgroundColor: 'white' }}
              ></span>
            </Link>
            <div className="h-4 w-[0.75px] vertical-separator flex-shrink-0"></div>
            <Link href="/contact" className="nav-menu-item relative text-sm font-medium leading-relaxed cursor-pointer group uppercase opacity-100 hover:opacity-100" style={{ color: 'white' }}>
              Contact
              <span 
                className="absolute top-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100"
                style={{ backgroundColor: 'white' }}
              ></span>
              <span 
                className="absolute bottom-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100"
                style={{ backgroundColor: 'white' }}
              ></span>
            </Link>
            <a href={process.env.NEXT_PUBLIC_APX_MEP_URL || 'http://localhost:3000'} className="group relative header-pill-apx-link" style={{ color: 'white' }}>
              <div className="flex items-center justify-center overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] w-8 h-8 min-w-8 min-h-8 group-hover:w-52 group-hover:backdrop-blur-sm rounded-full border-2 pulse-glow" style={{ borderColor: 'white' }}>
                <div className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] flex-shrink-0 absolute left-0 top-0" style={{ color: 'white' }}>
                  <ArrowRight className="h-3.5 w-3.5 transition-all duration-500 group-hover:opacity-0 group-hover:rotate-180 shrink-0" style={{ color: 'white', stroke: 'white' }} />
                </div>
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 group-hover:delay-200"></div>
                  <span className="apx-switch-label text-xs font-bold uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300 group-hover:delay-300 text-disappear relative z-10" style={{ color: 'white' }}>SWITCH TO APX MEP</span>
                </div>
              </div>
            </a>
            <div className="flex items-center gap-4 pl-1">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-80 transition-opacity" aria-label="Facebook">
                <Facebook className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-80 transition-opacity" aria-label="Instagram">
                <Instagram className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-80 transition-opacity" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
            style={{ color: theme === 'dark' ? 'white' : 'black' }}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-6 pb-6 border-t border-t-[0.75px] pt-6">
            <div className="flex flex-col space-y-4">
              <Link href="/services" className="nav-menu-item relative text-lg font-medium group uppercase opacity-100 hover:opacity-100" style={{ color: theme === 'dark' ? 'white' : 'black' }}>
                Services
                <span className="absolute top-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: theme === 'dark' ? 'white' : 'black' }}></span>
                <span className="absolute bottom-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: theme === 'dark' ? 'white' : 'black' }}></span>
              </Link>
              <Link href="/about" className="nav-menu-item relative text-lg font-medium group uppercase opacity-100 hover:opacity-100" style={{ color: theme === 'dark' ? 'white' : 'black' }}>
                About
                <span className="absolute top-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: theme === 'dark' ? 'white' : 'black' }}></span>
                <span className="absolute bottom-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: theme === 'dark' ? 'white' : 'black' }}></span>
              </Link>
              <Link href="/projects" className="nav-menu-item relative text-lg font-medium group uppercase opacity-100 hover:opacity-100" style={{ color: theme === 'dark' ? 'white' : 'black' }}>
                Projects
                <span className="absolute top-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: theme === 'dark' ? 'white' : 'black' }}></span>
                <span className="absolute bottom-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: theme === 'dark' ? 'white' : 'black' }}></span>
              </Link>
              <Link href="/contact" className="nav-menu-item relative text-lg font-medium group uppercase opacity-100 hover:opacity-100" style={{ color: theme === 'dark' ? 'white' : 'black' }}>
                Contact
                <span className="absolute top-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: theme === 'dark' ? 'white' : 'black' }}></span>
                <span className="absolute bottom-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: theme === 'dark' ? 'white' : 'black' }}></span>
              </Link>
              <div className="pt-4">
                <a href={process.env.NEXT_PUBLIC_APX_MEP_URL || 'http://localhost:3000'} className="group relative">
                  <div className="flex items-center overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:w-52 w-10 group-hover:backdrop-blur-sm rounded-full border pulse-glow">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] flex-shrink-0">
                      <ArrowRight className="h-4 w-4 transition-all duration-500 group-hover:opacity-0 group-hover:rotate-180" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 group-hover:delay-200"></div>
                      <span className="apx-switch-label text-xs font-bold uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300 group-hover:delay-300 text-disappear relative z-10">SWITCH TO APX MEP</span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
        </>
      )}

      <nav className="relative z-10 w-full px-6 pt-5 pb-4">
        <div className="relative w-full flex items-center min-h-[6.5rem]">
          <div className="absolute left-[8rem] right-0 h-16 overflow-hidden z-0 top-1/2 -translate-y-1/2">
            <div
              className="header-bar-expand h-full w-full rounded-br-[30px] border-2"
              style={{
                backgroundColor: isTransparentHeaderPage ? "transparent" : "#000",
                boxSizing: "border-box",
                borderColor: "#fff",
              }}
            />
          </div>
          <div className="relative z-10 w-full flex items-center justify-between px-6 h-16">
            <Link href="/" className="header-logo-drop-in flex items-center shrink-0 cursor-pointer relative z-10">
              <span className="header-logo-hover-wrap inline-block relative overflow-hidden">
                <Image
                  src="/__APX Web Logo FS.svg"
                  alt="APX Fire & Security Logo"
                  width={334}
                  height={112}
                  className="h-28 w-auto relative z-10"
                />
              </span>
            </Link>
            {/* FIRE & SECURITY: absolute, same as MEP – own stack so alignment isn’t affected by switch button */}
            {/* Same as MEP: top-1/2 with NO transform – tagline top edge at row center, box hangs down */}
            <div
              className="hidden md:flex absolute left-[12.25rem] top-1/2 z-0 w-fit items-center rounded-br-2xl header-mech-security-in pl-7 pr-3.5 py-1"
              style={{
                backgroundColor: "black",
                border: "2px solid white",
              }}
            >
              <span className="inline-block text-base font-semibold tracking-wide uppercase whitespace-nowrap !text-white" style={{ fontFamily: 'var(--font-menu)', color: '#ffffff' }}>
                FIRE & SECURITY
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8 text-white [&_a]:!text-white [&_.nav-menu-item]:!text-white [&_svg]:stroke-white flex-shrink-0 relative z-10">
              <div className="relative header-nav-item-in flex items-center" style={{ animationDelay: '2.9s' }}>
                <div
                  className="nav-menu-item relative text-sm font-medium leading-relaxed cursor-pointer group uppercase opacity-100 hover:opacity-100"
                  style={{ color: '#fff' }}
                  onMouseEnter={openServices}
                  onMouseLeave={closeServices}
                >
                  Services
                  <span className="absolute top-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: '#fff' }} />
                  <span className="absolute bottom-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: '#fff' }} />
                </div>
                <div
                  className="absolute z-40 overflow-hidden rounded-br-2xl"
                  style={{
                    top: 'calc(100% + 1.2rem)',
                    left: '-32.5px',
                    width: '264.5px',
                    maxHeight: isServicesOpen ? (isCctvExpanded ? '420px' : '320px') : '0',
                    pointerEvents: isServicesOpen ? 'auto' : 'none',
                    transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    backgroundColor: 'black',
                    border: '1px solid white',
                    borderTop: 'none',
                  }}
                  onMouseEnter={openServices}
                  onMouseLeave={() => {
                    closeServices()
                    setIsCctvExpanded(false)
                  }}
                >
                  <div className="py-0 rounded-br-2xl">
                    {/* CCTV SYSTEMS: hover expands to show 3 sub-options underneath; stays open until user leaves dropdown */}
                    <div
                      className="border-b transition-colors"
                      style={{ borderBottomColor: 'rgba(255,255,255,0.2)' }}
                      onMouseEnter={() => setIsCctvExpanded(true)}
                    >
                      <a
                        href="/services/electrical-systems"
                        className="dropdown-item relative group flex items-center justify-between gap-2 px-4 py-2 text-sm leading-relaxed cursor-pointer uppercase"
                        style={{ color: '#fff' }}
                        onClick={() => {
                          setIsServicesOpen(false)
                          setIsCctvExpanded(false)
                          if (servicesCloseTimeoutRef.current) {
                            clearTimeout(servicesCloseTimeoutRef.current)
                            servicesCloseTimeoutRef.current = null
                          }
                        }}
                      >
                        <span className="absolute top-0 left-0 w-full h-0.5 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: '#fff' }} />
                        <span className="absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: '#fff' }} />
                        <span>CCTV SYSTEMS</span>
                        <ChevronDown className="w-3.5 h-3.5 flex-shrink-0 opacity-80" style={{ stroke: '#fff', transform: isCctvExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
                      </a>
                      {isCctvExpanded && (
                        <>
                          <a
                            href="/services/cctv/domestic"
                            className="dropdown-item dropdown-sub-item relative group block px-4 py-2 pl-6 text-sm leading-relaxed cursor-pointer uppercase border-t"
                            style={{ color: '#fff', borderTopColor: 'rgba(255,255,255,0.15)' }}
                            onClick={() => {
                              setIsServicesOpen(false)
                              setIsCctvExpanded(false)
                              if (servicesCloseTimeoutRef.current) {
                                clearTimeout(servicesCloseTimeoutRef.current)
                                servicesCloseTimeoutRef.current = null
                              }
                            }}
                          >
                            <span className="absolute top-0 left-0 w-full h-0.5 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: '#fff' }} />
                            <span className="absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: '#fff' }} />
                            Domestic CCTV systems
                          </a>
                          <a
                            href="/services/cctv/commercial"
                            className="dropdown-item dropdown-sub-item relative group block px-4 py-2 pl-6 text-sm leading-relaxed cursor-pointer uppercase border-t"
                            style={{ color: '#fff', borderTopColor: 'rgba(255,255,255,0.15)' }}
                            onClick={() => {
                              setIsServicesOpen(false)
                              setIsCctvExpanded(false)
                              if (servicesCloseTimeoutRef.current) {
                                clearTimeout(servicesCloseTimeoutRef.current)
                                servicesCloseTimeoutRef.current = null
                              }
                            }}
                          >
                            <span className="absolute top-0 left-0 w-full h-0.5 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: '#fff' }} />
                            <span className="absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: '#fff' }} />
                            Commercial CCTV systems
                          </a>
                          <a
                            href="/services/cctv/advice"
                            className="dropdown-item dropdown-sub-item relative group block px-4 py-2 pl-6 text-sm leading-relaxed cursor-pointer uppercase border-t"
                            style={{ color: '#fff', borderTopColor: 'rgba(255,255,255,0.15)' }}
                            onClick={() => {
                              setIsServicesOpen(false)
                              setIsCctvExpanded(false)
                              if (servicesCloseTimeoutRef.current) {
                                clearTimeout(servicesCloseTimeoutRef.current)
                                servicesCloseTimeoutRef.current = null
                              }
                            }}
                          >
                            <span className="absolute top-0 left-0 w-full h-0.5 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: '#fff' }} />
                            <span className="absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: '#fff' }} />
                            Useful CCTV advice
                          </a>
                        </>
                      )}
                    </div>
                    {/* Other services: same UI, links disabled – only CCTV goes to pages */}
                    {[
                      { href: '/services/energy-efficiency', label: 'ACCESS CONTROL SYSTEMS' },
                      { href: '/services/sustainability', label: 'INTRUDER ALARM SYSTEMS' },
                      { href: '/services/mechanical-engineering', label: 'FIRE ALARM SYSTEMS' },
                      { href: '/services/maintenance', label: 'VIDEO DOOR ENTRY SYSTEMS' },
                    ].map(({ href, label }, i) => (
                      <a
                        key={href}
                        href="#"
                        role="button"
                        className={`dropdown-item relative group block px-4 py-2 text-sm leading-relaxed cursor-pointer uppercase transition-opacity duration-200 ${i < 3 ? 'border-b' : ''}`}
                        style={{
                          color: '#fff',
                          borderBottomColor: i < 3 ? 'rgba(255,255,255,0.2)' : undefined,
                          opacity: isCctvExpanded ? 0.45 : 1,
                        }}
                        onClick={(e) => {
                          e.preventDefault()
                          setIsServicesOpen(false)
                          setIsCctvExpanded(false)
                          if (servicesCloseTimeoutRef.current) {
                            clearTimeout(servicesCloseTimeoutRef.current)
                            servicesCloseTimeoutRef.current = null
                          }
                        }}
                      >
                        <span className="absolute top-0 left-0 w-full h-0.5 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: '#fff' }} />
                        <span className="absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: '#fff' }} />
                        {label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="h-5 w-px flex-shrink-0 header-nav-item-in bg-white/90" style={{ animationDelay: '2.98s' }} aria-hidden />
              <Link href="/about" className="nav-menu-item relative text-sm font-medium leading-relaxed cursor-pointer group uppercase header-nav-item-in" style={{ color: '#fff', animationDelay: '3.06s' }}>
                About
                <span className="absolute top-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: '#fff' }} />
                <span className="absolute bottom-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: '#fff' }} />
              </Link>
              <div className="h-5 w-px flex-shrink-0 header-nav-item-in bg-white/90" style={{ animationDelay: '3.14s' }} aria-hidden />
              <Link href="#" className="nav-menu-item relative text-sm font-medium leading-relaxed cursor-pointer group uppercase header-nav-item-in pointer-events-auto" style={{ color: '#fff', animationDelay: '3.22s' }} onClick={(e) => e.preventDefault()}>
                Projects
                <span className="absolute top-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: '#fff' }} />
                <span className="absolute bottom-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: '#fff' }} />
              </Link>
              <div className="h-5 w-px flex-shrink-0 header-nav-item-in bg-white/90" style={{ animationDelay: '3.3s' }} aria-hidden />
              <Link href="/contact" className="nav-menu-item relative text-sm font-medium leading-relaxed cursor-pointer group uppercase header-nav-item-in" style={{ color: '#fff', animationDelay: '3.38s' }}>
                Contact
                <span className="absolute top-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: '#fff' }} />
                <span className="absolute bottom-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: '#fff' }} />
              </Link>
              <a href={process.env.NEXT_PUBLIC_APX_MEP_URL || 'http://localhost:3000'} className="group relative header-pill-apx-link header-nav-item-in" style={{ color: 'white', animationDelay: '3.46s' }}>
                <div className="flex items-center justify-center overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] w-8 h-8 min-w-8 min-h-8 group-hover:w-52 group-hover:backdrop-blur-sm rounded-full border-2 pulse-glow" style={{ borderColor: 'white' }}>
                  <div className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] flex-shrink-0 absolute left-0 top-0" style={{ color: 'white' }}>
                    <ArrowRight className="h-3.5 w-3.5 transition-all duration-500 group-hover:opacity-0 group-hover:rotate-180 shrink-0" style={{ color: 'white', stroke: 'white' }} />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 group-hover:delay-200" />
                    <span className="apx-switch-label text-xs font-bold uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300 group-hover:delay-300 text-disappear relative z-10" style={{ color: 'white' }}>SWITCH TO APX MEP</span>
                  </div>
                </div>
              </a>
              <div className="flex items-center gap-4 pl-1 header-nav-item-in" style={{ animationDelay: '3.54s' }}>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-80 transition-opacity" aria-label="Facebook">
                  <Facebook className="h-4 w-4" strokeWidth={1.5} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-80 transition-opacity" aria-label="Instagram">
                  <Instagram className="h-4 w-4" strokeWidth={1.5} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-80 transition-opacity" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4" strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 absolute right-6 top-10"
          style={{ color: 'white' }}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        {isMenuOpen && (
          <div className="md:hidden mt-6 pb-6 border-t border-t-white/20 pt-6" style={{ backgroundColor: 'black' }}>
            <div className="flex flex-col space-y-4">
              <Link href="#" className="nav-menu-item relative text-lg font-medium group uppercase opacity-100 hover:opacity-100" style={{ color: 'white' }} onClick={(e) => e.preventDefault()}>Services</Link>
              <Link href="/about" className="nav-menu-item relative text-lg font-medium group uppercase opacity-100 hover:opacity-100" style={{ color: 'white' }}>About</Link>
              <Link href="#" className="nav-menu-item relative text-lg font-medium group uppercase opacity-100 hover:opacity-100" style={{ color: 'white' }} onClick={(e) => e.preventDefault()}>Projects</Link>
              <Link href="/contact" className="nav-menu-item relative text-lg font-medium group uppercase opacity-100 hover:opacity-100" style={{ color: 'white' }}>Contact</Link>
              <div className="pt-4">
                <a href={process.env.NEXT_PUBLIC_APX_MEP_URL || 'http://localhost:3000'} className="group relative">
                  <div className="flex items-center overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:w-52 w-10 group-hover:backdrop-blur-sm rounded-full border border-white pulse-glow">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] flex-shrink-0">
                      <ArrowRight className="h-4 w-4 transition-all duration-500 group-hover:opacity-0 group-hover:rotate-180" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                      <span className="apx-switch-label text-xs font-bold uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300 group-hover:delay-300 text-disappear relative z-10 text-white">SWITCH TO APX MEP</span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Contact Tab + toast wrapper – toast shows directly under the tab */}
      <div className={`absolute top-full right-[54px] ${contactTabReady ? 'z-20' : 'z-0'}`}>
        <div
          className="header-contact-tab--dark header-contact-tab-drop-in rounded-t-none rounded-b-xl border-2 border-t-0 px-4 py-2 flex items-center space-x-3"
          style={{
            borderColor: "#fff",
            backgroundColor: "#000",
          }}
          onAnimationEnd={(e) => {
            if (e.animationName === 'header-contact-tab-drop-in') setContactTabReady(true)
          }}
        >
          <button
            type="button"
            onClick={() => handleContactClick('phone', '020 4568 5986')}
            className="header-contact-btn relative flex items-center space-x-1.5 px-2.5 py-1.5 rounded-full cursor-pointer"
          >
            <Phone className="h-3.5 w-3.5" />
            <span className="text-xs">020 4568 5986</span>
          </button>
          <button
            type="button"
            onClick={() => handleContactClick('email', 'info@apx-fs.co.uk')}
            className="header-contact-btn relative flex items-center space-x-1.5 px-2.5 py-1.5 rounded-full cursor-pointer"
          >
            <Mail className="h-3.5 w-3.5" />
            <span className="text-xs">info@apx-fs.co.uk</span>
          </button>
        </div>
        {toast && (
          <span className="absolute top-full left-0 mt-1.5 w-full text-center text-sm text-white whitespace-nowrap z-50">
            {toast.message}
          </span>
        )}
      </div>
    </header>
  )
}
