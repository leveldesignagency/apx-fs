"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Building2, DraftingCompass, HardHat, Wrench, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { CustomPillButton } from "@/components/ui/CustomPillButton";
import { FS_SERVICE_SHIMMER_CARD } from "@/lib/fsServicePageCards";

/** Inline links in heritage / why-choose copy — bold + underline on dark background */
const ABOUT_TEXT_LINK =
  "font-semibold text-white underline decoration-white/40 underline-offset-[3px] transition-colors hover:decoration-white hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 rounded-sm";

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

type WhoWeSupportItem = {
  title: string;
  description: string;
  highlights: string;
  Icon: LucideIcon;
};

const WHO_WE_SUPPORT: WhoWeSupportItem[] = [
  {
    title: "M&E contractors",
    description:
      "We slot into wider MEP programmes with coordinated installs, commissioning packs, and handover documentation that matches your testing strategy — from containment and risers through to integrated fire and security interfaces.",
    highlights: "Integrated delivery · Commissioning & O&M",
    Icon: Wrench,
  },
  {
    title: "Facility management teams",
    description:
      "Ongoing maintenance, upgrades, and clear records for multi-site portfolios. We help keep systems compliant, minimise downtime, and plan lifecycle replacements without surprises for building users.",
    highlights: "Planned maintenance · Emergency response",
    Icon: Building2,
  },
  {
    title: "Consultants and architects",
    description:
      "Early input on coverage, cause-and-effect, and system architecture so specifications stay buildable. We support RIBA stages, tender reviews, and design-team workshops where fire and security must align with the wider brief.",
    highlights: "Design stages · Specification support",
    Icon: DraftingCompass,
  },
  {
    title: "Main contractors",
    description:
      "Programme-led delivery with disciplined site coordination, clear interfaces with other trades, and predictable milestones from first fix to client handover — including the documentation package your package needs to close out.",
    highlights: "Site coordination · Handover packages",
    Icon: HardHat,
  },
];

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
        className="about-block about-block--black about-block--angle-bottom about-hero-parallax relative flex min-h-screen min-h-[100svh] flex-col overflow-visible"
      >
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
          <div
            className="about-parallax-bg about-hero-parallax__bg will-change-transform"
            style={{ transform: `translate3d(0, ${py * PARALLAX.bg}px, 0)` }}
          />
        </div>
        <div className="container mx-auto px-6 flex-1 flex flex-col justify-start pt-20 pb-10 sm:pt-24 sm:pb-12 lg:pt-28 lg:pb-14 xl:pt-32 relative z-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-start w-full">
            <div className="mt-10 space-y-5 max-w-2xl sm:mt-12 lg:mt-16 xl:mt-24 lg:max-w-none">
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
          <div className="grid grid-cols-1 gap-y-12 gap-x-6 pt-6 md:grid-cols-2 md:gap-x-7 md:gap-y-14 xl:grid-cols-4 xl:gap-x-8">
            {WHO_WE_SUPPORT.map(({ title, description, highlights, Icon }, i) => (
              <Reveal key={title} delayMs={i * 55}>
                <div className="flex h-full flex-col items-center">
                  <div
                    className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/25 bg-black shadow-[0_8px_28px_rgba(0,0,0,0.55)]"
                    aria-hidden
                  >
                    <Icon className="h-7 w-7 shrink-0 text-white/90" strokeWidth={1.5} />
                  </div>
                  <article
                    className={`${FS_SERVICE_SHIMMER_CARD} -mt-7 flex w-full min-w-0 flex-1 flex-col px-6 pb-6 pt-11 text-center md:px-7 md:pb-7 md:pt-12`}
                  >
                    <h3 className="text-lg font-semibold leading-snug text-white md:text-xl">{title}</h3>
                    <p className="mb-5 mt-3 flex-1 text-left text-sm leading-relaxed text-white/80 md:mt-4 md:text-[0.9375rem]">
                      {description}
                    </p>
                    <p className="border-t border-white/10 pt-4 text-center text-xs font-medium uppercase tracking-[0.14em] text-white/55">
                      {highlights}
                    </p>
                  </article>
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

      <section className="about-block about-block--black about-section-y about-section-px !pb-[clamp(4.5rem,11vw,8.5rem)]">
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

      {/* Heritage & quality — half-width imagery + long-form copy (above Assurance) */}
      <section className="about-block about-block--black overflow-hidden border-t border-white/10">
        <div className="grid min-h-0 grid-cols-1 items-stretch lg:grid-cols-2 lg:min-h-[min(100svh,920px)]">
          <Reveal className="h-full min-h-[50vh]">
            <div className="relative h-full min-h-[50vh] border-b border-white/10 lg:min-h-full lg:border-b-0 lg:border-r lg:border-white/10">
              <Image
                src="/projects/library/apx-fire-security-alarm-box.jpg"
                alt="Fire and security alarm system"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/25 lg:to-black/35"
                aria-hidden
              />
            </div>
          </Reveal>
          <div className="about-section-inner flex h-full min-h-0 flex-col justify-center px-6 py-12 sm:px-8 lg:max-w-none lg:min-h-0 lg:py-12 lg:pl-12 lg:pr-10 xl:pl-16 xl:pr-14">
            <Reveal>
              <p className="text-base leading-relaxed text-white/85 md:text-lg">
                Since 1986 APX Fire &amp; Security have specialised in the design, installation and maintenance of high quality{" "}
                <Link href="/services" className={ABOUT_TEXT_LINK}>
                  security systems
                </Link>{" "}
                to London and the Home Counties. The quality of our work and our excellent{" "}
                <Link href="/services/maintenance-support" className={ABOUT_TEXT_LINK}>
                  after-sales service
                </Link>{" "}
                has allowed us to build the business on recommendations alone. We have achieved{" "}
                <Link href="/accreditations/nsi" className={ABOUT_TEXT_LINK}>
                  NSI Gold
                </Link>{" "}
                accreditation and are fully accredited to{" "}
                <Link href="/accreditations/bafe" className={ABOUT_TEXT_LINK}>
                  BAFE
                </Link>{" "}
                and{" "}
                <Link href="/accreditations/fia" className={ABOUT_TEXT_LINK}>
                  FIA
                </Link>{" "}
                for our customers&apos; peace of mind.
              </p>
            </Reveal>
            <Reveal delayMs={60}>
              <h2
                className="mt-10 text-2xl font-bold leading-tight text-white md:mt-12 md:text-3xl"
                style={{ fontFamily: "var(--font-menu)" }}
              >
                Recognition of Quality and Service
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/82 md:text-lg">
                APX has been chosen by hundreds of householders and private businesses throughout the UK. We have a vast amount of experience, designing and installing{" "}
                <Link href="/services" className={ABOUT_TEXT_LINK}>
                  security and safety systems
                </Link>{" "}
                of all sizes and our{" "}
                <Link href="/accreditations" className={ABOUT_TEXT_LINK}>
                  accreditations
                </Link>{" "}
                reflect the level of quality and professionalism we offer.
              </p>
            </Reveal>
            <Reveal delayMs={100}>
              <p className="mt-6 text-base leading-relaxed text-white/82 md:mt-8 md:text-lg">
                We are proud to meet the high standards of{" "}
                <Link href="/accreditations/nsi" className={ABOUT_TEXT_LINK}>
                  NSI Gold
                </Link>{" "}
                accreditation which is the ultimate hallmark of excellence for providers of{" "}
                <Link href="/services" className={ABOUT_TEXT_LINK}>
                  security and fire safety services
                </Link>
                . Our commitment to adhering to the{" "}
                <Link href="/accreditations" className={ABOUT_TEXT_LINK}>
                  BS EN ISO 9001:2015
                </Link>{" "}
                quality management system has made us a preferred installer of{" "}
                <Link href="/services/sustainability" className={ABOUT_TEXT_LINK}>
                  intruder alarms
                </Link>
                ,{" "}
                <Link href="/services/electrical-systems" className={ABOUT_TEXT_LINK}>
                  CCTV
                </Link>
                ,{" "}
                <Link href="/services/energy-efficiency" className={ABOUT_TEXT_LINK}>
                  access control
                </Link>
                ,{" "}
                <Link href="/services/mechanical-engineering" className={ABOUT_TEXT_LINK}>
                  fire alarms
                </Link>{" "}
                and{" "}
                <Link href="/services/maintenance" className={ABOUT_TEXT_LINK}>
                  video entry systems
                </Link>
                .
              </p>
            </Reveal>
            <Reveal delayMs={140}>
              <p className="mt-6 text-base leading-relaxed text-white/82 md:text-lg">
                With technology constantly evolving in all areas of{" "}
                <Link href="/services/security-systems" className={ABOUT_TEXT_LINK}>
                  security
                </Link>
                , we ensure that our installers are regularly trained to maintain the highest levels of skills and product knowledge. Our customers can trust us to deliver
                their requirements.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section
        id="disciplines-and-integration"
        className="about-block about-block--black about-section-y about-section-px border-t border-white/10"
      >
        <div className="about-section-inner max-w-5xl">
          <Reveal>
            <span className="section-label mb-4 block text-white/70">How we work</span>
            <h2
              className="text-2xl font-bold leading-tight text-white md:text-3xl lg:text-4xl"
              style={{ fontFamily: "var(--font-menu)" }}
            >
              Disciplines &amp; integrated delivery
            </h2>
          </Reveal>
          <Reveal delayMs={60}>
            <p className="mt-6 text-base leading-relaxed text-white/82 md:text-lg">
              APX specialises in integrated fire and security solutions that work across multiple systems. Typical interfaces include fire alarm to access control release,
              CCTV event-triggered recording, intruder alarm signalling to the monitoring station, EVAC coordinated with fire cause-and-effect, and BMS integration — helping
              reduce false alarms, improve site security, streamline building management and support emergency response.
            </p>
          </Reveal>
          <Reveal delayMs={100}>
            <div className="mt-10 overflow-x-auto rounded-2xl border border-white/15 bg-black/35">
              <table className="w-full min-w-[min(100%,560px)] text-left text-sm text-white/88 md:text-base">
                <thead>
                  <tr className="border-b border-white/15 bg-white/[0.04]">
                    <th scope="col" className="px-4 py-3 font-title font-semibold tracking-tight">
                      Discipline
                    </th>
                    <th scope="col" className="px-4 py-3 font-title font-semibold tracking-tight">
                      Services included
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {(
                    [
                      ["Fire alarms", "Addressable, conventional, commissioning, cause-and-effect"],
                      ["CCTV", "IP/analogue, monitoring, ANPR, networking"],
                      ["Intruder alarms", "Grade 2–3, monitoring, sensors, integration"],
                      ["Refuge systems", "EVC, disabled refuge, fire telephones"],
                      ["EVAC systems", "Voice evacuation, PA integration"],
                      ["Video entry", "Multi-tenant, access control, networked systems"],
                      ["Maintenance", "PPM, 24/7 support, compliance testing"],
                    ] as const
                  ).map(([discipline, services]) => (
                    <tr key={discipline}>
                      <td className="px-4 py-3 align-top font-medium text-white">{discipline}</td>
                      <td className="px-4 py-3 text-white/80">{services}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <Reveal delayMs={140}>
            <p className="mt-8 text-sm leading-relaxed text-white/65 md:text-base">
              For dedicated capability lists, standards and deliverables, browse the{" "}
              <Link href="/services" className={ABOUT_TEXT_LINK}>
                services hub
              </Link>{" "}
              — including{" "}
              <Link href="/services/fire-life-safety" className={ABOUT_TEXT_LINK}>
                fire &amp; life safety
              </Link>
              ,{" "}
              <Link href="/services/refuge-disabled-communication" className={ABOUT_TEXT_LINK}>
                refuge &amp; disabled communication
              </Link>
              ,{" "}
              <Link href="/services/evac-voice-evacuation" className={ABOUT_TEXT_LINK}>
                EVAC &amp; voice evacuation
              </Link>
              ,{" "}
              <Link href="/services/security-systems" className={ABOUT_TEXT_LINK}>
                security systems
              </Link>{" "}
              and{" "}
              <Link href="/services/maintenance-support" className={ABOUT_TEXT_LINK}>
                maintenance &amp; support
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <section className="about-block about-block--black about-section-y about-section-px border-t border-white/10">
        <div className="about-section-inner max-w-4xl">
          <Reveal>
            <h2 className="text-2xl font-bold leading-tight text-white md:text-3xl lg:text-4xl" style={{ fontFamily: "var(--font-menu)" }}>
              Why choose APX Fire &amp; Security?
            </h2>
          </Reveal>
          <Reveal delayMs={60}>
            <p className="mt-6 text-base leading-relaxed text-white/82 md:mt-8 md:text-lg">
              APX Fire &amp; Security have been providing bespoke high quality integrated{" "}
              <Link href="/services" className={ABOUT_TEXT_LINK}>
                security systems
              </Link>{" "}
              to London and the Home Counties since 1986. Our knowledge and years of experience means that we can offer advice in all aspects of security, from small
              domestic systems through to large-scale{" "}
              <Link href="/services" className={ABOUT_TEXT_LINK}>
                commercial installations
              </Link>
              .
            </p>
          </Reveal>
          <Reveal delayMs={100}>
            <p className="mt-6 text-base leading-relaxed text-white/82 md:text-lg">
              Our service commitment and reliable{" "}
              <Link href="/services/maintenance-support" className={ABOUT_TEXT_LINK}>
                after-sales support
              </Link>{" "}
              provide an unrivalled service within the{" "}
              <Link href="/services" className={ABOUT_TEXT_LINK}>
                security systems industry
              </Link>{" "}
              and by adopting a customer-centred approach to our work within both the{" "}
              <Link href="/services/cctv/domestic" className={ABOUT_TEXT_LINK}>
                domestic
              </Link>{" "}
              and{" "}
              <Link href="/services/cctv/commercial" className={ABOUT_TEXT_LINK}>
                commercial
              </Link>{" "}
              sectors, we have been able to build the company on the strength of recommendations alone.
            </p>
          </Reveal>
          <Reveal delayMs={140}>
            <p className="mt-6 text-base leading-relaxed text-white/82 md:text-lg">
              Our systems provide our customers the peace of mind that a well designed, well installed and reliable{" "}
              <Link href="/services" className={ABOUT_TEXT_LINK}>
                security system
              </Link>{" "}
              can bring. You are safe and secure with APX.
            </p>
          </Reveal>
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
        <div className="about-section-inner text-center">
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
            <CustomPillButton href="/contact" size="md">
              Contact us
            </CustomPillButton>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
