import { getNotifyEmail, getResendApiKey, getResendFrom } from "@/lib/site-email-env"

type Attachment = { filename: string; content: string }

export async function sendSiteEmailViaResend(body: {
  subject: string
  text: string
  html: string
  replyTo?: string
  attachments?: Attachment[]
}): Promise<{ ok: true } | { ok: false; status: number; message: string }> {
  const key = getResendApiKey()
  const to = getNotifyEmail()
  const from = getResendFrom()

  if (!key || !to || !from) {
    return {
      ok: false,
      status: 503,
      message:
        "Email is not configured. Set RESEND_API_KEY, NOTIFY_EMAIL (or CAREERS_NOTIFY_EMAIL), and RESEND_FROM_EMAIL (or CAREERS_FROM_EMAIL).",
    }
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: body.replyTo,
      subject: body.subject,
      text: body.text,
      html: body.html,
      ...(body.attachments?.length ? { attachments: body.attachments } : {}),
    }),
  })

  if (!res.ok) {
    const errText = await res.text()
    console.error("Resend error:", res.status, errText)
    return { ok: false, status: 502, message: "Could not send email. Please try again later." }
  }

  return { ok: true }
}
