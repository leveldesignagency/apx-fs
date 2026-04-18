import { sendSiteEmailViaResend } from "@/lib/send-site-email"

export const runtime = "nodejs"

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

type Body = {
  name?: string
  email?: string
  phone?: string
  service?: string
  serviceLabel?: string
  contactMethod?: string
  message?: string
  company?: string
}

export async function POST(req: Request) {
  let body: Body
  try {
    body = (await req.json()) as Body
  } catch {
    return Response.json({ error: "Invalid JSON." }, { status: 400 })
  }

  if (String(body.company ?? "").trim().length > 0) {
    return Response.json({ ok: true })
  }

  const name = String(body.name ?? "").trim()
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
  if (message.length < 10) {
    return Response.json({ error: "Please add a short message (at least 10 characters)." }, { status: 400 })
  }
  if (message.length > 8000) {
    message = message.slice(0, 8000)
  }

  const subject = "CONTACT-(website enquiry — APX FS)"

  const text = [
    "New contact form submission — APX Fire & Security",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "—"}`,
    `Service: ${serviceLabel || "—"}`,
    `Preferred contact: ${contactMethod || "—"}`,
    "",
    "Message:",
    message,
  ].join("\n")

  const html = `
  <h2 style="font-family:system-ui,sans-serif">Contact form — APX Fire &amp; Security</h2>
  <p style="font-family:system-ui,sans-serif"><strong>Name:</strong> ${esc(name)}</p>
  <p style="font-family:system-ui,sans-serif"><strong>Email:</strong> ${esc(email)}</p>
  <p style="font-family:system-ui,sans-serif"><strong>Phone:</strong> ${esc(phone || "—")}</p>
  <p style="font-family:system-ui,sans-serif"><strong>Service:</strong> ${esc(serviceLabel || "—")}</p>
  <p style="font-family:system-ui,sans-serif"><strong>Preferred contact:</strong> ${esc(contactMethod || "—")}</p>
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

  return Response.json({ ok: true })
}
