import type { CareerRole } from "@/components/careers/careers-types"
import { careerApplyHref } from "@/components/careers/careers-types"
import { FS_EMAIL, FS_PHONE_DISPLAY, FS_SITE_NAME } from "@/lib/seo"

type JsPdfDoc = {
  setFont: (face: string, style?: string) => void
  setFontSize: (size: number) => void
  setTextColor: (r: number, g?: number, b?: number) => void
  text: (text: string | string[], x: number, y: number, opts?: { maxWidth?: number; align?: string }) => void
  splitTextToSize: (text: string, maxWidth: number) => string[]
  addPage: () => void
  getNumberOfPages: () => number
  setPage: (page: number) => void
  internal: { pageSize: { getWidth: () => number; getHeight: () => number } }
  save: (filename: string) => void
  line: (x1: number, y1: number, x2: number, y2: number) => void
  setDrawColor: (r: number, g?: number, b?: number) => void
  setLineWidth: (w: number) => void
}

function safeFileName(title: string) {
  return (
    title
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 80) || "job-description"
  )
}

/** Builds and downloads a real PDF job sheet (no print dialog). */
export async function downloadCareerRolePdf(role: CareerRole) {
  const { jsPDF } = await import("jspdf")
  const doc = new jsPDF({ unit: "pt", format: "a4" }) as unknown as JsPdfDoc

  const pageW = doc.internal.pageSize.getWidth()
  const pageH = doc.internal.pageSize.getHeight()
  const marginX = 48
  const marginTop = 52
  const marginBottom = 56
  const maxW = pageW - marginX * 2
  let y = marginTop

  const ensureSpace = (needed: number) => {
    if (y + needed <= pageH - marginBottom) return
    doc.addPage()
    y = marginTop
  }

  const rule = () => {
    ensureSpace(18)
    doc.setDrawColor(210, 210, 210)
    doc.setLineWidth(0.6)
    doc.line(marginX, y, pageW - marginX, y)
    y += 16
  }

  const heading = (label: string) => {
    ensureSpace(36)
    doc.setFont("helvetica", "bold")
    doc.setFontSize(9)
    doc.setTextColor(110, 110, 110)
    doc.text(label.toUpperCase(), marginX, y)
    y += 16
  }

  const body = (text: string, size = 10.5, leading = 14) => {
    doc.setFont("helvetica", "normal")
    doc.setFontSize(size)
    doc.setTextColor(30, 30, 30)
    const lines = doc.splitTextToSize(text, maxW)
    for (const line of lines) {
      ensureSpace(leading)
      doc.text(line, marginX, y)
      y += leading
    }
  }

  const bullets = (items: string[]) => {
    doc.setFont("helvetica", "normal")
    doc.setFontSize(10.5)
    doc.setTextColor(30, 30, 30)
    for (const item of items) {
      const lines = doc.splitTextToSize(item, maxW - 16)
      ensureSpace(lines.length * 14 + 4)
      doc.text("-", marginX, y)
      lines.forEach((line, i) => {
        doc.text(line, marginX + 14, y)
        y += 14
        if (i < lines.length - 1) ensureSpace(14)
      })
      y += 4
    }
  }

  const meta = (label: string, value: string) => {
    ensureSpace(34)
    doc.setFont("helvetica", "bold")
    doc.setFontSize(8.5)
    doc.setTextColor(110, 110, 110)
    doc.text(label.toUpperCase(), marginX, y)
    y += 13
    body(value, 10.5, 14)
    y += 6
  }

  // Header
  doc.setFont("helvetica", "bold")
  doc.setFontSize(9)
  doc.setTextColor(110, 110, 110)
  doc.text(FS_SITE_NAME.toUpperCase(), marginX, y)
  y += 22

  doc.setFont("helvetica", "bold")
  doc.setFontSize(20)
  doc.setTextColor(0, 0, 0)
  const titleLines = doc.splitTextToSize(role.title, maxW)
  for (const line of titleLines) {
    ensureSpace(24)
    doc.text(line, marginX, y)
    y += 24
  }

  y += 4
  const sub = [role.department, role.location, role.employmentType].filter(Boolean).join("  /  ")
  body(sub, 10, 13)
  y += 8
  rule()

  heading("Overview")
  body(role.description, 11, 15)
  y += 8
  rule()

  heading("Role details")
  if (role.employmentType) meta("Employment type", role.employmentType)
  if (role.hours) meta("Hours", role.hours)
  meta("Location", role.location)
  if (role.baseLocation) meta("Base", role.baseLocation)
  if (role.companyVehicle) meta("Company vehicle", role.companyVehicle)

  const sections: { title: string; items?: string[] }[] = [
    { title: "Key responsibilities", items: role.responsibilities },
    { title: "Required experience", items: role.requiredExperience },
    { title: "Certifications & licences", items: role.certifications },
    { title: "Requirements", items: role.requirements },
    { title: "Benefits", items: role.benefits },
    { title: "Working areas", items: role.workingAreas },
  ]

  for (const section of sections) {
    if (!section.items?.length) continue
    rule()
    heading(section.title)
    bullets(section.items)
  }

  rule()
  body(
    "APX Fire & Security is an equal-opportunities employer. Applications are considered on experience, skills and ability to do the role.",
    10,
    13
  )
  y += 10
  rule()

  doc.setFont("helvetica", "bold")
  doc.setFontSize(10.5)
  doc.setTextColor(0, 0, 0)
  ensureSpace(16)
  doc.text(FS_SITE_NAME, marginX, y)
  y += 15
  body("365-369 Bexley Road, Erith, Kent DA8 3EZ", 10, 13)
  body(`${FS_PHONE_DISPLAY}  /  ${FS_EMAIL}`, 10, 13)
  body(`Apply online: apx-fs.co.uk${careerApplyHref(role.id)}`, 10, 13)

  // Footer page numbers
  const pages = doc.getNumberOfPages()
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i)
    doc.setFont("helvetica", "normal")
    doc.setFontSize(8)
    doc.setTextColor(140, 140, 140)
    doc.text(`${FS_SITE_NAME}  /  Job description  /  ${i} / ${pages}`, pageW / 2, pageH - 28, {
      align: "center",
    })
  }

  doc.save(`APX-FS-${safeFileName(role.title)}.pdf`)
}
