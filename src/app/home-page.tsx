"use client"

import Link from "next/link"
import {
  Shield,
  CheckCircle,
  ArrowRight,
  Clock,
  Cog,
  Zap,
  Wind,
  Leaf,
  Wrench,
  ChevronLeft,
  ChevronRight,
  Flame,
  type LucideIcon,
} from "lucide-react"
import { useEffect, useLayoutEffect, useState, useMemo, useCallback, useRef, type CSSProperties } from "react"
import { GlobalStyles, lightTheme, darkTheme } from '@/components/ThemeToggle'
import { useTheme } from '@/contexts/ThemeContext'
import { CountUp } from '@/components/ui/CountUp'
import { CustomPillButton } from '@/components/ui/CustomPillButton'
import { FormSubmitButton } from '@/components/ui/FormSubmitButton'
import { GlassFormPanel } from "@/components/ui/GlassFormPanel"
import { MAIN_CASE_STUDIES } from "@/data/projects"
import { getNewsArticlesSorted, NEWS_HUB_PATH } from "@/data/fsNewsArticles"
import { AboutIntroSection } from "@/components/home/AboutIntroSection"
import { GoogleBusinessReviewsSlot } from "@/components/home/GoogleBusinessReviewsSlot"
import { GOOGLE_REVIEWS_LISTING_URL } from "@/lib/googleBusinessReviews"
import HeroVideoBackground from "@/components/HeroVideoBackground"
import { HomeAccreditationsSection } from "@/components/home/HomeAccreditationsSection"
import { WhatWeOfferSection } from "@/components/home/WhatWeOfferSection"
import { HomeQuoteFormDrawShell, HOME_QUOTE_FORM_INNER_DELAY_MS } from "@/components/home/HomeQuoteFormDrawShell"
import { HomeSectionDivider } from "@/components/home/HomeSectionDivider"
import { WhereWeThrivePricingCards } from "@/components/home/WhereWeThrivePricingCards"
import { LetterReveal } from "@/components/LetterReveal"
import { LineReveal } from "@/components/LineReveal"
import { ServiceCombobox } from "@/components/ui/ServiceCombobox"
import { FS_SERVICE_QUICK_LINKS } from "@/lib/fs-service-navigation"

/** Matches contact page field glass (draw shell / animation unchanged). */
const HOME_QUOTE_FIELD_CLASS =
  "w-full rounded-none border border-white/15 bg-black px-4 py-3.5 text-[17px] font-bold text-white placeholder:text-white/40 placeholder:font-normal outline-none transition-[border,box-shadow] focus:border-white/50 focus:ring-0 focus:bg-black"

const HOME_QUOTE_SERVICES = [
  { value: "intruder-alarms", label: "Intruder Alarm Systems" },
  { value: "fire-alarms", label: "Fire Alarm Systems" },
  { value: "cctv", label: "CCTV Systems" },
  { value: "access-control", label: "Access Control Systems" },
  { value: "video-door-entry", label: "Video Door Entry Systems" },
  { value: "gate-automation", label: "Gate Automation" },
  { value: "evac-voice", label: "EVAC & Voice Alarm Systems" },
  { value: "refuge-disabled-communication", label: "Disabled Refuge, Fire Telephone & Toilet Alarm Systems" },
  { value: "monitoring", label: "Monitoring" },
  { value: "maintenance-support", label: "Maintenance, Repairs & 24/7 Call-Outs" },
  { value: "other", label: "Other" },
] as const

const FS_THRIVE_CARDS: {
  title: string
  href: string
  Icon: LucideIcon
  bullets: string[]
}[] = [
  {
    title: "Fire & Life Safety Systems",
    href: "/services/fire-life-safety",
    Icon: Flame,
    bullets: [
      "Fire alarm systems (addressable and conventional)",
      "Cause-and-effect programming (commissioning and testing)",
      "BS 5839 documentation (handover-ready records)",
    ],
  },
  {
    title: "Security Systems",
    href: "/services/security-systems",
    Icon: Shield,
    bullets: [
      "Intruder alarm systems (Grade 2 and Grade 3)",
      "CCTV (IP and analogue)",
      "Video entry, access control and gate automation (integrated site access)",
      "Monitoring and ARC signalling (alarm receiving centre)",
    ],
  },
  {
    title: "Maintenance & Support",
    href: "/services/maintenance-support",
    Icon: Wrench,
    bullets: [
      "Planned preventative maintenance (scheduled service visits)",
      "24/7 call-out support (emergency response)",
      "System upgrades (compliance checks and improvements)",
    ],
  },
]

const WHY_CHOOSE_CARDS: { Icon: LucideIcon; title: string; bullets: string[] }[] = [
  {
    Icon: CheckCircle,
    title: "NSI Gold Approved",
    bullets: [
      "NSI Gold, Security",
      "NSI Fire Gold",
      "BS EN ISO 9001:2015",
      "BAFE Fire Safety Registered",
    ],
  },
  {
    Icon: Clock,
    title: "24/7 Call-Out & Monitoring",
    bullets: [
      "24/7 emergency call-out cover",
      "ARC signalling and monitoring options",
      "Rapid engineer response",
      "Ongoing system health support",
    ],
  },
  {
    Icon: Shield,
    title: "Quality Guarantee",
    bullets: [
      "Constructionline Gold Member",
      "Work to NSI Gold standards",
      "FIA Full Member (trade association)",
      "Documented handover and aftercare",
    ],
  },
]

/** Homepage news strip */
const FS_SHOW_NEWS_AND_ARTICLES = true

export default function Home() {
  const { theme } = useTheme()
  const themeMode = theme === "light" ? lightTheme : darkTheme
  
  const [, setActiveSection] = useState(0)
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false)
  const [selectedService, setSelectedService] = useState('')
  
  const [activeMepIndex] = useState(0)
  const [activeNewsIndex, setActiveNewsIndex] = useState(0)
  const [newsProgress, setNewsProgress] = useState(0)
  const newsProgressRef = useRef(0)
  const newsIndexRef = useRef(0)
  const mepListRef = useRef<HTMLUListElement>(null)
  const projectsScrollRef = useRef<HTMLDivElement>(null)
  const projectsViewportRef = useRef<HTMLDivElement>(null)
  const projectsStripAnchorRef = useRef<HTMLDivElement>(null)
  const projectsSectionRef = useRef<HTMLElement>(null)
  const projectsHorizontalPxRef = useRef(0)
  const [heroAnimation, setHeroAnimation] = useState({
    videoVisible: false,
    titleVisible: false,
    subtitleVisible: false,
  })
  const [sectionMotion, setSectionMotion] = useState({
    core: false,
    aboutIntro: false,
    services: false,
    projects: false,
    news: false,
    marquee: false,
    testimonials: false,
    contact: false,
    about: false,
  })
  const clientLogoPaths = useMemo(() => {
    const base = ['_-01', '_-02', '_-03', '_-04', '_-05', '_-06', '_-07', '_-08', '_-09', '_-10', '_-11']
    const paths = base.map((name) => `/Clients/${name}.png`)
    const minPerRow = 16
    const repeated: string[] = []
    while (repeated.length < minPerRow) repeated.push(...paths)
    return repeated.slice(0, minPerRow)
  }, [])

  const sections = useMemo(() => [
    { id: 'hero', name: 'Home' },
    { id: 'core-capabilities', name: 'Capabilities' },
    { id: 'services', name: 'Services' },
    { id: 'about-intro', name: 'Our story' },
    { id: 'projects', name: 'Projects' },
    { id: 'about', name: 'Why Choose Us' },
    { id: 'accreditations', name: 'Accreditations & Memberships' },
    { id: 'logo-marquee', name: 'Clients' },
    ...(FS_SHOW_NEWS_AND_ARTICLES ? ([{ id: 'why-mep', name: 'News & Articles' }] as const) : []),
    // Reviews section temporarily hidden, restore nav entry when re-shown
    { id: 'contact', name: 'Contact' }
  ], [])

  const mepCards = useMemo(() => [
    { id: 'retail', title: 'Retail & High Street', description: 'Integrated CCTV, access control and intruder alarms for single sites and multi-branch retail. Remote monitoring, till-area coverage and out-of-hours protection.', href: '/services', icon: Cog, image: '/cctv%20systems.jpg' },
    { id: 'corporate', title: 'Corporate & Offices', description: 'Access control, fire detection and video door entry for commercial buildings. Reception integration, visitor management and evacuation compliance.', href: '/services', icon: Zap, image: '/access%20control%20systems.jpg' },
    { id: 'education', title: 'Education & Schools', description: 'Fire alarms, access control and CCTV meeting safeguarding and DfE guidelines. Site-wide coverage, lockdown capability and 24/7 monitoring.', href: '/services', icon: Wind, image: '/home-fire-alarm-system-installer-800x533.jpg' },
    { id: 'healthcare', title: 'Healthcare & Care Homes', description: 'Monitored fire and intruder systems for hospitals, clinics and care homes. BS 5839 compliance, nurse-call integration and emergency response.', href: '/services', icon: Leaf, image: '/intruder%20alarm%20systems.jpg' },
    { id: 'industrial', title: 'Industrial & Warehousing', description: 'Perimeter security, CCTV and fire systems for logistics and manufacturing. Large-site coverage, gate access and hazardous-area detection.', href: '/services', icon: Wrench, image: '/cctv%20systems.jpg' },
  ], [])

  const newsArticles = useMemo(
    () =>
      getNewsArticlesSorted().slice(0, 3).map((article) => ({
        id: article.slug,
        title: article.title,
        href: `/news/${article.slug}`,
        image: article.imageSrc,
      })),
    [],
  )

  const projects = useMemo(
    () =>
      MAIN_CASE_STUDIES.map((project) => ({
        image: project.heroImage,
        stat: project.sector,
        location: project.location,
        description: project.shortDescription,
        href: `/projects/${project.slug}`,
        title: project.title,
      })),
    []
  )

  const scrollProjects = useCallback((dir: "left" | "right") => {
    const strip = projectsScrollRef.current
    const view = projectsViewportRef.current
    if (!strip || !view) return
    const maxX = Math.max(0, strip.scrollWidth - view.clientWidth)
    const card = strip.querySelector("a.projects-card") as HTMLElement | null
    const step = (card?.offsetWidth ?? 360) + 24
    const cur = projectsHorizontalPxRef.current
    const next = dir === "left" ? Math.max(0, cur - step) : Math.min(maxX, cur + step)
    projectsHorizontalPxRef.current = next
    strip.style.transform = `translate3d(${-next}px,0,0)`
  }, [])

  useLayoutEffect(() => {
    const strip = projectsScrollRef.current
    const view = projectsViewportRef.current
    const section = projectsSectionRef.current
    if (!strip || !view || !section) return

    const applyTransform = () => {
      strip.style.transform = `translate3d(${-projectsHorizontalPxRef.current}px,0,0)`
    }

    const clampToMax = () => {
      const maxX = Math.max(0, strip.scrollWidth - view.clientWidth)
      projectsHorizontalPxRef.current = Math.min(projectsHorizontalPxRef.current, maxX)
      applyTransform()
    }

    const onScrollReset = () => {
      const r = section.getBoundingClientRect()
      if (r.bottom < -80 || r.top > window.innerHeight + 80) {
        if (projectsHorizontalPxRef.current !== 0) {
          projectsHorizontalPxRef.current = 0
          applyTransform()
        }
      }
    }

    clampToMax()
    const ro = new ResizeObserver(clampToMax)
    ro.observe(strip)
    window.addEventListener("resize", clampToMax)
    window.addEventListener("scroll", onScrollReset, { passive: true })
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", clampToMax)
      window.removeEventListener("scroll", onScrollReset)
    }
  }, [projects.length])

  // Projects: strip anchor crosses LOCK_LINE; cards viewport bottom > -72 keeps pan through subpixel / fast frames.
  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const strip = projectsScrollRef.current
    const view = projectsViewportRef.current
    if (!strip || !view) return

    /** Higher = horizontal wheel starts sooner (strip anchor can be lower on screen). Tune vs fixed header. */
    const LOCK_LINE_PX = 252

    const anchorAllowsStripPan = () => {
      const anchor = projectsStripAnchorRef.current
      const v = projectsViewportRef.current
      if (!anchor || !v) return false
      const ar = anchor.getBoundingClientRect()
      const vr = v.getBoundingClientRect()
      return ar.top <= LOCK_LINE_PX && vr.bottom > -72
    }

    const maxX = () => {
      const v = projectsViewportRef.current
      const s = projectsScrollRef.current
      if (!v || !s) return 0
      return Math.max(0, s.scrollWidth - v.clientWidth)
    }

    const onWheel = (e: WheelEvent) => {
      const v = projectsViewportRef.current
      const s = projectsScrollRef.current
      if (!v || !s) return
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return
      if (!anchorAllowsStripPan()) return
      const mx = maxX()
      if (mx <= 0) return

      const x = projectsHorizontalPxRef.current
      const atStart = x <= 0
      const atEnd = x >= mx - 1

      if (e.deltaY > 0 && atEnd) return
      if (e.deltaY < 0 && atStart) return

      e.preventDefault()
      e.stopPropagation()

      const scale = 1.35
      let delta = e.deltaY * scale
      delta = Math.sign(delta) * Math.min(380, Math.abs(delta))
      projectsHorizontalPxRef.current = Math.min(mx, Math.max(0, x + delta))
      s.style.transform = `translate3d(${-projectsHorizontalPxRef.current}px,0,0)`
    }

    const opts: AddEventListenerOptions = { passive: false, capture: true }
    window.addEventListener("wheel", onWheel, opts)
    return () => window.removeEventListener("wheel", onWheel, opts)
  }, [])

  // Hero animation sequence
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setHeroAnimation(prev => ({ ...prev, videoVisible: true }))
    }, 120)

    const timer2 = setTimeout(() => {
      setHeroAnimation(prev => ({ ...prev, titleVisible: true }))
    }, 480)

    const timer3 = setTimeout(() => {
      setHeroAnimation(prev => ({ ...prev, subtitleVisible: true }))
    }, 760)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  // Scroll-in effects for content only (never section backgrounds)
  useEffect(() => {
    const sectionIds = [
      { id: "core-capabilities", key: "core" as const },
      { id: "about-intro", key: "aboutIntro" as const },
      { id: "services", key: "services" as const },
      { id: "projects", key: "projects" as const },
      { id: "logo-marquee", key: "marquee" as const },
      ...(FS_SHOW_NEWS_AND_ARTICLES ? ([{ id: "why-mep", key: "news" as const }] as const) : []),
      { id: "testimonials", key: "testimonials" as const },
      { id: "contact", key: "contact" as const },
      { id: "about", key: "about" as const },
    ]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const hit = sectionIds.find((s) => s.id === entry.target.id)
          if (!hit) return
          setSectionMotion((prev) => (prev[hit.key] ? prev : { ...prev, [hit.key]: true }))
        })
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    )
    sectionIds.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    const unlockVisibleSections = () => {
      const vh = window.innerHeight
      sectionIds.forEach(({ id, key }) => {
        const el = document.getElementById(id)
        if (!el) return
        const r = el.getBoundingClientRect()
        if (r.top < vh * 0.92 && r.bottom > 64) {
          setSectionMotion((prev) => (prev[key] ? prev : { ...prev, [key]: true }))
        }
      })
    }
    requestAnimationFrame(() => requestAnimationFrame(unlockVisibleSections))
    return () => observer.disconnect()
  }, [])

  // News: buffer fills over 5s, then advances to next article
  useEffect(() => {
    if (!FS_SHOW_NEWS_AND_ARTICLES) return
    const total = Math.min(newsArticles.length, 3)
    if (total === 0) return
    newsIndexRef.current = 0
    newsProgressRef.current = 0
    setActiveNewsIndex(0)
    setNewsProgress(0)
    const id = setInterval(() => {
      newsProgressRef.current += 0.01
      if (newsProgressRef.current >= 1) {
        newsProgressRef.current = 0
        newsIndexRef.current = (newsIndexRef.current + 1) % total
        setActiveNewsIndex(newsIndexRef.current)
      }
      setNewsProgress(newsProgressRef.current)
    }, 50)
    return () => clearInterval(id)
  }, [newsArticles.length])

  const updateActiveSection = useCallback((sectionId: string) => {
    const sectionIndex = sections.findIndex(section => section.id === sectionId)
    if (sectionIndex !== -1) {
      setActiveSection(sectionIndex)
    }
  }, [sections])

  useEffect(() => {
    // Use Intersection Observer for better performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id
            updateActiveSection(sectionId)
          }
        })
      },
      {
        threshold: 0.5, // Trigger when 50% of section is visible
        rootMargin: '-20% 0px -20% 0px' // Add some margin to avoid multiple triggers
      }
    )

    // Observe all sections
    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) {
        observer.observe(element)
      }
    })

    // Pointer tracking for service cards
    const setupPointerTracking = () => {
      const cards = document.querySelectorAll('.service-card')
      
      const centerOfElement = ($el: Element) => {
        const rect = $el.getBoundingClientRect()
        return [rect.width / 2, rect.height / 2]
      }

      const pointerPositionRelativeToElement = ($el: Element, e: MouseEvent) => {
        const pos = [e.clientX, e.clientY]
        const rect = $el.getBoundingClientRect()
        const x = pos[0] - rect.left
        const y = pos[1] - rect.top
        const px = Math.min(Math.max((100 / rect.width) * x, 0), 100)
        const py = Math.min(Math.max((100 / rect.height) * y, 0), 100)
        return { pixels: [x, y], percent: [px, py] }
      }

      const angleFromPointerEvent = ($el: Element, dx: number, dy: number) => {
        let angleRadians = 0
        let angleDegrees = 0
        if (dx !== 0 || dy !== 0) {
          angleRadians = Math.atan2(dy, dx)
          angleDegrees = angleRadians * (180 / Math.PI) + 90
          if (angleDegrees < 0) {
            angleDegrees += 360
          }
        }
        return angleDegrees
      }

      const distanceFromCenter = ($card: Element, x: number, y: number) => {
        const [cx, cy] = centerOfElement($card)
        return [x - cx, y - cy]
      }

      const closenessToEdge = ($card: Element, x: number, y: number) => {
        const [cx, cy] = centerOfElement($card)
        const [dx, dy] = distanceFromCenter($card, x, y)
        let k_x = Infinity
        let k_y = Infinity
        if (dx !== 0) {
          k_x = cx / Math.abs(dx)
        }
        if (dy !== 0) {
          k_y = cy / Math.abs(dy)
        }
        return Math.min(Math.max(1 / Math.min(k_x, k_y), 0), 1)
      }

      const cardUpdate = (e: Event) => {
        const mouseEvent = e as MouseEvent
        const $card = e.currentTarget as Element
        const position = pointerPositionRelativeToElement($card, mouseEvent)
        const [px, py] = position.pixels
        const [perx, pery] = position.percent
        const [dx, dy] = distanceFromCenter($card, px, py)
        const edge = closenessToEdge($card, px, py)
        const angle = angleFromPointerEvent($card, dx, dy)

        ;($card as HTMLElement).style.setProperty('--pointer-x', `${perx.toFixed(3)}%`)
        ;($card as HTMLElement).style.setProperty('--pointer-y', `${pery.toFixed(3)}%`)
        ;($card as HTMLElement).style.setProperty('--pointer-°', `${angle.toFixed(3)}deg`)
        ;($card as HTMLElement).style.setProperty('--pointer-d', `${(edge * 100).toFixed(3)}`)
        
        $card.classList.remove('animating')
      }

      cards.forEach(card => {
        card.addEventListener('pointermove', cardUpdate as EventListener)
        card.addEventListener('mousemove', cardUpdate as EventListener) // Fallback for mouse events
      })

      return () => {
        cards.forEach(card => {
          card.removeEventListener('pointermove', cardUpdate as EventListener)
          card.removeEventListener('mousemove', cardUpdate as EventListener)
        })
      }
    }


    
    const cleanup = setupPointerTracking()
    
    return () => {
      observer.disconnect()
      cleanup()
    }
  }, [sections, updateActiveSection])

  // Force dark mode styling for form
  useEffect(() => {
    const applyDarkModeStyles = () => {
      const form = document.getElementById('quote-form');
      if (!form) return;

      // Use the same theme detection as header
      const isDarkMode = theme === 'dark';
      
      // Apply proper styling based on theme
      if (isDarkMode) {
        // Form container
        form.style.backgroundColor = '#000000';
        form.style.border = '1px solid #ffffff';
        
        // Title
        const title = form.querySelector('h3');
        if (title) {
          title.style.color = '#ffffff';
        }
        
        // Labels
        const labels = form.querySelectorAll('label');
        labels.forEach((label) => {
          (label as HTMLLabelElement).style.color = '#ffffff';
        });
        
        // Text inputs and textarea
        const textInputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea');
        textInputs.forEach((input) => {
          const el = input as HTMLInputElement | HTMLTextAreaElement
          el.style.backgroundColor = '#000000'
          el.style.border = '1px solid #ffffff'
          el.style.color = '#ffffff'
          el.style.fontSize = '1.0625rem'
          el.style.fontWeight = '600'
          el.style.outline = 'none'
          el.style.boxShadow = 'none'
          el.style.setProperty('--tw-ring-color', 'transparent', 'important')
        })

        const serviceDropdown = form.querySelector('.quote-form-dropdown') as HTMLElement | null
        if (serviceDropdown) {
          serviceDropdown.style.backgroundColor = '#000000'
          serviceDropdown.style.fontSize = '1.0625rem'
          serviceDropdown.style.fontWeight = '700'
        }

        // Select dropdown - custom styling (if present)
        const select = form.querySelector('select');
        if (select) {
          select.style.backgroundColor = '#000000';
          select.style.border = '1px solid #ffffff';
          select.style.color = '#ffffff';
          select.style.outline = 'none';
          select.style.boxShadow = 'none';
          select.style.appearance = 'none';
          select.style.backgroundImage = 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'white\' stroke-width=\'3\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6,9 12,15 18,9\'%3e%3c/polyline%3e%3c/svg%3e")';
          select.style.backgroundRepeat = 'no-repeat';
          select.style.backgroundPosition = 'right 12px center';
          select.style.backgroundSize = '20px';
          select.style.paddingRight = '50px';
        }
        
        // Preferred contact radios: styled in globals.css (#contact #quote-form), white fill when checked
        
        // Submit button
        const button = form.querySelector('button');
        if (button) {
          button.style.backgroundColor = '#000000';
          button.style.border = '1px solid #ffffff';
          button.style.color = '#ffffff';
        }
      } else {
        // Light mode - reset all custom styling
        form.style.backgroundColor = '#ffffff';
        form.style.border = '1px solid #000000';
        
        // Title
        const title = form.querySelector('h3');
        if (title) {
          title.style.color = '#000000';
        }
        
        // Labels
        const labels = form.querySelectorAll('label');
        labels.forEach((label) => {
          (label as HTMLLabelElement).style.color = '#000000';
        });
        
        // Text inputs and textarea
        const textInputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea');
        textInputs.forEach((input) => {
          const el = input as HTMLInputElement | HTMLTextAreaElement
          el.style.backgroundColor = '#ffffff'
          el.style.border = '1px solid #000000'
          el.style.color = '#000000'
          el.style.fontSize = ''
          el.style.fontWeight = ''
          el.style.outline = 'none'
          el.style.boxShadow = 'none'
        })

        const serviceDropdownLight = form.querySelector('.quote-form-dropdown') as HTMLElement | null
        if (serviceDropdownLight) {
          serviceDropdownLight.style.fontSize = ''
          serviceDropdownLight.style.fontWeight = ''
        }

        // Select dropdown - reset to default browser styling
        const select = form.querySelector('select');
        if (select) {
          select.style.backgroundColor = '#ffffff';
          select.style.border = '1px solid #000000';
          select.style.color = '#000000';
          select.style.outline = 'none';
          select.style.boxShadow = 'none';
          select.style.appearance = 'auto'; // Reset to browser default
          select.style.backgroundImage = 'none';
          select.style.backgroundRepeat = 'initial';
          select.style.backgroundPosition = 'initial';
          select.style.backgroundSize = 'initial';
          select.style.paddingRight = 'initial';
        }
        
        // Preferred contact radios: styled in globals.css (#contact #quote-form)
        
        // Submit button
        const button = form.querySelector('button');
        if (button) {
          button.style.backgroundColor = '#ffffff';
          button.style.border = '1px solid #000000';
          button.style.color = '#000000';
        }
      }
    };

    // Apply styles immediately and with delay to ensure form exists
    setTimeout(applyDarkModeStyles, 100);
    setTimeout(applyDarkModeStyles, 500);
    setTimeout(applyDarkModeStyles, 1000);
    
    // Also apply on window load
    window.addEventListener('load', applyDarkModeStyles);
    
    // Manual dark mode toggle for debugging
    window.toggleFormDarkMode = () => {
      const form = document.getElementById('quote-form');
      if (!form) return;
      
      const isCurrentlyDark = form.style.backgroundColor === 'rgb(0, 0, 0)';
      
      if (isCurrentlyDark) {
        // Switch to light mode
        form.style.backgroundColor = '#ffffff';
        form.style.border = '1px solid #000000';
        // ... add all light mode styles
      } else {
        // Switch to dark mode
        form.style.backgroundColor = '#000000';
        form.style.border = '1px solid #ffffff';
        // ... add all dark mode styles
      }
    };
    
    // Watch for theme changes
    const observer = new MutationObserver(applyDarkModeStyles);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, [theme]);

  // MEP cards: CodePen exact, set grid columns and data-active, then resync --article-width after layout
  useEffect(() => {
    const list = mepListRef.current
    if (!list) return
    const items = list.querySelectorAll('li')
    const cols = mepCards.map((_, i) => (i === activeMepIndex ? '10fr' : '1fr')).join(' ')
    list.style.setProperty('grid-template-columns', cols)
    const resync = () => {
      const w = Math.max(...[...items].map((el) => (el as HTMLElement).offsetWidth))
      list.style.setProperty('--article-width', String(w))
    }
    requestAnimationFrame(() => requestAnimationFrame(resync))
  }, [activeMepIndex, mepCards])

  useEffect(() => {
    const list = mepListRef.current
    if (!list) return
    const items = list.querySelectorAll('li')
    const resync = () => {
      const w = Math.max(...[...items].map((el) => (el as HTMLElement).offsetWidth))
      list.style.setProperty('--article-width', String(w))
    }
    window.addEventListener('resize', resync)
    resync()
    return () => window.removeEventListener('resize', resync)
  }, [])

  return (
    <>
      <GlobalStyles theme={themeMode} />
      <div className="home-page-trial min-h-screen overflow-x-clip relative z-10">

      {/* Hero Section, full viewport height */}
      <section
        id="hero"
        className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-black"
      >
        <HeroVideoBackground />
        <div
          className={`relative z-20 site-container flex min-h-[100dvh] w-full flex-col pb-5 sm:pb-6 lg:pb-8 transition-all duration-1000 ${
            heroAnimation.videoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center space-y-4 pt-20 text-center min-[400px]:pt-[5.25rem] sm:pt-24 md:pt-[6.25rem] lg:mx-0 lg:max-w-xl lg:items-start lg:justify-center lg:pt-24 lg:text-left xl:max-w-2xl xl:pt-28">
            <div className="space-y-2 sm:space-y-2.5">
              <p
                className={`hero-mantra text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70 transition-all duration-1000 sm:text-xs ${
                  heroAnimation.titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ fontFamily: "var(--font-menu)" }}
              >
                Protect. Prevent. Perform.
              </p>
              <h1
                className={`hero-title-reveal mb-0 font-title text-4xl font-extrabold uppercase leading-[1.02] tracking-wide text-white transition-all duration-[1200ms] sm:text-5xl md:text-6xl lg:text-7xl ${
                  heroAnimation.titleVisible ? "opacity-100 translate-y-0 blur-0 scale-100" : "opacity-0 translate-y-16 blur-[8px] scale-[0.985]"
                }`}
              >
                <span className="block">The Fire &amp;</span>
                <span className="block">
                  Security{" "}
                  <span className="hero-title-accent">Specialists</span>
                </span>
              </h1>
            </div>
            <p
              className={`hero-subtitle-reveal mx-auto mt-2 max-w-2xl text-lg font-bold tracking-tight text-white transition-all duration-1000 sm:mt-3 sm:text-xl md:mt-4 md:text-2xl lg:mx-0 ${
                heroAnimation.titleVisible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-12 blur-[6px]"
              }`}
            >
              APX Fire &amp; Security is an NSI Gold-approved specialist in fire, life-safety and electronic security systems.
            </p>

            <div
              className={`hero-cta-reveal flex flex-wrap items-center justify-center gap-4 pt-2 transition-all duration-1000 sm:gap-6 lg:justify-start ${
                heroAnimation.subtitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-14"
              }`}
            >
              <CustomPillButton href="#quote-form" size="md">
                Get a free quote
              </CustomPillButton>
              <a
                href="tel:02083032280"
                className="text-base font-normal text-white underline underline-offset-4 transition-colors duration-300 hover:text-white/90"
              >
                Have a question? Call us.
              </a>
            </div>
          </div>

          <nav
            aria-label="Services quick navigation"
            className="hero-services-quick-nav mt-auto w-full min-w-0 pt-8 sm:pt-10 lg:pt-0"
          >
            {/* Mobile: forced two rows (even split). sm+: single wrapping strip. */}
            <div className="flex w-full flex-col gap-1.5 sm:hidden">
              {[
                FS_SERVICE_QUICK_LINKS.slice(0, Math.ceil(FS_SERVICE_QUICK_LINKS.length / 2)),
                FS_SERVICE_QUICK_LINKS.slice(Math.ceil(FS_SERVICE_QUICK_LINKS.length / 2)),
              ].map((row, rowIndex) => {
                const rowOffset = rowIndex * Math.ceil(FS_SERVICE_QUICK_LINKS.length / 2)
                return (
                  <ul
                    key={rowIndex}
                    className="m-0 flex w-full list-none flex-wrap items-center justify-center gap-x-0.5 gap-y-1 p-0"
                  >
                    {row.map(({ href, label }, i) => (
                      <li
                        key={href}
                        className={`hero-services-quick-nav__item shrink-0 ${
                          heroAnimation.subtitleVisible ? "hero-services-quick-nav__item--in" : ""
                        }`}
                        style={
                          {
                            "--nav-delay": `${(rowOffset + i) * 70}ms`,
                          } as CSSProperties
                        }
                      >
                        <Link href={href} className="hero-services-quick-nav__link">
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )
              })}
            </div>
            <ul className="m-0 hidden w-full max-w-full list-none flex-wrap items-center justify-start gap-x-0.5 gap-y-1 p-0 sm:flex">
              {FS_SERVICE_QUICK_LINKS.map(({ href, label }, i) => (
                <li
                  key={href}
                  className={`hero-services-quick-nav__item shrink-0 ${
                    heroAnimation.subtitleVisible ? "hero-services-quick-nav__item--in" : ""
                  }`}
                  style={
                    {
                      "--nav-delay": `${i * 70}ms`,
                    } as CSSProperties
                  }
                >
                  <Link href={href} className="hero-services-quick-nav__link">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* Core capabilities, brick texture behind Where We Thrive */}
      <section
        id="core-capabilities"
        className="relative overflow-hidden bg-black pt-28 pb-10 md:pt-28 md:pb-12 lg:pt-32 lg:pb-14"
      >
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("/brick-wall-texture.jpg")' }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-black/72"
          aria-hidden
        />
        {/* Top black feather: continues hero fade into brick texture */}
        <div
          className="pointer-events-none absolute top-0 left-0 right-0 z-[2] h-44 sm:h-56 md:h-64 lg:h-72"
          style={{
            background:
              "linear-gradient(to bottom, #000 0%, #000 28%, rgba(0,0,0,0.82) 52%, rgba(0,0,0,0.4) 78%, rgba(0,0,0,0) 100%)",
          }}
          aria-hidden
        />

        <div className="site-container relative z-10">
          <div className="max-w-3xl">
            <span
              className={`section-label text-white/80 font-bold home-scroll-rise ${
                sectionMotion.core ? "opacity-100 translate-y-0" : "opacity-0 translate-y-14"
              }`}
              style={{ fontFamily: "var(--font-menu), sans-serif" }}
            >
              Core capabilities
            </span>
            <LetterReveal
              as="h2"
              text="Where We Thrive"
              className="home-section-title mt-3 text-white font-title"
              active={sectionMotion.core}
            />
            <LineReveal
              as="p"
              text="APX Fire and Security understands the importance of delivering compliant, reliable systems that integrate seamlessly with wider building services. We recognise the need for clear coordination, minimal disruption, and accurate installation aligned with design intent."
              className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base"
              active={sectionMotion.core}
              delayMs={120}
            />
          </div>

          <div className="mt-14 md:mt-16 lg:mt-20">
            <WhereWeThrivePricingCards cards={FS_THRIVE_CARDS} />
          </div>
        </div>
      </section>

      <HomeSectionDivider surface="on-dark" width="full" />

      {/* Wrapper so CCTV overlay can sit above both about and services */}
      <div className="relative">
        {/* Services Section, cards animate in one at a time (path animation), top row first */}
        <section id="services" className="home-services-band section-spacing relative overflow-visible bg-black">
        <div className="site-container">
          <div className="section-content-gap space-y-16 text-white">
            <WhatWeOfferSection />
          </div>
        </div>
        </section>

        <AboutIntroSection />
      </div>

      {/* Projects: sticky block; wheel pans strip when anchor crosses LOCK_LINE */}
      <section
        ref={projectsSectionRef}
        id="projects"
        className="projects-section overflow-x-clip pb-10 sm:pb-12 lg:pb-14 scroll-mt-24"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div
          className="projects-section__sticky sticky top-0 z-20 flex min-h-[100dvh] flex-col"
          style={{ backgroundColor: "#ffffff" }}
        >
            <div className="site-container relative z-30 shrink-0 pt-24 lg:pt-28">
              <div className="projects-section-head flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <div>
                  <span
                    className={`section-label section-label--black home-scroll-rise ${
                      sectionMotion.projects ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
                    }`}
                  >
                    Projects
                  </span>
                  <LetterReveal
                    as="h2"
                    text="Built to last, delivered with care."
                    className="home-section-title text-black font-title"
                    active={sectionMotion.projects}
                  />
                </div>
                <div
                  className={`flex items-center gap-3 shrink-0 home-scroll-rise ${
                    sectionMotion.projects ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => scrollProjects("left")}
                    className="projects-nav-btn w-12 h-12 rounded-full border border-black bg-transparent text-black flex items-center justify-center transition-colors hover:bg-black hover:text-white focus:bg-black focus:text-white"
                    aria-label="Previous projects"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollProjects("right")}
                    className="projects-nav-btn w-12 h-12 rounded-full border border-black bg-transparent text-black flex items-center justify-center transition-colors hover:bg-black hover:text-white focus:bg-black focus:text-white"
                    aria-label="Next projects"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            <div
              className={`relative flex min-h-0 flex-1 flex-col home-scroll-rise delay-100 ${
                sectionMotion.projects ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
              }`}
            >
              <div
                ref={projectsViewportRef}
                className="relative w-full min-h-0 flex-1 overflow-x-hidden overflow-y-visible pt-6 pb-4 sm:pt-8 sm:pb-5 lg:pt-10 lg:pb-6"
              >
                <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-x-hidden overflow-y-visible">
                  <div
                    ref={projectsStripAnchorRef}
                    className="pointer-events-none h-px w-full shrink-0 overflow-hidden opacity-0"
                    aria-hidden
                  />
                  <div
                    ref={projectsScrollRef}
                    className="projects-strip site-gutter-x flex w-max items-stretch gap-6 pb-3 will-change-transform sm:pb-4"
                  >
                  {projects.map((p, i) => (
                    <div key={i} className="projects-card-shelf flex shrink-0 self-start pt-4 sm:pt-5">
                      <Link
                        href={p.href}
                        className="projects-card group flex flex-col rounded-xl bg-black transition-transform duration-300 ease-out hover:-translate-y-2"
                      >
                        <div className="flex flex-col overflow-hidden rounded-xl">
                          <div className="relative aspect-[3/4] min-h-[480px] projects-card__inner">
                            <span
                              className="projects-card-number absolute top-6 right-6 z-10 text-5xl font-bold text-white tabular-nums drop-shadow-md sm:text-6xl"
                              style={{ fontFamily: 'var(--font-title, "Outfit", sans-serif)' }}
                              aria-hidden
                            >
                              {(i + 1).toString().padStart(2, "0")}
                            </span>
                            <div
                              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                              style={{ backgroundImage: `url(${p.image})` }}
                            />
                            <div className="projects-card-glass absolute inset-x-0 bottom-0 top-1/2 flex flex-col justify-end overflow-hidden p-6 pb-5 pr-16 pt-20">
                              <div className="projects-card-glass-backdrop pointer-events-none absolute inset-0" aria-hidden>
                                <div
                                  className="projects-card-glass-blur absolute inset-0 bg-cover bg-center"
                                  style={{ backgroundImage: `url(${p.image})` }}
                                />
                                <div className="projects-card-glass-overlay absolute inset-0" />
                              </div>
                              <div className="relative z-20">
                                <p className="mb-2 text-[11px] uppercase tracking-[0.14em] text-white">{p.stat}</p>
                                <p className="mb-1.5 min-h-[4.8rem] text-[clamp(1.45rem,2.4vw,2rem)] font-bold leading-[1.12] text-white">{p.title}</p>
                                <p className="mb-2.5 text-xs uppercase tracking-[0.11em] text-white/90">{p.location}</p>
                                <p className="mb-4 text-sm leading-relaxed text-white">{p.description}</p>
                              </div>
                              <span
                                className="projects-card-arrow absolute bottom-5 right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition-transform duration-200 group-hover:rotate-12"
                                aria-hidden
                              >
                                <ChevronRight className="h-5 w-5" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HomeSectionDivider surface="on-light" width="full" />

      {/* Why Choose Us, canted top and bottom */}
      <section
        id="about"
        className={`section-spacing section-canted-top section-canted-bottom transition-opacity duration-300 ${
          sectionMotion.about ? "home-about--in-view" : ""
        }`}
      >
        <div className="site-container">
          <div className="section-content-gap space-y-16">
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-20">
              <div className="why-choose-us-copy min-w-0 text-black">
                <span className="section-label section-label--black about-reveal" style={{ transitionDelay: "0ms" }}>TRUSTED &amp; ACCREDITED</span>
                <LetterReveal
                  as="h2"
                  text="Trust, quality, peace of mind."
                  className="home-section-title section-title-gap font-title text-black"
                  active={sectionMotion.about}
                  delayMs={80}
                />
                <LineReveal
                  as="p"
                  text="Building on a heritage dating back to 1986, APX Fire & Security (formerly Smiths Technical Systems Ltd) designs, installs and maintains integrated fire, life-safety and electronic security systems across London and the Home Counties. We hold NSI Gold approval for both security and fire, with 24/7 call-out cover and monitoring options available where your site needs them."
                  className="section-intro-gap mt-8 max-w-xl text-base leading-relaxed text-gray-600 md:mt-10"
                  active={sectionMotion.about}
                  delayMs={160}
                />

                <div
                  className="stats-section mt-10 flex max-w-xl flex-col gap-4 sm:mt-12 sm:flex-row sm:flex-wrap sm:items-stretch sm:justify-start sm:gap-4"
                  data-stats-section
                >
                  <div className="stats-card rounded-xl px-6 py-5 text-center animate-stats-in sm:flex-1 sm:min-w-[9rem]" style={{ animationDelay: "320ms" }}>
                    <div className="stats-card-number text-3xl font-bold leading-none sm:text-4xl" data-stats-text style={{ color: "#000000" }}>
                      <CountUp target={500} suffix="+" duration={2000} />
                    </div>
                    <div className="stats-card-label mt-2 text-sm" data-stats-text style={{ color: "#000000" }}>
                      Projects Completed
                    </div>
                  </div>
                  <div className="stats-card rounded-xl px-6 py-5 text-center animate-stats-in sm:flex-1 sm:min-w-[9rem]" style={{ animationDelay: "420ms" }}>
                    <div className="stats-card-number text-3xl font-bold leading-none sm:text-4xl" data-stats-text style={{ color: "#000000" }}>
                      <CountUp target={99} suffix="%" duration={2000} />
                    </div>
                    <div className="stats-card-label mt-2 text-sm" data-stats-text style={{ color: "#000000" }}>
                      Customer Satisfaction
                    </div>
                  </div>
                  <div className="stats-card rounded-xl px-6 py-5 text-center animate-stats-in sm:flex-1 sm:min-w-[9rem]" style={{ animationDelay: "520ms" }}>
                    <div className="stats-card-number text-3xl font-bold leading-none sm:text-4xl" data-stats-text style={{ color: "#000000" }}>
                      <CountUp target={20} suffix="+" duration={2000} />
                    </div>
                    <div className="stats-card-label mt-2 text-sm" data-stats-text style={{ color: "#000000" }}>
                      Years Experience
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid w-full min-w-0 grid-cols-1 gap-6 self-center lg:ml-auto lg:max-w-[46rem] lg:grid-cols-2 lg:gap-x-5 lg:gap-y-8 lg:justify-self-end">
                {WHY_CHOOSE_CARDS.map(({ Icon, title, bullets }, idx) => (
                  <div key={title} className="why-choose-card-shell about-reveal flex h-full min-h-0 min-w-0 flex-col items-center" style={{ transitionDelay: `${360 + idx * 90}ms` }}>
                    <div
                      className="why-choose-icon-badge relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/25 bg-black shadow-[0_6px_22px_rgba(0,0,0,0.5)] md:h-12 md:w-12 md:rounded-xl"
                      aria-hidden
                    >
                      <Icon className="h-5 w-5 shrink-0 text-white/90 md:h-6 md:w-6" strokeWidth={1.5} />
                    </div>
                    <article className="why-choose-card -mt-6 flex min-h-0 w-full min-w-0 flex-1 flex-col rounded-tl-[1.35rem] rounded-br-[1.35rem] border-2 border-white bg-black px-5 pb-5 pt-8 text-center text-white md:rounded-tl-[1.5rem] md:rounded-br-[1.5rem] md:px-4 md:pb-5 md:pt-9">
                      <h4 className="font-title text-lg font-semibold leading-snug text-white md:text-lg">{title}</h4>
                      <ul className="apx-site-table apx-capability-list mt-3 flex-1 text-center text-sm sm:mt-4">
                        {bullets.map((line) => (
                          <li key={line} className="apx-capability-list__item">
                            {line}
                          </li>
                        ))}
                      </ul>
                    </article>
                  </div>
                ))}
                <div
                  className="why-choose-card-shell about-reveal flex h-full min-h-0 min-w-0 flex-col items-center"
                  style={{ transitionDelay: "760ms" }}
                >
                  <GoogleBusinessReviewsSlot />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HomeSectionDivider surface="on-light" className="home-section-divider--bare" />

      <HomeAccreditationsSection visible={sectionMotion.about} />

      <HomeSectionDivider surface="on-light" width="full" />

      {/* Logo marquee, single row, bare logos (no tile containers) */}
      <section
        id="logo-marquee"
        className="logo-marquee-section logo-marquee-home overflow-hidden border-t-[3px] border-b-[3px] border-t-black border-b-white"
        aria-label="Our clients"
      >
        <div
          className={`logo-marquee-wrapper pt-12 pb-12 lg:pt-14 lg:pb-14 home-scroll-rise ${
            sectionMotion.marquee ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="logo-marquee">
            <div className="logo-marquee__group">
              {clientLogoPaths.map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element -- marquee strip; many dynamic paths
                <img key={`a-${i}`} src={src} alt="" className="logo-marquee__img" aria-hidden />
              ))}
            </div>
            <div className="logo-marquee__group" aria-hidden="true">
              {clientLogoPaths.map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={`b-${i}`} src={src} alt="" className="logo-marquee__img" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <HomeSectionDivider surface="on-dark" width="full" />

      {FS_SHOW_NEWS_AND_ARTICLES && (
        <>
          {/* News and Articles */}
          <section id="why-mep" className="news-section">
            <div className="site-container">
              <div className="news-section__grid">
                <header className="news-section__header">
                  <span
                    className={`news-section__label home-scroll-rise ${
                      sectionMotion.news ? "opacity-100 translate-y-0" : "opacity-0 translate-y-14"
                    }`}
                  >
                    News and Articles
                  </span>
                  <LetterReveal
                    as="h2"
                    text="Insights and updates"
                    className="news-section__title"
                    active={sectionMotion.news}
                  />
                </header>

                <div
                  className={`news-section__media home-scroll-rise ${
                    sectionMotion.news ? "opacity-100 translate-y-0" : "opacity-0 translate-y-14"
                  }`}
                  style={{ transitionDelay: "80ms" }}
                >
                  <Link href={newsArticles[activeNewsIndex]?.href ?? NEWS_HUB_PATH} className="news-section__image-link block w-full">
                    <div
                      className="news-section__image"
                      style={{ backgroundImage: `url('${newsArticles[activeNewsIndex]?.image || newsArticles[0].image}')` }}
                      aria-hidden
                    />
                  </Link>
                </div>

                <div
                  className={`news-section__copy home-scroll-rise ${
                    sectionMotion.news ? "opacity-100 translate-y-0" : "opacity-0 translate-y-14"
                  }`}
                  style={{ transitionDelay: "120ms" }}
                >
                  <nav aria-label="Articles">
                    <ul className="news-section__list">
                      {newsArticles.map((article, i) => (
                        <li key={article.id} className={`news-section__item ${activeNewsIndex === i ? 'news-section__item--active' : ''}`}>
                          <Link
                            href={article.href}
                            className={`news-section__link ${activeNewsIndex === i ? 'news-section__link--active' : ''}`}
                            onMouseEnter={() => {
                              newsIndexRef.current = i
                              newsProgressRef.current = 0
                              setActiveNewsIndex(i)
                              setNewsProgress(0)
                            }}
                          >
                            {article.title}
                          </Link>
                          {activeNewsIndex === i && (
                            <span className="news-section__bar" style={{ width: `${newsProgress * 100}%` }} aria-hidden />
                          )}
                        </li>
                      ))}
                    </ul>
                  </nav>
                  <div className="news-section__footer">
                    <Link href={NEWS_HUB_PATH} className="news-section__view-all">
                      View all news &amp; articles
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <HomeSectionDivider surface="on-dark" width="full" />
        </>
      )}

      {/* Reviews & support, temporarily hidden; keep markup for restore */}
      <section
        id="testimonials"
        hidden
        aria-hidden="true"
        className="relative hidden overflow-hidden bg-black py-24 sm:py-24 lg:py-32"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-10%,rgba(255,255,255,0.07),transparent_55%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
          aria-hidden
        />
        <div className="relative z-10 site-container">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-x-16">
            <div
              className={`lg:col-span-5 home-scroll-rise ${
                sectionMotion.testimonials ? "opacity-100 translate-y-0" : "opacity-0 translate-y-14"
              }`}
            >
              <span className="section-label text-white/70">Reviews &amp; support</span>
              <h2 className="home-section-title mt-4 font-title text-white">
                Real feedback.
                <span className="block text-white/90">Real response.</span>
              </h2>
              <p className="mt-8 max-w-md text-base leading-relaxed text-white/55">
                Read verified Google reviews from clients across London and the Home Counties. When systems need attention,
                our 24/7 call-out team and monitoring options keep sites protected after handover.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <CustomPillButton href={GOOGLE_REVIEWS_LISTING_URL} size="md" className="justify-center">
                  See Google reviews
                </CustomPillButton>
                <CustomPillButton
                  href="/services/monitoring"
                  variant="outline"
                  size="md"
                  className="justify-center"
                >
                  Ask about monitoring
                </CustomPillButton>
              </div>
            </div>

            <div
              className={`lg:col-span-7 grid gap-4 sm:grid-cols-2 transition-all delay-150 duration-[900ms] ease-out ${
                sectionMotion.testimonials ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
              }`}
            >
              <article className="rounded-tl-2xl rounded-br-2xl border-2 border-white/70 bg-gradient-to-b from-neutral-900 to-black p-6 sm:p-7">
                <Clock className="mb-4 h-8 w-8 text-white" strokeWidth={1.5} aria-hidden />
                <h3 className="font-title text-xl font-semibold text-white">24/7 call-out</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  Emergency engineer response for fire and security faults, with planned maintenance to keep systems
                  compliant between call-outs.
                </p>
                <Link
                  href="/services/emergency-call-out"
                  className="mt-5 inline-flex text-sm font-semibold uppercase tracking-wide text-white underline underline-offset-4"
                >
                  Arrange cover
                </Link>
              </article>
              <article className="rounded-tl-2xl rounded-br-2xl border-2 border-white/70 bg-gradient-to-b from-neutral-900 to-black p-6 sm:p-7">
                <Shield className="mb-4 h-8 w-8 text-white" strokeWidth={1.5} aria-hidden />
                <h3 className="font-title text-xl font-semibold text-white">Monitoring &amp; ARC</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  Alarm receiving centre (ARC) signalling and remote monitoring options for intruder, fire and CCTV
                  pathways, so events are escalated when your site is unattended.
                </p>
                <Link
                  href="/services/monitoring"
                  className="mt-5 inline-flex text-sm font-semibold uppercase tracking-wide text-white underline underline-offset-4"
                >
                  Enquire about ARC
                </Link>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Divider after reviews, hidden while reviews section is hidden */}
      <div className="hidden" aria-hidden="true">
        <HomeSectionDivider surface="on-dark" width="full" />
      </div>

      {/* Ready to Get Started Section, black bg, white text */}
      <section id="contact" className="section-spacing relative bg-black">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
            {/* Left side - Title and Button */}
            <div
              className="contact-section-head space-y-8 pt-16 lg:pt-24"
              style={
                sectionMotion.contact ? { transitionDelay: `${HOME_QUOTE_FORM_INNER_DELAY_MS}ms` } : undefined
              }
            >
              <span
                className={`section-label text-white/80 home-scroll-rise ${
                  sectionMotion.contact ? "opacity-100 translate-y-0" : "opacity-0 translate-y-14"
                }`}
                style={
                  sectionMotion.contact ? { transitionDelay: `${HOME_QUOTE_FORM_INNER_DELAY_MS}ms` } : undefined
                }
              >
                Contact
              </span>
              <LetterReveal
                as="h2"
                text="Ready to get started?"
                className="home-section-title text-left text-white font-title"
                active={sectionMotion.contact}
                delayMs={HOME_QUOTE_FORM_INNER_DELAY_MS}
              />
              
              <div className="space-y-6 max-w-lg">
                <LineReveal
                  as="p"
                  text="As one of the leading fire and security system installers in London and the South East, we are pleased to offer a free survey and report for your property. Our systems are designed in accordance with NSI Gold standards for both security and fire, covering domestic and commercial sites."
                  className="text-base leading-relaxed text-gray-300"
                  active={sectionMotion.contact}
                  delayMs={HOME_QUOTE_FORM_INNER_DELAY_MS + 80}
                />
                
                <LineReveal
                  as="p"
                  text="Whether you need security, fire detection, monitoring and ARC signalling, or 24/7 call-out support, contact us for a chat about your requirements. We respond promptly and provide detailed, competitive quotes tailored to your needs."
                  className="text-base leading-relaxed text-gray-300"
                  active={sectionMotion.contact}
                  delayMs={HOME_QUOTE_FORM_INNER_DELAY_MS + 200}
                />
            </div>
            
              <button
                className={`bg-white text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 flex items-center gap-3 home-scroll-rise ${
                  sectionMotion.contact ? "opacity-100 translate-y-0" : "opacity-0 translate-y-14"
                }`}
                style={
                  sectionMotion.contact
                    ? { transitionDelay: `${HOME_QUOTE_FORM_INNER_DELAY_MS + 280}ms` }
                    : undefined
                }
                onClick={() => document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <ArrowRight className="h-6 w-6" />
                GET A QUOTE
              </button>
                </div>
            
            {/* Right side - Contact Form (glassmorphic), animated SVG border + delayed inner fade */}
            <HomeQuoteFormDrawShell active={sectionMotion.contact} allowOverflow={isServicesDropdownOpen}>
            <div id="quote-form" className="relative w-full">
              <GlassFormPanel>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      className={HOME_QUOTE_FIELD_CLASS}
                      placeholder="Enter your first name"
                    />
                </div>
                  
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      className={HOME_QUOTE_FIELD_CLASS}
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      className={HOME_QUOTE_FIELD_CLASS}
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      className={HOME_QUOTE_FIELD_CLASS}
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
                
                <div className="relative services-dropdown-container">
                  <label
                    htmlFor="home-quote-service"
                    className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-white/50"
                  >
                    Service Required *
                  </label>
                  <ServiceCombobox
                    id="home-quote-service"
                    name="service"
                    options={HOME_QUOTE_SERVICES}
                    value={selectedService}
                    onChange={setSelectedService}
                    onOpenChange={setIsServicesDropdownOpen}
                    placeholder="Select or type a service"
                    required
                    allowCustom
                    containerClassName="services-dropdown-container"
                  />
                </div>
                
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                    Project Description *
                  </label>
                  <textarea
                    required
                    rows={4}
                    className={`${HOME_QUOTE_FIELD_CLASS} min-h-[140px] resize-y`}
                    placeholder="Please describe your project requirements..."
                  ></textarea>
                </div>
                
                <div>
                  <label className="mb-3 block text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                    Preferred Contact Method
                  </label>
                  <div className="flex flex-wrap gap-6">
                    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-white/85">
                      <input type="radio" name="contact-method" value="phone" className="mr-0" />
                      Phone Call
                    </label>
                    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-white/85">
                      <input type="radio" name="contact-method" value="email" defaultChecked className="mr-0" />
                      Email
                    </label>
                    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-white/85">
                      <input type="radio" name="contact-method" value="text" className="mr-0" />
                      Text Message
                    </label>
                  </div>
                </div>
                
                <FormSubmitButton onSubmit={async () => {
                  /* Wire your real submit here (e.g. fetch or form action) */
                }}>
                  Send message
                </FormSubmitButton>
              </form>
              </GlassFormPanel>
            </div>
            </HomeQuoteFormDrawShell>
          </div>
        </div>
      </section>

    </div>
    </>
  );
}
