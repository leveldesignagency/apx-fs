"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Reveal } from "@/components/Reveal";
import { LetterReveal } from "@/components/LetterReveal";
import { LineReveal } from "@/components/LineReveal";
import { FsInsetCtaCard } from "@/components/FsInsetCtaCard";
import { CustomPillButton } from "@/components/ui/CustomPillButton";
import { CallPhoneCta } from "@/components/ui/CallPhoneCta";

const ABOUT_HERO_PARAS = [
  "Building on a heritage dating back to 1986, APX Fire & Security (formerly Smiths Technical Systems Ltd) is a trusted provider of fully integrated fire detection, life safety and electronic security systems across London and the Home Counties.",
  "We specialise in the design, installation, commissioning, maintenance and ongoing support of Fire and Security solutions, including CCTV, access control, gate automation, monitoring and 24/7 call-outs, delivering reliable systems that protect people, safeguard assets and ensure compliance with the latest British Standards and industry regulations.",
  "Working alongside M&E contractors, principal contractors, developers, consultants, architects, facilities management providers and end users, we have built a reputation for delivering projects safely, professionally and on programme. Our experience spans residential developments, commercial buildings, industrial facilities, education, healthcare and public sector environments.",
] as const;

/** Inline links in heritage / why-choose copy, bold + underline on dark background */
const ABOUT_TEXT_LINK =
  "font-semibold text-white underline decoration-white/40 underline-offset-[3px] transition-colors hover:decoration-white hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 rounded-sm";

/** Inline links on white about sections */
const ABOUT_TEXT_LINK_ON_LIGHT =
  "font-semibold text-black underline decoration-black/35 underline-offset-[3px] transition-colors hover:decoration-black hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/40 rounded-sm";

/** Commitment cards: transparent icons + photo backgrounds in /public */
const ABOUT_COMMITMENTS = [
  {
    line1: "QUALITY",
    line2: "ASSURANCE",
    iconSrc: "/__quality%20assurance.png",
    iconAlt: "Quality assurance",
    bgSrc: "/quality%20assurance.jpg",
    bgPosition: "center",
    bgSize: "cover",
  },
  {
    line1: "HEALTH",
    line2: "& SAFETY",
    iconSrc: "/__health%20and%20safety.png",
    iconAlt: "Health and safety",
    bgSrc: "/health%20and%20safety.jpg",
    // Subject sits in the right third of a wide frame — crop in on torso/helmet
    bgPosition: "78% 32%",
    bgSize: "175%",
  },
  {
    line1: "ENVIRONMENTAL",
    line2: "COMMITMENT",
    iconSrc: "/__environmental.png",
    iconAlt: "Environmental commitment",
    // Filename spelling as uploaded: "committment"
    bgSrc: "/environmental%20committment.jpg",
    // Sticker is mid-frame, slightly low — cover + bias so it sits centred
    bgPosition: "50% 62%",
    bgSize: "cover",
  },
] as const;

/** Full-bleed About hero (Fire & Security) */
const ABOUT_HERO_BG_SRC = "/About Page Image.jpg";

/** Left image for Join the Team */
const JOIN_THE_TEAM_IMAGE_SRC = "/join%20the%20team%201.png";

/** `public/Who we support/`, filenames must match on disk (spaces / & encoded for URLs). */
const WHO_SUPPORT_DIR = "/Who%20we%20support" as const;

function whoSupportImage(filename: string): string {
  return `${WHO_SUPPORT_DIR}/${encodeURIComponent(filename)}`;
}

/** Public folder uses a space in "accreditations mono", literal paths load reliably in <img> */
const ACC_MONO = "/accreditations mono";
const EXPERTISE_ACCRED_LOGOS = [
  { href: "/accreditations/bafe", src: `${ACC_MONO}/Coloured/BAFE-01.svg`, alt: "BAFE" },
  { href: "/accreditations/nsi", src: `${ACC_MONO}/NSI-01.svg`, alt: "NSI" },
  { href: "/accreditations/constructionline", src: `${ACC_MONO}/Coloured/ConstructionOnline-01.svg`, alt: "Constructionline" },
  { href: "/accreditations/fia", src: `${ACC_MONO}/Coloured/FIA-01.svg`, alt: "FIA" },
] as const;

type WhoWeSupportItem = {
  title: string;
  description: string;
  highlights: string;
  imageSrc: string;
};

const WHO_WE_SUPPORT: WhoWeSupportItem[] = [
  {
    title: "M&E contractors",
    description:
      "We slot into wider MEP programmes with coordinated installs, commissioning packs, and handover documentation that matches your testing strategy, from containment and risers through to integrated Fire and Security interfaces.",
    highlights: "Integrated delivery · Commissioning & O&M",
    imageSrc: whoSupportImage("Consultants and architects.jpg"),
  },
  {
    title: "Facility management teams",
    description:
      "Ongoing maintenance, upgrades, and clear records for multi-site portfolios. We help keep systems compliant, minimise downtime, and plan lifecycle replacements without surprises for building users.",
    highlights: "Planned maintenance · Emergency response",
    imageSrc: whoSupportImage("Facility management teams.jpg"),
  },
  {
    title: "Consultants and architects",
    description:
      "Early input on coverage, cause-and-effect, and system architecture so specifications stay buildable. We support RIBA stages, tender reviews, and design-team workshops where Fire and Security must align with the wider brief.",
    highlights: "Design stages · Specification support",
    imageSrc: whoSupportImage("M&E contractors.jpg"),
  },
  {
    title: "Main contractors",
    description:
      "Programme-led delivery with disciplined site coordination, clear interfaces with other trades, and predictable milestones from first fix to client handover, including the documentation package your package needs to close out.",
    highlights: "Site coordination · Handover packages",
    imageSrc: whoSupportImage("Main contractors.jpg"),
  },
];

const DISCIPLINES_INTEGRATION_ROWS = [
  {
    discipline: "Fire alarms",
    services: "Addressable, conventional, commissioning, cause-and-effect",
    standards: "BS 5839-1",
  },
  {
    discipline: "CCTV",
    services: "IP/analogue, monitoring, ANPR, networking",
    standards: "BS EN 62676",
  },
  {
    discipline: "Intruder alarms",
    services: "Grade 2-3, monitoring, sensors, integration",
    standards: "BS EN 50131 · PD 6662",
  },
  {
    discipline: "Refuge, fire telephone & toilet alarms",
    services: "EVC, disabled refuge, fire telephones, toilet alarms, central panels",
    standards: "BS 5839-9",
  },
  {
    discipline: "PAVA systems",
    services: "Public address & voice alarm, BS 5839-8",
    standards: "BS 5839-8",
  },
  {
    discipline: "EVAC systems",
    services: "Evacuation alert for buildings containing flats",
    standards: "BS 8629",
  },
  {
    discipline: "Video entry",
    services: "Multi-tenant, access control, networked systems",
    standards: "BS EN 60839",
  },
  {
    discipline: "Gate automation",
    services: "Vehicle gates, barriers, access integration",
    standards: "BS EN 12453 · manufacturer",
  },
  {
    discipline: "Monitoring & call-out",
    services: "ARC signalling, remote monitoring, 24/7 call-out",
    standards: "NSI · ARC pathways",
  },
  {
    discipline: "Maintenance",
    services: "PPM, 24/7 support, compliance testing",
    standards: "BS 5839 maintenance · manufacturer · NSI",
  },
] as const;

const HERITAGE_YEAR_START = 1986;
const HERITAGE_YEAR_END = 2026;

export default function AboutPage() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [heroReveal, setHeroReveal] = useState(false);
  const [heritageYear, setHeritageYear] = useState(HERITAGE_YEAR_START);
  const heritageYearTrackRef = useRef<HTMLDivElement>(null);

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
    document.documentElement.classList.add("about-page-active");
    return () => document.documentElement.classList.remove("about-page-active");
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setHeritageYear(HERITAGE_YEAR_END);
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const track = heritageYearTrackRef.current;
      if (!track) return;
      const trackTop = window.scrollY + track.getBoundingClientRect().top;
      const start = trackTop - window.innerHeight * 0.65;
      /* Completes over ~1.5 viewports so the count is visible while the year is on screen */
      const span = window.innerHeight * 0.75;
      const t = Math.min(1, Math.max(0, (window.scrollY - start) / span));
      const eased = t * t * (3 - 2 * t);
      const next = Math.round(
        HERITAGE_YEAR_START + (HERITAGE_YEAR_END - HERITAGE_YEAR_START) * eased
      );
      setHeritageYear((prev) => (prev === next ? prev : next));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  return (
    <div className="about-parallax-page about-page-shell">
      {/* Hero: photo holds title + mantra; body copy lands in the black feather below */}
      <section
        className="about-block about-block--black about-hero-blend about-hero-parallax relative overflow-hidden"
        aria-label="About APX Fire and Security"
      >
        <div className="about-hero-blend__media pointer-events-none absolute inset-x-0 top-0 z-0" aria-hidden>
          <div className="about-parallax-bg about-hero-parallax__bg about-hero-parallax__bg--photo relative h-full w-full">
            <Image
              src={ABOUT_HERO_BG_SRC}
              alt=""
              fill
              priority
              className="about-hero-parallax__photo object-cover object-[72%_center] sm:object-[68%_center] lg:object-[62%_center]"
              sizes="100vw"
            />
          </div>
          <div className="about-hero-blend__shade" />
          <div className="about-hero-blend__feather" />
        </div>

        <div className="about-hero-blend__content about-section-px relative z-20 mx-auto w-full">
          <div className="about-hero-blend__lead about-section-inner">
            <Reveal show={heroReveal} delayMs={0}>
              <p
                className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/55 sm:mb-5 sm:text-xs"
                style={{ fontFamily: "var(--font-menu)" }}
              >
                Est. 2025
              </p>
            </Reveal>
            <Reveal show={heroReveal} delayMs={40}>
              <LetterReveal
                as="h1"
                text={"About\nAPX Fire & Security"}
                className="about-hero-blend__title text-left font-bold tracking-tight text-white drop-shadow-sm [font-family:var(--font-menu)]"
                active={heroReveal}
                delayMs={40}
                desktopOnly={false}
              />
            </Reveal>
            <Reveal show={heroReveal} delayMs={110}>
              <p className="about-hero-mantra mt-5 max-w-3xl text-left text-base font-medium italic leading-snug tracking-[0.04em] text-white/88 drop-shadow-sm sm:mt-6 sm:text-lg md:text-xl md:leading-snug">
                Protecting People, Property and Businesses Through
                <br />
                Intelligent Fire &amp; Security Solutions
              </p>
            </Reveal>
          </div>

          <div
            ref={heritageYearTrackRef}
            className="about-hero-blend__body about-section-inner"
          >
            <div
              className={`about-hero-blend__rule h-px w-14 bg-white/30 transition-opacity duration-700 ${
                heroReveal ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden
            />
            <div className="about-hero-blend__copy mt-8 grid gap-8 sm:mt-10 lg:mt-12 lg:grid-cols-[12.5rem_minmax(0,1fr)] lg:items-start lg:gap-x-12 xl:grid-cols-[14rem_minmax(0,1fr)] xl:gap-x-14">
              <Reveal show={heroReveal} delayMs={180} className="about-hero-blend__year-slot hidden lg:block">
                <p
                  className="about-hero-blend__year select-none font-bold leading-none text-white/[0.08]"
                  style={{ fontFamily: "var(--font-menu)" }}
                  aria-hidden
                >
                  {heritageYear}
                </p>
              </Reveal>
              <div className="min-w-0 max-w-5xl space-y-5 sm:space-y-6 xl:max-w-6xl">
                {ABOUT_HERO_PARAS.map((para, i) => (
                  <LineReveal
                    key={i}
                    as="p"
                    text={para}
                    className="relative text-[0.95rem] font-normal leading-relaxed tracking-tight text-white/82 sm:text-base md:text-[1.05rem] md:leading-[1.7]"
                    delayMs={240 + i * 150}
                    staggerMs={48}
                    active={heroReveal}
                    desktopOnly={false}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who we support - full-bleed image cards with overlay copy */}
      <section className="about-block about-block--black about-section-y about-section-px">
        <div className="about-section-inner space-y-10 md:space-y-12">
          <Reveal>
            <div className="max-w-3xl">
              <span className="section-label mb-3 block text-white/65">Who We Support</span>
              <LetterReveal
                as="h2"
                text={"Delivery-first partner\nfor complex projects"}
                className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl [font-family:var(--font-menu)]"
                desktopOnly={false}
              />
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 pt-2 sm:gap-7 md:grid-cols-2 md:gap-x-8 md:gap-y-8 lg:gap-x-10 lg:gap-y-10">
            {WHO_WE_SUPPORT.map(({ title, description, highlights, imageSrc }, i) => (
              <Reveal key={title} delayMs={i * 55} className="h-full min-h-0">
                <article className="group relative flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-[1.85rem] border border-white/[0.12] shadow-[0_18px_50px_rgba(0,0,0,0.45)] sm:min-h-[24rem]">
                  <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
                    <Image
                      src={imageSrc}
                      alt=""
                      fill
                      className="scale-110 object-cover object-center transition-transform duration-700 ease-out motion-reduce:transition-none motion-safe:group-hover:scale-100"
                      sizes="(min-width: 768px) 45vw, 100vw"
                    />
                  </div>
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/25"
                    aria-hidden
                  />
                  <div className="relative z-10 flex origin-bottom-left flex-col gap-4 p-5 transition-transform duration-500 ease-out motion-reduce:transition-none motion-safe:group-hover:scale-[1.03] sm:p-6 lg:p-7">
                    <LetterReveal
                      as="h3"
                      text={title}
                      className="text-2xl font-bold leading-[1.12] tracking-tight text-white sm:text-3xl [font-family:var(--font-menu)]"
                      delayMs={i * 40}
                      desktopOnly={false}
                    />
                    <p className="max-w-xl text-sm leading-relaxed text-white/90 sm:text-[0.9375rem]">
                      {description}
                    </p>
                    <div className="inline-flex w-fit max-w-full rounded-2xl bg-white px-3 py-2 shadow-[0_12px_36px_rgba(0,0,0,0.25)] sm:px-3.5 sm:py-2.5">
                      <p className="whitespace-nowrap text-[0.58rem] font-semibold uppercase leading-none tracking-[0.08em] text-black/88 sm:text-[0.625rem]">
                        {highlights}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Commitments — full-width icon row, labels centred under each shield */}
      <section className="about-block about-block--black about-section-y about-section-px about-commitments-section relative z-[1] overflow-visible">
        <div className="about-section-inner w-full">
          <Reveal>
            <span className="section-label mb-4 block text-white/70">Our Commitments</span>
            <LetterReveal
              as="h2"
              text="Quality, safety & environment"
              className="mb-10 max-w-3xl text-3xl font-bold leading-tight text-white md:mb-12 md:text-4xl lg:text-5xl [font-family:var(--font-menu)]"
              desktopOnly={false}
            />
          </Reveal>
          <div className="about-commitments-icons grid w-full grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-5 md:gap-6 lg:gap-8">
            {ABOUT_COMMITMENTS.map((item, i) => (
              <Reveal key={item.line1} delayMs={i * 85} className="w-full">
                <article className="group relative flex min-h-[18rem] w-full flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/15 px-6 py-10 text-center sm:min-h-[20rem] sm:px-5 sm:py-12 md:min-h-[22rem] md:rounded-[1.75rem]">
                  <div
                    className="pointer-events-none absolute inset-[-12%] scale-110 transition-transform duration-700 ease-out motion-safe:group-hover:scale-100"
                    style={{
                      backgroundImage: `url('${item.bgSrc}')`,
                      backgroundPosition: item.bgPosition,
                      backgroundSize: item.bgSize,
                      backgroundRepeat: "no-repeat",
                    }}
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-[var(--page-bg)]/75"
                    aria-hidden
                  />
                  <div className="relative z-[1] flex origin-center flex-col items-center gap-5 transition-transform duration-500 ease-out motion-reduce:transition-none motion-safe:group-hover:scale-[1.05] sm:gap-6">
                    {/* eslint-disable-next-line @next/next/no-img-element -- local commitment artwork */}
                    <img
                      src={item.iconSrc}
                      alt={item.iconAlt}
                      className="h-28 w-auto max-w-[8rem] object-contain sm:h-32 sm:max-w-[9rem] md:h-36 md:max-w-[10rem]"
                    />
                    <div className="flex flex-col items-center gap-1.5">
                      <p
                        className="text-sm font-bold uppercase leading-none tracking-[0.14em] text-white sm:text-base"
                        style={{ fontFamily: "var(--font-menu)" }}
                      >
                        {item.line1}
                      </p>
                      <p
                        className="text-sm uppercase leading-none tracking-[0.14em] text-white/85 sm:text-base"
                        style={{ fontFamily: "var(--font-menu)" }}
                      >
                        {item.line2}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our story — copy left, image right */}
      <section
        id="our-story"
        className="about-block about-block--black about-section-y about-section-px relative z-[1] overflow-visible"
        aria-labelledby="about-our-story-heading"
      >
        <div className="about-section-inner">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">
            <Reveal className="min-w-0">
              <div className="flex flex-col items-start">
                <p
                  className="section-label mb-4 block tracking-[0.2em] text-white/65"
                  style={{ fontFamily: "var(--font-menu), sans-serif" }}
                >
                  Our story
                </p>
                <LetterReveal
                  as="h2"
                  id="about-our-story-heading"
                  text="Built on recommendations."
                  className="text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl [font-family:var(--font-menu)]"
                  desktopOnly={false}
                />
                <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
                  Founded as Smiths Technical Systems in 1986, APX designs, installs and maintains{" "}
                  <Link href="/services" className={ABOUT_TEXT_LINK}>
                    fire, life-safety and security systems
                  </Link>{" "}
                  across London and the Home Counties. Strong{" "}
                  <Link href="/services/maintenance-support" className={ABOUT_TEXT_LINK}>
                    after-sales service
                  </Link>{" "}
                  and trained installers keep us trusted on commercial, residential and public-sector projects of every size.
                </p>
              </div>
            </Reveal>

            <Reveal delayMs={80} className="about-our-story-media min-w-0">
              <div className="about-floating-media about-floating-media--on-dark group w-full">
                <div className="relative aspect-[5/4] w-full sm:aspect-[4/3] lg:aspect-[5/4] lg:min-h-[22rem] lg:max-h-[28rem]">
                  <Image
                    src="/projects/library/apx-fire-security-alarm-box.jpg"
                    alt="Fire and Security alarm system"
                    fill
                    className="object-cover object-center transition-transform duration-700 ease-out motion-reduce:transition-none motion-safe:group-hover:scale-[1.05]"
                    sizes="(max-width: 1024px) 100vw, 48vw"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Join the Team — image left overlaps Our Story a little */}
      <section
        id="join-the-team"
        className="about-block about-block--white about-section-y about-section-px relative z-[3] overflow-visible"
        aria-labelledby="about-join-the-team-heading"
      >
        <div className="about-section-inner overflow-visible">
          <div className="about-join-grid grid grid-cols-1 items-start gap-10 overflow-visible lg:grid-cols-2 lg:items-end lg:gap-14 xl:gap-20">
            <Reveal className="about-careers-media min-w-0 overflow-visible">
              <div className="about-floating-media about-floating-media--on-light w-full">
                <div className="relative aspect-[4/5] w-full sm:aspect-[5/6] lg:aspect-[4/5] lg:min-h-[34rem] lg:max-h-[42rem]">
                  <Image
                    src={JOIN_THE_TEAM_IMAGE_SRC}
                    alt="APX Fire and Security team at work"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 48vw"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={80} className="about-careers-copy min-w-0 lg:pb-1">
              <div className="flex flex-col items-start lg:pl-2">
                <p
                  className="section-label section-label--black mb-4 block tracking-[0.2em]"
                  style={{ fontFamily: "var(--font-menu), sans-serif" }}
                >
                  Careers
                </p>
                <LetterReveal
                  as="h2"
                  id="about-join-the-team-heading"
                  text={"Join the\nteam."}
                  className="about-join-team-title font-title text-5xl font-bold tracking-tight text-black sm:text-6xl lg:text-7xl xl:text-[5.25rem]"
                  desktopOnly={false}
                />
                <p className="mt-6 max-w-md text-base leading-relaxed text-black/65 sm:mt-8 sm:text-lg">
                  Open roles for Fire and Security engineers and office staff. We are a growing company looking for people
                  who want to build a long-term career with us across London and the Home Counties.
                </p>
                <div className="mt-8 sm:mt-10">
                  <CustomPillButton href="/careers" size="md" variant="onLight">
                    Go to careers
                  </CustomPillButton>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Accreditations — after Careers */}
      <section className="about-block about-block--white about-section-y about-section-px border-t border-black/10 !pb-24 sm:!pb-28 lg:!pb-36">
        <div className="about-section-inner grid grid-cols-1 justify-items-center gap-12 lg:grid-cols-2 lg:items-center lg:justify-items-stretch lg:gap-x-20 lg:gap-y-12 xl:gap-x-28">
          <Reveal>
            <div className="w-full max-w-xl text-center lg:max-w-none lg:text-left">
              <span className="section-label section-label--black mb-4 block leading-none tracking-[0.12em]">Accreditations &amp; Memberships</span>
              <LetterReveal
                as="h2"
                text="Certified Fire & Security Specialists"
                className="mb-8 text-4xl font-bold leading-tight text-black lg:text-5xl [font-family:var(--font-menu)]"
                desktopOnly={false}
              />
              <p className="mb-8 text-lg leading-relaxed text-black/80">
                Our engineers are fully trained across all disciplines, ensuring every project is delivered with precision,
                professionalism, and full compliance with relevant British Standards.
              </p>
              <ul className="space-y-3.5 text-black/90">
                <li>• Fully qualified fire &amp; security engineers</li>
                <li>• NSI Gold (security and fire), BAFE Registered services, Constructionline Gold, FIA Full Membership and ISO 9001 certification</li>
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
                    loading="lazy"
                    decoding="async"
                    className="h-auto max-h-24 w-full max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.03] sm:max-h-28 lg:max-h-32"
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="disciplines-and-integration"
        className="about-block about-block--white about-section-y about-section-px border-t border-black/10 !pt-20 sm:!pt-24 lg:!pt-28"
      >
        <div className="about-section-inner max-w-7xl">
          <Reveal>
            <span className="section-label section-label--black mb-4 block">How We Work</span>
            <LetterReveal
              as="h2"
              text="Disciplines & integrated delivery"
              className="text-2xl font-bold leading-tight text-black md:text-3xl lg:text-4xl [font-family:var(--font-menu)]"
              desktopOnly={false}
            />
          </Reveal>
          <Reveal delayMs={60}>
            <p className="mt-6 max-w-4xl text-base leading-relaxed text-black/80 md:text-lg">
              APX specialises in integrated Fire and Security solutions that work across multiple systems. Typical interfaces include fire alarm to access control release,
              CCTV event-triggered recording, intruder alarm signalling to the monitoring station, PAVA coordinated with fire cause-and-effect, and BMS integration, helping
              reduce false alarms, improve site security, streamline building management and support emergency response.
            </p>
          </Reveal>
          <Reveal delayMs={100}>
            <div className="apx-site-table mt-10 overflow-x-auto rounded-tl-xl rounded-br-xl border border-black/12">
              <table className="w-full min-w-[min(100%,720px)] text-left text-sm text-black/85 md:min-w-[860px] md:text-base">
                <thead>
                  <tr className="border-b border-black/12">
                    <th scope="col" className="w-[18%] px-4 py-3 font-title text-xs font-semibold uppercase tracking-[0.12em] text-black/45">
                      Discipline
                    </th>
                    <th scope="col" className="px-4 py-3 font-title text-xs font-semibold uppercase tracking-[0.12em] text-black/45">
                      Services included
                    </th>
                    <th scope="col" className="w-[28%] px-4 py-3 font-title text-xs font-semibold uppercase tracking-[0.12em] text-black/45">
                      Standards (typical)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.08]">
                  {DISCIPLINES_INTEGRATION_ROWS.map((row) => (
                    <tr key={row.discipline} className="apx-site-table__row align-top">
                      <td className="px-4 py-3.5 font-medium text-black">{row.discipline}</td>
                      <td className="px-4 py-3.5 text-black/75">{row.services}</td>
                      <td className="px-4 py-3.5 text-sm text-black/65 md:text-[0.9375rem]">{row.standards}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <Reveal delayMs={140}>
            <p className="mt-8 text-sm leading-relaxed text-black/65 md:text-base">
              For dedicated capability lists, standards and deliverables, browse the{" "}
              <Link href="/services" className={ABOUT_TEXT_LINK_ON_LIGHT}>
                services hub
              </Link>, including{" "}
              <Link href="/services/fire-alarm-systems" className={ABOUT_TEXT_LINK_ON_LIGHT}>
                fire alarms
              </Link>
              ,{" "}
              <Link href="/services/refuge-disabled-communication" className={ABOUT_TEXT_LINK_ON_LIGHT}>
                disabled refuge, fire telephone &amp; toilet alarm systems
              </Link>
              ,{" "}
              <Link href="/services/pava" className={ABOUT_TEXT_LINK_ON_LIGHT}>
                PAVA
              </Link>
              ,{" "}
              <Link href="/services/evac" className={ABOUT_TEXT_LINK_ON_LIGHT}>
                EVAC
              </Link>
              ,{" "}
              <Link href="/services/security-systems" className={ABOUT_TEXT_LINK_ON_LIGHT}>
                security systems
              </Link>
              ,{" "}
              <Link href="/services/gate-automation-systems" className={ABOUT_TEXT_LINK_ON_LIGHT}>
                gate automation
              </Link>{" "}
              and{" "}
              <Link href="/services/maintenance-support" className={ABOUT_TEXT_LINK_ON_LIGHT}>
                maintenance &amp; repairs
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <FsInsetCtaCard
        variant="dark-card"
        backgroundImageSrc={ABOUT_HERO_BG_SRC}
        headingId="about-contact-cta-heading"
        headline="Get in"
        headlineAccent="touch."
        description="Ready to discuss your fire safety or security requirements? We would love to hear from you."
      >
        <CustomPillButton href="/contact" size="md">
          Contact us
        </CustomPillButton>
        <CallPhoneCta size="md" />
      </FsInsetCtaCard>
    </div>
  );
}
