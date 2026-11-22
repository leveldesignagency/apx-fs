// Shared inbox for Resend. Prefer NOTIFY_EMAIL / RESEND_FROM_EMAIL; old names still work.

/** Contact / general form notifications. */
export function getNotifyEmail(): string | undefined {
  return process.env.NOTIFY_EMAIL?.trim() || undefined
}

/** Careers applications — Tracey (or CAREERS_NOTIFY_EMAIL), else general notify inbox. */
export function getCareersNotifyEmail(): string | undefined {
  return (
    process.env.CAREERS_NOTIFY_EMAIL?.trim() ||
    process.env.NOTIFY_EMAIL?.trim() ||
    undefined
  )
}

export function getResendFrom(): string | undefined {
  const v = process.env.RESEND_FROM_EMAIL ?? process.env.CAREERS_FROM_EMAIL
  return v?.trim() || undefined
}

/** Automated confirmations only (careers applicant receipt). Domain must already be verified in Resend. */
export function getResendNoReplyFrom(): string {
  const v = process.env.RESEND_NOREPLY_FROM?.trim()
  if (v) return v
  return "APX Fire & Security <noreply@apx-fs.co.uk>"
}

export function getResendApiKey(): string | undefined {
  return process.env.RESEND_API_KEY?.trim() || undefined
}
