"use client"

import Link from "next/link"
import { Shield, CheckCircle, Star, ArrowRight, Clock, Cog, Zap, Wind, Leaf, Wrench, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState, useMemo, useCallback, useRef } from "react"
import { GlobalStyles, lightTheme, darkTheme } from '@/components/ThemeToggle'
import { useTheme } from '@/contexts/ThemeContext'
import { CountUp } from '@/components/ui/CountUp'

export default function Home() {
  const { theme } = useTheme()
  const themeMode = theme === "light" ? lightTheme : darkTheme
  
  const [activeSection, setActiveSection] = useState(0)
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false)
  const [selectedService, setSelectedService] = useState('')
  
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [activeMepIndex, setActiveMepIndex] = useState(0)
  const [hoveredDrawerService, setHoveredDrawerService] = useState<number | null>(0)
  const mepListRef = useRef<HTMLUListElement>(null)
  const projectsScrollRef = useRef<HTMLDivElement>(null)

  /* Drawer section: same content as unified service cards, for list + drawer layout – copy from apx-fs.co.uk */
  const drawerServices = useMemo(() => [
    { title: 'CCTV Systems', image: '/service%20images/ELECTRICAL.jpg', bullets: ['High performance CCTV systems to meet your requirements', 'Domestic and commercial installations', 'Professional design and installation', 'Superior results that save time and money', 'Latest CCTV technology'] },
    { title: 'Access Control Systems', image: '/service%20images/PLUMBING.jpg', bullets: ['Electronic access control designed for each client', 'Stand-alone to fully networked installations', 'Time and attendance reports linked to payroll', 'Leading installer in the UK', 'Whatever the size of your premises'] },
    { title: 'Intruder Alarm Systems', image: '/service%20images/HVAC.jpg', bullets: ['Tailor-made systems to NSI Gold Standards', 'Fully BS and EN compliant', 'From one-bedroom apartments to multi-occupancy offices', 'Fully monitored emergency response systems', 'Expertly designed for peace of mind'] },
    { title: 'Fire Alarm Systems', image: '/service%20images/MAINTAINENCE%20AND%20SUPPORT.jpg', bullets: ['Conventional and addressable fire alarm systems', 'Public and industrial sector experience', 'Domestic through to large commercial premises', 'Schools, offices, warehouses and banks', 'Design, installation and maintenance'] },
  ], [])
  const [heroAnimation, setHeroAnimation] = useState({
    videoVisible: false,
    titleVisible: false,
    subtitleVisible: false,
    statsVisible: false,
    clientsVisible: false
  })
  const sections = useMemo(() => [
    { id: 'hero', name: 'Home' },
    { id: 'services', name: 'Services' },
    { id: 'about', name: 'About' },
    { id: 'testimonials', name: 'Testimonials' },
    { id: 'contact', name: 'Contact' }
  ], [])

  const mepCards = useMemo(() => [
    { id: 'cctv', title: 'CCTV Systems', description: 'We offer the latest in CCTV technology, specialising in the design and installation of high performance systems that meet your requirements.', href: '/services/electrical-systems', icon: Cog, image: '/service%20images/ELECTRICAL.jpg' },
    { id: 'access', title: 'Access Control', description: 'One of the leading installers of electronic access control in the UK. Uniquely designed for each client, from stand-alone to fully networked.', href: '/services/electrical-systems', icon: Zap, image: '/service%20images/PLUMBING.jpg' },
    { id: 'intruder', title: 'Intruder Alarms', description: 'Tailor-made intruder alarm systems designed in accordance with NSI Gold Standards, fully BS and EN compliant. Domestic to fully monitored commercial.', href: '/services/mechanical-engineering', icon: Wind, image: '/service%20images/HVAC.jpg' },
    { id: 'fire', title: 'Fire Alarm Systems', description: 'Conventional and addressable fire alarm systems. Experience across public and industrial sectors, from domestic to large commercial premises.', href: '/services/energy-efficiency', icon: Leaf, image: '/service%20images/MAINTAINENCE%20AND%20SUPPORT.jpg' },
    { id: 'video', title: 'Video Door Entry', description: 'Custom-designed video entry systems for secure access to buildings. From simple one-way video door access to multi-caller digital systems.', href: '/services/maintenance', icon: Wrench, image: '/service%20images/MAINTAINENCE%20AND%20SUPPORT.jpg' },
  ], [])

  const projects = useMemo(() => [
    { image: '/service%20images/ELECTRICAL.jpg', stat: '250+', description: 'Security systems installed across London & Home Counties', quote: 'APX delivered a complete CCTV and access control solution on time and to NSI Gold standard.', href: '/projects', title: 'Commercial CCTV & Access' },
    { image: '/service%20images/PLUMBING.jpg', stat: '99%', description: 'Client satisfaction on fire and security projects', quote: 'From design to commissioning, the team was professional and the system has been fault-free.', href: '/projects', title: 'Fire Alarm & Detection' },
    { image: '/service%20images/HVAC.jpg', stat: '24/7', description: 'Monitored alarm response and maintenance', quote: 'We rely on APX for ongoing maintenance and emergency call-outs. Always responsive.', href: '/projects', title: 'Intruder & Monitoring' },
    { image: '/service%20images/MAINTAINENCE%20AND%20SUPPORT.jpg', stat: 'NSI Gold', description: 'Accredited installations and compliance', quote: 'Having NSI Gold accreditation gave us confidence. The installation exceeded expectations.', href: '/projects', title: 'Multi-Site Integration' },
    { image: '/service%20images/ELECTRICAL.jpg', stat: '500+', description: 'Fire risk assessments completed', quote: 'Thorough and clear reporting. We use APX for all our fire safety compliance.', href: '/projects', title: 'Fire Risk Assessments' },
    { image: '/service%20images/PLUMBING.jpg', stat: '15', description: 'Years of NSI Gold certification', quote: 'Their continued investment in quality and training shows in every project.', href: '/projects', title: 'NSI Gold Certified' },
    { image: '/service%20images/HVAC.jpg', stat: '98%', description: 'First-time pass on commissioning', quote: 'Commissioning was smooth and documentation was spot-on. No call-backs.', href: '/projects', title: 'Commissioning & Handover' },
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
    
    // Find the section element
    const element = document.getElementById(sectionId)
    
    if (element) {
      // For hero section, scroll to top
      if (sectionId === 'hero') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
        return
      }
      
      // For other sections, use scrollIntoView
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      })
    }
  }

  return (
    <>
      <GlobalStyles theme={themeMode} />
      <div className="min-h-screen overflow-x-hidden relative z-10">
      
      {/* Hero Section – transparent so video layer shows; video fades to white on scroll */}
      <section id="hero" className="relative h-screen overflow-visible bg-transparent" style={{ background: 'transparent' }}>
        {/* Content */}
        <div className="container mx-auto px-6 h-full flex flex-col justify-start pt-68 relative z-20">
          <div className="space-y-4">
            {/* Title + paragraph: white text on hero image */}
            <div className="max-w-5xl">
              <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-2 md:mb-3 text-left transition-opacity duration-1000 font-title text-white ${
                heroAnimation.titleVisible ? 'opacity-100' : 'opacity-0'
              }`}>
                APX Fire & Security is your NSI Gold security system installer.
              </h1>
              <p className={`text-lg sm:text-xl md:text-2xl font-normal mb-4 md:mb-5 text-left tracking-tight transition-opacity duration-1000 max-w-2xl text-white ${
                heroAnimation.subtitleVisible ? 'opacity-100' : 'opacity-0'
              }`}>
                We are specialists in the design, installation and maintenance of bespoke integrated security systems within London and the Home Counties.
              </p>
            </div>

            {/* Stats Section - white text on semi-transparent pills */}
            <div className={`max-w-3xl flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4 sm:pt-5 transition-opacity duration-1000 ${
              heroAnimation.statsVisible ? 'opacity-100' : 'opacity-0'
            }`}>
                <div className="rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2 sm:py-3 backdrop-blur-sm">
                  <div className="text-base sm:text-lg font-normal mb-0.5 text-white">250+</div>
                  <div className="text-xs font-normal text-white/90">Industrial projects delivered across three continents.</div>
                </div>
                <div className="rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2 sm:py-3 backdrop-blur-sm">
                  <div className="text-base sm:text-lg font-normal mb-0.5 text-white">99.2%</div>
                  <div className="text-xs font-normal text-white/90">Uptime in monitored energy systems.</div>
                </div>
                <div className="rounded-lg border border-white/30 bg-white/10 px-3 sm:px-4 py-2 sm:py-3 backdrop-blur-sm">
                  <div className="text-base sm:text-lg font-normal mb-0.5 text-white">20+</div>
                  <div className="text-xs font-normal text-white/90">Years of engineering expertise in industrial efficiency.</div>
                </div>
              </div>
          </div>
        </div>
        
        {/* Custom Scroll Indicator */}
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40">
          <div className="flex flex-col items-center max-h-[200px] relative">
            {/* Progress line overlay */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-px bg-black/30 dark:bg-white/30" 
                 style={{ height: `${(sections.length - 1) * 60}px` }}>
              <div 
                className="w-px bg-black dark:bg-white transition-all duration-500 ease-out"
                style={{ 
                  height: `${(activeSection / (sections.length - 1)) * 100}%`,
                  boxShadow: theme === 'dark' ? '0 0 10px rgba(255, 255, 255, 0.5)' : '0 0 10px rgba(0, 0, 0, 0.5)'
                }}
              ></div>
      </div>

            {sections.map((section, index) => {
              const isActive = activeSection === index
              return (
                <div key={section.id} className="flex flex-col items-center relative z-10">
                  {/* Square indicator */}
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={`w-3 h-3 border transition-all duration-300 hover:scale-110 ${
                      theme === 'light'
                        ? 'border-white hover:bg-white/20'
                        : 'border-black dark:border-white hover:bg-black/20 dark:hover:bg-white/20'
                    } ${
                      isActive
                        ? theme === 'light'
                          ? 'bg-white'
                          : 'bg-black dark:bg-white'
                        : 'bg-transparent'
                    }`}
                    title={section.name}
                  />
                
                  {/* Faded vertical line connecting to next square */}
                  {index < sections.length - 1 && (
                    <div className="w-px h-12 bg-gray-400/30 dark:bg-gray-600/30"></div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
        
      </section>

      {/* ABOUT – full-section background image placeholder; image left, story right */}
      <section id="about-intro" className="relative py-20 lg:py-28 overflow-hidden">
        {/* Full-section background image placeholder – replace with background-image when ready */}
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center" aria-hidden>
          <span className="text-gray-400 text-sm uppercase tracking-wider">Background image placeholder</span>
        </div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Image placeholder – left */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="aspect-[4/3] rounded-xl bg-black/10 flex items-center justify-center text-black/40 text-sm uppercase tracking-wider" aria-hidden>
                Image placeholder
              </div>
            </div>
            {/* Text – right */}
            <div className="lg:col-span-7 order-1 lg:order-2 max-w-2xl">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black tracking-tight leading-tight mb-6 font-title" style={{ fontFamily: 'var(--font-title, inherit)' }}>
                Founded in 2005, APX merged two industry leaders.
              </h2>
              <p className="text-lg sm:text-xl text-black/90 leading-relaxed mb-8">
                In 2024, APX Fire & Security was formed when two industry-leading companies came together: Harrisons Mechanical and Electrical and Smiths Technical. The merger united decades of expertise in fire safety, security systems, and building services—delivering the same trusted, high-quality solutions under one name across London and the Home Counties.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-black text-white font-medium text-base hover:bg-black/90 transition-colors"
              >
                Our story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - white bg, black foreground; title wrapper black bg (globals.css forces #services white) */}
      <section id="services" className="section-spacing relative overflow-visible bg-white" style={{ backgroundColor: '#ffffff' }}>
        <div className="container mx-auto px-6 lg:px-8">
          <div className="section-content-gap space-y-16 text-black">
            {/* Top Section - Title and Description */}
            <div>
              <div className="apx-mep-services-title-box inline-block border-2 border-white rounded-tl-[1.75rem] rounded-br-[1.75rem] px-6 py-3 section-title-gap relative overflow-hidden bg-black">
                <h2 className="text-5xl font-bold text-left tracking-wide relative z-10 text-white" style={{ textTransform: 'uppercase', fontFamily: 'var(--font-menu)' }}>APX FS SERVICES</h2>
              </div>
              <p className="text-base leading-relaxed max-w-xl section-intro-gap hero-services-intro" style={{ color: '#000000' }}>
                APX Fire & Security is your NSI Gold security system installer. We specialise in the design, installation and maintenance of bespoke integrated security systems within London and the Home Counties.
              </p>
            </div>
            
            {/* Service Cards - 5 services: top row 3, second row 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* CCTV Systems */}
              <div className="service-card-unified">
                <div className="service-card-unified-bg" aria-hidden style={{ backgroundImage: "url('/service%20images/ELECTRICAL.jpg')" }} />
                <div className="service-card-unified-body">
                  <h4 className="service-card-unified-title font-title">CCTV Systems</h4>
                  <ul className="service-card-unified-list">
                    <li>We offer the latest in CCTV technology, specialising in the design and installation of high performance CCTV systems that meet your requirements. Choosing the right CCTV system and having it professionally installed will provide you with superior results and will save you time and money in the long run.</li>
                  </ul>
                </div>
                <span className="service-card-unified-arrow" aria-hidden />
              </div>

              {/* Access Control Systems */}
              <div className="service-card-unified">
                <div className="service-card-unified-bg" aria-hidden style={{ backgroundImage: "url('/service%20images/PLUMBING.jpg')" }} />
                <div className="service-card-unified-body">
                  <h4 className="service-card-unified-title font-title">Access Control Systems</h4>
                  <ul className="service-card-unified-list">
                    <li>We are one of the leading installers of electronic access control systems in the UK. Our installations are uniquely designed for each client, whatever the size. From simple stand-alone systems to fully networked installations with features such as automatic time and attendance reports linked to payroll.</li>
                  </ul>
                </div>
                <span className="service-card-unified-arrow" aria-hidden />
              </div>

              {/* Intruder Alarm Systems */}
              <div className="service-card-unified">
                <div className="service-card-unified-bg" aria-hidden style={{ backgroundImage: "url('/service%20images/HVAC.jpg')" }} />
                <div className="service-card-unified-body">
                  <h4 className="service-card-unified-title font-title">Intruder Alarm Systems</h4>
                  <ul className="service-card-unified-list">
                    <li>Our tailor-made intruder alarms systems are expertly designed in accordance with NSI Gold Standards and are fully BS and EN compliant. From a basic system protecting a one bedroom apartment, through to fully monitored emergency response systems covering multi-occupancy offices, we have you covered.</li>
                  </ul>
                </div>
                <span className="service-card-unified-arrow" aria-hidden />
              </div>

              {/* Fire Alarm Systems - second row */}
              <div className="service-card-unified lg:col-start-1 lg:row-start-2">
                <div className="service-card-unified-bg" aria-hidden style={{ backgroundImage: "url('/service%20images/MAINTAINENCE%20AND%20SUPPORT.jpg')" }} />
                <div className="service-card-unified-body">
                  <h4 className="service-card-unified-title font-title">Fire Alarm Systems</h4>
                  <ul className="service-card-unified-list">
                    <li>We offer a wide range of conventional and addressable fire alarm systems. Our vast experience in the fire detection industry spans the public and industrial sector, with installations ranging from small domestic systems through to large commercial premises such as schools, offices, warehouses and banks.</li>
                  </ul>
                </div>
                <span className="service-card-unified-arrow" aria-hidden />
              </div>

              {/* Video Door Entry Systems - second row */}
              <div className="service-card-unified lg:col-start-2 lg:row-start-2">
                <div className="service-card-unified-bg" aria-hidden style={{ backgroundImage: "url('/service%20images/MAINTAINENCE%20AND%20SUPPORT.jpg')" }} />
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

      {/* Services drawer section: Block 1 = full-width title; Block 2 = split left (list + white dividers) | right (image bleeds off) */}
      <section id="services-drawer" className="section-spacing relative overflow-visible">
        <div className="container mx-auto px-6 lg:px-8">
          {/* Block 1: Full-width title only, keep padding */}
          <div className="section-content-gap">
            <div className="apx-mep-services-title-box inline-block border-2 border-white rounded-tl-[1.75rem] rounded-br-[1.75rem] px-6 py-3 section-title-gap relative overflow-hidden">
              <h2 className="text-5xl font-bold text-left tracking-wide relative z-10" style={{ textTransform: 'uppercase', fontFamily: 'var(--font-menu)' }}>APX Fire & Security</h2>
            </div>
            <p className="text-base text-gray-300 leading-relaxed max-w-xl section-intro-gap">
              Bespoke high quality integrated security systems to London and the Home Counties since 1986. From small domestic systems through to large-scale commercial installations.
            </p>
          </div>

          {/* Block 2: Split — left = list (white line dividers), right = image same height */}
          <div className={`services-drawer-split grid grid-cols-1 lg:grid-cols-2 min-h-[380px] section-block-gap ${hoveredDrawerService !== null ? 'has-hovered' : ''}`}>
          <div className="services-drawer-left relative z-10 flex flex-col min-h-0">
            <div className="services-drawer-list">
                {drawerServices.map((s, i) => (
                  <button
                    key={s.title}
                    type="button"
                    className="services-drawer-list-item text-left"
                    style={{ fontFamily: 'var(--font-menu)' }}
                    data-active={hoveredDrawerService === i}
                    onMouseEnter={() => setHoveredDrawerService(i)}
                  >
                    {s.title}
                  </button>
                ))}
            </div>
          </div>

          <div className="services-drawer-right relative overflow-visible">
            <div className={`services-drawer-panel ${hoveredDrawerService !== null ? 'services-drawer-panel--open' : ''}`}>
              {hoveredDrawerService !== null && drawerServices[hoveredDrawerService] && (
                <div className="service-card-unified services-drawer-card h-full min-h-[380px] w-full">
                  <div className="service-card-unified-bg services-drawer-card-bg" aria-hidden style={{ backgroundImage: `url('${drawerServices[hoveredDrawerService].image}')` }} />
                  <div className="service-card-unified-body">
                    <ul className="service-card-unified-list services-drawer-bullets">
                      {drawerServices[hoveredDrawerService].bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
          </div>
        </div>
      </section>

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

      {/* Logo marquee – under services */}
      <section id="logo-marquee" className="logo-marquee-section py-12 overflow-hidden" aria-label="Trusted by leading brands">
        <div className="logo-marquee-wrapper">
          <div className="logo-marquee">
            <div className="logo-marquee__group">
              <svg aria-hidden focusable="false"><use href="#logo-marquee-mcdonalds" /></svg>
              <svg aria-hidden focusable="false"><use href="#logo-marquee-jordan" /></svg>
              <svg aria-hidden focusable="false"><use href="#logo-marquee-aws" /></svg>
              <svg aria-hidden focusable="false"><use href="#logo-marquee-spotify" /></svg>
              <svg aria-hidden focusable="false"><use href="#logo-marquee-burger-king" /></svg>
              <svg aria-hidden focusable="false"><use href="#logo-marquee-honda" /></svg>
              <svg aria-hidden focusable="false"><use href="#logo-marquee-notion" /></svg>
              <svg aria-hidden focusable="false"><use href="#logo-marquee-hulu" /></svg>
            </div>
            <div className="logo-marquee__group" aria-hidden="true">
              <svg><use href="#logo-marquee-mcdonalds" /></svg>
              <svg><use href="#logo-marquee-jordan" /></svg>
              <svg><use href="#logo-marquee-aws" /></svg>
              <svg><use href="#logo-marquee-spotify" /></svg>
              <svg><use href="#logo-marquee-burger-king" /></svg>
              <svg><use href="#logo-marquee-honda" /></svg>
              <svg><use href="#logo-marquee-notion" /></svg>
              <svg><use href="#logo-marquee-hulu" /></svg>
            </div>
          </div>
          <div className="logo-marquee logo-marquee--reverse">
            <div className="logo-marquee__group">
              <svg aria-hidden focusable="false"><use href="#logo-marquee-hulu" /></svg>
              <svg aria-hidden focusable="false"><use href="#logo-marquee-notion" /></svg>
              <svg aria-hidden focusable="false"><use href="#logo-marquee-honda" /></svg>
              <svg aria-hidden focusable="false"><use href="#logo-marquee-burger-king" /></svg>
              <svg aria-hidden focusable="false"><use href="#logo-marquee-spotify" /></svg>
              <svg aria-hidden focusable="false"><use href="#logo-marquee-aws" /></svg>
              <svg aria-hidden focusable="false"><use href="#logo-marquee-jordan" /></svg>
              <svg aria-hidden focusable="false"><use href="#logo-marquee-mcdonalds" /></svg>
            </div>
            <div className="logo-marquee__group" aria-hidden="true">
              <svg><use href="#logo-marquee-hulu" /></svg>
              <svg><use href="#logo-marquee-notion" /></svg>
              <svg><use href="#logo-marquee-honda" /></svg>
              <svg><use href="#logo-marquee-burger-king" /></svg>
              <svg><use href="#logo-marquee-spotify" /></svg>
              <svg><use href="#logo-marquee-aws" /></svg>
              <svg><use href="#logo-marquee-jordan" /></svg>
              <svg><use href="#logo-marquee-mcdonalds" /></svg>
            </div>
          </div>
        </div>
        {/* Hidden SVG symbols for marquee logos */}
        <svg className="sr-only" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <symbol id="logo-marquee-mcdonalds" viewBox="0 0 24 24"><path d="M17.243 3.006c2.066 0 3.742 8.714 3.742 19.478H24c0-11.588-3.042-20.968-6.766-20.968-2.127 0-4.007 2.81-5.248 7.227-1.241-4.416-3.121-7.227-5.231-7.227C3.031 1.516 0 10.888 0 22.476h3.014c0-10.763 1.658-19.47 3.724-19.47 2.066 0 3.741 8.05 3.741 17.98h2.997c0-9.93 1.684-17.98 3.75-17.98Z" /></symbol>
            <symbol id="logo-marquee-jordan" viewBox="0 0 24 24"><path d="M13.55 2.194v-.075c0-.35.113-.663.338-.938.225-.275.512-.412.862-.412s.663.112.938.337.425.525.45.9c.025.375-.088.688-.338.938s-.55.375-.9.375l-.225.075.075.112-.075.413-.15 1.2c.05.05.075.1.075.15l-.15.75c-.05.1-.1.175-.15.225l-.075.3a22.59 22.59 0 01-.45 1.575v.15c-.05.25-.087.45-.112.6-.025.15-.113.4-.263.75-.1.2-.1.525 0 .975l.075.075c0 .15.063.325.188.525s.187.375.187.525c.05 1-.025 1.85-.225 2.55l.15.45c.6.3.775.625.525.975l.375.15c.6.3 1.025.562 1.275.787.25.225.5.463.75.713.2.05.35.125.45.225l.225.075c1.05.7 2.1 1.55 3.15 2.55l.3.225v.075l-.075.15.225.15h.075c.15.1.25.15.3.15h.075c.05 0 .1-.025.15-.075l.15-.075c.1-.1.2-.175.3-.225h.3c.05 0 .05.025 0 .075l-.3.15-.375.45h.525l.525.075c.15-.05.275-.1.375-.15l.375-.225c.15-.05.3 0 .45.15h.075c.05.05.025.125-.075.225l-.9.825c-.25.2-.475.325-.675.375l-.975.675c-.05.05-.1.05-.15 0l-.225-.3-.15-.3-.188-.263-.225-.3-.187-.225-.15-.187-.3-.225c-.1 0-.2-.025-.3-.075l-.975-.75c-.15 0-.325-.075-.525-.225-.75-.65-1.25-1.05-1.5-1.2l-.45-.3-.9-.15c-.3-.05-.7-.2-1.2-.45l-.6-.3c-.4-.2-.675-.3-.825-.3l-.3-.15c-.2-.05-.35-.1-.45-.15l-.15-.15c-.1 0-.2.025-.3.075l-1.5.75-1.875.825c-.5.4-.975.725-1.425.975l-.825.375-1.275.9c-.1.1-.2.1-.3 0l-.15.15c-.15.05-.25.075-.3.075l-.3.15v.15H3.2l-.15.225c-.1.2-.2.312-.3.337-.1.025-.162.063-.187.113a.434.434 0 01-.075.112l-.15.15-.225.15-.338-.037-.45.075-.3.075c-.25.05-.45.012-.6-.113-.15-.125-.275-.312-.375-.562-.1-.15-.05-.275.15-.375l.075-.075c.05-.05.125-.075.225-.075h.45l.6-.225.3-.075c0-.1.025-.175.075-.225.05-.05.125-.075.225-.075v-.075a.666.666 0 01-.075-.3c-.05-.1-.063-.175-.037-.225.025-.05.05-.075.075-.075h.037l.075.225c.05.25.125.325.225.225l.075-.15c.05-.1.125-.15.225-.15l.15.15.15-.15-.075-.075c0-.05.025-.075.075-.075l.3-.3c.25-.3.55-.575.9-.825.7-.55 1.45-.975 2.25-1.275.25-.25.525-.375.825-.375.2-.35.5-.725.9-1.125.35-.25.6-.425.75-.525.1-.2.225-.3.375-.3h.075l.15-.15c.1-.05.175-.1.225-.15v-.375c0-.25.025-.45.075-.6.05-.15.175-.225.375-.225l.3-.3c-.1-.2-.15-.425-.15-.675h-.075c-.1-.15-.15-.3-.15-.45-.15-.25-.25-.45-.3-.6H9.65c-.05.15-.175.25-.375.3l-.075.15c-.2.35-.375.612-.525.787-.15.175-.425.388-.825.638-.25.25-.425.525-.525.825-.05.15-.05.3 0 .45l-.075.15h.075c0 .1.025.15.075.15h.075c.1.05.15.112.15.187s-.075.1-.225.075a.606.606 0 01-.337-.15c-.075-.075-.138-.112-.188-.112l-.225.225c-.1.15-.2.212-.3.187-.1-.025-.125-.062-.075-.112l.075-.075c.05-.1.05-.15 0-.15l-.6.15c-.05.05-.112.05-.187 0s-.063-.1.037-.15l.375-.15c0-.05-.025-.075-.075-.075-.2.1-.4.125-.6.075l-.375-.075-.075-.075c0-.05.025-.075.075-.075.2.05.45.025.75-.075l.525-.225.6-.675.075-.15c.2-.4.413-.763.638-1.088a3.68 3.68 0 01.712-.787l.075-.3c.1-.2.2-.375.3-.525.1-.15.225-.35.375-.6l.225-.3c.2-.3.425-.45.675-.45l.225-.225c.05-.05.075-.125.075-.225l.15-.15-.075-.075c-.3-.25-.45-.475-.45-.675-.05-.35.063-.65.338-.9s.55-.363.825-.338c.275.025.487.113.637.263l.15.15c.05 0 .075.025.075.075l.3.15v.225c.1.1.15.175.15.225.1-.15.25-.325.45-.525l.375-1.2c0-.2.05-.4.15-.6l.15-.225v-.15l.225-.9h.15l.225-.9a.933.933 0 000-.525l-.3-.75-.15-.6z" /></symbol>
            <symbol id="logo-marquee-aws" viewBox="0 0 24 24"><path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167zM21.698 16.207c-2.626 1.94-6.442 2.969-9.722 2.969-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.024-.527.272-.351 3.384 1.963 7.559 3.153 11.877 3.153 2.914 0 6.114-.607 9.06-1.852.439-.2.814.287.383.607zM22.792 14.961c-.336-.43-2.22-.207-3.074-.103-.255.032-.295-.192-.063-.36 1.5-1.053 3.967-.75 4.254-.399.287.36-.08 2.826-1.485 4.007-.215.184-.423.088-.327-.151.32-.79 1.03-2.57.695-2.994z" /></symbol>
            <symbol id="logo-marquee-spotify" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" /></symbol>
            <symbol id="logo-marquee-burger-king" viewBox="0 0 24 24"><path d="M15.39 12.614c-.72 0-1.11.538-1.11 1.215v1.508c0 .125-.043.182-.12.182-.056 0-.098-.035-.147-.133l-.971-1.885c-.37-.72-.755-.887-1.196-.887-.734 0-1.14.552-1.14 1.243v4.314c0 .678.392 1.215 1.112 1.215.72 0 1.112-.537 1.112-1.215v-1.507c0-.126.042-.182.119-.182.055 0 .097.035.146.133l.972 1.885c.37.719.769.886 1.195.886.735 0 1.14-.551 1.14-1.242v-4.315c0-.677-.391-1.215-1.111-1.215zm-4.02-.405c.364 0 .68-.286.68-.642 0-.238-.099-.412-.224-.572-.203-.266-.385-.496-.476-.74-.02-.056-.007-.105.056-.154.217-.167.469-.537.469-1.124 0-.886-.734-1.389-1.622-1.389h-.79c-.553 0-.819.321-.819.754v3.114c0 .419.245.754.692.754.448 0 .693-.335.693-.754v-.74c0-.09.042-.133.111-.133.084 0 .112.049.126.133.063.356.23.837.42 1.082.237.314.46.411.685.411zm-1.146-2.666h-.098c-.119 0-.175-.07-.175-.161v-.474c0-.09.056-.16.175-.16h.098c.294 0 .385.208.385.39 0 .174-.091.405-.385.405zm-3.761 2.666c1.132 0 1.734-.677 1.734-1.528V8.328c0-.419-.245-.754-.692-.754-.448 0-.693.335-.693.754v2.276c0 .167-.097.363-.35.363-.251 0-.335-.196-.335-.363V8.328c0-.419-.252-.754-.7-.754-.447 0-.691.335-.691.754v2.353c0 .852.594 1.528 1.727 1.528zm12.011-.034c.392 0 .7-.23.7-.65 0-.412-.308-.642-.7-.642h-.63c-.118 0-.174-.07-.174-.16v-.133c0-.091.056-.161.175-.161h.482c.336 0 .602-.202.602-.559 0-.355-.266-.558-.602-.558h-.482c-.12 0-.175-.07-.175-.16V9.04c0-.091.056-.161.175-.161h.629c.392 0 .7-.23.7-.65 0-.411-.308-.642-.7-.642h-1.321c-.553 0-.818.321-.818.754v3.079c0 .432.265.754.818.754h1.321zm2.642 3.127h-.342c-.615 0-1.09.286-1.09.914 0 .573.517.845.901.845.189 0 .322.056.322.202 0 .182-.224.3-.462.3-.79 0-1.328-.537-1.328-1.535 0-1.11.734-1.515 1.3-1.515.692 0 .804.349 1.287.349a.927.927 0 0 0 .936-.915.95.95 0 0 0-.398-.788c-.427-.315-1.07-.545-1.979-.545-1.629 0-3.216 1.026-3.216 3.414 0 2.282 1.587 3.35 3.153 3.35 1.643 0 2.685-1.012 2.685-2.492 0-.935-.587-1.584-1.769-1.584zm-12.43-2.688c-.783 0-1.21.587-1.21 1.32v4.132c0 .734.427 1.32 1.21 1.32.783 0 1.21-.586 1.21-1.32v-4.132c0-.733-.427-1.32-1.21-1.32zm11.494-.405c.447 0 .692-.335.692-.754v-.74c0-.09.042-.132.112-.132.084 0 .111.049.125.133.063.355.231.837.42 1.082.238.314.461.412.685.412.363 0 .678-.286.678-.643 0-.237-.098-.412-.224-.572-.237-.3-.384-.496-.475-.74-.02-.056-.007-.105.056-.153.217-.168.469-.538.469-1.124 0-.887-.735-1.39-1.623-1.39h-.79c-.552 0-.817.321-.817.754v3.114c0 .419.244.753.692.753zm.615-3.301c0-.09.056-.161.175-.161h.098c.293 0 .384.21.384.391 0 .175-.09.405-.384.405h-.098c-.12 0-.175-.07-.175-.16zm-18.87 3.267h.986c.93 0 1.496-.622 1.496-1.397 0-.621-.37-.907-.454-.977-.035-.028-.07-.056-.07-.084 0-.035.021-.048.056-.09.133-.154.266-.398.266-.754 0-.838-.567-1.285-1.448-1.285h-.832c-.552 0-.817.321-.817.754v3.079c0 .433.265.754.817.754zm.413-3.386c0-.09.056-.16.175-.16h.09c.301 0 .392.209.392.39 0 .168-.09.405-.391.405h-.091c-.12 0-.175-.07-.175-.16zm0 1.634c0-.091.056-.161.175-.161h.126c.335 0 .433.223.433.426 0 .181-.098.44-.433.44h-.126c-.12 0-.175-.07-.175-.161zm11.878 1.794c1.098 0 1.79-.699 1.79-1.718 0-.649-.391-1.096-1.174-1.096h-.224c-.413 0-.734.196-.734.636 0 .39.342.58.601.58.133 0 .217.041.217.139 0 .125-.147.21-.315.21-.524 0-.88-.37-.88-1.062 0-.768.489-1.047.866-1.047.462 0 .539.238.86.238.37 0 .623-.308.623-.629a.669.669 0 0 0-.266-.544c-.294-.217-.706-.377-1.321-.377-1.084 0-2.14.712-2.14 2.36 0 1.576 1.056 2.31 2.097 2.31zm-8.718 3.762a.354.354 0 0 1-.07-.188c0-.077.042-.133.126-.21.196-.181.678-.635.944-1.047.202-.314.286-.6.286-.837 0-.607-.552-1.082-1.153-1.082-.385 0-.748.216-.993.614-.329.53-.72 1.145-.972 1.39-.063.062-.098.076-.146.076-.084 0-.12-.056-.12-.146v-.699c0-.684-.405-1.235-1.139-1.235-.74 0-1.14.551-1.14 1.235v4.3c0 .685.399 1.237 1.14 1.237.734 0 1.14-.552 1.14-1.236v-.991c0-.084.035-.147.119-.147.111 0 .14.112.167.168.161.384.63 1.2 1.063 1.682.294.32.657.524 1.042.524.65 0 1.196-.566 1.196-1.173 0-.377-.161-.657-.469-.991-.392-.427-.853-.986-1.021-1.244zm15.751 6.702C19.432 23.707 16.313 24 12 24c-4.313 0-7.432-.293-9.25-1.32-1.09-.614-1.642-1.451-1.642-2.052 0-.342.181-.537.587-.537h20.61c.406 0 .587.195.587.537 0 .6-.552 1.438-1.643 2.053zm1.056-15.917H1.695c-.406 0-.587-.209-.587-.586C1.108 3.944 4.47 0 12 0c7.46 0 10.892 3.944 10.892 6.178 0 .377-.181.586-.587.586Z" /></symbol>
            <symbol id="logo-marquee-honda" viewBox="0 0 24 24"><path d="M23.902 6.87c-.33-3.218-2.47-3.895-4.354-4.204-.946-.16-2.63-.3-3.716-.34-.946-.06-3.168-.09-3.835-.09-.657 0-2.89.03-3.835.09-1.076.04-2.77.18-3.716.34C2.563 2.985.42 3.66.092 6.87c-.08.877-.1 2.023-.09 3.248.03 2.031.2 3.406.3 4.363.07.657.338 2.62.687 3.636.478 1.395.916 1.803 1.424 2.222.937.757 2.471.996 2.79 1.056 1.733.31 5.24.368 6.784.368 1.544 0 5.05-.05 6.784-.368.329-.06 1.863-.29 2.79-1.056.508-.419.946-.827 1.424-2.222.35-1.016.628-2.979.698-3.636.1-.957.279-2.332.299-4.363.04-1.225.01-2.371-.08-3.248m-1.176 5.4c-.19 2.57-.418 4.104-.747 5.22-.29.976-.637 1.623-1.165 2.092-.867.787-2.063.956-2.76 1.056-1.514.23-4.055.3-6.057.3-2.002 0-4.543-.08-6.057-.3-.697-.1-1.893-.269-2.76-1.056-.518-.469-.876-1.126-1.155-2.093-.329-1.105-.558-2.65-.747-5.22-.11-1.543-.09-4.054.08-5.4.258-2.011 1.255-3.018 3.387-3.396.996-.18 2.34-.31 3.606-.37 1.016-.07 2.7-.1 3.636-.09.936-.01 2.62.03 3.636.09 1.275.06 2.61.19 3.606.37 2.142.378 3.139 1.395 3.388 3.397.199 1.345.229 3.856.11 5.4m-5.202-8.39c-.548 2.462-.767 3.588-1.216 5.37-.428 1.715-.767 3.298-1.335 4.065-.587.777-1.365.947-1.893 1.006-.279.03-.478.04-1.066.05-.596 0-.796-.02-1.075-.05-.528-.06-1.315-.229-1.892-1.006-.578-.767-.907-2.35-1.335-4.064-.47-1.773-.678-2.91-1.236-5.37 0 0-.548.02-.797.04-.329.02-.588.05-.867.09.343 5.372.692 11.079 1.126 16.13a21.983 21.983 0 002.39.169c.33-1.266.748-3.02 1.207-3.767.378-.608.966-.677 1.295-.717.518-.07.956-.08 1.165-.08.2-.01.637 0 1.165.08.33.05.917.11 1.295.717.47.747.877 2.5 1.206 3.766 0 0 .358-.01 1.165-.05.41-.018.82-.058 1.226-.12.458-5.39.785-10.728 1.126-16.128-.28-.04-.538-.07-.867-.09-.23-.02-.787-.04-.787-.04z" /></symbol>
            <symbol id="logo-marquee-notion" viewBox="0 0 24 24"><path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z" /></symbol>
            <symbol id="logo-marquee-hulu" viewBox="0 0 24 24"><path d="M14.707 15.957h1.912V8.043h-1.912zm-3.357-2.256a.517.517 0 01-.512.511H9.727a.517.517 0 01-.512-.511v-3.19H7.303v3.345c0 1.368.879 2.09 2.168 2.09h1.868c1.189 0 1.912-.856 1.912-2.09V10.51h-1.912c.01 0 .01 3.09.01 3.19zm10.75-3.19v3.19a.517.517 0 01-.512.511h-1.112a.517.517 0 01-.511-.511v-3.19h-1.912v3.345c0 1.368.878 2.09 2.167 2.09h1.868c1.19 0 1.912-.856 1.912-2.09V10.51zm-18.32 0H2.557c-.434 0-.645.11-.645.11V8.044H0v7.903h1.9v-3.179c0-.278.234-.511.512-.511h1.112c.278 0 .511.233.511.511v3.19h1.912v-3.446c0-1.445-.967-2-2.167-2Z" /></symbol>
          </defs>
        </svg>
      </section>

      {/* Projects – scroll view with glass blur cards; strip bleeds full viewport, offset start */}
      <section id="projects" className="bg-black py-16 lg:py-20 overflow-x-hidden">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-14 lg:mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-white font-title">
              We have delivered over 250<br /> projects in London
            </h2>
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
                {/* Logo placeholder – top centre */}
                <div className="projects-card-logo-placeholder absolute top-6 left-1/2 -translate-x-1/2 z-10 flex items-center justify-center w-16 h-16 rounded-lg bg-white/90 border border-white/50 shadow-lg" aria-hidden>
                  <span className="text-[10px] font-medium text-black/60 uppercase tracking-wider">Logo</span>
                </div>
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
                  <p className="text-4xl font-bold text-white mb-1 relative z-10">{p.stat}</p>
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

      {/* Section Separator */}
      <div className="section-divider w-full h-px bg-black dark:bg-white"></div>

      {/* Why Security & Fire Safety Matter – expandable cards */}
      <section id="why-mep" className="mep-cards-section mep-section-light-bg section-spacing">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="section-content-gap">
            <h2 className={`text-5xl font-bold text-left font-title section-title-gap`}>
              Integrated Security Systems
            </h2>
            <p className="text-base text-gray-300 leading-relaxed max-w-2xl section-intro-gap">
              APX Fire & Security have been providing bespoke high quality integrated security systems to London and the Home Counties since 1986. Our knowledge and years of experience mean we can offer advice in all aspects of security, from small domestic systems through to large-scale commercial installations.
            </p>
          </div>
        </div>
        <div className="container mx-auto px-6">
          <ul
          ref={mepListRef}
          className="mep-cards-grid"
          role="list"
          onPointerMove={(e) => {
            const li = (e.target as HTMLElement).closest('li')
            if (li && mepListRef.current) {
              const index = [...mepListRef.current.querySelectorAll('li')].indexOf(li)
              if (index !== -1) setActiveMepIndex(index)
            }
          }}
          onClick={(e) => {
            const li = (e.target as HTMLElement).closest('li')
            if (li && mepListRef.current) {
              const index = [...mepListRef.current.querySelectorAll('li')].indexOf(li)
              if (index !== -1) setActiveMepIndex(index)
            }
          }}
          onFocus={(e) => {
            const li = (e.target as HTMLElement).closest('li')
            if (li && mepListRef.current) {
              const index = [...mepListRef.current.querySelectorAll('li')].indexOf(li)
              if (index !== -1) setActiveMepIndex(index)
            }
          }}
        >
          {mepCards.map((card, i) => {
            const Icon = card.icon
            return (
              <li
                key={card.id}
                data-active={activeMepIndex === i}
                tabIndex={0}
              >
                <span className="mep-card-glow" aria-hidden />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={card.image} alt="" className="mep-card-bg-img" />
                <article>
                  <h3 className="mep-title-vertical" style={{ fontFamily: 'var(--font-menu)' }} aria-hidden={activeMepIndex === i}>{card.title}</h3>
                  <span className="mep-card-title-wrap" aria-hidden={activeMepIndex !== i}>
                    <h3 className="mep-title-horizontal" style={{ fontFamily: 'var(--font-menu)' }}>{card.title}</h3>
                  </span>
                  <p>{card.description}</p>
                  <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  <Link href={card.href}>
                    <span>Learn more</span>
                  </Link>
                </article>
              </li>
            )
          })}
        </ul>
        </div>
      </section>

      {/* Section Separator */}
      <div className="section-divider w-full h-px bg-black dark:bg-white"></div>

      {/* Why Choose Us Section */}
      <section id="about" className="section-spacing">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="section-content-gap space-y-16">
            {/* Top Section - Title and Description */}
            <div>
              <h2 className={`text-5xl font-bold text-left font-title section-title-gap`}>Why Choose APX Fire & Security?</h2>
              <p className="text-base text-gray-300 leading-relaxed max-w-xl section-intro-gap">
                We have been providing bespoke integrated security systems to London and the Home Counties since 1986. Our extensive knowledge and decades of real world experience allow us to deliver high quality security systems to the domestic and commercial sector.
              </p>
            </div>
            
            {/* Benefits Cards - 3 Column Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {/* NSI Gold Accredited */}
              <div className="service-card text-white">
                <span className="glow"></span>
                
                <div className="flex items-center space-x-3 mb-4 relative z-10">
                  <CheckCircle className="h-7 w-7 text-white" />
                  <h4 className={`text-2xl font-semibold text-white font-title`}>NSI Gold Accredited</h4>
                  </div>
                <div className="space-y-2 relative z-10">
                  <div className="text-gray-300 text-xl">• BS EN ISO 9001:2015</div>
                  <div className="text-gray-300 text-xl">• BAFE Fire Safety Registered</div>
                  <div className="text-gray-300 text-xl">• UKAS Quality Management</div>
                  <div className="text-gray-300 text-xl">• FIA Member</div>
                </div>
              </div>
              
              {/* 24/7 Emergency Service */}
              <div className="service-card text-white">
                <span className="glow"></span>
                
                <div className="flex items-center space-x-3 mb-4 relative z-10">
                  <Clock className="h-7 w-7 text-white" />
                  <h4 className={`text-2xl font-semibold text-white font-title`}>24/7 Emergency Service</h4>
                  </div>
                <div className="space-y-2 relative z-10">
                  <div className="text-gray-300 text-xl">• Round-the-clock security support</div>
                  <div className="text-gray-300 text-xl">• Rapid response times</div>
                  <div className="text-gray-300 text-xl">• Monitored alarm response</div>
                  <div className="text-gray-300 text-xl">• When you need it most</div>
                </div>
              </div>
              
              {/* Quality Guarantee */}
              <div className="service-card text-white">
                <span className="glow"></span>
                
                <div className="flex items-center space-x-3 mb-4 relative z-10">
                  <Shield className="h-7 w-7 text-white" />
                  <h4 className={`text-2xl font-semibold text-white font-title`}>Quality Guarantee</h4>
                  </div>
                <div className="space-y-2 relative z-10">
                  <div className="text-gray-300 text-xl">• Constructionline Gold Member</div>
                  <div className="text-gray-300 text-xl">• All work to NSI Gold standards</div>
                  <div className="text-gray-300 text-xl">• Quality assurance</div>
                  <div className="text-gray-300 text-xl">• Reliable service</div>
                </div>
              </div>
            </div>
            
            {/* Stats Section - no border, animated count-up */}
            <div className="mt-16 sm:mt-20 flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="stats-card rounded-xl bg-white/5 px-8 py-6 text-center backdrop-blur-sm animate-stats-in" style={{ animationDelay: '0ms' }}>
                <div className="text-4xl font-bold text-white leading-none">
                  <CountUp target={500} suffix="+" duration={2000} />
                </div>
                <div className="text-gray-300 text-sm mt-2">Projects Completed</div>
              </div>
              <div className="stats-card rounded-xl bg-white/5 px-8 py-6 text-center backdrop-blur-sm animate-stats-in" style={{ animationDelay: '150ms' }}>
                <div className="text-4xl font-bold text-white leading-none">
                  <CountUp target={99} suffix="%" duration={2000} />
                </div>
                <div className="text-gray-300 text-sm mt-2">Customer Satisfaction</div>
              </div>
              <div className="stats-card rounded-xl bg-white/5 px-8 py-6 text-center backdrop-blur-sm animate-stats-in" style={{ animationDelay: '300ms' }}>
                <div className="text-4xl font-bold text-white leading-none">
                  <CountUp target={20} suffix="+" duration={2000} />
                </div>
                <div className="text-gray-300 text-sm mt-2">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <div className="section-divider w-full h-px bg-black dark:bg-white"></div>

      {/* Testimonials Section */}
      <section id="testimonials" className="section-spacing">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="section-content-gap space-y-16">
            {/* Top Section - Title and Description */}
            <div className="text-left">
              <h2 className={`text-5xl font-bold font-title section-title-gap`}>What Our Clients Say</h2>
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
      </section>

      {/* Section Separator */}
      <div className="section-divider w-full h-px bg-black dark:bg-white"></div>

      {/* Ready to Get Started Section */}
      <section id="contact" className="section-spacing relative">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
            {/* Left side - Title and Button */}
            <div className="space-y-8 pt-16 lg:pt-24">
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold font-title leading-tight text-left`}>
                Ready to Get Started?
              </h2>
              
              <div className="space-y-6 max-w-lg">
                <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300">
                  As one of the leading security system installers in London and the south east, we are pleased to offer a free survey and report for your property. Our systems are expertly designed in accordance with NSI Gold standards, covering both the domestic and commercial market.
                </p>
                
                <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300">
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
            
            {/* Right side - Contact Form */}
            <div 
              id="quote-form" 
              className="p-8 rounded-xl shadow-2xl"
            >
              <h3 className={`text-2xl font-bold mb-6 font-title`}>Get Your Free Quote</h3>
              
              <form className="space-y-6">
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
                      onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        textAlign: 'left',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: themeMode.cardBg,
                        border: `1px solid ${themeMode.border}`,
                        color: themeMode.text,
                        cursor: 'pointer'
                      }}
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
                        className="dropdown-menu"
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: '0',
                          right: '0',
                          zIndex: '50',
                          marginTop: '4px',
                          borderRadius: '8px',
                          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                          backgroundColor: themeMode.cardBg,
                          border: `1px solid ${themeMode.border}`
                        }}
                      >
                        <div style={{ padding: '8px 0' }}>
                          {[
                            { value: 'electrical', label: 'Electrical Services' },
                            { value: 'mechanical', label: 'Mechanical Services' },
                            { value: 'maintenance', label: 'Maintenance' },
                            { value: 'installation', label: 'Installation' },
                            { value: 'repair', label: 'Repair Services' },
                            { value: 'other', label: 'Other' }
                          ].map((service, index) => (
                            <button
                              key={service.value}
                              type="button"
                              className="dropdown-item"
                              onClick={() => {
                                setSelectedService(service.label)
                                setIsServicesDropdownOpen(false)
                              }}
                              style={{
                                width: '100%',
                                padding: '8px 16px',
                                textAlign: 'left',
                                fontSize: '14px',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                color: themeMode.text,
                                backgroundColor: 'transparent',
                                borderBottom: index < 5 ? `1px solid ${themeMode.text === '#FFFFFF' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}` : 'none'
                              }}
                              onMouseEnter={(e) => {
                                const t = e.currentTarget
                                t.style.backgroundColor = themeMode.text === '#FFFFFF' ? '#333333' : '#f5f5f5'
                                t.style.color = themeMode.text
                                t.style.opacity = '1'
                                t.style.fontWeight = 'bold'
                                t.style.textShadow = 'none'
                              }}
                              onMouseLeave={(e) => {
                                const t = e.currentTarget
                                t.style.backgroundColor = 'transparent'
                                t.style.color = themeMode.text
                                t.style.opacity = '1'
                                t.style.fontWeight = 'normal'
                                t.style.textShadow = 'none'
                              }}
                            >
                              {service.label}
                            </button>
                          ))}
                        </div>
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
                
                <button
                  type="submit"
                  className="w-full py-4 rounded-lg font-semibold text-lg"
                >
                  Submit Quote Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
    </>
  );
}
