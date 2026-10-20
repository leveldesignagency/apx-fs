"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Phone, Mail, Menu, X, Plus, Minus, Search } from "lucide-react"
import { ApxSocialLinks } from "@/components/ApxSocialLinks"
import { useState, useRef, useEffect, useLayoutEffect, useCallback, type MouseEvent, type TransitionEvent } from "react"
import { createPortal } from "react-dom"
import { useTheme } from '@/contexts/ThemeContext'
import { cn } from "@/lib/utils"
import { openFsHomeSearch } from "@/lib/fsHomeSearchUi"
import { FS_SERVICE_NAV_LINKS } from "@/lib/fs-service-navigation"
import { forceDocumentScrollTop } from "@/lib/lenisBridge"

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
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
  /** Any URL under /services/… (not the hub), transparent header over hero; header scrolls away with the page */
  const isServiceSubpage = path.startsWith("/services/")
  const isBlackHeaderCanvas =
    isCapabilityDetailPage ||
    isServicesHubPage ||
    isMethodologyPage ||
    isProjectsPage
  const isTransparentHeaderPage = isServiceSubpage || isProjectDetailPage
  const isServicesPage = pathname.startsWith("/services/") || isProjectDetailPage
  /** Solid black header shell, not on service subpages where a transparent bar sits over the hero */
  const useBlackHeaderCanvas = isBlackHeaderCanvas && !isProjectDetailPage && !isServiceSubpage
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [fsMenuPanelIn, setFsMenuPanelIn] = useState(false)
  const fsMenuPanelInRef = useRef(false)
  fsMenuPanelInRef.current = fsMenuPanelIn
  const [fsMenuPortalReady, setFsMenuPortalReady] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'phone' | 'email' } | null>(null)
  const servicesCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  /** Fallback if `transitionend` for the panel transform is missed (browser / stacking quirks). */
  const fsMenuCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [isCctvExpanded, setIsCctvExpanded] = useState(false)
  /** Defer logo drop-in until after first paint so the SVG never flashes before the animation. */
  const [logoAnimArmed, setLogoAnimArmed] = useState(isServicesPage)

  useLayoutEffect(() => {
    if (isServicesPage) return
    setLogoAnimArmed(true)
  }, [isServicesPage])

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
    } else if (!isServicesOpen) {
      setIsCctvExpanded(false)
    }
    setIsServicesOpen(true)
  }
  const closeServices = () => {
    servicesCloseTimeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false)
      setIsCctvExpanded(false)
    }, 280)
  }

  const toggleCctvExpanded = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (servicesCloseTimeoutRef.current) {
      clearTimeout(servicesCloseTimeoutRef.current)
      servicesCloseTimeoutRef.current = null
    }
    setIsCctvExpanded((expanded) => !expanded)
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
    setIsMobileServicesOpen(false)
  }, [pathname, clearFsMenuCloseTimer])

  useEffect(() => {
    if (!isMenuOpen) setIsMobileServicesOpen(false)
  }, [isMenuOpen])

  const copyToClipboard = async (text: string, type: 'phone' | 'email') => {
    try {
      await navigator.clipboard.writeText(text)
      setToast({ message: type === 'phone' ? 'Phone copied' : 'Email copied', type })
      setTimeout(() => setToast(null), 2000)
    } catch {
      /* clipboard unavailable */
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
   * Absolute top of .site-shell, full-bleed heroes sit underneath; scrolls with the page.
   */
  const headerLayoutClass =
    "absolute top-0 left-0 right-0 z-[100] w-full max-w-full pointer-events-auto"

  if (isCareersPage) {
    return null
  }

  return (
    <>
    <header
      className={`site-header ${headerLayoutClass} ${useBlackHeaderCanvas ? "bg-black fs-black-header-canvas" : "bg-transparent"} ${isHomePage || isTransparentHeaderPage || isAboutPage ? "header-bg-transparent-page" : ""} ${isServicesPage ? "header--no-animate" : ""} ${isHomePage || isProjectDetailPage || isServiceSubpage ? "fs-project-detail-header" : ""}`}
      style={{ backgroundColor: useBlackHeaderCanvas ? "var(--page-bg)" : "transparent" }}
    >
      {/* ========== SAVED VERSION (original header, not rendered) ========== */}
      {false && (
        <>
          <nav className="w-full site-gutter-x pt-7 pb-3">
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
              
              {/* Services Dropdown, border on outer so bottom border stays visible during accordion collapse */}
              <div
                className="absolute z-40 overflow-hidden rounded-br-2xl"
                style={{
                  top: 'calc(100% + 1.2rem)',
                  left: '-32.5px',
                  width: '264.5px',
                  maxHeight: isServicesOpen ? '520px' : '0',
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
                  {FS_SERVICE_NAV_LINKS.map(({ href, navLabel }) => (
                    <a
                      key={href}
                      href={href}
                      className="dropdown-item relative group block px-4 py-2 text-sm leading-relaxed cursor-pointer"
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
                      {navLabel}
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
            <a href="#" className="group relative header-pill-apx-link" style={{ color: 'white' }}>
              <div className="flex items-center justify-center overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] w-8 h-8 min-w-8 min-h-8 group-hover:w-52 group-hover:backdrop-blur-sm rounded-full border pulse-glow" style={{ borderColor: 'white' }}>
                <div className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] flex-shrink-0 absolute left-0 top-0" style={{ color: 'white' }}>
                  <Search className="h-3.5 w-3.5 shrink-0" style={{ color: 'white', stroke: 'white' }} />
                </div>
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 group-hover:delay-200"></div>
                  <span className="apx-switch-label text-xs font-bold uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300 group-hover:delay-300 text-disappear relative z-10" style={{ color: 'white' }}>SWITCH TO APX MEP</span>
                </div>
              </div>
            </a>
            <ApxSocialLinks
              className="flex items-center gap-4 pl-1 pr-3 sm:pr-4 lg:pr-5"
              iconClassName="h-4 w-4"
              linkClassName="text-white transition-opacity hover:opacity-80"
            />
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
                <a href="#" className="group relative">
                  <div className="flex items-center overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:w-52 w-10 group-hover:backdrop-blur-sm rounded-full border pulse-glow">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] flex-shrink-0">
                      <Search className="h-4 w-4" />
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

      <nav className="pointer-events-none relative z-10 w-full site-gutter-x pt-4 pb-3 lg:pt-5 lg:pb-4">
        <div className="relative flex w-full min-h-[4.75rem] items-center lg:min-h-[6.5rem]">
            <div className="pointer-events-none absolute left-[8rem] right-0 top-1/2 z-0 hidden h-16 -translate-y-1/2 overflow-hidden lg:block">
            <div
              className="header-bar-expand h-full w-full rounded-br-[30px] border"
              style={{
                backgroundColor: "#000",
                boxSizing: "border-box",
                borderColor: "#fff",
                ...(isHomePage || isProjectDetailPage || isServiceSubpage || isAboutPage
                  ? { backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" as const }
                  : {}),
              }}
            />
          </div>
          <div className="relative z-10 flex h-14 min-h-[3.5rem] w-full items-center justify-between px-2 sm:h-16 sm:px-3 lg:h-16 lg:min-h-0 lg:px-3">
            {/* Mobile: balance the hamburger chip so the logo can sit truly centred */}
            <span className="pointer-events-none invisible h-11 w-11 shrink-0 lg:hidden" aria-hidden />
            <Link
              href="/"
              className="pointer-events-auto absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 shrink-0 cursor-pointer items-center lg:static lg:translate-x-0 lg:translate-y-0"
              onClick={(e) => {
                e.preventDefault()
                if (isMenuOpen) closeFsMenu()
                try {
                  sessionStorage.setItem("fs-home-scroll-top", "1")
                } catch {
                  /* ignore */
                }
                // Always land on the hero — soft nav / browser restore can leave you on #services
                if (isHomePage) {
                  try {
                    window.history.replaceState(null, "", "/")
                  } catch {
                    /* ignore */
                  }
                  forceDocumentScrollTop()
                  window.setTimeout(forceDocumentScrollTop, 50)
                  window.setTimeout(forceDocumentScrollTop, 200)
                  window.setTimeout(forceDocumentScrollTop, 500)
                  return
                }
                router.push("/")
                window.setTimeout(forceDocumentScrollTop, 50)
                window.setTimeout(forceDocumentScrollTop, 200)
                window.setTimeout(forceDocumentScrollTop, 500)
                window.setTimeout(forceDocumentScrollTop, 1000)
              }}
            >
              <span
                className={cn(
                  "header-logo-mask inline-flex h-14 items-center sm:h-[3.75rem] lg:h-28 lg:overflow-hidden",
                  !isServicesPage &&
                    (logoAnimArmed ? "header-logo-drop-in" : "header-logo-drop-in-pending"),
                )}
              >
                <span
                  className="header-logo-drop-in__motion inline-block"
                  style={
                    !isServicesPage && !logoAnimArmed
                      ? {
                          opacity: 0,
                          visibility: "hidden",
                          transform: "translateY(-100%)",
                        }
                      : undefined
                  }
                >
                  <span className="header-logo-hover-wrap relative inline-block">
                    {/* Native img keeps SVG vector-sharp; next/image rasterises SVGs and looks soft on large displays */}
                    {/* Mobile / tablet: footer wordmark. Desktop: boxed web logo. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/__APX_FS_Footer.svg"
                      alt="APX Fire & Security Logo"
                      width={280}
                      height={94}
                      className="relative z-10 h-[3.35rem] w-auto sm:h-14 lg:hidden"
                      decoding="async"
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/__APX Web Logo FS.svg"
                      alt="APX Fire & Security Logo"
                      width={643}
                      height={371}
                      className="relative z-10 hidden h-28 w-auto lg:block"
                      decoding="async"
                    />
                  </span>
                </span>
              </span>
            </Link>
            {/* FIRE & SECURITY: same positioning as MEP mech tag, only at lg+ (web); hidden on phone/tablet */}
            <div className="hidden lg:block absolute left-[11.5rem] top-1/2 -translate-y-1/2 z-0 w-[17rem] overflow-hidden pointer-events-none">
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
            <div className="relative z-10 ml-auto hidden flex-shrink-0 items-center gap-x-4 text-white lg:flex [&_svg]:stroke-white">
              <div className="pointer-events-auto relative header-nav-item-in flex items-center" style={{ animationDelay: '2.9s' }}>
                <Link
                  href="/services"
                  className="nav-menu-item relative text-sm font-medium leading-relaxed cursor-pointer group uppercase opacity-100 hover:opacity-100"
                  style={{ color: '#fff' }}
                  onMouseEnter={openServices}
                  onMouseLeave={closeServices}
                >
                  Services
                </Link>
                {isServicesOpen ? (
                <div
                  className="fs-services-nav-dropdown fs-services-nav-dropdown--open"
                  style={{
                    maxHeight: isCctvExpanded ? "min(70vh, 720px)" : "min(70vh, 640px)",
                    overflowY: "auto",
                  }}
                  onMouseEnter={openServices}
                  onMouseLeave={() => {
                    setIsCctvExpanded(false)
                    closeServices()
                  }}
                >
                  <div className="divide-y divide-white/[0.1] rounded-br-2xl">
                    {FS_SERVICE_NAV_LINKS.map((link) => {
                      const closeDropdown = () => {
                        setIsServicesOpen(false)
                        setIsCctvExpanded(false)
                        if (servicesCloseTimeoutRef.current) {
                          clearTimeout(servicesCloseTimeoutRef.current)
                          servicesCloseTimeoutRef.current = null
                        }
                      }
                      if ("hasCctvSubnav" in link && link.hasCctvSubnav) {
                        return (
                          <div key={link.href} className="bg-black transition-colors">
                            <div className="relative flex w-full items-stretch justify-between bg-black">
                              <a
                                href={link.href}
                                className="dropdown-item relative group flex min-w-0 flex-1 items-center px-4 py-2 text-sm leading-relaxed cursor-pointer"
                                style={{ color: "#fff" }}
                                onClick={closeDropdown}
                              >
                                <span className="absolute top-0 left-0 w-full h-0.5 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: "#fff" }} />
                                <span className="absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: "#fff" }} />
                                <span>{link.navLabel}</span>
                              </a>
                              <button
                                type="button"
                                className="fs-services-cctv-toggle-btn flex flex-shrink-0 items-center justify-center border-l border-white/10 px-3 py-2 text-white opacity-85 transition-opacity hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white/60"
                                aria-expanded={isCctvExpanded}
                                aria-label={isCctvExpanded ? "Collapse CCTV systems menu" : "Expand CCTV systems menu"}
                                onClick={toggleCctvExpanded}
                              >
                                {isCctvExpanded ? (
                                  <Minus className="h-3.5 w-3.5 flex-shrink-0" stroke="#fff" aria-hidden />
                                ) : (
                                  <Plus className="h-3.5 w-3.5 flex-shrink-0" stroke="#fff" aria-hidden />
                                )}
                              </button>
                            </div>
                            {isCctvExpanded && (
                              <>
                                <a
                                  href="/services/cctv/commercial"
                                  className="dropdown-item dropdown-sub-item relative group block px-4 py-2 pl-6 text-sm leading-relaxed cursor-pointer uppercase border-t border-white/[0.08]"
                                  style={{ color: "#fff" }}
                                  onClick={closeDropdown}
                                >
                                  <span className="absolute top-0 left-0 w-full h-0.5 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: "#fff" }} />
                                  <span className="absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: "#fff" }} />
                                  Commercial CCTV systems
                                </a>
                                <a
                                  href="/services/cctv/advice"
                                  className="dropdown-item dropdown-sub-item relative group block px-4 py-2 pl-6 text-sm leading-relaxed cursor-pointer uppercase border-t border-white/[0.08]"
                                  style={{ color: "#fff" }}
                                  onClick={closeDropdown}
                                >
                                  <span className="absolute top-0 left-0 w-full h-0.5 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: "#fff" }} />
                                  <span className="absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: "#fff" }} />
                                  Useful CCTV advice
                                </a>
                                <a
                                  href="/services/cctv/domestic"
                                  className="dropdown-item dropdown-sub-item relative group block px-4 py-2 pl-6 text-sm leading-relaxed cursor-pointer uppercase border-t border-white/[0.08]"
                                  style={{ color: "#fff" }}
                                  onClick={closeDropdown}
                                >
                                  <span className="absolute top-0 left-0 w-full h-0.5 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: "#fff" }} />
                                  <span className="absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: "#fff" }} />
                                  Domestic CCTV (residential)
                                </a>
                              </>
                            )}
                          </div>
                        )
                      }
                      return (
                        <a
                          key={link.href}
                          href={link.href}
                          className="dropdown-item relative group block px-4 py-2 text-sm leading-relaxed cursor-pointer transition-opacity duration-200"
                          style={{
                            color: "#fff",
                            opacity: isCctvExpanded ? 0.45 : 1,
                          }}
                          onClick={closeDropdown}
                        >
                          <span className="absolute top-0 left-0 w-full h-0.5 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: "#fff" }} />
                          <span className="absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: "#fff" }} />
                          {link.navLabel}
                        </a>
                      )
                    })}
                  </div>
                </div>
                ) : null}
              </div>
              <Link href="/about" className="pointer-events-auto nav-menu-item relative text-sm font-medium leading-relaxed cursor-pointer group uppercase header-nav-item-in" style={{ color: '#fff', animationDelay: '3.06s' }}>
                About
              </Link>
              <Link href="/delivery-methodology" className="pointer-events-auto nav-menu-item relative text-sm font-medium leading-relaxed cursor-pointer group uppercase header-nav-item-in" style={{ color: '#fff', animationDelay: '3.18s' }}>
                Methodology
              </Link>
              <Link href="/projects" className="pointer-events-auto nav-menu-item relative text-sm font-medium leading-relaxed cursor-pointer group uppercase header-nav-item-in pointer-events-auto" style={{ color: '#fff', animationDelay: '3.22s' }}>
                Projects
              </Link>
              <Link href="/contact" className="pointer-events-auto nav-menu-item relative text-sm font-medium leading-relaxed cursor-pointer group uppercase header-nav-item-in" style={{ color: '#fff', animationDelay: '3.38s' }}>
                Contact
              </Link>
              <button
                type="button"
                onClick={() => openFsHomeSearch()}
                className="fs-header-search-trigger pointer-events-auto header-nav-item-in flex h-8 w-8 min-h-8 min-w-8 items-center justify-center rounded-full border border-white transition-opacity hover:opacity-80"
                style={{ animationDelay: "3.46s" }}
                aria-label="Search services"
              >
                <Search className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
              </button>
              <div className="pointer-events-none header-nav-item-in" style={{ animationDelay: "3.54s" }}>
                <ApxSocialLinks
                  className="flex items-center gap-3 pl-0.5 pr-1 lg:pr-2"
                  iconClassName="h-4 w-4"
                  linkClassName="pointer-events-auto text-white transition-opacity hover:opacity-80"
                />
              </div>
            </div>
            {/* Chip keeps the icon readable on light and dark page tops */}
            <span className="pointer-events-auto relative z-20 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/35 bg-black shadow-[0_6px_20px_rgba(0,0,0,0.35)] lg:hidden">
              <button
                type="button"
                onClick={() => (isMenuOpen ? closeFsMenu() : setIsMenuOpen(true))}
                className={cn(
                  "fs-header-menu-trigger flex h-11 w-11 items-center justify-center border-0 bg-transparent p-0 text-white shadow-none",
                  "transition-opacity duration-200 hover:opacity-80 active:opacity-70"
                )}
                aria-expanded={isMenuOpen}
                aria-controls="fs-mobile-nav"
                aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" strokeWidth={1.6} aria-hidden />
                ) : (
                  <Menu className="h-6 w-6" strokeWidth={1.6} aria-hidden />
                )}
              </button>
            </span>
          </div>
        </div>
      </nav>

      {/* Contact tab under the bar (z below nav). Nav is pointer-events-none so these buttons still receive hover. */}
      <div className="pointer-events-auto absolute top-full right-[54px] z-[1] hidden lg:block">
        <div className="relative">
          <div
            className="header-contact-tab--dark header-contact-tab-drop-in flex items-center space-x-3 rounded-t-none rounded-b-xl border border-t-0 px-4 py-2"
            style={{
              borderColor: "#fff",
              backgroundColor: "#000",
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
                /* Tab uses translateY(-36px); layout box is still full height, anchor toast to visual bottom + ~5px */
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
                "absolute inset-0 z-0 bg-black transition-opacity duration-300 ease-out",
                fsMenuPanelIn ? "opacity-100" : "opacity-0"
              )}
              onClick={closeFsMenu}
              aria-hidden
            />
            <div
              className={cn(
                "fs-mobile-menu absolute inset-0 z-10 flex min-h-0 min-w-0 flex-col overflow-hidden bg-black",
                "pt-[max(0.75rem,env(safe-area-inset-top,0px))] pb-[max(1.25rem,env(safe-area-inset-bottom,0px))]",
                "transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
                fsMenuPanelIn ? "translate-x-0" : "translate-x-full"
              )}
              onTransitionEnd={handleFsMenuPanelTransitionEnd}
            >
              <div className="relative flex shrink-0 items-center justify-between px-5 py-2.5 sm:px-6">
                <button
                  type="button"
                  onClick={() => {
                    // Open search in the same user gesture so iOS shows the keyboard
                    openFsHomeSearch()
                    closeFsMenu()
                  }}
                  className="fs-header-menu-trigger relative z-10 flex h-10 w-10 shrink-0 items-center justify-center border-0 bg-transparent p-0 text-white shadow-none transition-opacity hover:opacity-80 active:opacity-70"
                  aria-label="Search services"
                >
                  <Search className="h-6 w-6" strokeWidth={1.6} aria-hidden />
                </button>

                <Link
                  href="/"
                  onClick={(e) => {
                    e.preventDefault()
                    closeFsMenu()
                    try {
                      sessionStorage.setItem("fs-home-scroll-top", "1")
                    } catch {
                      /* ignore */
                    }
                    if (isHomePage) {
                      try {
                        window.history.replaceState(null, "", "/")
                      } catch {
                        /* ignore */
                      }
                      forceDocumentScrollTop()
                      window.setTimeout(forceDocumentScrollTop, 50)
                      window.setTimeout(forceDocumentScrollTop, 200)
                      return
                    }
                    router.push("/")
                    window.setTimeout(forceDocumentScrollTop, 50)
                    window.setTimeout(forceDocumentScrollTop, 200)
                    window.setTimeout(forceDocumentScrollTop, 400)
                  }}
                  className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center"
                  aria-label="APX Fire & Security home"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/__APX_FS_Footer.svg"
                    alt=""
                    width={280}
                    height={94}
                    className="h-9 w-auto sm:h-10"
                    decoding="async"
                  />
                </Link>

                <button
                  type="button"
                  onClick={closeFsMenu}
                  className="fs-header-menu-trigger relative z-10 flex h-10 w-10 shrink-0 items-center justify-center border-0 bg-transparent p-0 text-white shadow-none transition-opacity hover:opacity-80 active:opacity-70"
                  aria-label="Close"
                >
                  <X className="h-7 w-7" strokeWidth={1.6} aria-hidden />
                </button>
              </div>

              <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-y-contain px-5 pb-4 sm:px-8">
                <nav className="flex flex-col pt-2" aria-label="Main">
                  {/* Services accordion */}
                  <div className="border-b border-white/10">
                    <button
                      type="button"
                      onClick={() => setIsMobileServicesOpen((o) => !o)}
                      className="flex w-full items-center justify-between gap-3 py-3.5 text-left"
                      aria-expanded={isMobileServicesOpen}
                    >
                      <span
                        className={cn(
                          "text-[1.35rem] font-semibold uppercase tracking-[0.04em] !text-white sm:text-[1.5rem]",
                          isFsNavActive("/services") && "underline decoration-white/40 underline-offset-6"
                        )}
                        style={{ fontFamily: "var(--font-menu), sans-serif" }}
                      >
                        Services
                      </span>
                      {isMobileServicesOpen ? (
                        <Minus className="h-5 w-5 shrink-0 text-white/70" strokeWidth={1.75} aria-hidden />
                      ) : (
                        <Plus className="h-5 w-5 shrink-0 text-white/70" strokeWidth={1.75} aria-hidden />
                      )}
                    </button>
                    <div
                      className={cn(
                        "grid transition-[grid-template-rows] duration-300 ease-out",
                        isMobileServicesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      )}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <ul className="mb-2 flex list-none flex-col gap-0 pb-2 pl-0">
                          <li>
                            <Link
                              href="/services"
                              onClick={closeFsMenu}
                              className="block py-2 text-sm font-semibold uppercase tracking-[0.08em] text-white/55 transition-colors hover:text-white"
                              style={{ fontFamily: "var(--font-menu), sans-serif" }}
                            >
                              All services
                            </Link>
                          </li>
                          {FS_SERVICE_NAV_LINKS.map(({ href, shortLabel }) => (
                            <li key={href}>
                              <Link
                                href={href}
                                onClick={closeFsMenu}
                                className={cn(
                                  "block py-2 text-[0.95rem] font-medium tracking-wide text-white/80 transition-colors hover:text-white",
                                  isFsNavActive(href) && "text-white"
                                )}
                                style={{ fontFamily: "var(--font-menu), sans-serif" }}
                                aria-current={isFsNavActive(href) ? "page" : undefined}
                              >
                                {shortLabel}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {FS_MOBILE_PRIMARY_LINKS.filter((l) => l.href !== "/services").map(
                    ({ href, label }, i) => {
                      const active = isFsNavActive(href)
                      return (
                        <Link
                          key={href}
                          href={href}
                          onClick={closeFsMenu}
                          className={cn(
                            "fs-mobile-menu__link relative block border-b border-white/10 py-3.5 text-left text-[1.35rem] font-semibold uppercase tracking-[0.04em] !text-white transition-opacity duration-150 sm:text-[1.5rem]",
                            "hover:opacity-80 active:bg-transparent",
                            active && "underline decoration-white/40 underline-offset-6"
                          )}
                          style={{
                            fontFamily: "var(--font-menu), sans-serif",
                            transitionDelay: fsMenuPanelIn ? `${60 + i * 30}ms` : "0ms",
                          }}
                          aria-current={active ? "page" : undefined}
                        >
                          {label}
                        </Link>
                      )
                    }
                  )}
                </nav>

                <div className="mt-auto flex flex-col gap-3 pt-8">
                  <a
                    href="tel:02083032280"
                    onClick={closeFsMenu}
                    className="inline-flex items-center gap-3 text-white transition-opacity hover:opacity-80"
                  >
                    <Phone className="h-4 w-4 shrink-0 opacity-70" strokeWidth={1.75} aria-hidden />
                    <span
                      className="text-[0.95rem] font-semibold tracking-wide"
                      style={{ fontFamily: "var(--font-menu), sans-serif" }}
                    >
                      020 8303 2280
                    </span>
                  </a>
                  <a
                    href="mailto:enquiries@apx-fs.co.uk"
                    onClick={closeFsMenu}
                    className="inline-flex items-center gap-3 text-white transition-opacity hover:opacity-80"
                  >
                    <Mail className="h-4 w-4 shrink-0 opacity-70" strokeWidth={1.75} aria-hidden />
                    <span
                      className="text-sm font-medium tracking-wide break-all"
                      style={{ fontFamily: "var(--font-menu), sans-serif" }}
                    >
                      enquiries@apx-fs.co.uk
                    </span>
                  </a>
                  <div className="border-t border-white/10 pt-4">
                    <ApxSocialLinks
                      className="flex items-center gap-5"
                      iconClassName="h-5 w-5"
                      linkClassName="text-white/70 transition-opacity hover:text-white hover:opacity-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )
      : null}
    </>
  )
}
