/** Optional client testimonial shown on the project detail page */
export type FsProjectClientReview = {
  paragraphs: string[]
  author: string
  role: string
  organization: string
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
    scope: "429,000 sq ft across 9 floors",
    systems: "Fire Alarm, Refuge Alarm, PAVA",
    status: "Delivered",
    shortDescription:
      "Installation of fire alarm, refuge and PAVA systems throughout a landmark multi-floor office development in the City of London.",
    summary:
      "The Sancroft Building, situated in the hub of the City of London, is a 429,000 sq. ft office complex across 9 floors plus a basement level. APX Fire & Security was invited by LJJ Electrical Building Services Contractors to carry out the installation of the Fire Alarm, Refuge and PAVA (Public Address & Voice Alarm) systems throughout the building.",
    challenge:
      "Design and deliver a multi-system life-safety installation across a large office estate, while maintaining practical deployment and control across multiple floors.",
    solution:
      "APX Fire & Security carried out the fire installation using Advanced fire panels and Apollo detection, linked to a TOA PAVA system across all floors. The system was connected to ten master PAVA panels and ten fire alarm panels, all interfaced with the PAVA and controlled from a specialised Fire Control Room on the ground floor. Refuge and disabled toilet alarms were installed across all floors using Vox Ignis controls and handsets, again linked to and controlled from the ground floor Fire Control Room.",
    outcome:
      "A robust integrated life-safety solution was delivered with complete floor coverage, centralised control, and a clear, operationally resilient handover for the building team.",
    clientReview: {
      paragraphs: [
        "I have had the pleasure of working with Paul and his team at APX Fire & Security for over 20 years — here at LJJ Ltd for the last 18 years, and for 2 years prior to this at IES in London.",
        "In this time they have carried out over 30 projects for me and have always completed on time and to a very high standard of installation. Even if at the end of projects, when commissioning time has been squeezed, the team have stayed and worked through the night to ensure that all services have been completed, certified and demonstrated to the client.",
        "They have worked on projects ranging from hospitals, schools, hotels, student accommodation, offices and residential apartment developments. Contract values have been from £5k up to £750k and covered all aspects of LV Electrical Works including Fire Alarms, Intruder, CCTV, Access Control, Disabled and Refuge Alarm Systems, IRS and DATA installations.",
        "APX Fire & Security is an important member of our supply chain and I recommend them for the services provided.",
      ],
      author: "Richard Helm",
      role: "Operations Manager",
      organization: "LJJ Mechanical & Electrical Contractors",
    },
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
    scope: "Main estate plus multiple satellite buildings",
    systems: "Intruder Alarms, Panic Alarms, Monitoring",
    status: "Ongoing since 2010",
    shortDescription:
      "Installation, maintenance and monitoring of around 250 intruder alarms across the King’s College Hospital estate and satellite buildings.",
    summary:
      "King’s College Hospital is a major teaching hospital and major trauma centre in Denmark Hill, Camberwell, in the London Borough of Lambeth. APX Fire & Security has been providing services to the trust since 2010.",
    challenge:
      "Protect a large and complex estate of over one million sq. ft, including the main hospital and numerous satellite buildings, while minimising disruption to patients and staff.",
    solution:
      "APX Fire & Security installs, maintains and monitors approximately 250 intruder alarms across the estate. Control equipment has been standardised to make operation easier for trust staff and security teams. Works are delivered both directly with the trust and with principal and sub-contractors for capital projects, with careful planning around live healthcare operations.",
    outcome:
      "The trust benefits from a consistent, manageable and dependable intruder alarm infrastructure across a major live healthcare environment, supported by experienced delivery teams working to tight deadlines.",
    clientReview: {
      paragraphs: [
        "The team at APX Fire & Security maintain the hospital’s intruder and panic alarm systems. We have been dealing with APX for several years and have always found the team to be very helpful, even with those last minute requests on a Friday afternoon!",
        "The engineers are always professional and courteous, taking into account the needs of the hospital and maintaining privacy and dignity for our patients and staff. They provide a high standard of service and are always willing to go the extra mile to ensure the alarm systems are maintained to a high standard and that any issues are quickly and efficiently resolved.",
        "Their engineers have a wealth of knowledge and experience and are always happy to provide advice and guidance on the best solutions for our needs. They keep up to date with the latest technologies and are able to provide practical solutions to help keep our hospitals safe and secure. They provide a prompt response to any queries or requests and always meet any deadlines.",
      ],
      author: "Ian Taylor",
      role: "Head of Security & Helideck Operation",
      organization: "King's College Hospital NHS Foundation Trust",
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
    location: "Leeds, Maidstone, Kent",
    scope: "66 apartments across 5 buildings",
    systems: "CCTV, Access Control",
    status: "Delivered",
    shortDescription:
      "Design, installation and commissioning of CCTV and access control systems for a luxury continual-care retirement village.",
    summary:
      "Ledian Farm is a continual care retirement village in Kent, consisting of 66 two and three bed apartments spread across 5 buildings. Communal facilities include a health and leisure centre, spa, swimming pool, gym, fine dining restaurant, bar, cinema and library.",
    challenge:
      "Provide 24-hour site security and access management across a large, high-end residential environment without compromising privacy or visual quality around the properties.",
    solution:
      "APX Fire & Security was responsible for the design, installation and commissioning of the village’s CCTV and access control systems. The system uses Paxton access control combined with Hikvision CCTV dome and bullet cameras, integrated with a fully controlled PC-based platform linked to smartphones and tablets.",
    outcome:
      "Cameras were discreetly positioned to avoid intrusiveness while still delivering the required level of security, resulting in an effective and easy-to-manage 24-hour security solution for residents and visitors.",
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
      "Maintain resident safety and access continuity during installation phases.",
    solution:
      "Coordinated sequencing with property management and focused zone-based commissioning.",
    outcome:
      "Strengthened system reliability and operational visibility for building teams.",
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
      "Upgrade critical systems without disrupting front-of-house and guest operations.",
    solution:
      "Sequenced installation windows, close coordination with facilities teams and targeted commissioning by zone.",
    outcome:
      "Improved safety and access resilience with minimal operational interruption.",
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
      "APX FS delivered targeted fire alarm improvements to support compliant detection coverage across campus spaces.",
    challenge:
      "Deliver upgrades in occupied educational buildings with constrained access windows.",
    solution:
      "Phased installation planning aligned to building use patterns and stakeholder coordination.",
    outcome:
      "Reliable upgraded fire detection with clean handover and minimal impact on day-to-day operations.",
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
    scope: "10 floors plus basement",
    systems: "PA/VA, Fire Alarm Interface",
    status: "Delivered",
    shortDescription:
      "Design and installation of a multi-floor emergency PA/VA system integrated with fire alarm controls in a major City of London office building.",
    summary:
      "APX Fire & Security was approached to design and install a fire alarm system linked to a public address and voice alarm system for general and emergency announcements. The VX-3308WM wall-mount solution was selected to provide robust operation, practical deployment and cost-effective delivery from design through commissioning.",
    challenge:
      "Deliver high-spec emergency audio performance across multiple floors while balancing programme efficiency, commissioning practicality and project cost.",
    solution:
      "A wall-mount PA/VA system was installed on each floor and linked back to the Fire Control Centre Room on the ground floor. Interlinked systems were connected via fire-rated copper Cat5 cabling, reducing long-distance cable requirements and avoiding a full fibre network approach. Each VX-3308WM unit integrated pre-assembled components including dual 300W amplifiers and power supply, with additional standby amplifiers and VX-3065BB battery boxes for enhanced resilience and backup power. The ground floor control hub included the RM-200SF fire microphone with extension units for expanded emergency control and zoning.",
    outcome:
      "The completed system provided a flexible, standards-compliant PA/VA infrastructure with efficient floor-by-floor commissioning, simpler fault-finding, reduced installation complexity and long-term operational resilience.",
    heroImage: "/projects/library/case-study-pa-va-system-installation-reception.jpg",
    gallery: [
      "/projects/library/case-study-pa-va-system-installation-reception.jpg",
      "/projects/library/hero-fire-alarm-system-installer.jpg",
      "/projects/library/commercial-cctv-monitor-business.jpg",
      "/projects/library/apx-fire-security-alarm-box.jpg",
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
      "APX FS delivered targeted intruder alarm works at Greenwood Centre with programme planning around live public use of the building.",
    challenge:
      "Upgrade security infrastructure in an active public building while maintaining day-to-day access and operations.",
    solution:
      "Phased installation and coordinated engineer attendance to minimize disruption to staff and visitors.",
    outcome:
      "Improved site security performance and operational confidence for the facilities and management teams.",
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
      "APX FS deployed access and entry infrastructure to improve resident control, visitor management and day-to-day building security.",
    challenge:
      "Deliver dependable access solutions that are secure, intuitive and suitable for daily resident use.",
    solution:
      "Combined access control and video entry installations across key perimeter and reception points.",
    outcome:
      "Clearer building access management, improved resident confidence and stronger front-of-house control.",
    heroImage:
      "/projects/case-studies/aspire-herschel-street/access-control-system-installation-aspire-herschel-street-exterior.jpg",
    gallery: [
      "/projects/case-studies/aspire-herschel-street/access-control-system-installation-aspire-herschel-street-exterior.jpg",
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
