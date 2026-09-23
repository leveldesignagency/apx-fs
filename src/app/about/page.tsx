"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Reveal } from "@/components/Reveal";
import { FsInsetCtaCard } from "@/components/FsInsetCtaCard";
import { CustomPillButton } from "@/components/ui/CustomPillButton";
import { AboutMeetTeamSection } from "@/components/home/AboutMeetTeamSection";

/** Inline links in heritage / why-choose copy, bold + underline on dark background */
const ABOUT_TEXT_LINK =
  "font-semibold text-white underline decoration-white/40 underline-offset-[3px] transition-colors hover:decoration-white hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 rounded-sm";

/** Inline links on white about sections */
const ABOUT_TEXT_LINK_ON_LIGHT =
  "font-semibold text-black underline decoration-black/35 underline-offset-[3px] transition-colors hover:decoration-black hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/40 rounded-sm";

/** Commitment icons: public/__quality assurance.svg, __health and safety.svg, __environmental.svg */
const ABOUT_COMMITMENTS = [
  { line1: "QUALITY", line2: "ASSURANCE", iconSrc: "/__quality assurance.svg", iconAlt: "Quality assurance" },
  { line1: "HEALTH", line2: "& SAFETY", iconSrc: "/__health and safety.svg", iconAlt: "Health and safety" },
  { line1: "ENVIRONMENTAL", line2: "COMMITMENT", iconSrc: "/__environmental.svg", iconAlt: "Environmental commitment" },
] as const;

/** Full-bleed About hero (fire & security) */
const ABOUT_HERO_BG_SRC = "/About Page Image.jpg";

/** Left image for Join the Team - swap when final asset is ready */
const JOIN_THE_TEAM_IMAGE_SRC = "/Comprehensive Security Systems.jpg";

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
      "We slot into wider MEP programmes with coordinated installs, commissioning packs, and handover documentation that matches your testing strategy, from containment and risers through to integrated fire and security interfaces.",
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
      "Early input on coverage, cause-and-effect, and system architecture so specifications stay buildable. We support RIBA stages, tender reviews, and design-team workshops where fire and security must align with the wider brief.",
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
    standards: "BS 5839-1 · BS 5839-6 (where applicable)",
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
    discipline: "EVAC systems",
    services: "Voice evacuation, PA integration",
    standards: "BS 5839-8",
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

export default function AboutPage() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [heroReveal, setHeroReveal] = useState(false);

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

  return (
    <div className="about-parallax-page about-page-shell">
      {/* Hero, full-viewport background */}
      <section className="about-block about-block--black about-hero-parallax relative flex min-h-[100dvh] flex-col overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <div className="about-parallax-bg about-hero-parallax__bg about-hero-parallax__bg--photo relative">
            <Image
              src={ABOUT_HERO_BG_SRC}
              alt=""
              fill
              priority
              className="about-hero-parallax__photo object-cover object-center"
              sizes="100vw"
            />
          </div>
          <div
            className="absolute inset-0 z-[1] bg-[linear-gradient(100deg,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.62)_38%,rgba(0,0,0,0.28)_62%,rgba(0,0,0,0.35)_100%)]"
            aria-hidden
          />
        </div>
        <div className="container relative z-20 mx-auto flex w-full min-h-0 flex-1 flex-col justify-center px-6 pt-36 pb-14 sm:pt-40 sm:pb-16 lg:pt-44 lg:pb-20">
          <div className="w-full max-w-[52rem] space-y-8 lg:max-w-[56rem]">
            <div className="space-y-4">
              <Reveal show={heroReveal} delayMs={0}>
                <h1
                  className="text-left text-3xl font-bold leading-[1.12] tracking-tight text-white drop-shadow-sm sm:text-4xl md:text-5xl"
                  style={{ fontFamily: "var(--font-menu)" }}
                >
                  About APX Fire &amp; Security
                </h1>
              </Reveal>
              <Reveal show={heroReveal} delayMs={90}>
                <p className="about-hero-mantra max-w-[40rem] text-left text-lg font-medium italic leading-snug tracking-[0.045em] text-white/90 drop-shadow-sm sm:text-xl md:text-[1.35rem] md:leading-snug">
                  Protecting People, Property and Businesses Through Intelligent Fire &amp; Security Solutions
                </p>
              </Reveal>
            </div>
            <Reveal show={heroReveal} delayMs={180}>
              <div className="space-y-4 text-left text-[0.95rem] font-normal leading-relaxed tracking-tight text-white/88 drop-shadow-sm sm:text-base md:space-y-4.5 md:text-[1.05rem] md:leading-[1.65]">
                <p>
                  Building on a heritage dating back to 1986, APX Fire &amp; Security (formerly Smiths Technical Systems Ltd) is a trusted provider of fully integrated fire detection, life safety and electronic security systems across London and the Home Counties.
                </p>
                <p>
                  We specialise in the design, installation, commissioning, maintenance and ongoing support of fire and security solutions, including CCTV, access control, gate automation, monitoring and 24/7 call-outs, delivering reliable systems that protect people, safeguard assets and ensure compliance with the latest British Standards and industry regulations.
                </p>
                <p>
                  Working alongside M&amp;E contractors, principal contractors, developers, consultants, architects, facilities management providers and end users, we have built a reputation for delivering projects safely, professionally and on programme. Our experience spans residential developments, commercial buildings, industrial facilities, education, healthcare and public sector environments.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <AboutMeetTeamSection />

      {/* Join the Team - left image, right large headline + CTA */}
      <section
        id="join-the-team"
        className="about-block about-block--white about-section-y about-section-px border-t border-black/10"
        aria-labelledby="about-join-the-team-heading"
      >
        <div className="about-section-inner overflow-visible">
          <div className="grid grid-cols-1 items-center gap-10 overflow-visible lg:grid-cols-2 lg:gap-14 xl:gap-20">
            <Reveal className="min-w-0 overflow-visible pb-2">
              <div className="about-floating-media about-floating-media--on-light w-full">
                <div className="relative aspect-[4/5] w-full sm:aspect-[5/6] lg:aspect-auto lg:min-h-[28rem] lg:h-full lg:max-h-[36rem]">
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

            <Reveal delayMs={80} className="min-w-0">
              <div className="flex flex-col items-start lg:pl-2">
                <p
                  className="section-label section-label--black mb-4 block tracking-[0.2em]"
                  style={{ fontFamily: "var(--font-menu), sans-serif" }}
                >
                  Careers
                </p>
                <h2
                  id="about-join-the-team-heading"
                  className="about-join-team-title font-title text-5xl font-bold tracking-tight text-black sm:text-6xl lg:text-7xl xl:text-[5.25rem]"
                >
                  Join the
                  <span className="block">team.</span>
                </h2>
                <p className="mt-6 max-w-md text-base leading-relaxed text-black/65 sm:mt-8 sm:text-lg">
                  Open roles for fire and security engineers and office staff. We are a growing company looking for people
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

      {/* Accreditation section (keep white background) */}
      <section className="about-block about-block--white about-section-y about-section-px border-t border-black/10">
        <div className="about-section-inner grid grid-cols-1 justify-items-center gap-12 lg:grid-cols-2 lg:items-center lg:justify-items-stretch lg:gap-x-20 lg:gap-y-12 xl:gap-x-28">
          <Reveal>
            <div className="w-full max-w-xl text-center lg:max-w-none lg:text-left">
              <span className="section-label section-label--black mb-4 block leading-none tracking-[0.12em]">Accreditations &amp; Memberships</span>
              <h2 className="mb-8 text-4xl font-bold leading-tight text-black lg:text-5xl" style={{ fontFamily: "var(--font-menu)" }}>
              Certified Fire &amp; Security Specialists
            </h2>
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

      {/* Who we support - full-bleed image cards with overlay copy */}
      <section className="about-block about-block--black about-section-y about-section-px">
        <div className="about-section-inner space-y-10 md:space-y-12">
          <Reveal>
            <div className="max-w-3xl">
              <span className="section-label mb-3 block text-white/65">Who we support</span>
              <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl" style={{ fontFamily: "var(--font-menu)" }}>
                Delivery-first partner for complex projects
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 pt-2 sm:gap-7 md:grid-cols-2 md:gap-x-8 md:gap-y-8 lg:gap-x-10 lg:gap-y-10">
            {WHO_WE_SUPPORT.map(({ title, description, highlights, imageSrc }, i) => (
              <Reveal key={title} delayMs={i * 55} className="h-full min-h-0">
                <article className="group relative flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-[1.85rem] border border-white/[0.12] shadow-[0_18px_50px_rgba(0,0,0,0.45)] sm:min-h-[24rem]">
                  <Image
                    src={imageSrc}
                    alt=""
                    fill
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    sizes="(min-width: 768px) 45vw, 100vw"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/15"
                    aria-hidden
                  />
                  <div className="relative z-10 flex flex-col gap-4 p-5 sm:p-6 lg:p-7">
                    <h3
                      className="text-2xl font-bold leading-[1.12] tracking-tight text-white sm:text-3xl"
                      style={{ fontFamily: "var(--font-menu)" }}
                    >
                      {title}
                    </h3>
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

      <section className="about-block about-block--black about-section-y about-section-px about-commitments-section">
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
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-16 md:flex-row md:flex-wrap md:justify-center md:gap-x-16 md:gap-y-12 lg:max-w-7xl lg:gap-x-28 xl:gap-x-32">
            {ABOUT_COMMITMENTS.map((item, i) => (
              <Reveal key={item.line1} delayMs={i * 85}>
                <div className="group flex w-full max-w-[12.5rem] flex-col items-center gap-3 text-center sm:max-w-[13rem] md:w-auto md:max-w-none md:shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element -- local SVG commitment artwork */}
                  <img
                    src={item.iconSrc}
                    alt={item.iconAlt}
                    className="h-28 w-auto max-w-[7.5rem] origin-center object-contain object-center transition-transform duration-300 ease-out motion-reduce:transition-none sm:h-32 sm:max-w-[8.75rem] md:h-36 md:max-w-[10rem] motion-safe:group-hover:scale-[1.07]"
                  />
                  <div className="flex flex-col items-center gap-1.5">
                    <p
                      className="text-base font-bold uppercase leading-none tracking-[0.12em] text-white"
                      style={{ fontFamily: "var(--font-menu)" }}
                    >
                      {item.line1}
                    </p>
                    <p
                      className="text-base uppercase leading-none tracking-[0.12em] text-white/85"
                      style={{ fontFamily: "var(--font-menu)" }}
                    >
                      {item.line2}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our story - floating image + copy on black */}
      <section
        id="our-story"
        className="about-block about-block--black about-section-y about-section-px border-t border-white/10"
        aria-labelledby="about-our-story-heading"
      >
        <div className="about-section-inner">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">
            <Reveal className="min-w-0 overflow-visible">
              <div className="about-floating-media about-floating-media--on-dark w-full max-w-xl">
                <div className="relative aspect-[5/4] w-full sm:aspect-[4/3] lg:aspect-[5/4] lg:max-h-[22rem]">
                  <Image
                    src="/projects/library/apx-fire-security-alarm-box.jpg"
                    alt="Fire and security alarm system"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={80} className="min-w-0">
              <div className="flex flex-col items-start lg:pl-2">
                <p
                  className="section-label mb-4 block tracking-[0.2em] text-white/65"
                  style={{ fontFamily: "var(--font-menu), sans-serif" }}
                >
                  Our story
                </p>
                <h2
                  id="about-our-story-heading"
                  className="text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl"
                  style={{ fontFamily: "var(--font-menu)" }}
                >
                  Built on recommendations.
                </h2>
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
          </div>
        </div>
      </section>

      <section
        id="disciplines-and-integration"
        className="about-block about-block--white about-section-y about-section-px border-t border-black/10 !pt-20 sm:!pt-24 lg:!pt-28"
      >
        <div className="about-section-inner max-w-7xl">
          <Reveal>
            <span className="section-label section-label--black mb-4 block">How we work</span>
            <h2
              className="text-2xl font-bold leading-tight text-black md:text-3xl lg:text-4xl"
              style={{ fontFamily: "var(--font-menu)" }}
            >
              Disciplines &amp; integrated delivery
            </h2>
          </Reveal>
          <Reveal delayMs={60}>
            <p className="mt-6 max-w-4xl text-base leading-relaxed text-black/80 md:text-lg">
              APX specialises in integrated fire and security solutions that work across multiple systems. Typical interfaces include fire alarm to access control release,
              CCTV event-triggered recording, intruder alarm signalling to the monitoring station, EVAC coordinated with fire cause-and-effect, and BMS integration, helping
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
              <Link href="/services/evac-voice-evacuation" className={ABOUT_TEXT_LINK_ON_LIGHT}>
                EVAC &amp; voice evacuation
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
                maintenance &amp; support
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
        <CustomPillButton href="tel:02083032280" size="md" variant="outline">
          Call 020 8303 2280
        </CustomPillButton>
      </FsInsetCtaCard>
    </div>
  );
}
