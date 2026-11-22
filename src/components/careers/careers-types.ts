export type CareerRole = {
  id: string
  title: string
  description: string
  department: string
  /** Broad coverage area shown in filters / cards */
  location: string
  /** Office / depot base where stated */
  baseLocation?: string
  salary?: string
  employmentType?: string
  hours?: string
  benefits?: string[]
  /** Explicit yes / no / case-by-case for company vehicle */
  companyVehicle?: string
  requiredExperience?: string[]
  certifications?: string[]
  responsibilities?: string[]
  requirements?: string[]
  workingAreas?: string[]
}

export function careerApplyHref(roleId: string): string {
  return `/careers/apply/${roleId}`
}

/** Printable job sheet (Save as PDF from the browser). */
export function careerPdfHref(roleId: string): string {
  return `/careers/${roleId}/pdf`
}
