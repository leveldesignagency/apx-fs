import fs from "fs"
import path from "path"
import { buildFsBrandedEmailHtml } from "../src/lib/fs-branded-email"

const samples = {
  contactNotify: {
    title: "Contact Form Submission",
    intro: "New enquiry from the website contact form.",
    rows: [
      { label: "Name", value: "Jane Smith" },
      { label: "Company", value: "Example Estates Ltd" },
      { label: "Email", value: "jane@example.com" },
      { label: "Phone", value: "07700 900123" },
      { label: "Service", value: "Fire Alarm Systems" },
      { label: "Preferred contact method", value: "Email" },
    ],
    messageLabel: "Message",
    messageBody:
      "We need a quote for a new addressable fire alarm system across three floors. Please contact us this week.",
    footerNote: "Reply to this email to respond to the enquirer.",
  },
  contactConfirm: {
    title: "We Received Your Enquiry",
    intro:
      "Hello Jane Smith, thank you for contacting APX Fire & Security. We have received your enquiry and will respond using your preferred contact method as soon as we can.",
    rows: [
      { label: "Preferred contact method", value: "Email" },
      { label: "Service", value: "Fire Alarm Systems" },
      {
        label: "Your message",
        value:
          "We need a quote for a new addressable fire alarm system across three floors. Please contact us this week.",
      },
    ],
    footerNote:
      "Urgent? Call 020 8303 2280. Privacy: https://www.apx-fs.co.uk/privacy. Reply to this email if you need to add anything.",
  },
  careersNotify: {
    title: "Job Application",
    intro: "New application from the website careers form.",
    rows: [
      { label: "Position", value: "Fire & Security Engineers" },
      { label: "Name", value: "Alex Taylor" },
      { label: "Email", value: "alex@example.com" },
      { label: "Phone", value: "07700 900456" },
      { label: "CV attached", value: "Alex-Taylor-CV.pdf" },
    ],
    messageLabel: "Relevant experience",
    messageBody:
      "Five years installing and commissioning fire alarms and intruder systems across London commercial sites. NSI Gold environment experience.",
    footerNote: "CV is attached. Reply to contact the applicant.",
  },
  careersConfirm: {
    title: "Application Received",
    intro:
      "Hello Alex Taylor, thank you for applying for Fire & Security Engineers at APX Fire & Security. We have received your application and will be in touch if we progress it.",
    rows: [
      { label: "Position", value: "Fire & Security Engineers" },
      { label: "Name", value: "Alex Taylor" },
      { label: "Email", value: "alex@example.com" },
      { label: "Phone", value: "07700 900456" },
    ],
    footerNote:
      "Recruitment privacy: https://www.apx-fs.co.uk/recruitment-privacy. This is an automated confirmation.",
  },
} as const

const labels: Record<keyof typeof samples, string> = {
  contactNotify: "Contact ? enquiries (notification)",
  contactConfirm: "Contact ? customer (confirmation)",
  careersNotify: "Careers ? enquiries (notification)",
  careersConfirm: "Careers ? applicant (confirmation)",
}

const sections = (Object.keys(samples) as (keyof typeof samples)[])
  .map((key) => {
    const html = buildFsBrandedEmailHtml({ ...samples[key], logoMode: "data" })
    return `
      <div class="card">
        <h2>${labels[key]}</h2>
        <div class="frame">${html}</div>
      </div>`
  })
  .join("\n")

const page = `<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width"/>
  <title>APX FS email layout review</title>
  <style>
    body { margin: 0; background: #111; color: #fff; font-family: Arial, Helvetica, sans-serif; }
    .page { max-width: 1200px; margin: 0 auto; padding: 24px 16px 64px; }
    h1 { font-size: 22px; margin: 0 0 8px; }
    .sub { color: #aaa; margin: 0 0 28px; font-size: 14px; }
    .grid { display: grid; gap: 32px; }
    @media (min-width: 960px) { .grid { grid-template-columns: 1fr 1fr; } }
    .card h2 { font-size: 14px; letter-spacing: 0.08em; text-transform: uppercase; color: #ccc; margin: 0 0 12px; }
    .frame { background: #000; border: 1px solid #333; overflow: auto; }
  </style>
</head>
<body>
  <div class="page">
    <h1>APX Fire &amp; Security — email layout review</h1>
    <p class="sub">Black background · white border · white dividers (same weight). Sample data only.</p>
    <div class="grid">
      ${sections}
    </div>
  </div>
</body>
</html>`

const destDir = path.join(process.cwd(), "public", "email-previews")
fs.mkdirSync(destDir, { recursive: true })
const dest = path.join(destDir, "layout-review.html")
fs.writeFileSync(dest, page)
console.log("Wrote", dest)
