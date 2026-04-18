import { getFsCareerRoleById } from "@/data/fsCareersRoles"
import { buildJobApplicantSubject } from "@/lib/careers-email-subject"
import { sendSiteEmailViaResend } from "@/lib/send-site-email"

export const runtime = "nodejs"

const MAX_CV_BYTES = 5 * 1024 * 1024
const MAX_EXP_LEN = 8000

const ALLOWED_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
])

function cvLooksValid(file: File): boolean {
  const name = file.name.toLowerCase()
  const extOk = name.endsWith(".pdf") || name.endsWith(".doc") || name.endsWith(".docx")
  if (ALLOWED_MIME.has(file.type)) return true
  if ((!file.type || file.type === "application/octet-stream") && extOk) return true
  return false
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

export async function POST(req: Request) {
  let form: FormData
  try {
    form = await req.formData()
  } catch {
    return Response.json({ error: "Invalid form data." }, { status: 400 })
  }

  const hp = String(form.get("company") ?? "")
  if (hp.length > 0) {
    return Response.json({ ok: true })
  }

  const roleId = String(form.get("roleId") ?? "").trim()
  const role = getFsCareerRoleById(roleId)
  if (!role) {
    return Response.json({ error: "Unknown role." }, { status: 400 })
  }

  const fullName = String(form.get("fullName") ?? "").trim()
  const email = String(form.get("email") ?? "").trim()
  const phone = String(form.get("phone") ?? "").trim()
  let experience = String(form.get("experience") ?? "").trim()

  if (fullName.length < 2 || fullName.length > 200) {
    return Response.json({ error: "Please enter your full name." }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 320) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 })
  }
  if (phone.length < 8 || phone.length > 40) {
    return Response.json({ error: "Please enter a contact number." }, { status: 400 })
  }
  if (experience.length < 40) {
    return Response.json({ error: "Please add a bit more detail about your experience (at least 40 characters)." }, { status: 400 })
  }
  if (experience.length > MAX_EXP_LEN) {
    experience = experience.slice(0, MAX_EXP_LEN)
  }

  const file = form.get("cv")
  if (!(file instanceof File) || file.size === 0) {
    return Response.json({ error: "Please attach your CV." }, { status: 400 })
  }
  if (file.size > MAX_CV_BYTES) {
    return Response.json({ error: "CV file is too large (max 5 MB)." }, { status: 400 })
  }

  if (!cvLooksValid(file)) {
    return Response.json({ error: "CV must be a PDF or Word document." }, { status: 400 })
  }

  const buf = Buffer.from(await file.arrayBuffer())
  const base64 = buf.toString("base64")
  const safeOriginal = file.name.replace(/[^\w.\- ()]/g, "_").slice(0, 180) || "cv.pdf"

  const subject = buildJobApplicantSubject(role.title)

  const text = [
    `New careers application — ${role.title}`,
    "",
    `Role ID: ${role.id}`,
    `Name: ${fullName}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    "",
    "Relevant experience:",
    experience,
    "",
    `Site: APX FS`,
  ].join("\n")

  const html = `
  <h2 style="font-family:system-ui,sans-serif">New careers application</h2>
  <p style="font-family:system-ui,sans-serif"><strong>Position:</strong> ${esc(role.title)}</p>
  <p style="font-family:system-ui,sans-serif"><strong>Name:</strong> ${esc(fullName)}</p>
  <p style="font-family:system-ui,sans-serif"><strong>Email:</strong> ${esc(email)}</p>
  <p style="font-family:system-ui,sans-serif"><strong>Phone:</strong> ${esc(phone)}</p>
  <h3 style="font-family:system-ui,sans-serif">Relevant experience</h3>
  <pre style="font-family:system-ui,sans-serif;white-space:pre-wrap">${esc(experience)}</pre>
  <p style="font-family:system-ui,sans-serif;color:#666;font-size:12px">APX Fire &amp; Security — website application</p>
  `

  const sent = await sendSiteEmailViaResend({
    subject,
    text,
    html,
    replyTo: email,
    attachments: [{ filename: safeOriginal, content: base64 }],
  })

  if (!sent.ok) {
    return Response.json({ error: sent.message }, { status: sent.status })
  }

  return Response.json({ ok: true })
}
