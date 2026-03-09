"use client"

import Link from "next/link"
import { Shield, CheckCircle, Star, ArrowRight, Clock, Cog, Zap, Wind, Leaf, Wrench, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState, useMemo, useCallback, useRef } from "react"
import { GlobalStyles, lightTheme, darkTheme } from '@/components/ThemeToggle'
import { useTheme } from '@/contexts/ThemeContext'
import { CountUp } from '@/components/ui/CountUp'
import { CustomPillButton } from '@/components/ui/CustomPillButton'
import { FormSubmitButton } from '@/components/ui/FormSubmitButton'

export default function Home() {
  const { theme } = useTheme()
  const themeMode = theme === "light" ? lightTheme : darkTheme
  
  const [activeSection, setActiveSection] = useState(0)
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false)
  const [selectedService, setSelectedService] = useState('')
  
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [activeMepIndex, setActiveMepIndex] = useState(0)
  const [activeNewsIndex, setActiveNewsIndex] = useState(0)
  const [newsProgress, setNewsProgress] = useState(0)
  const newsProgressRef = useRef(0)
  const newsIndexRef = useRef(0)
  const mepListRef = useRef<HTMLUListElement>(null)
  const projectsScrollRef = useRef<HTMLDivElement>(null)
  const aboutIntroRef = useRef<HTMLElement>(null)
  /* Scroll-driven: about intro fade; services cards: path animation when section in view */
  const [aboutScrollProgress, setAboutScrollProgress] = useState(0)
  const [aboutContentFade, setAboutContentFade] = useState(0)
  const [servicesInView, setServicesInView] = useState(false)

  const [heroAnimation, setHeroAnimation] = useState({
    videoVisible: false,
    titleVisible: false,
    subtitleVisible: false,
    statsVisible: false,
    clientsVisible: false
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
    { id: 'about-intro', name: 'Our story' },
    { id: 'services', name: 'Services' },
    { id: 'logo-marquee', name: 'Clients' },
    { id: 'projects', name: 'Projects' },
    { id: 'why-mep', name: 'News & Articles' },
    { id: 'about', name: 'Why Choose Us' },
    { id: 'accreditations', name: 'Accreditations' },
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

  const projects = useMemo(() => [
    { image: '/cctv%20systems.jpg', stat: '250+', description: 'CCTV and access control installation for commercial premises', quote: 'APX delivered a complete CCTV and access control solution on time and to NSI Gold standard.', href: '/projects', title: 'PROJECT 1' },
    { image: '/home-fire-alarm-system-installer-800x533.jpg', stat: '99%', description: 'Fire alarm system design, installation and commissioning', quote: 'From design to commissioning, the team was professional and the system has been fault-free.', href: '/projects', title: 'PROJECT 2' },
    { image: '/intruder%20alarm%20systems.jpg', stat: '24/7', description: 'Intruder alarm and 24/7 monitoring solution', quote: 'We rely on APX for ongoing maintenance and emergency call-outs. Always responsive.', href: '/projects', title: 'PROJECT 3' },
    { image: '/access%20control%20systems.jpg', stat: 'NSI Gold', description: 'Multi-site access control and security integration', quote: 'Having NSI Gold accreditation gave us confidence. The installation exceeded expectations.', href: '/projects', title: 'PROJECT 4' },
    { image: '/home-fire-alarm-system-installer-800x533.jpg', stat: '500+', description: 'Fire risk assessment and compliance project', quote: 'Thorough and clear reporting. We use APX for all our fire safety compliance.', href: '/projects', title: 'PROJECT 5' },
    { image: '/video%20door%20entry%20systems.jpg', stat: '15', description: 'Video door entry and access system upgrade', quote: 'Their continued investment in quality and training shows in every project.', href: '/projects', title: 'PROJECT 6' },
    { image: '/cctv%20systems.jpg', stat: '98%', description: 'Full system commissioning and handover', quote: 'Commissioning was smooth and documentation was spot-on. No call-backs.', href: '/projects', title: 'PROJECT 7' },
  ], [])

  const scrollProjects = useCallback((dir: 'left' | 'right') => {
    const el = projectsScrollRef.current
    if (!el || !el.firstElementChild) return
    const cardWidth = (el.firstElementChild as HTMLElement).offsetWidth
    const gap = 24
    const step = cardWidth + gap
    el.scrollBy({ left: dir === 'left' ? -step : step, behavior: 'smooth' })
  }, [])

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Office Manager, TechCorp",
      text: "APX Fire & Security provided an exceptional CCTV and access control system for our office. NSI Gold standard, professional and reliable.",
      rating: 5
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
      rating: 5
    }
  ]

  // Hero animation sequence
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setHeroAnimation(prev => ({ ...prev, videoVisible: true }))
    }, 100)

    const timer2 = setTimeout(() => {
      setHeroAnimation(prev => ({ ...prev, titleVisible: true }))
    }, 2000)

    const timer3 = setTimeout(() => {
      setHeroAnimation(prev => ({ ...prev, subtitleVisible: true }))
    }, 2500)

    const timer4 = setTimeout(() => {
      setHeroAnimation(prev => ({ ...prev, statsVisible: true }))
    }, 3000)

    const timer5 = setTimeout(() => {
      setHeroAnimation(prev => ({ ...prev, clientsVisible: true }))
    }, 5000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
      clearTimeout(timer5)
    }
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

  // Testimonial carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  // Scroll-driven: about section fade-in; services: trigger path animation when section in view
  useEffect(() => {
    const thresholds = Array.from({ length: 101 }, (_, i) => i / 100)
    let observer: IntersectionObserver | null = null

    const setup = (): boolean => {
      const aboutEl = document.getElementById('about-intro')
      const servicesEl = document.getElementById('services')
      if (!aboutEl) return false
      observer?.disconnect()
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const ratio = Math.max(0, Math.min(1, entry.intersectionRatio))
            if (entry.target.id === 'about-intro') {
              setAboutScrollProgress(ratio)
              setAboutContentFade(Math.max(0, (ratio - 0.05) / 0.95))
            } else if (entry.target.id === 'services' && ratio > 0.15) {
              setServicesInView(true)
            }
          }
        },
        { root: null, rootMargin: '0px', threshold: thresholds }
      )
      observer.observe(aboutEl)
      if (servicesEl) observer.observe(servicesEl)
      return true
    }

    if (!setup()) {
      const t = setTimeout(() => setup(), 200)
      return () => {
        clearTimeout(t)
        observer?.disconnect()
      }
    }
    return () => observer?.disconnect()
  }, [])

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
        form.style.border = '2px solid #ffffff';
        
        // Title
        const title = form.querySelector('h3');
        if (title) {
          title.style.color = '#ffffff';
        }
        
        // Labels
        const labels = form.querySelectorAll('label');
        labels.forEach((label: any) => {
          label.style.color = '#ffffff';
        });
        
        // Text inputs and textarea
        const textInputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea');
        textInputs.forEach((input: any) => {
          input.style.backgroundColor = '#000000';
          input.style.border = '2px solid #ffffff';
          input.style.color = '#ffffff';
          input.style.outline = 'none';
          input.style.boxShadow = 'none';
          input.style.setProperty('--tw-ring-color', 'transparent', 'important');
        });
        
        // Select dropdown - custom styling
        const select = form.querySelector('select');
        if (select) {
          select.style.backgroundColor = '#000000';
          select.style.border = '2px solid #ffffff';
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
        
        // Radio buttons - custom styling
        const radios = form.querySelectorAll('input[type="radio"]');
        radios.forEach((radio: any) => {
          radio.style.appearance = 'none';
          radio.style.width = '20px';
          radio.style.height = '20px';
          radio.style.border = '2px solid #ffffff';
          radio.style.borderRadius = '50%';
          radio.style.backgroundColor = '#000000';
          radio.style.outline = 'none';
          radio.style.boxShadow = 'none';
          radio.style.cursor = 'pointer';
          
          // Checked state
          radio.addEventListener('change', () => {
            radios.forEach((r: any) => {
              r.style.backgroundColor = '#000000';
            });
            if (radio.checked) {
              radio.style.backgroundColor = '#ffffff';
            }
          });
        });
        
        // Submit button
        const button = form.querySelector('button');
        if (button) {
          button.style.backgroundColor = '#000000';
          button.style.border = '2px solid #ffffff';
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
        labels.forEach((label: any) => {
          label.style.color = '#000000';
        });
        
        // Text inputs and textarea
        const textInputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea');
        textInputs.forEach((input: any) => {
          input.style.backgroundColor = '#ffffff';
          input.style.border = '1px solid #000000';
          input.style.color = '#000000';
          input.style.outline = 'none';
          input.style.boxShadow = 'none';
        });
        
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
        
        // Radio buttons - reset to default browser styling
        const radios = form.querySelectorAll('input[type="radio"]');
        radios.forEach((radio: any) => {
          radio.style.appearance = 'auto'; // Reset to browser default
          radio.style.width = 'initial';
          radio.style.height = 'initial';
          radio.style.border = 'initial';
          radio.style.borderRadius = 'initial';
          radio.style.backgroundColor = 'initial';
          radio.style.outline = 'initial';
          radio.style.boxShadow = 'initial';
          radio.style.cursor = 'initial';
        });
        
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
        form.style.border = '2px solid #ffffff';
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
  }, [activeMepIndex, mepCards.length])

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

  const scrollToSection = (sectionId: string) => {
    // Update the active section immediately
    updateActiveSection(sectionId)
    
    const element = document.getElementById(sectionId)
    if (!element) return

    // Hero: scroll to top of page so hero is in view
    if (sectionId === 'hero') {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }

    // Other sections: center in view
    element.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <>
      <GlobalStyles theme={themeMode} />
      <div className="min-h-screen overflow-x-hidden relative z-10">
      
      {/* Hero Section – transparent so video layer shows; video fades to white on scroll */}
      <section id="hero" className="relative h-screen overflow-visible bg-transparent flex flex-col" style={{ background: 'transparent' }}>
        {/* Content */}
        <div className="container mx-auto px-6 flex-1 flex flex-col justify-start pt-44 pb-40 relative z-20">
          <div className="space-y-4">
            {/* Title + paragraph: white text on hero image */}
            <div className="max-w-2xl">
              <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-3 text-left transition-opacity duration-1000 font-title text-white ${
                heroAnimation.titleVisible ? 'opacity-100' : 'opacity-0'
              }`}>
                APX FS is your NSI Gold security system installer.
              </h1>
              <p className={`text-base sm:text-lg md:text-xl font-normal mb-4 md:mb-5 text-left tracking-tight transition-opacity duration-1000 max-w-lg text-white ${
                heroAnimation.subtitleVisible ? 'opacity-100' : 'opacity-0'
              }`}>
                We are specialists in the design, installation and maintenance of bespoke integrated security systems within London and the Home Counties.
              </p>

              {/* Hero CTAs – side by side */}
              <div className={`flex flex-wrap items-center gap-4 sm:gap-6 pt-2 transition-opacity duration-1000 ${
                heroAnimation.subtitleVisible ? 'opacity-100' : 'opacity-0'
              }`}>
                <CustomPillButton href="/contact" size="md">
                  Get a free quote
                </CustomPillButton>
                <Link
                  href="/contact"
                  className="text-white font-normal text-base underline underline-offset-4 hover:text-white/90 transition-colors"
                >
                  Question? get in touch
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Hero accreditations – NSI, BAFE, Constructionline, FIA (public/accreditations mono/White) */}
        <div className="container mx-auto px-6 pb-8 mb-24 sm:mb-32 relative z-10 -mt-16 sm:-mt-20">
          <div className="w-1/2 mx-auto h-px bg-white/25 mb-6" aria-hidden />
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 max-w-6xl mx-auto">
            {[
              { src: '/accreditations%20mono/White/NSI-02.svg', alt: 'NSI Gold' },
              { src: '/accreditations%20mono/White/BAFE-02.svg', alt: 'BAFE' },
              { src: '/accreditations%20mono/White/ConstructionOnline-02.svg', alt: 'Constructionline' },
              { src: '/accreditations%20mono/White/FIA-02.svg', alt: 'FIA' }
            ].map((acc) => (
              <div key={acc.alt} className="flex items-center justify-center h-14 sm:h-16 w-auto max-w-[150px] sm:max-w-[180px]" aria-hidden>
                <img src={acc.src} alt={acc.alt} className="h-full w-auto object-contain opacity-90" />
              </div>
            ))}
          </div>
        </div>
        
      </section>

      {/* Wrapper so CCTV overlay can sit above both about and services */}
      <div className="relative">
        {/* ABOUT – floorplan.jpg as full background; scroll-driven character reveal + content fade */}
        <section ref={aboutIntroRef} id="about-intro" className="relative py-24 lg:py-32 overflow-hidden">
          {/* Background image – no fade */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/floorplan.jpg')" }}
            aria-hidden
          />
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1" aria-hidden />
            <div className="lg:col-span-7 order-1 lg:order-2 max-w-2xl">
              <span className="section-label section-label--black" style={{ opacity: aboutScrollProgress, color: '#000000' }}>OUR STORY</span>
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black tracking-tight leading-tight mb-6 font-title transition-opacity duration-500"
                style={{ fontFamily: 'var(--font-title, inherit)', opacity: aboutScrollProgress }}
              >
                Where it began.
              </h2>
              <p
                className="text-lg sm:text-xl text-black/90 leading-relaxed mb-8 transition-opacity duration-700"
                style={{ opacity: aboutContentFade }}
              >
                Since 1986 APX Fire & Security have specialised in the design, installation and maintenance of high quality security systems to London and the Home Counties. The quality of our work and our excellent after-sales service has allowed us to build the business on recommendations alone. We have achieved NSI Gold accreditation and are fully accredited to BAFE and FIA for our customers&apos; peace of mind.
              </p>
              <div className="transition-opacity duration-700" style={{ opacity: aboutContentFade }}>
                <CustomPillButton href="/about" size="md">
                  Our story
                </CustomPillButton>
              </div>
            </div>
          </div>
        </div>
        </section>

        {/* Services Section – cards animate in one at a time (path animation), top row first */}
        <section id="services" className="section-spacing relative overflow-visible bg-white" style={{ backgroundColor: '#ffffff' }}>
        <div className="container mx-auto px-6 lg:px-8">
          <div className="section-content-gap space-y-16 text-black">
            <div>
              <span className="section-label section-label--black">APX FS SERVICES</span>
              <h2 className="text-5xl font-bold text-left tracking-wide section-title-gap services-section-title leading-tight font-title" style={{ color: '#000000' }}>What we offer</h2>
              <p className="text-base leading-relaxed max-w-xl section-intro-gap hero-services-intro" style={{ color: '#000000' }}>
                APX FS is your NSI Gold security system installer. We specialise in the design, installation and maintenance of bespoke integrated security systems within London and the Home Counties.
              </p>
            </div>
            
            <div className={`services-cards-animate grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6 ${servicesInView ? 'services-cards-visible' : ''}`}>
              {/* 1. CCTV – from left */}
              <div className="service-card-unified service-card-in from-left lg:col-span-4 lg:row-start-1">
                <div className="service-card-unified-bg" aria-hidden style={{ backgroundImage: "url('/cctv%20systems.jpg')" }} />
                <div className="service-card-unified-body">
                  <h4 className="service-card-unified-title font-title">CCTV Systems</h4>
                  <ul className="service-card-unified-list">
                    <li>We offer the latest in CCTV technology, specialising in the design and installation of high performance CCTV systems that meet your requirements. Choosing the right CCTV system and having it professionally installed will provide you with superior results and will save you time and money in the long run.</li>
                  </ul>
                </div>
                <span className="service-card-unified-arrow" aria-hidden />
              </div>

              {/* 2. Access Control – from right */}
              <div className="service-card-unified service-card-in from-right lg:col-span-2 lg:col-start-5 lg:row-start-1">
                <div className="service-card-unified-bg" aria-hidden style={{ backgroundImage: "url('/access%20control%20systems.jpg')" }} />
                <div className="service-card-unified-body">
                  <h4 className="service-card-unified-title font-title">Access Control Systems</h4>
                  <ul className="service-card-unified-list">
                    <li>We are one of the leading installers of electronic access control systems in the UK. Our installations are uniquely designed for each client, whatever the size. From simple stand-alone systems to fully networked installations with features such as automatic time and attendance reports linked to payroll.</li>
                  </ul>
                </div>
                <span className="service-card-unified-arrow" aria-hidden />
              </div>

              {/* 3. Intruder – from left */}
              <div className="service-card-unified service-card-in from-left lg:col-span-2 lg:col-start-1 lg:row-start-2">
                <div className="service-card-unified-bg" aria-hidden style={{ backgroundImage: "url('/intruder%20alarm%20systems.jpg')" }} />
                <div className="service-card-unified-body">
                  <h4 className="service-card-unified-title font-title">Intruder Alarm Systems</h4>
                  <ul className="service-card-unified-list">
                    <li>Our tailor-made intruder alarms systems are expertly designed in accordance with NSI Gold Standards and are fully BS and EN compliant. From a basic system protecting a one bedroom apartment, through to fully monitored emergency response systems covering multi-occupancy offices, we have you covered.</li>
                  </ul>
                </div>
                <span className="service-card-unified-arrow" aria-hidden />
              </div>

              {/* 4. Fire – from left */}
              <div className="service-card-unified service-card-in from-left lg:col-span-2 lg:col-start-3 lg:row-start-2">
                <div className="service-card-unified-bg" aria-hidden style={{ backgroundImage: "url('/home-fire-alarm-system-installer-800x533.jpg')" }} />
                <div className="service-card-unified-body">
                  <h4 className="service-card-unified-title font-title">Fire Alarm Systems</h4>
                  <ul className="service-card-unified-list">
                    <li>We offer a wide range of conventional and addressable fire alarm systems. Our vast experience in the fire detection industry spans the public and industrial sector, with installations ranging from small domestic systems through to large commercial premises such as schools, offices, warehouses and banks.</li>
                  </ul>
                </div>
                <span className="service-card-unified-arrow" aria-hidden />
              </div>

              {/* 5. Video Door Entry – from bottom */}
              <div className="service-card-unified service-card-in from-bottom lg:col-span-2 lg:col-start-5 lg:row-start-2">
                <div className="service-card-unified-bg" aria-hidden style={{ backgroundImage: "url('/video%20door%20entry%20systems.jpg')" }} />
                <div className="service-card-unified-body">
                  <h4 className="service-card-unified-title font-title">Video Door Entry Systems</h4>
                  <ul className="service-card-unified-list">
                    <li>Our custom-designed video entry systems provide secure access to buildings and premises. We offer a wide range of products to suit any size of application, from simple one-way video door access for the rightful occupants though to multi-caller digital systems restricted to individually authorised personnel.</li>
                  </ul>
                </div>
                <span className="service-card-unified-arrow" aria-hidden />
              </div>
            </div>
          </div>
        </div>
        </section>
      </div>

      {/* Benefits strip: “What is” */}
      {/* Benefits strip: Expert Installation, 24/7 Maintenance, Quality Assurance */}
      <section id="services-benefits" className="section-spacing relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            <div className="services-benefit-card" style={{ animationDelay: '0.1s' }}>
              <div className="services-benefit-card-inner">
                <div className="services-benefit-icon-wrap">
                  <CheckCircle className="h-7 w-7 text-white" strokeWidth={2} />
                </div>
                <h3 className="services-benefit-title" style={{ fontFamily: 'var(--font-menu)' }}>Expert Installation</h3>
                <p className="services-benefit-desc">Professional installation of all MEP systems with precision and care</p>
              </div>
            </div>
            <div className="services-benefit-card" style={{ animationDelay: '0.25s' }}>
              <div className="services-benefit-card-inner">
                <div className="services-benefit-icon-wrap">
                  <CheckCircle className="h-7 w-7 text-white" strokeWidth={2} />
                </div>
                <h3 className="services-benefit-title" style={{ fontFamily: 'var(--font-menu)' }}>24/7 Maintenance</h3>
                <p className="services-benefit-desc">Round-the-clock maintenance and emergency repair services</p>
              </div>
            </div>
            <div className="services-benefit-card" style={{ animationDelay: '0.4s' }}>
              <div className="services-benefit-card-inner">
                <div className="services-benefit-icon-wrap">
                  <CheckCircle className="h-7 w-7 text-white" strokeWidth={2} />
                </div>
                <h3 className="services-benefit-title" style={{ fontFamily: 'var(--font-menu)' }}>Quality Assurance</h3>
                <p className="services-benefit-desc">All work backed by comprehensive warranties and quality guarantees</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo marquee – client PNGs from public/Clients, repeated for seamless scroll */}
      <section id="logo-marquee" className="logo-marquee-section py-12 overflow-hidden" aria-label="Trusted by leading brands">
        <div className="logo-marquee-wrapper">
          <div className="logo-marquee">
            <div className="logo-marquee__group">
              {clientLogoPaths.map((src, i) => (
                <img key={`a-${i}`} src={src} alt="" className="logo-marquee__img" aria-hidden />
              ))}
            </div>
            <div className="logo-marquee__group" aria-hidden="true">
              {clientLogoPaths.map((src, i) => (
                <img key={`b-${i}`} src={src} alt="" className="logo-marquee__img" />
              ))}
            </div>
          </div>
          <div className="logo-marquee logo-marquee--reverse">
            <div className="logo-marquee__group">
              {[...clientLogoPaths].reverse().map((src, i) => (
                <img key={`c-${i}`} src={src} alt="" className="logo-marquee__img" aria-hidden />
              ))}
            </div>
            <div className="logo-marquee__group" aria-hidden="true">
              {[...clientLogoPaths].reverse().map((src, i) => (
                <img key={`d-${i}`} src={src} alt="" className="logo-marquee__img" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects – scroll view with glass blur cards; strip bleeds full viewport, offset start */}
      <section id="projects" className="bg-black py-20 lg:py-28 overflow-x-hidden">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-14 lg:mb-20">
            <div>
              <span className="section-label text-white/80">Projects</span>
              <h2 className="text-4xl lg:text-5xl font-bold text-white font-title leading-tight">
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
        <div className="w-screen relative left-1/2 -translate-x-1/2">
          <div
            ref={projectsScrollRef}
            className="flex gap-6 overflow-x-auto overflow-y-hidden pb-4 pl-6 lg:pl-8 pr-6 lg:pr-8 scroll-smooth scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
          {projects.map((p, i) => (
            <Link
              key={i}
              href={p.href}
              className="projects-card group flex-shrink-0 flex flex-col rounded-xl overflow-hidden bg-black"
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
                  <p className="text-4xl font-bold text-white mb-1 relative z-10">{p.title}</p>
                  <p className="text-white/90 text-sm mb-3 relative z-10">{p.description}</p>
                  <p className="text-white/80 text-sm italic mb-4 line-clamp-2 relative z-10">&ldquo;{p.quote}&rdquo;</p>
                  <span className="projects-card-arrow absolute bottom-5 right-6 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/20 text-white transition-transform duration-200 group-hover:rotate-12" aria-hidden>
                    <ChevronRight className="w-5 h-5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
          </div>
        </div>
      </section>

      {/* News and Articles */}
      <section id="why-mep" className="news-section">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="news-section__grid">
            <div className="news-section__left">
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

            <div className="news-section__right">
              <div
                className="news-section__image"
                style={{ backgroundImage: `url('${newsArticles[activeNewsIndex]?.image || newsArticles[0].image}')` }}
                aria-hidden
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us – canted top and bottom */}
      <section id="about" className="section-spacing section-canted-top section-canted-bottom">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="section-content-gap space-y-16">
            {/* Top Section - Title and Description */}
            <div>
              <span className="section-label section-label--black">Why Choose Us</span>
              <h2 className="text-5xl font-bold text-left font-title section-title-gap leading-tight">Trust, quality, peace of mind.</h2>
              <p className="text-base text-gray-300 leading-relaxed max-w-xl section-intro-gap">
                We have been providing bespoke integrated security systems to London and the Home Counties since 1986. Our extensive knowledge and decades of real world experience allow us to deliver high quality security systems to the domestic and commercial sector.
              </p>
            </div>
            
            {/* Benefits Cards - 3 Column Grid: black bg, white border, top-left + bottom-right rounded, white text */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {/* NSI Gold Accredited */}
              <div className="why-choose-card bg-black border-2 border-white rounded-tl-[1.75rem] rounded-br-[1.75rem] text-white p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <CheckCircle className="h-7 w-7 flex-shrink-0 text-white" />
                  <h4 className="text-2xl font-semibold text-white font-title">NSI Gold Accredited</h4>
                </div>
                <ul className="why-choose-list">
                  <li>BS EN ISO 9001:2015</li>
                  <li>BAFE Fire Safety Registered</li>
                  <li>UKAS Quality Management</li>
                  <li>FIA Member</li>
                </ul>
              </div>

              {/* 24/7 Emergency Service */}
              <div className="why-choose-card bg-black border-2 border-white rounded-tl-[1.75rem] rounded-br-[1.75rem] text-white p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <Clock className="h-7 w-7 flex-shrink-0 text-white" />
                  <h4 className="text-2xl font-semibold text-white font-title">24/7 Emergency Service</h4>
                </div>
                <ul className="why-choose-list">
                  <li>Round-the-clock security support</li>
                  <li>Rapid response times</li>
                  <li>Monitored alarm response</li>
                  <li>When you need it most</li>
                </ul>
              </div>

              {/* Quality Guarantee */}
              <div className="why-choose-card bg-black border-2 border-white rounded-tl-[1.75rem] rounded-br-[1.75rem] text-white p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <Shield className="h-7 w-7 flex-shrink-0 text-white" />
                  <h4 className="text-2xl font-semibold text-white font-title">Quality Guarantee</h4>
                </div>
                <ul className="why-choose-list">
                  <li>Constructionline Gold Member</li>
                  <li>All work to NSI Gold standards</li>
                  <li>Quality assurance</li>
                  <li>Reliable service</li>
                </ul>
              </div>
            </div>
            
            {/* Stats Section – black text forced via data attribute + inline style */}
            <div className="mt-16 sm:mt-20 flex flex-col sm:flex-row items-center justify-center gap-4 stats-section" data-stats-section>
              <div className="stats-card rounded-xl px-8 py-6 text-center animate-stats-in" style={{ animationDelay: '0ms' }}>
                <div className="stats-card-number text-4xl font-bold leading-none" data-stats-text style={{ color: '#000000' }}>
                  <CountUp target={500} suffix="+" duration={2000} />
                </div>
                <div className="stats-card-label text-sm mt-2" data-stats-text style={{ color: '#000000' }}>Projects Completed</div>
              </div>
              <div className="stats-card rounded-xl px-8 py-6 text-center animate-stats-in" style={{ animationDelay: '150ms' }}>
                <div className="stats-card-number text-4xl font-bold leading-none" data-stats-text style={{ color: '#000000' }}>
                  <CountUp target={99} suffix="%" duration={2000} />
                </div>
                <div className="stats-card-label text-sm mt-2" data-stats-text style={{ color: '#000000' }}>Customer Satisfaction</div>
              </div>
              <div className="stats-card rounded-xl px-8 py-6 text-center animate-stats-in" style={{ animationDelay: '300ms' }}>
                <div className="stats-card-number text-4xl font-bold leading-none" data-stats-text style={{ color: '#000000' }}>
                  <CountUp target={20} suffix="+" duration={2000} />
                </div>
                <div className="stats-card-label text-sm mt-2" data-stats-text style={{ color: '#000000' }}>Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accreditations Section – black bg, white text, two columns */}
      <section id="accreditations" className="section-spacing section-canted-top accreditations-section bg-black">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="accreditations-card service-card overflow-hidden py-10 lg:py-14 px-8 lg:px-12">
            <span className="glow"></span>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 relative z-10">
              {/* Left – qualifications list */}
              <div>
                <span className="section-label text-white/80 mb-4 block">Accreditations</span>
                <h2 className="accreditations-heading text-2xl lg:text-3xl font-bold font-title mb-8 text-white">
                  Qualifications that speak for themselves
                </h2>
                <ul className="space-y-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <li key={i} className="flex items-center gap-3 accreditations-text text-white">
                      <CheckCircle className="h-5 w-5 shrink-0 text-white" aria-hidden />
                      <span>Accreditation placeholder {i}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Right – copy and CTA (white text on black) */}
              <div>
                <h3 className="accreditations-heading text-2xl lg:text-3xl font-bold font-title mb-4 text-white">
                  Trusted & Fully Qualified
                </h3>
                <p className="accreditations-text text-white/90 mb-4">
                  Paragraph placeholder. Replace with short intro about quality and safety affiliations.
                </p>
                <p className="accreditations-text text-white/90 mb-6">
                  Second paragraph placeholder. Replace with detail on certifications and standards.
                </p>
                <CustomPillButton href="#" size="md">
                  View all our accreditations
                </CustomPillButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section – white bg; black box bleeds into sections above/below */}
      <section id="testimonials" className="section-spacing bg-white overflow-visible">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="testimonials-lifted relative z-10 -mt-16 -mb-16 bg-black border-2 border-white rounded-tl-[2.25rem] rounded-br-[2.25rem] shadow-[0_20px_50px_rgba(0,0,0,0.4)] py-12 sm:py-14 lg:py-16 px-8 sm:px-10 lg:px-12">
            <div className="section-content-gap space-y-16">
              {/* Top Section - Title and Description */}
              <div className="text-left">
                <span className="section-label text-white/80">Testimonials</span>
                <h2 className="text-5xl font-bold font-title section-title-gap leading-tight text-white">What our clients say</h2>
                <p className="text-base text-gray-300 leading-relaxed max-w-xl section-intro-gap">
                  Don&apos;t just take our word for it - hear from our satisfied clients about their experience with APX MEP.
                </p>
              </div>
              
              {/* Testimonial Carousel - Single View */}
              <div className="max-w-4xl mx-auto">
                <div className="service-card text-white relative overflow-hidden">
                  <span className="glow"></span>
                  
                  <div className="flex items-center space-x-2 mb-4 relative z-10">
                  {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-white fill-current" />
                  ))}
                </div>
                  
                  <div className="space-y-3 relative z-10">
                    <p className="text-gray-300 text-lg leading-relaxed">
                      &ldquo;{testimonials[currentTestimonial].text}&rdquo;
                    </p>
                    <div className="pt-2">
                      <div className="font-semibold text-white text-lg">{testimonials[currentTestimonial].name}</div>
                      <div className="text-gray-400">{testimonials[currentTestimonial].role}</div>
                    </div>
                  </div>
            
                  {/* Navigation dots */}
                  <div className="flex justify-center space-x-2 mt-6 relative z-10">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTestimonial(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentTestimonial ? 'bg-white' : 'bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
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
            <div className="space-y-8 pt-16 lg:pt-24">
              <span className="section-label text-white/80">Contact</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-title leading-tight text-left text-white">
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
            
            {/* Right side - Contact Form (glassmorphic) */}
            <div 
              id="quote-form" 
              className="p-8 shadow-2xl"
            >
              <h3 className="text-2xl font-bold mb-6 font-title">Get Your Free Quote</h3>
              
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-lg"
                      placeholder="Enter your first name"
                    />
                </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-lg"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-lg"
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-3 rounded-lg"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
                
                <div className="relative services-dropdown-container">
                  <label className="block text-sm font-medium mb-2">
                    Service Required *
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      className="quote-form-field quote-form-dropdown w-full px-4 py-3 rounded-lg text-left flex justify-between items-center cursor-pointer"
                      onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                    >
                      <span>{selectedService || 'Select a service'}</span>
                      <svg 
                        style={{
                          width: '20px',
                          height: '20px',
                          transition: 'transform 0.3s ease',
                          transform: isServicesDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                        }}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {isServicesDropdownOpen && (
                      <div 
                        className="quote-form-dropdown-menu absolute left-0 right-0 top-full mt-1 z-50 py-2"
                        style={{ boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)' }}
                      >
                        {[
                          { value: 'cctv', label: 'CCTV Systems' },
                          { value: 'access-control', label: 'Access Control Systems' },
                          { value: 'intruder-alarms', label: 'Intruder Alarm Systems' },
                          { value: 'fire-alarms', label: 'Fire Alarm Systems' },
                          { value: 'video-door-entry', label: 'Video Door Entry Systems' },
                          { value: 'other', label: 'Other' }
                        ].map((service, index) => (
                          <button
                            key={service.value}
                            type="button"
                            className="quote-form-dropdown-item block w-full py-2 px-4 text-left text-sm transition-colors"
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
                  <label className="block text-sm font-medium mb-2">
                    Project Description *
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg"
                    placeholder="Please describe your project requirements..."
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Preferred Contact Method
                  </label>
                  <div className="flex space-x-6">
                    <label className="flex items-center">
                      <input type="radio" name="contact-method" value="phone" className="mr-2" />
                      Phone Call
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="contact-method" value="email" className="mr-2" />
                      Email
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="contact-method" value="text" className="mr-2" />
                      Text Message
                    </label>
                  </div>
                </div>
                
                <FormSubmitButton onSubmit={async () => {
                  /* Wire your real submit here (e.g. fetch or form action) */
                }}>
                  Submit Quote Request
                </FormSubmitButton>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
    </>
  );
}
