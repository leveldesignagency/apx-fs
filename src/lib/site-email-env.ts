// Shared inbox for Resend. Prefer NOTIFY_EMAIL / RESEND_FROM_EMAIL; old names still work.

export function getNotifyEmail(): string | undefined {
  const v = process.env.NOTIFY_EMAIL ?? process.env.CAREERS_NOTIFY_EMAIL
  return v?.trim() || undefined
}

export function getResendFrom(): string | undefined {
  const v = process.env.RESEND_FROM_EMAIL ?? process.env.CAREERS_FROM_EMAIL
  return v?.trim() || undefined
}

export function getResendApiKey(): string | undefined {
  return process.env.RESEND_API_KEY?.trim() || undefined
}
