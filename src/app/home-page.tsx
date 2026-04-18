"use client"

import Link from "next/link"
import {
  Shield,
  CheckCircle,
  Star,
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
  BadgeCheck,
  type LucideIcon,
} from "lucide-react"
import { useEffect, useLayoutEffect, useState, useMemo, useCallback, useRef } from "react"
import { GlobalStyles, lightTheme, darkTheme } from '@/components/ThemeToggle'
import { useTheme } from '@/contexts/ThemeContext'
import { CountUp } from '@/components/ui/CountUp'
import { CustomPillButton } from '@/components/ui/CustomPillButton'
import { FormSubmitButton } from '@/components/ui/FormSubmitButton'
import { GlassFormPanel } from "@/components/ui/GlassFormPanel"
import { MAIN_CASE_STUDIES } from "@/data/projects"
import { AboutIntroSection } from "@/components/home/AboutIntroSection"
import { MobileHomeContactFab } from "@/components/MobileHomeContactFab"
import { GoogleBusinessReviewsSlot } from "@/components/home/GoogleBusinessReviewsSlot"
import HeroVideoBackground from "@/components/HeroVideoBackground"
import { WhatWeOfferSection } from "@/components/home/WhatWeOfferSection"
import { HomeQuoteFormDrawShell, HOME_QUOTE_FORM_INNER_DELAY_MS } from "@/components/home/HomeQuoteFormDrawShell"
import { FS_SERVICE_SHIMMER_CARD } from "@/lib/fsServicePageCards"

/** Matches contact page field glass (draw shell / animation unchanged). */
const HOME_QUOTE_FIELD_CLASS =
  "w-full rounded-xl border border-white/15 bg-black px-4 py-3.5 text-[17px] font-bold text-white placeholder:text-white/40 placeholder:font-normal outline-none transition-[border,box-shadow] focus:border-white/50 focus:ring-0 focus:bg-black"

const SERVICES_BENEFITS_FS: {
  title: string
  description: string
  Icon: LucideIcon
  animationDelay: string
}[] = [
  {
    title: "Expert Installation",
    description: "Professional installation of fire and security systems with precision and care",
    Icon: Wrench,
    animationDelay: "0.1s",
  },
  {
    title: "24/7 Maintenance",
    description: "Round-the-clock maintenance and emergency repair services",
    Icon: Clock,
    animationDelay: "0.25s",
  },
  {
    title: "Quality Assurance",
    description: "All work backed by comprehensive warranties and quality guarantees",
    Icon: BadgeCheck,
    animationDelay: "0.4s",
  },
]

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
      "Cause-and-effect programming and commissioning",
      "BS 5839-aligned documentation and handover",
    ],
  },
  {
    title: "Security Systems",
    href: "/services/security-systems",
    Icon: Shield,
    bullets: ["CCTV (IP and analogue)", "Intruder alarm systems (Grade 2 and Grade 3)", "Video entry and access control"],
  },
  {
    title: "Maintenance & Support",
    href: "/services/maintenance-support",
    Icon: Wrench,
    bullets: ["Planned preventative maintenance", "24/7 call-out support", "System upgrades and compliance checks"],
  },
]

const WHY_CHOOSE_CARDS: { Icon: LucideIcon; title: string; bullets: string[] }[] = [
  {
    Icon: CheckCircle,
    title: "NSI Gold Accredited",
    bullets: ["BS EN ISO 9001:2015", "BAFE Fire Safety Registered", "UKAS Quality Management", "FIA Member"],
  },
  {
    Icon: Clock,
    title: "24/7 Emergency Service",
    bullets: [
      "Round-the-clock security support",
      "Rapid response times",
      "Monitored alarm response",
      "When you need it most",
    ],
  },
  {
    Icon: Shield,
    title: "Quality Guarantee",
    bullets: [
      "Constructionline Gold Member",
      "All work to NSI Gold standards",
      "Quality assurance",
      "Reliable service",
    ],
  },
]

const ACCREDITATIONS_HOME_LOGOS: { slug: string; src: string; alt: string }[] = [
  { slug: "nsi", src: "/accreditations%20mono/NSI-01.svg", alt: "NSI Gold" },
  { slug: "bafe", src: "/accreditations%20mono/Coloured/BAFE-01.svg", alt: "BAFE" },
  { slug: "constructionline", src: "/accreditations%20mono/Coloured/ConstructionOnline-01.svg", alt: "Constructionline" },
  { slug: "fia", src: "/accreditations%20mono/Coloured/FIA-01.svg", alt: "FIA" },
]

/** Hero strip: first mark (NSI) white on dark hero; others match Trusted section colours */
const HERO_ACCREDITATION_LOGOS: { slug: string; src: string; alt: string }[] = [
  { slug: "nsi", src: "/accreditations%20mono/White/NSI-02.svg", alt: "NSI Gold" },
  ...ACCREDITATIONS_HOME_LOGOS.filter((a) => a.slug !== "nsi"),
]

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
  const projectsSectionRef = useRef<HTMLElement>(null)
  const projectsLabelRef = useRef<HTMLSpanElement>(null)
  const testimonialQuoteStackRef = useRef<HTMLDivElement>(null)
  const [testimonialsQuoteMinPx, setTestimonialsQuoteMinPx] = useState<number | null>(null)
  const [heroAnimation, setHeroAnimation] = useState({
    videoVisible: false,
    titleVisible: false,
    subtitleVisible: false,
    statsVisible: false,
    clientsVisible: false
  })
  const [heroScrollProgress, setHeroScrollProgress] = useState(0)
  const [sectionMotion, setSectionMotion] = useState({
    core: false,
    aboutIntro: false,
    services: false,
    benefits: false,
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
    { id: 'about-intro', name: 'Our story' },
    { id: 'services', name: 'Services' },
    { id: 'services-benefits', name: 'Service promise' },
    { id: 'projects', name: 'Projects' },
    { id: 'about', name: 'Why Choose Us' },
    { id: 'accreditations', name: 'Accreditations' },
    { id: 'why-mep', name: 'News & Articles' },
    { id: 'logo-marquee', name: 'Clients' },
    { id: 'testimonials', name: 'Testimonials' },
    { id: 'contact', name: 'Contact' }
  ], [])

  const mepCards = useMemo(() => [
    { id: 'retail', title: 'Retail & High Street', description: 'Integrated CCTV, access control and intruder alarms for single sites and multi-branch retail. Remote monitoring, till-area coverage and out-of-hours protection.', href: '/services', icon: Cog, image: '/cctv%20systems.jpg' },
    { id: 'corporate', title: 'Corporate & Offices', description: 'Access control, fire detection and video door entry for commercial buildings. Reception integration, visitor management and evacuation compliance.', href: '/services', icon: Zap, image: '/access%20control%20systems.jpg' },
    { id: 'education', title: 'Education & Schools', description: 'Fire alarms, access control and CCTV meeting safeguarding and DfE guidelines. Site-wide coverage, lockdown capability and 24/7 monitoring.', href: '/services', icon: Wind, image: '/home-fire-alarm-system-installer-800x533.jpg' },
    { id: 'healthcare', title: 'Healthcare & Care Homes', description: 'Monitored fire and intruder systems for hospitals, clinics and care homes. BS 5839 compliance, nurse-call integration and emergency response.', href: '/services', icon: Leaf, image: '/intruder%20alarm%20systems.jpg' },
    { id: 'industrial', title: 'Industrial & Warehousing', description: 'Perimeter security, CCTV and fire systems for logistics and manufacturing. Large-site coverage, gate access and hazardous-area detection.', href: '/services', icon: Wrench, image: '/cctv%20systems.jpg' },
  ], [])

  const newsArticles = useMemo(() => [
    { id: 'a1', title: 'Random Article 1', description: 'Placeholder description for article 1.', href: '#', icon: ArrowRight, image: '/cctv%20systems.jpg' },
    { id: 'a2', title: 'Random Article 2', description: 'Placeholder description for article 2.', href: '#', icon: ArrowRight, image: '/access%20control%20systems.jpg' },
    { id: 'a3', title: 'Random Article 3', description: 'Placeholder description for article 3.', href: '#', icon: ArrowRight, image: '/home-fire-alarm-system-installer-800x533.jpg' },
    { id: 'a4', title: 'Random Article 4', description: 'Placeholder description for article 4.', href: '#', icon: ArrowRight, image: '/intruder%20alarm%20systems.jpg' },
    { id: 'a5', title: 'Random Article 5', description: 'Placeholder description for article 5.', href: '#', icon: ArrowRight, image: '/video%20door%20entry%20systems.jpg' },
    { id: 'a6', title: 'Random Article 6', description: 'Placeholder description for article 6.', href: '#', icon: ArrowRight, image: '/cctv%20systems.jpg' },
  ], [])

  const projects = useMemo(
    () =>
      MAIN_CASE_STUDIES.map((project) => ({
        image: project.heroImage,
        stat: project.sector,
        location: project.location,
        description: project.shortDescription,
        quote: project.summary,
        href: `/projects/${project.slug}`,
        title: project.title,
      })),
    []
  )

  const scrollProjects = useCallback((dir: 'left' | 'right') => {
    const el = projectsScrollRef.current
    if (!el || !el.firstElementChild) return
    const cardWidth = (el.firstElementChild as HTMLElement).offsetWidth
    const gap = 24
    const step = cardWidth + gap
    el.scrollBy({ left: dir === 'left' ? -step : step, behavior: 'smooth' })
  }, [])

  // Same as MEP: when Projects is in view, vertical wheel drives horizontal strip until ends
  useEffect(() => {
    const section = projectsSectionRef.current
    const strip = projectsScrollRef.current
    if (!section || !strip) return

    const inZone = () => {
      const label = projectsLabelRef.current
      if (label) {
        const r = label.getBoundingClientRect()
        return r.top <= 80 && r.bottom > 0
      }
      const rect = section.getBoundingClientRect()
      return rect.top <= 80 && rect.bottom > 200
    }

    const onWheel = (e: WheelEvent) => {
      if (!inZone()) return

      const maxScroll = strip.scrollWidth - strip.clientWidth
      const atStart = strip.scrollLeft <= 5
      const atEnd = maxScroll <= 0 || strip.scrollLeft >= maxScroll - 5

      const scale = 2.2
      let amount = e.deltaY * scale
      amount = Math.sign(amount) * Math.min(400, Math.abs(amount))

      if (e.deltaY > 0) {
        if (atEnd) return
        e.preventDefault()
        strip.scrollLeft = Math.min(strip.scrollLeft + amount, maxScroll)
      } else {
        if (atStart) return
        e.preventDefault()
        strip.scrollLeft = Math.max(strip.scrollLeft + amount, 0)
      }
    }

    window.addEventListener("wheel", onWheel, { passive: false })
    return () => window.removeEventListener("wheel", onWheel)
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
      rating: 5
    },
    {
      name: "Emma Williams",
      role: "Property Manager, Retail Group",
      text: "Our integrated security system was designed and installed flawlessly. Great communication throughout and excellent after-sales support.",
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

    const timer4 = setTimeout(() => {
      setHeroAnimation(prev => ({ ...prev, statsVisible: true }))
    }, 980)

    const timer5 = setTimeout(() => {
      setHeroAnimation(prev => ({ ...prev, clientsVisible: true }))
    }, 1080)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
      clearTimeout(timer5)
    }
  }, [])

  // Hero parallax: subtle layered movement/fade on scroll
  useEffect(() => {
    const onScroll = () => {
      const progress = Math.min((window.scrollY || 0) / 520, 1)
      setHeroScrollProgress(progress)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Scroll-in effects for content only (never section backgrounds)
  useEffect(() => {
    const sectionIds = [
      { id: "core-capabilities", key: "core" as const },
      { id: "about-intro", key: "aboutIntro" as const },
      { id: "services", key: "services" as const },
      { id: "services-benefits", key: "benefits" as const },
      { id: "projects", key: "projects" as const },
      { id: "why-mep", key: "news" as const },
      { id: "logo-marquee", key: "marquee" as const },
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

  // Testimonial carousel — pauses while pointer is over the section
  useEffect(() => {
    if (testimonialsPaused) return
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [testimonials.length, testimonialsPaused])

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
        
        // Preferred contact radios: styled in globals.css (#contact #quote-form) — white fill when checked
        
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

  // MEP cards: CodePen exact – set grid columns and data-active, then resync --article-width after layout
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

  // Close services dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isServicesDropdownOpen && !target.closest('.services-dropdown-container')) {
        setIsServicesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isServicesDropdownOpen]);

  return (
    <>
      <GlobalStyles theme={themeMode} />
      <div className="min-h-screen overflow-x-clip relative z-10">

      {/* Hero Section – background image scrolls with this section (not viewport-fixed) */}
      <section id="hero" className="relative h-screen overflow-visible bg-transparent flex flex-col" style={{ background: 'transparent' }}>
        <HeroVideoBackground />
        {/* Content */}
        <div
          className={`container mx-auto px-6 flex-1 flex flex-col justify-start pt-52 pb-40 relative z-20 transition-all duration-1000 ${
            heroAnimation.videoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="space-y-4">
            {/* Title + paragraph: white text on hero image */}
            <div className="max-w-2xl">
              <h1 className={`hero-title-reveal text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-3 text-left transition-all duration-[1200ms] font-title text-white ${
                heroAnimation.titleVisible ? 'opacity-100 translate-y-0 blur-0 scale-100' : 'opacity-0 translate-y-10 blur-[8px] scale-[0.985]'
              }`}
              style={{
                transform: heroAnimation.titleVisible
                  ? `translateY(${heroScrollProgress * -34}px) scale(${1 - heroScrollProgress * 0.03})`
                  : undefined,
                opacity: heroAnimation.titleVisible ? Math.max(0.18, 1 - heroScrollProgress * 0.9) : undefined,
              }}>
                APX FS is your NSI Gold security system installer.
              </h1>
              <p className={`hero-copy-reveal text-base sm:text-lg md:text-xl font-normal mb-4 md:mb-5 text-left tracking-tight transition-all duration-1000 max-w-lg text-white ${
                heroAnimation.subtitleVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-7 blur-[6px]'
              }`}
              style={{
                transform: heroAnimation.subtitleVisible ? `translateY(${heroScrollProgress * -20}px)` : undefined,
                opacity: heroAnimation.subtitleVisible ? Math.max(0.12, 1 - heroScrollProgress * 0.95) : undefined,
              }}>
                We are specialists in the design, installation and maintenance of bespoke integrated security systems within London and the Home Counties.
              </p>

              {/* Hero CTAs – side by side */}
              <div className={`hero-cta-reveal flex flex-wrap items-center gap-4 sm:gap-6 pt-2 transition-all duration-1000 ${
                heroAnimation.statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transform: heroAnimation.statsVisible ? `translateY(${heroScrollProgress * -14}px)` : undefined,
                opacity: heroAnimation.statsVisible ? Math.max(0.08, 1 - heroScrollProgress * 1.05) : undefined,
              }}>
                <CustomPillButton href="/contact" size="md">
                  Get a free quote
                </CustomPillButton>
                <Link
                  href="/contact"
                  className="text-white font-normal text-base underline underline-offset-4 hover:text-white/90 transition-colors duration-300"
                >
                  Question? get in touch
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Hero accreditations – NSI white; BAFE / Constructionline / FIA coloured (sizes unchanged) */}
        <div
          className={`container mx-auto px-6 pb-10 sm:pb-12 mb-24 sm:mb-32 relative z-10 transition-all duration-700 ease-out ${
            heroAnimation.clientsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{
            transform: heroAnimation.clientsVisible
              ? `translateY(${heroScrollProgress * -10}px)`
              : undefined,
            opacity: heroAnimation.clientsVisible ? Math.max(0.05, 1 - heroScrollProgress * 1.2) : undefined,
          }}
        >
          <div className={`w-1/2 mx-auto h-px bg-white/25 mb-6 transition-all duration-500 ${heroAnimation.clientsVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}`} aria-hidden />
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 max-w-6xl mx-auto">
            {HERO_ACCREDITATION_LOGOS.map((acc, idx) => (
              <div
                key={acc.slug}
                className={`flex items-center justify-center h-14 sm:h-16 w-auto max-w-[150px] sm:max-w-[180px] transition-all duration-500 ease-out ${
                  heroAnimation.clientsVisible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-6 blur-[4px]"
                }`}
                style={{ transitionDelay: `${idx * 55}ms` }}
                aria-hidden
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={acc.src} alt={acc.alt} className="h-full w-auto object-contain opacity-90 transition-transform duration-500 hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
        
      </section>

      {/* Core capabilities – black section blended from hero before Our Story */}
      <section
        id="core-capabilities"
        className="relative bg-black py-20 lg:py-24 overflow-hidden"
      >
        {/* Top feather to blend hero into this black section */}
        <div
          className="pointer-events-none absolute top-0 left-0 right-0 h-28 sm:h-36"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.82) 52%, rgba(0,0,0,1) 100%)",
          }}
          aria-hidden
        />

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div
            className={`max-w-3xl transition-all duration-[900ms] ease-out ${
              sectionMotion.core ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span
              className="section-label text-white/80 font-bold"
              style={{ fontFamily: "var(--font-menu), sans-serif" }}
            >
              Core capabilities
            </span>
            <h2 className="home-section-title mt-3 text-white font-title">
              Where We Thrive
            </h2>
            <p className="mt-4 text-sm sm:text-base text-white/70 leading-relaxed max-w-2xl">
              APX Fire and Security understands the importance of delivering compliant, reliable systems that integrate seamlessly with wider building services. We recognise the need for clear coordination, minimal disruption, and accurate installation aligned with design intent.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-y-14 gap-x-6 md:grid-cols-3 md:gap-x-7 md:gap-y-16 lg:gap-x-8">
            {FS_THRIVE_CARDS.map((card, cardIndex) => {
              const CapIcon = card.Icon
              return (
                <div
                  key={card.title}
                  className={`flex h-full flex-col items-center transition-all duration-700 ease-out ${
                    sectionMotion.core ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: sectionMotion.core ? `${cardIndex * 100}ms` : "0ms" }}
                >
                  <div
                    className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/25 bg-black shadow-[0_8px_28px_rgba(0,0,0,0.55)]"
                    aria-hidden
                  >
                    <CapIcon className="h-7 w-7 shrink-0 text-white/90" strokeWidth={1.5} />
                  </div>
                  <article
                    className={`${FS_SERVICE_SHIMMER_CARD} apx-home-card-light-edge -mt-7 flex w-full min-w-0 flex-1 flex-col px-6 pb-6 pt-11 text-center md:min-h-[20rem] md:px-7 md:pb-7 md:pt-12`}
                  >
                    <h3
                      className="text-lg font-semibold leading-snug text-white md:text-xl"
                      style={{ fontFamily: "var(--font-menu), sans-serif" }}
                    >
                      {card.title}
                    </h3>
                    <ul className="apx-capability-list mt-6 flex-1 text-center sm:mt-7">
                      {card.bullets.map((line) => (
                        <li key={line} className="apx-capability-list__item">
                          {line}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex justify-end border-t border-white/10 pt-6 md:mt-8">
                      <CustomPillButton
                        href={card.href}
                        size="sm"
                        className="pill-btn--corners-sm text-xs font-semibold uppercase tracking-normal [&_span.pill-text]:!font-semibold"
                      >
                        Learn more
                      </CustomPillButton>
                    </div>
                  </article>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Wrapper so CCTV overlay can sit above both about and services */}
      <div className="relative">
        <AboutIntroSection />

        {/* Services Section – cards animate in one at a time (path animation), top row first */}
        <section id="services" className="home-services-band section-spacing relative overflow-visible bg-black">
        <div className="container mx-auto px-6 lg:px-8">
          <div
            className={`section-content-gap space-y-16 text-white transition-all duration-[900ms] ease-out ${
              sectionMotion.services ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <WhatWeOfferSection />
          </div>
        </div>
        </section>
      </div>

      {/* Benefits strip: Expert Installation, 24/7 Maintenance, Quality Assurance — black band between Services and Projects */}
      <section
        id="services-benefits"
        className="section-spacing relative overflow-hidden bg-black"
        style={{ backgroundColor: "#000000" }}
      >
        <div className="container relative z-10 mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-y-14 gap-x-6 md:grid-cols-3 md:gap-x-7 md:gap-y-16 lg:gap-x-8">
            {SERVICES_BENEFITS_FS.map(({ title, description, Icon, animationDelay }, benefitIndex) => (
              <div
                key={title}
                className="services-benefit-card flex h-full flex-col items-center"
                style={{ animationDelay }}
              >
                <div
                  className={`flex w-full flex-col items-center transition-all duration-700 ease-out ${
                    sectionMotion.benefits ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: sectionMotion.benefits ? `${benefitIndex * 110}ms` : "0ms" }}
                >
                  <div
                    className="services-benefit-icon-badge relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/25 bg-black shadow-[0_8px_28px_rgba(0,0,0,0.55)]"
                    aria-hidden
                  >
                    <Icon className="h-7 w-7 shrink-0 text-white/90" strokeWidth={1.5} />
                  </div>
                  <article
                    className={`${FS_SERVICE_SHIMMER_CARD} apx-home-card-light-edge services-benefit-article -mt-7 flex w-full min-w-0 flex-1 flex-col px-6 pb-6 pt-11 text-center md:px-7 md:pb-7 md:pt-12`}
                  >
                    <h3
                      className="services-benefit-title text-lg font-semibold leading-snug text-white md:text-xl"
                      style={{ fontFamily: "var(--font-menu)" }}
                    >
                      {title}
                    </h3>
                    <p className="services-benefit-desc mt-6 text-center sm:mt-7">{description}</p>
                  </article>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects – horizontal strip + wheel maps vertical→horizontal (same behaviour as MEP homepage) */}
      <section ref={projectsSectionRef} id="projects" className="bg-black overflow-x-hidden pt-20 pb-32 lg:pt-28 lg:pb-44">
        <div className="container mx-auto px-6 lg:px-8">
          <div
            className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-14 lg:mb-20 transition-all duration-[900ms] ease-out ${
              sectionMotion.projects ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div>
              <span ref={projectsLabelRef} className="section-label text-white/80">Projects</span>
              <h2 className="home-section-title text-white font-title">
                Built to last — delivered with care.
              </h2>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => scrollProjects('left')}
                className="projects-nav-btn w-12 h-12 rounded-full border border-white bg-transparent text-white flex items-center justify-center transition-colors hover:bg-white hover:text-black focus:bg-white focus:text-black"
                aria-label="Previous projects"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={() => scrollProjects('right')}
                className="projects-nav-btn w-12 h-12 rounded-full border border-white bg-transparent text-white flex items-center justify-center transition-colors hover:bg-white hover:text-black focus:bg-white focus:text-black"
                aria-label="Next projects"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
        {/* Full viewport width scroll strip – bleeds off both sides; content offset from left via padding */}
        <div
          className={`w-screen relative left-1/2 -translate-x-1/2 transition-all delay-100 duration-[1000ms] ease-out ${
            sectionMotion.projects ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div
            ref={projectsScrollRef}
            className="flex min-h-[300px] gap-6 overflow-x-auto overflow-y-hidden pb-6 pl-6 lg:pl-8 pr-6 lg:pr-8 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
          {projects.map((p, i) => (
            <Link
              key={i}
              href={p.href}
              className="projects-card group flex-shrink-0 flex flex-col rounded-xl overflow-hidden bg-black transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[3/4] min-h-[480px] projects-card__inner">
                {/* Project number – top centre, text only */}
                {/* Project number – top right, same font as titles */}
                {/* Project number – top right, same font as titles */}
                <span className="projects-card-number absolute top-6 right-6 z-10 text-5xl sm:text-6xl font-bold text-white tabular-nums drop-shadow-md" style={{ fontFamily: 'var(--font-title, "Outfit", sans-serif)' }} aria-hidden>{(i + 1).toString().padStart(2, '0')}</span>
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${p.image})` }}
                />
                <div className="projects-card-glass absolute inset-x-0 bottom-0 top-1/2 overflow-hidden p-6 pt-20 pb-5 pr-16 flex flex-col justify-end">
                  {/* Blurred image layer (same as card) – guarantees glass displacement without relying on backdrop-filter */}
                  <div
                    className="projects-card-glass-blur absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${p.image})` }}
                    aria-hidden
                  />
                  <div className="projects-card-glass-overlay absolute inset-0" aria-hidden />
                  <div className="relative z-20">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-white mb-2">{p.stat}</p>
                    <p className="text-[clamp(1.45rem,2.4vw,2rem)] font-bold text-white mb-1.5 leading-[1.12] min-h-[4.8rem]">{p.title}</p>
                    <p className="text-white/90 text-xs uppercase tracking-[0.11em] mb-2.5">{p.location}</p>
                    <p className="text-white text-sm mb-3 line-clamp-2 min-h-[2.6rem]">{p.description}</p>
                    <p className="text-white text-sm italic mb-4 line-clamp-2 min-h-[2.7rem]">&ldquo;{p.quote}&rdquo;</p>
                  </div>
                  <span className="projects-card-arrow absolute bottom-5 right-6 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-white/20 text-white transition-transform duration-200 group-hover:rotate-12" aria-hidden>
                    <ChevronRight className="w-5 h-5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us – canted top and bottom */}
      <section
        id="about"
        className={`section-spacing section-canted-top section-canted-bottom transition-opacity duration-300 ${
          sectionMotion.about ? "home-about--in-view" : ""
        }`}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="section-content-gap space-y-16">
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-20">
              <div className="why-choose-us-copy min-w-0 text-black">
                <span className="section-label section-label--black about-reveal" style={{ transitionDelay: "0ms" }}>TRUSTED & ACCREDITTED</span>
                <h2 className="home-section-title section-title-gap about-reveal font-title text-black" style={{ transitionDelay: "120ms" }}>
                  <span className="block leading-[1.03]">Trust,</span>
                  <span className="mt-0.5 block leading-[1.03] sm:mt-1">quality,</span>
                  <span className="mt-0.5 block leading-[1.03] sm:mt-1">peace of mind.</span>
                </h2>
                <p className="section-intro-gap mt-8 max-w-xl text-base leading-relaxed text-gray-600 md:mt-10 about-reveal" style={{ transitionDelay: "220ms" }}>
                  We have been providing bespoke integrated security systems to London and the Home Counties since 1986. Our extensive knowledge and decades of real world experience allow us to deliver high quality security systems to the domestic and commercial sector.
                </p>

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

              <div className="grid w-full min-w-0 grid-cols-2 items-stretch gap-x-4 gap-y-7 self-center sm:gap-x-5 sm:gap-y-8 lg:ml-auto lg:max-w-[46rem] lg:justify-self-end">
                {WHY_CHOOSE_CARDS.map(({ Icon, title, bullets }, idx) => (
                  <div key={title} className="why-choose-card-shell about-reveal flex min-w-0 flex-col items-center" style={{ transitionDelay: `${360 + idx * 90}ms` }}>
                    <div
                      className="why-choose-icon-badge relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/25 bg-black shadow-[0_6px_22px_rgba(0,0,0,0.5)] md:h-12 md:w-12 md:rounded-xl"
                      aria-hidden
                    >
                      <Icon className="h-5 w-5 shrink-0 text-white/90 md:h-6 md:w-6" strokeWidth={1.5} />
                    </div>
                    <article className="why-choose-card -mt-6 flex w-full min-w-0 flex-col rounded-tl-[1.35rem] rounded-br-[1.35rem] border-2 border-white bg-black px-3 pb-4 pt-8 text-center text-white md:rounded-tl-[1.5rem] md:rounded-br-[1.5rem] md:px-4 md:pb-5 md:pt-9">
                      <h4 className="font-title text-base font-semibold leading-snug text-white md:text-lg">{title}</h4>
                      <ul className="apx-capability-list mt-3 flex-1 text-center text-sm sm:mt-4">
                        {bullets.map((line) => (
                          <li key={line} className="apx-capability-list__item">
                            {line}
                          </li>
                        ))}
                      </ul>
                    </article>
                  </div>
                ))}
                <div className="about-reveal" style={{ transitionDelay: "760ms" }}>
                  <GoogleBusinessReviewsSlot />
                </div>
              </div>
            </div>

            <div id="accreditations" className="about-reveal pt-4 lg:pt-8" style={{ transitionDelay: "860ms" }}>
              <div className="mx-auto max-w-6xl rounded-[1.75rem] border-2 border-black/20 px-6 py-12 text-center shadow-[0_1px_0_rgba(0,0,0,0.04)] sm:px-12 sm:py-14 lg:max-w-7xl lg:px-16 lg:py-16">
                <span className="section-label section-label--black mb-1">Accreditations</span>
                <h3 className="accreditations-heading home-section-title font-title text-black">
                  Accredited &amp; fully qualified
                </h3>
                <p className="accreditations-text mx-auto mt-5 max-w-2xl text-base leading-relaxed text-black/75">
                  We maintain independent certification and industry alignment so your fire and security packages are delivered with clear governance, competent engineers and documentation that stands up to handover and audit.
                </p>

                <div className="mx-auto mt-10 flex w-full max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-8 sm:gap-x-14 sm:gap-y-10 md:gap-x-16 lg:max-w-6xl">
                  {ACCREDITATIONS_HOME_LOGOS.map(({ slug, src, alt }) => (
                    <Link
                      key={slug}
                      href={`/accreditations/${slug}`}
                      className="group flex h-[4.5rem] min-w-[7.5rem] items-center justify-center px-2 sm:h-20 sm:min-w-[9rem] md:h-[5.25rem] md:min-w-[10rem]"
                      aria-label={`${alt} — view dedicated accreditation page`}
                    >
                      <img
                        src={src}
                        alt=""
                        className="max-h-14 w-auto max-w-[11rem] origin-center object-contain opacity-85 transition-[opacity,transform] duration-300 ease-out group-hover:scale-[1.06] group-hover:opacity-100 sm:max-h-16 sm:max-w-[12rem] md:max-h-[5.25rem] md:max-w-[13rem]"
                        aria-hidden
                      />
                    </Link>
                  ))}
                </div>

                <div className="mt-10 flex justify-center">
                  <CustomPillButton href="/accreditations" size="md" variant="onLight" className="hover:[&_span.pill-text]:!text-white">
                    View accreditations
                  </CustomPillButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News and Articles */}
      <section id="why-mep" className="news-section">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="news-section__grid">
            <div
              className={`news-section__left transition-all duration-[900ms] ease-out ${
                sectionMotion.news ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <header className="news-section__header">
                <span className="news-section__label">News and Articles</span>
                <h2 className="news-section__title">Insights and updates</h2>
              </header>
              <nav aria-label="Articles">
                <ul className="news-section__list">
                  {newsArticles.slice(0, 3).map((article, i) => (
                    <li key={article.id} className={`news-section__item ${activeNewsIndex === i ? 'news-section__item--active' : ''}`}>
                      <span className={`news-section__link ${activeNewsIndex === i ? 'news-section__link--active' : ''}`}>
                        {article.title}
                      </span>
                      {activeNewsIndex === i && (
                        <span className="news-section__bar" style={{ width: `${newsProgress * 100}%` }} aria-hidden />
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div
              className={`news-section__right transition-all duration-[900ms] ease-out ${
                sectionMotion.news ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "120ms" }}
            >
              <div
                className="news-section__image"
                style={{ backgroundImage: `url('${newsArticles[activeNewsIndex]?.image || newsArticles[0].image}')` }}
                aria-hidden
              />
            </div>
          </div>
        </div>
      </section>

      {/* Logo marquee — above testimonials */}
      <section id="logo-marquee" className="logo-marquee-section py-12 overflow-hidden" aria-label="Trusted by leading brands">
        <div
          className={`logo-marquee-wrapper transition-all duration-[900ms] ease-out ${
            sectionMotion.marquee ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
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
          <div className="logo-marquee logo-marquee--reverse">
            <div className="logo-marquee__group">
              {[...clientLogoPaths].reverse().map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={`c-${i}`} src={src} alt="" className="logo-marquee__img" aria-hidden />
              ))}
            </div>
            <div className="logo-marquee__group" aria-hidden="true">
              {[...clientLogoPaths].reverse().map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={`d-${i}`} src={src} alt="" className="logo-marquee__img" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials — full-bleed black, large display type, arrows + fade */}
      <section
        id="testimonials"
        className="relative overflow-hidden bg-black py-20 sm:py-24 lg:py-32"
        onMouseEnter={() => setTestimonialsPaused(true)}
        onMouseLeave={() => setTestimonialsPaused(false)}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-10%,rgba(255,255,255,0.07),transparent_55%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
          aria-hidden
        />
        <div className="relative z-10 container mx-auto px-6 lg:px-8">
          <div className="grid items-end gap-14 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-12">
            <div
              className={`lg:col-span-5 transition-all duration-[900ms] ease-out ${
                sectionMotion.testimonials ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <span className="section-label text-white/70">Testimonials</span>
              <h2 className="home-section-title mt-4 font-title text-white">
                Trusted by teams
                <span className="block text-white/90">that expect results</span>
              </h2>
              <p className="mt-8 max-w-md text-base leading-relaxed text-white/55">
                Don&apos;t just take our word for it — hear from clients who&apos;ve worked with APX Fire &amp; Security
                across London and the Home Counties.
              </p>
            </div>

            <div
              className={`relative lg:col-span-7 transition-all delay-150 duration-[900ms] ease-out ${
                sectionMotion.testimonials ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
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
                    className="projects-nav-btn w-12 h-12 rounded-full border border-white bg-transparent text-white flex items-center justify-center transition-colors hover:bg-white hover:text-black focus:bg-white focus:text-black"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next testimonial"
                    onClick={testimonialNext}
                    className="projects-nav-btn w-12 h-12 rounded-full border border-white bg-transparent text-white flex items-center justify-center transition-colors hover:bg-white hover:text-black focus:bg-white focus:text-black"
                  >
                    <ChevronRight className="w-6 h-6" />
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

      {/* Ready to Get Started Section – black bg, white text */}
      <section id="contact" className="section-spacing relative bg-black">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
            {/* Left side - Title and Button */}
            <div
              className={`contact-section-head space-y-8 pt-16 lg:pt-24 transition-all duration-[600ms] ease-out ${
                sectionMotion.contact ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={
                sectionMotion.contact ? { transitionDelay: `${HOME_QUOTE_FORM_INNER_DELAY_MS}ms` } : undefined
              }
            >
              <span className="section-label text-white/80">Contact</span>
              <h2 className="home-section-title text-left text-white font-title">
                Ready to get started?
              </h2>
              
              <div className="space-y-6 max-w-lg">
                <p className="text-base leading-relaxed text-gray-300">
                  As one of the leading security system installers in London and the south east, we are pleased to offer a free survey and report for your property. Our systems are expertly designed in accordance with NSI Gold standards, covering both the domestic and commercial market.
                </p>
                
                <p className="text-base leading-relaxed text-gray-300">
                  Whether you&apos;re looking for security, monitoring, detection or safety, simply contact us for a chat about your requirements. We respond to all enquiries promptly and will provide detailed, competitive quotes tailored to your needs.
              </p>
            </div>
            
              <button
                className="bg-white text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 flex items-center gap-3"
                onClick={() => document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <ArrowRight className="h-6 w-6" />
                GET A QUOTE
              </button>
                </div>
            
            {/* Right side - Contact Form (glassmorphic) — animated SVG border + delayed inner fade */}
            <HomeQuoteFormDrawShell active={sectionMotion.contact}>
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
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                    Service Required *
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      className={`quote-form-field quote-form-dropdown flex w-full cursor-pointer items-center justify-between rounded-xl border border-white/15 bg-black px-4 py-3.5 text-left text-[17px] font-bold outline-none transition-[border,box-shadow] focus:border-white/50 focus:bg-black focus:ring-0 ${
                        selectedService ? "text-white" : "text-white/85"
                      }`}
                      onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                    >
                      <span>{selectedService || "Select a service"}</span>
                      <svg
                        className="h-5 w-5 shrink-0 text-white/60 transition-transform duration-200"
                        style={{ transform: isServicesDropdownOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {isServicesDropdownOpen && (
                      <div
                        className="quote-form-dropdown-menu absolute left-0 right-0 top-full z-50 mt-2 max-h-60 overflow-auto rounded-xl border border-white/12 bg-zinc-950 py-2 shadow-2xl"
                        data-lenis-prevent=""
                      >
                        {[
                          { value: 'cctv', label: 'CCTV Systems' },
                          { value: 'access-control', label: 'Access Control Systems' },
                          { value: 'intruder-alarms', label: 'Intruder Alarm Systems' },
                          { value: 'fire-alarms', label: 'Fire Alarm Systems' },
                          { value: 'video-door-entry', label: 'Video Door Entry Systems' },
                          { value: 'refuge-evc', label: 'Refuge & Disabled Communication Systems' },
                          { value: 'evac-voice', label: 'EVAC & Voice Evacuation Systems' },
                          { value: 'fire-life-safety', label: 'Fire & Life Safety (Overview)' },
                          { value: 'maintenance-support', label: 'Maintenance & Support' },
                          { value: 'other', label: 'Other' }
                        ].map((service) => (
                          <button
                            key={service.value}
                            type="button"
                            className="quote-form-dropdown-item block w-full px-4 py-3 text-left text-[17px] font-bold text-white transition-colors hover:bg-white/10"
                            onClick={() => {
                              setSelectedService(service.label)
                              setIsServicesDropdownOpen(false)
                            }}
                          >
                            {service.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
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

      <MobileHomeContactFab
        logoSrc="/__APX Web Logo FS.svg"
        logoAlt="APX Fire & Security"
        phoneDisplay="020 8303 2280"
        phoneHref="tel:02083032280"
        email="enquiries@apx-fs.co.uk"
      />
    </>
  );
}
