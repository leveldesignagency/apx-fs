export function buildJobApplicantSubject(positionTitle: string): string {
  const t = positionTitle.replace(/\s+/g, " ").trim().slice(0, 200)
  return `JOB APPLICATION FOR ${t}`
}

export function buildContactFormSubject(): string {
  return "CONTACT FORM SUBMISSION"
}
