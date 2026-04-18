export type ServiceFaqItem = { question: string; answer: string }

export const FS_SERVICE_FAQ_FALLBACK: ServiceFaqItem[] = [
  {
    question: "What fire and security projects do you take on?",
    answer:
      "We design, install, commission and maintain fire and security systems across commercial, industrial, residential and public-sector sites in London and the Home Counties — with clear documentation and structured handover.",
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
      "We offer planned maintenance, reactive support, upgrades and compliance-related inspections — with service reports and asset records for duty holders.",
  },
]

const HUB: ServiceFaqItem[] = [
  {
    question: "How do I find the right fire & security service?",
    answer:
      "Browse our services hub for CCTV, access control, intruder alarms, fire alarms, refuge and EVAC, maintenance and more. Each page summarises typical scope — contact us with your site type and we’ll recommend the right route or survey.",
  },
  {
    question: "Do you work across Greater London and the Home Counties?",
    answer:
      "Yes. We deliver across London boroughs and Kent, Essex, Surrey, Hertfordshire and the wider South East — with programmes aligned to access, occupation and compliance needs.",
  },
  {
    question: "Can you integrate multiple systems on one site?",
    answer:
      "Yes. We routinely coordinate CCTV, access, intruder and fire interfaces — with commissioning documentation that reflects how your site actually runs.",
  },
  {
    question: "How do I request a survey or quotation?",
    answer:
      "Contact us with a short brief. We’ll confirm scope, suggest proportionate next steps and outline how we structure design, installation and handover for your property.",
  },
]

const FIRE_LIFE_SAFETY: ServiceFaqItem[] = [
  {
    question: "What fire alarm systems do you install?",
    answer:
      "We install addressable and conventional fire alarm systems with cause-and-effect programming, commissioning and certification — aligned with BS 5839-1 and your fire strategy across London and the Home Counties.",
  },
  {
    question: "When should fire detection be defined in the programme?",
    answer:
      "Early coordination avoids costly rework on device locations, cabling, containment and interfaces to access, EVAC and BMS — we can join at design development or as a specialist package when routes are already defined.",
  },
  {
    question: "Can you integrate with EVAC, refuge and access systems?",
    answer:
      "Yes. We coordinate interfaces and testing so fire cause-and-effect, voice evacuation and disabled refuge systems behave consistently with the wider design.",
  },
  {
    question: "What do we receive at handover?",
    answer:
      "Zone charts, as-built drawings, commissioning certificates and O&M information — with training so operators understand how to test, maintain and respond to alarms.",
  },
]

const SECURITY_SYSTEMS: ServiceFaqItem[] = [
  {
    question: "What integrated security work do you deliver?",
    answer:
      "We coordinate CCTV, access control, intruder alarms and interfaces to fire and BMS — so monitoring, events and responses work together across commercial and public-sector sites.",
  },
  {
    question: "How do you manage data protection and signage?",
    answer:
      "We align camera placement, retention, access control and lawful use with GDPR expectations and site policies — with documentation that reflects your operating model.",
  },
  {
    question: "Can you work with our existing estate standards?",
    answer:
      "Yes. We can align equipment, monitoring and reporting with your standardised architecture — including phased upgrades and migration planning where required.",
  },
  {
    question: "What commissioning evidence is provided?",
    answer:
      "Interface schedules, test records and commissioning certificates so you can demonstrate integrated behaviour and maintain systems with confidence.",
  },
]

const MAINTENANCE_SUPPORT: ServiceFaqItem[] = [
  {
    question: "What does your maintenance and support cover?",
    answer:
      "Planned preventative maintenance, reactive call-outs, health checks and upgrades for fire alarms, CCTV and access systems — structured around your site risk profile and operating hours.",
  },
  {
    question: "Can you align with our helpdesk and SLAs?",
    answer:
      "Yes. We align response, reporting and escalation with your contract SLAs and facilities processes, including out-of-hours where required.",
  },
  {
    question: "How do you evidence compliance for duty holders?",
    answer:
      "Service reports, defect records, asset registers and compliance certificates — so you can demonstrate upkeep and plan remedial work with clarity.",
  },
  {
    question: "Do you support legacy systems and upgrades?",
    answer:
      "Yes. We assess obsolescence, firmware constraints and migration paths so upgrades are planned without unnecessary downtime.",
  },
]

const INTRUDER_SUSTAINABILITY: ServiceFaqItem[] = [
  {
    question: "What graded intruder systems do you install?",
    answer:
      "We install Grade 1, 2 and 3 systems aligned with insurance and risk expectations — with detection, signalling and monitoring options tailored to commercial and industrial sites.",
  },
  {
    question: "When should we book a survey?",
    answer:
      "As soon as you have a brief and access to the property — early survey helps define zones, grades, signalling and integration with CCTV and access control.",
  },
  {
    question: "Can you integrate with police response and ARCs?",
    answer:
      "Where required, we align signalling, documentation and commissioning with your alarm receiving centre and police response expectations.",
  },
  {
    question: "What ongoing support is available?",
    answer:
      "Planned maintenance, reactive support and system upgrades — with clear records so you can demonstrate reliable operation and respond quickly to faults.",
  },
]

const ACCESS_CONTROL: ServiceFaqItem[] = [
  {
    question: "What access control and video entry systems do you install?",
    answer:
      "Door readers, fob/card systems, multi-tenant panels and video entry — from single doors to networked estates, coordinated with CCTV and intruder systems where required.",
  },
  {
    question: "How do you align with BS EN 60839?",
    answer:
      "We structure design, installation and handover with reference to BS EN 60839 where applicable — including access schedules, permissions and training for operators.",
  },
  {
    question: "Can you integrate with CCTV and intruder alarms?",
    answer:
      "Yes. We coordinate interfaces and commissioning so access events, alarms and monitoring paths work together as specified.",
  },
  {
    question: "What happens after installation?",
    answer:
      "Structured handover, user training and maintenance options — so permissions, credentials and health checks stay manageable as the site evolves.",
  },
]

const CCTV_FS = (kind: "commercial" | "domestic" | "advice"): ServiceFaqItem[] => {
  const intro =
    kind === "commercial"
      ? "commercial offices, retail, logistics and multi-site operations"
      : kind === "domestic"
        ? "homes and residential properties"
        : "clients evaluating CCTV options, coverage and obligations"
  return [
    {
      question: "What CCTV systems do you design and install?",
      answer: `We design and install IP and analogue CCTV for ${intro} — with recording, retention and secure network integration aligned to your risk profile and GDPR expectations.`,
    },
    {
      question: "How do you handle privacy and signage?",
      answer:
        "We align camera placement, signage, retention and access permissions with lawful use and project policies — with handover guidance for operators.",
    },
    {
      question: "Can CCTV integrate with access control and intruder systems?",
      answer:
        "Yes. We coordinate interfaces and commissioning so events, alarms and monitoring workflows align across your security stack.",
    },
    {
      question: "What training and documentation do you provide?",
      answer:
        "User training on recording, export and permissions — plus commissioning records and schedules so estates teams can operate systems confidently.",
    },
  ]
}

const MECHANICAL_ENGINEERING_FS: ServiceFaqItem[] = [
  {
    question: "What fire alarm scope does this page cover?",
    answer:
      "This service line focuses on fire alarm systems design, installation and commissioning for commercial and industrial environments — with BS 5839-1 aligned delivery and clear handover packs.",
  },
  {
    question: "How do you coordinate with other APX service pages?",
    answer:
      "We link to dedicated refuge, EVAC and security overview pages where interfaces matter — so interfaces and documentation stay consistent across packages.",
  },
  {
    question: "Can you support phased occupation and refurbishments?",
    answer:
      "Yes. We plan commissioning, isolations and phased handover around live operations so safety and compliance are maintained throughout construction.",
  },
  {
    question: "What maintenance options exist after handover?",
    answer:
      "Planned maintenance, fault support and lifecycle upgrades — with reporting aligned to BS 5839 maintenance expectations and your operational model.",
  },
]

const MAINTENANCE_PAGE: ServiceFaqItem[] = [
  {
    question: "What maintenance services do you provide?",
    answer:
      "Planned preventative maintenance, reactive call-outs and system health checks for fire and security systems — tailored to site risk and operating hours across London and the Home Counties.",
  },
  {
    question: "Can you support 24/7 sites and SLAs?",
    answer:
      "Yes. We structure response and reporting around your SLAs and escalation paths, including out-of-hours where contracts require it.",
  },
  {
    question: "How do you document compliance and faults?",
    answer:
      "Service reports, fault records and asset information — so duty holders can demonstrate upkeep and plan upgrades with evidence.",
  },
  {
    question: "Can you work across multiple systems on one estate?",
    answer:
      "Yes — fire, CCTV, access and intruder systems can be maintained under aligned programmes with a single coordination point where appropriate.",
  },
]

const PROJECT_MANAGEMENT_FS: ServiceFaqItem[] = [
  {
    question: "How do you manage fire & security projects?",
    answer:
      "We coordinate design, procurement, installation and commissioning across specialist packages — with clear interfaces, lookahead planning and handover documentation.",
  },
  {
    question: "Who do you coordinate with on site?",
    answer:
      "Main contractors, M&E trades, IT and facilities teams — aligning interfaces, testing and commissioning windows so packages hand over cleanly.",
  },
  {
    question: "How are changes and variations handled?",
    answer:
      "Impact on programme, interfaces and compliance is assessed and documented so stakeholders can approve changes with full visibility.",
  },
  {
    question: "What reporting do clients receive?",
    answer:
      "Progress, risk and commissioning readiness reporting — tailored to your governance and milestone requirements.",
  },
]

const EVAC: ServiceFaqItem[] = [
  {
    question: "What EVAC and voice evacuation systems do you install?",
    answer:
      "Zoned voice evacuation, amplifiers and speaker networks aligned with BS 5839-8 and your fire strategy — integrated with fire detection and cause-and-effect where specified.",
  },
  {
    question: "When should EVAC design be fixed?",
    answer:
      "Early coordination with fire strategy, acoustics and containment avoids late changes to speaker layouts, cabling and audibility testing.",
  },
  {
    question: "How do you test voice messaging and audibility?",
    answer:
      "We support witnessed testing and commissioning records so messaging, levels and fault behaviour are demonstrated in line with the specification.",
  },
  {
    question: "What handover documentation is included?",
    answer:
      "As-built records, zone schedules, test certificates and operator guidance — so facilities teams can manage routine tests and incidents.",
  },
]

const REFUGE: ServiceFaqItem[] = [
  {
    question: "What refuge and disabled communication systems do you deliver?",
    answer:
      "Emergency voice communication systems — disabled refuge points, fire telephones, toilet alarms and central panels aligned with BS 5839-9 and your fire strategy.",
  },
  {
    question: "How do you coordinate with fire alarm and EVAC?",
    answer:
      "We align interfaces, cause-and-effect and commissioning so refuge and EVAC behaviour matches the wider life-safety design.",
  },
  {
    question: "Can you support existing buildings and upgrades?",
    answer:
      "Yes. We survey legacy systems, plan phased upgrades and minimise disruption while keeping clear records for operators.",
  },
  {
    question: "What training do you provide?",
    answer:
      "Operator training on use, testing and fault reporting — with O&M information structured for estates teams.",
  },
]

const ELECTRICAL_SYSTEMS_FS: ServiceFaqItem[] = [
  {
    question: "What CCTV systems does this service cover?",
    answer:
      "IP and analogue CCTV design, installation and commissioning — with remote monitoring, retention setup and GDPR-aligned handling for commercial and industrial sites.",
  },
  {
    question: "How do you integrate with other security systems?",
    answer:
      "We coordinate with access control and intruder systems so events, recording and monitoring workflows align across your estate.",
  },
  {
    question: "Can you support multi-site or estate-wide rollouts?",
    answer:
      "Yes — we align standards, naming and monitoring paths so expansion and support stay manageable as your portfolio grows.",
  },
  {
    question: "What is included at handover?",
    answer:
      "Camera schedules, network diagrams, commissioning records and user training — so operators can manage permissions and retention confidently.",
  },
]

const FS_FAQ_BY_PATH: Record<string, ServiceFaqItem[]> = {
  "/services": HUB,
  "/services/fire-life-safety": FIRE_LIFE_SAFETY,
  "/services/security-systems": SECURITY_SYSTEMS,
  "/services/maintenance-support": MAINTENANCE_SUPPORT,
  "/services/sustainability": INTRUDER_SUSTAINABILITY,
  "/services/energy-efficiency": ACCESS_CONTROL,
  "/services/electrical-systems": ELECTRICAL_SYSTEMS_FS,
  "/services/mechanical-engineering": MECHANICAL_ENGINEERING_FS,
  "/services/maintenance": MAINTENANCE_PAGE,
  "/services/project-management": PROJECT_MANAGEMENT_FS,
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
