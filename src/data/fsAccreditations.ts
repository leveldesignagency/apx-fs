export const FS_ACCREDITATIONS = {
  bafe: {
    name: "BAFE",
    title: "About BAFE",
    shortLabel: "BAFE — fire equipment certification",
    icon: "/accreditations%20mono/Coloured/BAFE-01.svg",
    intro:
      "BAFE (British Approvals for Fire Equipment) is an independent, UKAS-accredited certification body focused on raising quality and competence across fire safety services.",
    sections: [
      {
        heading: "What BAFE Is",
        body:
          "BAFE develops and manages third-party certification schemes for organisations delivering fire protection services. Those schemes are designed to verify that a company has the right management systems, competent personnel and technical delivery processes in place. For clients, BAFE registration offers an additional level of assurance that service delivery is independently assessed against recognised standards.",
      },
      {
        heading: "Why It Matters In Practice",
        body:
          "Fire systems are safety-critical and frequently subject to regulatory scrutiny, insurer requirements and duty-holder obligations. BAFE certification gives clients confidence that installation, maintenance and handover processes are controlled, documented and repeatable. It supports better project governance, clearer audit trails and more reliable life-safety outcomes.",
      },
      {
        heading: "How APX Works With BAFE Expectations",
        body:
          "Our teams align project planning, commissioning and documentation with scheme-driven expectations around competence, record-keeping and quality assurance. That includes clear test evidence, traceable certification records and consistent handover packs. The result is a more robust pathway from design intent through to operational readiness.",
      },
      {
        heading: "Client Benefit",
        body:
          "For asset owners, consultants and principal contractors, BAFE alignment helps reduce delivery risk and improves confidence at acceptance, occupation and ongoing maintenance phases. It also supports a smoother interface between FM, compliance and operational teams once systems are live.",
      },
    ],
  },
  nsi: {
    name: "NSI",
    title: "About NSI",
    shortLabel: "NSI Gold — security & fire certification",
    icon: "/accreditations%20mono/NSI-01.svg",
    intro:
      "NSI (National Security Inspectorate) is one of the UK’s leading independent certification bodies for security and fire safety providers.",
    sections: [
      {
        heading: "What NSI Certification Represents",
        body:
          "NSI approval indicates that an organisation has been independently audited for technical competence, management controls and service delivery quality. Its schemes are recognised throughout the security and fire sectors and are often referenced by insurers, specifiers and procurement frameworks.",
      },
      {
        heading: "Why Clients Specify NSI-Certified Partners",
        body:
          "Security systems are expected to perform under pressure, often with direct implications for business continuity and risk mitigation. NSI certification provides confidence that design, installation and maintenance activities are being delivered within structured quality and technical frameworks. This reduces uncertainty at both procurement and operational stages.",
      },
      {
        heading: "Operational Standards And Oversight",
        body:
          "NSI-led auditing focuses on process control, documentation, staff competence and consistent technical output. For clients, this translates into clearer deliverables, better traceability and improved confidence in long-term system reliability. It also strengthens the assurance position for multi-site and regulated environments.",
      },
      {
        heading: "How APX Uses This Framework",
        body:
          "Across projects, we embed consistent engineering checks, commissioning controls and handover standards aligned with recognised certification expectations. This supports efficient delivery on site and reliable outcomes in service, helping clients manage risk while protecting people, property and operations.",
      },
    ],
  },
  constructionline: {
    name: "Constructionline",
    title: "About Constructionline",
    shortLabel: "Constructionline — pre-qualification",
    icon: "/accreditations%20mono/Coloured/ConstructionOnline-01.svg",
    intro:
      "Constructionline is a widely used UK pre-qualification and supplier assurance platform for construction and built-environment procurement.",
    sections: [
      {
        heading: "What Constructionline Does",
        body:
          "Constructionline helps buyers verify key supplier credentials in advance of tender and appointment. This includes company information, governance, compliance and operational capability data. By standardising pre-qualification checks, it supports more efficient procurement and clearer contractor selection decisions.",
      },
      {
        heading: "Why It Matters To Delivery Teams",
        body:
          "For principal contractors and clients, pre-validated supplier information reduces onboarding friction and duplication. It can accelerate package procurement, improve confidence in supply-chain quality and support due diligence obligations. This is especially valuable where programmes are constrained and mobilisations are time-critical.",
      },
      {
        heading: "Risk, Compliance And Procurement Confidence",
        body:
          "Using suppliers that maintain credible, up-to-date pre-qualification records helps procurement teams demonstrate consistent governance. It also improves visibility around capability and compliance expectations before work starts. This contributes to better early-stage planning and fewer avoidable commercial or delivery risks.",
      },
      {
        heading: "APX’s Approach",
        body:
          "We treat procurement and compliance readiness as part of project quality, not separate administration. That means maintaining clear documentation, responsive tender support and dependable information sharing from pre-construction through handover.",
      },
    ],
  },
  fia: {
    name: "FIA",
    title: "About FIA",
    shortLabel: "FIA — fire industry association",
    icon: "/accreditations%20mono/Coloured/FIA-01.svg",
    intro:
      "The Fire Industry Association (FIA) is a major UK trade association for fire safety professionals, supporting standards, training and technical guidance.",
    sections: [
      {
        heading: "Role Of The FIA",
        body:
          "The FIA works with industry, government and standards bodies to improve fire safety outcomes. It provides technical resources, competency pathways and best-practice guidance that help organisations stay aligned with evolving regulatory and technical requirements.",
      },
      {
        heading: "Why Membership-Level Standards Matter",
        body:
          "Fire safety is not static; standards, technologies and compliance expectations continue to evolve. Alignment with association-led technical guidance supports better decision-making during design, installation and lifecycle maintenance. It also helps teams keep pace with updates that can affect risk profiles and legal duties.",
      },
      {
        heading: "Competence And Continuous Improvement",
        body:
          "FIA-linked learning and technical engagement encourages continuous improvement across engineering and project teams. In practical terms, that means stronger specification interpretation, more consistent site quality and better commissioning confidence. The outcome is safer, more dependable system performance over time.",
      },
      {
        heading: "How APX Applies This In Projects",
        body:
          "We emphasise technical consistency, compliance awareness and disciplined handover standards to support reliable operation after practical completion. Combined with clear communication and documented evidence, this helps clients maintain confidence through construction, acceptance and ongoing operation.",
      },
    ],
  },
} as const

export type FsAccreditationSlug = keyof typeof FS_ACCREDITATIONS

export const FS_ACCREDITATION_TAB_ORDER: FsAccreditationSlug[] = ["bafe", "nsi", "constructionline", "fia"]

export function getFsAccreditation(slug: string) {
  return FS_ACCREDITATIONS[slug as FsAccreditationSlug]
}

/** SEO for `/accreditations/[slug]` */
export const FS_ACCREDITATION_SEO: Record<FsAccreditationSlug, { title: string; description: string }> = {
  bafe: {
    title: "BAFE Fire Certification | Accredited Fire Safety | London & South East",
    description:
      "Learn how BAFE certification supports quality fire protection — and how APX Fire & Security delivers BAFE-aligned fire alarm and life-safety systems across London and the Home Counties.",
  },
  nsi: {
    title: "NSI Gold Fire & Security | Certified Installer | London & Home Counties",
    description:
      "NSI certification for fire and security systems: what it means for quality and compliance, and APX’s NSI-aligned delivery across Greater London, Kent, Essex and the South East.",
  },
  constructionline: {
    title: "Constructionline Registered Contractor | Fire & Security | APX",
    description:
      "Constructionline pre-qualification for construction procurement — APX Fire & Security as a verified fire and security partner for projects across London and the Home Counties.",
  },
  fia: {
    title: "Fire Industry Association (FIA) | Fire Safety Standards | APX",
    description:
      "The FIA’s role in UK fire safety — and how APX aligns fire alarm, detection and life-safety delivery with industry standards across London and South East England.",
  },
}
