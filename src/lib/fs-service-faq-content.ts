export type ServiceFaqItem = { question: string; answer: string }

export const FS_SERVICE_FAQ_FALLBACK: ServiceFaqItem[] = [
  {
    question: "What fire and security projects do you take on?",
    answer:
      "We design, install, commission and maintain fire and security systems across commercial, industrial, residential and public-sector sites in London and the Home Counties, with clear documentation and structured handover.",
  },
  {
    question: "When should we involve your team?",
    answer:
      "Early involvement helps align cabling, containment, power and network capacity with the wider build. We can support concept advice, tender documentation or specialist package delivery as the project requires.",
  },
  {
    question: "Do you coordinate with M&E and IT stakeholders?",
    answer:
      "Yes. We agree interfaces, testing responsibilities and commissioning so detection, access, CCTV and life-safety systems work together as intended.",
  },
  {
    question: "What support do you offer after completion?",
    answer:
      "We offer planned maintenance, reactive support, upgrades and compliance-related inspections, with service reports and asset records for duty holders.",
  },
]

const HUB: ServiceFaqItem[] = [
  {
    question: "How do I find the right fire & security service?",
    answer:
      "Browse our services hub for CCTV, access control, intruder alarms, fire alarms, refuge and EVAC, maintenance and more. Each page summarises typical scope, contact us with your site type and we’ll recommend the right route or survey.",
  },
  {
    question: "Do you work across Greater London and the Home Counties?",
    answer:
      "Yes. We deliver across London boroughs and Kent, Essex, Surrey, Hertfordshire and the wider South East, with programmes aligned to access, occupation and compliance needs.",
  },
  {
    question: "Can you integrate multiple systems on one site?",
    answer:
      "Yes. We routinely coordinate CCTV, access, intruder and fire interfaces, with commissioning documentation that reflects how your site actually runs.",
  },
  {
    question: "How do I request a survey or quotation?",
    answer:
      "Contact us with a short brief. We’ll confirm scope, suggest proportionate next steps and outline how we structure design, installation and handover for your property.",
  },
]

const FIRE_LIFE_SAFETY: ServiceFaqItem[] = [
  {
    question: "What does the Fire & Life Safety overview cover?",
    answer:
      "It is the package view of fire detection, voice evacuation and disabled communication working together. Dedicated detail sits on the fire alarm, EVAC and refuge service pages, with this page used to navigate the full life-safety scope.",
  },
  {
    question: "When should fire detection be defined in the programme?",
    answer:
      "Early coordination avoids costly rework involving device locations, cabling, containment and interfaces with access control, EVAC and BMS. We can become involved during design development or deliver the specialist package once routes have been defined.",
  },
  {
    question: "Can you integrate with EVAC, refuge and access systems?",
    answer:
      "Yes. We coordinate interfaces and testing so fire cause-and-effect, voice evacuation and disabled refuge systems behave consistently with the wider design. See the linked fire alarm, EVAC and refuge service pages for dedicated scopes.",
  },
  {
    question: "What do we receive at handover?",
    answer:
      "Cause-and-effect records, zone charts, as-built drawings, commissioning certificates and O&M information, with training so operators understand how to test, maintain and respond to alarms.",
  },
]

const SECURITY_SYSTEMS: ServiceFaqItem[] = [
  {
    question: "What does the Security Systems overview cover?",
    answer:
      "It is the umbrella for intruder alarms, CCTV, access control, video door entry, gate automation, monitoring and system integration. Intruder alarms are treated as a primary discipline alongside CCTV, dedicated detail sits on each service page.",
  },
  {
    question: "Do you offer mobile-app control and remote viewing?",
    answer:
      "Where the system supplied supports it. We specify app control and remote viewing only for platforms that provide those features, and document operator access at handover.",
  },
  {
    question: "Can systems be monitored and maintained after install?",
    answer:
      "Yes. Monitoring / ARC signalling can be set up where required, and we offer PPM, system takeovers and 24/7 call-out cover for contracted customers, see the maintenance and support page.",
  },
  {
    question: "What commissioning evidence is provided?",
    answer:
      "Interface schedules, integration test records and commissioning certificates so you can demonstrate how security systems work together and maintain them with confidence.",
  },
]

const MAINTENANCE_SUPPORT: ServiceFaqItem[] = [
  {
    question: "What does your maintenance and support cover?",
    answer:
      "Annual and six-monthly PPM, corrective works, system takeovers, obsolescence planning, battery replacement, remote support where available, and monitoring support for fire alarms, CCTV, access control, intruder alarms and video entry, structured around your site risk profile and operating hours.",
  },
  {
    question: "Is 24/7 call-out available to everyone?",
    answer:
      "24/7 / out-of-hours emergency response is included for customers on a maintenance agreement. Ad-hoc attendance for sites without a contract can be discussed case by case, contact us with your system type and location.",
  },
  {
    question: "Can you align with our helpdesk and SLAs?",
    answer:
      "Yes. We align response, reporting and escalation with your contract SLAs and facilities processes, including out-of-hours cover for contracted customers.",
  },
  {
    question: "What records do we receive after visits?",
    answer:
      "Clear service reports after each visit, with defect and remedial records. Asset registers and compliance evidence packs are provided where they form part of the agreed maintenance scope, confirm with us what your contract needs to include.",
  },
  {
    question: "Do you support legacy systems and upgrades?",
    answer:
      "Yes. We assess obsolescence, firmware constraints and migration paths so upgrades and takeovers are planned without unnecessary downtime.",
  },
]

const INTRUDER_SUSTAINABILITY: ServiceFaqItem[] = [
  {
    question: "What graded intruder systems do you install?",
    answer:
      "We install Grade 2 and Grade 3 systems aligned with insurance and risk expectations, with detection, signalling and monitoring options tailored to commercial and industrial sites.",
  },
  {
    question: "When should we book a survey?",
    answer:
      "As soon as you have a brief and access to the property, early survey helps define zones, grades, signalling and integration with CCTV and access control.",
  },
  {
    question: "Can you integrate with police response and ARCs?",
    answer:
      "Where required, we set up ARC signalling, dual-path options (including CSL GradeShift Pro) and documentation for police response expectations, including monitored upgrades on existing systems.",
  },
  {
    question: "What ongoing support is available?",
    answer:
      "System takeover and upgrades, planned preventative maintenance, reactive support and 24/7 call-out cover, with clear records so you can demonstrate reliable operation.",
  },
]

const ACCESS_CONTROL: ServiceFaqItem[] = [
  {
    question: "What access control systems do you install?",
    answer:
      "Fob and card access, keypads, door controllers, single-door and networked systems, and multi-tenant setups. Mobile credentials, lift control and ANPR are included where offered and specified. We also integrate with video entry, gates/barriers, CCTV and intruder systems where required, plus maintenance and system takeovers.",
  },
  {
    question: "Do all systems provide fire release or lockdown?",
    answer:
      "No. Fire alarm release interfaces and emergency unlock or lockdown behaviour are configured only where the fire strategy, door hardware and access platform support them. We design and commission what the brief requires, not a single behaviour for every door.",
  },
  {
    question: "How do you align with BS EN 60839?",
    answer:
      "We structure design, installation and handover with reference to BS EN 60839 where applicable, including access schedules, permissions and training for operators.",
  },
  {
    question: "What happens after installation?",
    answer:
      "Structured handover, user training, and maintenance or takeover options so credentials, schedules and health checks stay manageable as the site evolves.",
  },
]

const CCTV_FS = (kind: "commercial" | "domestic" | "advice"): ServiceFaqItem[] => {
  const intro =
    kind === "commercial"
      ? "commercial offices, retail, logistics and multi-site operations"
      : kind === "domestic"
        ? "homes and residential properties (a deliberate domestic scope separate from our commercial CCTV offer)"
        : "clients evaluating CCTV options, coverage and obligations"
  return [
    {
      question: "What CCTV systems do you design and install?",
      answer: `We design and install IP CCTV and HD analogue upgrades for ${intro}, with remote viewing, recording and retention, camera health monitoring, network segregation and maintenance, plus ANPR and analytics where offered for the site.`,
    },
    {
      question: "Who is responsible for GDPR / lawful CCTV use?",
      answer:
        "APX can configure systems with privacy considerations (coverage, signage guidance and retention design). The customer remains responsible for the lawful operation of CCTV under UK GDPR and related rules, including policies, signage and day-to-day use.",
    },
    {
      question: "Can CCTV integrate with access control and intruder systems?",
      answer:
        "Yes. We coordinate interfaces and commissioning so events, alarms and monitoring workflows align across your security stack.",
    },
    {
      question: "What training and documentation do you provide?",
      answer:
        "User training on recording, export and permissions, plus commissioning records and schedules so estates teams can operate systems confidently, including clarity on operator responsibilities.",
    },
  ]
}

const MECHANICAL_ENGINEERING_FS: ServiceFaqItem[] = [
  {
    question: "What fire alarm scope does this page cover?",
    answer:
      "This service line focuses on fire alarm systems design, installation and commissioning for commercial and industrial environments, with BS 5839-1 aligned delivery and clear handover packs.",
  },
  {
    question: "How do you coordinate with other APX service pages?",
    answer:
      "We link to dedicated refuge, EVAC and security overview pages where interfaces matter, so interfaces and documentation stay consistent across packages.",
  },
  {
    question: "Can you support phased occupation and refurbishments?",
    answer:
      "Yes. We plan commissioning, isolations and phased handover around live operations so safety and compliance are maintained throughout construction.",
  },
  {
    question: "What maintenance options exist after handover?",
    answer:
      "Planned maintenance, fault support and lifecycle upgrades, with reporting aligned to BS 5839 maintenance expectations and your operational model.",
  },
]

const VIDEO_DOOR_ENTRY: ServiceFaqItem[] = [
  {
    question: "What video door entry systems do you install?",
    answer:
      "Audio and video entry for single residences and multi-occupancy buildings, including IP and networked systems. Concierge integration and mobile answering are included where applicable and where the platform supports them.",
  },
  {
    question: "Can video entry integrate with access control and gates?",
    answer:
      "Yes. We routinely coordinate video entry with access control and gate automation so visitor release and credentials work together, and with CCTV where recording of the entrance is required.",
  },
  {
    question: "Do you offer maintenance and upgrades?",
    answer:
      "Yes. PPM, fault attendance, system takeovers and upgrades are available so ageing panels and handsets can be modernised with clear handover for residents and duty holders.",
  },
  {
    question: "How do you align with BS EN 60839?",
    answer:
      "Where applicable we structure design, installation and handover with reference to BS EN 60839 for electronic access control and related entry systems, including permissions and operator training.",
  },
]

const EVAC: ServiceFaqItem[] = [
  {
    question: "What is the difference between EVAC, voice alarm, voice evacuation and PA/VA?",
    answer:
      "EVAC, voice alarm and voice evacuation all refer to the life-safety spoken messaging function covered by BS 5839-8. PA/VA means a public address / voice alarm system that can also handle day-to-day announcements or background music, with emergency messages taking priority.",
  },
  {
    question: "What do you install under BS 5839-8?",
    answer:
      "Zoned and phased evacuation messaging, amplifiers and loudspeakers, fire alarm integration, cause-and-effect testing, commissioning and ongoing maintenance, including background music / general announcement functions where the design specifies shared PA/VA infrastructure.",
  },
  {
    question: "When should EVAC / voice alarm design be fixed?",
    answer:
      "Early coordination with fire strategy, acoustics and containment avoids late changes to speaker layouts, cabling, zoning and audibility testing.",
  },
  {
    question: "What handover and maintenance support is included?",
    answer:
      "Audio test reports, cause-and-effect witness sheets, as-commissioned settings, operator guidance and maintenance options aligned with BS 5839-8 and manufacturer guidance.",
  },
]

const GATE_AUTOMATION: ServiceFaqItem[] = [
  {
    question: "What gate automation services do you offer?",
    answer:
      "Installation, servicing, repairs and maintenance for automated gates, barriers and bollards. Our Gate Safe trained engineers work with leading brands including Roger Technology, BFT, CAME, FAAC and Nice.",
  },
  {
    question: "Are powered gates treated as machinery?",
    answer:
      "Yes. Powered gates are classed as machines even in domestic settings, so they must be safe, legally compliant, correctly installed and properly maintained. Installations must comply with the Supply of Machinery (Safety) Regulations 2008.",
  },
  {
    question: "Who is responsible if a domestic electric gate injures someone?",
    answer:
      "As a homeowner you are responsible for ensuring your electric gate is safe and does not pose a risk to family, visitors, delivery drivers or members of the public. Even on private property, if the gate causes injury you almost certainly will be held legally responsible.",
  },
  {
    question: "Do managed residential sites need regular gate maintenance?",
    answer:
      "Yes. Residential complexes managed by landlords or managing agents, or with shared communal entrance gates, are subject to health and safety legislation, including the requirement for regular maintenance of electric gates and barriers. Relevant duties include the Health and Safety at Work Act 1974, the Workplace (Health, Safety and Welfare) Regulations 1992 and PUWER 1998.",
  },
  {
    question: "What risks do you look for on a survey?",
    answer:
      "Compliance issues, crushing and dragging points, inadequate safety devices and incorrectly installed equipment, as well as how the entrance is actually used day to day.",
  },
]

const REFUGE: ServiceFaqItem[] = [
  {
    question: "What systems does this service cover?",
    answer:
      "Disabled refuge systems, fire telephone systems, disabled toilet alarms and central control panels with two-way communication, designed, installed and commissioned to BS 5839-9, with routine testing and maintenance options.",
  },
  {
    question: "How do you coordinate with fire alarm and EVAC?",
    answer:
      "We align interfaces, cause-and-effect and commissioning so refuge, fire telephone, toilet alarm and EVAC behaviour matches the wider life-safety design.",
  },
  {
    question: "Can you support existing buildings and upgrades?",
    answer:
      "Yes. We survey legacy EVC, refuge, fire telephone and toilet alarm systems, plan phased upgrades and minimise disruption while keeping clear records for operators.",
  },
  {
    question: "What training and ongoing support do you provide?",
    answer:
      "Operator training on use, testing and fault reporting, with O&M information and routine testing / maintenance options structured for estates teams.",
  },
]

const ELECTRICAL_SYSTEMS_FS: ServiceFaqItem[] = [
  {
    question: "What CCTV systems does this service cover?",
    answer:
      "Primarily commercial CCTV: IP systems, HD analogue upgrades, remote viewing, recording and retention, camera health monitoring, network segregation, maintenance and repairs, with ANPR and analytics where offered. Domestic CCTV is a separate, deliberate scope.",
  },
  {
    question: "Who is responsible for GDPR compliance?",
    answer:
      "We can configure privacy-conscious systems (coverage, signage guidance, retention). The customer remains responsible for lawful CCTV operation under UK GDPR.",
  },
  {
    question: "How do you integrate with other security systems?",
    answer:
      "We coordinate with access control and intruder systems so events, recording and monitoring workflows align across your estate.",
  },
  {
    question: "What is included at handover?",
    answer:
      "Camera schedules, network diagrams, commissioning records and user training, so operators can manage permissions and retention confidently.",
  },
]

const MONITORING: ServiceFaqItem[] = [
  {
    question: "What monitoring options do you offer?",
    answer:
      "We arrange alarm receiving centre (ARC) signalling and related remote pathways for intruder, fire and CCTV systems where the site design requires them, including dual-path options where insurers or ARCs expect resilient signalling.",
  },
  {
    question: "Do you run your own alarm receiving centre?",
    answer:
      "We commission and support signalling into accredited ARC partners appropriate to the system and response grade. Exact ARC arrangements are confirmed at survey and in the quotation.",
  },
  {
    question: "Can monitoring be added to an existing system?",
    answer:
      "Often yes. We survey the control equipment, signalling path and documentation, then recommend upgrades or configuration changes needed for reliable ARC connection.",
  },
  {
    question: "How does monitoring relate to maintenance and call-out?",
    answer:
      "Monitoring escalates events when the site is unattended. Planned maintenance keeps systems healthy, and 24/7 call-out (for contracted customers) provides engineer attendance when faults need on-site response.",
  },
]

const EMERGENCY_CALL_OUT: ServiceFaqItem[] = [
  {
    question: "Who receives 24/7 call-out cover?",
    answer:
      "Out-of-hours emergency response is included for customers on a maintenance agreement. Ad-hoc attendance for sites without a contract can be discussed case by case.",
  },
  {
    question: "What systems can you attend?",
    answer:
      "Fire alarms, intruder alarms, CCTV, access control, video door entry and related interfaces, subject to the systems covered by your agreement and engineer availability for the fault type.",
  },
  {
    question: "How do we raise an emergency call?",
    answer:
      "Contracted customers receive the agreed out-of-hours contact route at handover. For new cover, contact us to discuss a maintenance agreement that includes 24/7 response.",
  },
  {
    question: "Will an engineer fix the fault on the first visit?",
    answer:
      "We diagnose and make safe where possible. Some faults need parts, manufacturer support or a planned return visit, you receive a clear attendance report and recommended next steps.",
  },
]

const FS_FAQ_BY_PATH: Record<string, ServiceFaqItem[]> = {
  "/services": HUB,
  "/services/fire-life-safety": FIRE_LIFE_SAFETY,
  "/services/security-systems": SECURITY_SYSTEMS,
  "/services/maintenance-support": MAINTENANCE_SUPPORT,
  "/services/monitoring": MONITORING,
  "/services/emergency-call-out": EMERGENCY_CALL_OUT,
  "/services/intruder-alarm-systems": INTRUDER_SUSTAINABILITY,
  "/services/access-control-systems": ACCESS_CONTROL,
  "/services/cctv-systems": ELECTRICAL_SYSTEMS_FS,
  "/services/fire-alarm-systems": MECHANICAL_ENGINEERING_FS,
  "/services/video-door-entry-systems": VIDEO_DOOR_ENTRY,
  "/services/gate-automation-systems": GATE_AUTOMATION,
  "/services/evac-voice-evacuation": EVAC,
  "/services/refuge-disabled-communication": REFUGE,
  "/services/cctv/commercial": CCTV_FS("commercial"),
  "/services/cctv/domestic": CCTV_FS("domestic"),
  "/services/cctv/advice": CCTV_FS("advice"),
}

export function normalizeServicePathname(pathname: string): string {
  let p = pathname.split("?")[0] || "/"
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1)
  return p
}

export function getFsServiceFaqItems(pathname: string): ServiceFaqItem[] {
  const p = normalizeServicePathname(pathname)
  return FS_FAQ_BY_PATH[p] ?? FS_SERVICE_FAQ_FALLBACK
}
