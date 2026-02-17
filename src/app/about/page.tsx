"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

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
    <div className="about-parallax-page overflow-x-hidden snap-y snap-mandatory">
      {/* Hero – black, angled bottom */}
      <section className="about-block about-block--black about-block--angle-bottom min-h-screen flex flex-col justify-center px-6 lg:px-12 pt-24 pb-20 snap-start">
        <div className="about-parallax-bg" style={{ transform: `translateY(${scrollY * 0.12}px)` }} aria-hidden />
        <div className="relative z-10 max-w-4xl">
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
            style={{ fontFamily: "var(--font-menu)" }}
          >
            Why Choose APX Fire & Security?
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl leading-relaxed">
            With over 20 years of experience in fire safety and security systems,
            we&apos;ve built a reputation for excellence, compliance, and peace of mind across the UK.
          </p>
        </div>
      </section>

      {/* Block 2 – white, angled top & bottom, image placeholder */}
      <section className="about-block about-block--white about-block--angle-top about-block--angle-bottom-alt min-h-screen flex items-center px-6 lg:px-12 py-16 snap-start">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6" style={{ fontFamily: "var(--font-menu)" }}>
              Certified Fire & Security Specialists
            </h2>
            <p className="text-lg text-black/80 leading-relaxed mb-6">
              Our team of fully qualified engineers are certified in fire detection, emergency lighting,
              CCTV, access control, and intruder alarms — with regular training and industry expertise
              to keep your premises safe and compliant.
            </p>
            <ul className="space-y-2 text-black/90">
              <li>• Fully qualified fire & security engineers</li>
              <li>• BAFE, NSI and industry certifications</li>
              <li>• Regular training and compliance updates</li>
            </ul>
          </div>
          <div className="about-image-placeholder aspect-[4/3] bg-black/10 rounded-lg flex items-center justify-center text-black/40 text-sm uppercase tracking-wider">
            Image placeholder
          </div>
        </div>
      </section>

      {/* Block 3 – black, horizontal scroll strip */}
      <section className="about-block about-block--black about-block--angle-top min-h-screen flex flex-col justify-center px-0 py-16 snap-start">
        <div className="px-6 lg:px-12 mb-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-menu)" }}>
            Our Work
          </h2>
          <p className="text-white/70 mt-2 max-w-xl">Fire safety and security projects across the UK.</p>
        </div>
        <div className="about-horizontal-scroll">
          <div className="about-horizontal-scroll__inner">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="about-horizontal-card shrink-0 snap-center">
                <div className="about-image-placeholder aspect-video bg-white/10 rounded-lg flex items-center justify-center text-white/40 text-xs uppercase">
                  Image {i}
                </div>
                <h3 className="text-white font-semibold mt-3 text-lg">Project {i}</h3>
                <p className="text-white/60 text-sm">Fire &amp; security systems</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Block 4 – white, angled top & bottom, text + image */}
      <section className="about-block about-block--white about-block--angle-bottom about-block--angle-top-alt min-h-screen flex items-center px-6 lg:px-12 py-16 snap-start">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="about-image-placeholder aspect-[3/4] bg-black/10 rounded-lg flex items-center justify-center text-black/40 text-sm uppercase tracking-wider order-2 lg:order-1">
            Image placeholder
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6" style={{ fontFamily: "var(--font-menu)" }}>
              24/7 Emergency Response
            </h2>
            <p className="text-lg text-black/80 leading-relaxed">
              Round-the-clock fire and security support with rapid response times. When an alarm triggers
              or you need urgent assistance, we&apos;re here to protect your people and your property.
            </p>
          </div>
        </div>
      </section>

      {/* Block 5 – black, angled, stats / quote */}
      <section className="about-block about-block--black about-block--angle-top about-block--angle-bottom-alt min-h-screen flex flex-col justify-center px-6 lg:px-12 py-16 snap-start">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl md:text-3xl lg:text-4xl text-white/90 leading-relaxed font-medium">
            &ldquo;We don&apos;t just install systems — we help you stay compliant and keep everyone safe.&rdquo;
          </p>
          <div className="mt-16 grid grid-cols-3 gap-8">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white">500+</div>
              <div className="text-white/60 mt-1">Projects completed</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white">99%</div>
              <div className="text-white/60 mt-1">Customer satisfaction</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white">20+</div>
              <div className="text-white/60 mt-1">Years experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Block 6 – white, angled, image grid placeholders */}
      <section className="about-block about-block--white about-block--angle-top about-block--angle-bottom-alt min-h-screen flex items-center px-6 lg:px-12 py-16 snap-start">
        <div className="w-full max-w-7xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-12" style={{ fontFamily: "var(--font-menu)" }}>
            Quality & Compliance
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="about-image-placeholder aspect-[4/3] bg-black/10 rounded-lg flex items-center justify-center text-black/40 text-sm uppercase">
                Image {i}
              </div>
            ))}
          </div>
          <p className="text-black/80 mt-8 max-w-2xl">
            Comprehensive warranties on all fire and security work. BAFE and industry standards you can trust.
          </p>
        </div>
      </section>

      {/* Block 7 – black, angled bottom, CTA */}
      <section className="about-block about-block--black about-block--angle-top min-h-screen flex flex-col justify-center items-center px-6 py-16 snap-start">
        <h2 className="text-4xl lg:text-5xl font-bold text-white text-center mb-6" style={{ fontFamily: "var(--font-menu)" }}>
          Get in touch
        </h2>
        <p className="text-white/70 text-center max-w-xl mb-10">
          Ready to discuss your fire safety or security requirements? We&apos;d love to hear from you.
        </p>
        <Link
          href="/contact"
          className="bg-white text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/90 transition-colors"
        >
          Contact us
        </Link>
      </section>
    </div>
  );
}
