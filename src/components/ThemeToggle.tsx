"use client"

import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { useTheme } from '@/contexts/ThemeContext'

const GlobalStyles = createGlobalStyle<{ theme: typeof lightTheme }>`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  /* Force all text to use theme colors */
  h1, h2, h3, h4, h5, h6, p, span, div, a, button {
    color: ${({ theme }) => theme.text} !important;
  }

  /* Specific overrides for common classes */
  .text-white {
    color: ${({ theme }) => theme.text} !important;
  }

  .text-gray-300 {
    color: ${({ theme }) => theme.text === '#FFFFFF' ? '#CCCCCC' : '#666666'} !important;
  }

  .text-gray-400 {
    color: ${({ theme }) => theme.text === '#FFFFFF' ? '#AAAAAA' : '#888888'} !important;
  }

  .text-gray-600 {
    color: ${({ theme }) => theme.text === '#FFFFFF' ? '#AAAAAA' : '#666666'} !important;
  }

  /* Override specific text colors that might be hardcoded */
  .text-left {
    color: ${({ theme }) => theme.text} !important;
  }

  /* Ensure all headings are visible */
  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.text} !important;
  }

  /* Hero section - FS: white text on hero image */
  #hero h1,
  #hero h2,
  #hero h3,
  #hero p,
  #hero div,
  #hero span {
    color: #ffffff !important;
  }
  #hero h1 span.bg-white,
  #hero h1 .hero-title-accent {
    color: #000000 !important;
    background-color: #ffffff !important;
  }

  /* ABOUT intro, black bg, light text */
  #about-intro, #about-intro h2, #about-intro p, #about-intro span.section-label {
    color: #ffffff !important;
  }
  #about-intro p {
    color: rgba(255, 255, 255, 0.9) !important;
  }

  /* Trusted & Accredited (#about): light section — force dark copy including LineReveal spans */
  #about .why-choose-us-copy,
  #about .why-choose-us-copy .section-label,
  #about .why-choose-us-copy h2,
  #about .why-choose-us-copy h2 span,
  #about .why-choose-us-copy p,
  #about .why-choose-us-copy p span,
  #about .why-choose-us-copy .line-reveal,
  #about .why-choose-us-copy .line-reveal span,
  #about .why-choose-us-copy .letter-reveal,
  #about .why-choose-us-copy .letter-reveal span {
    color: #000000 !important;
  }

  /* About Meet the team — black cards, white copy */
  .about-featured-team-card,
  .about-featured-team-card h3 {
    color: #ffffff !important;
  }
  .about-featured-team-card .rounded-full.bg-white {
    color: #000000 !important;
  }

  /* /team directory */
  .team-directory,
  .team-page {
    background-color: #ffffff !important;
    color: #000000 !important;
  }
  .team-directory h1,
  .team-directory p,
  .team-directory a,
  .team-directory label,
  .team-directory input {
    color: #000000 !important;
  }
  .team-member-card,
  .team-member-card h2 {
    color: #ffffff !important;
  }
  .team-member-card p:last-child {
    color: rgba(255, 255, 255, 0.5) !important;
  }

  /* Projects band, white surface, black header copy (GlobalStyles defaults are white-on-black) */
  #projects.projects-section,
  #projects.projects-section .projects-section__sticky {
    background-color: #ffffff !important;
  }
  #projects.projects-section h2,
  #projects.projects-section h2.home-section-title,
  #projects.projects-section .section-label,
  #projects.projects-section span.section-label,
  #projects.projects-section .text-black {
    color: #000000 !important;
  }

  /* Footer, always light text on black background so it stays visible */
  footer,
  footer *,
  footer h1, footer h2, footer h3, footer h4, footer h5, footer h6,
  footer p, footer span, footer div, footer a, footer li {
    color: #ffffff !important;
  }
  footer .text-gray-400,
  footer a:not(:hover) {
    color: rgba(255, 255, 255, 0.85) !important;
  }
  footer a:hover {
    color: #ffffff !important;
  }

  /* Service card text */
  .service-card {
    color: ${({ theme }) => theme.text} !important;
  }

  .service-card h4 {
    color: ${({ theme }) => theme.text} !important;
  }

  .service-card div {
    color: ${({ theme }) => theme.text === '#FFFFFF' ? '#CCCCCC' : '#666666'} !important;
  }

  /* Header styling, transparent so only nav bar / contact tab have fill */
  header {
    background: transparent !important;
    background-color: transparent !important;
  }

  /* Navigation links */
  nav a {
    color: ${({ theme }) => theme.headerText} !important;
  }

  nav a:hover {
    color: ${({ theme }) => theme.headerTextHover} !important;
  }

  /* Header menu pills: white fill needs black label (overrides headerTextHover) */
  header.site-header nav a.nav-menu-item:hover,
  header.site-header nav a.nav-menu-item:focus-visible {
    color: #000000 !important;
    background-color: #ffffff !important;
  }
  header.site-header nav a.nav-menu-item:hover *,
  header.site-header nav a.nav-menu-item:focus-visible * {
    color: #000000 !important;
  }

  /* Homepage hero service quick-nav: same white pill / black text as header */
  #hero .hero-services-quick-nav__link:hover,
  #hero .hero-services-quick-nav__link:focus-visible {
    color: #000000 !important;
    background-color: #ffffff !important;
  }

  /* Button styling */
  button {
    background: ${({ theme }) => theme.buttonBg} !important;
    color: ${({ theme }) => theme.buttonText} !important;
    border-color: ${({ theme }) => theme.border} !important;
  }

  button:hover {
    background: ${({ theme }) => theme.buttonHover} !important;
  }

  /* Where We Thrive tabs (must beat global button rule) */
  #core-capabilities button.where-we-thrive-tabs__tab {
    background: transparent !important;
    color: rgba(255, 255, 255, 0.6) !important;
    border-color: transparent !important;
  }
  #core-capabilities button.where-we-thrive-tabs__tab:hover {
    background: rgba(255, 255, 255, 0.05) !important;
    color: #ffffff !important;
  }
  #core-capabilities button.where-we-thrive-tabs__tab span,
  #core-capabilities button.where-we-thrive-tabs__tab svg {
    color: inherit !important;
  }
  #core-capabilities button.where-we-thrive-tabs__tab--active,
  #core-capabilities button.where-we-thrive-tabs__tab--active:hover {
    background: #ffffff !important;
    color: #000000 !important;
  }
  #core-capabilities button.where-we-thrive-tabs__tab--active span,
  #core-capabilities button.where-we-thrive-tabs__tab--active svg,
  #core-capabilities button.where-we-thrive-tabs__tab--active:hover span,
  #core-capabilities button.where-we-thrive-tabs__tab--active:hover svg {
    color: #000000 !important;
  }

  /* Projects header nav (white band): black outline; testimonials stay white-on-black */
  #projects .projects-nav-btn {
    background: transparent !important;
    color: #000000 !important;
    border-color: #000000 !important;
  }
  #projects .projects-nav-btn:hover,
  #projects .projects-nav-btn:focus {
    background: #000000 !important;
    color: #ffffff !important;
    border-color: #000000 !important;
  }
  #projects .projects-nav-btn svg {
    color: #000000 !important;
    stroke: #000000 !important;
  }
  #projects .projects-nav-btn:hover svg,
  #projects .projects-nav-btn:focus svg {
    color: #ffffff !important;
    stroke: #ffffff !important;
  }
  #testimonials .projects-nav-btn {
    background: transparent !important;
    color: white !important;
    border-color: white !important;
  }
  #testimonials .projects-nav-btn:hover,
  #testimonials .projects-nav-btn:focus {
    background: white !important;
    color: black !important;
    border-color: white !important;
  }

  /*
   * FS header hamburger + mobile menu close: same as MEP, global button rule is white fill / black text (!important).
   * Force black fill, white border, white icon to match MEP mobile chrome.
   */
  .fs-header-menu-trigger {
    background: #000000 !important;
    background-color: #000000 !important;
    color: #ffffff !important;
    border: 2px solid #ffffff !important;
    border-color: #ffffff !important;
    box-shadow: none !important;
  }
  .fs-header-menu-trigger:hover {
    background: #111111 !important;
    background-color: #111111 !important;
    color: #ffffff !important;
    border-color: #ffffff !important;
  }
  .fs-header-menu-trigger:focus,
  .fs-header-menu-trigger:focus-visible {
    background: #000000 !important;
    color: #ffffff !important;
    border-color: #ffffff !important;
    outline: 2px solid rgba(255, 255, 255, 0.45) !important;
    outline-offset: 2px !important;
  }
  .fs-header-menu-trigger svg {
    color: #ffffff !important;
    stroke: #ffffff !important;
  }

  /* Header search: global button rule is white fill, keep black pill + white icon */
  .fs-header-search-trigger {
    background: #000000 !important;
    background-color: #000000 !important;
    color: #ffffff !important;
    border: 2px solid #ffffff !important;
    border-color: #ffffff !important;
    box-shadow: none !important;
  }
  .fs-header-search-trigger:hover {
    background: #111111 !important;
    background-color: #111111 !important;
    color: #ffffff !important;
    border-color: #ffffff !important;
    opacity: 1 !important;
  }
  .fs-header-search-trigger:focus,
  .fs-header-search-trigger:focus-visible {
    background: #000000 !important;
    color: #ffffff !important;
    border-color: #ffffff !important;
    outline: 2px solid rgba(255, 255, 255, 0.45) !important;
    outline-offset: 2px !important;
  }
  .fs-header-search-trigger svg {
    color: #ffffff !important;
    stroke: #ffffff !important;
  }

  /* Homepage services mobile arrows: match projects nav (48px), black fill, white border/icon */
  #services button.fs-offer-mobile-nav__btn,
  #services button.fs-offer-mobile-nav__btn:hover,
  #services button.fs-offer-mobile-nav__btn:focus,
  #services button.fs-offer-mobile-nav__btn:focus-visible {
    width: 3rem !important;
    height: 3rem !important;
    background: #000000 !important;
    background-color: #000000 !important;
    color: #ffffff !important;
    border: 1px solid #ffffff !important;
    border-color: #ffffff !important;
    box-shadow: none !important;
  }
  #services button.fs-offer-mobile-nav__btn svg {
    width: 1.5rem !important;
    height: 1.5rem !important;
    color: #ffffff !important;
    stroke: #ffffff !important;
  }

  /*
   * Homepage search banner: global button rule is white fill / black text.
   * Keep backdrop transparent (div), close + results dark, CTA white when ready.
   */
  .home-search-intent button {
    background: transparent !important;
    background-color: transparent !important;
    color: #ffffff !important;
    border-color: rgba(255, 255, 255, 0.35) !important;
    box-shadow: none !important;
  }
  .home-search-intent button:hover {
    background: rgba(255, 255, 255, 0.08) !important;
    background-color: rgba(255, 255, 255, 0.08) !important;
    color: #ffffff !important;
  }
  .home-search-intent button svg {
    color: #ffffff !important;
    stroke: #ffffff !important;
  }
  .home-search-intent button.home-search-intent__close {
    background: rgba(0, 0, 0, 0.45) !important;
    background-color: rgba(0, 0, 0, 0.45) !important;
    border: 1px solid rgba(255, 255, 255, 0.45) !important;
    border-color: rgba(255, 255, 255, 0.45) !important;
    color: #ffffff !important;
  }
  .home-search-intent button.home-search-intent__close:hover {
    background: rgba(0, 0, 0, 0.65) !important;
    background-color: rgba(0, 0, 0, 0.65) !important;
    border-color: #ffffff !important;
  }
  .home-search-intent button.home-search-intent__result {
    background: transparent !important;
    background-color: transparent !important;
    color: rgba(255, 255, 255, 0.9) !important;
    border-color: transparent !important;
  }
  .home-search-intent button.home-search-intent__result:hover,
  .home-search-intent button.home-search-intent__result.home-search-intent__result--active {
    background: rgba(255, 255, 255, 0.12) !important;
    background-color: rgba(255, 255, 255, 0.12) !important;
    color: #ffffff !important;
  }
  .home-search-intent button.home-search-intent__result span {
    color: inherit !important;
  }
  .home-search-intent button.home-search-intent__go {
    background: transparent !important;
    background-color: transparent !important;
    color: rgba(255, 255, 255, 0.35) !important;
    border: 1px solid rgba(255, 255, 255, 0.25) !important;
  }
  .home-search-intent button.home-search-intent__go.home-search-intent__go--ready {
    background: #ffffff !important;
    background-color: #ffffff !important;
    color: #000000 !important;
    border-color: #ffffff !important;
  }
  .home-search-intent button.home-search-intent__go.home-search-intent__go--ready:hover {
    background: transparent !important;
    background-color: transparent !important;
    color: #ffffff !important;
    border-color: #ffffff !important;
  }
  .home-search-intent button.home-search-intent__go.home-search-intent__go--ready:hover svg {
    color: #ffffff !important;
    stroke: #ffffff !important;
  }
  .home-search-intent button.home-search-intent__go.home-search-intent__go--ready svg {
    color: #000000 !important;
    stroke: #000000 !important;
  }

  /* Hero promise chips: black fill + white icon/label (global button rule is white fill) */
  button.hero-promise-chip,
  button.hero-promise-chip:hover,
  button.hero-promise-chip:focus,
  button.hero-promise-chip:focus-visible,
  button.hero-promise-chip:active {
    background: #000000 !important;
    background-color: #000000 !important;
    color: #ffffff !important;
    border-color: rgba(255, 255, 255, 0.55) !important;
    box-shadow: none !important;
  }
  button.hero-promise-chip svg {
    color: #ffffff !important;
    stroke: #ffffff !important;
  }
  button.hero-promise-chip .hero-promise-chip__label {
    color: #ffffff !important;
  }

  /* Cookie policy: manage preferences CTA (global button rule is white fill) */
  .cookie-policy-prefs-btn {
    background: #000000 !important;
    background-color: #000000 !important;
    color: #ffffff !important;
    border: 2px solid #ffffff !important;
    box-shadow: none !important;
  }
  .cookie-policy-prefs-btn:hover {
    background: #ffffff !important;
    background-color: #ffffff !important;
    color: #000000 !important;
  }
  .cookie-policy-prefs-btn svg {
    color: inherit !important;
    stroke: currentColor !important;
  }

  /* Footer legal: Cookie Preferences is a button (opens modal) — match link style, not white fill */
  footer button.footer-cookie-prefs-btn,
  footer button.footer-cookie-prefs-btn:hover,
  footer button.footer-cookie-prefs-btn:focus,
  footer button.footer-cookie-prefs-btn:focus-visible {
    background: transparent !important;
    background-color: transparent !important;
    color: inherit !important;
    border: 0 !important;
    box-shadow: none !important;
    padding: 0 !important;
  }
  footer button.footer-cookie-prefs-btn:hover {
    color: #ffffff !important;
  }

  /* Careers filter rail + listing actions (global button rule is white fill) */
  .careers-filter-rail button {
    background: transparent !important;
    background-color: transparent !important;
    color: rgba(255, 255, 255, 0.75) !important;
    border-color: transparent !important;
    box-shadow: none !important;
  }
  .careers-filter-rail button:hover {
    background: rgba(255, 255, 255, 0.08) !important;
    background-color: rgba(255, 255, 255, 0.08) !important;
    color: #ffffff !important;
  }
  .careers-filter-rail button[aria-selected="true"],
  .careers-filter-rail li[aria-selected="true"] > button {
    background: #ffffff !important;
    background-color: #ffffff !important;
    color: #000000 !important;
  }
  .careers-filter-rail button[aria-selected="true"]:hover,
  .careers-filter-rail li[aria-selected="true"] > button:hover {
    background: #ffffff !important;
    background-color: #ffffff !important;
    color: #000000 !important;
  }

  .careers-page .careers-outline-btn,
  .careers-job-modal .careers-outline-btn {
    background: transparent !important;
    background-color: transparent !important;
    color: rgba(255, 255, 255, 0.9) !important;
    border: 1.5px solid rgba(255, 255, 255, 0.25) !important;
    box-shadow: none !important;
  }
  .careers-page .careers-outline-btn:hover,
  .careers-job-modal .careers-outline-btn:hover {
    background: rgba(255, 255, 255, 0.05) !important;
    background-color: rgba(255, 255, 255, 0.05) !important;
    color: #ffffff !important;
    border-color: rgba(255, 255, 255, 0.45) !important;
  }

  /* Careers apply (white page): outline controls stay black on white */
  .careers-apply-page,
  .careers-apply-page h1,
  .careers-apply-page h2,
  .careers-apply-page h3,
  .careers-apply-page p,
  .careers-apply-page span,
  .careers-apply-page label,
  .careers-apply-page a,
  .careers-apply-page li {
    color: #000000 !important;
  }
  .careers-apply-page a {
    color: rgba(0, 0, 0, 0.55) !important;
  }
  .careers-apply-page a:hover {
    color: #000000 !important;
  }
  .careers-apply-page .careers-apply-outline-btn {
    background: #ffffff !important;
    background-color: #ffffff !important;
    color: #000000 !important;
    border: 2px solid rgba(0, 0, 0, 0.2) !important;
    box-shadow: none !important;
  }
  .careers-apply-page .careers-apply-outline-btn:hover:not(:disabled) {
    background: rgba(0, 0, 0, 0.03) !important;
    background-color: rgba(0, 0, 0, 0.03) !important;
    color: #000000 !important;
    border-color: rgba(0, 0, 0, 0.4) !important;
  }
  .careers-apply-page input,
  .careers-apply-page textarea {
    background: #ffffff !important;
    color: #000000 !important;
    border-color: rgba(0, 0, 0, 0.15) !important;
  }
  .careers-apply-page input::placeholder,
  .careers-apply-page textarea::placeholder {
    color: rgba(0, 0, 0, 0.35) !important;
  }

  .careers-apply-page .pill-btn,
  .careers-apply-page .pill-btn .pill-text,
  .careers-apply-page .form-submit-btn,
  .careers-apply-page .form-submit-btn .pill-text {
    color: #ffffff !important;
  }
  .careers-apply-page .pill-btn:hover .pill-text,
  .careers-apply-page .form-submit-btn:hover .pill-text {
    color: #000000 !important;
  }

  /* Mobile contact FAB: circular / long pill; black fill, white border */
  .apx-mobile-contact-fab {
    background: #000000 !important;
    background-color: #000000 !important;
    color: #ffffff !important;
    border: 2px solid #ffffff !important;
    border-color: #ffffff !important;
    border-radius: 9999px !important;
  }
  .apx-mobile-contact-fab button,
  .apx-mobile-contact-fab a {
    background: transparent !important;
    background-color: transparent !important;
    border: none !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    color: #ffffff !important;
  }
  .apx-mobile-contact-fab button:hover,
  .apx-mobile-contact-fab a:hover {
    background: transparent !important;
    background-color: transparent !important;
    color: #ffffff !important;
  }
  .apx-mobile-contact-fab:hover {
    background: #111111 !important;
    background-color: #111111 !important;
    color: #ffffff !important;
    border-color: #ffffff !important;
  }
  .apx-mobile-contact-fab button:focus,
  .apx-mobile-contact-fab button:focus-visible,
  .apx-mobile-contact-fab a:focus,
  .apx-mobile-contact-fab a:focus-visible {
    background: transparent !important;
    color: #ffffff !important;
    outline: 2px solid rgba(255, 255, 255, 0.45) !important;
    outline-offset: -2px !important;
  }

  /* Form inputs: theme background and text */
  input, textarea, select {
    background: ${({ theme }) => theme.cardBg} !important;
    color: ${({ theme }) => theme.text} !important;
    border-color: ${({ theme }) => theme.border} !important;
  }

  input::placeholder,
  textarea::placeholder {
    color: ${({ theme }) => theme.text === '#FFFFFF' ? '#888888' : '#666666'} !important;
  }

  /* Contact tab buttons - keep transparent so globals.css ::before pill shows on hover */
  .header-contact-tab--dark button,
  .header-contact-tab--light button {
    background: transparent !important;
  }
  .header-contact-tab--dark button:hover,
  .header-contact-tab--light button:hover {
    background: transparent !important;
  }

  /* News hub filter pills: avoid global button black hover fill */
  .news-page .news-hub__pill {
    background: #ffffff !important;
    background-color: #ffffff !important;
    color: rgba(0, 0, 0, 0.65) !important;
    border: 2px solid rgba(0, 0, 0, 0.18) !important;
  }
  .news-page .news-hub__pill:hover {
    background: #ffffff !important;
    background-color: #ffffff !important;
    color: #000000 !important;
    border-color: #000000 !important;
  }
  .news-page .news-hub__pill--active,
  .news-page .news-hub__pill--active:hover {
    background: #ffffff !important;
    background-color: #ffffff !important;
    color: #000000 !important;
    border-color: #000000 !important;
  }

  /* News hub year filter: match tabloid controls, not global button fill */
  .news-page .news-hub__year-trigger,
  .news-page .news-hub__year-option {
    background: #ffffff !important;
    background-color: #ffffff !important;
    color: #000000 !important;
    border-color: #000000 !important;
  }
  .news-page .news-hub__year-trigger:hover {
    background: #ffffff !important;
    background-color: #ffffff !important;
    color: #000000 !important;
  }
  .news-page .news-hub__year-option:hover {
    background: rgba(0, 0, 0, 0.05) !important;
    background-color: rgba(0, 0, 0, 0.05) !important;
    color: #000000 !important;
  }
  .news-page .news-hub__year-option[aria-selected="true"] {
    background: #000000 !important;
    background-color: #000000 !important;
    color: #ffffff !important;
  }

  /* News hub cards: white surface, no black hover fill from global theme */
  .news-page .news-card,
  .news-article-page .news-card {
    background: #ffffff !important;
    background-color: #ffffff !important;
  }
  .news-page .news-card:hover,
  .news-article-page .news-card:hover {
    background: #ffffff !important;
    background-color: #ffffff !important;
    box-shadow: none !important;
  }
  .news-page .news-card a,
  .news-article-page .news-card a {
    background: transparent !important;
    background-color: transparent !important;
  }
  .news-page .news-card a:hover,
  .news-article-page .news-card a:hover {
    background: transparent !important;
    background-color: transparent !important;
  }

  /* News article share: black filled icons on light band */
  .news-article-page .news-article-share a.news-article-share__btn,
  .news-article-page .news-article-share__btn {
    background: transparent !important;
    background-color: transparent !important;
    color: #000000 !important;
    border: none !important;
    border-radius: 0 !important;
    box-shadow: none !important;
  }
  .news-article-page .news-article-share__btn svg {
    color: currentColor !important;
  }
  .news-article-page .news-article-share__btn svg[stroke-width="0"] {
    fill: currentColor !important;
    stroke: none !important;
  }
  .news-article-page .news-article-share__btn svg:not([stroke-width="0"]) {
    fill: none !important;
    stroke: currentColor !important;
  }
  .news-article-page .news-article-share__btn:hover {
    background: rgba(0, 0, 0, 0.06) !important;
    background-color: rgba(0, 0, 0, 0.06) !important;
    color: #000000 !important;
  }

  /* Services dropdown CCTV +/- toggle: global button rule is white fill / black icon */
  .fs-services-cctv-toggle-btn {
    background: transparent !important;
    background-color: transparent !important;
    color: #ffffff !important;
    border-radius: 0 !important;
    box-shadow: none !important;
  }
  .fs-services-cctv-toggle-btn:hover {
    background: rgba(255, 255, 255, 0.1) !important;
    background-color: rgba(255, 255, 255, 0.1) !important;
    color: #ffffff !important;
  }
  .fs-services-cctv-toggle-btn:focus,
  .fs-services-cctv-toggle-btn:focus-visible {
    background: transparent !important;
    color: #ffffff !important;
  }
  .fs-services-cctv-toggle-btn svg {
    color: #ffffff !important;
    stroke: #ffffff !important;
  }

  /* Services drawer list items - no fill on hover, only shimmer in globals.css */
  .services-drawer-list-item,
  .services-drawer-list-item:hover {
    background: transparent !important;
  }

  /* Testimonial dots and interactive elements */
  .w-2.h-2 {
    background: ${({ theme }) => theme.text} !important;
  }

  .bg-gray-600 {
    background: ${({ theme }) => theme.text === '#FFFFFF' ? '#666666' : '#4B5563'} !important;
  }

  /* All white text classes should use theme text */
  .text-white {
    color: ${({ theme }) => theme.text} !important;
  }

  /* .bg-white is overridden to theme background (so dark theme = black). For literal white, use inline style or a section-specific rule in globals.css (e.g. #accreditations). */
  .bg-white {
    background: ${({ theme }) => theme.bg} !important;
  }

  /* Border colors */
  .border-white {
    border-color: ${({ theme }) => theme.border} !important;
  }

  /* Vertical separators */
  .vertical-separator {
    background: ${({ theme }) => theme.border} !important;
  }

  /* Toast notifications */
  .absolute.top-full.right-6.mt-16 {
    background: ${({ theme }) => theme.headerBg} !important;
    color: ${({ theme }) => theme.text} !important;
    border-color: ${({ theme }) => theme.border} !important;
  }

  /* Scroll indicator squares: black border (see .scroll-indicator-square in globals), do not override */
  .fixed.right-6 .w-3.h-3:not(.scroll-indicator-square) {
    border-color: ${({ theme }) => theme.border} !important;
  }

  .fixed.right-6 .w-3.h-3.bg-white {
    background: ${({ theme }) => theme.text} !important;
  }

  .fixed.right-6 .w-px {
    background: ${({ theme }) => theme.text === '#FFFFFF' ? '#666666' : '#4B5563'} !important;
  }
`

const lightTheme = {
  bg: "#000000",
  text: "#FFFFFF",
  border: "#FFFFFF",
  cardBg: "#000000",
  divider: "#FFFFFF",
  headerBg: "transparent",
  headerText: "#FFFFFF",
  headerTextHover: "#CCCCCC",
  headerTextActive: "#FFFFFF",
  sidebarBg: "#000000",
  buttonBg: "#FFFFFF",
  buttonText: "#000000",
  buttonHover: "#F0F0F0"
}

const darkTheme = {
  bg: "#000000",
  text: "#FFFFFF", 
  border: "#FFFFFF",
  cardBg: "#000000",
  divider: "#FFFFFF",
  headerBg: "transparent",
  headerText: "#FFFFFF",
  headerTextHover: "#CCCCCC",
  headerTextActive: "#FFFFFF",
  sidebarBg: "#000000",
  buttonBg: "#FFFFFF",
  buttonText: "#000000",
  buttonHover: "#F0F0F0"
}

const ToggleContainer = styled.button<{ $lightTheme: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  width: 60px;
  height: 30px;
  background: ${({ $lightTheme }) => $lightTheme ? "#000000" : "#FFFFFF"};
  border: 1px solid ${({ $lightTheme }) => $lightTheme ? "#000000" : "#FFFFFF"};
  border-radius: 15px;
  cursor: pointer;
  outline: none;
  transition: all 0.3s ease;

  .switch {
    position: absolute;
    height: 24px;
    width: 24px;
    border-radius: 50%;
    background: ${({ $lightTheme }) => $lightTheme ? "#FFFFFF" : "#000000"};
    transform: ${({ $lightTheme }) =>
      $lightTheme ? "translateX(2px)" : "translateX(32px)"};
    transition: transform 0.3s ease;
  }

  .sun,
  .moon {
    position: absolute;
    height: 16px;
    width: 16px;
    z-index: 2;
  }

  .sun {
    left: 6px;
    opacity: ${({ $lightTheme }) => ($lightTheme ? "1" : "0.3")};
  }

  .moon {
    right: 6px;
    opacity: ${({ $lightTheme }) => ($lightTheme ? "0.3" : "1")};
  }

  .sun path,
  .moon path {
    fill: ${({ $lightTheme }) => $lightTheme ? "#FFFFFF" : "#000000"};
  }
`

const Toggle = () => {
  const { theme, toggleTheme } = useTheme()
  const isLight = theme === "light"

  return (
    <ToggleContainer $lightTheme={isLight} onClick={toggleTheme}>
      <div className="switch"></div>
      <svg
        className="sun"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11 0H13V4.06189C12.6724 4.02104 12.3387 4 12 4C11.6613 4 11.3276 4.02104 11 4.06189V0ZM7.0943 5.68018L4.22173 2.80761L2.80752 4.22183L5.6801 7.09441C6.09071 6.56618 6.56608 6.0908 7.0943 5.68018ZM4.06189 11H0V13H4.06189C4.02104 12.6724 4 12.3387 4 12C4 11.6613 4.02104 11.3276 4.06189 11ZM5.6801 16.9056L2.80751 19.7782L4.22173 21.1924L7.0943 18.3198C6.56608 17.9092 6.09071 17.4338 5.6801 16.9056ZM11 19.9381V24H13V19.9381C12.6724 19.979 12.3387 20 12 20C11.6613 20 11.3276 19.979 11 19.9381ZM16.9056 18.3199L19.7781 21.1924L21.1923 19.7782L18.3198 16.9057C17.9092 17.4339 17.4338 17.9093 16.9056 18.3199ZM19.9381 13H24V11H19.9381C19.979 11.3276 20 11.6613 20 12C20 12.3387 19.979 12.6724 19.9381 13ZM18.3198 7.0943L21.1923 4.22183L19.7781 2.80762L16.9056 5.6801C17.4338 6.09071 17.9092 6.56608 18.3198 7.0943Z"
          fill="currentColor"
        />
      </svg>
      <svg
        className="moon"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.2256 2.00253C9.59172 1.94346 6.93894 2.9189 4.92893 4.92891C1.02369 8.83415 1.02369 15.1658 4.92893 19.071C8.83418 22.9763 15.1658 22.9763 19.0711 19.071C21.0811 17.061 22.0565 14.4082 21.9975 11.7743C21.9796 10.9772 21.8669 10.1818 21.6595 9.40643C21.0933 9.9488 20.5078 10.4276 19.9163 10.8425C18.5649 11.7906 17.1826 12.4053 15.9301 12.6837C14.0241 13.1072 12.7156 12.7156 12 12C11.2844 11.2844 10.8928 9.97588 11.3163 8.0699C11.5947 6.81738 12.2094 5.43511 13.1575 4.08368C13.5724 3.49221 14.0512 2.90664 14.5935 2.34046C13.8182 2.13305 13.0228 2.02041 12.2256 2.00253ZM17.6569 17.6568C18.9081 16.4056 19.6582 14.8431 19.9072 13.2186C16.3611 15.2643 12.638 15.4664 10.5858 13.4142C8.53361 11.362 8.73568 7.63895 10.7814 4.09281C9.1569 4.34184 7.59434 5.09193 6.34315 6.34313C3.21895 9.46732 3.21895 14.5326 6.34315 17.6568C9.46734 20.781 14.5327 20.781 17.6569 17.6568Z"
          fill="currentColor"
        />
      </svg>
    </ToggleContainer>
  )
}

export { Toggle, GlobalStyles, lightTheme, darkTheme }
