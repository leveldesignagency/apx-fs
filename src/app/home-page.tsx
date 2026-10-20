"use client"

import Link from "next/link"
import {
  Shield,
  CheckCircle,
  Clock,
  Cog,
  Zap,
  Wind,
  Leaf,
  Wrench,
  ChevronLeft,
  ChevronRight,
  Star,
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
import HeroVideoBackground from "@/components/HeroVideoBackground"
import { HomeAccreditationsSection } from "@/components/home/HomeAccreditationsSection"
import { WhatWeOfferSection } from "@/components/home/WhatWeOfferSection"
import { HomeQuoteFormDrawShell, HOME_QUOTE_FORM_INNER_DELAY_MS } from "@/components/home/HomeQuoteFormDrawShell"
import { HomeSectionDivider } from "@/components/home/HomeSectionDivider"
import { IndustriesWeWorkInSection } from "@/components/home/IndustriesWeWorkInSection"
import { LetterReveal } from "@/components/LetterReveal"
import { LineReveal } from "@/components/LineReveal"
import { ServiceCombobox } from "@/components/ui/ServiceCombobox"
import { FS_SERVICE_QUICK_LINKS } from "@/lib/fs-service-navigation"
import { forceDocumentScrollTop } from "@/lib/lenisBridge"

/** Homepage Ready form fields — white fill, black text (globals `#contact` reinforces). */
const HOME_QUOTE_FIELD_CLASS =
  "w-full rounded-none border border-black/20 bg-white px-4 py-3.5 text-[17px] font-bold text-black placeholder:text-black/40 placeholder:font-normal outline-none transition-[border,box-shadow] focus:border-black/50 focus:ring-0 focus:bg-white"

const HOME_QUOTE_SERVICES = [
  { value: "intruder-alarms", label: "Intruder Alarm Systems" },
  { value: "fire-alarms", label: "Fire Alarm Systems" },
  { value: "cctv", label: "CCTV Systems" },
  { value: "access-control", label: "Access Control Systems" },
  { value: "video-door-entry", label: "Video Door Entry Systems" },
  { value: "gate-automation", label: "Gate Automation" },
  { value: "pava", label: "PAVA Systems" },
  { value: "evac", label: "EVAC Systems" },
  { value: "refuge-disabled-communication", label: "Disabled Refuge, Fire Telephone & Toilet Alarm Systems" },
  { value: "monitoring", label: "Monitoring" },
  { value: "maintenance-support", label: "Maintenance, Repairs & 24/7 Call-Outs" },
  { value: "other", label: "Other" },
] as const

const WHY_CHOOSE_CARDS: { Icon: LucideIcon; title: string; bullets: string[] }[] = [
  {
    Icon: CheckCircle,
    title: "NSI Gold Approved",
    bullets: [
      "NSI Gold, Security",
      "NSI Fire Gold",
      "BAFE Registered",
      "BS EN ISO 9001:2015",
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
      "Constructionline Gold",
      "FIA Full Member",
      "Work to NSI Gold standards",
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

  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [testimonialsPaused, setTestimonialsPaused] = useState(false)
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
  const testimonialQuoteStackRef = useRef<HTMLDivElement>(null)
  const [testimonialsQuoteMinPx, setTestimonialsQuoteMinPx] = useState<number | null>(null)
  const [heroAnimation, setHeroAnimation] = useState({
    videoVisible: false,
    titleVisible: false,
    subtitleVisible: false,
  })
  const [heroServicesNavHidden, setHeroServicesNavHidden] = useState(false)
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
    { id: 'industries', name: 'Industries' },
    { id: 'services', name: 'Services' },
    { id: 'about-intro', name: 'Our story' },
    { id: 'projects', name: 'Projects' },
    { id: 'about', name: 'Why Choose Us' },
    { id: 'accreditations', name: 'Accreditations & Memberships' },
    { id: 'logo-marquee', name: 'Clients' },
    ...(FS_SHOW_NEWS_AND_ARTICLES ? ([{ id: 'why-mep', name: 'News & Articles' }] as const) : []),
    { id: 'contact', name: 'Contact' }
  ], [])

  const mepCards = useMemo(() => [
    { id: 'retail', title: 'Retail & High Street', description: 'Integrated CCTV, access control and intruder alarms for single sites and multi-branch retail. Remote monitoring, till-area coverage and out-of-hours protection.', href: '/services', icon: Cog, image: '/cctv%20systems.jpg' },
    { id: 'corporate', title: 'Corporate & Offices', description: 'Access control, fire detection and video door entry for commercial buildings. Reception integration, visitor management and evacuation compliance.', href: '/services', icon: Zap, image: '/access%20control%20systems.jpg' },
    { id: 'education', title: 'Education & Schools', description: 'Fire alarms, access control and CCTV meeting safeguarding and DfE guidelines. Site-wide coverage, lockdown capability and 24/7 monitoring.', href: '/services', icon: Wind, image: '/fire%20alarm%20system%20installations/fire-alarm-installation-wembley-french-school-exterior-600x400.jpg' },
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

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Office Manager, TechCorp",
      text: "APX Fire & Security provided an exceptional CCTV and access control system for our office. NSI Gold standard, professional and reliable.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Facilities Director, Manufacturing Ltd",
      text: "Outstanding fire alarm and intruder alarm installation for our new facility. The team was efficient and completed everything to the highest standards.",
      rating: 5,
    },
    {
      name: "Emma Williams",
      role: "Property Manager, Retail Group",
      text: "Our integrated Fire and Security systems were designed and installed flawlessly. Clear communication throughout and excellent monitoring support.",
      rating: 5,
    },
  ]

  const testimonialPrev = useCallback(() => {
    setCurrentTestimonial((p) => (p - 1 + testimonials.length) % testimonials.length)
  }, [testimonials.length])

  const testimonialNext = useCallback(() => {
    setCurrentTestimonial((p) => (p + 1) % testimonials.length)
  }, [testimonials.length])

  useLayoutEffect(() => {
    const root = testimonialQuoteStackRef.current
    if (!root) return
    const measure = () => {
      const slides = root.querySelectorAll<HTMLElement>("[data-testimonial-quote-slide]")
      let max = 0
      slides.forEach((el) => {
        const h = el.offsetHeight
        if (h > max) max = h
      })
      if (max > 0) setTestimonialsQuoteMinPx(Math.ceil(max))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(root)
    window.addEventListener("resize", measure)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [testimonials.length])

  // Always land on the hero (logo nav + refresh). Browser scroll restoration otherwise jumps to #services.
  useLayoutEffect(() => {
    if (typeof window === "undefined") return
    const hash = window.location.hash.replace(/^#/, "")
    // Keep intentional deep links like /#quote-form; strip #services/#hero noise
    if (hash && hash !== "hero" && hash !== "services") return
    if (hash === "services" || hash === "hero") {
      try {
        window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`)
      } catch {
        /* ignore */
      }
    }

    try {
      sessionStorage.removeItem("fs-home-scroll-top")
    } catch {
      /* ignore */
    }

    forceDocumentScrollTop()
    const timers = [0, 50, 100, 200, 400, 700, 1200].map((ms) =>
      window.setTimeout(forceDocumentScrollTop, ms)
    )
    return () => timers.forEach((id) => window.clearTimeout(id))
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

  // Hero services strip: hide once scrolling (duplicated in #services)
  useEffect(() => {
    const HIDE_AFTER_PX = 72
    let raf = 0
    const update = () => {
      raf = 0
      setHeroServicesNavHidden(window.scrollY > HIDE_AFTER_PX)
    }
    const onScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [])

  // Scroll-in effects for content only (never section backgrounds)
  useEffect(() => {
    const sectionIds = [
      { id: "industries", key: "core" as const },
      { id: "about-intro", key: "aboutIntro" as const },
      { id: "services", key: "services" as const },
      { id: "projects", key: "projects" as const },
      { id: "logo-marquee", key: "marquee" as const },
      ...(FS_SHOW_NEWS_AND_ARTICLES ? ([{ id: "why-mep", key: "news" as const }] as const) : []),
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

  // Testimonial carousel — pauses while pointer is over the section
  useEffect(() => {
    if (testimonialsPaused) return
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [testimonials.length, testimonialsPaused])

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
      <div className="home-page-trial relative z-10 min-h-screen overflow-x-clip">

      {/* Hero Section, full viewport height */}
      <section
        id="hero"
        className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-[var(--page-bg)]"
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
              APX Fire &amp; Security is your NSI Gold
              <br />
              Fire &amp; Security Systems Installer.
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
            aria-hidden={heroServicesNavHidden}
            className={`hero-services-quick-nav mt-auto w-full min-w-0${
              heroServicesNavHidden ? " hero-services-quick-nav--hidden" : ""
            }`}
          >
            {/* Mobile: auto-scrolling marquee (L→R). sm+: single wrapping strip. */}
            <div
              className={`hero-services-quick-nav__marquee sm:hidden${
                heroAnimation.subtitleVisible ? " hero-services-quick-nav__marquee--in" : ""
              }`}
            >
              <div className="hero-services-quick-nav__marquee-track">
                {[0, 1].map((copy) => (
                  <ul
                    key={copy}
                    className="hero-services-quick-nav__list m-0 flex list-none items-center p-0"
                    aria-hidden={copy === 1 ? true : undefined}
                  >
                    {FS_SERVICE_QUICK_LINKS.map(({ href, label }) => (
                      <li key={`${copy}-${href}`} className="hero-services-quick-nav__item shrink-0">
                        <Link
                          href={href}
                          className="hero-services-quick-nav__link"
                          tabIndex={copy === 1 ? -1 : undefined}
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
            <ul className="hero-services-quick-nav__list m-0 hidden w-full max-w-full list-none flex-wrap items-center justify-start p-0 sm:flex">
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

      <section id="services" className="home-services-band section-spacing relative overflow-visible bg-black">
        <div className="site-container">
          <div className="section-content-gap space-y-16 text-white">
            <WhatWeOfferSection />
          </div>
        </div>
      </section>

      <IndustriesWeWorkInSection />

      <AboutIntroSection />

      {/* Projects: reference split — left intro, right bleeding card strip */}
      <section
        ref={projectsSectionRef}
        id="projects"
        className="projects-section relative z-[1] overflow-x-clip scroll-mt-24"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div
          className="projects-section__sticky sticky top-0 z-[1]"
          style={{ backgroundColor: "#ffffff" }}
        >
          <div
            className={`projects-section__split home-scroll-rise ${
              sectionMotion.projects ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
            }`}
          >
            <div className="projects-section__intro">
              <span className="section-label section-label--black">Projects</span>
              <LetterReveal
                as="h2"
                text="Built to Last, Delivered with Care."
                className="home-section-title text-black font-title"
                active={sectionMotion.projects}
              />
              <div className="projects-section__nav">
                <button
                  type="button"
                  onClick={() => scrollProjects("left")}
                  className="projects-nav-btn flex h-14 w-14 items-center justify-center rounded-full border border-black bg-transparent text-black transition-colors hover:bg-black hover:text-white focus:bg-black focus:text-white"
                  aria-label="Previous projects"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollProjects("right")}
                  className="projects-nav-btn flex h-14 w-14 items-center justify-center rounded-full border border-black bg-transparent text-black transition-colors hover:bg-black hover:text-white focus:bg-black focus:text-white"
                  aria-label="Next projects"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div
              ref={projectsViewportRef}
              className="projects-section__track relative min-w-0 overflow-x-hidden"
            >
              <div
                ref={projectsStripAnchorRef}
                className="pointer-events-none h-px w-full shrink-0 overflow-hidden opacity-0"
                aria-hidden
              />
              <div
                ref={projectsScrollRef}
                className="projects-strip flex w-max items-stretch will-change-transform"
              >
                {projects.map((p, i) => (
                  <div key={i} className="projects-card-shelf shrink-0">
                    <Link
                      href={p.href}
                      className="projects-card group flex flex-col overflow-hidden rounded-[1.25rem] bg-black transition-transform duration-300 ease-out hover:-translate-y-1.5"
                    >
                      <div className="projects-card__inner relative">
                        <span
                          className="projects-card-number absolute top-5 right-5 z-10 font-bold tabular-nums text-white drop-shadow-md"
                          style={{ fontFamily: 'var(--font-title, "Outfit", sans-serif)' }}
                          aria-hidden
                        >
                          {(i + 1).toString().padStart(2, "0")}
                        </span>
                        <div
                          className="absolute inset-0 scale-110 bg-cover bg-center transition-transform duration-700 ease-out motion-reduce:transition-none motion-safe:group-hover:scale-100"
                          style={{ backgroundImage: `url(${p.image})` }}
                        />
                        <div className="projects-card-glass absolute inset-x-0 bottom-0 flex flex-col justify-end overflow-hidden">
                          <div className="projects-card-glass-backdrop pointer-events-none absolute inset-0" aria-hidden>
                            <div
                              className="projects-card-glass-blur absolute inset-0 bg-cover bg-center"
                              style={{ backgroundImage: `url(${p.image})` }}
                            />
                            <div className="projects-card-glass-overlay absolute inset-0" />
                          </div>
                          <div className="relative z-20 origin-bottom-left transition-transform duration-500 ease-out motion-reduce:transition-none motion-safe:group-hover:scale-[1.03]">
                            <p className="mb-2 text-[11px] uppercase tracking-[0.14em] text-white">{p.stat}</p>
                            <p className="projects-card__title mb-1.5 font-bold leading-[1.12] text-white">{p.title}</p>
                            <p className="mb-2 text-xs uppercase tracking-[0.11em] text-white/90">{p.location}</p>
                            <p className="projects-card__desc text-sm leading-relaxed text-white">{p.description}</p>
                          </div>
                          <span
                            className="projects-card-arrow absolute z-20 flex items-center justify-center rounded-full bg-white/20 text-white transition-transform duration-200 group-hover:rotate-12"
                            aria-hidden
                          >
                            <ChevronRight className="h-5 w-5" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <HomeSectionDivider surface="on-light" width="full" />

      {/* Trusted & Reviewed — flat white band (no canted edges) */}
      <section
        id="about"
        className={`section-spacing bg-white transition-opacity duration-300 ${
          sectionMotion.about ? "home-about--in-view" : ""
        }`}
      >
        <div className="site-container">
          <div className="section-content-gap space-y-16">
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-20">
              {/* Mobile: copy then cards. Desktop: cards left, copy right */}
              <div className="why-choose-us-copy min-w-0 text-black lg:order-2">
                <span className="section-label section-label--black about-reveal" style={{ transitionDelay: "0ms" }}>TRUSTED &amp; REVIEWED</span>
                <LetterReveal
                  as="h2"
                  text={"Trust, Quality,\nPeace of Mind."}
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
                      <CountUp target={40} suffix="+" duration={2000} />
                    </div>
                    <div className="stats-card-label mt-2 text-sm" data-stats-text style={{ color: "#000000" }}>
                      Years&apos; Experience
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid w-full min-w-0 grid-cols-1 gap-6 self-center lg:order-1 lg:mr-auto lg:max-w-[46rem] lg:grid-cols-2 lg:gap-x-5 lg:gap-y-8 lg:justify-self-start">
                {WHY_CHOOSE_CARDS.map(({ Icon, title, bullets }, idx) => (
                  <div key={title} className="why-choose-card-shell about-reveal flex h-full min-h-0 min-w-0 flex-col items-center" style={{ transitionDelay: `${360 + idx * 90}ms` }}>
                    <div
                      className="why-choose-icon-badge relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/25 bg-black shadow-[0_6px_22px_rgba(0,0,0,0.5)] md:h-12 md:w-12 md:rounded-xl"
                      aria-hidden
                    >
                      <Icon className="h-5 w-5 shrink-0 text-white/90 md:h-6 md:w-6" strokeWidth={1.5} />
                    </div>
                    <article className="why-choose-card -mt-6 flex min-h-0 w-full min-w-0 flex-1 flex-col rounded-2xl border border-white/40 bg-black px-5 pb-5 pt-8 text-center text-white md:px-4 md:pb-5 md:pt-9">
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

      {/* reviews off for now */}
      {false && (
      <section
        id="testimonials"
        className="relative overflow-hidden bg-black py-24 sm:py-24 lg:py-32"
        onMouseEnter={() => setTestimonialsPaused(true)}
        onMouseLeave={() => setTestimonialsPaused(false)}
        aria-labelledby="home-reviews-heading"
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
          <div className="grid items-end gap-14 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-12">
            <div
              className={`lg:col-span-5 home-scroll-rise ${
                sectionMotion.testimonials ? "opacity-100 translate-y-0" : "opacity-0 translate-y-14"
              }`}
            >
              <span className="section-label text-white/70">Reviews</span>
              <LetterReveal
                as="h2"
                id="home-reviews-heading"
                text={"Trusted by teams\nthat expect results"}
                className="home-section-title mt-4 font-title text-white"
                active={sectionMotion.testimonials}
                delayMs={80}
              />
              <p className="mt-8 max-w-md text-base leading-relaxed text-white/55">
                Don&apos;t just take our word for it — hear from clients about their experience with APX Fire &amp;
                Security across London and the Home Counties.
              </p>
            </div>

            <div
              className={`relative lg:col-span-7 transition-all delay-150 duration-[900ms] ease-out ${
                sectionMotion.testimonials ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
              }`}
            >
              <div className="mb-8 flex flex-wrap items-center gap-2 sm:gap-2.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    fill="white"
                    className="h-8 w-8 shrink-0 stroke-white stroke-[1.25] text-white sm:h-10 sm:w-10 sm:stroke-[1.2]"
                    strokeLinejoin="miter"
                    strokeLinecap="butt"
                    style={{ vectorEffect: "non-scaling-stroke" }}
                    aria-hidden
                  />
                ))}
                <span className="ml-2 text-sm font-semibold uppercase tracking-[0.2em] text-white/40 sm:ml-3">5.0</span>
              </div>

              <div
                ref={testimonialQuoteStackRef}
                className="relative w-full"
                style={testimonialsQuoteMinPx ? { minHeight: testimonialsQuoteMinPx } : undefined}
              >
                {testimonials.map((t, i) => (
                  <div
                    key={t.name}
                    data-testimonial-quote-slide
                    className={`left-0 right-0 top-0 transition-opacity duration-500 ease-out motion-reduce:transition-none ${
                      i === currentTestimonial
                        ? "relative z-10 opacity-100"
                        : "absolute z-0 opacity-0 pointer-events-none"
                    }`}
                    aria-hidden={i !== currentTestimonial}
                  >
                    <blockquote className="apx-testimonials-quote text-2xl font-medium leading-snug text-white/95 sm:text-3xl lg:text-[1.85rem] lg:leading-relaxed xl:text-4xl">
                      <span className="text-white/20">&ldquo;</span>
                      {t.text}
                      <span className="text-white/20">&rdquo;</span>
                    </blockquote>
                    <footer className="mt-10 border-t border-white/10 pt-8">
                      <div className="text-lg font-semibold text-white">{t.name}</div>
                      <div className="mt-1 text-sm text-white/45">{t.role}</div>
                    </footer>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label="Previous testimonial"
                    onClick={testimonialPrev}
                    className="projects-nav-btn flex h-12 w-12 items-center justify-center rounded-full border border-white bg-transparent text-white transition-colors hover:bg-white hover:text-black focus:bg-white focus:text-black"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next testimonial"
                    onClick={testimonialNext}
                    className="projects-nav-btn flex h-12 w-12 items-center justify-center rounded-full border border-white bg-transparent text-white transition-colors hover:bg-white hover:text-black focus:bg-white focus:text-black"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>
                <div className="flex items-center gap-2" role="tablist" aria-label="Choose testimonial">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      role="tab"
                      aria-selected={index === currentTestimonial}
                      aria-label={`Testimonial ${index + 1}`}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentTestimonial ? "w-8 bg-white" : "w-2 bg-white/25 hover:bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      <HomeAccreditationsSection visible={sectionMotion.about} />

      <HomeSectionDivider surface="on-light" width="full" />

      {/* Logo marquee, single row, bare logos (no tile containers) */}
      <section
        id="logo-marquee"
        className="logo-marquee-section logo-marquee-home overflow-hidden border-t border-b border-t-black/40 border-b-white/40"
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
                    text="Insights and Updates"
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
                  <Link href={newsArticles[activeNewsIndex]?.href ?? NEWS_HUB_PATH} className="news-section__image-link">
                    {/* eslint-disable-next-line @next/next/no-img-element -- rotating article art; clip must stay sharp */}
                    <img
                      className="news-section__image"
                      src={newsArticles[activeNewsIndex]?.image || newsArticles[0].image}
                      alt=""
                      aria-hidden
                      decoding="async"
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

        </>
      )}

      {/* Ready to Get Started — white band; news image hangs into this section */}
      <section
        id="contact"
        className="contact-section--light section-spacing relative z-[1] bg-white"
      >
        <div className="site-container">
          <div className="grid grid-cols-1 items-start gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left side - Title and Button (extra top space clears hanging news image) */}
            <div
              className="contact-section-head space-y-8 pt-10 lg:pt-28"
              style={
                sectionMotion.contact ? { transitionDelay: `${HOME_QUOTE_FORM_INNER_DELAY_MS}ms` } : undefined
              }
            >
              <span
                className={`section-label text-black/70 home-scroll-rise ${
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
                text="Ready to Get Started?"
                className="home-section-title text-left text-black font-title"
                active={sectionMotion.contact}
                delayMs={HOME_QUOTE_FORM_INNER_DELAY_MS}
              />
              
              <div className="space-y-6 max-w-lg">
                <LineReveal
                  as="p"
                  text="As one of the leading Fire and Security system installers in London and the South East, we are pleased to offer a free survey and report for your property. Our systems are designed in accordance with NSI Gold standards for both security and fire, covering domestic and commercial sites."
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
                      inputMode="text"
                      enterKeyHint="next"
                      required
                      className={HOME_QUOTE_FIELD_CLASS}
                      placeholder="Enter your first name"
                      autoComplete="given-name"
                    />
                </div>
                  
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      inputMode="text"
                      enterKeyHint="next"
                      required
                      className={HOME_QUOTE_FIELD_CLASS}
                      placeholder="Enter your last name"
                      autoComplete="family-name"
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
                      inputMode="email"
                      enterKeyHint="next"
                      required
                      className={HOME_QUOTE_FIELD_CLASS}
                      placeholder="Enter your email"
                      autoComplete="email"
                    />
                  </div>
                  
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      inputMode="tel"
                      enterKeyHint="next"
                      required
                      className={HOME_QUOTE_FIELD_CLASS}
                      placeholder="Enter your phone number"
                      autoComplete="tel"
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
                    inputClassName="border-black/20 bg-white text-black placeholder:text-black/40 focus:border-black/50 focus:bg-white"
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
