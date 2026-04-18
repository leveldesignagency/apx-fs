/** Required subject line format for all job applications. */
export function buildJobApplicantSubject(positionTitle: string): string {
  const t = positionTitle.replace(/\s+/g, " ").trim().slice(0, 200)
  return `JOBAPPLICANT-(${t})`
}
