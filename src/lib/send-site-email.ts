import { getNotifyEmail, getResendApiKey, getResendFrom } from "@/lib/site-email-env"
import { fsEmailLogoInlineAttachment } from "@/lib/fs-branded-email"
import { FS_EMAIL_LOGO_CONTENT_ID } from "@/lib/fs-email-logo-base64"

type Attachment = {
  filename: string
  content: string
  contentId?: string
}

export async function sendSiteEmailViaResend(body: {
  subject: string
  text: string
  html: string
  replyTo?: string
  to?: string
  attachments?: Attachment[]
  /** Attach footer logo when HTML uses its cid: (default true) */
  includeBrandedLogo?: boolean
}): Promise<{ ok: true } | { ok: false; status: number; message: string }> {
  const key = getResendApiKey()
  const to = body.to?.trim() || getNotifyEmail()
  const from = getResendFrom()

  if (!key || !to || !from) {
    return {
      ok: false,
      status: 503,
      message:
        "Email is not configured. Set RESEND_API_KEY, NOTIFY_EMAIL (or CAREERS_NOTIFY_EMAIL), and RESEND_FROM_EMAIL (or CAREERS_FROM_EMAIL).",
    }
  }

  const attachments: Attachment[] = [...(body.attachments ?? [])]
  const wantsLogo =
    body.includeBrandedLogo !== false && body.html.includes(`cid:${FS_EMAIL_LOGO_CONTENT_ID}`)
  if (wantsLogo && !attachments.some((a) => a.contentId === FS_EMAIL_LOGO_CONTENT_ID)) {
    attachments.unshift(fsEmailLogoInlineAttachment())
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
      ...(attachments.length
        ? {
            attachments: attachments.map((a) => ({
              filename: a.filename,
              content: a.content,
              ...(a.contentId ? { content_id: a.contentId } : {}),
            })),
          }
        : {}),
    }),
  })

  if (!res.ok) {
    console.error("Resend error:", res.status)
    return { ok: false, status: 502, message: "Could not send email. Please try again later." }
  }

  return { ok: true }
}
