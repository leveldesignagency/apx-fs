export type CareerRole = {
  id: string
  title: string
  description: string
  department: string
  location: string
  salary?: string
  responsibilities?: string[]
  requirements?: string[]
  workingAreas?: string[]
}

export function careerApplyHref(roleId: string): string {
  return `/careers/apply/${roleId}`
}
