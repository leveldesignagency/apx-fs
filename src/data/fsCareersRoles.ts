import type { CareerRole } from "@/components/careers/careers-types"

export const FS_CAREER_ROLES: CareerRole[] = [
  {
    id: "fire-security-engineers",
    title: "Fire and Security Engineers",
    description:
      "Installation, commissioning and maintenance of integrated fire and security systems. NSI-aligned workmanship; London and Home Counties.",
    department: "Fire & Security",
    location: "London & Home Counties",
  },
  {
    id: "fire-alarm-commissioning-manager",
    title: "Fire Alarm Commissioning Manager",
    description:
      "Lead commissioning, client-facing delivery and compliance for fire detection and alarm systems. £40,000–£50,000 depending on experience.",
    department: "Fire & Life Safety",
    location: "London, Kent, Essex & occasional regional sites",
    salary: "£40,000–£50,000 depending on experience",
    responsibilities: [
      "Lead & support the overall installation, servicing and commissioning process",
      "Attend various meetings with clients, sub contractors and project teams",
      "Perform surveying tasks and support on quotes and design of systems",
      "Ensure full compliance in line with NSI / industry standard and company procedures",
    ],
    requirements: [
      "FIA or equivalent training",
      "Understanding British Standards",
      "Proven experience in commissioning and fault finding",
      "Strong communication and organisational skills",
      "Ability to prioritise workload",
      "Full Driving Licence",
    ],
    workingAreas: ["London", "Kent", "Essex", "Occasional sites outside primary working area"],
  },
]

export function getFsCareerRoleById(id: string): CareerRole | undefined {
  return FS_CAREER_ROLES.find((r) => r.id === id)
}
