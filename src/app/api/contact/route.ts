import { buildContactFormSubject } from "@/lib/careers-email-subject"
import { buildFsBrandedEmailHtml, contactMethodLabel } from "@/lib/fs-branded-email"
import { sendSiteEmailViaResend } from "@/lib/send-site-email"
import {
  allowRequest,
  allowRequestAll,
  clientIpFromRequest,
  contentLengthOk,
  CONTACT_RATE,
  CONTACT_EMAIL_DAILY,
  CONTACT_IP_DAILY,
  MAX_CONTACT_JSON_BYTES,
  defaultAllowedHosts,
  normalizeEmailKey,
  originAllowed,
} from "@/lib/api-abuse-guard"
import { getFsSiteUrl } from "@/lib/seo"
import { verifyTurnstileToken } from "@/lib/turnstile"

export const runtime = "nodejs"

const MIN_FORM_MS = 2500
const ALLOWED_METHODS = new Set(["phone", "email", "text"])

type Body = {
  name?: string
  companyName?: string
  email?: string
  phone?: string
  service?: string
  serviceLabel?: string
  contactMethod?: string
  message?: string
  /** honeypot */
  website?: string
  privacyConsent?: boolean
  smsConsent?: boolean
  formStartedAt?: number
  turnstileToken?: string
}

export async function POST(req: Request) {
  if (!contentLengthOk(req, MAX_CONTACT_JSON_BYTES)) {
    return Response.json({ error: "Request too large." }, { status: 413 })
  }

  const ip = clientIpFromRequest(req)
  if (!originAllowed(req, defaultAllowedHosts(getFsSiteUrl()))) {
    return Response.json({ error: "Forbidden." }, { status: 403 })
  }
  if (!allowRequest(`fs-contact:${ip}`, CONTACT_RATE.limit, CONTACT_RATE.windowMs)) {
    return Response.json({ error: "Too many requests. Please try again later." }, { status: 429 })
  }

  const contentType = req.headers.get("content-type") || ""
  if (!contentType.toLowerCase().includes("application/json")) {
    return Response.json({ error: "Unsupported content type." }, { status: 415 })
  }

  let body: Body
  try {
    body = (await req.json()) as Body
  } catch {
    return Response.json({ error: "Invalid JSON." }, { status: 400 })
  }

  if (String(body.website ?? "").trim().length > 0) {
    return Response.json({ ok: true })
  }

  const turnstile = await verifyTurnstileToken(body.turnstileToken, ip)
  if (!turnstile.ok) {
    return Response.json({ error: turnstile.error }, { status: 400 })
  }

  const formStartedAt = Number(body.formStartedAt ?? 0)
  if (!Number.isFinite(formStartedAt) || Date.now() - formStartedAt < MIN_FORM_MS) {
    return Response.json({ error: "Please wait a moment and try again." }, { status: 400 })
  }

  if (body.privacyConsent !== true) {
    return Response.json(
      { error: "Please confirm you have read the Privacy Policy before sending." },
      { status: 400 }
    )
  }

  const name = String(body.name ?? "").trim()
  const companyName = String(body.companyName ?? "").trim().slice(0, 200)
  const email = String(body.email ?? "").trim()
  const phone = String(body.phone ?? "").trim()
  const serviceLabel = String(body.serviceLabel ?? "").trim().slice(0, 200)
  const contactMethod = String(body.contactMethod ?? "").trim().slice(0, 40)
  let message = String(body.message ?? "").trim()

  if (name.length < 2 || name.length > 200) {
    return Response.json({ error: "Please enter your name." }, { status: 400 })
  }

  if (!ALLOWED_METHODS.has(contactMethod)) {
    return Response.json({ error: "Please choose a preferred contact method." }, { status: 400 })
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 320
  const phoneOk = phone.length >= 8 && phone.length <= 40

  if (!emailOk && !phoneOk) {
    return Response.json(
      { error: "Please provide at least one contact method (email or phone)." },
      { status: 400 }
    )
  }

  if (contactMethod === "email" && !emailOk) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 })
  }
  if ((contactMethod === "phone" || contactMethod === "text") && !phoneOk) {
    return Response.json(
      { error: "Please enter a phone number for your preferred contact method." },
      { status: 400 }
    )
  }
  if (email.length > 0 && !emailOk) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 })
  }
  if (phone.length > 0 && phone.length > 40) {
    return Response.json({ error: "Phone number is too long." }, { status: 400 })
  }

  if (contactMethod === "text" && body.smsConsent !== true) {
    return Response.json(
      { error: "Please confirm you consent to being contacted by SMS." },
      { status: 400 }
    )
  }
  if (message.length < 10) {
    return Response.json({ error: "Please add a short message (at least 10 characters)." }, { status: 400 })
  }
  if (message.length > 8000) {
    message = message.slice(0, 8000)
  }

  const rateKey = emailOk ? normalizeEmailKey(email) : `phone:${phone.replace(/\s+/g, "")}`
  if (
    !allowRequestAll([
      { key: `fs-contact-email-day:${rateKey}`, ...CONTACT_EMAIL_DAILY },
      { key: `fs-contact-ip-day:${ip}`, ...CONTACT_IP_DAILY },
    ])
  ) {
    return Response.json(
      {
        error:
          "You have already sent an enquiry recently. Please wait 24 hours, or email us directly if urgent.",
      },
      { status: 429 }
    )
  }

  const subject = buildContactFormSubject()
  const methodLabel = contactMethodLabel(contactMethod)

  const rows = [
    { label: "Name", value: name },
    { label: "Company", value: companyName || "(not provided)" },
    { label: "Email", value: emailOk ? email : "(not provided)" },
    { label: "Phone", value: phoneOk ? phone : "(not provided)" },
    { label: "Service", value: serviceLabel || "(not selected)" },
    { label: "Preferred contact method", value: methodLabel },
    {
      label: "SMS consent",
      value: contactMethod === "text" ? (body.smsConsent ? "Yes" : "No") : "N/A",
    },
    { label: "Privacy policy acknowledged", value: "Yes" },
  ]

  const text = [
    "CONTACT FORM SUBMISSION — APX Fire & Security",
    "",
    ...rows.map((r) => `${r.label}: ${r.value}`),
    "",
    "Message:",
    message,
  ].join("\n")

  const html = buildFsBrandedEmailHtml({
    title: "Contact Form Submission",
    intro: "A new enquiry was submitted via the APX Fire & Security website.",
    rows,
    messageLabel: "Message",
    messageBody: message,
    footerNote: "Reply to this email to respond to the enquirer (reply-to is set to their address when provided).",
  })

  const sent = await sendSiteEmailViaResend({
    subject,
    text,
    html,
    replyTo: emailOk ? email : undefined,
  })

  if (!sent.ok) {
    return Response.json({ error: sent.message }, { status: sent.status })
  }

  // auto-reply once we've already cleared the spam checks
  if (emailOk) {
    await sendSiteEmailViaResend({
      to: email,
      subject: "We received your enquiry — APX Fire & Security",
      replyTo: "enquiries@apx-fs.co.uk",
      text: [
        `Hello ${name},`,
        "",
        "Thank you for contacting APX Fire & Security. We have received your enquiry and will respond using your preferred contact method as soon as we can.",
        "",
        `Preferred contact: ${methodLabel}`,
        ...(serviceLabel ? [`Service: ${serviceLabel}`] : []),
        "",
        "If your enquiry is urgent, call 020 8303 2280.",
        "",
        "We process your details to respond to this enquiry only. See our privacy policy: https://www.apx-fs.co.uk/privacy",
        "",
        "APX Fire & Security",
        "enquiries@apx-fs.co.uk",
      ].join("\n"),
      html: buildFsBrandedEmailHtml({
        title: "We Received Your Enquiry",
        intro: `Hello ${name}, thank you for contacting APX Fire & Security. We have received your enquiry and will respond using your preferred contact method as soon as we can.`,
        rows: [
          { label: "Preferred contact method", value: methodLabel },
          ...(serviceLabel ? [{ label: "Service", value: serviceLabel }] : []),
          { label: "Urgent?", value: "Call 020 8303 2280" },
        ],
        footerNote:
          "We process your details to respond to this enquiry. You can read our privacy policy at https://www.apx-fs.co.uk/privacy. This is an automated confirmation — reply to this email if you need to add anything.",
      }),
    }).catch(() => null)
  }

  return Response.json({ ok: true })
}
