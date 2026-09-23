export type FsAccreditationKind = "registration" | "certification" | "prequalification" | "membership"

export type FsAccreditationEntry = {
  name: string
  title: string
  shortLabel: string
  /** How we describe this credential in CTAs and nav, FIA is membership, not accreditation */
  kind: FsAccreditationKind
  icon: string
  /** What the organisation is */
  intro: string
  /** APX’s exact public status claim */
  apxStatus: string
  /** Scope covered by that status */
  scope: string
  /** Why it matters to customers */
  whyItMatters: string
  /** Accurate UKAS wording where relevant, omit if not applicable */
  ukasNote?: string
  registerUrl?: string
  registerLabel?: string
}

export const FS_ACCREDITATIONS: Record<string, FsAccreditationEntry> = {
  bafe: {
    name: "BAFE",
    title: "BAFE Fire Safety Register",
    shortLabel: "BAFE Registered · fire safety",
    kind: "registration",
    icon: "/accreditations%20mono/Coloured/BAFE-01.svg",
    intro:
      "BAFE (British Approvals for Fire Equipment) is the independent registration body for third-party certificated fire safety organisations. It publishes and maintains the BAFE Fire Safety Register.",
    apxStatus:
      "APX Fire & Security is BAFE Registered (Registered Organisation 301168) on the BAFE Fire Safety Register, while we hold valid third-party certification to the relevant BAFE scheme(s).",
    scope:
      "BAFE registration applies to the fire-safety scheme modules shown against our listing on the BAFE Fire Safety Register (commonly SP203-1 for fire detection and fire alarm systems, design, installation, commissioning and/or maintenance). Always verify the live register for the exact modules currently held.",
    whyItMatters:
      "Duty holders, insurers and principal contractors often expect BAFE-registered providers for fire detection and alarm work. Registration shows that competence has been independently assessed for a defined fire-safety scope, with clearer audit trails at handover and in maintenance.",
    ukasNote:
      "BAFE itself is not a UKAS-accredited certification body. Licensed UKAS-accredited certification bodies audit companies against BAFE scheme criteria and award third-party certification; BAFE then lists organisations on its register while that certification remains valid.",
    registerUrl: "https://www.bafe.org.uk/",
    registerLabel: "BAFE Fire Safety Register (bafe.org.uk)",
  },
  nsi: {
    name: "NSI",
    title: "NSI Gold, Security & Fire",
    shortLabel: "NSI Gold · security & fire",
    kind: "certification",
    icon: "/accreditations%20mono/NSI-01.svg",
    intro:
      "NSI (National Security Inspectorate) is an independent certification body for electronic security and fire safety providers. Its Gold schemes are widely recognised by insurers, specifiers and procurement frameworks.",
    apxStatus:
      "APX Fire & Security holds NSI Gold approval for security systems and NSI Gold approval for fire systems (often referred to as NSI Fire Gold).",
    scope:
      "NSI Gold, Security covers electronic security work within the approved NSI security scope. NSI Gold, Fire (NSI Fire Gold) covers fire systems within the approved NSI fire scope. Exact module and scheme detail should be confirmed against NSI’s current approval records for APX.",
    whyItMatters:
      "NSI Gold gives customers independent assurance that design, installation, commissioning and maintenance are delivered under audited technical and quality controls, reducing procurement risk and supporting confident occupation and ongoing compliance.",
    ukasNote:
      "Where NSI operates as a UKAS-accredited certification body for a given scheme, the UKAS accreditation applies to NSI’s certification activity, not as a separate APX “UKAS mark”. Customers should treat UKAS references carefully and not imply that BAFE or APX are themselves UKAS-accredited bodies.",
    registerUrl: "https://www.nsi.org.uk/",
    registerLabel: "NSI (nsi.org.uk)",
  },
  constructionline: {
    name: "Constructionline",
    title: "Constructionline Gold",
    shortLabel: "Constructionline Gold · pre-qualification",
    kind: "prequalification",
    icon: "/accreditations%20mono/Coloured/ConstructionOnline-01.svg",
    intro:
      "Constructionline is a UK pre-qualification and supplier-assurance platform used across construction and built-environment procurement.",
    apxStatus: "APX Fire & Security is a Constructionline Gold Member.",
    scope:
      "Constructionline Gold supports buyer due diligence on company information, governance and compliance readiness for construction supply-chain appointment. It is a procurement credential, not a substitute for NSI, BAFE or product certification.",
    whyItMatters:
      "Principal contractors and public-sector buyers often require Constructionline (or equivalent) before tender or package award. Gold membership helps reduce duplicated questionnaires and speeds early-stage supplier checks.",
    registerUrl: "https://www.constructionline.co.uk/",
    registerLabel: "Constructionline (constructionline.co.uk)",
  },
  fia: {
    name: "FIA",
    title: "Fire Industry Association membership",
    shortLabel: "FIA Full Member · trade association",
    kind: "membership",
    icon: "/accreditations%20mono/Coloured/FIA-01.svg",
    intro:
      "The Fire Industry Association (FIA) is the UK’s major trade association for fire protection and fire safety professionals. It supports standards, training and technical guidance across the industry.",
    apxStatus: "APX Fire & Security is a Full Member of the Fire Industry Association (FIA).",
    scope:
      "FIA Full Membership is industry membership. It is not a third-party accreditation or certification of APX’s installation work. Membership supports access to technical guidance, training pathways and industry updates that inform competent delivery.",
    whyItMatters:
      "Customers benefit when contractors stay aligned with current fire-safety practice. FIA membership shows commitment to industry standards and continuous improvement, alongside, not instead of, NSI and BAFE credentials.",
    registerUrl: "https://www.fia.uk.com/",
    registerLabel: "Fire Industry Association (fia.uk.com)",
  },
} as const

export type FsAccreditationSlug = keyof typeof FS_ACCREDITATIONS

export const FS_ACCREDITATION_TAB_ORDER: FsAccreditationSlug[] = ["bafe", "nsi", "constructionline", "fia"]

/** Hub summary credentials, keep claims precise; ISO cert body pending client confirm */
export const FS_HUB_CREDENTIAL_SUMMARY = [
  {
    label: "NSI Gold, Security",
    detail: "Independent NSI approval for electronic security systems",
  },
  {
    label: "NSI Fire Gold",
    detail: "Independent NSI Gold approval for fire systems",
  },
  {
    label: "BAFE Registered",
    detail: "BAFE Fire Safety Register · Organisation 301168 (verify scheme modules on the live register)",
  },
  {
    label: "Constructionline Gold",
    detail: "Gold Member for construction supply-chain pre-qualification",
  },
  {
    label: "FIA Full Member",
    detail: "Trade association membership, not an accreditation",
  },
  {
    label: "BS EN ISO 9001:2015",
    detail: "Quality management system certification (certification body to be confirmed for public display)",
  },
] as const

export function getFsAccreditation(slug: string) {
  return FS_ACCREDITATIONS[slug as FsAccreditationSlug]
}

export function fsAccreditationCtaLabel(kind: FsAccreditationKind): string {
  switch (kind) {
    case "membership":
      return "View membership"
    case "prequalification":
      return "View pre-qualification"
    case "registration":
      return "View registration"
    default:
      return "View certification"
  }
}

/** SEO for `/accreditations/[slug]` */
export const FS_ACCREDITATION_SEO: Record<FsAccreditationSlug, { title: string; description: string }> = {
  bafe: {
    title: "BAFE Registered | Fire Safety Register | APX Fire & Security",
    description:
      "BAFE is the independent registration body for third-party certificated fire safety organisations. APX is BAFE Registered (301168). Verify our listing on the BAFE Fire Safety Register.",
  },
  nsi: {
    title: "NSI Gold, Security & Fire | APX Fire & Security",
    description:
      "APX holds NSI Gold for security systems and NSI Fire Gold for fire systems. Independent certification for quality-controlled fire and security delivery across London and the Home Counties.",
  },
  constructionline: {
    title: "Constructionline Gold Member | APX Fire & Security",
    description:
      "APX Fire & Security is a Constructionline Gold Member for construction supply-chain pre-qualification across London and the Home Counties.",
  },
  fia: {
    title: "FIA Full Member | Fire Industry Association | APX Fire & Security",
    description:
      "APX Fire & Security is a Full Member of the Fire Industry Association (FIA). FIA membership is a trade association membership, not an accreditation.",
  },
}
