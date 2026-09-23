export type NewsCategory =
  | "company-news"
  | "fire-alarm-systems"
  | "cctv-systems"
  | "access-control-systems"
  | "video-door-entry-systems"
  | "intruder-alarm-systems"
  | "disabled-refuge"
  | "products"

export type FsNewsArticleInlineLink = {
  paragraphIndex: number
  linkText: string
  href: string
}

export type FsNewsArticleQuote = {
  intro?: string
  paragraphs: string[]
  author: string
  role: string
}

export type FsNewsArticle = {
  slug: string
  title: string
  /** ISO date YYYY-MM-DD for sorting */
  publishedAt: string
  /** Display date e.g. 10th July 2023 */
  publishedLabel: string
  excerpt: string
  body: string[]
  inlineLinks?: FsNewsArticleInlineLink[]
  quote?: FsNewsArticleQuote
  imageSrc: string
  imageAlt: string
  categories: NewsCategory[]
  /** Modern service pages to surface at the end of the article */
  relatedServices?: { label: string; href: string }[]
}

export const NEWS_HUB_PATH = "/news" as const

export const NEWS_CATEGORY_LABELS: Record<NewsCategory, string> = {
  "company-news": "Company news",
  "fire-alarm-systems": "Fire alarm systems",
  "cctv-systems": "CCTV systems",
  "access-control-systems": "Access control",
  "video-door-entry-systems": "Video door entry",
  "intruder-alarm-systems": "Intruder alarms",
  "disabled-refuge": "Disabled refuge",
  products: "Products & technology",
}

export const FS_NEWS_ARTICLES: FsNewsArticle[] = [
  {
    slug: "maintenance-monitoring-guidance-2026",
    title: "Maintenance and monitoring: keeping fire and security systems ready",
    publishedAt: "2026-09-12",
    publishedLabel: "12th September 2026",
    excerpt:
      "Planned maintenance, clear reporting and monitoring options help duty holders keep fire and security systems reliable between major works.",
    body: [
      "Once a fire or security system is commissioned, ongoing care is what keeps it dependable. Missed inspections, incomplete records or unclear monitoring arrangements are common reasons systems drift away from the standard they were built to meet.",
      "APX Fire & Security supports planned preventative maintenance, reactive attendance where contracted, and monitoring pathways where the site design requires them. Our focus is practical: engineers who know the systems, documentation you can hand to auditors, and escalation that matches how your building operates.",
      "If you are reviewing an ageing estate or taking over systems from another contractor, a survey-led maintenance plan is often the fastest way to understand risk, gaps and upgrade priorities, without committing to a full replacement until the evidence supports it.",
      "Speak to our team about maintenance and monitoring options across London and the Home Counties.",
    ],
    inlineLinks: [
      {
        paragraphIndex: 3,
        linkText: "Speak to our team",
        href: "/contact?service=maintenance-support",
      },
    ],
    imageSrc: "/projects/library/apx-fire-security-alarm-box.jpg",
    imageAlt: "Fire and security system equipment supported under maintenance",
    categories: ["company-news", "fire-alarm-systems", "intruder-alarm-systems"],
    relatedServices: [
      { label: "Maintenance & support", href: "/services/maintenance-support" },
      { label: "Fire alarm systems", href: "/services/fire-alarm-systems" },
      { label: "Intruder alarm systems", href: "/services/intruder-alarm-systems" },
    ],
  },
  {
    slug: "fire-cctv-commissioning-london-2026",
    title: "Fire and CCTV commissioning across London and the Home Counties",
    publishedAt: "2026-07-22",
    publishedLabel: "22nd July 2026",
    excerpt:
      "Structured commissioning, cause-and-effect testing and clear handover remain central to how we finish fire detection and CCTV packages on commercial and public-sector sites.",
    body: [
      "Commissioning is where design intent becomes a working system. For fire detection that means device testing, cause-and-effect verification and interface checks with related life-safety systems. For CCTV it means camera views, recording, network arrangements and operator handover that match the brief.",
      "Through 2025 and 2026 our engineers have continued to commission fire and CCTV packages across London and the Home Counties, coordinating with principal contractors, consultants and facilities teams so acceptance is evidence-led rather than assumed.",
      "Every project is different, but the constants stay the same: competent engineers, documented testing and a handover pack that duty holders can use from day one.",
      "If you need commissioning support on a live programme, contact APX Fire & Security to discuss programme, witnessing and documentation.",
    ],
    inlineLinks: [
      {
        paragraphIndex: 3,
        linkText: "contact APX Fire & Security",
        href: "/contact",
      },
    ],
    imageSrc: "/projects/library/commercial-cctv-monitor-business.jpg",
    imageAlt: "Commercial CCTV monitoring and commissioning",
    categories: ["company-news", "fire-alarm-systems", "cctv-systems"],
    relatedServices: [
      { label: "Fire alarm systems", href: "/services/fire-alarm-systems" },
      { label: "CCTV systems", href: "/services/cctv-systems" },
      { label: "Delivery methodology", href: "/delivery-methodology" },
    ],
  },
  {
    slug: "gate-automation-systems-launch",
    title: "Gate automation systems now part of our security offer",
    publishedAt: "2026-05-14",
    publishedLabel: "14th May 2026",
    excerpt:
      "APX Fire & Security has launched a dedicated gate automation service, swing and sliding gates, vehicle barriers and perimeter control, integrated with access and CCTV where required.",
    body: [
      "Vehicle and perimeter entry are often the weak point in an otherwise strong building security package. Gate automation, barriers and safety devices need the same survey-led design and aftercare as access control and CCTV.",
      "We now offer gate automation systems as a core service: automated swing and sliding gates, vehicle barriers and perimeter control, with safety devices and integration to access control and CCTV where the site needs shared visitor and vehicle entry.",
      "As with our other disciplines, we survey first, coordinate with wider packages, and hand over clear operating information for estates and facilities teams.",
      "Explore our gate automation service or request a survey for your site.",
    ],
    inlineLinks: [
      {
        paragraphIndex: 3,
        linkText: "Explore our gate automation service",
        href: "/services/gate-automation-systems",
      },
    ],
    imageSrc: "/service%20images/access%20control/hero-access-control-systems.jpg",
    imageAlt: "Access and perimeter control systems",
    categories: ["company-news", "access-control-systems"],
    relatedServices: [
      { label: "Gate automation systems", href: "/services/gate-automation-systems" },
      { label: "Access control systems", href: "/services/access-control-systems" },
      { label: "CCTV systems", href: "/services/cctv-systems" },
    ],
  },
  {
    slug: "contracts-project-completions-2026",
    title: "New contracts and project completions into 2026",
    publishedAt: "2026-03-03",
    publishedLabel: "3rd March 2026",
    excerpt:
      "APX continues to deliver fire, life-safety and electronic security packages for commercial, healthcare, residential and public-sector clients across London and the South East.",
    body: [
      "Our pipeline into 2026 includes new appointments and completed packages across fire detection, CCTV, access control, video door entry and related life-safety systems. Work spans new-build programmes, refurbishments and estate upgrades.",
      "We remain focused on clear scope, NSI-aligned delivery and documentation that stands up at handover, whether we are working direct for clients or as part of a wider M&E supply chain.",
      "Selected case studies are published on our projects pages, including commercial offices, healthcare estates and retirement living. Further named project stories will be added as customer approvals allow.",
      "If you are tendering fire or security packages in London or the Home Counties, our team is ready to support surveys and technical submissions.",
    ],
    inlineLinks: [
      {
        paragraphIndex: 2,
        linkText: "projects pages",
        href: "/projects",
      },
    ],
    imageSrc: "/projects/case-studies/sancroft-building/case-study-sancroft-building-fire-alarm-installation-exterior.jpg",
    imageAlt: "Commercial fire and security project delivery",
    categories: ["company-news"],
    relatedServices: [
      { label: "Projects", href: "/projects" },
      { label: "Security systems overview", href: "/services/security-systems" },
      { label: "Fire & life safety", href: "/services/fire-life-safety" },
    ],
  },
  {
    slug: "constructionline-gold-membership",
    title: "Constructionline Gold membership for procurement readiness",
    publishedAt: "2025-11-18",
    publishedLabel: "18th November 2025",
    excerpt:
      "APX Fire & Security holds Constructionline Gold membership, supporting construction supply-chain pre-qualification across London and the Home Counties.",
    body: [
      "Constructionline is widely used by principal contractors and public-sector buyers to pre-qualify suppliers before tender and appointment. Gold membership reflects a higher assurance level within that platform.",
      "APX Fire & Security is a Constructionline Gold Member. For clients and contractors, that means clearer early-stage due diligence on company information and compliance readiness, alongside our NSI and BAFE credentials.",
      "Constructionline is a procurement credential, not a substitute for technical certification. We continue to deliver fire and security packages under NSI Gold frameworks and BAFE registration where those apply.",
      "Read more about our Constructionline status on our credentials pages.",
    ],
    inlineLinks: [
      {
        paragraphIndex: 3,
        linkText: "credentials pages",
        href: "/accreditations/constructionline",
      },
    ],
    imageSrc: "/projects/library/commercial-cctv-premises-monitoring-sq.jpg",
    imageAlt: "Construction and premises security systems",
    categories: ["company-news"],
    relatedServices: [
      { label: "Constructionline", href: "/accreditations/constructionline" },
      { label: "All credentials", href: "/accreditations" },
    ],
  },
  {
    slug: "fia-full-membership",
    title: "APX Fire & Security is a Full Member of the FIA",
    publishedAt: "2025-10-08",
    publishedLabel: "8th October 2025",
    excerpt:
      "Full membership of the Fire Industry Association supports technical guidance, training pathways and industry standards, alongside our NSI and BAFE credentials.",
    body: [
      "The Fire Industry Association (FIA) is the UK’s major trade association for fire protection and fire safety professionals. It supports standards, training and technical guidance across the industry.",
      "APX Fire & Security is a Full Member of the FIA. Membership is not a third-party accreditation of our installation work; it demonstrates commitment to industry practice and continuous improvement alongside NSI Gold and BAFE registration.",
      "For customers, that combination matters: independent certification and registration for delivery quality, plus association membership that keeps our teams aligned with evolving fire-safety guidance.",
      "Learn more about FIA membership and our other credentials.",
    ],
    inlineLinks: [
      {
        paragraphIndex: 3,
        linkText: "Learn more about FIA membership",
        href: "/accreditations/fia",
      },
    ],
    imageSrc: "/projects/library/hero-fire-alarm-system-installer.jpg",
    imageAlt: "Fire alarm system installation",
    categories: ["company-news", "fire-alarm-systems"],
    relatedServices: [
      { label: "FIA membership", href: "/accreditations/fia" },
      { label: "Fire alarm systems", href: "/services/fire-alarm-systems" },
    ],
  },
  {
    slug: "nsi-gold-inspection-zero-non-conformances",
    title: "NSI Gold inspection completed with zero non-conformances",
    publishedAt: "2025-08-20",
    publishedLabel: "20th August 2025",
    excerpt:
      "Our most recent NSI Gold inspection recorded zero non-conformances, reinforcing the quality controls behind our fire and security delivery.",
    body: [
      "NSI Gold approval for security and fire systems is central to how APX Fire & Security designs, installs and maintains electronic security and fire packages.",
      "Following our most recent NSI Gold inspection, we are pleased to report zero non-conformances. That outcome reflects the day-to-day discipline our engineers and project teams apply to documentation, competence and on-site quality.",
      "Independent inspection is one of the reasons clients and insurers continue to specify NSI-approved contractors. We treat every audit as confirmation that our processes remain fit for purpose, not as a one-off event.",
      "Find out what NSI Gold means for your next fire or security project.",
    ],
    inlineLinks: [
      {
        paragraphIndex: 3,
        linkText: "Find out what NSI Gold means",
        href: "/accreditations/nsi",
      },
    ],
    imageSrc: "/projects/library/apx-fire-security-alarm-box.jpg",
    imageAlt: "NSI-aligned fire and security systems",
    categories: ["company-news"],
    relatedServices: [
      { label: "NSI Gold", href: "/accreditations/nsi" },
      { label: "Security systems", href: "/services/security-systems" },
    ],
  },
  {
    slug: "apx-rebrand-smiths-technical-systems",
    title: "APX Fire & Security: building on the Smiths Technical Systems heritage",
    publishedAt: "2025-06-12",
    publishedLabel: "12th June 2025",
    excerpt:
      "APX Fire & Security continues the fire and security business formerly known as Smiths Technical Systems Ltd, with a heritage dating back to 1986.",
    body: [
      "APX Fire & Security is the current identity of the fire and security business formerly known as Smiths Technical Systems Ltd. Building on a heritage dating back to 1986, we design, install and maintain integrated fire, life-safety and electronic security systems across London and the Home Counties.",
      "The rebrand keeps the same engineering focus: NSI Gold delivery for security and fire, BAFE registration for fire safety services, and clear documentation from survey through to maintenance.",
      "Clients who worked with us as Smiths Technical Systems continue to receive the same teams, standards and aftercare, now under the APX Fire & Security name, alongside our APX MEP sister brand where mechanical and electrical packages are required.",
      "Learn more about our company on the About page, or browse current services and projects.",
    ],
    inlineLinks: [
      {
        paragraphIndex: 3,
        linkText: "About page",
        href: "/about",
      },
    ],
    imageSrc: "/apx-fs-hero-image.jpg",
    imageAlt: "APX Fire & Security",
    categories: ["company-news"],
    relatedServices: [
      { label: "About APX Fire & Security", href: "/about" },
      { label: "Services", href: "/services" },
    ],
  },
  {
    slug: "kings-academy-intruder-alarm-systems",
    title: "Intruder alarm systems for King's Academy",
    publishedAt: "2023-07-10",
    publishedLabel: "10th July 2023",
    excerpt:
      "APX Fire & Security installed intruder alarm systems at the new King's Academy in London, part of King's College Hospital NHS Foundation Trust.",
    body: [
      "We are delighted to mark the opening of the new King's Academy in London, which is part of the King's College Hospital NHS Foundation Trust.",
      "APX Fire & Security installed the intruder alarm systems within the new training academy for nurses, midwives and allied healthcare professionals (AHPs).",
      "Her Royal Highness The Duchess of Edinburgh officially opened the brand-new King's Academy on the same day that the NHS celebrated its 75th anniversary.",
      "King's Academy provides dedicated simulation, teaching and conference rooms, as well as educational facilities, across a floor space of 820 m². It is used by many of the Trust's 8,000 nurses, midwives and AHPs, and by healthcare professionals from other parts of London and the south east.",
      "Dedicated debriefing rooms are used for expert staff and teams to review activity, explore performance and deliver education in a safe learning environment.",
      "Separate teaching rooms enable staff to practise technical skills for procedures such as catheterisation and IV cannulation. The facility also supports in-person and online training for NHS staff from other Trusts, plus international nurses and organisations.",
      "The facility was funded by King's Commercial Services, which works in the UK and internationally to generate funds for the Trust to support staff and improve care for NHS patients. For similar healthcare security packages today, see our intruder alarm systems service.",
    ],
    inlineLinks: [
      {
        paragraphIndex: 6,
        linkText: "intruder alarm systems service",
        href: "/services/intruder-alarm-systems",
      },
    ],
    quote: {
      intro: "Professor Clive Kay, Chief Executive, said:",
      paragraphs: [
        "The King's Academy is a really exciting new project for the Trust, so we were delighted that Her Royal Highness was able to visit the new facility, and meet and talk to staff. The fact we were able to open the new facility on the NHS' 75th birthday made the day extra special, and we are looking forward to using the new facility to help train future generations of healthcare professionals, both at King's and further afield.",
      ],
      author: "Professor Clive Kay",
      role: "Chief Executive",
    },
    imageSrc: "/news/kings-academy-intruder-alarm-systems.jpg",
    imageAlt: "King's Academy security systems NHS",
    categories: ["intruder-alarm-systems", "company-news"],
    relatedServices: [
      { label: "Intruder alarm systems", href: "/services/intruder-alarm-systems" },
      { label: "King's College Hospital case study", href: "/projects/kings-college-hospital" },
    ],
  },
  {
    slug: "lewisham-council-bampton-estate",
    title: "Security systems installation for Lewisham Council",
    publishedAt: "2023-05-30",
    publishedLabel: "30th May 2023",
    excerpt:
      "APX Fire & Security was appointed to install fire, video entry, access control and CCTV systems at the Bampton Estate redevelopment for Lewisham Council.",
    body: [
      "APX Fire & Security was chosen to install security and access packages at the Bampton Estate redevelopment for Lewisham Council in London. Working with Guildmore as main contractor and BFT Electrical and Mechanical, our scope covered fire alarm systems, video door entry, access control and CCTV.",
      "The social homes provide high-quality accommodation for people over 55. The building is three to five storeys, comprising 39 one-bed self-contained flats, with landscaping, a ball court and a communal courtyard looking onto Bampton Green.",
      "For background on the regeneration, see the Lewisham Council website.",
      "This article was published at appointment stage in May 2023. For current fire, CCTV, access and video entry capabilities, visit our modern service pages or contact APX Fire & Security.",
    ],
    inlineLinks: [
      {
        paragraphIndex: 2,
        linkText: "the Lewisham Council website",
        href: "https://lewisham.gov.uk/inmyarea/regeneration/building-affordable-homes/bampton-estate",
      },
      {
        paragraphIndex: 3,
        linkText: "contact APX Fire & Security",
        href: "/contact",
      },
    ],
    imageSrc: "/news/lewisham-council-bampton-estate.jpg",
    imageAlt: "Security systems installation at Bampton Estate Lewisham Council",
    categories: [
      "company-news",
      "fire-alarm-systems",
      "cctv-systems",
      "access-control-systems",
      "video-door-entry-systems",
    ],
    relatedServices: [
      { label: "Fire alarm systems", href: "/services/fire-alarm-systems" },
      { label: "CCTV systems", href: "/services/cctv-systems" },
      { label: "Access control systems", href: "/services/access-control-systems" },
      { label: "Video door entry systems", href: "/services/video-door-entry-systems" },
    ],
  },
  {
    slug: "smart-building-127-charing-cross-road",
    title: "APX Fire & Security appointed for ‘Smart Building’ security at 127 Charing Cross Road",
    publishedAt: "2023-04-28",
    publishedLabel: "28th April 2023",
    excerpt:
      "APX Fire & Security was appointed to install fire and security systems at 127 Charing Cross Road WC2, working with LJJ Electrical and Mechanical Ltd.",
    body: [
      "APX Fire & Security was appointed to install the fire and security systems at 127 Charing Cross Road WC2, working in partnership with LJJ Electrical and Mechanical Ltd.",
      "Our package covered a ‘smart building’ security solution including access control, CCTV, fire alarm, disabled refuge and intruder alarms.",
      "The circa 40,000 sq.ft property had consent to extend to around 60,000 sq.ft, with retail and leisure at ground and lower ground levels and high-specification offices above, plus additional floors at roof level.",
      "The freehold site occupies a prime location close to Tottenham Court Road underground station.",
      "This article records the 2023 appointment. Explore our current fire, CCTV, access, refuge and intruder services, or contact APX Fire & Security to discuss a similar integrated package.",
    ],
    inlineLinks: [
      {
        paragraphIndex: 4,
        linkText: "contact APX Fire & Security",
        href: "/contact",
      },
    ],
    imageSrc: "/news/smart-building-127-charing-cross-road.jpg",
    imageAlt: "Smart building security solution 127 Charing Cross Road",
    categories: [
      "company-news",
      "fire-alarm-systems",
      "cctv-systems",
      "access-control-systems",
      "intruder-alarm-systems",
      "disabled-refuge",
    ],
    relatedServices: [
      { label: "Fire alarm systems", href: "/services/fire-alarm-systems" },
      { label: "CCTV systems", href: "/services/cctv-systems" },
      { label: "Access control systems", href: "/services/access-control-systems" },
      { label: "Refuge & disabled communication", href: "/services/refuge-disabled-communication" },
      { label: "Intruder alarm systems", href: "/services/intruder-alarm-systems" },
    ],
  },
  {
    slug: "portobello-square-wornington-green",
    title: "APX Fire & Security chosen for next phase of Portobello Square",
    publishedAt: "2023-04-18",
    publishedLabel: "18th April 2023",
    excerpt:
      "APX Fire & Security was chosen to install fire alarm, disabled refuge and CCTV systems for a phase of the Portobello Square regeneration at Wornington Green.",
    body: [
      "APX Fire & Security was chosen to install fire alarm systems, disabled refuge and CCTV for a phase of the Portobello Square regeneration at the Wornington Green estate in North Kensington.",
      "The wider Portobello Square regeneration was planned to deliver around 1,000 new homes with no loss of social housing, new commercial and community spaces and 2.3 acres of public park. The phase covered in this announcement included 230 new homes, with social rent and shared ownership homes among them.",
      "The regeneration also aimed to deliver community facilities and improved public realm, with employment, training and social value opportunities for local people.",
      "This article was published at appointment stage in April 2023. For current fire, CCTV and disabled refuge capabilities, see our service pages or contact APX Fire & Security.",
    ],
    inlineLinks: [
      {
        paragraphIndex: 3,
        linkText: "contact APX Fire & Security",
        href: "/contact",
      },
    ],
    imageSrc: "/news/portobello-square-wornington-green.jpg",
    imageAlt: "Security systems installation for Wornington Green",
    categories: ["company-news", "fire-alarm-systems", "cctv-systems", "disabled-refuge"],
    relatedServices: [
      { label: "Fire alarm systems", href: "/services/fire-alarm-systems" },
      { label: "CCTV systems", href: "/services/cctv-systems" },
      { label: "Refuge & disabled communication", href: "/services/refuge-disabled-communication" },
    ],
  },
  {
    slug: "custom-screen-layouts-xts-monitors",
    title: "How APX uses Came BPT XTS monitors for tailored video door entry",
    publishedAt: "2023-03-29",
    publishedLabel: "29th March 2023",
    excerpt:
      "APX Fire & Security specifies Came BPT 7″ XTS IP monitors where residents need clearer, customised video door entry screens, part of our wider video entry design approach.",
    body: [
      "When we design video door entry for houses and multi-occupancy buildings, the handset or monitor is often what residents use every day. One option we frequently specify is the Came BPT 7″ XTS IP monitor, because its interface can be tailored to how each building actually operates.",
      "From an APX perspective, that means clearer home and operational screens: backgrounds and button layouts matched to the entrance, unused functions removed, and schemes that can be applied consistently across a block or differently by floor where the brief requires it.",
      "We use these capabilities to support practical outcomes, faster camera preview at the right door, simpler visitor release for residents, and branding or contact details for the managing agent where appropriate, not as a product catalogue for its own sake.",
      "Product lines change over time. For current video door entry options, including audio/video, IP/networked and mobile answering where available, see our video door entry systems service.",
      "To discuss a video entry project, contact APX Fire & Security.",
    ],
    inlineLinks: [
      {
        paragraphIndex: 3,
        linkText: "video door entry systems service",
        href: "/services/video-door-entry-systems",
      },
      {
        paragraphIndex: 4,
        linkText: "contact APX Fire & Security",
        href: "/contact",
      },
    ],
    imageSrc: "/news/custom-screen-layouts-xts-monitors.jpg",
    imageAlt: "Video door entry monitor installation by APX",
    categories: ["video-door-entry-systems", "company-news"],
    relatedServices: [
      { label: "Video door entry systems", href: "/services/video-door-entry-systems" },
      { label: "Access control systems", href: "/services/access-control-systems" },
    ],
  },
]

export function getNewsArticleBySlug(slug: string): FsNewsArticle | undefined {
  return FS_NEWS_ARTICLES.find((article) => article.slug === slug)
}

export function getLatestNewsArticle(): FsNewsArticle {
  return [...FS_NEWS_ARTICLES].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))[0]
}

export function getNewsArticlesSorted(): FsNewsArticle[] {
  return [...FS_NEWS_ARTICLES].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}
