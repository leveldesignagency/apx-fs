"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Shield,
  CheckCircle,
  Check,
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
import { useEffect, useLayoutEffect, useState, useMemo, useCallback, useRef, type CSSProperties, type ReactNode } from "react"
import { GlobalStyles, lightTheme, darkTheme } from '@/components/ThemeToggle'
import { useTheme } from '@/contexts/ThemeContext'
import { CountUp } from '@/components/ui/CountUp'
import { CustomPillButton } from '@/components/ui/CustomPillButton'
import { FormSubmitButton } from '@/components/ui/FormSubmitButton'
import { GlassFormPanel } from "@/components/ui/GlassFormPanel"
import { TurnstileWidget } from "@/components/TurnstileWidget"
import { MAIN_CASE_STUDIES } from "@/data/projects"
import { getNewsArticlesSorted, NEWS_HUB_PATH } from "@/data/fsNewsArticles"
import { AboutIntroSection } from "@/components/home/AboutIntroSection"
import HeroVideoBackground from "@/components/HeroVideoBackground"
import { HomeAccreditationsSection } from "@/components/home/HomeAccreditationsSection"
import { HomeSectionArcBead } from "@/components/home/HomeSectionArcBead"
import { WhatWeOfferSection } from "@/components/home/WhatWeOfferSection"
import { HomeQuoteFormDrawShell, HOME_QUOTE_FORM_INNER_DELAY_MS } from "@/components/home/HomeQuoteFormDrawShell"
import { HomeSectionDivider } from "@/components/home/HomeSectionDivider"
import { IndustriesWeWorkInSection } from "@/components/home/IndustriesWeWorkInSection"
import { LetterReveal } from "@/components/LetterReveal"
import { LineReveal } from "@/components/LineReveal"
import { ServiceCombobox } from "@/components/ui/ServiceCombobox"
import { FS_SERVICE_QUICK_LINKS } from "@/lib/fs-service-navigation"
import { FS_CONTACT_SERVICE_SLUGS } from "@/lib/fs-service-routes"
import { forceDocumentScrollTop } from "@/lib/lenisBridge"

/** Exact match to /contact form fields */
const HOME_QUOTE_FIELD_CLASS =
  "quote-form-field w-full rounded-none border border-white/20 bg-black px-3.5 py-2.5 text-base font-bold text-white placeholder:text-white/40 placeholder:font-normal outline-none transition-[border-color] duration-200 focus:border-white focus:ring-0 focus:bg-black"

const HOME_QUOTE_SERVICES = [
  { value: FS_CONTACT_SERVICE_SLUGS.intruderAlarmSystems, label: "Intruder Alarm Systems" },
  { value: FS_CONTACT_SERVICE_SLUGS.fireAlarmSystems, label: "Fire Alarm Systems" },
  { value: FS_CONTACT_SERVICE_SLUGS.cctvSystems, label: "CCTV Systems" },
  { value: FS_CONTACT_SERVICE_SLUGS.accessControlSystems, label: "Access Control Systems" },
  { value: FS_CONTACT_SERVICE_SLUGS.videoDoorEntrySystems, label: "Video Door Entry Systems" },
  { value: FS_CONTACT_SERVICE_SLUGS.gateAutomationSystems, label: "Gate Automation" },
  { value: FS_CONTACT_SERVICE_SLUGS.pava, label: "PAVA Systems" },
  { value: FS_CONTACT_SERVICE_SLUGS.evac, label: "EVAC Systems" },
  {
    value: FS_CONTACT_SERVICE_SLUGS.refugeDisabledCommunication,
    label: "Disabled Refuge, Fire Telephone & Toilet Alarm Systems",
  },
  { value: FS_CONTACT_SERVICE_SLUGS.monitoring, label: "Monitoring" },
  { value: FS_CONTACT_SERVICE_SLUGS.maintenanceSupport, label: "Maintenance & Repairs" },
  { value: FS_CONTACT_SERVICE_SLUGS.emergencyCallOut, label: "Emergency Call-Out" },
] as const

function HomeConsentCheckbox({
  id,
  checked,
  onChange,
  required,
  children,
}: {
  id: string
  checked: boolean
  onChange: (next: boolean) => void
  required?: boolean
  children: ReactNode
}) {
  return (
    <label
      htmlFor={id}
      className="contact-consent group flex cursor-pointer items-start gap-3.5 text-sm leading-relaxed text-black/70"
    >
      <span className="relative mt-0.5 inline-flex shrink-0">
        <input
          id={id}
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          required={required}
        />
        <span
          aria-hidden
          className="flex h-6 w-6 items-center justify-center border border-black/40 bg-white transition-[border-color,background-color,box-shadow] peer-checked:border-black peer-checked:bg-black peer-focus-visible:ring-2 peer-focus-visible:ring-black/35 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-white group-hover:border-black/70"
        >
          <Check
            className={`h-3.5 w-3.5 text-white transition-opacity ${checked ? "opacity-100" : "opacity-0"}`}
            strokeWidth={3}
          />
        </span>
      </span>
      <span className="contact-consent__text min-w-0 pt-0.5">{children}</span>
    </label>
  )
}

function HomeFieldLabel({
  htmlFor,
  children,
  required,
  optional,
}: {
  htmlFor?: string
  children: ReactNode
  required?: boolean
  optional?: boolean
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="quote-form-label mb-2 flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-sm font-semibold uppercase tracking-[0.12em] text-black/55"
    >
      <span>{children}</span>
      {required ? <span className="text-[0.8125rem] normal-case tracking-normal text-black/65">(required)</span> : null}
      {optional ? <span className="text-[0.8125rem] normal-case tracking-normal text-black/40">(optional)</span> : null}
    </label>
  )
}

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
  const router = useRouter()
  
  const [, setActiveSection] = useState(0)
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false)
  const [selectedService, setSelectedService] = useState('')
  const [contactMethod, setContactMethod] = useState<"phone" | "email" | "text">("email")
  const [privacyConsent, setPrivacyConsent] = useState(false)
  const [smsConsent, setSmsConsent] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const homeFormRef = useRef<HTMLFormElement>(null)
  const homeFormStartedAtRef = useRef(Date.now())

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
  const servicesSectionRef = useRef<HTMLElement>(null)
  const servicesLensRef = useRef<HTMLImageElement>(null)
  const projectsHorizontalPxRef = useRef(0)
  const testimonialQuoteStackRef = useRef<HTMLDivElement>(null)
  const [testimonialsQuoteMinPx, setTestimonialsQuoteMinPx] = useState<number | undefined>(undefined)
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
    accreditations: false,
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

  /** Mobile / touch: native overflow swipe. Desktop: transform + wheel lock. */
  const projectsUseNativeScroll = useCallback(() => {
    if (typeof window === "undefined") return false
    return (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(max-width: 1023px)").matches
    )
  }, [])

  const scrollProjects = useCallback(
    (dir: "left" | "right") => {
      const strip = projectsScrollRef.current
      const view = projectsViewportRef.current
      if (!strip || !view) return
      const card = strip.querySelector("a.projects-card") as HTMLElement | null
      const step = (card?.offsetWidth ?? 360) + 24

      if (projectsUseNativeScroll()) {
        view.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" })
        return
      }

      const maxX = Math.max(0, strip.scrollWidth - view.clientWidth)
      const cur = projectsHorizontalPxRef.current
      const next = dir === "left" ? Math.max(0, cur - step) : Math.min(maxX, cur + step)
      projectsHorizontalPxRef.current = next
      strip.style.transform = `translate3d(${-next}px,0,0)`
    },
    [projectsUseNativeScroll]
  )

  useLayoutEffect(() => {
    const strip = projectsScrollRef.current
    const view = projectsViewportRef.current
    const section = projectsSectionRef.current
    if (!strip || !view || !section) return

    const applyTransform = () => {
      if (projectsUseNativeScroll()) {
        strip.style.transform = ""
        return
      }
      strip.style.transform = `translate3d(${-projectsHorizontalPxRef.current}px,0,0)`
    }

    const clampToMax = () => {
      if (projectsUseNativeScroll()) {
        strip.style.transform = ""
        return
      }
      const maxX = Math.max(0, strip.scrollWidth - view.clientWidth)
      projectsHorizontalPxRef.current = Math.min(projectsHorizontalPxRef.current, maxX)
      applyTransform()
    }

    const onScrollReset = () => {
      if (projectsUseNativeScroll()) return
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
  }, [projects.length, projectsUseNativeScroll])

  // Desktop only: strip anchor crosses LOCK_LINE; wheel pans the transform strip.
  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (projectsUseNativeScroll()) return

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
  }, [projectsUseNativeScroll])

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

  // Services lens: full 360° rotation driven by scroll through the section (desktop only)
  useEffect(() => {
    const section = servicesSectionRef.current
    const lens = servicesLensRef.current
    if (!section || !lens) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      lens.style.transform = "rotate(0deg)"
      return
    }
    // Skip on touch / narrow — scroll-driven rotate fights mobile scrolling
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(max-width: 1023px)").matches
    ) {
      lens.style.transform = "rotate(0deg)"
      return
    }

    let frame = 0
    const update = () => {
      frame = 0
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight
      // Start as soon as the section enters the viewport; finish ~¾ through it
      const start = vh
      const end = -rect.height * 0.75
      const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)))
      // Opposite of previous direction
      lens.style.transform = `rotate(${(-progress * 360).toFixed(2)}deg)`
    }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
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
      { id: "accreditations", key: "accreditations" as const },
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

  // Keep quote form on the shared dark style (same as /contact) — do not flip to white fields
  useEffect(() => {
    const applyDarkModeStyles = () => {
      const form = document.getElementById('quote-form');
      if (!form) return;

      form.style.backgroundColor = '#000000'
      form.style.border = '1px solid #ffffff'

      const title = form.querySelector('h3')
      if (title) title.style.color = '#ffffff'

      form.querySelectorAll('label').forEach((label) => {
        ;(label as HTMLLabelElement).style.color = '#ffffff'
      })

      form
        .querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea')
        .forEach((input) => {
          const el = input as HTMLInputElement | HTMLTextAreaElement
          el.style.backgroundColor = '#000000'
          el.style.border = '1px solid rgba(255,255,255,0.2)'
          el.style.color = '#ffffff'
          el.style.outline = 'none'
          el.style.boxShadow = 'none'
          el.style.setProperty('--tw-ring-color', 'transparent', 'important')
        })

      const serviceDropdown = form.querySelector('.quote-form-dropdown') as HTMLElement | null
      if (serviceDropdown) {
        serviceDropdown.style.backgroundColor = '#000000'
        serviceDropdown.style.color = '#ffffff'
      }

      const menu = form.querySelector('.quote-form-dropdown-menu') as HTMLElement | null
      if (menu) {
        menu.style.backgroundColor = '#09090b'
        menu.style.color = '#ffffff'
      }
      form.querySelectorAll('.quote-form-dropdown-item').forEach((item) => {
        const el = item as HTMLElement
        el.style.backgroundColor = 'transparent'
        el.style.color = '#ffffff'
      })
    };

    setTimeout(applyDarkModeStyles, 100);
    setTimeout(applyDarkModeStyles, 500);
    setTimeout(applyDarkModeStyles, 1000);
    
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

      {/* Hero: section can grow with mobile browser chrome (dvh); UI shell stays locked to svh */}
      <section
        id="hero"
        className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-[var(--page-bg)]"
      >
        <HeroVideoBackground />
        <div
          className={`hero-foreground relative z-20 site-container flex h-[100svh] max-h-[100svh] min-h-[100svh] w-full flex-col pb-5 sm:pb-6 lg:h-auto lg:max-h-none lg:min-h-[100dvh] lg:pb-8 transition-[opacity,transform] duration-1000 ${
            heroAnimation.videoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center space-y-4 pt-20 text-center min-[400px]:pt-[5.25rem] sm:pt-24 md:pt-[6.25rem] lg:mx-0 lg:max-w-xl lg:items-start lg:justify-center lg:pt-24 lg:text-left xl:max-w-2xl xl:pt-28">
            <div className="space-y-2 sm:space-y-2.5">
              <p
                className={`hero-mantra text-sm font-semibold uppercase tracking-[0.18em] text-white/70 transition-all duration-1000 sm:text-base ${
                  heroAnimation.titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                Protect. Prevent. Perform.
              </p>
              <h1
                className={`hero-title-reveal mb-0 font-title text-5xl font-extrabold uppercase leading-[0.72] tracking-normal text-white transition-all duration-[1200ms] sm:text-6xl md:text-7xl lg:text-8xl ${
                  heroAnimation.titleVisible ? "opacity-100 translate-y-0 blur-0 scale-100" : "opacity-0 translate-y-16 blur-[8px] scale-[0.985]"
                }`}
              >
                <span className="block">The Fire &amp;</span>
                <span className="block">Security</span>
                <span className="hero-title-accent-line block">
                  <span className="hero-title-accent">
                    <span className="hero-title-accent__cut">Specialists</span>
                  </span>
                </span>
              </h1>
            </div>
            <p
              className={`hero-subtitle-reveal mx-auto mt-2 max-w-3xl text-base font-normal tracking-normal text-white transition-all duration-1000 sm:mt-3 sm:whitespace-nowrap sm:text-lg md:mt-4 md:text-xl lg:mx-0 ${
                heroAnimation.titleVisible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-12 blur-[6px]"
              }`}
            >
              Your NSI Gold Fire &amp; Security Systems Installer.
            </p>

            <div
              className={`hero-cta-reveal flex flex-wrap items-center justify-center gap-4 pt-2 transition-all duration-1000 sm:gap-6 lg:justify-start ${
                heroAnimation.subtitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-14"
              }`}
            >
              <CustomPillButton href="#quote-form" size="md" className="hero-quote-cta">
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

      <section
        ref={servicesSectionRef}
        id="services"
        className="home-services-band section-spacing relative overflow-hidden bg-black"
      >
        {/* Monochrome CCTV lens atmosphere — scroll-driven 360° */}
        <div className="home-services-lens-bg pointer-events-none absolute inset-0 z-0" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element -- decorative section atmosphere */}
          <img
            ref={servicesLensRef}
            src="/services-cctv-lens-mono.png"
            alt=""
            className="home-services-lens-bg__img absolute select-none"
          />
        </div>
        <div className="site-container relative z-[1] text-white">
          <WhatWeOfferSection />
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
          <div className="projects-section__split">
            <div
              className={`projects-section__intro home-scroll-rise ${
                sectionMotion.projects ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
              }`}
            >
              <span className="section-label section-label--black">Projects</span>
              <LetterReveal
                as="h2"
                text="Built to Last, Delivered with Care"
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
              className="projects-section__track relative min-w-0 overflow-x-auto overscroll-x-contain touch-pan-x scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:overflow-x-hidden lg:overscroll-auto lg:touch-auto lg:scroll-auto"
              data-lenis-prevent
            >
              <div
                ref={projectsStripAnchorRef}
                className="pointer-events-none h-px w-full shrink-0 overflow-hidden opacity-0"
                aria-hidden
              />
              <div
                ref={projectsScrollRef}
                className={`projects-strip flex w-max items-stretch lg:will-change-transform${
                  sectionMotion.projects ? " projects-strip--in" : ""
                }`}
              >
                {projects.map((p, i) => (
                  <div
                    key={i}
                    className="projects-card-shelf shrink-0"
                    style={{ ["--card-step" as string]: i }}
                  >
                    <Link
                      href={p.href}
                      className="projects-card projects-card--lift group flex flex-col overflow-hidden rounded-[1.25rem] bg-black"
                    >
                      <div className="projects-card__inner relative">
                        <span
                          className="projects-card-number absolute top-5 right-5 z-10 font-bold tabular-nums text-white drop-shadow-md"
                          style={{ fontFamily: 'var(--font-title, "Oxanium", sans-serif)' }}
                          aria-hidden
                        >
                          {(i + 1).toString().padStart(2, "0")}
                        </span>
                        <div
                          className="projects-card__media absolute inset-0 scale-110 bg-cover bg-center"
                          style={{ backgroundImage: `url(${p.image})` }}
                        />
                        <div className="home-photo-swarm absolute inset-0" aria-hidden />
                        <div className="projects-card-glass absolute inset-x-0 bottom-0 flex flex-col justify-end overflow-hidden">
                          <div className="projects-card-glass-backdrop pointer-events-none absolute inset-0" aria-hidden>
                            <div
                              className="projects-card-glass-blur absolute inset-0 bg-cover bg-center"
                              style={{ backgroundImage: `url(${p.image})` }}
                            />
                            <div className="projects-card-glass-overlay absolute inset-0" />
                          </div>
                          <div className="projects-card__copy relative z-20 origin-bottom-left">
                            <p className="mb-2 text-[11px] uppercase tracking-[0.14em] text-white">{p.stat}</p>
                            <p className="projects-card__title mb-1.5 font-bold leading-[1.12] text-white">{p.title}</p>
                            <p className="mb-2 text-xs uppercase tracking-[0.11em] text-white/90">{p.location}</p>
                            <p className="projects-card__desc text-sm leading-relaxed text-white">{p.description}</p>
                          </div>
                          <span
                            className="projects-card-arrow absolute z-20 flex items-center justify-center rounded-full bg-white/20 text-white"
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
          <div className="grid grid-cols-1 items-start gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Mobile: copy then cards. Desktop: cards left, copy right */}
            <div className="why-choose-us-copy min-w-0 text-black lg:order-2">
              <span className="section-label section-label--black about-reveal" style={{ transitionDelay: "0ms" }}>TRUSTED &amp; REVIEWED</span>
              <LetterReveal
                as="h2"
                text={"Trust, Quality,\nPeace of Mind"}
                className="home-section-title font-title text-black"
                active={sectionMotion.about}
                delayMs={80}
              />
              <LineReveal
                as="p"
                text="Building on a heritage dating back to 1986, APX Fire & Security (formerly Smiths Technical Systems Ltd) designs, installs and maintains integrated fire, life-safety and electronic security systems across London and the Home Counties. We hold NSI Gold approval for both security and fire, with 24/7 call-out cover and monitoring options available where your site needs them."
                className="section-intro-gap max-w-xl text-base leading-relaxed text-gray-600"
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

            <div className="grid w-full min-w-0 grid-cols-1 gap-6 self-center lg:order-1 lg:mr-auto lg:max-w-[46rem] lg:grid-cols-2 lg:gap-8 lg:justify-self-start">
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
                Don&apos;t just take our word for it: hear from clients about their experience with APX Fire &amp;
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
                style={testimonialsQuoteMinPx !== undefined ? { minHeight: testimonialsQuoteMinPx } : undefined}
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

      <HomeSectionArcBead />

      <HomeAccreditationsSection visible={sectionMotion.accreditations} />

      <HomeSectionDivider surface="on-light" width="full" />

      {/* Logo marquee, single row, bare logos (no tile containers) */}
      <section
        id="logo-marquee"
        className="logo-marquee-section logo-marquee-home overflow-hidden border-t border-b border-t-black/40 border-b-white/40"
        aria-label="Our clients"
      >
        <div
          className={`logo-marquee-wrapper py-10 lg:py-12 home-scroll-rise ${
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
                    <CustomPillButton href={NEWS_HUB_PATH} size="md">
                      View all
                    </CustomPillButton>
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
              className="contact-section-head pt-10 lg:pt-28"
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

              <div className="section-intro-gap max-w-lg space-y-5">
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
            <div id="quote-form" className={`relative w-full ${isServicesDropdownOpen ? "overflow-visible" : ""}`}>
              <GlassFormPanel bare>
              <form
                ref={homeFormRef}
                className="contact-page-form space-y-3.5"
                onSubmit={(e) => e.preventDefault()}
                noValidate
              >
                <label className="sr-only" htmlFor="home-website-hp">
                  Website
                </label>
                <input
                  id="home-website-hp"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  className="absolute -left-[9999px] h-px w-px opacity-0"
                />

                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  <div>
                    <HomeFieldLabel htmlFor="home-name" required>
                      Name
                    </HomeFieldLabel>
                    <input
                      id="home-name"
                      type="text"
                      name="name"
                      required
                      inputMode="text"
                      enterKeyHint="next"
                      className={HOME_QUOTE_FIELD_CLASS}
                      placeholder="Your full name"
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <HomeFieldLabel htmlFor="home-companyName" optional>
                      Company
                    </HomeFieldLabel>
                    <input
                      id="home-companyName"
                      type="text"
                      name="companyName"
                      className={HOME_QUOTE_FIELD_CLASS}
                      placeholder="Company or organisation"
                      autoComplete="organization"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  <div>
                    <HomeFieldLabel
                      htmlFor="home-email"
                      required={contactMethod === "email"}
                      optional={contactMethod !== "email"}
                    >
                      Email
                    </HomeFieldLabel>
                    <input
                      id="home-email"
                      type="email"
                      name="email"
                      required={contactMethod === "email"}
                      inputMode="email"
                      enterKeyHint="next"
                      className={HOME_QUOTE_FIELD_CLASS}
                      placeholder="your@email.com"
                      autoComplete="email"
                    />
                  </div>
                  <div>
                    <HomeFieldLabel
                      htmlFor="home-phone"
                      required={contactMethod === "phone" || contactMethod === "text"}
                      optional={contactMethod !== "phone" && contactMethod !== "text"}
                    >
                      Phone
                    </HomeFieldLabel>
                    <input
                      id="home-phone"
                      type="tel"
                      name="phone"
                      required={contactMethod === "phone" || contactMethod === "text"}
                      inputMode="tel"
                      enterKeyHint="next"
                      className={HOME_QUOTE_FIELD_CLASS}
                      placeholder="020 0000 0000"
                      autoComplete="tel"
                    />
                  </div>
                </div>

                <div className="relative services-dropdown-container">
                  <HomeFieldLabel htmlFor="home-quote-service" optional>
                    Service
                  </HomeFieldLabel>
                  <ServiceCombobox
                    id="home-quote-service"
                    name="service"
                    options={HOME_QUOTE_SERVICES}
                    value={selectedService}
                    onChange={setSelectedService}
                    onOpenChange={setIsServicesDropdownOpen}
                    placeholder="Select or type a service"
                    emptyLabel="Select a service"
                    allowCustom
                    containerClassName="services-dropdown-container"
                    inputClassName="border-white/20 px-3.5 py-2.5 text-base focus:border-white sm:text-base"
                  />
                </div>

                <div>
                  <HomeFieldLabel htmlFor="home-message" required>
                    Message
                  </HomeFieldLabel>
                  <textarea
                    id="home-message"
                    name="message"
                    rows={3}
                    required
                    className={`${HOME_QUOTE_FIELD_CLASS} min-h-[96px] resize-y`}
                    placeholder="Tell us about your project or enquiry…"
                  />
                </div>

                <div>
                  <p className="quote-form-label mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-black/55">
                    Preferred contact{" "}
                    <span className="text-[0.8125rem] normal-case tracking-normal text-black/65">(required)</span>
                  </p>
                  <div className="flex flex-wrap gap-5">
                    <label className="flex cursor-pointer items-center gap-2.5">
                      <input
                        type="radio"
                        name="contact-method"
                        value="phone"
                        checked={contactMethod === "phone"}
                        onChange={() => setContactMethod("phone")}
                      />
                      <span className="contact-pref-option text-base text-black/90">Phone</span>
                    </label>
                    <label className="flex cursor-pointer items-center gap-2.5">
                      <input
                        type="radio"
                        name="contact-method"
                        value="email"
                        checked={contactMethod === "email"}
                        onChange={() => setContactMethod("email")}
                      />
                      <span className="contact-pref-option text-base text-black/90">Email</span>
                    </label>
                    <label className="flex cursor-pointer items-center gap-2.5">
                      <input
                        type="radio"
                        name="contact-method"
                        value="text"
                        checked={contactMethod === "text"}
                        onChange={() => setContactMethod("text")}
                      />
                      <span className="contact-pref-option text-base text-black/90">Text message</span>
                    </label>
                  </div>
                  {contactMethod === "text" ? (
                    <div className="mt-4">
                      <HomeConsentCheckbox id="home-sms-consent" checked={smsConsent} onChange={setSmsConsent} required>
                        I consent to APX Fire &amp; Security contacting me by SMS / text message about this enquiry.
                        Message and data rates may apply.{" "}
                        <span className="text-black/55">(required for text message)</span>
                      </HomeConsentCheckbox>
                    </div>
                  ) : null}
                </div>

                <HomeConsentCheckbox
                  id="home-privacy-consent"
                  checked={privacyConsent}
                  onChange={setPrivacyConsent}
                  required
                >
                  I have read the{" "}
                  <Link
                    href="/privacy"
                    className="font-semibold text-black underline decoration-black/35 underline-offset-2 hover:decoration-black"
                  >
                    Privacy Policy
                  </Link>{" "}
                  and understand APX Fire &amp; Security will process my details to respond to this enquiry.{" "}
                  <span className="text-black/55">(required)</span>
                </HomeConsentCheckbox>

                {submitError ? (
                  <p className="text-center text-sm text-red-300" role="alert">
                    {submitError}
                  </p>
                ) : null}

                <div className="flex w-full justify-center">
                  <TurnstileWidget onToken={setTurnstileToken} theme="light" />
                </div>

                <div className="flex w-full justify-end">
                  <FormSubmitButton
                    className="contact-form-submit"
                    onSubmit={async () => {
                      setSubmitError(null)
                      const form = homeFormRef.current
                      if (!form) throw new Error("missing-form")
                      if (!privacyConsent) {
                        setSubmitError("Please confirm you have read the Privacy Policy.")
                        throw new Error("privacy")
                      }
                      if (contactMethod === "text" && !smsConsent) {
                        setSubmitError("Please confirm you consent to SMS contact.")
                        throw new Error("sms")
                      }
                      const fd = new FormData(form)
                      const emailVal = String(fd.get("email") ?? "").trim()
                      const phoneVal = String(fd.get("phone") ?? "").trim()
                      const emailLooksOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)
                      const phoneLooksOk = phoneVal.length >= 8
                      if (!emailLooksOk && !phoneLooksOk) {
                        setSubmitError("Please provide at least one contact method (email or phone).")
                        throw new Error("contact-method")
                      }
                      if (contactMethod === "email" && !emailLooksOk) {
                        setSubmitError("Please enter a valid email address.")
                        throw new Error("email")
                      }
                      if ((contactMethod === "phone" || contactMethod === "text") && !phoneLooksOk) {
                        setSubmitError("Please enter a phone number for your preferred contact method.")
                        throw new Error("phone")
                      }
                      const websiteHp = String(fd.get("website") ?? "").trim()
                      if (websiteHp.length > 0) {
                        router.push("/thank-you")
                        return
                      }
                      const serviceLabel = selectedService
                        ? (HOME_QUOTE_SERVICES.find((o) => o.value === selectedService)?.label ?? selectedService)
                        : ""
                      const res = await fetch("/api/contact", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          name: String(fd.get("name") ?? "").trim(),
                          companyName: String(fd.get("companyName") ?? "").trim(),
                          email: emailVal,
                          phone: phoneVal,
                          service: selectedService,
                          serviceLabel: selectedService ? serviceLabel : "",
                          contactMethod,
                          message: String(fd.get("message") ?? "").trim(),
                          website: websiteHp,
                          privacyConsent,
                          smsConsent: contactMethod === "text" ? smsConsent : false,
                          formStartedAt: homeFormStartedAtRef.current,
                          turnstileToken: turnstileToken ?? "",
                        }),
                      })
                      const data = (await res.json().catch(() => ({}))) as { error?: string }
                      if (!res.ok) {
                        setSubmitError(
                          data.error ?? "Could not send. Please try again or email us directly."
                        )
                        throw new Error("contact-failed")
                      }
                      router.push("/thank-you")
                    }}
                  >
                    Send message
                  </FormSubmitButton>
                </div>
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
