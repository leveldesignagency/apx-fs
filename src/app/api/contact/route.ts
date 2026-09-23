import { sendSiteEmailViaResend } from "@/lib/send-site-email"

export const runtime = "nodejs"

const MIN_FORM_MS = 2500

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

type Body = {
  name?: string
  companyName?: string
  email?: string
  phone?: string
  service?: string
  serviceLabel?: string
  contactMethod?: string
  message?: string
  /** Honeypot, must be empty */
  website?: string
  privacyConsent?: boolean
  smsConsent?: boolean
  formStartedAt?: number
}

export async function POST(req: Request) {
  let body: Body
  try {
    body = (await req.json()) as Body
  } catch {
    return Response.json({ error: "Invalid JSON." }, { status: 400 })
  }

  // Honeypot: bots often fill hidden fields
  if (String(body.website ?? "").trim().length > 0) {
    return Response.json({ ok: true })
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
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 320) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 })
  }
  if (phone.length > 40) {
    return Response.json({ error: "Phone number is too long." }, { status: 400 })
  }
  if ((contactMethod === "phone" || contactMethod === "text") && phone.length < 8) {
    return Response.json(
      { error: "Please enter a phone number for your preferred contact method." },
      { status: 400 }
    )
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

  const subject = "CONTACT-(website enquiry, APX FS)"

  const text = [
    "New contact form submission, APX Fire & Security",
    "",
    `Name: ${name}`,
    `Company: ${companyName || "(not provided)"}`,
    `Email: ${email}`,
    `Phone: ${phone || "(not provided)"}`,
    `Service: ${serviceLabel || "(not selected)"}`,
    `Preferred contact: ${contactMethod || "(not selected)"}`,
    `SMS consent: ${contactMethod === "text" ? (body.smsConsent ? "yes" : "no") : "n/a"}`,
    `Privacy consent: yes`,
    "",
    "Message:",
    message,
  ].join("\n")

  const html = `
  <h2 style="font-family:system-ui,sans-serif">Contact form, APX Fire &amp; Security</h2>
  <p style="font-family:system-ui,sans-serif"><strong>Name:</strong> ${esc(name)}</p>
  <p style="font-family:system-ui,sans-serif"><strong>Company:</strong> ${esc(companyName || "(not provided)")}</p>
  <p style="font-family:system-ui,sans-serif"><strong>Email:</strong> ${esc(email)}</p>
  <p style="font-family:system-ui,sans-serif"><strong>Phone:</strong> ${esc(phone || "(not provided)")}</p>
  <p style="font-family:system-ui,sans-serif"><strong>Service:</strong> ${esc(serviceLabel || "(not selected)")}</p>
  <p style="font-family:system-ui,sans-serif"><strong>Preferred contact:</strong> ${esc(contactMethod || "(not selected)")}</p>
  <p style="font-family:system-ui,sans-serif"><strong>SMS consent:</strong> ${esc(
    contactMethod === "text" ? (body.smsConsent ? "yes" : "no") : "n/a"
  )}</p>
  <p style="font-family:system-ui,sans-serif"><strong>Privacy consent:</strong> yes</p>
  <h3 style="font-family:system-ui,sans-serif">Message</h3>
  <pre style="font-family:system-ui,sans-serif;white-space:pre-wrap">${esc(message)}</pre>
  `

  const sent = await sendSiteEmailViaResend({
    subject,
    text,
    html,
    replyTo: email,
  })

  if (!sent.ok) {
    return Response.json({ error: sent.message }, { status: sent.status })
  }

  // Best-effort confirmation to the enquirer (does not fail the submission if this fails)
  await sendSiteEmailViaResend({
    to: email,
    subject: "We received your enquiry, APX Fire & Security",
    replyTo: "enquiries@apx-fs.co.uk",
    text: [
      `Hello ${name},`,
      "",
      "Thank you for contacting APX Fire & Security. We have received your enquiry and will respond using your preferred contact method as soon as we can.",
      "",
      ...(serviceLabel ? [`Service: ${serviceLabel}`, ""] : []),
      "If your enquiry is urgent, call 020 8303 2280.",
      "",
      "APX Fire & Security",
      "enquiries@apx-fs.co.uk",
    ].join("\n"),
    html: `
      <p style="font-family:system-ui,sans-serif">Hello ${esc(name)},</p>
      <p style="font-family:system-ui,sans-serif">Thank you for contacting APX Fire &amp; Security. We have received your enquiry and will respond using your preferred contact method as soon as we can.</p>
      ${
        serviceLabel
          ? `<p style="font-family:system-ui,sans-serif"><strong>Service:</strong> ${esc(serviceLabel)}</p>`
          : ""
      }
      <p style="font-family:system-ui,sans-serif">If your enquiry is urgent, call <a href="tel:02083032280">020 8303 2280</a>.</p>
      <p style="font-family:system-ui,sans-serif">APX Fire &amp; Security<br/>enquiries@apx-fs.co.uk</p>
    `,
  }).catch(() => null)

  return Response.json({ ok: true })
}
