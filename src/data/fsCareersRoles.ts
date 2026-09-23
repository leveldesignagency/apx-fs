import type { CareerRole } from "@/components/careers/careers-types"

/**
 * Live vacancy list, confirm both roles remain open before launch (see OUTSTANDING.md).
 */
export const FS_CAREER_ROLES: CareerRole[] = [
  {
    id: "fire-security-engineers",
    title: "Fire and Security Engineers",
    description:
      "Installation, commissioning and maintenance of integrated fire and security systems. NSI-aligned workmanship across London and the Home Counties.",
    department: "Fire & Security",
    location: "London & Home Counties",
    baseLocation: "Erith, Kent (365-369 Bexley Road), with site work across London and the Home Counties",
    employmentType: "Permanent, full-time",
    hours: "Typically full-time site hours; overtime and call-out may apply depending on contracts",
    salary: "Competitive, depending on experience",
    companyVehicle: "Company vehicle provided for qualifying field roles (subject to licence and company policy)",
    benefits: [
      "Company vehicle for qualifying engineer roles",
      "Ongoing technical training and manufacturer familiarisation",
      "Support for industry CPD where agreed",
      "Pension scheme (as applicable under company policy)",
    ],
    requiredExperience: [
      "Practical experience installing and/or maintaining fire and/or electronic security systems",
      "Comfortable working on live commercial and multi-occupancy sites",
      "Able to follow drawings, method statements and commissioning records",
    ],
    certifications: [
      "Relevant manufacturer or industry training preferred (e.g. fire panel, CCTV, access, intruder)",
      "FIA or equivalent fire-industry training advantageous",
      "Full UK driving licence required",
      "CSCS or equivalent site card advantageous",
    ],
    responsibilities: [
      "Install, commission and maintain fire detection, intruder, CCTV, access and related systems",
      "Work to approved drawings, British Standards and NSI-aligned company procedures",
      "Complete test records, as-built notes and handover documentation",
      "Coordinate with site managers, other trades and APX project teams",
      "Support reactive call-outs where rostered",
    ],
    requirements: [
      "Proven trade experience in fire and/or security systems",
      "Full driving licence",
      "Strong fault-finding and communication skills",
      "Willingness to travel across London and the Home Counties",
    ],
    workingAreas: ["London", "Kent", "Essex", "Wider Home Counties as required"],
  },
  {
    id: "fire-alarm-commissioning-manager",
    title: "Fire Alarm Commissioning Manager",
    description:
      "Lead commissioning, client-facing delivery and compliance for fire detection and alarm systems across commercial and public-sector projects.",
    department: "Fire & Life Safety",
    location: "London, Kent, Essex & occasional regional sites",
    baseLocation: "Erith, Kent (365-369 Bexley Road), with travel to project sites",
    employmentType: "Permanent, full-time",
    hours: "Full-time; site attendance and client meetings as the programme requires",
    salary: "£40,000-£50,000 depending on experience",
    companyVehicle: "Company vehicle provided (subject to licence and company policy)",
    benefits: [
      "Company vehicle",
      "Competitive salary band £40,000-£50,000 DOE",
      "Technical and standards training support",
      "Pension scheme (as applicable under company policy)",
    ],
    requiredExperience: [
      "Proven experience commissioning fire detection and alarm systems",
      "Experience leading or supervising commissioning on multi-trade sites",
      "Client-facing delivery and progress reporting",
    ],
    certifications: [
      "FIA or equivalent fire industry training",
      "Strong working knowledge of relevant British Standards (including BS 5839 series where applicable)",
      "Full UK driving licence required",
    ],
    responsibilities: [
      "Lead and support installation, servicing and commissioning processes",
      "Attend meetings with clients, subcontractors and project teams",
      "Survey, support quotes and contribute to system design",
      "Ensure compliance with NSI / industry standards and company procedures",
    ],
    requirements: [
      "FIA or equivalent training",
      "Understanding of British Standards",
      "Proven experience in commissioning and fault finding",
      "Strong communication and organisational skills",
      "Ability to prioritise workload",
      "Full driving licence",
    ],
    workingAreas: ["London", "Kent", "Essex", "Occasional sites outside primary working area"],
  },
]

export function getFsCareerRoleById(id: string): CareerRole | undefined {
  return FS_CAREER_ROLES.find((r) => r.id === id)
}
