import { getFsCareerRoleById } from "@/data/fsCareersRoles"
import { buildJobApplicantSubject } from "@/lib/careers-email-subject"
import { buildFsBrandedEmailHtml } from "@/lib/fs-branded-email"
import { sendSiteEmailViaResend } from "@/lib/send-site-email"
import {
  allowRequest,
  allowRequestAll,
  CAREERS_RATE,
  CAREERS_EMAIL_DAILY,
  CAREERS_IP_DAILY,
  clientIpFromRequest,
  contentLengthOk,
  MAX_CAREERS_BODY_BYTES,
  defaultAllowedHosts,
  normalizeEmailKey,
  originAllowed,
} from "@/lib/api-abuse-guard"
import { cvBytesLookPlausible } from "@/lib/cv-magic"
import { getFsSiteUrl } from "@/lib/seo"
import { verifyTurnstileToken } from "@/lib/turnstile"

export const runtime = "nodejs"

const MAX_CV_BYTES = 5 * 1024 * 1024
const MAX_EXP_LEN = 8000

const ALLOWED_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
])

function cvLooksValid(file: { name: string; type: string }): boolean {
  const name = file.name.toLowerCase()
  const extOk = name.endsWith(".pdf") || name.endsWith(".doc") || name.endsWith(".docx")
  if (ALLOWED_MIME.has(file.type)) return true
  if ((!file.type || file.type === "application/octet-stream") && extOk) return true
  // Some mobile browsers omit MIME; trust a clear extension.
  if (extOk) return true
  return false
}

export async function POST(req: Request) {
  if (!contentLengthOk(req, MAX_CAREERS_BODY_BYTES)) {
    return Response.json({ error: "Request too large." }, { status: 413 })
  }

  const ip = clientIpFromRequest(req)
  if (!originAllowed(req, defaultAllowedHosts(getFsSiteUrl()))) {
    return Response.json({ error: "Forbidden." }, { status: 403 })
  }
  if (!allowRequest(`fs-careers:${ip}`, CAREERS_RATE.limit, CAREERS_RATE.windowMs)) {
    return Response.json({ error: "Too many requests. Please try again later." }, { status: 429 })
  }

  let form: FormData
  try {
    form = await req.formData()
  } catch {
    return Response.json({ error: "Invalid form data." }, { status: 400 })
  }

  // Prefer new honeypot key; keep reading legacy "company" for old clients.
  const hp = String(form.get("fs_cf_hp") ?? form.get("company") ?? "").trim()
  if (hp.length > 0) {
    return Response.json({ ok: true })
  }

  const turnstile = await verifyTurnstileToken(String(form.get("turnstileToken") ?? ""), ip)
  if (!turnstile.ok) {
    return Response.json({ error: turnstile.error }, { status: 400 })
  }

  if (String(form.get("privacyConsent") ?? "") !== "true") {
    return Response.json(
      { error: "Please confirm you have read the recruitment privacy notice before applying." },
      { status: 400 }
    )
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

  const emailKey = normalizeEmailKey(email)
  if (
    !allowRequestAll([
      { key: `fs-careers-email-day:${emailKey}:${role.id}`, ...CAREERS_EMAIL_DAILY },
      { key: `fs-careers-ip-day:${ip}`, ...CAREERS_IP_DAILY },
    ])
  ) {
    return Response.json(
      {
        error:
          "An application from this email was already received recently. Please wait 24 hours, or email us directly if needed.",
      },
      { status: 429 }
    )
  }

  const cvField = form.get("cv")
  // Some runtimes hand back Blob (not File); accept either.
  const isBlob = typeof Blob !== "undefined" && cvField instanceof Blob
  if (!isBlob || cvField.size === 0) {
    return Response.json({ error: "Please attach your CV." }, { status: 400 })
  }
  if (cvField.size > MAX_CV_BYTES) {
    return Response.json({ error: "CV file is too large (max 5 MB)." }, { status: 400 })
  }

  const originalName =
    (typeof File !== "undefined" && cvField instanceof File && cvField.name) ||
    (typeof (cvField as Blob & { name?: string }).name === "string"
      ? (cvField as Blob & { name?: string }).name
      : "") ||
    "cv.pdf"
  const fileLike = {
    name: originalName,
    type: cvField.type || "",
    size: cvField.size,
  }

  if (!cvLooksValid(fileLike)) {
    return Response.json({ error: "CV must be a PDF or Word document." }, { status: 400 })
  }

  const buf = Buffer.from(await cvField.arrayBuffer())
  if (!cvBytesLookPlausible(buf, originalName)) {
    return Response.json(
      {
        error:
          "We could not read that CV. Please upload a PDF or Word (.doc / .docx) file — not Pages, images, or zip archives.",
      },
      { status: 400 }
    )
  }
  const base64 = buf.toString("base64")
  let safeOriginal = originalName.replace(/[^\w.\- ()]/g, "_").slice(0, 180) || "cv.pdf"
  const lowerName = safeOriginal.toLowerCase()
  const contentType = lowerName.endsWith(".docx")
    ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    : lowerName.endsWith(".doc")
      ? "application/msword"
      : "application/pdf"
  if (contentType === "application/pdf" && !lowerName.endsWith(".pdf")) {
    safeOriginal = `${safeOriginal.replace(/\.[^.]+$/, "") || "cv"}.pdf`
  }

  const subject = buildJobApplicantSubject(role.title)

  const rows = [
    { label: "Position", value: role.title },
    { label: "Name", value: fullName },
    { label: "Email", value: email },
    { label: "Phone", value: phone },
    { label: "CV attached", value: safeOriginal },
  ]

  const text = [
    subject,
    "",
    ...rows.map((r) => `${r.label}: ${r.value}`),
    "",
    "Relevant experience:",
    experience,
  ].join("\n")

  const html = buildFsBrandedEmailHtml({
    title: "Job Application",
    intro: "New application from the website careers form.",
    rows,
    messageLabel: "Relevant experience",
    messageBody: experience,
    footerNote: "CV is attached. Reply to contact the applicant.",
  })

  const sent = await sendSiteEmailViaResend({
    subject,
    text,
    html,
    replyTo: email,
    attachments: [{ filename: safeOriginal, content: base64, contentType }],
  })

  if (!sent.ok) {
    return Response.json({ error: sent.message }, { status: sent.status })
  }

  const confirm = await sendSiteEmailViaResend({
    to: email,
    subject: `We received your application: ${role.title}`,
    replyTo: "enquiries@apx-fs.co.uk",
    text: [
      `Hello ${fullName},`,
      "",
      `Thank you for applying for ${role.title} at APX Fire & Security. We have received your application and will be in touch if we progress your application.`,
      "",
      "We process your application data under our recruitment privacy notice:",
      "https://www.apx-fs.co.uk/recruitment-privacy",
      "",
      "APX Fire & Security",
      "enquiries@apx-fs.co.uk",
    ].join("\n"),
    html: buildFsBrandedEmailHtml({
      title: "Application Received",
      intro: `Hello ${fullName}, thank you for applying for ${role.title} at APX Fire & Security. We have received your application and will be in touch if we progress it.`,
      rows: [
        { label: "Position", value: role.title },
        { label: "Name", value: fullName },
        { label: "Email", value: email },
        { label: "Phone", value: phone },
      ],
      footerNote:
        "Recruitment privacy: https://www.apx-fs.co.uk/recruitment-privacy. This is an automated confirmation.",
    }),
  })

  if (!confirm.ok) {
    console.error("Careers applicant confirmation email failed:", confirm.message)
  }

  return Response.json({ ok: true, confirmationSent: confirm.ok })
}
