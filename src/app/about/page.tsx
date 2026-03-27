"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { MAIN_CASE_STUDIES } from "@/data/projects";

export default function AboutPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(typeof window !== "undefined" ? window.scrollY : 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("about-page-active");
    return () => document.documentElement.classList.remove("about-page-active");
  }, []);

  return (
    <div className="about-parallax-page about-page-shell overflow-x-hidden snap-y snap-mandatory">
      {/* Hero – same vertical rhythm/structure as homepage hero */}
      <section className="about-block about-block--black about-block--angle-bottom relative h-screen overflow-visible flex flex-col snap-start">
        <div className="about-parallax-bg" style={{ transform: `translateY(${scrollY * 0.12}px)` }} aria-hidden />
        <div className="container mx-auto px-6 flex-1 flex flex-col justify-start lg:justify-center pt-36 pb-16 sm:pt-40 lg:pt-44 lg:pb-20 relative z-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-16 items-center w-full">
            <div className="space-y-4 max-w-2xl lg:max-w-none">
              <h1
                className="mb-2 md:mb-3 text-left text-white leading-[0.95]"
                style={{ fontFamily: "var(--font-menu)" }}
              >
                <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal italic text-white/75">
                  everything you
                </span>
                <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal italic text-white/75">
                  need to know
                </span>
                <span className="mt-1 block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold not-italic">
                  ABOUT APX
                </span>
                <span className="block whitespace-nowrap text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold not-italic">
                  FIRE &amp; SECURITY
                </span>
              </h1>
              <p className="text-lg sm:text-xl md:text-xl font-normal text-left tracking-tight max-w-xl text-white/90">
                With over 20 years of experience, APX Fire and Security is a specialist provider of fire and security system installation, commissioning, and maintenance. We support M&amp;E contractors, facility management teams, architects, consultants, and main contractors across commercial, industrial, and public-sector environments.
              </p>
            </div>
            <div className="relative w-full max-w-md mx-auto lg:max-w-none aspect-[3/4] sm:aspect-[4/5] lg:aspect-[5/6] rounded-2xl overflow-hidden border border-white/20 shadow-[0_24px_64px_rgba(0,0,0,0.45)] ring-1 ring-white/10">
              <Image
                src="/about%20page%20cctv%20camera.png"
                alt="CCTV camera"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 90vw, 44vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Block 2 – white, angled top & bottom, image placeholder */}
      <section className="about-block about-block--white about-block--angle-top about-block--angle-bottom-alt about-section-y about-section-px flex snap-start items-center min-h-screen">
        <div className="about-section-inner grid grid-cols-1 items-stretch gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          <div>
            <span className="section-label section-label--black mb-3 block">Expertise</span>
            <h2 className="mb-6 text-4xl font-bold text-black lg:text-5xl" style={{ fontFamily: "var(--font-menu)" }}>
              Certified Fire &amp; Security Specialists
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-black/80">
              Our engineers are fully trained across all disciplines, ensuring every project is delivered with precision, professionalism, and full compliance with relevant British Standards.
            </p>
            <ul className="space-y-3 text-black/90">
              <li>• Fully qualified fire &amp; security engineers</li>
              <li>• BAFE, NSI and industry certifications</li>
              <li>• Regular training and compliance updates</li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-0 sm:gap-1 lg:min-h-full">
            {[
              { href: "/about/accreditors/bafe", src: "/accreditations%20mono/Coloured/BAFE-01.svg", alt: "BAFE" },
              { href: "/about/accreditors/nsi", src: "/accreditations%20mono/NSI-01.svg", alt: "NSI" },
              { href: "/about/accreditors/constructionline", src: "/accreditations%20mono/Coloured/ConstructionOnline-01.svg", alt: "Constructionline" },
              { href: "/about/accreditors/fia", src: "/accreditations%20mono/Coloured/FIA-01.svg", alt: "FIA" },
            ].map((item) => (
              <Link
                key={item.alt}
                href={item.href}
                className="group flex items-center justify-center py-3 sm:py-4"
                aria-label={`Learn more about ${item.alt}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={280}
                  height={180}
                  className="max-h-24 sm:max-h-28 lg:max-h-32 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Block 3 – black, homepage-style projects strip (smaller cards) */}
      <section className="about-block about-block--black about-block--angle-top about-section-y flex snap-start flex-col justify-center">
        <div className="about-section-px mb-12 md:mb-14">
          <span className="section-label mb-3 block text-white/75">Portfolio</span>
          <h2 className="text-4xl font-bold text-white lg:text-5xl" style={{ fontFamily: "var(--font-menu)" }}>
            Our Work
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
            The same featured case studies as our Projects hub — real sites, hero photography, and project detail pages.
          </p>
        </div>
        <div className="w-screen relative left-1/2 -translate-x-1/2">
          <div className="about-horizontal-scroll about-section-px pb-2">
            <div className="about-horizontal-scroll__inner">
              {MAIN_CASE_STUDIES.map((project, i) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="projects-card group flex-shrink-0 flex flex-col rounded-xl overflow-hidden bg-black w-[260px] sm:w-[290px]"
                >
                  <div className="relative aspect-[3/4] min-h-[360px] projects-card__inner">
                    <span
                      className="projects-card-number absolute top-4 right-4 z-10 text-4xl font-bold text-white tabular-nums drop-shadow-md"
                      style={{ fontFamily: 'var(--font-title, "Outfit", sans-serif)' }}
                      aria-hidden
                    >
                      {(i + 1).toString().padStart(2, "0")}
                    </span>
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${project.heroImage})` }}
                    />
                    <div className="projects-card-glass absolute inset-x-0 bottom-0 top-1/2 overflow-hidden p-4 pt-14 pb-4 pr-12 flex flex-col justify-end">
                      <div
                        className="projects-card-glass-blur absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${project.heroImage})` }}
                        aria-hidden
                      />
                      <div className="projects-card-glass-overlay absolute inset-0" aria-hidden />
                      <div className="relative z-20">
                        <p className="text-[10px] uppercase tracking-[0.14em] text-white mb-1">{project.sector}</p>
                        <p className="text-base sm:text-lg font-bold text-white mb-1 leading-[1.15] line-clamp-2 min-h-[2.5rem]">{project.title}</p>
                        <p className="text-white/90 text-[10px] uppercase tracking-[0.11em] mb-1.5">{project.location}</p>
                        <p className="text-white text-xs mb-2 line-clamp-2 min-h-[2.25rem]">{project.shortDescription}</p>
                        <p className="text-white/85 text-[11px] italic line-clamp-2 leading-snug">&ldquo;{project.summary}&rdquo;</p>
                      </div>
                      <span
                        className="projects-card-arrow absolute bottom-4 right-4 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-white/20 text-white transition-transform duration-200 group-hover:rotate-12"
                        aria-hidden
                      >
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Block 4 – white, angled top & bottom, text + image */}
      <section className="about-block about-block--white about-block--angle-bottom about-block--angle-top-alt about-section-y about-section-px flex snap-start items-center">
        <div className="about-section-inner grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          <div className="order-2 relative aspect-[3/4] overflow-hidden rounded-xl lg:order-1">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/intruder%20alarm%20systems.jpg')" }} />
          </div>
          <div className="order-1 lg:order-2">
            <span className="section-label section-label--black mb-3 block">Support</span>
            <h2 className="mb-6 text-4xl font-bold text-black lg:text-5xl" style={{ fontFamily: "var(--font-menu)" }}>
              24/7 Emergency Response
            </h2>
            <p className="text-lg leading-relaxed text-black/80">
              Round-the-clock fire and security support with rapid response times. When an alarm triggers or you need urgent assistance, we&apos;re here to protect your people and your property.
            </p>
          </div>
        </div>
      </section>

      {/* Block 5 – black, angled, stats / quote */}
      <section className="about-block about-block--black about-block--angle-top about-block--angle-bottom-alt about-section-y about-section-px flex snap-start flex-col justify-center">
        <div className="about-section-inner mx-auto max-w-5xl text-center">
          <p className="text-2xl font-medium leading-relaxed text-white/90 md:text-3xl lg:text-4xl">
            &ldquo;We don&apos;t just install systems — we help you stay compliant and keep everyone safe.&rdquo;
          </p>
          <div className="mt-14 grid grid-cols-1 gap-10 sm:mt-20 sm:grid-cols-3 sm:gap-12 md:gap-14">
            <div>
              <div className="text-4xl font-bold text-white md:text-5xl">500+</div>
              <div className="mt-2 text-sm text-white/60 md:text-base">Projects completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white md:text-5xl">99%</div>
              <div className="mt-2 text-sm text-white/60 md:text-base">Customer satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white md:text-5xl">20+</div>
              <div className="mt-2 text-sm text-white/60 md:text-base">Years experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Block 6 – white, angled, image grid placeholders */}
      <section className="about-block about-block--white about-block--angle-top about-block--angle-bottom-alt about-section-y about-section-px flex snap-start items-center">
        <div className="about-section-inner w-full">
          <span className="section-label section-label--black mb-3 block">Assurance</span>
          <h2 className="mb-10 text-4xl font-bold text-black lg:mb-14 lg:text-5xl" style={{ fontFamily: "var(--font-menu)" }}>
            Quality &amp; Compliance
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {["/cctv%20systems.jpg", "/access%20control%20systems.jpg", "/video%20door%20entry%20systems.jpg"].map((src) => (
              <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${src})` }} />
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-2xl text-base leading-relaxed text-black/80 md:text-lg">
            Comprehensive warranties on all fire and security work. BAFE and industry standards you can trust.
          </p>
        </div>
      </section>

      {/* Block 7 – black, angled bottom, CTA */}
      <section className="about-block about-block--black about-block--angle-top about-section-y about-section-px flex snap-start flex-col items-center justify-center text-center">
        <h2 className="mb-5 text-4xl font-bold text-white lg:text-5xl" style={{ fontFamily: "var(--font-menu)" }}>
          Get in touch
        </h2>
        <p className="mb-10 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
          Ready to discuss your fire safety or security requirements? We&apos;d love to hear from you.
        </p>
        <Link
          href="/contact"
          className="rounded-xl bg-white px-10 py-4 text-lg font-semibold text-black transition-colors hover:bg-white/90"
        >
          Contact us
        </Link>
      </section>
    </div>
  );
}
