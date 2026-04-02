"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Reveal } from "@/components/Reveal";

/** Commitment icons: public/__quality assurance.svg, __health and safety.svg, __environmental.svg */
const ABOUT_COMMITMENTS = [
  { line1: "QUALITY", line2: "ASSURANCE", iconSrc: "/__quality assurance.svg", iconAlt: "Quality assurance" },
  { line1: "HEALTH", line2: "& SAFETY", iconSrc: "/__health and safety.svg", iconAlt: "Health and safety" },
  { line1: "ENVIRONMENTAL", line2: "COMMITMENT", iconSrc: "/__environmental.svg", iconAlt: "Environmental commitment" },
] as const;

/** Background layer only (`bg`) — headline, copy, and hero photo stay fixed within the hero while scrolling. */
const PARALLAX = { bg: 0.38 } as const;

/** Public folder uses a space in "accreditations mono" — literal paths load reliably in <img> */
const ACC_MONO = "/accreditations mono";
const EXPERTISE_ACCRED_LOGOS = [
  { href: "/accreditations/bafe", src: `${ACC_MONO}/Coloured/BAFE-01.svg`, alt: "BAFE" },
  { href: "/accreditations/nsi", src: `${ACC_MONO}/NSI-01.svg`, alt: "NSI" },
  { href: "/accreditations/constructionline", src: `${ACC_MONO}/Coloured/ConstructionOnline-01.svg`, alt: "Constructionline" },
  { href: "/accreditations/fia", src: `${ACC_MONO}/Coloured/FIA-01.svg`, alt: "FIA" },
] as const;

function readDocumentScrollY(): number {
  if (typeof window === "undefined") return 0;
  return (
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0
  );
}

export default function AboutPage() {
  const [parallaxY, setParallaxY] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [heroReveal, setHeroReveal] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setHeroReveal(true);
      return;
    }
    const id = requestAnimationFrame(() => setHeroReveal(true));
    return () => cancelAnimationFrame(id);
  }, [reduceMotion]);

  useEffect(() => {
    const update = () => {
      rafRef.current = 0;
      if (reduceMotion) {
        setParallaxY(0);
        return;
      }
      const scrollY = readDocumentScrollY();
      const hero = heroRef.current;
      if (!hero) {
        setParallaxY(scrollY);
        return;
      }
      const rect = hero.getBoundingClientRect();
      const vh = window.innerHeight;
      const h = Math.max(rect.height, 1);
      // Distance the hero block has moved up past the viewport top (0 while hero top is still below/at top edge)
      const scrolledPastHeroTop = Math.max(0, -rect.top);
      // While hero is still entering (top below viewport top), blend in movement from document scroll
      const leadIn = rect.top > 0 ? scrollY * 0.45 : 0;
      const t = Math.min(scrolledPastHeroTop + leadIn, h + vh * 0.35);
      setParallaxY(t);
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("resize", onScroll, { passive: true });
    const vv = window.visualViewport;
    vv?.addEventListener("scroll", onScroll, { passive: true });
    vv?.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("resize", onScroll);
      vv?.removeEventListener("scroll", onScroll);
      vv?.removeEventListener("resize", onScroll);
    };
  }, [reduceMotion]);

  const py = reduceMotion ? 0 : parallaxY;

  useEffect(() => {
    document.documentElement.classList.add("about-page-active");
    return () => document.documentElement.classList.remove("about-page-active");
  }, []);

  return (
    <div className="about-parallax-page about-page-shell overflow-x-hidden">
      {/* Hero – same vertical rhythm/structure as homepage hero */}
      {/* overflow-visible on the section keeps angled splice + margin behaviour with the next block; parallax is clipped inside inner layers only */}
      <section
        ref={heroRef}
        className="about-block about-block--black about-block--angle-bottom about-hero-parallax relative h-screen overflow-visible flex flex-col"
      >
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
          <div
            className="about-parallax-bg about-hero-parallax__bg will-change-transform"
            style={{ transform: `translate3d(0, ${py * PARALLAX.bg}px, 0)` }}
          />
        </div>
        <div className="container mx-auto px-6 flex-1 flex flex-col justify-start pt-8 pb-10 sm:pt-10 sm:pb-12 lg:pt-12 lg:pb-14 relative z-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-start w-full">
            <div className="mt-8 space-y-5 max-w-2xl sm:mt-10 lg:mt-14 xl:mt-20 lg:max-w-none">
              <h1
                className="mb-3 md:mb-4 text-left text-white leading-[0.95]"
                style={{ fontFamily: "var(--font-menu)" }}
              >
                <Reveal show={heroReveal} delayMs={0}>
                  <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal italic text-white/75">
                    everything you
                  </span>
                </Reveal>
                <Reveal show={heroReveal} delayMs={75}>
                  <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal italic text-white/75">
                    need to know
                  </span>
                </Reveal>
                <Reveal show={heroReveal} delayMs={150}>
                  <span className="mt-1 block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold not-italic">
                    ABOUT APX
                  </span>
                </Reveal>
                <Reveal show={heroReveal} delayMs={225}>
                  <span className="block whitespace-nowrap text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold not-italic">
                    FIRE &amp; SECURITY
                  </span>
                </Reveal>
              </h1>
              <Reveal show={heroReveal} delayMs={300}>
                <p className="text-lg sm:text-xl md:text-xl font-normal text-left tracking-tight max-w-xl text-white/90">
                  With over 20 years of experience, APX Fire and Security is a specialist provider of fire and security system installation, commissioning, and maintenance. We support M&amp;E contractors, facility management teams, architects, consultants, and main contractors across commercial, industrial, and public-sector environments.
                </p>
              </Reveal>
            </div>
            <Reveal show={heroReveal} delayMs={200} className="self-start">
              <div className="relative w-full max-w-md mx-auto lg:max-w-none aspect-[3/4] sm:aspect-[4/5] lg:aspect-[5/6] overflow-hidden rounded-2xl shadow-[0_20px_48px_rgba(0,0,0,0.35)]">
                <Image
                  src="/about%20page%20cctv%20camera.png"
                  alt="CCTV camera"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 90vw, 44vw"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Accreditation section (keep white background) */}
      <section className="about-block about-block--white about-section-px pt-20 pb-32 md:pt-24 md:pb-36 lg:pt-28 lg:pb-44">
        <div className="about-section-inner grid grid-cols-1 justify-items-center gap-12 lg:grid-cols-2 lg:items-center lg:justify-items-stretch lg:gap-x-20 lg:gap-y-12 xl:gap-x-28">
          <Reveal>
            <div className="w-full max-w-xl text-center lg:max-w-none lg:text-left">
              <span className="section-label section-label--black mb-4 block leading-none tracking-[0.12em]">Accreditations</span>
              <h2 className="mb-8 text-4xl font-bold leading-tight text-black lg:text-5xl" style={{ fontFamily: "var(--font-menu)" }}>
                Certified Fire &amp; Security Specialists
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-black/80">
                Our engineers are fully trained across all disciplines, ensuring every project is delivered with precision,
                professionalism, and full compliance with relevant British Standards.
              </p>
              <ul className="space-y-3.5 text-black/90">
                <li>• Fully qualified fire &amp; security engineers</li>
                <li>• BAFE, NSI and industry certifications</li>
                <li>• Regular training and compliance updates</li>
              </ul>
            </div>
          </Reveal>
          <div className="grid w-full min-w-0 max-w-md grid-cols-2 justify-items-center gap-3 sm:gap-4 lg:max-w-none">
            {EXPERTISE_ACCRED_LOGOS.map((item, i) => (
              <Reveal key={item.alt} delayMs={i * 70}>
                <Link
                  href={item.href}
                  className="group flex w-full max-w-[210px] items-center justify-center px-5 py-6 transition-opacity hover:opacity-90"
                  aria-label={`Learn more about ${item.alt}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt={item.alt}
                    width={280}
                    height={180}
                    loading="eager"
                    decoding="async"
                    className="h-auto max-h-24 w-full max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.03] sm:max-h-28 lg:max-h-32"
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Brand-led black sections (no canted dividers) */}
      <section className="about-block about-block--black about-section-y about-section-px">
        <div className="about-section-inner space-y-10 md:space-y-12">
          <Reveal>
            <div className="max-w-3xl">
              <span className="section-label mb-4 block text-white/65">Who we support</span>
              <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl" style={{ fontFamily: "var(--font-menu)" }}>
                Delivery-first partner for complex projects
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7 xl:grid-cols-4 xl:gap-8">
            {["M&E contractors", "Facility management teams", "Consultants and architects", "Main contractors"].map((client, i) => (
              <Reveal key={client} delayMs={i * 55}>
                <div className="rounded-2xl border border-white/25 bg-white/[0.06] p-7 text-white backdrop-blur-md md:p-8">
                  <p className="text-lg font-semibold leading-snug">{client}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="about-block about-block--black about-section-y about-section-px">
        <div className="about-section-inner w-full">
          <Reveal>
            <span className="section-label mb-4 block text-white/70">Our commitments</span>
            <h2
              className="mb-10 text-3xl font-bold leading-tight text-white md:mb-12 md:text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-menu)" }}
            >
              Quality, safety &amp; environment
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-9 md:grid-cols-3 md:gap-7 lg:gap-9">
            {ABOUT_COMMITMENTS.map((item, i) => (
              <Reveal key={item.line1} delayMs={i * 85}>
                <div className="text-center">
                  <div className="mx-auto mb-4 flex justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element -- local SVG commitment artwork */}
                    <img
                      src={item.iconSrc}
                      alt={item.iconAlt}
                      className="h-20 w-auto max-w-[5.75rem] object-contain object-center sm:h-24 sm:max-w-[6.5rem] md:max-w-[7rem]"
                    />
                  </div>
                  <p
                    className="text-base font-bold uppercase tracking-[0.12em] text-white"
                    style={{ fontFamily: "var(--font-menu)" }}
                  >
                    {item.line1}
                  </p>
                  <p
                    className="mt-1 text-base uppercase tracking-[0.12em] text-white/85"
                    style={{ fontFamily: "var(--font-menu)" }}
                  >
                    {item.line2}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="about-block about-block--black about-section-y about-section-px">
        <div className="about-section-inner rounded-3xl border border-white/20 bg-white/[0.04] p-8 text-center sm:p-10 lg:p-14 backdrop-blur-md">
          <Reveal>
            <p className="mx-auto max-w-4xl text-2xl font-medium leading-relaxed text-white/90 md:text-3xl lg:text-[2.45rem]">
              &ldquo;We don&apos;t just install systems - we help you stay compliant and keep everyone safe.&rdquo;
            </p>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-3 sm:gap-8">
            {[
              { value: "500+", label: "Projects completed" },
              { value: "99%", label: "Customer satisfaction" },
              { value: "20+", label: "Years experience" },
            ].map((stat, i) => (
              <Reveal key={stat.label} delayMs={i * 90}>
                <div className="rounded-2xl border border-white/20 bg-black/35 p-7 md:p-8">
                  <div className="text-4xl font-bold text-white md:text-5xl">{stat.value}</div>
                  <div className="mt-2 text-sm text-white/70 md:text-base">{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="about-block about-block--black about-section-y about-section-px">
        <div className="about-section-inner">
          <Reveal>
            <span className="section-label mb-4 block text-white/70">Assurance</span>
            <h2 className="mb-10 text-4xl font-bold text-white lg:mb-12 lg:text-5xl" style={{ fontFamily: "var(--font-menu)" }}>
              Quality &amp; Compliance
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-10">
            {["/cctv%20systems.jpg", "/access%20control%20systems.jpg", "/video%20door%20entry%20systems.jpg"].map((src, i) => (
              <Reveal key={src} delayMs={i * 75}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/20">
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${src})` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-10 max-w-2xl text-base leading-relaxed text-white/80 md:mt-12 md:text-lg">
              Comprehensive warranties on all fire and security work. BAFE and industry standards you can trust.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="about-block about-block--black about-section-y about-section-px">
        <div className="about-section-inner rounded-3xl border border-white/25 bg-white/[0.05] px-6 py-12 text-center sm:px-10 md:py-16 backdrop-blur-md">
          <Reveal>
            <h2 className="mb-6 text-4xl font-bold text-white lg:mb-8 lg:text-5xl" style={{ fontFamily: "var(--font-menu)" }}>
              Get in touch
            </h2>
          </Reveal>
          <Reveal delayMs={80}>
            <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
              Ready to discuss your fire safety or security requirements? We&apos;d love to hear from you.
            </p>
          </Reveal>
          <Reveal delayMs={140}>
            <Link
              href="/contact"
              className="inline-flex rounded-xl border border-white bg-white px-10 py-4 text-lg font-semibold text-black transition-colors hover:bg-black hover:text-white"
            >
              Contact us
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
