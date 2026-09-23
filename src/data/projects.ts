/** Optional client testimonial shown on the project detail page */
export type FsProjectClientReview = {
  paragraphs: string[]
  author: string
  role: string
  organization: string
  /** Official site for the organization name in the review footer */
  organizationUrl?: string
}

export type FsProject = {
  slug: string
  title: string
  sector: string
  location: string
  scope: string
  systems: string
  status: string
  shortDescription: string
  summary: string
  challenge: string
  solution: string
  outcome: string
  heroImage: string
  gallery: string[]
  /** Optional callout, e.g. ongoing maintenance vs one-off install */
  engagementNote?: string
  /** Principal contractor or client named for clarity of APX’s role */
  contractorOrClient?: string
  clientReview?: FsProjectClientReview
}

export const MAIN_CASE_STUDY_SLUGS = [
  "sancroft-building",
  "ledian-farm",
  "kings-college-hospital",
  "pa-va-system-city-of-london",
] as const

export const FS_PROJECTS: FsProject[] = [
  {
    slug: "sancroft-building",
    title: "Sancroft Building, Paternoster Square",
    sector: "Commercial Offices",
    location: "City of London",
    scope: "Fire, refuge and PA/VA packages across 9 floors + basement",
    systems: "Fire Alarm, Refuge Alarm, PA/VA",
    status: "Delivered",
    contractorOrClient: "LJJ Electrical Building Services Contractors",
    shortDescription:
      "Installation of fire alarm, refuge and PA/VA (public address / voice alarm) systems throughout a landmark multi-floor office development in the City of London.",
    summary:
      "The Sancroft Building, in the City of London, is a 429,000 sq. ft office complex across 9 floors plus a basement. APX Fire & Security was engaged by LJJ Electrical Building Services Contractors to install the fire alarm, refuge and PA/VA systems throughout the building, not the wider building fabric or other trades’ packages.",
    challenge:
      "Deliver integrated fire, refuge and PA/VA systems across a nine-floor City office, coordinating with other trades while keeping every floor operational and maintaining clear central control from a single ground-floor fire room.",
    solution:
      "APX installed Advanced fire panels with Apollo detection, linked to TOA PA/VA across all floors. Ten master PA/VA and ten fire alarm panels interface from a dedicated ground-floor control room, with Vox Ignis refuge and disabled WC alarms on every level.",
    outcome:
      "Complete floor coverage for the fire, refuge and PA/VA packages in APX’s scope, with centralised monitoring, resilient cause-and-effect integration and a handover package for the building team.",
    heroImage:
      "/projects/case-studies/sancroft-building/case-study-sancroft-building-fire-alarm-installation-exterior.jpg",
    gallery: [
      "/projects/case-studies/sancroft-building/case-study-sancroft-building-fire-alarm-installation-exterior.jpg",
      "/projects/case-studies/sancroft-building/case-study-sancroft-building-fire-alarm-installation-foyer-800x533.jpg",
      "/projects/case-studies/sancroft-building/case-study-sancroft-building-fire-alarm-installation-reception-800x533.jpg",
      "/projects/case-studies/sancroft-building/case-study-sancroft-building-fire-alarm-installation-level2-800x533.jpg",
      "/projects/case-studies/sancroft-building/case-study-sancroft-building-fire-alarm-installation-level-6-800x533.jpg",
      "/projects/case-studies/sancroft-building/case-study-sancroft-building-fire-alarm-installation-lounge-800x533.jpg",
      "/projects/case-studies/sancroft-building/case-study-sancroft-building-fire-alarm-installation-collage-800x533.jpg",
      "/projects/case-studies/sancroft-building/case-study-sancroft-building-fire-alarm-installation-roof-800x533.jpg",
      "/projects/case-studies/sancroft-building/case-study-sancroft-building-fire-alarm-installation-restrooms-800x533.jpg",
    ],
  },
  {
    slug: "kings-college-hospital",
    title: "King's College Hospital NHS Foundation Trust",
    sector: "Healthcare",
    location: "Denmark Hill, London",
    scope: "Ongoing estate programme, installations, maintenance and monitoring",
    systems: "Intruder Alarms, Panic Alarms, Monitoring",
    status: "Ongoing since 2010",
    contractorOrClient: "King's College Hospital NHS Foundation Trust",
    engagementNote:
      "This is an ongoing maintenance and monitoring relationship with the trust, not a single completed construction project. Individual installations and upgrades are delivered as required across the main estate and satellite buildings, alongside planned maintenance and monitoring of around 250 intruder and panic alarm systems.",
    shortDescription:
      "Ongoing installation, maintenance and monitoring of around 250 intruder and panic alarms across the King’s College Hospital estate and satellite buildings.",
    summary:
      "King’s College Hospital is a major teaching hospital and major trauma centre in Denmark Hill, Camberwell, in the London Borough of Lambeth. Since 2010, APX Fire & Security has provided an ongoing programme of intruder and panic alarm installation, maintenance and monitoring for the trust, covering the main estate and satellite buildings.",
    challenge:
      "Safeguard a major teaching hospital estate exceeding one million sq ft, including satellite buildings, without disrupting patient care, clinical routines or the security team's daily operations.",
    solution:
      "APX delivers both planned maintenance/monitoring and individual installations or upgrades as needed. Around 250 intruder alarms are maintained and monitored across the trust, with standardised control equipment for day-to-day use. Works are phased around live wards and delivered direct or alongside capital-project contractors where APX’s package requires it.",
    outcome:
      "Consistent intruder-alarm coverage estate-wide under an ongoing maintenance and monitoring contract, with responsive engineers who meet healthcare deadlines and respect privacy on every visit.",
    clientReview: {
      paragraphs: [
        "The team at APX Fire & Security maintain the hospital’s intruder and panic alarm systems. We have been dealing with APX for several years and have always found the team to be very helpful, even with those last minute requests on a Friday afternoon!",
        "The engineers are always professional and courteous, taking into account the needs of the hospital and maintaining privacy and dignity for our patients and staff. They provide a high standard of service and are always willing to go the extra mile to ensure the alarm systems are maintained to a high standard and that any issues are quickly and efficiently resolved.",
        "Their engineers have a wealth of knowledge and experience and are always happy to provide advice and guidance on the best solutions for our needs. They keep up to date with the latest technologies and are able to provide practical solutions to help keep our hospitals safe and secure. They provide a prompt response to any queries or requests and always meet any deadlines.",
      ],
      author: "Ian Taylor",
      role: "Head of Security & Helideck Operation",
      organization: "King's College Hospital NHS Foundation Trust",
      organizationUrl: "https://www.kch.nhs.uk/",
    },
    heroImage:
      "/projects/case-studies/kings-college-hospital/case-study-kings-college-hospital-nhs-foundation-trust.jpg",
    gallery: [
      "/projects/case-studies/kings-college-hospital/case-study-kings-college-hospital-nhs-foundation-trust.jpg",
      "/projects/case-studies/kings-college-hospital/case-study-kings-college-hospital-nhs-foundation-trust-2.jpg",
      "/projects/case-studies/kings-college-hospital/case-study-kings-college-hospital-exterior-800x533-willowfield.jpg",
      "/projects/case-studies/kings-college-hospital/case-study-kings-college-hospital-renal-dialysis-800x533-renal-dialysis.jpg",
      "/projects/case-studies/kings-college-hospital/intruder-alarm-kings-college-hospital-renal-dialysis.jpg",
    ],
  },
  {
    slug: "ledian-farm",
    title: "Ledian Farm Luxury Retirement Village",
    sector: "Retirement Living",
    location: "Leeds village, near Maidstone, Kent",
    scope: "CCTV and access control across 5 buildings (66 apartments)",
    systems: "CCTV, Access Control",
    status: "Delivered",
    contractorOrClient: "LJJ Mechanical & Electrical Contractors",
    shortDescription:
      "Design, installation and commissioning of CCTV and access control systems for a luxury continual-care retirement village.",
    summary:
      "Ledian Farm is a continual-care retirement village in the Kent village of Leeds, near Maidstone. It comprises 66 two- and three-bed apartments across five buildings, with communal facilities including a health and leisure centre, spa, swimming pool, gym, restaurant, bar, cinema and library. APX’s contracted scope was CCTV and access control.",
    challenge:
      "Secure a luxury retirement village across five buildings and shared leisure facilities, delivering 24-hour CCTV and access control without compromising residents' privacy or the quality of the built environment.",
    solution:
      "APX designed, installed and commissioned Paxton access control with Hikvision dome and bullet cameras, integrated through a PC-based platform with remote access via smartphones and tablets for authorised staff.",
    outcome:
      "Discreet camera placement and intuitive access permissions give residents round-the-clock protection and easy visitor management within APX’s CCTV and access-control package, with a platform the estate team can operate confidently.",
    clientReview: {
      paragraphs: [
        "I have had the pleasure of working with Paul and his team at APX Fire & Security for over 20 years, here at LJJ Ltd for the last 18 years, and for 2 years prior to this at IES in London.",
        "In this time they have carried out over 30 projects for me and have always completed on time and to a very high standard of installation. Even if at the end of projects, when commissioning time has been squeezed, the team have stayed and worked through the night to ensure that all services have been completed, certified and demonstrated to the client.",
        "They have worked on projects ranging from hospitals, schools, hotels, student accommodation, offices and residential apartment developments, covering fire alarms, intruder, CCTV, access control, disabled and refuge alarm systems and related LV electrical works.",
        "APX Fire & Security is an important member of our supply chain and I recommend them for the services provided.",
      ],
      author: "Richard Helm",
      role: "Operations Manager",
      organization: "LJJ Mechanical & Electrical Contractors",
      organizationUrl: "https://www.ljjcontractors.com/",
    },
    heroImage:
      "/projects/case-studies/ledian-farm/case-study-ledian-farm-cctv-access-control-exterior.jpg",
    gallery: [
      "/projects/case-studies/ledian-farm/case-study-ledian-farm-cctv-access-control-exterior.jpg",
      "/projects/case-studies/ledian-farm/case-study-ledian-farm-cctv-access-control-entrance.jpg",
      "/projects/case-studies/ledian-farm/case-study-ledian-farm-cctv-access-control-lobby.jpg",
      "/projects/case-studies/ledian-farm/case-study-ledian-farm-cctv-access-control-lounge.jpg",
      "/projects/case-studies/ledian-farm/case-study-ledian-farm-cctv-access-control-bar.jpg",
      "/projects/case-studies/ledian-farm/case-study-ledian-farm-cctv-access-control-courtyard.jpg",
      "/projects/case-studies/ledian-farm/case-study-ledian-farm-cctv-access-control-buildings.jpg",
      "/projects/case-studies/ledian-farm/case-study-ledian-farm-cctv-access-control-hallway.jpg",
      "/projects/case-studies/ledian-farm/case-study-ledian-farm-cctv-access-control-kitchen.jpg",
      "/projects/case-studies/ledian-farm/access-control-system-installation-ledian-farm-reception.jpg",
    ],
  },
  {
    slug: "scape-bloomsbury",
    title: "Scape Bloomsbury Student Accommodation",
    sector: "Student Accommodation",
    location: "Central London",
    scope: "High-occupancy residential upgrade",
    systems: "Fire Alarms, Access Control",
    status: "Delivered",
    shortDescription:
      "Integrated fire and access systems for student accommodation and shared resident areas.",
    summary:
      "Security and life-safety systems delivered across key resident and common spaces within a busy student accommodation setting.",
    challenge:
      "Upgrade fire and access systems across a high-occupancy student building while keeping corridors, common areas and resident routes open and safe throughout phased installation works.",
    solution:
      "APX coordinated installation sequencing with property management, completing fire alarm and access upgrades zone by zone with focused commissioning before handover to the on-site team.",
    outcome:
      "Stronger life-safety and access control across resident and shared spaces, with clearer operational visibility for building teams and minimal disruption to day-to-day student life.",
    heroImage:
      "/projects/case-studies/scape-bloomsbury/fire-alarm-system-installation-scape-bloomsbury-exterior.jpg",
    gallery: [
      "/projects/case-studies/scape-bloomsbury/fire-alarm-system-installation-scape-bloomsbury-exterior.jpg",
      "/projects/case-studies/scape-bloomsbury/access-control-system-installation-scape-bloomsbury-exterior.jpg",
      "/projects/case-studies/scape-bloomsbury/fire-alarm-system-installation-scape-bloomsbury-lounge.jpg",
      "/projects/case-studies/scape-bloomsbury/access-control-system-installation-scape-bloomsbury-library.jpg",
    ],
  },
  {
    slug: "mayfair-townhouse",
    title: "The Mayfair Townhouse",
    sector: "Hospitality",
    location: "Central London",
    scope: "Live-hotel phased installation",
    systems: "Fire Alarms, Access Control",
    status: "Delivered",
    shortDescription:
      "Fire detection and access control upgrades delivered in a live luxury hospitality environment.",
    summary:
      "Carefully phased installation works coordinated around hotel operations to maintain guest experience and operational continuity.",
    challenge:
      "Refresh critical fire and access systems in a live luxury hotel without interrupting guest experience, front-of-house operations or the daily rhythm of a busy Mayfair property.",
    solution:
      "APX planned sequenced installation windows with the facilities team, completing fire detection and access upgrades by zone with targeted commissioning before each area returned to full use.",
    outcome:
      "Improved safety and access resilience across guest and back-of-house areas, delivered with minimal operational interruption and a clean handover for hotel management.",
    heroImage:
      "/projects/case-studies/mayfair-townhouse/fire-alarm-system-mayfair-townhouse-london.jpg",
    gallery: [
      "/projects/case-studies/mayfair-townhouse/fire-alarm-system-mayfair-townhouse-london.jpg",
      "/projects/case-studies/mayfair-townhouse/fire-alarm-system-mayfair-townhouse-garden-suite.jpg",
      "/projects/case-studies/mayfair-townhouse/access-control-system-installation-mayfair-townhouse-exterior.jpg",
    ],
  },
  {
    slug: "university-of-west-london",
    title: "University of West London Campus Estate",
    sector: "Education",
    location: "London",
    scope: "Campus building upgrades",
    systems: "Fire Alarms",
    status: "Delivered",
    shortDescription:
      "Fire alarm installation and upgrades across occupied university environments.",
    summary:
      "APX Fire & Security delivered targeted fire alarm improvements to support compliant detection coverage across campus spaces.",
    challenge:
      "Improve fire detection across occupied campus buildings with limited access windows, balancing teaching timetables, exam periods and the need for compliant coverage in shared teaching spaces.",
    solution:
      "APX phased installation around building use patterns, coordinating with university stakeholders to upgrade alarm infrastructure floor by floor without closing teaching areas unnecessarily.",
    outcome:
      "Reliable, upgraded fire detection with documentation and testing records aligned to handover requirements, and minimal impact on students, staff and daily campus operations.",
    heroImage:
      "/projects/case-studies/university-of-west-london/fire-alarm-installation-university-of-west-london-exterior.jpg",
    gallery: [
      "/projects/case-studies/university-of-west-london/fire-alarm-installation-university-of-west-london-exterior.jpg",
      "/projects/case-studies/university-of-west-london/fire-alarm-installation-university-of-west-london-reception.jpg",
    ],
  },
  {
    slug: "pa-va-system-city-of-london",
    title: "Emergency PA/VA System, City of London",
    sector: "Commercial Offices",
    location: "City of London",
    scope: "PA/VA across 10 floors plus basement, fire-alarm interface",
    systems: "PA/VA, Fire Alarm Interface",
    status: "Delivered",
    shortDescription:
      "Design and installation of a multi-floor emergency PA/VA (public address / voice alarm) system integrated with fire alarm controls in a major City of London office building.",
    summary:
      "APX Fire & Security designed and installed a fire-alarm-linked public address / voice alarm (PA/VA) system for general and emergency announcements. The VX-3308WM wall-mount solution was selected for robust operation, practical deployment and cost-effective delivery from design through commissioning.",
    challenge:
      "Design and install a multi-floor emergency PA/VA system linked to fire alarm controls, meeting strict audio performance standards while keeping programme cost, cabling routes and commissioning practical on a busy City office build.",
    solution:
      "Wall-mount VX-3308WM PA/VA units on each floor feed back to a ground-floor Fire Control Centre via fire-rated Cat5 links. Dual amplifiers, standby units and battery backup at each level simplify fault-finding and reduce long cable runs.",
    outcome:
      "A flexible, BS 5839-aligned PA/VA estate with efficient floor-by-floor commissioning, clearer zoning from the ground-floor hub and a resilient audio infrastructure the facilities team can maintain with confidence.",
    heroImage: "/projects/library/case-study-pa-va-system-installation-reception.jpg",
    gallery: [
      "/projects/library/case-study-pa-va-system-installation-reception.jpg",
    ],
  },
  {
    slug: "camden-council-greenwood-centre",
    title: "Camden Council Greenwood Centre",
    sector: "Local Authority",
    location: "Camden, London",
    scope: "Occupied civic and community facility",
    systems: "Intruder Alarms",
    status: "Delivered",
    shortDescription:
      "Intruder alarm enhancements to improve resilience and monitoring in a busy council-operated environment.",
    summary:
      "APX Fire & Security delivered targeted intruder alarm works at Greenwood Centre with programme planning around live public use of the building.",
    challenge:
      "Enhance intruder alarm resilience at a busy council-operated community centre while maintaining public access, staff workflows and the centre's daily programme of activities.",
    solution:
      "APX delivered phased intruder alarm works with coordinated engineer attendance, completing upgrades in live areas and validating monitoring paths before returning spaces to public use.",
    outcome:
      "Stronger site security and monitoring performance for Camden Council, with improved operational confidence for facilities and management teams using the building every day.",
    heroImage:
      "/projects/case-studies/camden-council-greenwood-centre/intruder-alarm-greenwood-centre-camden-council-interior.jpg",
    gallery: [
      "/projects/case-studies/camden-council-greenwood-centre/intruder-alarm-greenwood-centre-camden-council-interior.jpg",
      "/projects/library/intruder-alarm-monitoring-company-sq.jpg",
    ],
  },
  {
    slug: "aspire-herschel-street",
    title: "Aspire Herschel Street Access and Entry Systems",
    sector: "Residential",
    location: "Slough, Berkshire",
    scope: "Front-of-house and resident access zones",
    systems: "Access Control, Video Door Entry",
    status: "Delivered",
    shortDescription:
      "Integrated door entry and access control installation for a modern residential development.",
    summary:
      "APX Fire & Security deployed access and entry infrastructure to improve resident control, visitor management and day-to-day building security.",
    challenge:
      "Provide secure, intuitive access and video entry across a modern residential development, supporting daily resident use, visitor management and front-of-house control at reception and perimeter doors.",
    solution:
      "APX combined access control and video door entry at key perimeter and reception points, integrating entry permissions with a platform the managing agent could administer without specialist support.",
    outcome:
      "Clearer building access management for residents and staff, improved visitor handling at the front door and stronger day-to-day security across the development's shared and private areas.",
    heroImage:
      "/fire%20alarm%20system%20installations/access-control-system-installation-aspire-herschel-street-exterior-800x533.jpg",
    gallery: [
      "/fire%20alarm%20system%20installations/access-control-system-installation-aspire-herschel-street-exterior-800x533.jpg",
      "/projects/case-studies/aspire-herschel-street/video-door-entry-installation-aspire-herschel-street-exterior.jpg",
    ],
  },
]

export function getProjectBySlug(slug: string) {
  return FS_PROJECTS.find((project) => project.slug === slug)
}

export const MAIN_CASE_STUDIES: FsProject[] = MAIN_CASE_STUDY_SLUGS.map((slug) =>
  FS_PROJECTS.find((project) => project.slug === slug)
).filter((project): project is FsProject => Boolean(project))
