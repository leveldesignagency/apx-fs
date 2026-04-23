"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Phone, Mail, Menu, X, ArrowRight, Facebook, Instagram, Linkedin, ChevronDown } from "lucide-react"
import { useState, useRef, useEffect, useLayoutEffect, useCallback, type TransitionEvent } from "react"
import { createPortal } from "react-dom"
import { useTheme } from '@/contexts/ThemeContext'
import { cn } from "@/lib/utils"

export default function Header() {
  const pathname = usePathname()
  const { theme } = useTheme()
  /** Strip trailing slash so `/services` and `/services/` match the hub, etc. */
  const path = pathname.replace(/\/$/, "") || "/"
  const isFsNavActive = (href: string) =>
    href === "/" ? path === "/" : path === href || path.startsWith(`${href}/`)

  /** Mobile drawer: matches MEP slide-over pattern */
  const FS_MOBILE_PRIMARY_LINKS = [
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/delivery-methodology", label: "Methodology" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ] as const
  const isCareersPage = path === "/careers"
  const isHomePage = path === "/"
  const isCapabilityDetailPage =
    path === "/services/security-systems" ||
    path === "/services/fire-life-safety" ||
    path === "/services/maintenance-support"
  const isServicesHubPage = path === "/services"
  const isMethodologyPage = path === "/delivery-methodology"
  const isAboutPage = path === "/about"
  const isProjectsPage = path === "/projects" || path.startsWith("/projects/")
  const isProjectDetailPage = path.startsWith("/projects/") && path !== "/projects"
  /** Any URL under /services/… (not the hub) — transparent header over hero; header scrolls away with the page */
  const isServiceSubpage = path.startsWith("/services/")
  const isBlackHeaderCanvas =
    isCapabilityDetailPage ||
    isServicesHubPage ||
    isMethodologyPage ||
    isProjectsPage
  const isTransparentHeaderPage = isServiceSubpage || isProjectDetailPage
  const isServicesPage = pathname.startsWith("/services/") || isProjectDetailPage
  /** Solid black header shell — not on service subpages where a transparent bar sits over the hero */
  const useBlackHeaderCanvas = isBlackHeaderCanvas && !isProjectDetailPage && !isServiceSubpage
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [fsMenuPanelIn, setFsMenuPanelIn] = useState(false)
  const fsMenuPanelInRef = useRef(false)
  fsMenuPanelInRef.current = fsMenuPanelIn
  const [fsMenuPortalReady, setFsMenuPortalReady] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'phone' | 'email' } | null>(null)
  const [contactTabReady, setContactTabReady] = useState(false)
  const servicesCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  /** Fallback if `transitionend` for the panel transform is missed (browser / stacking quirks). */
  const fsMenuCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [isCctvExpanded, setIsCctvExpanded] = useState(false)

  const clearFsMenuCloseTimer = useCallback(() => {
    if (fsMenuCloseTimerRef.current) {
      clearTimeout(fsMenuCloseTimerRef.current)
      fsMenuCloseTimerRef.current = null
    }
  }, [])

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

  const closeFsMenu = useCallback(() => {
    clearFsMenuCloseTimer()
    if (!isMenuOpen) return
    if (!fsMenuPanelInRef.current) {
      setIsMenuOpen(false)
      return
    }
    setFsMenuPanelIn(false)
    // Panel uses `duration-300`; always unmount after close so one tap is enough.
    fsMenuCloseTimerRef.current = setTimeout(() => {
      fsMenuCloseTimerRef.current = null
      setIsMenuOpen(false)
    }, 340)
  }, [isMenuOpen, clearFsMenuCloseTimer])

  useEffect(() => {
    setFsMenuPortalReady(true)
  }, [])

  useLayoutEffect(() => {
    if (!isMenuOpen) return
    clearFsMenuCloseTimer()
    setFsMenuPanelIn(false)
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setFsMenuPanelIn(true))
    })
    return () => cancelAnimationFrame(raf)
  }, [isMenuOpen, clearFsMenuCloseTimer])

  const handleFsMenuPanelTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return
    if (e.propertyName !== "transform") return
    if (fsMenuPanelInRef.current) return
    clearFsMenuCloseTimer()
    setIsMenuOpen(false)
  }

  useEffect(() => {
    if (!isMenuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        closeFsMenu()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isMenuOpen, closeFsMenu])

  useEffect(() => {
    if (!isMenuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [isMenuOpen])

  useEffect(() => {
    clearFsMenuCloseTimer()
    setFsMenuPanelIn(false)
    setIsMenuOpen(false)
  }, [pathname, clearFsMenuCloseTimer])

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
    // Aligned with MEP: same breakpoint as `lg` nav / contact tab
    if (window.innerWidth < 1024) {
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

  /**
   * Absolute top of .site-shell — full-bleed heroes sit underneath; not `fixed`, so the bar scrolls with the page.
   */
  const headerLayoutClass =
    "absolute top-0 left-0 right-0 z-[100] w-full max-w-[100vw] pointer-events-auto"

  if (isCareersPage) {
    return null
  }

  return (
    <>
    <header
      className={`site-header ${headerLayoutClass} ${useBlackHeaderCanvas ? "bg-black fs-black-header-canvas" : "bg-transparent"} ${isHomePage || isTransparentHeaderPage || isAboutPage ? "header-bg-transparent-page" : ""} ${isServicesPage ? "header--no-animate" : ""} ${isHomePage || isProjectDetailPage || isServiceSubpage ? "fs-project-detail-header" : ""}`}
      style={{ backgroundColor: useBlackHeaderCanvas ? "#000000" : "transparent" }}
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
                  maxHeight: isServicesOpen ? '460px' : '0',
                  pointerEvents: isServicesOpen ? 'auto' : 'none',
                  transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  backgroundColor: 'black',
                  border: '1px solid white',
                  borderTop: 'none',
                }}
                onMouseEnter={openServices}
                onMouseLeave={closeServices}
              >
                <div className="divide-y divide-white/[0.1] rounded-br-2xl">
                  {[
                    { href: '/services/electrical-systems', label: 'CCTV SYSTEMS' },
                    { href: '/services/energy-efficiency', label: 'ACCESS CONTROL SYSTEMS' },
                    { href: '/services/sustainability', label: 'INTRUDER ALARM SYSTEMS' },
                    { href: '/services/mechanical-engineering', label: 'FIRE ALARM SYSTEMS' },
                    { href: '/services/maintenance', label: 'VIDEO DOOR ENTRY SYSTEMS' },
                    { href: '/services/refuge-disabled-communication', label: 'REFUGE & DISABLED COMMS' },
                    { href: '/services/evac-voice-evacuation', label: 'EVAC & VOICE EVACUATION' },
                  ].map(({ href, label }) => (
                    <a
                      key={href}
                      href={href}
                      className="dropdown-item relative group block px-4 py-2 text-sm leading-relaxed cursor-pointer uppercase"
                      style={{ color: 'white' }}
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

      <nav className="relative z-10 w-full px-4 pt-4 pb-3 sm:px-6 lg:px-6 lg:pt-5 lg:pb-4">
        <div className="relative flex w-full min-h-[4.75rem] items-center lg:min-h-[6.5rem]">
            <div className="pointer-events-none absolute left-[8rem] right-0 top-1/2 z-0 hidden h-16 -translate-y-1/2 overflow-hidden lg:block">
            <div
              className="header-bar-expand h-full w-full rounded-br-[30px] border-2"
              style={{
                backgroundColor: isHomePage || isTransparentHeaderPage || isAboutPage ? "transparent" : "#000",
                boxSizing: "border-box",
                borderColor: "#fff",
                ...(isHomePage || isProjectDetailPage || isServiceSubpage || isAboutPage
                  ? { backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" as const }
                  : {}),
              }}
            />
          </div>
          <div className="relative z-10 flex h-14 min-h-[3.5rem] w-full items-center justify-center px-2 sm:h-16 sm:px-4 lg:h-16 lg:min-h-0 lg:justify-between lg:px-6">
            <Link
              href="/"
              className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 shrink-0 cursor-pointer items-center lg:static lg:translate-x-0 lg:translate-y-0"
              onClick={() => {
                if (isMenuOpen) closeFsMenu()
              }}
            >
              <span className="header-logo-drop-in inline-block">
                <span className="header-logo-hover-wrap relative inline-block overflow-hidden">
                  <Image
                    src="/__APX Web Logo FS.svg"
                    alt="APX Fire & Security Logo"
                    width={334}
                    height={112}
                    className="relative z-10 h-20 w-auto sm:h-24 lg:h-28"
                  />
                </span>
              </span>
            </Link>
            {/* FIRE & SECURITY: same positioning as MEP mech tag — only at lg+ (web); hidden on phone/tablet */}
            <div className="hidden lg:block absolute left-[12.25rem] top-1/2 -translate-y-1/2 z-0 w-[17rem] overflow-hidden pointer-events-none">
              <div
                className="flex w-fit items-center rounded-br-2xl header-mech-security-in pl-7 pr-3.5 py-1"
                style={{
                  backgroundColor: isProjectDetailPage || isServiceSubpage ? "rgba(0,0,0,0.42)" : "black",
                  border: "2px solid white",
                  ...(isProjectDetailPage || isServiceSubpage
                    ? { backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" as const }
                    : {}),
                }}
              >
                <span className="inline-block text-base font-semibold tracking-wide uppercase whitespace-nowrap !text-white" style={{ fontFamily: 'var(--font-menu)', color: '#ffffff' }}>
                  FIRE & SECURITY
                </span>
              </div>
            </div>
            <div className="hidden lg:flex items-center space-x-8 text-white [&_a]:!text-white [&_.nav-menu-item]:!text-white [&_svg]:stroke-white flex-shrink-0 relative z-10">
              <div className="relative header-nav-item-in flex items-center" style={{ animationDelay: '2.9s' }}>
                <Link
                  href="/services"
                  className="nav-menu-item relative text-sm font-medium leading-relaxed cursor-pointer group uppercase opacity-100 hover:opacity-100"
                  style={{ color: '#fff' }}
                  onMouseEnter={openServices}
                  onMouseLeave={closeServices}
                >
                  Services
                  <span className="absolute top-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: '#fff' }} />
                  <span className="absolute bottom-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: '#fff' }} />
                </Link>
                <div
                  className="absolute z-40 overflow-hidden rounded-br-2xl"
                  style={{
                    top: 'calc(100% + 1.2rem)',
                    left: '-32.5px',
                    width: '264.5px',
                    maxHeight: isServicesOpen ? (isCctvExpanded ? '560px' : '460px') : '0',
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
                  <div className="divide-y divide-white/[0.1] rounded-br-2xl">
                    {/* CCTV SYSTEMS: hover expands to show 3 sub-options underneath; stays open until user leaves dropdown */}
                    <div
                      className="transition-colors"
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
                            className="dropdown-item dropdown-sub-item relative group block px-4 py-2 pl-6 text-sm leading-relaxed cursor-pointer uppercase border-t border-white/[0.08]"
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
                            Domestic CCTV systems
                          </a>
                          <a
                            href="/services/cctv/commercial"
                            className="dropdown-item dropdown-sub-item relative group block px-4 py-2 pl-6 text-sm leading-relaxed cursor-pointer uppercase border-t border-white/[0.08]"
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
                            Commercial CCTV systems
                          </a>
                          <a
                            href="/services/cctv/advice"
                            className="dropdown-item dropdown-sub-item relative group block px-4 py-2 pl-6 text-sm leading-relaxed cursor-pointer uppercase border-t border-white/[0.08]"
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
                            Useful CCTV advice
                          </a>
                        </>
                      )}
                    </div>
                    {[
                      { href: '/services/energy-efficiency', label: 'ACCESS CONTROL SYSTEMS' },
                      { href: '/services/sustainability', label: 'INTRUDER ALARM SYSTEMS' },
                      { href: '/services/mechanical-engineering', label: 'FIRE ALARM SYSTEMS' },
                      { href: '/services/maintenance', label: 'VIDEO DOOR ENTRY SYSTEMS' },
                      { href: '/services/refuge-disabled-communication', label: 'REFUGE & DISABLED COMMS' },
                      { href: '/services/evac-voice-evacuation', label: 'EVAC & VOICE EVACUATION' },
                    ].map(({ href, label }) => (
                      <a
                        key={href}
                        href={href}
                        className="dropdown-item relative group block px-4 py-2 text-sm leading-relaxed cursor-pointer uppercase transition-opacity duration-200"
                        style={{
                          color: '#fff',
                          opacity: isCctvExpanded ? 0.45 : 1,
                        }}
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
              <Link href="/delivery-methodology" className="nav-menu-item relative text-sm font-medium leading-relaxed cursor-pointer group uppercase header-nav-item-in" style={{ color: '#fff', animationDelay: '3.18s' }}>
                Methodology
                <span className="absolute top-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: '#fff' }} />
                <span className="absolute bottom-0 left-1/2 w-full h-0.5 transform -translate-x-1/2 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: '#fff' }} />
              </Link>
              <div className="h-5 w-px flex-shrink-0 header-nav-item-in bg-white/90" style={{ animationDelay: '3.2s' }} aria-hidden />
              <Link href="/projects" className="nav-menu-item relative text-sm font-medium leading-relaxed cursor-pointer group uppercase header-nav-item-in pointer-events-auto" style={{ color: '#fff', animationDelay: '3.22s' }}>
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
            <button
              type="button"
              onClick={() => (isMenuOpen ? closeFsMenu() : setIsMenuOpen(true))}
              className={cn(
                "fs-header-menu-trigger absolute right-2 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center sm:right-4 lg:hidden",
                "rounded-lg border-2 border-white bg-black text-white",
                "transition-transform duration-200 active:scale-[0.97]"
              )}
              aria-expanded={isMenuOpen}
              aria-controls="fs-mobile-nav"
              aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Contact Tab + toast: pill sits tight under the tab */}
      <div className={`absolute top-full right-[54px] hidden lg:block ${contactTabReady ? 'z-20' : 'z-0'}`}>
        <div className="relative">
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
              onClick={() => handleContactClick('phone', '020 8303 2280')}
              className="header-contact-btn relative flex items-center space-x-1.5 px-2.5 py-1.5 rounded-full cursor-pointer"
            >
              <Phone className="h-3.5 w-3.5" />
              <span className="text-xs">020 8303 2280</span>
            </button>
            <button
              type="button"
              onClick={() => handleContactClick('email', 'enquiries@apx-fs.co.uk')}
              className="header-contact-btn relative flex items-center space-x-1.5 px-2.5 py-1.5 rounded-full cursor-pointer"
            >
              <Mail className="h-3.5 w-3.5" />
              <span className="text-xs">enquiries@apx-fs.co.uk</span>
            </button>
          </div>
          {toast && (
            <div
              role="status"
              aria-live="polite"
              className="absolute left-1/2 z-[110] -translate-x-1/2 whitespace-nowrap rounded-full border border-black/10 bg-white px-3.5 py-1.5 text-xs font-semibold text-black shadow-md"
              style={{
                /* Tab uses translateY(-36px); layout box is still full height — anchor toast to visual bottom + ~5px */
                top: "calc(100% - 36px + 0.3125rem)",
              }}
            >
              {toast.message}
            </div>
          )}
        </div>
      </div>
    </header>
    {isMenuOpen && fsMenuPortalReady
      ? createPortal(
          <div
            className="fixed inset-0 z-[200] lg:hidden"
            id="fs-mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <div
              className={cn(
                "absolute inset-0 z-0 transition-opacity duration-300 ease-out",
                fsMenuPanelIn ? "bg-black/60 opacity-100 backdrop-blur-[2px]" : "bg-black/0 opacity-0"
              )}
              onClick={closeFsMenu}
              aria-hidden
            />
            <div
              className={cn(
                "absolute z-10 flex min-h-0 min-w-0 flex-col overflow-hidden",
                "left-3 right-3 sm:left-4 sm:right-4",
                "top-[max(0.75rem,env(safe-area-inset-top,0px))] bottom-[max(0.75rem,env(safe-area-inset-bottom,0px))]",
                "rounded-2xl border border-white/15 bg-[#0a0a0a]/96 shadow-[0_24px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl",
                "transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
                fsMenuPanelIn ? "translate-x-0" : "translate-x-full"
              )}
              onTransitionEnd={handleFsMenuPanelTransitionEnd}
            >
              <div className="flex shrink-0 items-center justify-end border-b border-white/10 px-4 py-3 sm:px-5">
                <button
                  type="button"
                  onClick={closeFsMenu}
                  className="fs-header-menu-trigger flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-2 border-white bg-black text-white transition active:scale-[0.98]"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                </button>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-2 pb-2 sm:px-3 sm:pb-3">
                <nav className="flex flex-col" aria-label="Main">
                  {FS_MOBILE_PRIMARY_LINKS.map(({ href, label }, i) => {
                    const active = isFsNavActive(href)
                    return (
                      <Link
                        key={href}
                        href={href}
                        onClick={closeFsMenu}
                        className={cn(
                          "relative block border-b border-white/10 py-3.5 pl-3 pr-5 text-right text-sm font-semibold uppercase tracking-wide !text-white transition-[background-color,opacity] duration-150",
                          "hover:bg-white/5",
                          "last:border-b-0",
                          i === 0 && "pt-3",
                          active && "bg-white/[0.06]"
                        )}
                        style={{ fontFamily: "var(--font-menu), sans-serif" }}
                        aria-current={active ? "page" : undefined}
                      >
                        {active && (
                          <span
                            className="absolute top-0 bottom-0 left-0 w-0.5 bg-white"
                            aria-hidden
                          />
                        )}
                        {label}
                      </Link>
                    )
                  })}
                </nav>
              </div>
            </div>
          </div>,
          document.body
        )
      : null}
    </>
  )
}
